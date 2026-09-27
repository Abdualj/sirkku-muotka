import { groq } from 'next-sanity'

export const artworksQuery = groq`
  *[_type == "artwork"] | order(order asc) {
    _id,
    title,
    category,
    series,
    year,
    material,
    dimensions,
    description,
    image
  }
`

export const homepageQuery = groq`*[_type == "homepage"][0]`

export const worksPageQuery = groq`*[_type == "worksPage"][0]`

export const contactPageQuery = groq`*[_type == "contactPage"][0]`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`
