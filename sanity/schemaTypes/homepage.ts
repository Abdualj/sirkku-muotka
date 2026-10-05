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
      name: 'exhibitionVideoFile',
      title: 'Exhibition video',
      type: 'file',
      description: 'Upload a video from your computer (MP4 works best). It is shown at the top of the Home page instead of the hero image.',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'exhibitionVideoUrl',
      title: 'Or: exhibition video link',
      type: 'url',
      description: 'Instead of uploading, you can paste a YouTube, Vimeo or Google Drive link. For Drive, set the video\'s General access to "Anyone with the link". An uploaded video is used first if both are set.',
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
