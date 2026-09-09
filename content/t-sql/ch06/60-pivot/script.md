# Lesson 60 — PIVOT · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Some data naturally comes in a tall shape — one row per combination. But
reports often want it wide instead — one row overall, with a separate
column per category. PIVOT performs exactly that rotation.

## S2 · CODE CARD (PIVOT example)

This query takes three colors, spread across many rows, and turns them
into three actual columns — red, blue, black — each showing the average
price for that color, one row per subcategory. Notice the inner query
first, narrowing things down to just subcategory, color, and price.
PIVOT needs a clean source like that; running it directly against a
whole table full of unrelated columns causes confusing results.

## S3 · STEPS CARD (AGGREGATE / FOR / IN)

PIVOT needs exactly three pieces. An aggregate function — average of list
price here — which fills the value inside each new column. A spreading
column, introduced with FOR — color, in this case — whose distinct
values become the new column headers. And an explicit list of those
values inside IN. That's the part worth remembering: PIVOT does not
discover distinct values on its own. You have to name every single one
you want turned into a column.

## S4 · OUTRO CARD

And those square brackets around red, blue, and black are just ordinary
T-SQL identifier quoting — the same thing you'd use around a reserved
word. Here, they let a plain value like Red get used as if it were an
actual column name. Reach for PIVOT whenever you need a genuine
cross-tabulation report — something that would otherwise mean writing
out a separate CASE expression by hand for every single column. Next
lesson closes out Chapter 6 with UNPIVOT, reversing exactly what we just
did. See you there.
