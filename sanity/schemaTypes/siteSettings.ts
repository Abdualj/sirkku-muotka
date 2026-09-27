import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      description: 'Used in the browser tab and search engine results, e.g. "Sirkku Muotka".',
    }),
    defineField({
      name: 'brandName',
      title: 'Sidebar name',
      type: 'text',
      rows: 2,
      description: 'Shown at the top of the sidebar in a decorative script font. Press enter where the line should break, e.g. "Sirkku" then "Muotka" on the next line.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short byline shown under the sidebar name, e.g. "Craftsperson, designer and visual artist".',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' }
    },
  },
})
