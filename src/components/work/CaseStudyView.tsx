import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import CaseStudyNav from "@/components/work/CaseStudyNav";
import ProcessFlow from "@/components/work/ProcessFlow";
import {
  getNextCaseStudy,
  type CaseStudy,
  type Shot as ShotType,
} from "@/data/caseStudies";

/** Left-rail jump menu — labels map to the section ids below. */
const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem & solution" },
  { id: "goals", label: "Goals" },
  { id: "process", label: "Process" },
  { id: "features", label: "Inside the product" },
  { id: "screens", label: "Screens" },
  { id: "design-system", label: "Design system" },
  { id: "outcome", label: "Outcome" },
];

/* ── shared bits ─────────────────────────────────────────────────────── */

const SECTION = "relative z-[1] bg-canvas py-[var(--section-gap)]";
const H2 =
  "text-[clamp(28px,3.6vw,46px)] font-medium leading-[115%] tracking-[-0.03em] text-ink";
const LEAD = "text-[18px] leading-[160%] tracking-[-0.02em] text-body";
const EYEBROW =
  "block text-[13px] font-medium uppercase tracking-[0.12em] text-muted";

function Heading({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <h2 className={H2}>
      {children}
      {accent ? <span className="text-dim"> {accent}</span> : null}
    </h2>
  );
}

function ChromeDots() {
  return (
    <div className="absolute left-5 top-5 z-[2] flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/20" />
      ))}
    </div>
  );
}

function Shot({ shot }: { shot: ShotType }) {
  return (
    <figure className={shot.wide ? "col-span-2 max-[768px]:col-span-1" : ""}>
      <div className="overflow-hidden rounded-[20px] border border-line">
        {shot.image ? (
          // Render at natural aspect — full content, never cropped.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.image}
            alt={shot.title}
            loading="lazy"
            className="block w-full"
          />
        ) : (
          <div
            className={`relative w-full ${
              shot.wide ? "aspect-[16/9]" : "aspect-[4/3]"
            }`}
            style={{ background: shot.bg }}
          >
            <ChromeDots />
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <span className="rounded-[100px] border border-white/15 bg-white/[0.06] px-4 py-2 text-center text-[12px] uppercase tracking-[0.14em] text-white/70 [backdrop-filter:blur(8px)]">
                {shot.title}
              </span>
            </div>
          </div>
        )}
      </div>
      {shot.caption ? (
        <figcaption className="mt-3 text-[13px] leading-[150%] tracking-[-0.01em] text-muted">
          <span className="font-medium text-body">{shot.title}</span>
          {" — "}
          {shot.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function StatBand({
  metrics,
}: {
  metrics: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-10 max-[768px]:grid-cols-2">
      {metrics.map((m) => (
        <div key={m.label}>
          <div className="text-[clamp(28px,3.2vw,44px)] font-medium leading-[105%] tracking-[-0.03em] text-ink">
            {m.value}
          </div>
          <div className="mt-2 text-[13px] leading-[140%] tracking-[-0.01em] text-muted">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── brand-guidelines helpers ────────────────────────────────────────── */

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.trim().match(/^#?([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToCmyk({ r, g, b }: { r: number; g: number; b: number }) {
  const r1 = r / 255,
    g1 = g / 255,
    b1 = b / 255;
  const k = 1 - Math.max(r1, g1, b1);
  if (k >= 1) return "0, 0, 0, 100";
  const c = Math.round(((1 - r1 - k) / (1 - k)) * 100);
  const m = Math.round(((1 - g1 - k) / (1 - k)) * 100);
  const y = Math.round(((1 - b1 - k) / (1 - k)) * 100);
  return `${c}, ${m}, ${y}, ${Math.round(k * 100)}`;
}

/** Perceived brightness > 0.62 → light swatch, needs dark label text. */
function isLightColor({ r, g, b }: { r: number; g: number; b: number }) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line py-1.5">
      <span className="text-muted">{k}</span>
      <span className="text-ink">{v}</span>
    </div>
  );
}

/** A named colour swatch with the full print/screen spec, brand-guideline style. */
function SwatchCard({ token }: { token: { value: string; label: string } }) {
  const rgb = hexToRgb(token.value);
  const lightSwatch = rgb ? isLightColor(rgb) : false;
  return (
    <div>
      <div
        className="relative flex aspect-[5/4] items-start overflow-hidden rounded-[14px] p-3.5"
        style={{
          background: token.value,
          boxShadow: "inset 0 0 0 1px rgba(128,128,128,0.22)",
        }}
      >
        <span
          className={`text-[14px] font-semibold leading-[118%] tracking-[-0.02em] ${
            lightSwatch ? "text-black/85" : "text-white"
          }`}
        >
          {token.label}
        </span>
      </div>
      {rgb ? (
        <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.02em]">
          <Spec k="HEX" v={token.value.toUpperCase()} />
          <Spec k="RGB" v={`${rgb.r}, ${rgb.g}, ${rgb.b}`} />
          <Spec k="CMYK" v={rgbToCmyk(rgb)} />
        </div>
      ) : (
        <div className="mt-3 border-t border-line py-1.5 font-mono text-[11px] uppercase tracking-[0.02em] text-ink">
          {token.value}
        </div>
      )}
    </div>
  );
}

/* ── main template ───────────────────────────────────────────────────── */

export default function CaseStudyView({ cs }: { cs: CaseStudy }) {
  const next = getNextCaseStudy(cs.slug);

  return (
    <article style={{ "--cs-accent": cs.cover.c1 } as CSSProperties}>
      <CaseStudyNav items={NAV_ITEMS} />

      {/* HERO */}
      <section className="relative z-[1] bg-canvas pb-[var(--section-gap)] pt-[calc(var(--nav-h)+96px)] max-[768px]:pt-[calc(var(--nav-h)+56px)]">
        <Container>
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-[14px] tracking-[-0.02em] text-muted transition-colors duration-300 ease-[var(--ease)] hover:text-ink"
            >
              <span aria-hidden>←</span> Work
            </Link>
          </Reveal>

          <Reveal delay={0.04}>
            <span className={`mt-8 ${EYEBROW} max-[768px]:mt-6`}>{cs.eyebrow}</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-[1000px] text-[clamp(36px,5.5vw,82px)] font-medium leading-[110%] tracking-[-0.04em] text-ink max-[768px]:mt-3">
              {cs.title}
              {cs.titleAccent ? (
                <span className="text-dim"> {cs.titleAccent}</span>
              ) : null}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className={`mt-7 max-w-[680px] ${LEAD} max-[768px]:mt-5`}>
              {cs.summary}
            </p>
          </Reveal>

          {/* Live-site link — opens the real product / site in a new tab */}
          {cs.liveUrl ? (
            <Reveal delay={0.18}>
              <a
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-[100px] bg-ink px-6 py-3 text-[15px] font-medium tracking-[-0.02em] text-canvas transition-transform duration-300 ease-[var(--ease)] hover:-translate-y-0.5 max-[768px]:mt-6"
              >
                {cs.liveLabel ?? "Visit live site"}
                <span
                  aria-hidden
                  className="text-[13px] transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </Reveal>
          ) : null}

          {/* Cover visual — only render when a real cover image exists */}
          {cs.cover.image ? (
          <Reveal delay={0.18}>
            <div className="mt-14 overflow-hidden rounded-[24px] border border-line max-[768px]:mt-10">
              <div
                className="relative aspect-[16/9] w-full max-[768px]:aspect-[4/3]"
                style={cs.cover.image ? undefined : { background: cs.cover.bg }}
              >
                {cs.cover.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cs.cover.image}
                    alt={`${cs.title} ${cs.titleAccent ?? ""}`.trim()}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <ChromeDots />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="pcard-cube">
                        <div
                          className="cube"
                          style={
                            {
                              "--c1": cs.cover.c1,
                              "--c2": cs.cover.c2,
                            } as CSSProperties
                          }
                        />
                      </div>
                    </div>
                    <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-[100px] border border-white/15 bg-white/[0.06] px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-white/70 [backdrop-filter:blur(8px)]">
                      Hero — product overview
                    </span>
                  </>
                )}
              </div>
            </div>
          </Reveal>
          ) : null}

          {/* Meta strip */}
          <Reveal delay={0.22}>
            <dl className="mt-12 grid grid-cols-3 gap-x-8 gap-y-7 border-t border-line pt-10 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1 max-[768px]:mt-10">
              {cs.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[12px] uppercase tracking-[0.1em] text-muted">
                    {m.label}
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-[145%] tracking-[-0.02em] text-ink">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* STATS BAND */}
      <section className="relative z-[1] bg-surface py-[clamp(56px,7vw,96px)] text-ink">
        <Container>
          <Reveal>
            <div className="grid grid-cols-4 gap-x-8 gap-y-10 max-[768px]:grid-cols-2">
              {cs.stats.map((m) => (
                <div key={m.label}>
                  <div className="text-[clamp(32px,3.6vw,52px)] font-medium leading-[105%] tracking-[-0.03em] text-ink">
                    {m.value}
                  </div>
                  <div className="mt-2 text-[13px] leading-[140%] tracking-[-0.01em] text-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className={SECTION}>
        <Container>
          <div className="grid grid-cols-[minmax(0,360px)_1fr] gap-x-16 gap-y-8 max-[900px]:grid-cols-1">
            <Reveal>
              <Heading accent={cs.overview.accent}>{cs.overview.heading}</Heading>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="flex max-w-[680px] flex-col gap-5">
                {cs.overview.body.map((p, i) => (
                  <p key={i} className={LEAD}>
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="relative z-[1] bg-surface py-[var(--section-gap)] text-ink">
        <Container>
          <div className="grid grid-cols-[minmax(0,360px)_1fr] gap-x-16 gap-y-8 max-[900px]:grid-cols-1">
            <Reveal>
              <h2 className={`${H2} !text-ink`}>
                {cs.problem.heading}
                {cs.problem.accent ? (
                  <span className="text-dim"> {cs.problem.accent}</span>
                ) : null}
              </h2>
            </Reveal>
            <div className="max-w-[680px]">
              <Reveal delay={0.06}>
                <div className="flex flex-col gap-5">
                  {cs.problem.body.map((p, i) => (
                    <p
                      key={i}
                      className="text-[18px] leading-[160%] tracking-[-0.02em] text-body"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-9">
                  <div className="grid grid-cols-2 gap-x-10 pb-3 max-[640px]:hidden">
                    <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-dim">
                      The problem
                    </span>
                    <span
                      className="text-[11px] font-medium uppercase tracking-[0.12em]"
                      style={{ color: "var(--cs-accent)" }}
                    >
                      Our solution
                    </span>
                  </div>
                  <ul className="flex flex-col">
                    {cs.problem.points.map((pt, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-2 items-start gap-x-10 gap-y-2.5 border-t border-line py-4 max-[640px]:grid-cols-1"
                      >
                        <p className="flex gap-3 text-[15px] leading-[155%] tracking-[-0.02em] text-body">
                          <span
                            aria-hidden
                            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-dim"
                          />
                          {pt.pain}
                        </p>
                        <p className="flex gap-3 text-[15px] leading-[155%] tracking-[-0.02em] text-ink">
                          <span
                            aria-hidden
                            className="mt-[3px] shrink-0 text-[14px] font-medium"
                            style={{ color: "var(--cs-accent)" }}
                          >
                            →
                          </span>
                          {pt.fix}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* GOALS */}
      <section id="goals" className={SECTION}>
        <Container>
          <Reveal>
            <Heading accent={cs.goals.accent}>{cs.goals.heading}</Heading>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-0 max-[768px]:grid-cols-1 max-[768px]:mt-8">
            {cs.goals.items.map((g, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <div className="flex gap-4 border-t border-line py-5">
                  <span className="text-[14px] font-medium tabular-nums text-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] leading-[150%] tracking-[-0.02em] text-body">
                    {g}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative z-[1] bg-surface py-[var(--section-gap)] text-ink">
        <Container>
          <Reveal>
            <h2 className={`${H2} !text-ink`}>
              {cs.process.heading}
              {cs.process.accent ? (
                <span className="text-dim"> {cs.process.accent}</span>
              ) : null}
            </h2>
          </Reveal>
          {cs.process.intro ? (
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-[640px] text-[18px] leading-[160%] tracking-[-0.02em] text-body">
                {cs.process.intro}
              </p>
            </Reveal>
          ) : null}
          <Reveal delay={0.1}>
            <ProcessFlow
              steps={cs.process.steps}
              c1={cs.cover.c1}
              c2={cs.cover.c2}
            />
          </Reveal>
        </Container>
      </section>

      {/* FEATURES */}
      <section id="features" className={SECTION}>
        <Container>
          <Reveal>
            <Heading accent={cs.features.accent}>{cs.features.heading}</Heading>
          </Reveal>
          {cs.features.intro ? (
            <Reveal delay={0.06}>
              <p className={`mt-5 max-w-[640px] ${LEAD}`}>{cs.features.intro}</p>
            </Reveal>
          ) : null}
          <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-0 max-[768px]:grid-cols-1 max-[768px]:mt-8">
            {cs.features.items.map((f, i) => (
              <Reveal key={f.title} delay={0.03 * i}>
                <div className="border-t border-line py-6">
                  <h3 className="text-[16px] font-medium leading-[130%] tracking-[-0.02em] text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[160%] tracking-[-0.02em] text-body">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* GALLERY */}
      <section id="screens" className="relative z-[1] bg-surface py-[var(--section-gap)] text-ink">
        <Container>
          <Reveal>
            <h2 className={`${H2} !text-ink`}>
              {cs.gallery.heading}
              {cs.gallery.accent ? (
                <span className="text-dim"> {cs.gallery.accent}</span>
              ) : null}
            </h2>
          </Reveal>
          {cs.gallery.intro ? (
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-[640px] text-[18px] leading-[160%] tracking-[-0.02em] text-body">
                {cs.gallery.intro}
              </p>
            </Reveal>
          ) : null}
          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-2 gap-5 max-[768px]:grid-cols-1 max-[768px]:mt-8">
              {cs.gallery.shots.map((shot) => (
                <Shot key={shot.title} shot={shot} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>


      {/* DESIGN SYSTEM */}
      <section id="design-system" className={SECTION}>
        <Container>
          <Reveal>
            <Heading accent={cs.designSystem.accent}>
              {cs.designSystem.heading}
            </Heading>
          </Reveal>
          {cs.designSystem.intro ? (
            <Reveal delay={0.06}>
              <p className={`mt-5 max-w-[680px] ${LEAD}`}>
                {cs.designSystem.intro}
              </p>
            </Reveal>
          ) : null}

          {/* Typeface specimen */}
          {cs.designSystem.typeface ? (
            <Reveal delay={0.08}>
              <div className="mt-12 border-t border-line pt-8 max-[768px]:mt-8">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span
                    className="text-[clamp(34px,4.6vw,58px)] font-medium leading-none tracking-[-0.03em] text-ink"
                    style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
                  >
                    {cs.designSystem.typeface.name}
                  </span>
                  <span
                    className="text-[clamp(34px,4.6vw,58px)] font-normal leading-none tracking-[-0.02em] text-dim"
                    style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
                  >
                    Aa Bb Cc 0123
                  </span>
                  {cs.designSystem.typeface.note ? (
                    <span className="ml-auto text-[12px] uppercase tracking-[0.1em] text-muted max-[768px]:ml-0">
                      {cs.designSystem.typeface.note}
                    </span>
                  ) : null}
                </div>
                <p
                  className="mt-6 break-words text-[clamp(18px,2.2vw,29px)] leading-[150%] tracking-[-0.01em] text-dim"
                  style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
                >
                  AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
                  0123456789 &amp; @ # % ( ) ! ?
                </p>
              </div>
            </Reveal>
          ) : null}

          {/* Colour — named swatch cards with HEX / RGB / CMYK (brand-guideline spec) */}
          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col gap-12 max-[768px]:mt-10">
              {cs.designSystem.groups.map((g) => (
                <div key={g.title}>
                  <h3 className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
                    {g.title}
                  </h3>
                  <div className="mt-5 grid grid-cols-4 gap-5 max-[900px]:grid-cols-3 max-[560px]:grid-cols-2">
                    {g.tokens.map((t) => (
                      <SwatchCard key={`${t.label}-${t.value}`} token={t} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Gradients — generated from the brand accents */}
              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
                  Gradients
                </h3>
                <div className="mt-5 grid grid-cols-4 gap-5 max-[900px]:grid-cols-3 max-[560px]:grid-cols-2">
                  {[
                    {
                      label: "Brand · 135°",
                      css: `linear-gradient(135deg, ${cs.cover.c1}, ${cs.cover.c2})`,
                    },
                    {
                      label: "Vertical",
                      css: `linear-gradient(180deg, ${cs.cover.c1}, ${cs.cover.c2})`,
                    },
                    {
                      label: "Radial glow",
                      css: `radial-gradient(circle at 30% 25%, ${cs.cover.c1}, ${cs.cover.c2} 72%)`,
                    },
                    {
                      label: "Sheen",
                      css: `linear-gradient(135deg, ${cs.cover.c2}, ${cs.cover.c1} 50%, ${cs.cover.c2})`,
                    },
                  ].map((grad) => (
                    <div key={grad.label}>
                      <div
                        className="aspect-[5/4] rounded-[14px]"
                        style={{
                          background: grad.css,
                          boxShadow: "inset 0 0 0 1px rgba(128,128,128,0.22)",
                        }}
                      />
                      <div className="mt-3 border-t border-line py-1.5 font-mono text-[11px] uppercase tracking-[0.02em] text-ink">
                        {grad.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Semantic status pills */}
          {cs.designSystem.statuses ? (
            <Reveal delay={0.14}>
              <div className="mt-14 border-t border-line pt-8">
                <h3 className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
                  {cs.designSystem.statusesLabel ?? "Candidate status"}
                </h3>
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  {cs.designSystem.statuses.map((s) => (
                    <span
                      key={s.name}
                      className="rounded-[100px] px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.01em]"
                      style={{ background: s.bg, color: s.fg }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}

          <div className="mt-14 grid grid-cols-2 gap-x-12 gap-y-0 max-[768px]:grid-cols-1 max-[768px]:mt-10">
            {cs.designSystem.principles.map((p, i) => (
              <Reveal key={p.title} delay={0.04 * i}>
                <div className="border-t border-line py-6">
                  <h3 className="text-[16px] font-medium leading-[130%] tracking-[-0.02em] text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[160%] tracking-[-0.02em] text-body">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* OUTCOME */}
      <section id="outcome" className="relative z-[1] bg-surface py-[var(--section-gap)] text-ink">
        <Container>
          <div className="grid grid-cols-[minmax(0,360px)_1fr] gap-x-16 gap-y-8 max-[900px]:grid-cols-1">
            <Reveal>
              <h2 className={`${H2} !text-ink`}>
                {cs.outcome.heading}
                {cs.outcome.accent ? (
                  <span className="text-dim"> {cs.outcome.accent}</span>
                ) : null}
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="flex max-w-[680px] flex-col gap-5">
                {cs.outcome.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-[18px] leading-[160%] tracking-[-0.02em] text-body"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="mt-14 grid grid-cols-4 gap-x-8 gap-y-10 border-t border-line pt-12 max-[768px]:grid-cols-2 max-[768px]:mt-10">
              {cs.outcome.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-[clamp(32px,3.6vw,52px)] font-medium leading-[105%] tracking-[-0.03em] text-ink">
                    {m.value}
                  </div>
                  <div className="mt-2 text-[13px] leading-[140%] tracking-[-0.01em] text-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FOOTER NAV */}
      <section className="relative z-[1] bg-canvas py-[clamp(56px,7vw,96px)]">
        <Container>
          <Reveal>
            <div className="flex items-center justify-between gap-6 border-t border-line pt-12 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-5">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-[15px] tracking-[-0.02em] text-muted transition-colors duration-300 ease-[var(--ease)] hover:text-ink"
              >
                <span aria-hidden>←</span> All work
              </Link>
              <Link
                href={next ? `/work/${next.slug}` : "/work"}
                className="group inline-flex items-center gap-2 text-right"
              >
                <span className="flex flex-col">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-muted">
                    {next ? "Next case study" : "More work"}
                  </span>
                  <span className="text-[18px] font-medium tracking-[-0.02em] text-ink transition-colors duration-300 ease-[var(--ease)] group-hover:text-dim">
                    {next ? next.title : "See all projects"}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-ink transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
