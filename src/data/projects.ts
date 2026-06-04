/**
 * Single source of truth for the Work catalog.
 *
 * - `PROJECTS`  — the full, categorised list shown on the /work gallery.
 * - `GALLERY`   — PROJECTS with a *stable* dark/light card variant baked in
 *                 (alternating by full-list index, so a card never flips
 *                 theme when the active filter changes).
 * - `FEATURED`  — the flagship projects shown on the landing page.
 * - `CATEGORIES`— filter tabs for the gallery.
 */

export type CategoryId =
  | "software"
  | "sites"
  | "logos"
  | "posters"
  | "decks";

export type Variant = "dark" | "light" | "wide";

export type Project = {
  slug: string;
  title: string;
  category: CategoryId;
  tags: string[];
  desc: string;

  image?: string;

  /** media-panel background gradient */
  bg: string;

  /** floating-cube gradient stops */
  c1: string;
  c2: string;
};

export const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "software", label: "Software" },
  { id: "sites", label: "Sites" },
  { id: "logos", label: "Logos" },
  { id: "posters", label: "Posters" },
  { id: "decks", label: "Pitch Decks" },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  software: "Software",
  sites: "Website",
  logos: "Logo & Identity",
  posters: "Poster",
  decks: "Pitch Deck",
};

export const PROJECTS: Project[] = [
  {
    slug: "ai-powered-ats",
    title: "AI-Powered ATS",
    category: "software",
    tags: ["AI/ML", "SaaS", "Design System"],
    desc: "An intelligent applicant tracking system — AI screening, ranking, and explainable hiring decisions.",
    bg: "linear-gradient(145deg,#0b1220,#15243d)",
    c1: "#2383E2",
    c2: "#0075DE",
  },
  {
    slug: "palify",
    title: "Palify.io",
    category: "software",
    tags: ["Web App", "Mobile App", "Product Design"],
    desc: "End-to-end product design for a social platform — a full web app and a complete mobile application.",
    bg: "linear-gradient(145deg,#0f1f14,#1a3d28)",
    c1: "#22c55e",
    c2: "#16a34a",
  },
  {
    slug: "onjob",
    title: "OnJob.io",
    category: "software",
    tags: ["Web App", "Multi-portal", "Mobile App"],
    desc: "Recruiter, candidate, and vendor portals for a hiring platform — plus a candidate-side mobile app.",
    bg: "linear-gradient(145deg,#1a0f29,#2d1a4a)",
    c1: "#8b5cf6",
    c2: "#7c3aed",
  },
  {
    slug: "pitch-n-hire",
    image: "/work/pitch-n-hire.webp",
    title: "Pitch N Hire",
    category: "sites",
    tags: ["Web Design", "AI SaaS", "Design System"],
    desc: "Website for a world-first AI-native recruitment platform — one clear story for a three-product ecosystem.",
    bg: "linear-gradient(145deg,#0a0613,#1c0e3d)",
    c1: "#936aff",
    c2: "#4e24c7",
  },
  {
    slug: "intuvos",
    title: "Intuvos",
    category: "software",
    tags: ["SaaS", "AI Platform", "Dashboard"],
    desc: "AI interview platform — real-time sessions, evaluation flows, and recruiter reporting.",
    image: "/work/Group 51383.png",
    bg: "linear-gradient(145deg,#111827,#1f2937)",
    c1: "#3b82f6",
    c2: "#06b6d4",
  },
];

/** PROJECTS with a stable alternating card theme for the gallery grid. */
export const GALLERY: (Project & { variant: Exclude<Variant, "wide"> })[] =
  PROJECTS.map((p, i) => ({
    ...p,
    variant: i % 2 === 0 ? "dark" : "light",
  }));

const bySlug = (slug: string): Project => {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project slug: ${slug}`);
  return p;
};

/** Landing highlights — the four flagship projects, in presentation order. */
export const FEATURED: (Project & { variant: Variant })[] = [
  { ...bySlug("ai-powered-ats"), variant: "dark" },
  { ...bySlug("palify"), variant: "dark" },
  { ...bySlug("onjob"), variant: "dark" },
  { ...bySlug("pitch-n-hire"), variant: "dark" },
  { ...bySlug("intuvos"), variant: "dark" },
];
