# Lesson 26 — The Bronze Layer — Raw Ingestion · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's actually build the first layer — bronze, raw ingestion.

## S2 · CODE CARD (minimal transformation)

This looks almost like Foundations' CSV read, except deliberately
without infer schema — bronze wants the data exactly as it
arrived, strings and all. Any cleaning belongs to silver, not
here. The one new thing is save as table, writing straight into a
real, persistent, named Delta table.

## S3 · CODE CARD (metadata columns)

Two metadata columns — ingested at, and source file — record when
and from where each row arrived. Neither exists in the original
data; they're bronze's own bookkeeping, so anyone later can ask
exactly which ingestion run produced a given row.

## S4 · CODE CARD (keeping bad rows)

And bronze deliberately keeps rows that look obviously wrong. If
silver's cleaning logic turns out to have a bug discovered next
week, bronze still has the original, unmodified row to reprocess
from. Filter too early, and that row is gone for good.

## S5 · OUTRO CARD

Append, never overwrite — that's what makes bronze a genuine,
permanent record. Next lesson: the silver layer, cleaned and
conformed, for real.
