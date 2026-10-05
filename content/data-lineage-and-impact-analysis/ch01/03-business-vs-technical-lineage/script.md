# Lesson 3 — Business vs. Technical Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

The same data journey can be shown at two very different altitudes.
Conflating them is a common mistake — this lesson covers business
lineage versus technical lineage, and who each one is actually for.

## S2 · STEPS CARD (two views)

Business lineage describes the journey in plain domain terms — "Customer
Lifetime Value comes from the CRM and the billing system." No tables, no
code. Technical lineage describes it at the level engineers need —
specific tables, columns, and transformation logic, precise enough to
actually trace a bug.

## S3 · STEPS CARD (why you need both)

Technical-only leaves stakeholders unable to answer basic trust
questions themselves. Business-only leaves engineers without enough
detail for real impact analysis. Mature practices maintain both, usually
generating the business view as a simplified roll-up of the technical
one — not two unrelated sets of documentation.

## S4 · STEPS CARD (recognizing which view)

A quick test: if a diagram's boxes say "CRM" and "Billing System,"
that's business lineage. If they say specific table and column names,
that's technical lineage. Neither is better — they're built for
different readers, from the same underlying truth.

## S5 · OUTRO CARD

Next up: column-level versus table-level lineage — a second axis of
granularity that applies within technical lineage itself.
