"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal shared by every section: opacity 0 → 1, y 28 → 0, fires once.
 *
 * Uses a self-managed IntersectionObserver (instead of Framer's `whileInView`)
 * plus a hard visibility fallback timer, so content can NEVER get stuck
 * invisible — even when Lenis' scroll transform confuses the observer, on
 * grid/list view-toggle remounts, or if the observer never fires at all.
 * Respects prefers-reduced-motion (renders in the final state, no animation).
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;

    const reveal = () => setShown(true);

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            reveal();
            io?.disconnect();
          }
        },
        { rootMargin: "0px 0px -40px 0px" },
      );
      io.observe(el);
    } else {
      reveal();
    }

    // Safety net: guarantee visibility regardless of the observer. Lenis'
    // scroll transform and remount timing can otherwise suppress the trigger.
    const t = window.setTimeout(reveal, 1400);

    return () => {
      io?.disconnect();
      window.clearTimeout(t);
    };
  }, [shown]);

  const visible = shown || !!reduce;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.7,
        ease: [0, 0, 0.2, 1],
        delay: shown && !reduce ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
