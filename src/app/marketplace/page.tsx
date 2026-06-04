import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MarketplaceGallery from "@/components/marketplace/MarketplaceGallery";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Website templates, React components, and icon sets by Umang Sharma — production-ready, easy to customise, and previewable live before you grab them.",
};

export default function MarketplacePage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketplace"
        title="Things to ship,"
        accent="ready to go."
        lead="A small shop of things I've designed and built — website templates, React components, and icon sets. Production-ready, easy to customise, and yours to ship. Preview anything live, fully interactive, before you grab it."
      />
      <MarketplaceGallery />
    </>
  );
}
