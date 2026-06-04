/**
 * Pitch decks, presentations, and brochures — sourced from the original PDFs.
 * Each PDF's pages are converted to slide images under
 * `public/work/decks/<slug>/slide-NN.jpg`, with a `cover.jpg` for the card.
 *
 * `ready` flips to true once every slide image exists; until then the viewer
 * falls back to the cover. Page counts come straight from the PDFs.
 */

export type DeckType = "deck" | "presentation" | "brochure" | "documentation";

export type Deck = {
  slug: string;
  title: string;
  type: DeckType;
  client?: string;
  summary: string;
  pages: number;
  /** True once all slide images are generated (else viewer shows the cover). */
  ready: boolean;
};

export const DECK_TYPE_LABEL: Record<DeckType, string> = {
  deck: "Pitch Deck",
  presentation: "Presentation",
  brochure: "Brochure",
  documentation: "Documentation",
};

export const DECK_FILTERS: { id: DeckType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "deck", label: "Pitch Decks" },
  { id: "presentation", label: "Presentations" },
  { id: "documentation", label: "Documentation" },
  { id: "brochure", label: "Brochures" },
];

export const DECKS: Deck[] = [
  {
    slug: "pnh-ats-interview",
    title: "ATS & Interview Solution",
    type: "deck",
    client: "Pitch N Hire",
    summary:
      "Product pitch deck for Pitch N Hire's AI-native ATS & interview solution — the problem, the platform, and the proof, built to win enterprise deals.",
    pages: 18,
    ready: true,
  },
  {
    slug: "appsierra",
    title: "Appsierra — Group Presentation",
    type: "presentation",
    client: "Appsierra",
    summary:
      "Corporate group presentation for Appsierra — capabilities, services, and team, designed as a polished company intro.",
    pages: 10,
    ready: true,
  },
  {
    slug: "nift-pnh",
    title: "NIFT × Pitch N Hire",
    type: "documentation",
    client: "Pitch N Hire",
    summary:
      "Project documentation for NIFT × Pitch N Hire — narrative, scope, and detail across 40 pages.",
    pages: 40,
    ready: true,
  },
  {
    slug: "onjob-brochure",
    title: "OnJob.io — Brochure",
    type: "brochure",
    client: "OnJob.io",
    summary:
      "Product brochure for OnJob.io — the talent-sourcing engine and its value, at a glance.",
    pages: 9,
    ready: true,
  },
  {
    slug: "pnh-client-brochure",
    title: "Pitch N Hire — Client Brochure",
    type: "brochure",
    client: "Pitch N Hire",
    summary:
      "Client-facing brochure for Pitch N Hire — what the platform does, who it's for, and why it wins.",
    pages: 27,
    ready: true,
  },
  {
    slug: "pnh-services-brochure",
    title: "Pitch N Hire — Services Brochure",
    type: "brochure",
    client: "Pitch N Hire",
    summary:
      "Services brochure for Pitch N Hire — the staffing and recruitment services on offer.",
    pages: 12,
    ready: true,
  },
  {
    slug: "pnh-pricing-brochure",
    title: "Pitch N Hire — Pricing Brochure",
    type: "brochure",
    client: "Pitch N Hire",
    summary:
      "Pricing brochure for Pitch N Hire — plans and packaging, made clear and scannable.",
    pages: 8,
    ready: true,
  },
];

export const deckCover = (slug: string) => `/work/decks/${slug}/cover.png`;

export const deckSlides = (d: Deck): string[] =>
  d.ready
    ? Array.from(
        { length: d.pages },
        (_, i) => `/work/decks/${d.slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`,
      )
    : [deckCover(d.slug)];

export const getDeck = (slug: string) => DECKS.find((d) => d.slug === slug);
export const deckSlugs = () => DECKS.map((d) => d.slug);
