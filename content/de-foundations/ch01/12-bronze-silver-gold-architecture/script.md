# Lesson 12 — Bronze, Silver, Gold Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total. Chapter 1 finale.

---

## S1 · TITLE CARD

One more name for the exact same pattern, and then this chapter is
done. Bronze, Silver, Gold — the medallion architecture.

## S2 · STEPS CARD (mapping)

If you learned last lesson well, you already know this. Bronze is raw
— untouched source data. Silver is cleansed — validated, typed,
deduplicated. Gold is curated — business-ready, aggregated for
consumption. Same three jobs, same order, just Databricks's own
vocabulary for them.

## S3 · CODE CARD (the real difference)

But there IS one real difference, not just a naming swap. Medallion
architecture typically expects every layer to be a real Delta table,
not just files sitting in a folder. That matters because Delta's
transaction log lets Silver and Gold update incrementally — merging
new data in — instead of a full rebuild from Bronze every single time.
That's exactly how this track's second course, on Databricks and Delta
Lake, actually implements it.

## S4 · STEPS CARD (chapter recap)

And that's Chapter 1, complete. Storage accounts and ADLS Gen2.
Containers and directories. RBAC, ACLs, managed identities, SAS
tokens. File formats, partitioning, zones, and now two names for the
same design. Every remaining chapter in this course assumes this
foundation.

## S5 · OUTRO CARD

Twelve lessons of storage and design, done. Next chapter: Python — the
actual language every remaining lesson in this course writes in. See
you there.
