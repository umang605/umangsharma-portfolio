/**
 * Long-form case studies, keyed by the matching `Project.slug` in
 * `@/data/projects`. Each entry powers the `/work/[slug]` page through the
 * shared `CaseStudyView` template, so adding a new deep dive is purely a
 * data change here.
 *
 * COPY STATUS — drafted from scratch as a starting point. Anything marked
 * `TODO(umang)` is a placeholder (especially metrics): swap in the real
 * numbers / names. Screens are placeholders too — drop a real screenshot
 * path into a shot's `image` field and the frame fills automatically.
 */

import { PROJECTS } from "@/data/projects";

export type Metric = { value: string; label: string };
export type MetaItem = { label: string; value: string };
export type ProcessStep = {
  no: string;
  title: string;
  body: string;
  /** Phase this step belongs to (e.g. "Discover" · "Design" · "Deliver"). */
  phase?: string;
};
/** A problem paired with the solution that answered it. */
export type ProblemPoint = { pain: string; fix: string };
export type Feature = { title: string; body: string };
/** One color token in the design-system spec: a chip + its role. */
export type ColorToken = { value: string; label: string };
/** A named group of color tokens (e.g. "Text & icons"). */
export type ColorGroup = { title: string; tokens: ColorToken[] };
/** A semantic status pill — paired foreground + background. */
export type StatusToken = { name: string; fg: string; bg: string };

export type Shot = {
  title: string;
  caption?: string;
  /** Real screenshot path, e.g. "/case/ats/pipeline.png". Empty → placeholder. */
  image?: string;
  /** Placeholder gradient shown until `image` is set. */
  bg: string;
  /** Span the full width of the gallery grid. */
  wide?: boolean;
};

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  /** Dimmed continuation of the hero headline. */
  titleAccent?: string;
  summary: string;
  cover: { bg: string; c1: string; c2: string; image?: string };
  /** Full-page homepage screenshot — rendered as a Behance-style scroll preview. */
  sitePreview?: string;
  /** Public URL of the real product / site — surfaces a "Visit live site" button. */
  liveUrl?: string;
  /** Custom label for the live-site button (defaults to "Visit live site"). */
  liveLabel?: string;
  meta: MetaItem[];
  stats: Metric[];
  overview: { heading: string; accent?: string; body: string[] };
  problem: {
    heading: string;
    accent?: string;
    body: string[];
    points: ProblemPoint[];
  };
  goals: { heading: string; accent?: string; items: string[] };
  process: { heading: string; accent?: string; intro?: string; steps: ProcessStep[] };
  features: { heading: string; accent?: string; intro?: string; items: Feature[] };
  gallery: { heading: string; accent?: string; intro?: string; shots: Shot[] };
  designSystem: {
    heading: string;
    accent?: string;
    intro?: string;
    /** Primary UI typeface, shown as a specimen. */
    typeface?: { name: string; note?: string };
    /** Grouped color tokens, rendered as a spec sheet. */
    groups: ColorGroup[];
    /** Semantic status pills (e.g. candidate stages, portals). */
    statuses?: StatusToken[];
    /** Heading for the status pills (defaults to "Candidate status"). */
    statusesLabel?: string;
    principles: Feature[];
  };
  outcome: { heading: string; accent?: string; body: string[]; metrics: Metric[] };
};

const AI_POWERED_ATS: CaseStudy = {
  slug: "ai-powered-ats",
  liveUrl: "https://www.pitchnhire.com/",
  liveLabel: "Visit Pitch N Hire",
  eyebrow: "Case Study · Internal Software",
  title: "An AI-powered ATS that",
  titleAccent: "thinks like a recruiter.",
  summary:
    "A ground-up product design for the flagship applicant tracking system at the company I work with — where AI does the heavy lifting of screening and ranking, and recruiters stay firmly in control. The largest product the org has shipped to date.",
  cover: {
    bg: "linear-gradient(145deg,#0b1220,#15243d)",
    c1: "#2383E2",
    c2: "#0075DE",
    // image: "/case/ats/cover.png", // TODO(umang): hero screenshot
  },
  meta: [
    // TODO(umang): confirm your exact title, team shape, and dates.
    { label: "Role", value: "Lead Product Designer — sole designer" },
    { label: "Timeline", value: "2024 — Present" },
    { label: "Team", value: "2 PMs · 6 engineers" },
    { label: "Platform", value: "Web app · desktop-first" },
    { label: "Scope", value: "Research → UX → UI → Design system" },
    { label: "Tools", value: "Figma · FigJam" },
  ],
  stats: [
    // TODO(umang): replace with the real, defensible numbers.
    { value: "200+", label: "Screens designed" },
    { value: "60%", label: "Faster screening" },
    { value: "1", label: "Unified design system" },
    { value: "#1", label: "Largest product in the org" },
  ],
  overview: {
    heading: "Overview",
    body: [
      "This is the biggest product the company has built — an internal applicant tracking system (ATS) used by recruiters to run hiring end-to-end, from a fresh job opening to a signed offer. I joined as the sole designer and owned the experience from research through a production-ready design system.",
      "Traditional ATS tools are glorified spreadsheets: they store applicants but leave the hardest work — actually reading, comparing, and judging hundreds of candidates — to overloaded recruiters. The brief was to change that. Put AI at the center of screening and ranking, but design it so recruiters trust it, understand it, and stay in charge of every decision.",
    ],
  },
  problem: {
    heading: "The problem",
    accent: "— and how we solved it.",
    body: [
      "Recruiters were drowning. A single open role could pull in hundreds of applicants, and the only way through was manual — opening CV after CV, eyeballing keywords, and making fast, inconsistent calls under pressure.",
      "The old tooling made it worse, not better: it tracked candidates but offered no help judging them. So every pain got a deliberate, AI-assisted answer — paired below.",
    ],
    points: [
      {
        pain: "Hours lost to manually screening resumes for every role.",
        fix: "AI parses every CV into a structured, comparable profile in seconds.",
      },
      {
        pain: "Keyword filters quietly rejected strong, non-obvious candidates.",
        fix: "Fit scoring weighs the whole profile against the role — not just keywords.",
      },
      {
        pain: "No consistent, explainable way to compare applicants side by side.",
        fix: "Every score ships with plain-language reasoning a recruiter can defend.",
      },
      {
        pain: "A fragmented workflow — sourcing, screening, scheduling, notes — scattered across screens.",
        fix: "One pipeline unifies sourcing, screening, scheduling, and notes in a single view.",
      },
      {
        pain: "Slow time-to-hire let strong candidates go cold.",
        fix: "Ranked shortlists surface the strongest people first, from day one.",
      },
    ],
  },
  goals: {
    heading: "Design goals",
    items: [
      "Cut screening time dramatically without lowering the bar on quality.",
      "Surface the best-fit candidates first — with reasons a recruiter can defend.",
      "Keep humans in control: AI recommends, people decide.",
      "Unify the whole hiring funnel into one coherent, learnable workflow.",
      "Ship a scalable design system the team could build on for years.",
    ],
  },
  process: {
    heading: "Process",
    accent: "— brief to shipped.",
    intro:
      "Three phases, one designer, end to end — no handoffs, no lost context. The work leaned hard on talking to real recruiters and shadowing live screening before a single screen got drawn.",
    steps: [
      {
        no: "01",
        phase: "Discover",
        title: "Discovery & recruiter interviews",
        body: "Sat with recruiters and hiring managers, shadowed live screening sessions, and mapped where time actually went. The pain wasn't tracking candidates — it was judging them.",
      },
      {
        no: "02",
        phase: "Discover",
        title: "Mapping the hiring funnel",
        body: "Reconstructed the end-to-end journey — job intake, sourcing, screening, interviews, offer — to find the seams where work fell through the cracks and AI could earn its keep.",
      },
      {
        no: "03",
        phase: "Design",
        title: "Information architecture",
        body: "Restructured a sprawling tool into a clear spine: jobs, candidates, pipeline, and analytics — each a place with one job, navigable without a manual.",
      },
      {
        no: "04",
        phase: "Design",
        title: "Flows & wireframes",
        body: "Designed the core loops in low fidelity first, pressure-testing the screening and ranking flow with recruiters before committing to any visual direction.",
      },
      {
        no: "05",
        phase: "Design",
        title: "Designing the AI patterns",
        body: "The hardest, most interesting part: how to present a score, an explanation, and a recommendation so a recruiter trusts it. Built reusable patterns for confidence, explainability, and override.",
      },
      {
        no: "06",
        phase: "Design",
        title: "Visual design & system",
        body: "Turned the flows into a polished, accessible UI and codified every decision into a design system — tokens, components, and AI patterns the team could reuse.",
      },
      {
        no: "07",
        phase: "Deliver",
        title: "Validation & handoff",
        body: "Tested prototypes with the people who'd live in the tool daily, iterated on the rough edges, and partnered closely with engineering through build.",
      },
    ],
  },
  features: {
    heading: "Inside the product",
    intro:
      "Eight areas carry most of the weight. Each was designed to take work off the recruiter without taking away their judgment.",
    items: [
      {
        title: "AI resume parsing",
        body: "Turns messy PDFs and CVs into structured, comparable profiles in seconds — skills, experience, and education, normalized.",
      },
      {
        title: "Match scoring & ranking",
        body: "Every applicant gets a transparent fit score against the role, so the strongest candidates rise to the top of the pile automatically.",
      },
      {
        title: "Why this candidate",
        body: "Plain-language reasoning behind every score — skills matched, gaps flagged — so recruiters can trust it and defend it.",
      },
      {
        title: "Candidate pipeline",
        body: "A drag-and-drop Kanban across every hiring stage, so a recruiter always knows what's moving and what's stuck.",
      },
      {
        title: "Smart candidate profile",
        body: "One view for everything: resume, scores, AI summary, notes, and activity — no more hopping between tabs.",
      },
      {
        title: "Job intake & posting",
        body: "Guided job creation that captures real requirements and feeds the matching model the signal it needs.",
      },
      {
        title: "Interview scheduling",
        body: "Availability, panels, and reminders handled inside the platform — no calendar ping-pong.",
      },
      {
        title: "Recruiter analytics",
        body: "Funnel health, time-to-hire, and source quality at a glance, so the team can see what's working.",
      },
    ],
  },
  gallery: {
    heading: "Key screens",
    intro:
      "A look at the core surfaces. (Placeholders for now — real screens drop straight in.)",
    shots: [
      // TODO(umang): set `image` on each to a screenshot in /public, e.g. "/case/ats/pipeline.png".
      {
        title: "Candidate pipeline — Kanban",
        caption: "The home base: every candidate, every stage, drag-and-drop.",
        bg: "linear-gradient(145deg,#0b1220,#15243d)",
        wide: true,
      },
      {
        title: "AI match score & ranking",
        caption: "Applicants ranked by fit, strongest first.",
        bg: "linear-gradient(145deg,#0e1626,#1b2c47)",
      },
      {
        title: "Why this candidate — explainability",
        caption: "The reasoning behind every score.",
        bg: "linear-gradient(145deg,#0a111c,#172335)",
      },
      {
        title: "Smart candidate profile",
        caption: "Resume, scores, summary, and notes in one place.",
        bg: "linear-gradient(145deg,#0c1320,#18283f)",
      },
      {
        title: "Recruiter analytics",
        caption: "Funnel health and time-to-hire at a glance.",
        bg: "linear-gradient(145deg,#0b1220,#15243d)",
      },
    ],
  },
  designSystem: {
    heading: "Design system",
    intro:
      "Because this is the org's biggest, longest-lived product, the system mattered as much as any screen. The palette is deliberately quiet — a near-neutral, paper-like canvas so candidate data and AI signals carry the color. One decisive blue drives every primary action, and a tight set of semantic colors tells the story of a candidate's journey through the pipeline.",
    typeface: { name: "Inter", note: "Single UI typeface · weights 400–600" },
    groups: [
      {
        title: "Surface & borders",
        tokens: [
          { value: "#F7F7F5", label: "Background" },
          { value: "#FFFFFF", label: "Surface / selection fill" },
          { value: "#F2F2F2", label: "Secondary button" },
          { value: "#E9E9E7", label: "Primary border" },
          { value: "#E6E7E8", label: "UI border" },
          { value: "#ECECEA", label: "Pill border" },
          { value: "#F1F1EF", label: "Secondary border — subtle separation" },
        ],
      },
      {
        title: "Text & icons",
        tokens: [
          { value: "#191919", label: "Main text / active icon" },
          { value: "#5F5E5B", label: "Pill text / inactive tab" },
          { value: "#646465", label: "Sub text" },
          { value: "#787774", label: "Inactive icon & text" },
          { value: "#9B9B9C", label: "Secondary sub text" },
          { value: "#9B9A97", label: "Placeholder" },
          { value: "#000000", label: "Secondary button text" },
        ],
      },
      {
        title: "Accent & links",
        tokens: [
          { value: "#2383E2", label: "Primary action" },
          { value: "#0075DE", label: "Link" },
        ],
      },
    ],
    statuses: [
      { name: "Applied", fg: "#2383E2", bg: "#F3F9FF" },
      { name: "Shortlisted", fg: "#2A9D99", bg: "#EDF5F5" },
      { name: "Scheduled", fg: "#523410", bg: "#FFEDD7" },
      { name: "Qualified", fg: "#22C55E", bg: "#EDF6ED" },
      { name: "Rejected", fg: "#DD5B00", bg: "#FAEFE9" },
    ],
    principles: [
      {
        title: "Explainable by default",
        body: "No black boxes. Every AI score is paired with the reasoning behind it.",
      },
      {
        title: "Human-in-the-loop",
        body: "AI recommends, recruiters decide. Every suggestion is easy to override.",
      },
      {
        title: "Confidence, not certainty",
        body: "The UI shows match strength honestly and never hides uncertainty.",
      },
      {
        title: "Progressive disclosure",
        body: "A dense, powerful tool that stays calm — depth revealed only on demand.",
      },
    ],
  },
  outcome: {
    heading: "Outcome",
    accent: "& impact.",
    body: [
      "The redesign reframed the ATS from a passive system of record into an active hiring partner. Recruiters spend their time judging the right shortlist instead of digging through the whole pile — and they can explain every call they make.",
      "It's now the company's flagship product and the backbone of how the team hires. The design system that came out of it continues to speed up everything built around it.",
    ],
    metrics: [
      // TODO(umang): swap in the real, measured results.
      { value: "60%", label: "Less time spent screening" },
      { value: "2×", label: "Recruiter throughput" },
      { value: "30%", label: "Better shortlist quality" },
      { value: "#1", label: "Product in the org's lineup" },
    ],
  },
};

/* ── Palify — social platform (web app) ──────────────────────────────── */
const PALIFY: CaseStudy = {
  slug: "palify",
  liveUrl: "https://palify.io/",
  liveLabel: "Visit platform",
  eyebrow: "Case Study · Social Platform",
  title: "A social platform that",
  titleAccent: "brings the right people together.",
  summary:
    "Product design for Palify — a social platform where communities, conversations, and genuine connections live in one calm place. I owned the web experience end-to-end, from information architecture to a shipped design system. A companion mobile app extends the same language.",
  cover: {
    bg: "linear-gradient(145deg,#07140d,#0f2a1b)",
    c1: "#22c55e",
    c2: "#16a34a",
    // image: "/case/palify/cover.png", // TODO(umang): hero screenshot
  },
  meta: [
    { label: "Role", value: "Product Designer — sole designer" },
    { label: "Timeline", value: "2023 — 2024" },
    { label: "Team", value: "1 PM · 4 engineers" },
    { label: "Platform", value: "Web app + mobile" },
    { label: "Scope", value: "Research → UX → UI → Design system" },
    { label: "Tools", value: "Figma · FigJam" },
  ],
  stats: [
    { value: "0 → 1", label: "Built from scratch" },
    { value: "120+", label: "Screens designed" },
    { value: "Web + App", label: "Two platforms, one system" },
    { value: "1", label: "Unified design system" },
  ],
  overview: {
    heading: "Overview",
    body: [
      "Palify is a social platform built from zero — a place to find your communities, follow conversations that matter, and actually connect rather than doomscroll. I came on as the sole designer and shaped the product from the first whiteboard sketch to a production-ready system.",
      "Most social products optimise for time-on-app at any cost. The brief here was different: design for signal over noise, make communities easy to find and easy to leave, and keep the interface calm enough that people come back because they want to — not because they're hooked.",
    ],
  },
  problem: {
    heading: "The problem",
    accent: "— social that felt hollow.",
    body: [
      "People don't lack social apps — they lack ones that feel good to use. Feeds reward outrage, communities are hard to discover, and the loudest voice always wins.",
      "Palify needed to feel human from the first screen. For every familiar social-app failure, the design answered with a deliberate, calmer pattern.",
    ],
    points: [
      {
        pain: "Feeds that reward noise and leave you feeling worse.",
        fix: "A signal-first feed that surfaces people and topics you chose.",
      },
      {
        pain: "Communities are buried and hard to discover.",
        fix: "A discovery surface that matches you to communities by interest.",
      },
      {
        pain: "Onboarding asks for everything before showing any value.",
        fix: "Progressive onboarding — value first, profile depth later.",
      },
      {
        pain: "Conversations get dominated by the loudest accounts.",
        fix: "Thread design that elevates relevant replies, not just popular ones.",
      },
      {
        pain: "No clear, low-friction way to leave or mute a space.",
        fix: "Calm controls: mute, snooze, and leave are always one tap away.",
      },
    ],
  },
  goals: {
    heading: "Design goals",
    items: [
      "Make finding your people feel effortless, not algorithmic.",
      "Design a feed that respects attention instead of farming it.",
      "Ship one system that works across web and mobile.",
      "Keep moderation and safety built-in, not bolted on.",
      "Launch a 0→1 product the team could grow on for years.",
    ],
  },
  process: {
    heading: "Process",
    accent: "— zero to launch.",
    intro:
      "Three phases, one designer, end to end. A 0→1 product means getting the foundations right before the polish — so the work started with people and architecture, not pixels.",
    steps: [
      {
        no: "01",
        phase: "Discover",
        title: "Research & interviews",
        body: "Talked to people about why they leave social apps, mapped the jobs they actually hire a community for, and turned it into clear design principles.",
      },
      {
        no: "02",
        phase: "Discover",
        title: "Information architecture",
        body: "Structured the product into a clean spine — feed, communities, profiles, and messaging — so the app stays learnable as it grows.",
      },
      {
        no: "03",
        phase: "Design",
        title: "Flows & wireframes",
        body: "Pressure-tested onboarding, posting, and community discovery in low fidelity before committing to a visual direction.",
      },
      {
        no: "04",
        phase: "Design",
        title: "Feed & interaction patterns",
        body: "Designed the core loops — read, react, reply, join — to feel quick and calm, with motion that guides rather than distracts.",
      },
      {
        no: "05",
        phase: "Design",
        title: "Visual design & system",
        body: "Built a friendly, accessible UI and codified it into a design system shared across web and the mobile app.",
      },
      {
        no: "06",
        phase: "Deliver",
        title: "Prototype, test & handoff",
        body: "Validated flows with real users, tuned the rough edges, and partnered closely with engineering through launch.",
      },
    ],
  },
  features: {
    heading: "Inside the product",
    intro:
      "The experience hangs on a few core surfaces — each designed to favour connection over compulsion.",
    items: [
      {
        title: "Signal-first feed",
        body: "A feed built from the people and communities you actually chose, not what an algorithm decides will keep you hooked.",
      },
      {
        title: "Community discovery",
        body: "Find and join communities by interest, with previews so you know what you're walking into.",
      },
      {
        title: "Profiles with substance",
        body: "Profiles that show what someone's into and contributes — not just a follower count.",
      },
      {
        title: "Threaded conversations",
        body: "Replies that stay readable at scale, surfacing the most relevant voices in a thread.",
      },
      {
        title: "Direct & group messaging",
        body: "Lightweight messaging that keeps conversations flowing without leaving the app.",
      },
      {
        title: "Calm controls",
        body: "Mute, snooze, and leave any space in a tap — attention stays yours.",
      },
    ],
  },
  gallery: {
    heading: "Key screens",
    intro:
      "A look at the core surfaces — the feed, finding your pals, profiles, clips, and messaging.",
    shots: [
      {
        title: "Home feed",
        caption:
          "A signal-first feed — stories, posts, and the people you actually chose.",
        image: "/work/case/palify/feed.jpg",
        bg: "linear-gradient(145deg,#07140d,#0f2a1b)",
        wide: true,
      },
      {
        title: "Find your pals",
        caption:
          "Discover people by skill and interest — your pals, ranked by contribution.",
        image: "/work/case/palify/pals.jpg",
        bg: "linear-gradient(145deg,#0a1a10,#143a24)",
      },
      {
        title: "Creator profile",
        caption: "A profile with substance — work, activity, and reputation.",
        image: "/work/case/palify/profile.jpg",
        bg: "linear-gradient(145deg,#08160e,#10301d)",
      },
      {
        title: "Clips",
        caption:
          "Full-screen clips with threaded comments — readable at any scale.",
        image: "/work/case/palify/clips.jpg",
        bg: "linear-gradient(145deg,#091810,#123420)",
      },
      {
        title: "Messaging",
        caption: "Lightweight, in-context direct messaging.",
        image: "/work/case/palify/messages.jpg",
        bg: "linear-gradient(145deg,#07140d,#0f2a1b)",
      },
    ],
  },
  designSystem: {
    heading: "Design system",
    intro:
      "One system spans web and mobile — a friendly, high-contrast palette with a single confident green for action, tuned for long, comfortable sessions.",
    typeface: { name: "Inter", note: "UI typeface · weights 400–600" },
    groups: [
      {
        title: "Brand & accent",
        tokens: [
          { value: "#22C55E", label: "Primary action" },
          { value: "#16A34A", label: "Primary press" },
          { value: "#0EA5E9", label: "Link / info" },
        ],
      },
      {
        title: "Surface & borders",
        tokens: [
          { value: "#FFFFFF", label: "Surface" },
          { value: "#F6F8F6", label: "Background" },
          { value: "#ECEFEC", label: "Border" },
          { value: "#E3E7E3", label: "Strong border" },
        ],
      },
      {
        title: "Text",
        tokens: [
          { value: "#0E1511", label: "Main text" },
          { value: "#5A635D", label: "Sub text" },
          { value: "#9AA29C", label: "Placeholder" },
        ],
      },
    ],
    principles: [
      {
        title: "Signal over noise",
        body: "Every surface favours the content you chose over the content that performs.",
      },
      {
        title: "Calm by default",
        body: "Quiet color, gentle motion, and controls that hand attention back to the user.",
      },
      {
        title: "One language, two platforms",
        body: "Web and mobile share tokens and components, so the product feels like one thing.",
      },
      {
        title: "Safe to be in",
        body: "Moderation, muting, and reporting are designed in from the first screen.",
      },
    ],
  },
  outcome: {
    heading: "Outcome",
    accent: "& impact.",
    body: [
      "Palify launched as a calm, coherent social product with a clear point of view — communities you choose, conversations worth having, and an interface that respects your time.",
      "The shared design system made the web and mobile apps feel like one product and gave the team a foundation to ship new surfaces fast.",
    ],
    metrics: [
      { value: "0 → 1", label: "Shipped from scratch" },
      { value: "Web + App", label: "One system, two platforms" },
      { value: "120+", label: "Screens designed" },
      { value: "1", label: "Reusable design system" },
    ],
  },
};

/* ── OnJob.io — multi-portal hiring platform (web) ───────────────────── */
const ONJOB: CaseStudy = {
  slug: "onjob",
  liveUrl: "https://onjob.io/",
  liveLabel: "Visit platform",
  eyebrow: "Case Study · Hiring Platform",
  title: "One hiring platform,",
  titleAccent: "three sides, zero friction.",
  summary:
    "Product design for OnJob.io — a hiring platform with three connected portals: recruiters who post and manage roles, candidates who apply and track, and staffing vendors who supply talent. I designed all three web experiences into one coherent system. A candidate-side mobile app extends it.",
  cover: {
    bg: "linear-gradient(145deg,#140a24,#241640)",
    c1: "#8b5cf6",
    c2: "#7c3aed",
    // image: "/case/onjob/cover.png", // TODO(umang): hero screenshot
  },
  meta: [
    { label: "Role", value: "Product Designer — sole designer" },
    { label: "Timeline", value: "2023 — 2024" },
    { label: "Team", value: "2 PMs · 5 engineers" },
    { label: "Platform", value: "Web app (3 portals) + mobile" },
    { label: "Scope", value: "Research → UX → UI → Design system" },
    { label: "Tools", value: "Figma · FigJam" },
  ],
  stats: [
    { value: "3", label: "Connected portals" },
    { value: "150+", label: "Screens designed" },
    { value: "1", label: "Shared design system" },
    { value: "3-sided", label: "Marketplace UX" },
  ],
  overview: {
    heading: "Overview",
    body: [
      "OnJob.io is a three-sided hiring marketplace. Recruiters open roles and manage their pipeline, candidates discover jobs and track applications, and staffing vendors submit and manage their talent — all on the same platform. I designed every portal as the sole designer.",
      "The challenge of a multi-sided product is coherence: three audiences with very different jobs, who must feel like they're using one trustworthy platform. The work was as much about a shared system as it was about each screen.",
    ],
  },
  problem: {
    heading: "The problem",
    accent: "— three sides, three silos.",
    body: [
      "Hiring rarely happens between two parties anymore — recruiters, candidates, and vendors all touch the same role. But the tools treat them as separate worlds, so context and time get lost in the gaps.",
      "OnJob set out to connect all three on one platform. For every seam between the sides, the design closed it with a shared, consistent pattern.",
    ],
    points: [
      {
        pain: "Recruiters juggled roles across spreadsheets and inboxes.",
        fix: "A recruiter dashboard that runs every role and pipeline in one place.",
      },
      {
        pain: "Candidates never knew where their application actually stood.",
        fix: "A candidate portal with real-time status and clear next steps.",
      },
      {
        pain: "Vendors submitted talent over email with no visibility.",
        fix: "A vendor portal to submit, track, and manage candidates directly.",
      },
      {
        pain: "Three audiences meant three inconsistent experiences.",
        fix: "One design system unifies all portals into a single, trusted product.",
      },
      {
        pain: "Hand-offs between sides dropped context and slowed hiring.",
        fix: "Shared records and messaging keep everyone on the same page.",
      },
    ],
  },
  goals: {
    heading: "Design goals",
    items: [
      "Give each side a focused workspace built around its real job.",
      "Make the three portals feel like one coherent, trustworthy platform.",
      "Remove the email-and-spreadsheet hand-offs between sides.",
      "Design a role-aware system that scales as the platform grows.",
      "Ship a candidate experience that also works beautifully on mobile.",
    ],
  },
  process: {
    heading: "Process",
    accent: "— mapping three journeys.",
    intro:
      "Three phases, one designer, end to end. A multi-sided product means mapping three journeys and finding where they meet — so the work started by untangling who needs what, when.",
    steps: [
      {
        no: "01",
        phase: "Discover",
        title: "Stakeholder & user research",
        body: "Interviewed recruiters, candidates, and vendors to map each side's jobs, frustrations, and the moments where they hand off to one another.",
      },
      {
        no: "02",
        phase: "Discover",
        title: "Mapping the shared journey",
        body: "Charted how a single role moves across all three portals to find the seams where context was being lost.",
      },
      {
        no: "03",
        phase: "Design",
        title: "Information architecture",
        body: "Designed three focused portals on one backbone — shared records, roles, and messaging — so each side sees only what it needs.",
      },
      {
        no: "04",
        phase: "Design",
        title: "Flows & wireframes",
        body: "Built the core loops for each side — post, apply, submit, track — and tested them before any visual polish.",
      },
      {
        no: "05",
        phase: "Design",
        title: "Visual design & system",
        body: "Created a role-aware UI and codified it into a design system with shared components and portal-specific accents.",
      },
      {
        no: "06",
        phase: "Deliver",
        title: "Validation & handoff",
        body: "Prototyped with real users from each side, refined the flows, and partnered with engineering through build.",
      },
    ],
  },
  features: {
    heading: "Inside the product",
    intro:
      "Each portal is a focused workspace, but they share one backbone — so a role, a candidate, and a conversation mean the same thing everywhere.",
    items: [
      {
        title: "Recruiter dashboard",
        body: "Every open role, its pipeline, and what needs attention — at a glance.",
      },
      {
        title: "Job posting & management",
        body: "Guided role creation that captures the right requirements up front.",
      },
      {
        title: "Candidate pipeline",
        body: "A clear stage-by-stage view of every applicant for a role.",
      },
      {
        title: "Candidate portal",
        body: "Discover jobs, apply in a tap, and track real-time status with clear next steps.",
      },
      {
        title: "Vendor portal",
        body: "Submit, track, and manage supplied talent — with full visibility for the first time.",
      },
      {
        title: "Shared messaging",
        body: "Conversations tied to roles and candidates, so nothing lives in a silo.",
      },
    ],
  },
  gallery: {
    heading: "Key screens",
    intro:
      "A look across all three portals. (Placeholders for now — real screens drop straight in.)",
    shots: [
      {
        title: "Recruiter dashboard",
        caption: "Every role and pipeline in one place.",
        bg: "linear-gradient(145deg,#140a24,#241640)",
        wide: true,
      },
      {
        title: "Candidate pipeline",
        caption: "Applicants, stage by stage.",
        bg: "linear-gradient(145deg,#170d29,#2a1a47)",
      },
      {
        title: "Candidate portal",
        caption: "Apply and track in real time.",
        bg: "linear-gradient(145deg,#120a20,#22153c)",
      },
      {
        title: "Vendor portal",
        caption: "Submit and manage talent with visibility.",
        bg: "linear-gradient(145deg,#150b26,#271742)",
      },
      {
        title: "Shared messaging",
        caption: "Context tied to every role.",
        bg: "linear-gradient(145deg,#140a24,#241640)",
      },
    ],
  },
  designSystem: {
    heading: "Design system",
    intro:
      "Because three audiences share one platform, the system carried the load — a neutral base with one primary purple, plus a color for each portal so people always know which side they're on.",
    typeface: { name: "Inter", note: "UI typeface · weights 400–600" },
    groups: [
      {
        title: "Brand & accent",
        tokens: [
          { value: "#8B5CF6", label: "Primary action" },
          { value: "#7C3AED", label: "Primary press" },
          { value: "#6D28D9", label: "Deep accent" },
        ],
      },
      {
        title: "Surface & borders",
        tokens: [
          { value: "#FFFFFF", label: "Surface" },
          { value: "#F7F7FB", label: "Background" },
          { value: "#ECECF3", label: "Border" },
          { value: "#E2E2EC", label: "Strong border" },
        ],
      },
      {
        title: "Text",
        tokens: [
          { value: "#14111D", label: "Main text" },
          { value: "#5B5870", label: "Sub text" },
          { value: "#9B98AC", label: "Placeholder" },
        ],
      },
    ],
    statuses: [
      { name: "Recruiter", fg: "#7C3AED", bg: "#F1ECFE" },
      { name: "Candidate", fg: "#2383E2", bg: "#EAF3FE" },
      { name: "Vendor", fg: "#0F9D8C", bg: "#E6F5F2" },
    ],
    statusesLabel: "Portal accents",
    principles: [
      {
        title: "Role-aware everywhere",
        body: "Color and navigation always signal which side of the platform you're on.",
      },
      {
        title: "One backbone, three lenses",
        body: "Shared records and components, with each portal showing only what matters to it.",
      },
      {
        title: "Trust through consistency",
        body: "Every side feels like the same platform, so the whole marketplace feels credible.",
      },
      {
        title: "Built to scale",
        body: "A token-driven system ready for new roles, portals, and features.",
      },
    ],
  },
  outcome: {
    heading: "Outcome",
    accent: "& impact.",
    body: [
      "OnJob became one platform where recruiters, candidates, and vendors finally work in the same place — no more email-and-spreadsheet hand-offs, no more lost context.",
      "The role-aware design system keeps three very different experiences feeling like one trustworthy product, and gives the team a foundation to add new sides and features quickly.",
    ],
    metrics: [
      { value: "3", label: "Portals unified" },
      { value: "1", label: "Shared design system" },
      { value: "150+", label: "Screens designed" },
      { value: "Web + App", label: "Candidate on every device" },
    ],
  },
};

/* ── Pitch N Hire — product website (AI-native recruitment infra) ─────── */
const PITCH_N_HIRE: CaseStudy = {
  slug: "pitch-n-hire",
  liveUrl: "https://www.pitchnhire.com/",
  liveLabel: "Visit live site",
  eyebrow: "Case Study · Product Website",
  title: "The website for the world-first",
  titleAccent: "AI-native recruitment infrastructure.",
  summary:
    "End-to-end website design for Pitch N Hire — a world-first AI-native recruitment platform that unifies sourcing, screening, and hiring on one system. The site turns a complex three-product ecosystem into one clear, conversion-led story.",
  cover: {
    bg: "linear-gradient(145deg,#0a0613,#1c0e3d)",
    c1: "#936aff",
    c2: "#4e24c7",
    // image: "/case/pitch-n-hire/cover.png", // TODO(umang): hero screenshot
  },
  sitePreview: "/work/case/pitch-n-hire/homepage.jpg",
  meta: [
    { label: "Role", value: "Web & Product Designer" },
    { label: "Client", value: "Pitch N Hire · pitchnhire.com" },
    { label: "Platform", value: "Marketing site · responsive" },
    { label: "Scope", value: "Strategy → UX → UI → Design system" },
    { label: "Product", value: "AI-native recruitment platform" },
    { label: "Tools", value: "Figma" },
  ],
  stats: [
    { value: "60–70%", label: "Faster time-to-fill" },
    { value: "50–70%", label: "Less manual work" },
    { value: "100–300%", label: "ROI within 3 months" },
    { value: "4.8/5", label: "Customer rating" },
  ],
  overview: {
    heading: "Overview",
    body: [
      "Pitch N Hire bills itself as the world's first AI-native recruitment infrastructure — one platform to source talent, manage hiring, and make confident decisions, replacing a fragmented stack of point tools. I designed its website end-to-end: the narrative, the page system, the visual language, and the build handoff.",
      "The hard part wasn't making it look good — it was making a dense, three-product AI platform instantly graspable. The site had to frame the ATS, the sourcing engine, and the interview intelligence as one connected loop, prove the ‘AI-native’ claim, and convert enterprises, recruiters, and hiring managers alike.",
    ],
  },
  problem: {
    heading: "The problem",
    accent: "— a complex platform, one scroll to explain it.",
    body: [
      "Pitch N Hire isn’t one product — it’s three (an ATS, a talent-sourcing engine, and an AI interview platform) that only matter as a single loop. Most visitors decide in seconds, so the site had to make a technical, multi-product platform click immediately.",
      "For every way a platform like this usually loses people, the site answered with a sharper, more concrete pattern.",
    ],
    points: [
      {
        pain: "Three products — ATS, sourcing, interviews — are hard to grasp at a glance.",
        fix: "One Operate · Source · Decide narrative that frames all three as a single loop.",
      },
      {
        pain: "‘AI-native’ reads as a buzzword without proof.",
        fix: "Concrete concepts — Continuous Intelligence Loop, Single Candidate Graph, Explainable AI — shown, not claimed.",
      },
      {
        pain: "Enterprises, recruiters, and hiring managers each need a different pitch.",
        fix: "Audience-specific paths that speak to each one’s outcome.",
      },
      {
        pain: "Technical infrastructure is easy to over-explain and lose people.",
        fix: "A benefit-led hero and a hard-numbers proof band that land the value fast.",
      },
      {
        pain: "Dozens of product, service, and resource pages to keep on-brand.",
        fix: "A modular block system that scales across the whole site.",
      },
    ],
  },
  goals: {
    heading: "Design goals",
    items: [
      "Make a three-product platform graspable in a single scroll.",
      "Turn ‘AI-native’ into concrete, believable proof.",
      "Give enterprises, recruiters, and clients their own clear path.",
      "Lead every page toward a demo or a sign-up.",
      "Ship a scalable design system for dozens of pages.",
    ],
  },
  process: {
    heading: "Process",
    accent: "— story to ship.",
    intro:
      "Three phases, one designer, end to end. A platform this layered lives or dies on its story — so the work started with the message and the Operate · Source · Decide framing, then the system, then the polish.",
    steps: [
      {
        no: "01",
        phase: "Discover",
        title: "Positioning & product story",
        body: "Worked through a dense, three-product platform to find the one frame that makes it click: Operate, Source, Decide — a single hiring loop.",
      },
      {
        no: "02",
        phase: "Discover",
        title: "Content & site architecture",
        body: "Mapped the full site — products, services, pricing, jobs, resources — and the job each page had to do for each audience.",
      },
      {
        no: "03",
        phase: "Design",
        title: "Wireframes & narrative",
        body: "Laid out each page as a story that builds from problem to proof to a clear call to action, tested in low fidelity first.",
      },
      {
        no: "04",
        phase: "Design",
        title: "Modular block library",
        body: "Designed a kit of reusable sections — heroes, product blocks, concept explainers, proof bands, CTAs — so any page snaps together on-brand.",
      },
      {
        no: "05",
        phase: "Design",
        title: "Visual design & system",
        body: "Built an AI-native visual language — deep violet on a near-black canvas, precise type — and codified it into a scalable web design system.",
      },
      {
        no: "06",
        phase: "Deliver",
        title: "Build handoff & QA",
        body: "Partnered with engineering on a pixel-accurate, fast, responsive build and reviewed every breakpoint.",
      },
    ],
  },
  features: {
    heading: "Key pages & sections",
    intro:
      "The site is assembled from a small kit of strong, reusable sections — so a complex platform stays clear and new pages ship fast.",
    items: [
      {
        title: "Hero — the one-line promise",
        body: "‘World-first AI-native recruitment infrastructure’ — source talent, manage hiring, and decide with confidence, on one platform.",
      },
      {
        title: "Operate · Source · Decide",
        body: "The three products framed as one loop: Operate (ATS & workflow), Source (the OnJob talent engine), Decide (the Intuvos AI interviews).",
      },
      {
        title: "Intelligence concepts",
        body: "Continuous Intelligence Loop, Single Candidate Graph, and Explainable AI & Governance — the proof behind ‘AI-native.’",
      },
      {
        title: "Audience paths",
        body: "Tailored stories for enterprises, recruiters & staffing agencies, and clients & hiring managers.",
      },
      {
        title: "Outcomes proof band",
        body: "Hard numbers — less manual work, faster time-to-fill, retention lift, ROI — placed where they tip the decision.",
      },
      {
        title: "Customer success stories",
        body: "Real roles and results carrying a 4.8/5 rating, framed as credible social proof.",
      },
      {
        title: "Pricing & demo CTA",
        body: "A clear path to ‘Request a demo’ and ‘Free sign-up’ from every page.",
      },
      {
        title: "Services & resources",
        body: "Staffing services, live jobs, blog, and the HR community — the wider ecosystem, kept on-brand.",
      },
    ],
  },
  gallery: {
    heading: "Key screens",
    intro:
      "A walk through the real pages — the homepage, the three-product story, the AI-native ATS, the talent marketplace, and the intelligence loop.",
    shots: [
      {
        title: "Homepage",
        caption:
          "World-first AI-native recruitment infrastructure — the full homepage, nav to footer.",
        image: "/work/case/pitch-n-hire/home.jpg",
        bg: "linear-gradient(145deg,#0a0613,#1c0e3d)",
        wide: true,
      },
      {
        title: "One platform, three products",
        caption:
          "Operate · Source · Decide — one connected flow, one source of truth.",
        image: "/work/case/pitch-n-hire/products.jpg",
        bg: "linear-gradient(145deg,#0e0820,#241152)",
      },
      {
        title: "AI-Native ATS",
        caption:
          "Operational intelligence — everything you need to hire faster, in one dashboard.",
        image: "/work/case/pitch-n-hire/ats.jpg",
        bg: "linear-gradient(145deg,#0b0618,#1d0e42)",
      },
      {
        title: "Talent marketplace",
        caption:
          "The infrastructure behind modern staffing — sourcing to instant payout.",
        image: "/work/case/pitch-n-hire/marketplace.jpg",
        bg: "linear-gradient(145deg,#0c0a1c,#22134a)",
      },
      {
        title: "The intelligence loop",
        caption:
          "How the advantage compounds — AI matching, workflow, outcomes, structured interviews.",
        image: "/work/case/pitch-n-hire/loop.jpg",
        bg: "linear-gradient(145deg,#0a0613,#1c0e3d)",
      },
    ],
  },
  designSystem: {
    heading: "Design system",
    intro:
      "The site runs on a web design system with an AI-native voice — a deep violet over a near-black canvas, with magenta and amber sparks — plus a modular block library so the team can ship on-brand pages without a designer in the loop.",
    typeface: { name: "Inter Tight", note: "Web typeface · weights 300–700" },
    groups: [
      {
        title: "Brand & accent",
        tokens: [
          { value: "#815EE6", label: "Primary" },
          { value: "#4E24C7", label: "Primary press" },
          { value: "#936AFF", label: "Light accent" },
          { value: "#EB54FF", label: "Magenta spark" },
          { value: "#F99E0D", label: "Amber spark" },
        ],
      },
      {
        title: "Surface & borders",
        tokens: [
          { value: "#040406", label: "Canvas — dark" },
          { value: "#FFFFFF", label: "Light surface" },
          { value: "#F1F2F6", label: "Off-white" },
          { value: "#CDD1E7", label: "Lavender border" },
          { value: "#EBEBED", label: "Light border" },
        ],
      },
      {
        title: "Text",
        tokens: [
          { value: "#FFFFFF", label: "On-dark text" },
          { value: "#232323", label: "On-light text" },
          { value: "#7F8291", label: "Muted" },
        ],
      },
    ],
    statuses: [
      { name: "Operate", fg: "#4E24C7", bg: "#EEE9FD" },
      { name: "Source", fg: "#815EE6", bg: "#F1ECFE" },
      { name: "Decide", fg: "#A21CAF", bg: "#FBEAFE" },
    ],
    statusesLabel: "The product loop",
    principles: [
      {
        title: "One platform, one story",
        body: "Three products read as a single loop — Operate, Source, Decide — never a disconnected feature list.",
      },
      {
        title: "Proof over buzzwords",
        body: "Every ‘AI-native’ claim is backed by a concrete concept or a hard number.",
      },
      {
        title: "Audience-aware",
        body: "Enterprises, recruiters, and clients each get a path written for their outcome.",
      },
      {
        title: "Modular & scalable",
        body: "A block kit keeps dozens of pages on-brand and fast to ship.",
      },
    ],
  },
  outcome: {
    heading: "Outcome",
    accent: "& impact.",
    body: [
      "The site reframes a dense, three-product platform into one confident story — Operate, Source, Decide — that an enterprise buyer or a solo recruiter can grasp in a single scroll, then act on.",
      "Backed by hard proof — up to 70% less manual work, 60–70% faster time-to-fill, and ROI within three months — the AI-native positioning finally reads as credible, not hype.",
    ],
    metrics: [
      { value: "60–70%", label: "Faster time-to-fill" },
      { value: "50–70%", label: "Less manual work" },
      { value: "100–300%", label: "ROI within 3 months" },
      { value: "4.8/5", label: "Customer rating" },
    ],
  },
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  [AI_POWERED_ATS.slug]: AI_POWERED_ATS,
  [PALIFY.slug]: PALIFY,
  [ONJOB.slug]: ONJOB,
  [PITCH_N_HIRE.slug]: PITCH_N_HIRE,
};

/** Slugs that have a published case study (for routing + clickable cards). */
export const caseStudySlugs = (): string[] => Object.keys(CASE_STUDIES);

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  CASE_STUDIES[slug];

export const hasCaseStudy = (slug: string): boolean => slug in CASE_STUDIES;

/**
 * The next project to point to from the foot of a case study. Prefers the
 * next project that also has a case study (cyclic); otherwise sends people
 * to the full work gallery.
 */
export function getNextCaseStudy(
  slug: string,
): { slug: string; title: string } | null {
  const withStudies = PROJECTS.filter((p) => hasCaseStudy(p.slug));
  if (withStudies.length < 2) return null;
  const i = withStudies.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  const next = withStudies[(i + 1) % withStudies.length];
  return { slug: next.slug, title: next.title };
}
