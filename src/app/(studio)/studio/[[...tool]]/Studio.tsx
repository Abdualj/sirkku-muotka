'use client'

import dynamic from 'next/dynamic'

// The Studio runs entirely in the browser. Loading it with ssr: false keeps
// Sanity's (very large) code out of the server bundle, which otherwise made
// /studio return 500 on Netlify while working fine locally.
const Studio = dynamic(
  async () => {
    const [{ NextStudio }, { default: config }] = await Promise.all([
      import('next-sanity/studio'),
      import('../../../../../sanity.config'),
    ])
    return function StudioWithConfig() {
      return <NextStudio config={config} />
    }
  },
  { ssr: false },
)

export default Studio
