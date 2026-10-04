# Lesson 23 — Metadata Quality

**Chapter 5 · Data Catalogs · Lesson 23 of 25**

## What you'll learn

- Why metadata itself needs quality dimensions, not just the data it describes
- Four metadata-specific quality dimensions, paralleling Data Quality Management's dimensions
- A worked example of a catalog entry failing metadata quality in two different ways
- A simple catalog-wide metadata quality check anyone can run

## Why metadata needs its own quality dimensions

Data Quality Management, Chapter 3, covered accuracy, completeness, consistency, validity, uniqueness, and timeliness — as dimensions of the *data*. Metadata is itself a kind of data (Lesson 1's whole premise), so it's reasonable to ask: does metadata have quality problems the same way the data it describes does? It does, and a catalog full of low-quality metadata is barely better than no catalog, for exactly the same reason data of unknown quality can't be trusted for decisions.

## Four metadata-specific quality dimensions

1. **Coverage** — what percentage of tables and columns have any metadata at all? (This parallels completeness from Data Quality Management, applied to metadata instead of data.)
2. **Freshness** — how old is the "last reviewed" date (Lesson 3's six core fields) on the average entry? Stale metadata is this course's version of Data Quality Management Lesson 16's timeliness problem.
3. **Correctness** — does the description actually match what the column contains, right now? This is directly the descriptive drift problem from Lesson 15.
4. **Consistency** — do descriptions for similar concepts use consistent terminology, per the standards from Lesson 13? A catalog where half the "active customer" references use the glossary's exact wording and half don't has a consistency problem, same as a data consistency problem.

## A worked example: two different failures on one entry

Consider a catalog entry for `dbo.Customer.IsActiveFlag`:

- **Coverage failure**: the entry exists but has no description field filled in at all — present, but empty, which is worse than not appearing in search results, because it looks findable but tells the searcher nothing.
- **Correctness failure**: the entry *has* a description — "True when customer purchased in the last 90 days" — but the business redefined "active" to 60 days eight months ago (the exact descriptive drift scenario from Lesson 15), and nobody updated the catalog entry. The metadata is present, but wrong.

Both failures leave a user with a false sense of confidence in different ways: the first fails obviously (empty field, easy to spot), the second fails silently (looks complete, is actually incorrect) — and the second is far more dangerous precisely because nothing visibly signals the problem.

## A simple catalog-wide check

The same structural-drift query pattern from Lesson 15 generalizes into a basic metadata quality scorecard: what percentage of columns have a non-empty description (coverage), what percentage have a "last reviewed" date within the last 12 months (freshness), and — harder to automate, requiring periodic sampling — what percentage of reviewed entries were confirmed still accurate (correctness). Even a rough version of this scorecard, reviewed quarterly, turns "we think our catalog is decent" into an actual number someone can track and improve.

## Key terms

| Term | Meaning |
|---|---|
| Metadata quality | The same dimensions (coverage, freshness, correctness, consistency) applied to metadata itself, not just the data it describes |
| Coverage | What percentage of objects have any metadata at all |

## Lab

For the dictionary or catalog entries you've built across this course's labs, estimate your own coverage (what fraction have real descriptions) and freshness (how old is the most recent "last reviewed" date you'd honestly assign).

## Check yourself

Can you name all four metadata quality dimensions from this lesson, and explain why a silent correctness failure is more dangerous than an obvious coverage failure?
