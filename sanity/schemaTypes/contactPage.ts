import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Public email',
      type: 'string',
      description: 'Shown on the Contacts page.',
    }),
    defineField({
      name: 'formRecipientEmail',
      title: 'Form recipient email',
      type: 'string',
      description: 'Where messages from the contact form are delivered. Can be the same as the public email.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'e.g. "Instagram", "LinkedIn"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact page content' }
    },
  },
})
