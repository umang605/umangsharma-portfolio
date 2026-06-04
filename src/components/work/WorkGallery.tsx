"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/Container";
import ProjectCard, { useCubeParallax } from "@/components/work/ProjectCard";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  GALLERY,
  type CategoryId,
} from "@/data/projects";
import { hasCaseStudy } from "@/data/caseStudies";

type Filter = CategoryId | "all";

export default function WorkGallery() {
  const [active, setActive] = useState<Filter>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  useCubeParallax(gridRef);

  // Counts per filter (computed once).
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: GALLERY.length };
    for (const p of GALLERY) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? GALLERY : GALLERY.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section className="relative z-[1] bg-canvas pb-[var(--section-gap)]">
      <Container>
        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filter work by category"
          className="mb-[44px] flex flex-wrap gap-2.5 max-[768px]:mb-8"
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            const count = counts[cat.id] ?? 0;
            if (count === 0 && cat.id !== "all") return null;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-[100px] px-5 py-2.5 text-[14px] font-medium tracking-[-0.02em] transition-all duration-[250ms] ease-[var(--ease)] hover:-translate-y-0.5 ${
                  isActive
                    ? "bg-ink text-canvas"
                    : "border border-line text-body hover:border-line-strong hover:text-ink"
                }`}
              >
                {cat.label}
                <span className={isActive ? "opacity-50" : "opacity-40"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated grid */}
        <motion.div
          ref={gridRef}
          layout
          className="grid grid-cols-2 gap-5 max-[768px]:grid-cols-1"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.32,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <ProjectCard
                  title={p.title}
                  tags={p.tags}
                  desc={p.desc}
                  bg={p.bg}
                  c1={p.c1}
                  c2={p.c2}
                  variant={p.variant}
                  image={p.image}
                  eyebrow={CATEGORY_LABEL[p.category]}
                  href={hasCaseStudy(p.slug) ? `/work/${p.slug}` : undefined}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
