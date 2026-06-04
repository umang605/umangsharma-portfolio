"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import type { ProcessStep } from "@/data/caseStudies";

/* ── step icons (cycled by index) ──────────────────────────────────── */
const ICONS = [
  // compass
  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM16.2 7.8l-2.9 5.4-5.4 2.9 2.9-5.4 5.4-2.9Z",
  // search
  "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM21 21l-4.35-4.35",
  // layout
  "M4 4h16v16H4zM4 9h16M9 21V9",
  // pen
  "M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.6 7.6",
  // grid
  "M4 4h6v6H4zM14 4h6v6h-6zM14 14h6v6h-6zM4 14h6v6H4z",
  // palette
  "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.4-.7-.4-1.1a1.7 1.7 0 0 1 1.7-1.7H16c3 0 5.5-2.5 5.5-5.6C21.5 6 17.5 2 12 2z",
  // rocket
  "M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1zM12 15l-3-3a22 22 0 0 1 2-4 13 13 0 0 1 11-6c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z",
];

function StepIcon({ d, color }: { d: string; color: string }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {d.split("M").filter(Boolean).map((seg, i) => (
        <path key={i} d={"M" + seg} />
      ))}
    </svg>
  );
}

/* orthogonal dotted connector with rounded corners */
function connector(sx: number, sy: number, ex: number, ey: number) {
  const midY = (sy + ey) / 2;
  const r = 18;
  const dx = ex > sx ? 1 : -1;
  const dyA = midY > sy ? 1 : -1;
  const dyB = ey > midY ? 1 : -1;
  return [
    `M ${sx} ${sy}`,
    `V ${midY - dyA * r}`,
    `Q ${sx} ${midY} ${sx + dx * r} ${midY}`,
    `H ${ex - dx * r}`,
    `Q ${ex} ${midY} ${ex} ${midY + dyB * r}`,
    `V ${ey}`,
  ].join(" ");
}

export default function ProcessFlow({
  steps,
  c1 = "#2383E2",
  c2 = "#0075DE",
}: {
  steps: ProcessStep[];
  c1?: string;
  c2?: string;
}) {
  const CARD_W = 320;
  const CARD_H = 168;
  const STEP_X = 372;
  const PAD = 56;
  const TOP_Y = 78;
  const BOT_Y = 312;

  const pos = useMemo(
    () =>
      steps.map((_, i) => ({
        x: PAD + i * STEP_X,
        y: i % 2 === 0 ? TOP_Y : BOT_Y,
      })),
    [steps],
  );
  const canvasW = PAD * 2 + (steps.length - 1) * STEP_X + CARD_W;
  const canvasH = BOT_Y + CARD_H + 70;

  const links = useMemo(() => {
    const out: { d: string; pts: [number, number][] }[] = [];
    for (let i = 0; i < pos.length - 1; i++) {
      const aTop = i % 2 === 0;
      const sx = pos[i].x + CARD_W / 2;
      const sy = aTop ? pos[i].y + CARD_H : pos[i].y;
      const bTop = (i + 1) % 2 === 0;
      const ex = pos[i + 1].x + CARD_W / 2;
      const ey = bTop ? pos[i + 1].y + CARD_H : pos[i + 1].y;
      out.push({ d: connector(sx, sy, ex, ey), pts: [[sx, sy], [ex, ey]] });
    }
    return out;
  }, [pos]);

  const phases = useMemo(() => {
    const seen: string[] = [];
    for (const s of steps) if (s.phase && !seen.includes(s.phase)) seen.push(s.phase);
    return seen;
  }, [steps]);

  /* ── drag-to-pan (ref-based for buttery panning) ─────────────────── */
  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; bx: number; by: number } | null>(null);

  const clamp = (x: number, y: number) => {
    const vp = viewportRef.current;
    if (!vp) return { x, y };
    const minX = Math.min(0, vp.clientWidth - canvasW);
    const minY = Math.min(0, vp.clientHeight - canvasH);
    return {
      x: Math.max(minX, Math.min(0, x)),
      y: Math.max(minY, Math.min(0, y)),
    };
  };
  const apply = () => {
    if (innerRef.current)
      innerRef.current.style.transform = `translate3d(${offset.current.x}px,${offset.current.y}px,0)`;
  };

  useEffect(() => {
    // start centred vertically
    const vp = viewportRef.current;
    if (vp) offset.current = clamp(0, (vp.clientHeight - canvasH) / 2);
    apply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasH, canvasW]);

  const onDown = (e: React.PointerEvent) => {
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      bx: offset.current.x,
      by: offset.current.y,
    };
    viewportRef.current?.setPointerCapture(e.pointerId);
    if (viewportRef.current) viewportRef.current.style.cursor = "grabbing";
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    offset.current = clamp(
      drag.current.bx + (e.clientX - drag.current.x),
      drag.current.by + (e.clientY - drag.current.y),
    );
    apply();
  };
  const onUp = () => {
    drag.current = null;
    if (viewportRef.current) viewportRef.current.style.cursor = "grab";
  };

  const dottedBg: CSSProperties = {
    backgroundImage:
      "radial-gradient(var(--border-hover) 1.25px, transparent 1.25px)",
    backgroundSize: "26px 26px",
  };

  return (
    <div>
      {/* phase legend */}
      {phases.length > 0 ? (
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {phases.map((p, i) => (
            <span key={p} className="flex items-center gap-2.5">
              {i > 0 ? (
                <span aria-hidden className="text-dim">
                  →
                </span>
              ) : null}
              <span className="rounded-[100px] border border-line bg-card px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
                {p}
              </span>
            </span>
          ))}
        </div>
      ) : null}

      {/* subheading / hint */}
      <p className="mt-4 flex items-center gap-2 text-[14px] tracking-[-0.02em] text-muted">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
        </svg>
        The full design journey — <span className="text-body">drag the canvas</span> to explore it like a map.
      </p>

      {/* ── desktop draggable canvas ──────────────────────────────── */}
      <div
        ref={viewportRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative mt-7 hidden h-[clamp(460px,46vw,560px)] cursor-grab touch-none select-none overflow-hidden rounded-[22px] border border-line bg-[var(--card-bg)] min-[860px]:block"
      >
        <div
          ref={innerRef}
          className="absolute left-0 top-0"
          style={{ width: canvasW, height: canvasH, ...dottedBg }}
        >
          {/* connectors */}
          <svg
            width={canvasW}
            height={canvasH}
            viewBox={`0 0 ${canvasW} ${canvasH}`}
            className="pointer-events-none absolute inset-0"
            aria-hidden
          >
            {links.map((l, i) => (
              <g key={i}>
                <path
                  d={l.d}
                  fill="none"
                  stroke="var(--border-hover)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeDasharray="0.5 7"
                />
                {l.pts.map(([px, py], j) => (
                  <circle
                    key={j}
                    cx={px}
                    cy={py}
                    r="4.5"
                    fill="var(--card-bg-light)"
                    stroke="var(--border-hover)"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            ))}
          </svg>

          {/* cards */}
          {steps.map((s, i) => (
            <div
              key={s.no}
              className="group absolute rounded-[16px] border border-line bg-[var(--card-bg-light)] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-[border-color,transform] duration-300 ease-[var(--ease)] hover:-translate-y-0.5 hover:border-line-strong"
              style={{ left: pos[i].x, top: pos[i].y, width: CARD_W }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border"
                    style={{
                      borderColor: `${c1}33`,
                      background: `linear-gradient(145deg, ${c1}1f, ${c2}10)`,
                    }}
                  >
                    <StepIcon d={ICONS[i % ICONS.length]} color={c1} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-[14.5px] font-medium leading-[120%] tracking-[-0.02em] text-ink">
                      {s.title}
                    </h3>
                    {s.phase ? (
                      <span className="text-[12px] tracking-[-0.01em] text-muted">
                        {s.phase}
                      </span>
                    ) : null}
                  </div>
                </div>
                <span
                  className="text-[16px] font-medium tabular-nums"
                  style={{ color: c1 }}
                >
                  {s.no}
                </span>
              </div>

              <p className="mt-3 line-clamp-2 text-[12.5px] leading-[155%] tracking-[-0.01em] text-body">
                {s.body}
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
                <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.06em] text-muted">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: c1 }}
                  />
                  {s.phase ?? "Step"}
                </span>
                <span className="text-[11px] tabular-nums text-muted">
                  {s.no} / {String(steps.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* drag hint chip */}
        <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-[100px] border border-line bg-[var(--card-bg-light)]/90 px-3 py-1.5 text-[11px] font-medium tracking-[-0.01em] text-muted [backdrop-filter:blur(8px)]">
          <span aria-hidden>✥</span> Drag to pan
        </span>
      </div>

      {/* ── mobile timeline ───────────────────────────────────────── */}
      <ol className="mt-8 min-[860px]:hidden">
        {steps.map((s, i) => (
          <li
            key={s.no}
            className="grid grid-cols-[44px_1fr] gap-x-4 border-t border-line py-6"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-[13px] border border-line"
              style={{ background: "var(--card-bg-light)" }}
            >
              <StepIcon d={ICONS[i % ICONS.length]} color={c1} />
            </span>
            <div>
              {s.phase ? (
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-dim">
                  {s.phase} · {s.no}
                </span>
              ) : null}
              <h3 className="mt-0.5 text-[17px] font-medium leading-[130%] tracking-[-0.02em] text-ink">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-[160%] tracking-[-0.02em] text-body">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
