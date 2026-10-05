import { CogIcon } from '@sanity/icons/Cog'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { HomeIcon } from '@sanity/icons/Home'
import { ImagesIcon } from '@sanity/icons/Images'
import type { StructureResolver } from 'sanity/structure'

import { CATEGORIES, tabDocumentId } from './schemaTypes/worksTab'

export const SINGLETON_TYPES = ['worksTab', 'homepage', 'contactPage', 'siteSettings']

const PAGES = [
  { id: 'homepage', title: 'Home page', icon: HomeIcon },
  { id: 'contactPage', title: 'Contacts page', icon: EnvelopeIcon },
  { id: 'siteSettings', title: 'Name & tagline', icon: CogIcon },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // One page per Selected Works tab: its intro, series and pieces, in
      // order, published together with a single Publish.
      ...CATEGORIES.map(({ value, title }) =>
        S.listItem()
          .title(title)
          .id(tabDocumentId(value))
          .icon(ImagesIcon)
          .child(
            S.document()
              .schemaType('worksTab')
              .documentId(tabDocumentId(value))
              .initialValueTemplate(tabDocumentId(value))
              .title(title),
          ),
      ),
      S.divider(),
      ...PAGES.map(({ id, title, icon }) =>
        S.listItem()
          .title(title)
          .id(id)
          .icon(icon)
          .child(S.document().schemaType(id).documentId(id).title(title)),
      ),
    ])
