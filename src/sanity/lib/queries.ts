import { groq } from 'next-sanity'

export const worksTabsQuery = groq`
  *[_type == "worksTab" && _id in ["tab-wood", "tab-collage", "tab-installation"]] {
    _id,
    intro,
    "pieces": pieces[] {
      "_id": _key,
      title,
      series,
      year,
      material,
      dimensions,
      description,
      image
    }
  }
`

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    ...,
    "exhibitionVideoFileUrl": exhibitionVideoFile.asset->url
  }
`

export const contactPageQuery = groq`*[_type == "contactPage"][0]`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`
