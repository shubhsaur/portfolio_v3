import { ExperiencePage } from "@/components/experience/ExperiencePage";
import { buildPageMetadata, routeMeta } from "@/lib/seo";

export const metadata = buildPageMetadata(routeMeta.experience);

export default function ExperienceRoute() {
  return <ExperiencePage />;
}
