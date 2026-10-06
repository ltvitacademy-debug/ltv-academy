# Lesson 17 — Common Table Expressions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

WITH lets you name a subquery and query it like a real table afterward.
This lesson introduces Common Table Expressions, and solves a problem from
all the way back in Chapter 3.

## S2 · CODE CARD (basic WITH ... AS)

WITH overdue invoices, AS, a full query in parentheses. Then, below it,
select vendor ID, sum of amount remaining, from overdue invoices, group by
vendor ID. Overdue invoices isn't a real table in the database — it only
exists for this one query — but FROM overdue invoices reads exactly like
querying any other table.

## S3 · CODE CARD (solving Lesson 13's repeated CASE)

Remember Lesson 13, repeating that whole CASE expression in both SELECT
and GROUP BY? A CTE fixes it. Compute the CASE once, inside the CTE,
aliased aging bucket. The outer query just groups by that alias — no
repetition at all.

## S4 · CODE CARD (chaining multiple CTEs)

A single WITH can define more than one CTE. Supplier totals first, then
big suppliers, built directly on top of supplier totals — separate blocks,
separated by a comma, each one readable on its own.

## S5 · STEPS CARD (why CTEs read better)

A deeply nested subquery forces you to read from the inside out just to
understand it. A chain of CTEs reads top to bottom, each one named for
what it represents — much closer to how you'd actually explain the logic
out loud.

## S6 · OUTRO CARD

Name it, build on it, read it top to bottom. Next lesson: NOT EXISTS, for
finding records that are missing entirely.
