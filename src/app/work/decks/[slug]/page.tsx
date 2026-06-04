import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SlideViewer from "@/components/work/SlideViewer";
import {
  DECK_TYPE_LABEL,
  deckSlides,
  deckSlugs,
  getDeck,
} from "@/data/decks";

export const dynamicParams = false;

export function generateStaticParams() {
  return deckSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDeck(slug);
  if (!d) return {};
  return { title: d.title, description: d.summary };
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDeck(slug);
  if (!d) notFound();

  const slides = deckSlides(d);

  return (
    <section className="relative z-[1] bg-canvas pb-[var(--section-gap)] pt-[calc(var(--nav-h)+72px)] max-[768px]:pt-[calc(var(--nav-h)+48px)]">
      <Container>
        <Link
          href="/work#decks"
          className="inline-flex items-center gap-1.5 text-[14px] tracking-[-0.02em] text-muted transition-colors duration-300 ease-[var(--ease)] hover:text-ink"
        >
          <span aria-hidden>←</span> Work
        </Link>

        <div className="mt-8 max-w-[760px]">
          <span className="block text-[13px] font-medium uppercase tracking-[0.12em] text-muted">
            {DECK_TYPE_LABEL[d.type]}
            {d.client ? ` · ${d.client}` : ""}
          </span>
          <h1 className="mt-4 text-[clamp(30px,4.4vw,56px)] font-medium leading-[110%] tracking-[-0.04em] text-ink">
            {d.title}
          </h1>
          <p className="mt-5 text-[18px] leading-[160%] tracking-[-0.02em] text-body">
            {d.summary}
          </p>
          {!d.ready ? (
            <p className="mt-4 inline-flex rounded-[100px] border border-dashed border-line px-4 py-1.5 text-[13px] tracking-[-0.02em] text-muted">
              Full {d.pages}-slide viewer is being prepared — showing the cover
              for now.
            </p>
          ) : null}
        </div>

        <div className="mt-10">
          <SlideViewer slides={slides} title={d.title} />
        </div>
      </Container>
    </section>
  );
}
