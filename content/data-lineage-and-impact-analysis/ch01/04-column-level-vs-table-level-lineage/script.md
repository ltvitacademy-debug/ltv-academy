# Lesson 4 — Column-Level vs. Table-Level Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 3 split lineage by audience. This lesson splits technical lineage
further, by granularity — table-level versus column-level — and why
picking the wrong one can mislead you.

## S2 · STEPS CARD (two levels)

Table-level lineage records which tables feed which — coarse, fast to
produce, good for architecture overviews. Column-level lineage records
which specific columns feed which specific columns — far more precise,
and the actual level of detail needed to answer "if I change this
column, what breaks?"

## S3 · STEPS CARD (why table-level can mislead)

A table with 15 columns feeding another table with 15 columns shows one
arrow at the table level — implying every column might matter to every
column, which is rarely true. Column-level lineage shows directly
whether one specific column is even referenced downstream at all.

## S4 · STEPS CARD (the real tradeoff)

If column-level is more useful, why not use it everywhere? Cost. It
requires parsing actual transformation logic, produces a huge volume of
column-to-column edges, and goes stale fast if not re-derived when logic
changes. Most teams use table-level broadly and reserve column-level for
the columns that matter most.

## S5 · OUTRO CARD

Next up: the final lesson of this chapter — lineage standards and
approaches, including how lineage actually gets captured: manually,
through code parsing, or at runtime.
