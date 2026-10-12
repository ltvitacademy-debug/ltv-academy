"use client";

import { useMemo, useState } from "react";
import type { CourseResourceWithFile } from "@/lib/resourceVault";
import { FILE_TYPE_LABELS, type ResourceFileType } from "@/lib/resourceVaultTypes";
import { DownloadIcon } from "@/components/app/DashboardIcons";

// Filters + search only earn their keep once there's enough to sort through;
// below that threshold they're just noise above a short list.
const FILTER_THRESHOLD = 6;
const SEARCH_THRESHOLD = 10;

export default function ResourceVaultList({
  resources,
}: {
  resources: CourseResourceWithFile[];
}) {
  const chapters = useMemo(
    () => Array.from(new Set(resources.map((r) => r.chapterTitle).filter(Boolean))) as string[],
    [resources]
  );
  const fileTypes = useMemo(
    () => Array.from(new Set(resources.map((r) => r.fileType))) as ResourceFileType[],
    [resources]
  );

  const [chapterFilter, setChapterFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<ResourceFileType | null>(null);
  const [query, setQuery] = useState("");

  const showFilters = resources.length > FILTER_THRESHOLD && (chapters.length > 1 || fileTypes.length > 1);
  const showSearch = resources.length > SEARCH_THRESHOLD;

  const filtered = resources.filter((r) => {
    if (chapterFilter && r.chapterTitle !== chapterFilter) return false;
    if (typeFilter && r.fileType !== typeFilter) return false;
    if (showSearch && query.trim()) {
      const q = query.trim().toLowerCase();
      if (!r.title.toLowerCase().includes(q) && !r.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div>
      {(showFilters || showSearch) && (
        <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-ink/10 pb-6">
          {showSearch && (
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources…"
              className="min-w-[200px] flex-1 rounded-[2px] border border-ink/20 bg-white/60 px-3 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-crimson focus:outline-none"
            />
          )}
          {showFilters && chapters.length > 1 && (
            <select
              value={chapterFilter ?? ""}
              onChange={(e) => setChapterFilter(e.target.value || null)}
              className="rounded-[2px] border border-ink/20 bg-white/60 px-3 py-2 text-sm text-ink focus:border-crimson focus:outline-none"
            >
              <option value="">All chapters</option>
              {chapters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
          {showFilters && fileTypes.length > 1 && (
            <select
              value={typeFilter ?? ""}
              onChange={(e) => setTypeFilter((e.target.value || null) as ResourceFileType | null)}
              className="rounded-[2px] border border-ink/20 bg-white/60 px-3 py-2 text-sm text-ink focus:border-crimson focus:outline-none"
            >
              <option value="">All file types</option>
              {fileTypes.map((t) => (
                <option key={t} value={t}>
                  {FILE_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-stone">No resources match these filters.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="flex flex-col border-2 border-ink/15 bg-white/40 p-5 shadow-[0_6px_18px_-10px_rgba(30,26,22,0.3)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="display text-lg leading-snug">{r.title}</h3>
                <span className="shrink-0 rounded-full border border-gold bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-crimson-deep">
                  {FILE_TYPE_LABELS[r.fileType]}
                </span>
              </div>
              {r.chapterTitle && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-stone">
                  {r.chapterTitle}
                </p>
              )}
              <p className="mt-2 flex-1 text-sm text-stone">{r.description}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-stone">{r.fileSizeLabel ?? ""}</span>
                <a
                  href={r.downloadHref}
                  download
                  className="inline-flex items-center gap-1.5 rounded-[2px] bg-crimson px-4 py-2 text-sm font-semibold text-parchment hover:bg-crimson-deep"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
