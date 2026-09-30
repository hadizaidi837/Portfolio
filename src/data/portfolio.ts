import type { BrandName } from "@/components/BrandIcon";

export const profile = {
  name: "Hadi",
  role: "Full-Stack Developer",
  tagline:
    "I design and build fast, accessible web applications with modern React and TypeScript.",
  bio: [
    "I'm a developer who enjoys turning rough ideas into polished, reliable products. I care about clean architecture, thoughtful UI, and performance you can feel.",
    "Most of my work lives at the intersection of design and engineering — design systems, component libraries, and the plumbing that keeps them fast.",
  ],
  location: "Remote · Available worldwide",
  email: "hadizaidi837@gmail.com",
  resume: "/CV_2026092616150275.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/hadizaidi837" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sayyed-hadi-abbas-zaidi-251b4235a" },
    { label: "Email", href: "mailto:hadizaidi837@gmail.com" },
  ],
};

/** A skill entry: `icon` maps to a brand mark in components/BrandIcon. */
export type SkillItem = {
  label: string;
  icon?: BrandName;
};

export const skills: { title: string; items: SkillItem[] }[] = [
  {
    title: "Languages",
    items: [
      { label: "Python", icon: "python" },
      { label: "JavaScript", icon: "javascript" },
      { label: "TypeScript", icon: "typescript" },
      { label: "SQL", icon: "postgresql" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { label: "React", icon: "react" },
      { label: "Next.js", icon: "nextdotjs" },
      { label: "Tailwind CSS", icon: "tailwindcss" },
      { label: "HTML", icon: "html5" },
      { label: "CSS", icon: "css3" },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "FastAPI", icon: "fastapi" },
      { label: "PostgreSQL", icon: "postgresql" },
      { label: "Docker", icon: "docker" },
      { label: "REST APIs" },
      { label: "SQLAlchemy" },
      { label: "Pydantic" },
    ],
  },
];

export const projects = [
  {
    title: "NexusMind AI",
    subtitle: "AI Analytics Platform",
    description:
      "AI-powered analytics platform that processes Excel, CSV, PDF, DOCX and PPTX files, using RAG and multi-agent workflows to generate business insights, recommendations and executive reports.",
    tags: [
      { label: "Next.js", icon: "nextdotjs" },
      { label: "TypeScript", icon: "typescript" },
      { label: "FastAPI", icon: "fastapi" },
      { label: "PostgreSQL", icon: "postgresql" },
      { label: "LangGraph", icon: "langgraph" },
      { label: "Docker", icon: "docker" },
    ],
    href: "https://nexusmind.echoit.in/",
  },
  {
    title: "PITALAM",
    subtitle: "AI-Enabled E-commerce Platform",
    description:
      "Full-stack e-commerce platform with product management, SEO and admin features, plus Amazon SP-API integration, automated product synchronization and LangGraph/OpenRouter workflows.",
    tags: [
      { label: "Next.js", icon: "nextdotjs" },
      { label: "React", icon: "react" },
      { label: "FastAPI", icon: "fastapi" },
      { label: "PostgreSQL", icon: "postgresql" },
      { label: "Docker", icon: "docker" },
    ],
    href: "https://www.pitalam.com/",
  },
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Echoit Solutions",
    period: "Mar 2026 — Present",
    points: [
      "Building and maintaining client-facing web applications end to end.",
      "Collaborating with the wider engineering team on reviews, testing, and releases.",
    ],
  },
  {
    role: "Intern",
    company: "Echoit Solutions",
    period: "Jun 2025 — Feb 2026",
    points: [
      "Supported ongoing development work and contributed to front-end features.",
      "Gained hands-on experience with version control, debugging, and team workflows.",
    ],
  },
];
