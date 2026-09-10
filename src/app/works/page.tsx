import WorksView from "@/components/WorksView";
import { sanityFetch } from "@/sanity/lib/client";
import { artworksQuery } from "@/sanity/lib/queries";
import type { Artwork } from "@/types/artwork";

export default async function WorksPage() {
  const artworks = await sanityFetch<Artwork[]>(artworksQuery);

  return <WorksView artworks={artworks || []} />;
}
