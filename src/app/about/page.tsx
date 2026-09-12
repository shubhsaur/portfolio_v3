import { AboutPage } from "@/components/about/AboutPage";
import { buildPageMetadata, routeMeta } from "@/lib/seo";

export const metadata = buildPageMetadata(routeMeta.about);

export default function AboutRoute() {
  return <AboutPage />;
}
