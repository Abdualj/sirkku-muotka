import { createClient, type QueryParams } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId } from '../env'

const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null

/**
 * Returns `null` instead of throwing when Sanity isn't configured yet
 * (no NEXT_PUBLIC_SANITY_PROJECT_ID) so pages can render fallback content
 * during initial setup instead of crashing the build.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null
  try {
    // Pages are prerendered at build time; revalidating (and skipping the
    // API CDN's own cache) lets published Studio edits reach the site within
    // about 10 seconds without a redeploy.
    return await client.fetch<T>(query, params, { next: { revalidate: 10 } })
  } catch (error) {
    console.error('Sanity fetch failed:', error)
    return null
  }
}
