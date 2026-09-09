# Lesson 18 — TOP and TOP PERCENT · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Sometimes you don't want every matching row — you just want the top
handful. Maybe the ten most expensive products, or the five newest
orders. That's what TOP is for.

## S2 · CODE CARD (SELECT TOP 10 ... ORDER BY ListPrice DESC;)

Select top 10, name, list price, from Production dot Product, order by
list price descending. TOP limits you to the first 10 rows AFTER the sort
is applied — in this case, the ten most expensive products in the whole
table.

## S3 · CODE CARD (TOP 10 without ORDER BY)

And that word AFTER is the whole point. Without ORDER BY, remember from
last lesson that row order isn't guaranteed at all — so top 10 rows, with
no defined order, is genuinely meaningless. You'd get SOME ten rows, but
which ten is anyone's guess. Always pair TOP with ORDER BY. Almost
without exception.

## S4 · CODE CARD (TOP 10 PERCENT)

TOP PERCENT works the same idea, but with a percentage instead of a fixed
count. Top 10 percent, ordered by list price descending. If the table has
504 products, 10 percent of that is 50.4 — and SQL Server rounds up, so
you'd actually get 51 rows back.

## S5 · CODE CARD (TOP 5 with WHERE)

And TOP plays perfectly well with everything else you've learned. Top 5,
where color equals red, order by list price descending — that's the five
most expensive red products specifically, combining filtering, sorting,
and limiting all in one query.

## S6 · OUTRO CARD

TOP caps your row count, PERCENT turns that into a percentage, and ORDER
BY is what makes either one actually mean something. Next lesson: TOP WITH
TIES, for when the row right at your cutoff is tied with the next one. See
you there.
