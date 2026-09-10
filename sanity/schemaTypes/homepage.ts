import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'bioText',
      title: 'Bio text',
      type: 'text',
      rows: 6,
      description: 'Shown on the Home page under the media block.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      description: 'Shown on the homepage if no exhibition video link is set. Upload a high-res image, min 2000px wide.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'exhibitionVideoUrl',
      title: 'Exhibition video URL',
      type: 'url',
      description: 'Paste a YouTube or Vimeo link. Leave empty to show the hero image instead, or "Exhibition video coming soon" if neither is set.',
    }),
    defineField({
      name: 'mediaCaption',
      title: 'Media caption',
      type: 'string',
      description: 'Small caption under the video/image, e.g. "Installation view · Exhibition preview". Update this whenever you change the video or hero image.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage content' }
    },
  },
})
