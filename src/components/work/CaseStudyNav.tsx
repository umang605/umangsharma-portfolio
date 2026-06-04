"use client";

import { useEffect, useState } from "react";

export type CaseStudyNavItem = { id: string; label: string };

/**
 * Fixed left-rail table of contents for a case study. Tracks the section
 * in view and lets the reader jump straight to any part — anchor clicks are
 * smooth-scrolled by the global <AnchorScroll> Lenis handler.
 *
 * At rest it's a slim column of dots in the left margin (the active dot is
 * highlighted), so it never collides with the centered content. Hovering or
 * focusing the rail expands it into a full labelled menu; the labels carry
 * their own backdrop so they stay legible over whatever they float above.
 * Hidden below 1180px, where there's no room for a side rail.
 */
export default function CaseStudyNav({ items }: { items: CaseStudyNavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el != null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (inBand[0]) setActive(inBand[0].target.id);
      },
      // Focus band: a slice ~35–55% down the viewport.
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="group fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 min-[1180px]:flex"
    >
      {items.map((it) => {
        const isActive = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            aria-current={isActive ? "true" : undefined}
            className="flex items-center gap-3 outline-none"
          >
            <span
              aria-hidden
              className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ease-[var(--ease)] ${
                isActive
                  ? "scale-[1.7] bg-ink"
                  : "bg-line-strong group-hover:bg-muted"
              }`}
            />
            <span
              className={`pointer-events-none whitespace-nowrap rounded-[100px] border border-line bg-canvas/85 px-2.5 py-1 text-[12px] tracking-[-0.01em] opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 ease-[var(--ease)] [transform:translateX(-4px)] group-hover:opacity-100 group-focus-within:opacity-100 group-hover:[transform:translateX(0)] group-focus-within:[transform:translateX(0)] ${
                isActive ? "font-medium text-ink" : "text-muted"
              }`}
            >
              {it.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
