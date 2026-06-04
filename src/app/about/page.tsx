import type { Metadata } from "next";
import About from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Umang Sharma — a UI/UX & product designer with 3+ years owning end-to-end design across web and mobile.",
};

export default function AboutPage() {
  return (
    <div className="bg-canvas pt-[var(--nav-h)]">
      <About />
    </div>
  );
}
