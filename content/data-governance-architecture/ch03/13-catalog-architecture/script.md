# Lesson 13 — Catalog Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson is about the catalog itself — architecturally, what it actually is, and what it's built from underneath the search bar.

## S2 · STEPS — What a catalog actually is

A data catalog is a searchable inventory of your assets — tables, reports, pipelines, glossary terms. It doesn't store the underlying data. It stores and serves metadata about that data. A catalog going down doesn't take your warehouse with it — bad metadata just makes the warehouse harder to find your way around.

## S3 · STEPS — Four components

Every catalog is built from the same four pieces. Connectors, registered against each source system. An index — search-optimized, often part full-text, part graph. A UI people actually search and browse in. And an API layer so other systems can query it without a human involved.

## S4 · STEPS — Build vs buy

Nearly every catalog in active use is adopted, not built from scratch — because the connector layer, not the UI, is the expensive part. Writing and maintaining reliable connectors against dozens of source types is real engineering effort a vendor has already done across many customers. The real decision is which platform, not whether to build one.

## S5 · STEPS — Connecting to Lesson 12

A catalog is just one consumer of the serving layer from last lesson — alongside lineage viewers and access-control engines that might read the same store. A catalog with a great UI sitting on an incomplete harvesting layer is still an incomplete catalog. The UI can't fix what wasn't captured underneath it.

## S6 · OUTRO

Next lesson: lineage architecture — how the relationships between assets actually get captured and stored.
