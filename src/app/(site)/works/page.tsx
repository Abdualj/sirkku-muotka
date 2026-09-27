import WorksView, { type WorksPageContent } from "@/components/WorksView";
import { sanityFetch } from "@/sanity/lib/client";
import { artworksQuery, worksPageQuery } from "@/sanity/lib/queries";
import type { Artwork } from "@/types/artwork";

export default async function WorksPage() {
  const [artworks, worksPage] = await Promise.all([
    sanityFetch<Artwork[]>(artworksQuery),
    sanityFetch<WorksPageContent>(worksPageQuery),
  ]);

  return <WorksView artworks={artworks || []} worksPage={worksPage} />;
}
