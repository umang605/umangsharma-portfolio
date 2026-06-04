import type { Metadata } from "next";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design services by Umang Sharma — UX/UI design, web design, brand identity, and visual design.",
};

export default function ServicesPage() {
  return (
    <div className="bg-surface pt-[var(--nav-h)]">
      <Services />
    </div>
  );
}
