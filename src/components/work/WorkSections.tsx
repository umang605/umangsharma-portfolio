"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ViewToggle, { type ViewMode } from "@/components/ViewToggle";
import DeckGallery from "@/components/work/DeckGallery";
import {
  WORK_SECTIONS,
  type WorkAspect,
  type WorkItem,
} from "@/data/workSections";

type Lightbox = { src: string; title: string };

function gridClass(cols: 2 | 3 | 4) {
  if (cols === 4) return "grid-cols-4 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1";
  if (cols === 3) return "grid-cols-3 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1";
  return "grid-cols-2 max-[768px]:grid-cols-1";
}

function actionLabel(item: WorkItem) {
  return item.meta ?? (item.href ? "Case study →" : item.view ? "View" : "");
}

/* ── grid card ───────────────────────────────────────────────────────── */
function WorkCard({
  item,
  aspect,
  onView,
}: {
  item: WorkItem;
  aspect: WorkAspect;
  onView: (lb: Lightbox) => void;
}) {
  const aspectClass = aspect === "portrait" ? "aspect-[2/3]" : "aspect-[4/3]";

  const media = (
    <div
      className={`relative overflow-hidden rounded-[16px] border border-line ${aspectClass}`}
      style={item.image ? { background: "#0b0b0b" } : item.bg ? { background: item.bg } : { background: "#0b0b0b" }}
    >
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.03]"
        />
      ) : (
        <span className="absolute bottom-3 left-4 text-[11px] uppercase tracking-[0.12em] text-white/40">
          Preview soon
        </span>
      )}
    </div>
  );

  const caption = (
    <div className="mt-3 flex items-center justify-between gap-3">
      <span className="text-[15px] font-medium tracking-[-0.02em] text-ink">
        {item.title}
      </span>
      <span className="shrink-0 text-[12px] uppercase tracking-[0.06em] text-muted">
        {actionLabel(item)}
      </span>
    </div>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="group block rounded-[16px] focus-visible:outline-offset-4"
      >
        {media}
        {caption}
      </Link>
    );
  }
  if (item.view) {
    return (
      <button
        type="button"
        onClick={() => onView({ src: item.view as string, title: item.title })}
        className="group block w-full rounded-[16px] text-left focus-visible:outline-offset-4"
      >
        {media}
        {caption}
      </button>
    );
  }
  return (
    <div className="group block">
      {media}
      {caption}
    </div>
  );
}

/* ── list row ────────────────────────────────────────────────────────── */
function WorkRow({
  item,
  onView,
}: {
  item: WorkItem;
  onView: (lb: Lightbox) => void;
}) {
  const thumb = (
    <div
      className="relative aspect-[4/3] w-[160px] shrink-0 overflow-hidden rounded-[12px] border border-line max-[560px]:w-[104px]"
      style={item.image ? { background: "#0b0b0b" } : item.bg ? { background: item.bg } : { background: "#0b0b0b" }}
    >
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.03]"
        />
      ) : (
        <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.12em] text-white/40">
          Preview soon
        </span>
      )}
    </div>
  );

  const content = (
    <>
      <div className="min-w-0 flex-1">
        <h3 className="text-[16px] font-medium tracking-[-0.02em] text-ink max-[560px]:text-[15px]">
          {item.title}
        </h3>
        {item.meta ? (
          <span className="mt-0.5 block text-[13px] uppercase tracking-[0.06em] text-muted">
            {item.meta}
          </span>
        ) : null}
      </div>
      <span className="shrink-0 pr-1 text-[13px] uppercase tracking-[0.06em] text-muted transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5 max-[560px]:hidden">
        {item.href ? "Case study →" : item.view ? "View" : ""}
      </span>
    </>
  );

  const rowCls =
    "group flex items-center gap-5 rounded-[16px] border border-line p-3 transition-all duration-300 ease-[var(--ease)] hover:border-line-strong hover:bg-card focus-visible:outline-offset-4 max-[560px]:gap-4";

  if (item.href) {
    return (
      <Link href={item.href} className={rowCls}>
        {thumb}
        {content}
      </Link>
    );
  }
  if (item.view) {
    return (
      <button
        type="button"
        onClick={() => onView({ src: item.view as string, title: item.title })}
        className={`${rowCls} w-full text-left`}
      >
        {thumb}
        {content}
      </button>
    );
  }
  return (
    <div className={rowCls}>
      {thumb}
      {content}
    </div>
  );
}

export default function WorkSections() {
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const [view, setView] = useState<ViewMode>("grid");

  // Close lightbox on Escape; lock scroll while open.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section className="relative z-[1] bg-canvas pb-[var(--section-gap)]">
      <Container>
        {/* layout switch */}
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-line pb-5">
          <span className="text-[13px] uppercase tracking-[0.1em] text-muted">
            {view === "grid" ? "Grid view" : "List view"}
          </span>
          <ViewToggle value={view} onChange={setView} />
        </div>

        <div className="flex flex-col gap-[clamp(64px,9vw,116px)]">
          {WORK_SECTIONS.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              className="scroll-mt-[calc(var(--nav-h)+24px)]"
            >
              <Reveal>
                <div className="mb-9 flex items-end justify-between gap-6 border-b border-line pb-5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-2">
                  <h2 className="text-[clamp(26px,3.4vw,40px)] font-medium tracking-[-0.03em] text-ink">
                    {sec.title}
                  </h2>
                  {sec.blurb ? (
                    <p className="max-w-[400px] text-[14px] leading-[150%] tracking-[-0.02em] text-muted max-[640px]:max-w-none">
                      {sec.blurb}
                    </p>
                  ) : null}
                </div>
              </Reveal>

              {sec.id === "decks" ? (
                <Reveal delay={0.05}>
                  <DeckGallery view={view} />
                </Reveal>
              ) : sec.items.length === 0 ? (
                <Reveal delay={0.05}>
                  <div className="rounded-[16px] border border-dashed border-line px-6 py-14 text-center text-[14px] tracking-[-0.02em] text-muted">
                    {sec.empty}
                  </div>
                </Reveal>
              ) : view === "grid" ? (
                <div className={`grid gap-5 ${gridClass(sec.cols)}`}>
                  {sec.items.map((it, i) => (
                    <Reveal key={it.slug} delay={0.04 * i}>
                      <WorkCard item={it} aspect={sec.aspect} onView={setLightbox} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {sec.items.map((it, i) => (
                    <Reveal key={it.slug} delay={0.03 * i}>
                      <WorkRow item={it} onView={setLightbox} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox (poster / graphic view) */}
      {lightbox ? (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 p-6 [backdrop-filter:blur(8px)]"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.title}
            className="max-h-[92vh] max-w-[92vw] rounded-[12px] object-contain shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="fixed right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[18px] text-white transition-colors duration-200 hover:bg-white/20"
          >
            ✕
          </button>
        </div>
      ) : null}
    </section>
  );
}
