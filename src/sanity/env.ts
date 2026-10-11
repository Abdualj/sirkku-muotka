// Falls back to placeholders (rather than throwing) so the app still builds and
// renders before a real Sanity project is connected — see README for setup.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-10'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
// The project ID is public (it appears in every image URL), so it is safe to
// fall back to it when the host doesn't expose the env var at build time.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e3m8qufo'
export const isSanityConfigured = Boolean(projectId)
