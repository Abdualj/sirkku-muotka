"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";
import type { Artwork, CategoryValue, WorksTab } from "@/types/artwork";

const CATEGORIES: { value: CategoryValue; label: string }[] = [
  { value: "wood", label: "Wood Ventures" },
  { value: "collage", label: "Collage & Aquarelle" },
  { value: "installation", label: "Installation Views" },
];

type WorkGroup = { key: string; series: string | null; artworks: Artwork[] };

// Keeps the order from Studio. Pieces sharing a series name are gathered
// under that series, placed where its first piece is; runs of pieces without
// a series share one grid.
function toGroups(pieces: Artwork[]): WorkGroup[] {
  const groups: WorkGroup[] = [];
  const bySeries = new Map<string, WorkGroup>();

  for (const piece of pieces) {
    const series = piece.series?.trim();
    if (series) {
      const name = series.toLowerCase();
      const group = bySeries.get(name);
      if (group) group.artworks.push(piece);
      else {
        const created = { key: `series-${name}`, series, artworks: [piece] };
        bySeries.set(name, created);
        groups.push(created);
      }
      continue;
    }
    const last = groups[groups.length - 1];
    if (last && !last.series) last.artworks.push(piece);
    else groups.push({ key: piece._id, series: null, artworks: [piece] });
  }
  return groups;
}

export default function WorksView({ tabs }: { tabs: WorksTab[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>("wood");
  const [open, setOpen] = useState<{ group: WorkGroup; index: number } | null>(null);

  const activeTab = tabs.find((tab) => tab._id === `tab-${activeCategory}`);
  const groups = useMemo(() => toGroups(activeTab?.pieces ?? []), [activeTab]);
  const introText = activeTab?.intro;

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

      {groups.length === 0 ? (
        <p className="empty-state">No works added to this category yet.</p>
      ) : (
        groups.map((group) => (
          <div className="work-series" key={group.key}>
            {group.series ? (
              <div className="work-series-header">
                <h2 className="work-series-title">{group.series}</h2>
              </div>
            ) : null}
            <div className="work-grid">
              {group.artworks.map((artwork, index) => (
                <button
                  type="button"
                  className="work-card"
                  key={artwork._id}
                  onClick={() => setOpen({ group, index })}
                >
                  {artwork.image ? (
                    <Image
                      src={urlForImage(artwork.image).width(600).url()}
                      alt={artwork.image.alt || artwork.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 240px"
                      style={{ objectFit: "contain" }}
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
          </div>
        ))
      )}

      {open ? (
        <ArtworkLightbox
          artworks={open.group.artworks}
          index={open.index}
          series={open.group.series}
          onNavigate={(index) => setOpen({ ...open, index })}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}

function ArtworkLightbox({
  artworks,
  index,
  series,
  onNavigate,
  onClose,
}: {
  artworks: Artwork[];
  index: number;
  series: string | null;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  const artwork = artworks[index];
  const details = [artwork.year, artwork.material, artwork.dimensions].filter(Boolean);
  const hasPrev = index > 0;
  const hasNext = index < artworks.length - 1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasPrev) onNavigate(index - 1);
      if (event.key === "ArrowRight" && hasNext) onNavigate(index + 1);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate, index, hasPrev, hasNext]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={artwork.title}>
      <div className="lightbox-backdrop" onClick={onClose} />
      <div className="lightbox-panel">
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="lightbox-image">
          {hasPrev ? (
            <button
              type="button"
              className="lightbox-nav prev"
              onClick={() => onNavigate(index - 1)}
              aria-label="Previous piece"
            >
              &lsaquo;
            </button>
          ) : null}
          {hasNext ? (
            <button
              type="button"
              className="lightbox-nav next"
              onClick={() => onNavigate(index + 1)}
              aria-label="Next piece"
            >
              &rsaquo;
            </button>
          ) : null}
          {artwork.image ? (
            <Image
              key={artwork._id}
              src={urlForImage(artwork.image).width(2000).url()}
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
          {series ? (
            <div className="lightbox-series">
              {series}
              {artworks.length > 1 ? ` · ${index + 1} / ${artworks.length}` : null}
            </div>
          ) : null}
          <div className="lightbox-title">{artwork.title}</div>
          {details.length > 0 ? <div className="lightbox-details">{details.join(" · ")}</div> : null}
          {artwork.description ? <p className="lightbox-description">{artwork.description}</p> : null}
        </div>
      </div>
    </div>
  );
}
