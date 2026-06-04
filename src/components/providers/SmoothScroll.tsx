"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

/**
 * Intercepts in-page anchor clicks and routes them through Lenis,
 * preserving the original nav-height offset (--nav-h + 20px).
 */
function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      e.preventDefault();

      const id = href.slice(1);
      if (!id) {
        lenis.scrollTo(0);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const navH =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--nav-h",
            ),
          ) || 64;
        lenis.scrollTo(el, { offset: -(navH + 20) });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

/**
 * Lenis owns the scroll position, so Next's native scroll-to-top on client
 * navigation doesn't take effect. Reset to the top on every route change.
 */
function RouteScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis, pathname]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <AnchorScroll />
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}
