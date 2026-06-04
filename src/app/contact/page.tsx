import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Umang Sharma — open to full-time product design and UI/UX roles, remote or on-site.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--bg-light)] pt-[var(--nav-h)]">
      <Contact />
    </div>
  );
}
