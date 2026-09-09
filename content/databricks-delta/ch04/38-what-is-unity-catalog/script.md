# Lesson 38 — What Is Unity Catalog? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes (chapter opener).

---

## S1 · TITLE CARD

Chapter 4 starts here — what is Unity Catalog, actually?

## S2 · CODE CARD (the gap)

Last chapter's finale named a real gap: bronze, silver, and gold
tables all exist and work, but nothing controls who can actually
query or merge into any of them. Unity Catalog is Databricks'
answer — a governance layer, on top of everything already built,
without changing how any of that code works.

## S3 · SCREENSHOT CARD (object hierarchy)

This is the real object hierarchy, straight from Microsoft's own
documentation. A metastore sits at the top, scoped to one cloud
region. Catalogs organize data within it. Schemas sit inside
catalogs. And schemas hold the actual tables, views, volumes, and
functions.

## S4 · CODE CARD (one layer, many workspaces)

Before Unity Catalog, permissions were often set per workspace,
with no shared source of truth. One metastore attached to multiple
workspaces means a permission granted once applies everywhere. And
this course's bronze dot trips naming already anticipated this —
those are about to become real three-part names.

## S5 · OUTRO CARD

Governance layered on top, not a rewrite. Next lesson: the
three-level namespace, made real.
