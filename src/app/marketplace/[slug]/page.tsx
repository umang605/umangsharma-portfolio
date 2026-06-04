import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import LivePreview from "@/components/marketplace/LivePreview";
import {
  MARKET_CATEGORY_LABEL,
  getMarketItem,
  marketSlugs,
} from "@/data/marketplace";

export const dynamicParams = false;

export function generateStaticParams() {
  return marketSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getMarketItem(slug);
  if (!m) return {};
  return { title: m.title, description: m.tagline };
}

export default async function MarketItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getMarketItem(slug);
  if (!m) notFound();

  return (
    <section className="relative z-[1] bg-canvas pb-[var(--section-gap)] pt-[calc(var(--nav-h)+72px)] max-[768px]:pt-[calc(var(--nav-h)+48px)]">
      <Container>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-[14px] tracking-[-0.02em] text-muted transition-colors duration-300 ease-[var(--ease)] hover:text-ink"
        >
          <span aria-hidden>←</span> Marketplace
        </Link>

        {/* header */}
        <div className="mt-8 flex items-end justify-between gap-8 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-5">
          <div className="max-w-[680px]">
            <span className="block text-[13px] font-medium uppercase tracking-[0.12em] text-muted">
              {MARKET_CATEGORY_LABEL[m.category]}
            </span>
            <h1 className="mt-4 text-[clamp(28px,4vw,52px)] font-medium leading-[112%] tracking-[-0.04em] text-ink">
              {m.title}
            </h1>
            <p className="mt-5 text-[18px] leading-[160%] tracking-[-0.02em] text-body">
              {m.tagline}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {m.liveUrl ? (
              <a
                href={m.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[100px] border border-line px-6 py-3 text-[14px] font-medium tracking-[-0.02em] text-ink transition-all duration-300 ease-[var(--ease)] hover:-translate-y-0.5 hover:border-line-strong"
              >
                Open live <span aria-hidden>↗</span>
              </a>
            ) : null}
            <a
              href={m.buyUrl ?? "/contact"}
              target={m.buyUrl ? "_blank" : undefined}
              rel={m.buyUrl ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-[100px] bg-ink px-6 py-3 text-[14px] font-medium tracking-[-0.02em] text-canvas transition-all duration-300 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              {m.price
                ? `Buy · ${m.price}`
                : `Get this ${m.category === "templates" ? "template" : "item"}`}
            </a>
          </div>
        </div>

        {/* live preview */}
        <div className="mt-10">
          <LivePreview url={m.liveUrl} title={m.title} />
        </div>

        {/* details */}
        <div className="mt-14 grid grid-cols-[1fr_minmax(0,340px)] gap-x-16 gap-y-10 max-[900px]:grid-cols-1">
          <div className="flex flex-col gap-5">
            {m.description.map((p, i) => (
              <p
                key={i}
                className="text-[18px] leading-[165%] tracking-[-0.02em] text-body max-w-[620px]"
              >
                {p}
              </p>
            ))}
          </div>

          <div>
            {m.features && m.features.length ? (
              <>
                <h2 className="text-[13px] font-medium uppercase tracking-[0.1em] text-muted">
                  What's inside
                </h2>
                <ul className="mt-4 flex flex-col">
                  {m.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-3 border-t border-line py-3 text-[15px] leading-[150%] tracking-[-0.02em] text-body"
                    >
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {m.tags && m.tags.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-[100px] border border-line px-3 py-1.5 text-[12px] tracking-[-0.01em] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
