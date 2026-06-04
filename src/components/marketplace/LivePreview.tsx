"use client";

import { useEffect, useState } from "react";

type Device = "desktop" | "tablet" | "mobile";

const WIDTHS: Record<Device, string> = {
  desktop: "100%",
  tablet: "834px",
  mobile: "390px",
};

const DEVICES: { id: Device; label: string; icon: string }[] = [
  { id: "desktop", label: "Desktop", icon: "▭" },
  { id: "tablet", label: "Tablet", icon: "▢" },
  { id: "mobile", label: "Mobile", icon: "▯" },
];

/**
 * Framer-style live preview: an embedded, interactive iframe of the real
 * template, with desktop/tablet/mobile toggles, open-in-new-tab, and a
 * slide-only fullscreen stage. Falls back to a placeholder when no URL is set.
 */
export default function LivePreview({
  url,
  title,
}: {
  url?: string;
  title: string;
}) {
  const [device, setDevice] = useState<Device>("desktop");
  const [fs, setFs] = useState(false);

  useEffect(() => {
    if (!fs) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFs(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fs]);

  const domain = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  const toolbar = (
    <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
      <div className="flex shrink-0 gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        ))}
      </div>

      <div className="mx-auto flex min-w-0 items-center gap-2 rounded-[100px] border border-line bg-card px-3 py-1 text-[12px] text-muted">
        <span aria-hidden>🔒</span>
        <span className="truncate max-w-[280px]">
          {domain || "preview.umangsharma.design"}
        </span>
      </div>

      {/* device toggle */}
      <div className="hidden shrink-0 items-center gap-1 rounded-[100px] border border-line p-1 min-[600px]:flex">
        {DEVICES.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setDevice(d.id)}
            aria-label={d.label}
            aria-pressed={device === d.id}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] transition-colors duration-200 ${
              device === d.id ? "bg-ink text-canvas" : "text-muted hover:text-ink"
            }`}
          >
            {d.icon}
          </button>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live in a new tab"
            className="flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-[12px] font-medium text-body transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            Open live <span aria-hidden>↗</span>
          </a>
        ) : null}
        <button
          type="button"
          onClick={() => setFs((v) => !v)}
          aria-label={fs ? "Exit fullscreen" : "Fullscreen"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-[13px] text-body transition-colors duration-200 hover:border-line-strong hover:text-ink"
        >
          {fs ? "✕" : "⤢"}
        </button>
      </div>
    </div>
  );

  const stage = (
    <div
      className={`relative flex justify-center bg-[#0b0b0b] p-4 ${
        fs ? "h-[calc(100vh-52px)]" : "h-[68vh] min-h-[460px]"
      }`}
    >
      <div
        className="h-full transition-[width,max-width] duration-300 ease-[var(--ease)]"
        style={{ width: WIDTHS[device], maxWidth: "100%" }}
      >
        {url ? (
          <iframe
            src={url}
            title={`${title} — live preview`}
            loading="lazy"
            className="h-full w-full rounded-[10px] border border-line bg-white"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed border-line bg-card text-center">
            <span className="text-[28px]" aria-hidden>
              ◳
            </span>
            <p className="max-w-[360px] text-[14px] leading-[150%] tracking-[-0.02em] text-muted">
              Live, interactive preview lands here — share the hosted template
              URL and it embeds fully scrollable, exactly like Framer.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  if (fs) {
    return (
      <div className="fixed inset-0 z-[1200] flex flex-col bg-canvas">
        {toolbar}
        {stage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-[#0b0b0b]">
      {toolbar}
      {stage}
    </div>
  );
}
