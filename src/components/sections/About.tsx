import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

/**
 * Portrait shown on the left. Drop the image into `/public` and set this to
 * its path (e.g. "/about-portrait.jpg"). While empty, a placeholder renders.
 */
const PHOTO_SRC = "/about-portrait.webp";

type TimelineEntry = {
  period: string;
  title: string;
  subtitle?: string;
  org?: string;
};

// TODO(umang): replace these placeholders with your real education history.
const EDUCATION: TimelineEntry[] = [
  {
    period: "2021 — 2024",
    title: "Bachelor's Degree",
    subtitle: "Your field of study",
    org: "Your university",
  },
  {
    period: "2019 — 2021",
    title: "Diploma / Foundation",
    subtitle: "Your field of study",
    org: "Your institution",
  },
];

// TODO(umang): replace these placeholders with your real experience.
const EXPERIENCE: TimelineEntry[] = [
  {
    period: "2024 — Present",
    title: "Product Designer",
    subtitle: "UI/UX & Product",
    org: "Company name",
  },
  {
    period: "2022 — 2024",
    title: "UI/UX Designer",
    subtitle: "Sole designer — product, brand & visual",
    org: "Company name",
  },
  {
    period: "2021 — 2022",
    title: "Design Intern",
    subtitle: "Visual & brand design",
    org: "Company name",
  },
];

function Timeline({ label, entries }: { label: string; entries: TimelineEntry[] }) {
  return (
    <div>
      <span className="block text-[14px] font-medium tracking-[-0.01em] text-ink">
        {label}
      </span>
      <div className="mt-7 flex flex-col gap-9">
        {entries.map((e) => (
          <div
            key={`${e.period}-${e.title}`}
            className="grid grid-cols-[96px_1fr] gap-x-5 max-[480px]:grid-cols-[84px_1fr]"
          >
            <span className="pt-0.5 text-[12px] uppercase leading-[150%] tracking-[0.02em] text-muted">
              {e.period}
            </span>
            <div>
              <h4 className="text-[16px] font-medium leading-[125%] tracking-[-0.02em] text-ink">
                {e.title}
              </h4>
              {e.subtitle ? (
                <p className="mt-0.5 text-[15px] leading-[140%] tracking-[-0.02em] text-body">
                  {e.subtitle}
                </p>
              ) : null}
              {e.org ? (
                <p className="text-[15px] leading-[140%] tracking-[-0.02em] text-body">
                  {e.org}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative z-[1] bg-canvas py-[var(--section-gap)]"
    >
      <Container>
        <div className="grid grid-cols-12 gap-x-10 gap-y-16 max-[1024px]:gap-y-12">
          {/* LEFT — headline, portrait + bio, contact */}
          <div className="col-span-7 max-[1024px]:col-span-12">
            <Reveal>
              <h2 className="max-w-[780px] text-[clamp(32px,4.2vw,58px)] font-medium leading-[110%] tracking-[-0.04em] text-ink">
                I craft design that turns ambitious ideas into{" "}
                <span className="text-dim">products people trust.</span>
              </h2>
            </Reveal>

            <div className="mt-[72px] grid grid-cols-[minmax(0,288px)_1fr] items-start gap-x-12 gap-y-10 max-[1024px]:mt-12 max-[560px]:grid-cols-1">
              <Reveal>
                <div className="w-full max-w-[300px] overflow-hidden border border-line">
                  <div className="aspect-[4/5] w-full">
                    {PHOTO_SRC ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={PHOTO_SRC}
                        alt="Umang Sharma"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[var(--card-bg)]">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
                          Your photo
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="flex max-w-[460px] flex-col gap-5 text-[16px] leading-[165%] tracking-[-0.02em] text-body">
                  <p>
                    I&apos;m <strong className="font-medium text-ink">Umang Sharma</strong>, a
                    UI/UX &amp; product designer crafting digital products that
                    feel clear, considered, and human.
                  </p>
                  <p>
                    With 3+ years of hands-on experience, I&apos;ve owned design
                    end-to-end — from research and wireframes to polished,
                    production-ready screens across web and mobile, often as the
                    sole designer owning product, brand, and visual design.
                  </p>
                  <p>
                    My approach blends strategy with craft, building interfaces
                    that are both functional and emotionally resonant.{" "}
                    <strong className="font-medium text-ink">
                      Currently on my notice period and open to my next full-time
                      role.
                    </strong>
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-[72px] max-[1024px]:mt-12">
                <span className="block text-[14px] font-medium tracking-[-0.01em] text-ink">
                  contact
                </span>
                <a
                  href="mailto:theumangsharma007@gmail.com"
                  className="mt-3 inline-flex items-center gap-2.5 text-[16px] tracking-[-0.02em] text-body transition-colors duration-300 ease-[var(--ease)] hover:text-ink"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="shrink-0 opacity-70"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  theumangsharma007@gmail.com
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — education + experience timelines */}
          <div className="col-span-4 col-start-9 flex flex-col gap-14 max-[1024px]:col-span-12 max-[1024px]:col-start-1">
            <Reveal>
              <Timeline label="education" entries={EDUCATION} />
            </Reveal>
            <Reveal delay={0.05}>
              <Timeline label="experience" entries={EXPERIENCE} />
            </Reveal>
          </div>
        </div>

        {/* BOTTOM — closing statement */}
        <Reveal>
          <p className="ml-auto mt-[120px] max-w-[820px] text-right text-[clamp(32px,4.2vw,58px)] font-medium leading-[110%] tracking-[-0.04em] text-ink max-[1024px]:mt-20 max-[768px]:text-left">
            I love clean systems, bold type, and{" "}
            <span className="text-dim">
              interfaces that feel effortless to use.
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
