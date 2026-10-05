import { defineArrayMember, defineField, defineType } from 'sanity'

import SeriesInput from '../components/SeriesInput'

export const CATEGORIES = [
  { title: 'Wood Ventures', value: 'wood' },
  { title: 'Collage & Aquarelle', value: 'collage' },
  { title: 'Installation Views', value: 'installation' },
] as const

/** Each tab is one fixed document, e.g. "tab-wood". */
export const tabDocumentId = (category: string) => `tab-${category}`

export const workPiece = defineType({
  name: 'workPiece',
  title: 'Piece',
  type: 'object',
  // A popover (rather than a dialog) closes by itself as soon as you click
  // anywhere outside it, e.g. the Publish button.
  options: { modal: { type: 'popover', width: 1 } },
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Use a large photo. The whole image is always shown, never cropped.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Give the piece a title.'),
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      description: 'Optional. Type a series name, or click one already used. Pieces with the same series name are shown together.',
      components: { input: SeriesInput },
    }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'material', title: 'Material', type: 'string' }),
    defineField({ name: 'dimensions', title: 'Size', type: 'string', description: 'e.g. "120 x 80 cm"' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', series: 'series', media: 'image' },
    prepare({ title, series, media }) {
      return { title: title || 'Untitled piece', subtitle: series ? `Series: ${series}` : undefined, media }
    },
  },
})

export const worksTab = defineType({
  name: 'worksTab',
  title: 'Selected Works tab',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro text',
      type: 'text',
      rows: 3,
      description: 'Shown above the works when this tab is open.',
    }),
    defineField({
      name: 'pieces',
      title: 'Pieces',
      type: 'array',
      description:
        'Shown on the site in this order. Drag ⠿ to move a piece, then press Publish.',
      of: [defineArrayMember({ type: 'workPiece' })],
    }),
  ],
  preview: {
    select: { id: '_id' },
    prepare({ id }) {
      const tab = CATEGORIES.find((c) => id?.endsWith(tabDocumentId(c.value)))
      return { title: tab?.title ?? 'Selected Works tab' }
    },
  },
})
