/**
 * The /work page, organised into named sections (Products, Mobile, Websites,
 * Posters, Decks, UI Components). Each item shows as an image + name card and,
 * on click, opens either a case study (`href`), a full-image lightbox (`view`),
 * or — once built — a slide viewer (`deck`).
 *
 * Items without an `image` fall back to their brand `bg` gradient until a real
 * screenshot is dropped in.
 */

export type WorkItem = {
  slug: string;
  title: string;
  /** Small right-aligned label under the card. */
  meta?: string;
  /** Thumbnail screenshot. */
  image?: string;
  /** Brand gradient fallback when there's no image yet. */
  bg?: string;
  /** Case-study route — clicking opens the write-up. */
  href?: string;
  /** Full image opened in a lightbox (posters/graphics). */
  view?: string;
};

export type WorkAspect = "landscape" | "portrait";

export type WorkSection = {
  id: string;
  title: string;
  blurb?: string;
  aspect: WorkAspect;
  /** Desktop column count. */
  cols: 2 | 3 | 4;
  items: WorkItem[];
  /** Shown when the section has no items yet. */
  empty?: string;
};

export const WORK_SECTIONS: WorkSection[] = [
  {
    id: "products",
    title: "Products",
    blurb: "End-to-end product design — research, UX, UI, and shipped design systems.",
    aspect: "landscape",
    cols: 2,
    items: [
      {
        slug: "ai-powered-ats",
        title: "AI-Powered ATS",
        meta: "AI · SaaS",
        bg: "linear-gradient(145deg,#0b1220,#15243d)",
        href: "/work/ai-powered-ats",
      },
      {
        slug: "palify",
        title: "Palify.io",
        meta: "Social platform",
        bg: "linear-gradient(145deg,#0f1f14,#1a3d28)",
        href: "/work/palify",
      },
      {
        slug: "onjob",
        title: "OnJob.io",
        meta: "Hiring platform",
        bg: "linear-gradient(145deg,#1a0f29,#2d1a4a)",
        href: "/work/onjob",
      },
      {
        slug: "intuvos",
        title: "Intuvos",
        meta: "AI interviews",
        image: "/work/Group 51383.png",
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    blurb: "Native mobile experiences that extend the products.",
    aspect: "portrait",
    cols: 4,
    items: [
      {
        slug: "palify-app",
        title: "Palify — App",
        meta: "iOS · Android",
        bg: "linear-gradient(145deg,#0f1f14,#1a3d28)",
      },
      {
        slug: "onjob-app",
        title: "OnJob — Candidate App",
        meta: "iOS · Android",
        bg: "linear-gradient(145deg,#1a0f29,#2d1a4a)",
      },
    ],
    empty: "Mobile case studies coming soon — drop the app screens in and they slot right here.",
  },
  {
    id: "websites",
    title: "Websites",
    blurb: "Conversion-led product & marketing sites, each with a live homepage preview.",
    aspect: "landscape",
    cols: 2,
    items: [
      {
        slug: "pitch-n-hire",
        title: "Pitch N Hire",
        meta: "AI recruitment",
        image: "/work/pitch-n-hire.webp",
        href: "/work/pitch-n-hire",
      },
    ],
  },
  {
    id: "posters",
    title: "Posters, Graphic & Photography",
    blurb: "A side practice — bold type, grain, and high-contrast colour.",
    aspect: "portrait",
    cols: 4,
    items: [
      {
        slug: "damn",
        title: "DAMN",
        meta: "Music",
        image: "/work/posters/damn.webp",
        view: "/work/posters/damn.webp",
      },
      {
        slug: "manorama",
        title: "Manorama",
        meta: "Film",
        image: "/work/posters/manorama.webp",
        view: "/work/posters/manorama.webp",
      },
      {
        slug: "scarface",
        title: "Scarface",
        meta: "Film",
        image: "/work/posters/scarface.webp",
        view: "/work/posters/scarface.webp",
      },
      {
        slug: "heisenberg",
        title: "Heisenberg",
        meta: "Breaking Bad",
        image: "/work/posters/heisenberg.webp",
        view: "/work/posters/heisenberg.webp",
      },
    ],
  },
  {
    id: "decks",
    title: "Pitch Decks & Presentations",
    blurb: "Investor and brand decks — viewable slide-by-slide or as one long scroll.",
    aspect: "landscape",
    cols: 3,
    items: [],
    empty: "Decks coming soon — send the slides and each gets a case study plus a full slide viewer.",
  },
  {
    id: "components",
    title: "UI Components",
    blurb: "Reusable component systems and the small interface details.",
    aspect: "landscape",
    cols: 3,
    items: [],
    empty: "Component showcases coming soon.",
  },
];
