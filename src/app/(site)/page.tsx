import Image from "next/image";

import { getVideoEmbed } from "@/lib/video";
import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { homepageQuery } from "@/sanity/lib/queries";
import type { Image as SanityImage } from "sanity";

type Homepage = {
  bioText?: string;
  heroImage?: SanityImage & { alt?: string };
  exhibitionVideoUrl?: string;
  mediaCaption?: string;
};

export default async function Home() {
  const homepage = await sanityFetch<Homepage>(homepageQuery);
  const videoEmbed = getVideoEmbed(homepage?.exhibitionVideoUrl);

  return (
    <section className="view">
      <div className="home-media">
        {videoEmbed ? (
          <iframe
            src={videoEmbed.embedUrl}
            title="Exhibition video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : homepage?.heroImage ? (
          <Image
            src={urlForImage(homepage.heroImage).width(1600).url()}
            alt={homepage.heroImage.alt || ""}
            fill
            sizes="(max-width: 860px) 100vw, 940px"
            style={{ objectFit: "cover" }}
            priority
          />
        ) : (
          <span>Exhibition video coming soon</span>
        )}
      </div>

      {homepage?.mediaCaption ? (
        <div className="media-caption">{homepage.mediaCaption}</div>
      ) : null}

      {homepage?.bioText ? <p className="bio">{homepage.bioText}</p> : null}
    </section>
  );
}
