# Lesson 7 — Creating Data Quality Rules and SQL Checks · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every definition and classification so far becomes real once it's a
runnable rule. This lesson writes actual T-SQL checks against LTV
Global's Atlas schema.

## S2 · CODE CARD (Rule 1 — OrderTotal)

Rule one: OrderTotal must be positive. A zero or negative total
almost always means a failed discount calculation or an order that
was never fully voided.

## S3 · CODE CARD (Rule 2 — Email)

Rule two: email must be present and well-formed. A missing or
malformed email means LTV Global can't send a confirmation — and
makes a future access request, like the one from Lesson 1, harder to
fulfill correctly.

## S4 · CODE CARD (Rule 3 — SKU uniqueness)

Rule three: SKU must be unique. Lesson 5's glossary entry said SKUs
are never reused — a duplicate here means that rule already broke
upstream in Atlas.

## S5 · CODE CARD (Rule 4 — referential integrity)

Rule four: every order line must belong to a real order. An orphaned
line usually means a delete happened in the wrong order during a
batch job, and it quietly breaks any report joining the two tables.

## S6 · CODE CARD (combining checks, part 1)

Combined into one failures report: the first two branches cover
OrderTotal and Email, each reduced to the same RuleName and RecordKey
shape.

## S7 · CODE CARD (combining checks, part 2)

A third and fourth branch append SKU uniqueness and the referential
integrity check — one row per violation, labeled by which rule fired.
Run on a schedule, this is LTV Global's first real data quality
dashboard input.

## S8 · STEPS CARD (writing safe checks)

Four habits make these checks safe to run: keep them read-only, write
SARGable WHERE clauses, cast consistently across UNION ALL branches,
and schedule heavy checks outside business hours.

## S9 · OUTRO CARD

Next: Lesson 8 documents how this same data moves — lineage from Atlas
all the way into Summit.
