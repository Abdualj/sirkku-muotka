import { defineField, defineType } from 'sanity'

export const CATEGORIES = [
  { title: 'Wood Ventures', value: 'wood' },
  { title: 'Collage & Aquarelle', value: 'collage' },
  { title: 'Installation Views', value: 'installation' },
] as const

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Which tab this artwork appears under on the Selected Works page.',
      options: { list: [...CATEGORIES], layout: 'radio' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      description: 'Name of the work series this piece belongs to, e.g. "Fauna". Optional — shown when a viewer opens the work.',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. "2023" or "2021–2022"',
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      description: 'e.g. "Oil on canvas", "Reclaimed wood, steel". Shown under the title on hover.',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g. "120 x 80 cm"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload a high-res image, minimum 2000px on the longest side. Until an image is uploaded, the site shows an "Image pending" placeholder.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Short description of the image, for accessibility and search engines.',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first within this category.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
    },
    prepare({ title, category, media }) {
      const label = CATEGORIES.find((c) => c.value === category)?.title
      return { title, subtitle: label, media }
    },
  },
})
