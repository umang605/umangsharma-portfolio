/**
 * Marketplace — things to ship: website templates, React components, icon
 * sets, and more. Each item gets a live, interactive preview (an embedded
 * iframe of `liveUrl`) so people can try it before they grab it.
 *
 * Drop a real `liveUrl` (where the template/demo is hosted) and an optional
 * `image` thumbnail, and the listing + live preview fill in automatically.
 */

export type MarketCategory = "templates" | "components" | "icons";

export const MARKET_FILTERS: { id: MarketCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "templates", label: "Website Templates" },
  { id: "components", label: "React Components" },
  { id: "icons", label: "Icons" },
];

export const MARKET_CATEGORY_LABEL: Record<MarketCategory, string> = {
  templates: "Website Template",
  components: "React Component",
  icons: "Icon Set",
};

export type MarketItem = {
  slug: string;
  title: string;
  category: MarketCategory;
  /** One-line hook for the card. */
  tagline: string;
  /** Longer description for the detail page. */
  description: string[];
  price?: string;
  /** Hosted demo URL — embedded as a live, interactive preview. */
  liveUrl?: string;
  /** Checkout URL (Gumroad / Lemon Squeezy / Stripe Payment Link). */
  buyUrl?: string;
  /** Thumbnail; falls back to the brand gradient. */
  image?: string;
  bg?: string;
  tags?: string[];
  features?: string[];
};

export const MARKET_ITEMS: MarketItem[] = [
  {
    slug: "food-recipe-template",
    title: "Premium Food & Recipe Website Template",
    category: "templates",
    tagline:
      "A warm, conversion-ready template for food blogs, recipe sites, and culinary brands.",
    description: [
      "A polished, production-ready website template built for food blogs, recipe creators, and culinary brands. Appetising imagery, clean recipe layouts, and a warm editorial feel — designed to make people hungry and keep them browsing.",
      "Fully responsive, easy to customise, and built on a clean component structure so you can launch fast and make it your own.",
    ],
    price: "$39",
    liveUrl: "https://cookbook-site-seven.vercel.app/",
    image: "/work/marketplace/food-recipe.jpg",
    // buyUrl: "https://...", // TODO(umang): paste your Gumroad / Stripe checkout link
    bg: "linear-gradient(145deg,#2a1407,#4a2611)",
    tags: ["Food", "Recipe", "Blog", "Responsive"],
    features: [
      "Hero, recipe grid, and single-recipe layouts",
      "Ingredient lists, steps, and nutrition blocks",
      "Category & tag browsing",
      "Newsletter and CTA sections",
      "Fully responsive, mobile-first",
    ],  },
  {
    slug: "cafe-template",
    title: "Premium Café Website Template",
    category: "templates",
    tagline:
      "A cozy, modern template for cafés and coffee shops — built to bring customers in.",
    description: [
      "An inviting, modern website template for cafés, coffee shops, and roasteries. Tell your story, show the menu, share the space, and make it effortless for people to find you and drop by.",
      "Rich imagery, cozy typography, and a mobile-first layout — with a clear path to reservations and directions baked in.",
    ],
    price: "$29",
    liveUrl: "https://mira-cafe-seven.vercel.app/",
    image: "/work/marketplace/cafe.jpg",
    // buyUrl: "https://...", // TODO(umang): paste your Gumroad / Stripe checkout link
    bg: "linear-gradient(145deg,#241a12,#3d2c1a)",
    tags: ["Café", "Coffee", "Local", "Responsive"],
    features: [
      "Hero with story and ambience",
      "Menu and specials layouts",
      "Gallery, hours, and location",
      "Reservation / contact CTA",
      "Fully responsive, mobile-first",
    ],
  },
  {
    slug: "buildstyle-template",
    title: "Build.Style — Fashion Portfolio Template",
    category: "templates",
    tagline:
      "A bold, editorial template for fashion designers, stylists, and creative studios.",
    description: [
      "An editorial, high-fashion website template for designers, stylists, and creative studios. Big imagery, confident typography, and a runway-grade feel that puts the work front and centre.",
      "Fully responsive and easy to customise — swap in your collections, lookbooks, and story, and launch a portfolio that looks expensive.",
    ],
    price: "$39",
    liveUrl: "https://buildstyle-site.vercel.app/",
    image: "/work/marketplace/buildstyle.jpg",
    bg: "linear-gradient(145deg,#15110e,#2a211a)",
    tags: ["Fashion", "Portfolio", "Editorial", "Responsive"],
    features: [
      "Editorial hero & lookbook layouts",
      "Project / collection galleries",
      "About & contact sections",
      "Bold typographic system",
      "Fully responsive, mobile-first",
    ],
  },
];

export const getMarketItem = (slug: string) =>
  MARKET_ITEMS.find((m) => m.slug === slug);
export const marketSlugs = () => MARKET_ITEMS.map((m) => m.slug);
