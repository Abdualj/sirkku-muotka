import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'worksPage',
  title: 'Selected Works Page',
  type: 'document',
  fields: [
    defineField({
      name: 'woodVenturesIntro',
      title: 'Wood Ventures — intro text',
      type: 'text',
      rows: 3,
      description: 'Shown above the grid when the Wood Ventures tab is active.',
    }),
    defineField({
      name: 'collageAquarelleIntro',
      title: 'Collage & Aquarelle — intro text',
      type: 'text',
      rows: 3,
      description: 'Shown above the grid when the Collage & Aquarelle tab is active.',
    }),
    defineField({
      name: 'installationViewsIntro',
      title: 'Installation Views — intro text',
      type: 'text',
      rows: 3,
      description: 'Shown above the grid when the Installation Views tab is active.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Selected Works page content' }
    },
  },
})
