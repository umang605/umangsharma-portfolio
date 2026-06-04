import type { ReactNode } from "react";

/** Single source of truth for horizontal alignment (mirrors `.container`). */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1400px] px-[var(--container-px)] ${className}`}
    >
      {children}
    </div>
  );
}
