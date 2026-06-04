import type { ReactNode } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

/**
 * Shared header for dedicated pages. Includes top padding that clears the
 * fixed nav (`--nav-h`) so the title never hides behind it.
 */
export default function PageHeader({
  eyebrow,
  title,
  accent,
  lead,
}: {
  eyebrow?: string;
  title: ReactNode;
  /** Optional dimmed continuation of the title. */
  accent?: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <section className="relative z-[1] bg-canvas pb-[44px] pt-[calc(var(--nav-h)+96px)] max-[768px]:pt-[calc(var(--nav-h)+56px)]">
      <Container>
        {eyebrow ? (
          <Reveal>
            <span className="mb-5 block text-[13px] font-medium uppercase tracking-[0.12em] text-muted max-[768px]:mb-3">
              {eyebrow}
            </span>
          </Reveal>
        ) : null}
        <Reveal delay={0.05}>
          <h1 className="max-w-[1000px] text-[clamp(36px,5.5vw,82px)] font-medium leading-[110%] tracking-[-0.04em]">
            {title}
            {accent ? <span className="text-dim"> {accent}</span> : null}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[600px] text-[18px] leading-[160%] tracking-[-0.02em] text-body max-[768px]:mt-5">
              {lead}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
