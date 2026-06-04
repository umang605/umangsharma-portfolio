"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ViewMode } from "@/components/ViewToggle";
import {
  DECKS,
  DECK_FILTERS,
  DECK_TYPE_LABEL,
  deckCover,
  type DeckType,
} from "@/data/decks";

export default function DeckGallery({ view = "grid" }: { view?: ViewMode }) {
  const [active, setActive] = useState<DeckType | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: DECKS.length };
    for (const d of DECKS) c[d.type] = (c[d.type] ?? 0) + 1;
    return c;
  }, []);

  const filtered =
    active === "all" ? DECKS : DECKS.filter((d) => d.type === active);

  return (
    <div>
      {/* filter tabs — brochure / pitch deck / presentation */}
      <div className="mb-8 flex flex-wrap gap-2.5">
        {DECK_FILTERS.map((f) => {
          const isActive = active === f.id;
          const count = counts[f.id] ?? 0;
          if (count === 0 && f.id !== "all") return null;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-1.5 rounded-[100px] px-4 py-2 text-[13px] font-medium tracking-[-0.02em] transition-all duration-[250ms] ease-[var(--ease)] hover:-translate-y-0.5 ${
                isActive
                  ? "bg-ink text-canvas"
                  : "border border-line text-body hover:border-line-strong hover:text-ink"
              }`}
            >
              {f.label}
              <span className={isActive ? "opacity-50" : "opacity-40"}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {view === "grid" ? (
        /* ── grid ──────────────────────────────────────────────── */
        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {filtered.map((d) => (
            <Link
              key={d.slug}
              href={`/work/decks/${d.slug}`}
              className="group block rounded-[14px] focus-visible:outline-offset-4"
            >
              {/* The thumbnail art already has rounded corners + transparency,
                  so no extra border/rounding here — it floats on the page bg. */}
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={deckCover(d.slug)}
                  alt={d.title}
                  className="aspect-[16/10] w-full object-contain transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-[15px] font-medium tracking-[-0.02em] text-ink">
                    {d.title}
                  </h3>
                  <span className="text-[12px] tracking-[-0.01em] text-muted">
                    {DECK_TYPE_LABEL[d.type]} · {d.pages} slides
                  </span>
                </div>
                <span className="shrink-0 text-[12px] uppercase tracking-[0.06em] text-muted transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* ── list ──────────────────────────────────────────────── */
        <div className="flex flex-col gap-3">
          {filtered.map((d) => (
            <Link
              key={d.slug}
              href={`/work/decks/${d.slug}`}
              className="group flex items-center gap-5 rounded-[16px] border border-line p-3 transition-all duration-300 ease-[var(--ease)] hover:border-line-strong hover:bg-card focus-visible:outline-offset-4 max-[560px]:gap-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={deckCover(d.slug)}
                alt={d.title}
                loading="lazy"
                className="aspect-[16/10] w-[180px] shrink-0 rounded-[10px] object-contain max-[560px]:w-[112px]"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[16px] font-medium tracking-[-0.02em] text-ink max-[560px]:text-[15px]">
                  {d.title}
                </h3>
                <span className="text-[13px] tracking-[-0.01em] text-muted">
                  {DECK_TYPE_LABEL[d.type]} · {d.pages} slides
                </span>
              </div>
              <span className="shrink-0 pr-1 text-[13px] uppercase tracking-[0.06em] text-muted transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5 max-[560px]:hidden">
                View →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
