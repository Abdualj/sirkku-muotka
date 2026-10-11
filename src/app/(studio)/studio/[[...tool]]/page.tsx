import type { Metadata, Viewport } from 'next'

import Studio from './Studio'

export const dynamic = 'force-static'

// Same values next-sanity/studio exports; inlined so the server never
// imports the Studio package.
export const metadata: Metadata = { referrer: 'same-origin', robots: 'noindex' }
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default function StudioPage() {
  return <Studio />
}
