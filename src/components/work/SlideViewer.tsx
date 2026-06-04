"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Mode = "slideshow" | "scroll";

/**
 * Deck/presentation viewer with two ways to look at a set of slides:
 *  - "slideshow": one slide at a time, left/right (arrows, keys, click zones)
 *  - "scroll": every slide stacked, like a long webpage
 * A fullscreen toggle drops everything but the slide itself.
 */
export default function SlideViewer({
  slides,
  title,
}: {
  slides: string[];
  title: string;
}) {
  // Scroll view (all slides stacked) is the default — easiest to skim a deck.
  const [mode, setMode] = useState<Mode>("scroll");
  const [idx, setIdx] = useState(0);
  const [fs, setFs] = useState(false);
  const n = slides.length;
  const stackRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (d: number) => setIdx((i) => Math.min(Math.max(i + d, 0), n - 1)),
    [n],
  );

  // Keyboard: arrows navigate (slideshow), Esc exits fullscreen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fs) {
        setFs(false);
        return;
      }
      if (mode !== "slideshow") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, go, fs]);

  // Lock body scroll while fullscreen.
  useEffect(() => {
    if (!fs) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fs]);

  if (n === 0) return null;

  const Arrow = ({ dir }: { dir: -1 | 1 }) => {
    const disabled = dir === -1 ? idx === 0 : idx === n - 1;
    return (
      <button
        type="button"
        onClick={() => go(dir)}
        disabled={disabled}
        aria-label={dir === -1 ? "Previous slide" : "Next slide"}
        className={`flex h-11 w-11 items-center justify-center rounded-full border text-[18px] transition-all duration-200 ${
          disabled
            ? "cursor-default border-line text-muted opacity-30"
            : fs
              ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
              : "border-line bg-card text-ink hover:border-line-strong hover:-translate-y-0.5"
        }`}
      >
        {dir === -1 ? "‹" : "›"}
      </button>
    );
  };

  /* ── Slideshow ─────────────────────────────────────────────── */
  const slideshow = (
    <div className={fs ? "flex h-full w-full flex-col" : ""}>
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-[16px] border border-line ${
          fs ? "flex-1 rounded-none border-0 bg-black" : "bg-[#0b0b0b]"
        }`}
        style={fs ? undefined : { aspectRatio: "16 / 10" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={slides[idx]}
          src={slides[idx]}
          alt={`${title} — slide ${idx + 1}`}
          className="max-h-full max-w-full object-contain"
        />

        {/* click zones */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize disabled:cursor-default"
          disabled={idx === 0}
        />
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize disabled:cursor-default"
          disabled={idx === n - 1}
        />
      </div>

      {/* controls */}
      <div
        className={`flex items-center justify-between gap-4 ${
          fs ? "px-6 py-4" : "mt-4"
        }`}
      >
        <Arrow dir={-1} />
        <span
          className={`text-[13px] font-medium tabular-nums tracking-[-0.01em] ${
            fs ? "text-white/80" : "text-muted"
          }`}
        >
          {idx + 1} / {n}
        </span>
        <Arrow dir={1} />
      </div>
    </div>
  );

  /* ── Scroll (all slides) ───────────────────────────────────── */
  const scroll = (
    <div
      ref={stackRef}
      className={`flex flex-col gap-5 ${
        fs ? "h-full overflow-y-auto p-6" : ""
      }`}
    >
      {slides.map((s, i) => (
        <div
          key={s}
          className={`overflow-hidden rounded-[14px] border ${
            fs ? "border-white/10" : "border-line bg-[#0b0b0b]"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s}
            alt={`${title} — slide ${i + 1}`}
            loading="lazy"
            className="block w-full"
          />
        </div>
      ))}
    </div>
  );

  const body = mode === "slideshow" ? slideshow : scroll;

  /* ── Fullscreen overlay ────────────────────────────────────── */
  if (fs) {
    return (
      <div className="fixed inset-0 z-[1200] flex flex-col bg-black">
        <div className="flex items-center justify-between px-6 py-3 text-white/80">
          <span className="text-[13px] tracking-[-0.02em]">{title}</span>
          <button
            type="button"
            onClick={() => setFs(false)}
            aria-label="Exit fullscreen"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[16px] text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>
        </div>
        <div className="min-h-0 flex-1">{body}</div>
      </div>
    );
  }

  /* ── Inline (default) ──────────────────────────────────────── */
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4 max-[480px]:flex-col max-[480px]:items-stretch">
        {/* mode toggle */}
        <div className="inline-flex rounded-[100px] border border-line p-1">
          {(["slideshow", "scroll"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-[100px] px-4 py-1.5 text-[13px] font-medium tracking-[-0.02em] transition-colors duration-200 ${
                mode === m ? "bg-ink text-canvas" : "text-body hover:text-ink"
              }`}
            >
              {m === "slideshow" ? "One by one" : "Scroll all"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFs(true)}
          className="inline-flex items-center gap-2 rounded-[100px] border border-line px-4 py-1.5 text-[13px] font-medium tracking-[-0.02em] text-body transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:text-ink"
        >
          <span aria-hidden>⤢</span> Fullscreen
        </button>
      </div>
      {body}
    </div>
  );
}
