import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const SOCIALS = ["LinkedIn", "Twitter", "Instagram", "Behance"];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-[1] bg-[linear-gradient(180deg,var(--bg-light)_0%,var(--bg)_30%)] py-[var(--section-gap)]"
    >
      <Container>
        <Reveal>
          <h2 className="mb-[60px] max-w-[1000px] text-[clamp(36px,5.5vw,82px)] font-medium leading-[110%] tracking-[-0.04em] text-ink max-[768px]:mb-10">
            Let&apos;s work together.{" "}
            <span className="text-dim">
              I&apos;m looking for my next{" "}
              <em className="font-serif font-normal italic">full-time</em> role.
            </span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-[1.4fr_1fr] items-start gap-20 max-[1024px]:grid-cols-1 max-[1024px]:gap-8">
            <div>
              <a
                href="mailto:theumangsharma007@gmail.com"
                className="mb-6 inline-flex items-center gap-2.5 rounded-[100px] border border-line bg-card px-7 py-3.5 text-[18px] font-medium tracking-[-0.03em] text-ink transition-all duration-300 ease-[var(--ease)] hover:-translate-y-0.5 hover:border-line-strong max-[480px]:px-5 max-[480px]:py-3 max-[480px]:text-[14px]"
              >
                theumangsharma007@gmail.com <span>{"↗"}</span>
              </a>
              <div className="flex flex-wrap gap-2 max-[480px]:gap-1.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="rounded-[100px] border border-line px-5 py-2.5 text-[14px] font-medium tracking-[-0.02em] text-body transition-all duration-[250ms] ease-[var(--ease)] hover:-translate-y-0.5 hover:border-line-strong hover:text-ink max-[480px]:px-3.5 max-[480px]:py-2 max-[480px]:text-[13px]"
                  >
                    {s} {"↗"}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="max-w-[320px] pt-1 text-[14px] leading-[160%] tracking-[-0.02em] text-muted max-[1024px]:pt-0">
                Currently on notice period. Open to full-time product design and
                UI/UX roles — remote or on-site. Let&apos;s connect.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
