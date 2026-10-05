import WorksView from "@/components/WorksView";
import { sanityFetch } from "@/sanity/lib/client";
import { worksTabsQuery } from "@/sanity/lib/queries";
import type { WorksTab } from "@/types/artwork";

export default async function WorksPage() {
  const tabs = await sanityFetch<WorksTab[]>(worksTabsQuery);

  return <WorksView tabs={tabs || []} />;
}
