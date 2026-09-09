# Lesson 23 — LEFT JOIN · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

INNER JOIN only shows you products that have actually sold. But what if
you want every single product, including the ones that have never sold at
all? INNER JOIN can't do that — by definition, it drops anything
unmatched. That's exactly what LEFT JOIN fixes.

## S2 · CODE CARD (LEFT JOIN example)

Same query as last lesson, one word changed: LEFT JOIN instead of INNER
JOIN. Now every single row from Product comes back, whether it has a
matching order or not. For a product that's never sold, order quantity
comes back as NULL, exactly like a missing value — SQL Server simply has
nothing to put there.

## S3 · STEPS CARD (LEFT = FROM / RIGHT = after JOIN)

And here's something worth clarifying: left and right refer purely to
where you wrote things in the query, not to anything meaningful about the
data itself. The table named in FROM — written first — is the left table.
Whatever comes after the word JOIN is the right table. That's it. No
deeper meaning.

## S4 · CODE CARD (LEFT JOIN + IS NULL for unmatched rows)

Here's a genuinely useful trick this unlocks: finding rows that have NO
match at all. Do the LEFT JOIN, then filter WHERE the right table's join
column IS NULL. Since ProductID would normally always have a value, a
NULL here can only mean one thing — the LEFT JOIN found nothing to match
on the right. This query returns every product that has literally never
been ordered.

## S5 · OUTRO CARD

LEFT JOIN keeps everything from the left table, NULL-fills the gaps, and
combined with IS NULL, it becomes a tool for finding exactly what's
missing. Next lesson: RIGHT JOIN, the mirror image of everything we just
covered. See you there.
