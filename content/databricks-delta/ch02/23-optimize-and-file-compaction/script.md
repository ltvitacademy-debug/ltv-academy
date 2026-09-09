# Lesson 23 — OPTIMIZE and File Compaction · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Frequent writes leave a mess behind — let's clean it up. Optimize
and file compaction.

## S2 · CODE CARD (small files problem)

Foundations Lesson 42 covered why fewer files means less overhead.
But every frequent write — update, merge, streaming
micro-batches — creates its own small set of files. Over time, a
heavily-updated table accumulates thousands of tiny ones, and
that's genuinely slower to read.

## S3 · CODE CARD (OPTIMIZE)

Optimize rewrites those small files into fewer, larger ones — same
data, same schema. And it's itself just another Delta commit: new
compacted files get added, the old small ones get removed, the
exact same mechanism from Lesson 17, now used for cleanup.

## S4 · CODE CARD (ZORDER BY)

Z-order by goes further — it co-locates rows sharing similar
values within those bigger files. A later filter can then skip
whole files that provably don't match — Foundations Lesson 61's
partition pruning idea, but at the level of individual files'
contents.

## S5 · OUTRO CARD

Not something you run after every write — a scheduled, periodic
cleanup matched to how often the table actually changes. Next
lesson: vacuum, the other half of table maintenance.
