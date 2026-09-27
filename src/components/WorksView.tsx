"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";
import type { Artwork, CategoryValue } from "@/types/artwork";

const CATEGORIES: { value: CategoryValue; label: string }[] = [
  { value: "wood", label: "Wood Ventures" },
  { value: "collage", label: "Collage & Aquarelle" },
  { value: "installation", label: "Installation Views" },
];

export type WorksPageContent = {
  woodVenturesIntro?: string;
  collageAquarelleIntro?: string;
  installationViewsIntro?: string;
};

const INTRO_BY_CATEGORY: Record<CategoryValue, keyof WorksPageContent> = {
  wood: "woodVenturesIntro",
  collage: "collageAquarelleIntro",
  installation: "installationViewsIntro",
};

export default function WorksView({
  artworks,
  worksPage,
}: {
  artworks: Artwork[];
  worksPage?: WorksPageContent | null;
}) {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>("wood");
  const [openArtwork, setOpenArtwork] = useState<Artwork | null>(null);

  const visibleArtworks = artworks.filter((artwork) => artwork.category === activeCategory);
  const introText = worksPage?.[INTRO_BY_CATEGORY[activeCategory]];

  return (
    <section className="view">
      <div className="subtabs">
        {CATEGORIES.map((category) => (
          <button
            key={category.value}
            type="button"
            className={category.value === activeCategory ? "subtab-btn active" : "subtab-btn"}
            onClick={() => setActiveCategory(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {introText ? <p className="category-intro">{introText}</p> : null}

      {visibleArtworks.length === 0 ? (
        <p className="empty-state">No works added to this category yet.</p>
      ) : (
        <div className="work-grid">
          {visibleArtworks.map((artwork) => (
            <button
              type="button"
              className="work-card"
              key={artwork._id}
              onClick={() => setOpenArtwork(artwork)}
            >
              {artwork.image ? (
                <Image
                  src={urlForImage(artwork.image).width(800).height(1067).url()}
                  alt={artwork.image.alt || artwork.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="placeholder-label">Image pending</div>
              )}
              <div className="meta">
                <div className="title">{artwork.title}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {openArtwork ? (
        <ArtworkLightbox artwork={openArtwork} onClose={() => setOpenArtwork(null)} />
      ) : null}
    </section>
  );
}

function ArtworkLightbox({ artwork, onClose }: { artwork: Artwork; onClose: () => void }) {
  const details = [artwork.year, artwork.material, artwork.dimensions].filter(Boolean);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={artwork.title}>
      <div className="lightbox-backdrop" onClick={onClose} />
      <div className="lightbox-panel">
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="lightbox-image">
          {artwork.image ? (
            <Image
              src={urlForImage(artwork.image).width(1600).url()}
              alt={artwork.image.alt || artwork.title}
              fill
              sizes="(max-width: 860px) 100vw, 70vw"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <div className="placeholder-label">Image pending</div>
          )}
        </div>
        <div className="lightbox-info">
          {artwork.series ? <div className="lightbox-series">{artwork.series}</div> : null}
          <div className="lightbox-title">{artwork.title}</div>
          {details.length > 0 ? <div className="lightbox-details">{details.join(" · ")}</div> : null}
          {artwork.description ? <p className="lightbox-description">{artwork.description}</p> : null}
        </div>
      </div>
    </div>
  );
}
