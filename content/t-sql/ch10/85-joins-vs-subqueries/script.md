# Lesson 85 — Joins vs. Subqueries: Which Is Faster, and Why · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Remember Lesson 54's correlated subquery, finding products priced above
their own category's average? It has a JOIN-based equivalent that
returns the exact same rows. Let's compare them properly.

## S2 · CODE CARD (subquery vs JOIN rewrite)

Here's the subquery version, side by side with a rewrite that uses a
CTE to pre-compute each category's average, then joins that back
against the main table. Identical results, completely different
execution.

## S3 · STEPS CARD (N calculations vs M)

And here's exactly why the join version usually wins. The correlated
subquery re-evaluates its inner query once for every single row of the
outer query — that's roughly N calculations, where N is the row count.
The join version computes each category's average exactly once, in the
CTE — that's roughly M calculations, where M is the number of
categories. Once N is large and M is comparatively small, that's a
real, measurable difference.

## S4 · CODE CARD (when subqueries are the right choice)

But this isn't a blanket rule that joins always beat subqueries. A
scalar subquery, from Lesson 52, already runs just once — it never had
that per-row cost problem to begin with. And EXISTS and NOT EXISTS,
which we'll cover properly next lesson, often don't have a meaningfully
faster join equivalent at all. On top of that, SQL Server's query
optimizer sometimes rewrites a subquery internally anyway, before it
ever actually runs. The honest answer to "which is faster" is sometimes:
check the execution plan, which we'll get to in Lesson 90.

## S5 · OUTRO CARD

Correlated subqueries usually cost more than an equivalent join, but
that's not a universal law — context matters. Next lesson: EXISTS versus
IN versus JOIN, specifically for existence checks. See you there.
