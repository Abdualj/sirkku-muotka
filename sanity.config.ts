'use client'

import { defineConfig, type InitialValueResolverContext, type Template } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { CATEGORIES, tabDocumentId } from './sanity/schemaTypes/worksTab'
import { SINGLETON_TYPES, structure } from './sanity/structure'

const LEGACY_INTRO_FIELDS: Record<string, string> = {
  wood: 'woodVenturesIntro',
  collage: 'collageAquarelleIntro',
  installation: 'installationViewsIntro',
}

type LegacyArtwork = {
  title?: string
  image?: unknown
  year?: string
  material?: string
  dimensions?: string
  description?: string
  seriesId?: string
  seriesText?: string
}

const randomKey = () => Math.random().toString(36).slice(2, 12)

const toPiece = (artwork: LegacyArtwork, series?: string) => ({
  _type: 'workPiece',
  _key: randomKey(),
  title: artwork.title,
  image: artwork.image,
  series,
  year: artwork.year,
  material: artwork.material,
  dimensions: artwork.dimensions,
  description: artwork.description,
})

/**
 * Builds a tab's first version from content entered before tabs became single
 * pages (separate Artwork/Series documents and the old intro texts), so
 * nothing is lost the first time a tab is opened.
 */
async function legacyTabContent(category: string, { getClient }: InitialValueResolverContext) {
  const client = getClient({ apiVersion }).withConfig({ perspective: 'drafts' })
  const { worksPage, series, artworks } = await client.fetch<{
    worksPage: Record<string, string> | null
    series: { _id: string; title?: string }[]
    artworks: LegacyArtwork[]
  }>(
    `{
      "worksPage": *[_id == "worksPage"][0],
      "series": *[_type == "series" && category == $category] | order(orderRank asc) { _id, title },
      "artworks": *[_type == "artwork" && coalesce(series->category, category) == $category]
        | order(orderRank asc, _createdAt asc) {
          title, image, year, material, dimensions, description,
          "seriesId": series._ref,
          "seriesText": select(!defined(series._ref) => series)
        }
    }`,
    { category },
  )

  const inSeries = series.flatMap((s) =>
    artworks.filter((a) => a.seriesId === s._id).map((a) => toPiece(a, s.title)),
  )
  const inTextSeries = artworks.filter((a) => a.seriesText).map((a) => toPiece(a, a.seriesText))
  const singles = artworks.filter((a) => !a.seriesId && !a.seriesText).map((a) => toPiece(a))

  return {
    intro: worksPage?.[LEGACY_INTRO_FIELDS[category]],
    pieces: [...inSeries, ...inTextSeries, ...singles],
  }
}

const tabTemplates: Template[] = CATEGORIES.map(({ value, title }) => ({
  id: tabDocumentId(value),
  title,
  schemaType: 'worksTab',
  value: (_params: unknown, context: InitialValueResolverContext) => legacyTabContent(value, context),
}))

export default defineConfig({
  basePath: '/studio',
  name: 'sirkku-muotka',
  title: 'Sirkku Muotka',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Every document is a fixed page, opened from the sidebar rather than
    // created from the "+" menu.
    templates: (prev) => [
      ...prev.filter((template) => !SINGLETON_TYPES.includes(template.schemaType)),
      ...tabTemplates,
    ],
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? [] : prev,
    // Pages can be edited and published, but not deleted or duplicated.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.includes(schemaType)
        ? prev.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : prev,
  },
  plugins: [
    structureTool({ structure }),
    // The raw query tool is only useful to developers.
    ...(process.env.NODE_ENV === 'development' ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
})
