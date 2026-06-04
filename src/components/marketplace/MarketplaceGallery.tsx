"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ViewToggle, { type ViewMode } from "@/components/ViewToggle";
import {
  MARKET_FILTERS,
  MARKET_CATEGORY_LABEL,
  MARKET_ITEMS,
  type MarketCategory,
  type MarketItem,
} from "@/data/marketplace";

function Thumb({ m, className }: { m: MarketItem; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={m.image ? { background: "#0b0b0b" } : { background: m.bg ?? "#0b0b0b" }}
    >
      {m.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={m.image}
          alt={m.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.03]"
        />
      ) : (
        <span className="px-3 text-center text-[12px] uppercase tracking-[0.14em] text-white/55">
          Live preview inside
        </span>
      )}
      {m.price ? (
        <span className="absolute right-3 top-3 rounded-[100px] bg-white/[0.14] px-3 py-1 text-[12px] font-medium tracking-[-0.01em] text-white [backdrop-filter:blur(8px)]">
          {m.price}
        </span>
      ) : null}
    </div>
  );
}

export default function MarketplaceGallery() {
  const [active, setActive] = useState<MarketCategory | "all">("all");
  const [view, setView] = useState<ViewMode>("grid");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: MARKET_ITEMS.length };
    for (const m of MARKET_ITEMS) c[m.category] = (c[m.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered =
    active === "all"
      ? MARKET_ITEMS
      : MARKET_ITEMS.filter((m) => m.category === active);

  return (
    <section className="relative z-[1] bg-canvas pb-[var(--section-gap)]">
      <Container>
        {/* filter tabs + view toggle */}
        <div className="mb-9 flex items-center justify-between gap-4 max-[560px]:flex-col max-[560px]:items-stretch">
          <div className="flex flex-wrap gap-2.5">
            {MARKET_FILTERS.map((f) => {
              const isActive = active === f.id;
              const count = counts[f.id] ?? 0;
              if (count === 0 && f.id !== "all") return null;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 rounded-[100px] px-5 py-2.5 text-[14px] font-medium tracking-[-0.02em] transition-all duration-[250ms] ease-[var(--ease)] hover:-translate-y-0.5 ${
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
          <ViewToggle value={view} onChange={setView} />
        </div>

        {/* ── grid view ─────────────────────────────────────────── */}
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-5 max-[768px]:grid-cols-1">
            {filtered.map((m, i) => (
              <Reveal key={m.slug} delay={0.05 * i}>
                <Link
                  href={`/marketplace/${m.slug}`}
                  className="group block rounded-[20px] focus-visible:outline-offset-4"
                >
                  <Thumb
                    m={m}
                    className="aspect-[16/10] rounded-[18px] border border-line"
                  />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
                        {MARKET_CATEGORY_LABEL[m.category]}
                      </span>
                      <h3 className="mt-1.5 text-[18px] font-medium leading-[120%] tracking-[-0.03em] text-ink">
                        {m.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-[150%] tracking-[-0.02em] text-body">
                        {m.tagline}
                      </p>
                    </div>
                    <span className="shrink-0 pt-1 text-[13px] uppercase tracking-[0.06em] text-muted transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5">
                      Preview →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          /* ── list view ───────────────────────────────────────── */
          <div className="flex flex-col gap-3">
            {filtered.map((m, i) => (
              <Reveal key={m.slug} delay={0.03 * i}>
                <Link
                  href={`/marketplace/${m.slug}`}
                  className="group flex items-center gap-5 rounded-[16px] border border-line p-3 transition-all duration-300 ease-[var(--ease)] hover:border-line-strong hover:bg-card focus-visible:outline-offset-4 max-[560px]:gap-4"
                >
                  <Thumb
                    m={m}
                    className="aspect-[16/10] w-[200px] shrink-0 rounded-[12px] border border-line max-[560px]:w-[112px]"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted">
                      {MARKET_CATEGORY_LABEL[m.category]}
                    </span>
                    <h3 className="mt-1 text-[17px] font-medium leading-[125%] tracking-[-0.03em] text-ink max-[560px]:text-[15px]">
                      {m.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 max-w-[560px] text-[14px] leading-[150%] tracking-[-0.02em] text-body max-[560px]:hidden">
                      {m.tagline}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-5 pr-1 max-[560px]:gap-3">
                    {m.price ? (
                      <span className="text-[15px] font-medium tabular-nums tracking-[-0.02em] text-ink">
                        {m.price}
                      </span>
                    ) : null}
                    <span className="text-[13px] uppercase tracking-[0.06em] text-muted transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5 max-[560px]:hidden">
                      Preview →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
