import { ContactSection } from "@/components/contact/ContactSection";
import { site } from "@/lib/content/site";

export const metadata = {
  title: "Contact — Shubham Saurabh",
  description: "Getform message form, socials, resume.",
};

const DEFAULT_GETFORM = site.getformEndpoint;

export default function ContactRoute() {
  const endpoint =
    process.env.NEXT_PUBLIC_GETFORM_ENDPOINT ?? DEFAULT_GETFORM;

  return <ContactSection endpoint={endpoint} />;
}
