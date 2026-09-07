import { ContactSection } from "@/components/contact/ContactSection";
import { site } from "@/lib/content/site";
import { buildPageMetadata, routeMeta } from "@/lib/seo";

export const metadata = buildPageMetadata(routeMeta.contact);

const DEFAULT_GETFORM = site.getformEndpoint;

export default function ContactRoute() {
  const endpoint =
    process.env.NEXT_PUBLIC_GETFORM_ENDPOINT ?? DEFAULT_GETFORM;

  return <ContactSection endpoint={endpoint} />;
}
