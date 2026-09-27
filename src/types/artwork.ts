import type { Image as SanityImage } from "sanity";

export type ArtworkImage = SanityImage & { alt?: string };

export type CategoryValue = "installation" | "wood" | "collage";

export type Artwork = {
  _id: string;
  title: string;
  category: CategoryValue;
  series?: string;
  year?: string;
  material?: string;
  dimensions?: string;
  description?: string;
  image?: ArtworkImage;
};
