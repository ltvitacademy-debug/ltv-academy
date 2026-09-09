# Lesson 56 — Common Table Expressions (CTEs) · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

A subquery inside a subquery inside a subquery gets genuinely hard to
read — you end up mentally tracking which closing parenthesis belongs to
which level. Common Table Expressions fix that, by giving a subquery an
actual name.

## S2 · CODE CARD (basic CTE example)

WITH ExpensiveProducts AS, open paren, the subquery, close paren — that
defines the CTE. Then the query that follows references
ExpensiveProducts exactly like it's a real table. This does the identical
job as putting that same select inside a subquery in the FROM clause —
but it's dramatically easier to read, especially once the logic gets more
complex than a simple example.

## S3 · CODE CARD (CTE referenced twice)

And a CTE isn't limited to being referenced just once. Here it shows up
twice — once aliased as ca1 in the main FROM, and again inside a scalar
subquery, comparing each category's average against the average of ALL
those category averages. Define once, reference as many times as the
query needs.

## S4 · STEPS CARD (CTE one statement / VIEW saved)

One thing worth remembering clearly: a CTE is temporary. It only exists
for the single statement immediately following its WITH clause. It isn't
saved anywhere, it isn't reusable across separate queries, and it
disappears the moment that statement finishes running. Next lesson
introduces VIEW — a genuinely saved, reusable named query, the natural
next step after CTEs.

## S5 · OUTRO CARD

WITH names a subquery, that name behaves like a table for one statement,
and it can be referenced as many times as needed within that statement.
Next lesson: recursive CTEs, where a CTE references itself. See you
there.
