import { SITE_URL } from "@/lib/seo";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shubham Saurabh",
  url: SITE_URL,
  jobTitle: "Software Engineer",
  knowsAbout: [
    "Full Stack Development",
    "ReactJS",
    "Next.js",
    "Node.js",
    "TypeScript",
    "System Design",
    "UI Design",
  ],
  sameAs: [
    "https://github.com/shubhsaur",
    "https://www.linkedin.com/in/shubhsaur",
    "https://x.com/shubhsaur",
  ],
};
