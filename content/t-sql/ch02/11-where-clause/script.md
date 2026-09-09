# Lesson 11 — The WHERE Clause · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 2. Every query so far in this course has returned every
single row in a table. That's about to change. This chapter is all about
filtering and sorting, and it starts with the most important filtering
tool in T-SQL: WHERE.

## S2 · CODE CARD (WHERE ListPrice > 100)

WHERE goes right after FROM. Name, list price, from Production dot
Product, where list price is greater than 100. SQL Server checks that
condition once for every row in the table, and only keeps the ones where
it comes out true. Everything else gets dropped before it ever reaches
your Results grid.

## S3 · CODE CARD (WHERE Color = 'Red')

Filtering on text works the same way, but text values need single quotes.
Where color equals quote Red quote. And a quick note: comparisons like
this are case-insensitive by default on most SQL Server setups, including
AdventureWorks2012, so Red, red, and RED would all match here.

## S4 · CODE CARD (WHERE DiscountedPrice < 50 — FAILS)

Now here's a mistake almost everyone makes at least once. You can't filter
on a column alias inside WHERE. This query looks perfectly reasonable —
discounted price, where discounted price is less than 50 — but it fails,
because SQL Server actually evaluates WHERE before it evaluates SELECT.
That alias simply doesn't exist yet at the point WHERE runs.

## S5 · CODE CARD (WHERE ListPrice * 0.9 < 50 — the fix)

The fix is simple: just repeat the full expression inside WHERE instead of
relying on the alias. List price times zero point nine, less than 50 —
same calculation, written out both times. We'll keep bumping into this
logical processing order throughout the course; it explains a lot of "why
doesn't this work" moments.

## S6 · OUTRO CARD

WHERE filters rows, sits right after FROM, and can't see SELECT's aliases.
Next lesson, we go through every comparison operator you can use inside
it — equals, greater than, less than, and more. See you there.
