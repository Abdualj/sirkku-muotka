// Falls back to placeholders (rather than throwing) so the app still builds and
// renders before a real Sanity project is connected — see README for setup.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-10'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
