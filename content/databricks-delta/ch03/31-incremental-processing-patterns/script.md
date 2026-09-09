# Lesson 31 — Incremental Processing Patterns · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Every pipeline so far reprocesses everything — let's fix that.
Incremental processing patterns.

## S2 · CODE CARD (full vs incremental)

Full reprocessing reads the entire bronze table every run —
simple, always correct, but genuinely wasteful once bronze has
millions of rows and only a few thousand new ones each day.
Incremental reads only what's actually new — faster, but it
requires knowing what new even means.

## S3 · CODE CARD (watermark)

A watermark is a stored value — the latest timestamp already
processed — used to filter for only what's newer. This is exactly
why Lesson 26's ingested-at metadata column exists: without it,
there'd be no reliable way to tell old bronze rows from new ones
at all.

## S4 · CODE CARD (CDF)

Change data feed is Delta's own alternative — rather than a
timestamp column you maintain yourself, Delta tracks exactly which
rows were inserted, updated, or deleted between two versions,
straight from the transaction log.

## S5 · OUTRO CARD

Both patterns here still assume a scheduled batch job. Next
lesson: Autoloader, where files get processed continuously as they
arrive, instead.
