# Lesson 84 — The Cartesian Product: What Happens When Joins Go Wrong · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson 26 introduced the Cartesian product through CROSS JOIN, on
purpose. This lesson goes deeper into how one sneaks into real queries
that were never meant to have one at all.

## S2 · CODE CARD (missing ON clause)

The classic version isn't from typing CROSS JOIN deliberately — it's
from a missing join condition on what was meant to be a normal join.
This old-style comma join has no ON clause at all, so SQL Server has no
basis for matching anything. It falls back to pairing every single
product with every single order detail line, exactly like an explicit
CROSS JOIN. The same bug shows up with modern JOIN syntax too, if the ON
clause simply gets left out.

## S3 · CODE CARD (fake ON clause)

Here's a subtler, more dangerous version. This one HAS an ON clause, so
it looks perfectly reasonable at a glance. But "product name is not
null" is true for almost every single row — it doesn't actually relate
the two tables to each other at all. The result is a Cartesian product
wearing a disguise.

## S4 · STEPS CARD (500 × 100,000 = 50 million)

Let's put real numbers on this. Product has roughly 500 rows.
SalesOrderDetail has over a hundred thousand. A Cartesian product
between them doesn't return five hundred plus a hundred thousand rows.
It returns 500 TIMES 100,000 — fifty million rows. On genuinely large
tables, that can exhaust server memory or run for hours before anyone
even notices something went wrong.

## S5 · OUTRO CARD

The practical habit: after writing any join, sanity-check the row count
that comes back. A join between a 500-row table and a 100,000-row table
that suddenly returns millions of rows is an immediate signal to go
re-check your ON clause — not to assume the data is simply that big.
Next lesson: joins versus subqueries, which is actually faster, and
why. See you there.
