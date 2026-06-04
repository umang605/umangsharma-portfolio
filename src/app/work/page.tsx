import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkSections from "@/components/work/WorkSections";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected design work by Umang Sharma — products, mobile apps, websites, posters, pitch decks, and UI components.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected Work"
        title="Design work,"
        accent="end-to-end."
        lead="Products, mobile apps, websites, posters, pitch decks, and UI components — the work I owned and delivered as the sole designer."
      />
      <WorkSections />
    </>
  );
}
