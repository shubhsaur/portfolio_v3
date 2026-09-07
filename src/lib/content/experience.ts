export interface ExperienceRecord {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  current?: boolean;
  type: string;
  description: string;
  achievements: string[];
  awards?: {
    title: string;
    description: string;
  }[];
  metrics?: { label: string; value: string }[];
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
}

import {
  Briefcase,
  GraduationCap,
  Building2,
} from "lucide-react";

export const experiences: ExperienceRecord[] = [
  {
    id: "rategain",
    role: "Software Development Engineer - I",
    company: "RateGain",
    companyUrl: "https://rategain.com",
    period: "Jan 2023 — Present",
    location: "Noida, India",
    current: true,
    type: "Full-Time",
    description:
      "Developing enterprise SaaS platforms and large-scale booking systems, specializing in frontend architecture, state management, payment integrations, and performance optimization.",
    achievements: [
      "Developed and optimized a Booking Engine (IBE) using Next.js, React, TypeScript, Redux Toolkit, and React Query for multiple international hotel brands.",
      "Implemented end-to-end hotel booking workflows including room selection, pricing, promotions, checkout, reservation management, and booking summaries with tax-aware pricing.",
      "Developed and optimized Content AI, a B2B Content Management Platform designed to enhance content quality and distribution across demand partners.",
      "Engineered and implemented a reusable overlay component in React to optimize operational hours and improve client efficiency.",
      "Utilized React Final Form for complex form state management and Mocha for developing automated test scripts in Postman.",
      "Executed migration strategies using AWS, transitioning from on-premise servers to cloud infrastructure to achieve cost optimization and scalability.",
    ],
    awards: [
      {
        title: "Pinnacle Performer of the Year Award (Q3 2024)",
        description:
          "Recognized for exemplary engineering performance, technical leadership, and driving critical platform milestones.",
      },
      {
        title: "Certificate of Achievement for AWS Migration",
        description:
          "Awarded for executing seamless cloud migration and modernizing server infrastructure on AWS.",
      },
    ],
    metrics: [
      { label: "Performance Gain", value: "60% Faster" },
      { label: "Booking Integrations", value: "10+ Gateways" },
      { label: "Locales Supported", value: "20+ Locales" },
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "React Query",
      "React Final Form",
      "Tailwind CSS",
      "AWS",
      "Postman",
      "Mocha",
    ],
    icon: Briefcase,
  },
  {
    id: "infosys",
    role: "Senior System Engineer",
    company: "Infosys",
    companyUrl: "https://infosys.com",
    period: "Jan 2021 — Dec 2022",
    location: "Pune, India",
    type: "Full-Time",
    description:
      "Spearheaded enterprise dashboard engineering and API modernization, improving consumer experience and reliability.",
    achievements: [
      "Designed and developed a self-servicing dashboard using React and Internal APIs, accelerating deployment cycle efficiency by over 10x.",
      "Executed a comprehensive review of API functionalities, identifying and resolving 20 code-level errors that directly impacted consumer experience.",
      "Drove a 30% increase in positive user feedback on service reliability through proactive bug fixes and UI performance tuning.",
    ],
    metrics: [
      { label: "Deployment Cycle", value: "10x Faster" },
      { label: "Service Reliability", value: "+30% Satisfaction" },
      { label: "Bugs Resolved", value: "20+ Critical Issues" },
    ],
    skills: [
      "React",
      "JavaScript (ES6+)",
      "Internal APIs",
      "Dashboard Architecture",
      "HTML5 / CSS3",
      "Agile / Jira",
    ],
    icon: Building2,
  },
  {
    id: "dtu",
    role: "B.Tech in Polymer Science & Chemical Technology",
    company: "Delhi Technological University (DTU)",
    period: "2016 — June 2020",
    location: "Delhi, India",
    type: "Degree",
    description:
      "Graduated with a 7.82 GPA from Delhi Technological University, building a strong foundation in computational logic and analytical problem solving.",
    achievements: [
      "Graduated with 7.82 GPA, developing rigorous systems thinking and structured engineering methodologies.",
      "Self-directed transition into fullstack and frontend software engineering through data structures, algorithms, and production-ready web builds.",
    ],
    metrics: [
      { label: "Academic GPA", value: "7.82 GPA" },
      { label: "Graduation", value: "Class of 2020" },
    ],
    skills: [
      "Systems Engineering",
      "Data Structures",
      "Algorithms",
      "Web Technologies",
    ],
    icon: GraduationCap,
  },
] as const;