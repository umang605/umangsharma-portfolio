"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "@/components/Container";

/**
 * Hero is the one "special section" wired with GSAP. A single timeline
 * reveals the heading / info / scroll cue (mirrors the old `.anim[data-d]`
 * delays of .15s / .3s / .4s, 0.8s ease-out, y 32 → 0). The cursor glow
 * and bottom blur reproduce the original inline-style + `::after` effects.
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.15,
      });
      gsap.to(infoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
      });
      gsap.to(scrollRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(255,80,50,.03), transparent 60%)`;
  };

  const onLeave = () => {
    if (heroRef.current) heroRef.current.style.background = "";
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-dvh overflow-hidden bg-canvas"
    >
      <Container className="relative z-[2] flex min-h-dvh flex-col pb-10 max-[480px]:pb-6">
        <div
          ref={headingRef}
          style={{ opacity: 0, transform: "translateY(32px)" }}
          className="flex flex-1 items-center justify-start pt-[var(--nav-h)]"
        >
          <h1 className="max-w-[780px] text-[clamp(32px,4.2vw,58px)] font-medium leading-[110%] tracking-[-0.04em] text-ink">
            Design for those who want to become a{" "}
            <em className="font-serif font-normal italic">better version</em> of
            themselves.
          </h1>
        </div>

        <div className="flex items-end justify-between max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-4">
          <div
            ref={infoRef}
            style={{ opacity: 0, transform: "translateY(32px)" }}
            className="flex items-center gap-5"
          >
            <span className="text-[14px] tracking-[-0.02em] text-muted">
              UI/UX Designer | Product Designer
            </span>
            <span className="text-[14px] tracking-[-0.02em] text-muted">
              {"☼ India"}
            </span>
          </div>
          <div
            ref={scrollRef}
            style={{ opacity: 0, transform: "translateY(32px)" }}
            className="flex items-center gap-2 text-[14px] tracking-[-0.02em] text-muted"
          >
            <span>Scroll to explore</span>
            <svg
              className="scroll-arrow"
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
            >
              <path
                d="M5 0v12m0 0L1 8m4 4l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </Container>

      {/* bottom blur — mirrors .hero::after */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[120px] bg-[linear-gradient(to_bottom,transparent,var(--bg))] [backdrop-filter:blur(8px)] [-webkit-backdrop-filter:blur(8px)] [mask-image:linear-gradient(to_bottom,transparent,black)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black)]" />
    </section>
  );
}
