"use client";

import { useEffect } from "react";
import type { CSSProperties, RefObject } from "react";
import Link from "next/link";
import type { Variant } from "@/data/projects";

/**
 * Parallax cubes: nudge every floating cube inside `rootRef` toward the
 * cursor. Shared by the landing highlights and the /work gallery so the
 * behaviour stays identical in both places.
 */
export function useCubeParallax(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;
      rootRef.current
        ?.querySelectorAll<HTMLElement>(".pcard-cube")
        .forEach((f) => {
          f.style.transform = `translate(${mx * 12}px, ${my * 12}px)`;
        });
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [rootRef]);
}

function cardClasses(variant: Variant) {
  const base =
    "relative cursor-pointer overflow-hidden rounded-[20px] transition-[transform,box-shadow] duration-[450ms] ease-[var(--ease)] hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]";
  // Theme-aware surface: dark card in dark mode, light card in light mode.
  if (variant === "wide") return base; // wide: no bg / border
  return `${base} border border-line bg-[var(--card-bg-light)]`;
}

// Tags sit on the (always dark) gradient media panel, so they stay light.
function tagClasses() {
  return "rounded-[100px] bg-white/[0.12] px-3 py-[5px] text-[12px] font-medium tracking-[-0.01em] text-white/80 [backdrop-filter:blur(8px)]";
}

export type ProjectCardProps = {
  title: string;
  tags: string[];
  desc: string;
  bg: string;
  c1: string;
  c2: string;
  variant: Variant;
  /** Optional real screenshot for the media panel (falls back to the cube). */
  image?: string;
  /** Optional small label above the title (e.g. the category). */
  eyebrow?: string;
  /** When set, the whole card links here (e.g. a case-study route). */
  href?: string;
};

export default function ProjectCard({
  title,
  tags,
  desc,
  bg,
  c1,
  c2,
  variant,
  image,
  eyebrow,
  href,
}: ProjectCardProps) {
  const onCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rotX = (y - 0.5) * -5;
    const rotY = (x - 0.5) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  };

  const onCardLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  const card = (
    <article
      onMouseMove={onCardMove}
      onMouseLeave={onCardLeave}
      className={cardClasses(variant)}
    >
      <div className="absolute right-4 top-4 z-[2] flex gap-1.5">
        {tags.map((t) => (
          <span key={t} className={tagClasses()}>
            {t}
          </span>
        ))}
      </div>
      <div
        style={image ? { background: "#0b0b0b" } : { background: bg }}
        className={`relative flex items-center justify-center overflow-hidden ${
          image
            ? "aspect-[4/3]"
            : variant === "wide"
              ? "h-[340px] max-[480px]:h-[240px]"
              : "h-[300px] max-[480px]:h-[220px]"
        }`}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <div className="pcard-cube">
            <div
              className="cube"
              style={{ "--c1": c1, "--c2": c2 } as CSSProperties}
            />
          </div>
        )}
      </div>
      <div className="pt-7 pl-8 pr-8 pb-8 max-[480px]:pt-5 max-[480px]:pl-6 max-[480px]:pr-6 max-[480px]:pb-6">
        {eyebrow ? (
          <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
            {eyebrow}
          </span>
        ) : null}
        <h3 className="mb-2 text-[18px] font-medium leading-[110%] tracking-[-0.03em] text-ink">
          {title}
        </h3>
        <p className="text-[14px] leading-[150%] tracking-[-0.02em] text-body">
          {desc}
        </p>
      </div>
    </article>
  );

  if (!href) return card;

  return (
    <Link
      href={href}
      aria-label={`View case study: ${title}`}
      className="block rounded-[20px] focus-visible:outline-offset-4"
    >
      {card}
    </Link>
  );
}
