"use client";

export type ViewMode = "grid" | "list";

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <rect x="1" y="1" width="6" height="6" rx="1.6" />
      <rect x="9" y="1" width="6" height="6" rx="1.6" />
      <rect x="1" y="9" width="6" height="6" rx="1.6" />
      <rect x="9" y="9" width="6" height="6" rx="1.6" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="2" cy="3" r="1.5" />
      <rect x="6" y="2" width="9" height="2" rx="1" />
      <circle cx="2" cy="8" r="1.5" />
      <rect x="6" y="7" width="9" height="2" rx="1" />
      <circle cx="2" cy="13" r="1.5" />
      <rect x="6" y="12" width="9" height="2" rx="1" />
    </svg>
  );
}

/**
 * Small grid/list segmented control. Controlled — the parent owns the state so
 * it can switch its own layout.
 */
export default function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div
      role="group"
      aria-label="View mode"
      className="inline-flex shrink-0 rounded-[100px] border border-line p-1"
    >
      {([
        ["grid", "Grid view", <GridIcon key="g" />],
        ["list", "List view", <ListIcon key="l" />],
      ] as [ViewMode, string, React.ReactNode][]).map(([m, label, icon]) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          aria-pressed={value === m}
          aria-label={label}
          title={label}
          className={`flex h-8 w-9 items-center justify-center rounded-[100px] transition-colors duration-200 ${
            value === m
              ? "bg-ink text-canvas"
              : "text-muted hover:text-ink"
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
