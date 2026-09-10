import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = [
  { id: 'homepage', type: 'homepage', title: 'Homepage' },
  { id: 'contactPage', type: 'contactPage', title: 'Contact Page' },
  { id: 'siteSettings', type: 'siteSettings', title: 'Site Settings' },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Artworks')
        .child(S.documentTypeList('artwork').title('Artworks')),
      S.divider(),
      ...SINGLETONS.map(({ id, type, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id)),
      ),
    ])
