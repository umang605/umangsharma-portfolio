"use client";

import { useRef } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { FEATURED } from "@/data/projects";
import { hasCaseStudy } from "@/data/caseStudies";

const REVEAL_DELAYS = [0.05, 0.12, 0.19, 0.26, 0.33];

export default function Work() {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="work"
      className="relative z-[1] overflow-hidden bg-canvas py-[var(--section-gap)]"
    >

      {/* Top Gradient Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-[720px] overflow-hidden">

        <div className="absolute left-1/2 top-[-180px] h-[520px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,#ff4d2d_0%,#8f1d10_35%,transparent_72%)] opacity-70 blur-[90px]" />

        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,#ff7b5c_0%,transparent_70%)] opacity-40 blur-[120px]" />

      </div>

      <Container>

        {/* Heading */}
        <Reveal>
          <h2 className="mb-[60px] max-w-[700px] text-[clamp(36px,5.5vw,58px)] font-medium leading-[110%] tracking-[-0.04em] max-[768px]:mb-10">
            My highlights.{" "}
            <span className="text-dim">
              Recent projects I&apos;m proud of.
            </span>
          </h2>
        </Reveal>

        {/* Top Content */}
        <div className="mb-[60px] grid grid-cols-[1.4fr_1fr] items-start gap-20 max-[1024px]:grid-cols-1 max-[1024px]:gap-8">

          <Reveal>
            <p className="text-[18px] leading-[160%] tracking-[-0.02em] text-body">
              <strong className="font-medium text-ink">
                Shipped 20+ projects as the sole designer
              </strong>{" "}
              <span className="text-dim">
                — covering product design, web, mobile, branding, and AI-driven
                platforms.
              </span>
            </p>
          </Reveal>

          <Reveal>
            <p className="max-w-[320px] pt-1 text-[14px] leading-[160%] tracking-[-0.02em] text-muted max-[1024px]:pt-0">
              Here&apos;s a selection of the work I owned and delivered
              end-to-end.
            </p>
          </Reveal>

        </div>

        {/* Masonry Layout */}
        <div
          ref={rootRef}
          className="columns-2 gap-5 max-[768px]:columns-1"
        >
          {FEATURED.map((p, i) => (
            <Reveal key={p.slug} delay={REVEAL_DELAYS[i]}>

              <Link
                href={hasCaseStudy(p.slug) ? `/work/${p.slug}` : "#"}
                className="group mb-5 block break-inside-avoid"
              >

               {/* Project Thumbnail */}
<div className="aspect-[4/3] overflow-hidden rounded-[16px] bg-[#111]">

  {p.image ? (

    <img
      src={p.image}
      alt={p.title}
      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
    />

  ) : (

    <div className="h-full w-full bg-[#111]" />

  )}

</div>
                {/* Bottom Content */}
                <div className="mt-3 flex items-center justify-between gap-4">

                  <h3 className="text-[16px] tracking-[-0.02em] text-ink">
                    {p.title}
                  </h3>

                  <span className="text-[14px] tracking-[-0.02em] text-muted">
                    {p.tags.join(", ")}
                  </span>

                </div>

              </Link>

            </Reveal>
          ))}
        </div>

        {/* Button */}
        <Reveal delay={0.1}>
          <div className="mt-[60px] flex justify-center max-[768px]:mt-10">

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-[100px] border border-line px-7 py-3.5 text-[15px] font-medium tracking-[-0.02em] text-ink transition-all duration-300 ease-[var(--ease)] hover:-translate-y-0.5 hover:border-line-strong"
            >
              View all work
              <span aria-hidden>→</span>
            </Link>

          </div>
        </Reveal>

      </Container>
    </section>
  );
}