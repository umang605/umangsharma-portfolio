import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const TOOLS = ["Figma", "Photoshop", "Illustrator", "After Effects", "Framer"];

const SERVICES = [
  {
    idx: "01",
    title: "UX/UI Design",
    desc: "End-to-end product design. Research, wireframes, prototypes, and production-ready screens.",
  },
  {
    idx: "02",
    title: "Web Design",
    desc: "Landing pages, marketing sites, and web apps designed to convert and impress.",
  },
  {
    idx: "03",
    title: "Brand Identity",
    desc: "Logos, color systems, typography, and guidelines that make brands memorable.",
  },
  {
    idx: "04",
    title: "Visual Design",
    desc: "Posters, pitch decks, presentations, and marketing collateral that tell stories.",
  },
];

const bigHeadingDark =
  "max-w-[1000px] text-[clamp(36px,5.5vw,60px)] font-medium leading-[110%] tracking-[-0.04em] mb-[20px] text-[#050505] max-[768px]:mb-10";

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-[1] bg-[#e6e6e6] py-[var(--section-gap)] text-[#050505]"
    >
      <Container>
        <Reveal>
          <div className="mb-[60px] grid grid-cols-2 items-end gap-10 max-[1024px]:grid-cols-1 max-[1024px]:gap-5">
            <div>
              <h2 className={bigHeadingDark}>My tools &amp;</h2>
              <div className="mt-0 flex flex-wrap gap-2.5">
                <div className="mt-0.1 flex items-center gap-0.1">

<div className="flex h-24 w-24 items-center left">
    <img
      src="/icons/figma_log.svg"
      alt="Figma"
      className="h-15 w-18 object-contain"
    />
  </div>

  <div className="flex h-24 w-24 items-center left">
    <img
      src="/icons/adobe-illustrator-icon.svg"
      alt="Illustrator"
      className="h-15 w-18 object-contain"
    />
  </div>

  <div className="flex h-24 w-24 items-center left">
    <img
      src="/icons/adobe-lightroom-icon.svg"
      alt="Lightroom"
      className="h-15 w-20 object-contain"
    />
  </div>

  <div className="flex h-24 w-24 items-center left">
    <img
      src="/icons/adobe-photoshop-icon.svg"
      alt="Photoshop"
      className="h-15 w-20 object-contain"
    />
  </div>

  <div className="flex h-24 w-24 items-center left">
    <img
      src="/icons/adobe-xd-2.svg"
      alt="Adobe XD"
      className="h-15 w-20 object-contain"
    />
  </div>

  <div className="flex h-24 w-24 items-center left">
    <img
      src="/icons/claude-ai-icon.svg"
      alt="Claude AI"
      className="h-15 w-20 object-contain"
    />
  </div>

<div className="flex h-24 w-24 items-center left">
    <img
      src="/icons/chatgpt-icon.svg"
      alt="Claude AI"
      className="h-15 w-20 object-contain"
    />
  </div>

</div>
              </div>
            </div>
            <div>
              <h2 className={bigHeadingDark}>your brand.</h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-[1fr_1.2fr] items-start gap-30 max-[1024px]:grid-cols-1 max-[1024px]:gap-10">
          <Reveal>
            <div>
              <p className="mb-6 max-w-[480px] text-[18px] leading-[160%] tracking-[-0.02em] text-black/55">
                I design products end-to-end: research, UX flows, sharp UI, and
                motion. I&apos;ve worked across SaaS, AI platforms, and mobile —
                always owning the full design process.
              </p>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-[100px] bg-[#050505] px-6 py-3 text-[14px] font-medium tracking-[-0.02em] text-white transition-all duration-300 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
              >
                {"↗ See my work"}
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1">
              {SERVICES.map((s) => (
                <div
                  key={s.idx}
                  className="rounded-2xl border border-black/[0.06] bg-black/[0.04] p-8 transition-all duration-300 ease-[var(--ease)] hover:-translate-y-[3px] hover:bg-black/[0.07]"
                >
                  <span className="mb-4 block text-[13px] text-black/25">
                    {s.idx}
                  </span>
                  <h3 className="mb-2 text-[16px] font-medium tracking-[-0.02em] text-[#050505]">
                    {s.title}
                  </h3>
                  <p className="text-[13px] leading-[160%] tracking-[-0.01em] text-black/50">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
