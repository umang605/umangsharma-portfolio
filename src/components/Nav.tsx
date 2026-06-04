"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Nav() {
  const { toggle } = useTheme();
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-[1000] flex h-[var(--nav-h)] items-center justify-between px-[var(--container-px)]">
      {/* logo */}
      <Link href="/" className="flex shrink-0 items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-full.svg"
          alt="Umang Sharma"
          className="h-7 w-auto transition-[filter] duration-[400ms] ease-[var(--ease)] [filter:var(--logo-inv)]"
        />
      </Link>

      {/* center pill — links shown inline (open) */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden rounded-[100px] border border-line bg-[var(--nav-bg)] shadow-[0_2px_20px_rgba(0,0,0,0.4)] [backdrop-filter:blur(10px)_saturate(1.4)] [-webkit-backdrop-filter:blur(10px)_saturate(1.4)] max-[860px]:static max-[860px]:translate-x-0 max-[860px]:translate-y-0">
        <div className="flex items-center">
          {NAV_LINKS.map((l) => {
            const isActive =
              pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-2.5 text-[14px] font-medium tracking-[-0.02em] transition-colors duration-200 ease-[var(--ease)] hover:bg-white/5 max-[480px]:px-3 max-[480px]:text-[13px] ${
                  isActive ? "text-ink" : "text-body hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <span className="flex items-center gap-1.5 whitespace-nowrap border-l border-line py-2.5 pl-4 pr-5 text-[13px] tracking-[-0.02em] text-body max-[1024px]:hidden">
          <span className="dot-green" /> Open to work
        </span>
      </div>

      {/* right: theme toggle + CTA */}
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle colour theme"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 ease-[var(--ease)] hover:-translate-y-0.5 hover:border-line-strong"
        >
          <span className="t-sun" aria-hidden>
            ☀
          </span>
          <span className="t-moon" aria-hidden>
            ☾
          </span>
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-[100px] border border-line bg-ink px-6 py-[11px] text-[14px] font-medium tracking-[-0.02em] text-canvas transition-all duration-300 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] max-[768px]:hidden"
        >
          + Get in touch
        </Link>
      </div>
    </nav>
  );
}
