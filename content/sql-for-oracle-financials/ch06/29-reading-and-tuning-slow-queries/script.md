# Lesson 29 — Reading and Tuning Slow Queries · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every query in this course has been about getting the right answer. This
lesson is about what happens when the right answer takes too long to come
back.

## S2 · CODE CARD (EXPLAIN PLAN and DBMS_XPLAN)

Explain plan for, your query, then select star from table, DBMS underscore
X-PLAN dot display. EXPLAIN PLAN doesn't actually run the query — it asks
Oracle to work out how it WOULD run it. DBMS_XPLAN.DISPLAY prints that
plan in readable form. On a table with millions of invoices, this is the
difference between milliseconds and a full table scan every time.

## S3 · CODE CARD (sargable vs. non-sargable predicates)

Here's the single habit that matters most: where TRUNC of invoice date
equals a specific date — that wraps the column in a function, and defeats
any index on it, because the index stores the original values, not the
TRUNC-ed ones. Write it as a range instead — invoice date greater than or
equal to, and less than the next day. Same rows, but now an index can
actually be used.

## S4 · STEPS CARD (a short checklist)

A short list worth knowing by habit: a function wrapped around an indexed
column, NOT IN on a large subquery instead of NOT EXISTS, joining columns
of mismatched data types, and simply forgetting a filter on a huge table
entirely.

## S5 · OUTRO CARD

You don't need to become a performance specialist — just recognize these
patterns and avoid them by habit. Last lesson of the course: turning the
queries you've built into reports Finance can actually reuse.
