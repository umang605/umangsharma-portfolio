import Link from "next/link";
import Container from "@/components/Container";

const SITEMAP: { label: string; href: string }[] = [
  { label: "Work", href: "/work" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "https://dribbble.com/Umang_Sharma" },
  { label: "Twitter / X", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
];

const EMAIL = "theumangsharma007@gmail.com";

export default function Footer() {
  return (
    <footer className="relative z-[1] overflow-hidden border-t border-line bg-canvas pt-[clamp(56px,7vw,96px)]">
      <Container>
        {/* Top: identity + link columns */}
        <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-x-12 gap-y-12 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
          {/* Identity */}
          <div className="max-[860px]:col-span-2 max-[560px]:col-span-1">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon.svg"
                alt=""
                className="h-6 w-6 transition-[filter] duration-[400ms] ease-[var(--ease)] [filter:var(--logo-inv)]"
              />
              <span className="text-[18px] font-medium tracking-[-0.03em] text-ink">
                Umang Sharma
              </span>
            </div>

            <p className="mt-5 max-w-[360px] text-[15px] leading-[160%] tracking-[-0.02em] text-body">
              Product &amp; UI/UX designer crafting digital products, brands, and
              visual stories — end to end.
            </p>

            <div className="mt-6 inline-flex items-center gap-2.5 rounded-[100px] border border-line bg-card px-4 py-2">
              <span className="dot-green" aria-hidden />
              <span className="text-[13px] font-medium tracking-[-0.02em] text-body">
                Open to full-time work
              </span>
            </div>

            <div className="mt-7">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2 text-[clamp(18px,2.2vw,24px)] font-medium tracking-[-0.03em] text-ink"
              >
                <span className="border-b border-transparent transition-colors duration-300 ease-[var(--ease)] group-hover:border-line-strong">
                  {EMAIL}
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
              Sitemap
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {SITEMAP.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[15px] tracking-[-0.02em] text-body transition-colors duration-300 ease-[var(--ease)] hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
              Social
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {SOCIALS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-1.5 text-[15px] tracking-[-0.02em] text-body transition-colors duration-300 ease-[var(--ease)] hover:text-ink"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className="opacity-0 transition-all duration-300 ease-[var(--ease)] group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="mt-[clamp(48px,7vw,88px)] -mb-[1.5vw]">
          <span
            className="block select-none text-center text-[clamp(56px,15.5vw,240px)] font-medium leading-[0.82] tracking-[-0.05em]"
            style={{
              background: "linear-gradient(180deg, var(--text) 0%, transparent 96%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              opacity: 0.12,
            }}
            aria-hidden
          >
            Umang Sharma
          </span>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-4 border-t border-line py-7 max-[560px]:flex-col max-[560px]:gap-2 max-[560px]:text-center">
          <span className="text-[13px] tracking-[-0.02em] text-muted">
            © {new Date().getFullYear()} Umang Sharma. All rights reserved.
          </span>
          <span className="text-[13px] tracking-[-0.02em] text-muted">
            Designed &amp; built with intention.
          </span>
        </div>
      </Container>
    </footer>
  );
}
