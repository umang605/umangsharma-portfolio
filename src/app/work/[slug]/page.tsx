import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/work/CaseStudyView";
import { caseStudySlugs, getCaseStudy } from "@/data/caseStudies";

// Only the slugs with a published case study are valid; others 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};

  const title = `${cs.title} ${cs.titleAccent ?? ""}`.trim();
  return {
    title,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return <CaseStudyView cs={cs} />;
}
