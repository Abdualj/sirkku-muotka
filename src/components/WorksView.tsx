"use client";

import { useState } from "react";
import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";
import type { Artwork, CategoryValue } from "@/types/artwork";

const CATEGORIES: { value: CategoryValue; label: string }[] = [
  { value: "installation", label: "Installation Views" },
  { value: "wood", label: "Wood Ventures" },
  { value: "collage", label: "Collage & Aquarelle" },
];

export default function WorksView({ artworks }: { artworks: Artwork[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>("installation");

  const visibleArtworks = artworks.filter((artwork) => artwork.category === activeCategory);

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

      {visibleArtworks.length === 0 ? (
        <p className="empty-state">No works added to this category yet.</p>
      ) : (
        <div className="work-grid">
          {visibleArtworks.map((artwork) => {
            const subParts = [artwork.year, artwork.material].filter(Boolean);
            return (
              <div className="work-card" key={artwork._id} tabIndex={0}>
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
                  {subParts.length > 0 ? (
                    <div className="sub">{subParts.join(" · ")}</div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
