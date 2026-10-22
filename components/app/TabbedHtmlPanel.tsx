"use client";

import { useState } from "react";

export default function TabbedHtmlPanel({
  tabs,
}: {
  tabs: { key: string; label: string; html: string }[];
}) {
  const [active, setActive] = useState(0);
  if (tabs.length === 0) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-[2px] border-2 px-4 py-2 text-sm font-semibold transition-colors ${
              active === i
                ? "border-crimson bg-crimson text-parchment"
                : "border-ink/15 bg-white/40 text-stone hover:border-crimson/40 hover:text-crimson-deep"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <article
        className="example-page mt-6"
        dangerouslySetInnerHTML={{ __html: tabs[active].html }}
      />
    </div>
  );
}
