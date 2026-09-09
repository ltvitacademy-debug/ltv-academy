# Lesson 83 — What Is Query Performance Tuning? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 10. Every query you've written so far in this course
has been judged on one thing: correctness. Does it return the right
rows? Performance tuning asks a completely different question — given
that a query is already correct, how do you make it run faster, or use
fewer resources, while returning the exact same result?

## S2 · STEPS CARD (CORRECTNESS / PERFORMANCE)

Here's why that distinction matters in the real world. A query that
takes 50 milliseconds against a thousand-row test table can take actual
minutes against a fifty-million-row production table, if it's written
in a way that simply doesn't scale. Performance tuning is what separates
code that merely works from code that works well at real scale.

## S3 · STEPS CARD (the four comparisons)

And this chapter looks different from the ones before it. Instead of
mostly new syntax, it's largely about comparisons — two or more ways to
write the exact same correct query, and understanding why one genuinely
runs faster than the other. Joins versus subqueries. EXISTS versus IN
versus JOIN. Clustered versus nonclustered indexes. Temp tables versus
table variables versus CTEs. Each pair can produce identical results —
the difference is entirely in how much work SQL Server has to do to get
there.

## S4 · OUTRO CARD

Ahead in this chapter: a deep look at the Cartesian product problem,
comparing joins against subqueries and existence checks, writing
predicates that can actually use an index, understanding indexes
themselves properly, reading an execution plan, measuring a query's real
cost, and finishing with a checklist of common anti-patterns. Next
lesson: the Cartesian product, in real depth. See you there.
