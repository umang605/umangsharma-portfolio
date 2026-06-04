"use client";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type Poster = { src: string; title: string; tag: string };

const POSTERS: Poster[] = [
  { src: "/work/posters/damn.webp", title: "DAMN", tag: "Original · Music" },
  { src: "/work/posters/manorama.webp", title: "Manorama", tag: "Film · Six Feet Under" },
  { src: "/work/posters/scarface.webp", title: "Scarface", tag: "Film" },
  { src: "/work/posters/heisenberg.webp", title: "Heisenberg", tag: "Breaking Bad" },
];

const DELAYS = [0.05, 0.12, 0.19, 0.26];

export default function Posters() {
  return (
    <section
      id="posters"
      className="relative z-[1] bg-canvas pb-[var(--section-gap)]"
    >
      <Container>
        <Reveal>
          <h2 className="mb-[14px] max-w-[760px] text-[clamp(36px,5.5vw,58px)] font-medium leading-[110%] tracking-[-0.04em]">
            Poster design.{" "}
            <span className="text-dim">Type, tension, and a lot of red.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mb-[48px] max-w-[520px] text-[16px] leading-[160%] tracking-[-0.02em] text-muted max-[768px]:mb-9">
            A side practice — film and music posters built around bold type,
            grain, and high-contrast colour.
          </p>
        </Reveal>

        <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {POSTERS.map((p, i) => (
            <Reveal key={p.title} delay={DELAYS[i]}>
              <figure className="group">
                <div className="overflow-hidden rounded-[16px] border border-line bg-[#0b0b0b]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={`${p.title} poster`}
                    className="aspect-[2/3] w-full object-contain transition-transform duration-[800ms] ease-[var(--ease)] group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[15px] font-medium tracking-[-0.02em] text-ink">
                    {p.title}
                  </span>
                  <span className="shrink-0 text-[12px] uppercase tracking-[0.06em] text-muted">
                    {p.tag}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
