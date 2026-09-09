# Lesson 24 — RIGHT JOIN · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

You can probably guess where this lesson is going. If LEFT JOIN keeps
everything from the left table, what do you think RIGHT JOIN does?

## S2 · CODE CARD (RIGHT JOIN example)

Exactly what it sounds like: it keeps every row from the table on the
RIGHT side of the JOIN keyword — here, Product — whether or not it
matches anything on the left. It's the precise mirror image of what we
just covered.

## S3 · CODE CARD (equivalent LEFT JOIN rewrite)

And here's the thing worth noticing: this query returns the exact same
result as last lesson's LEFT JOIN. That's not a coincidence — any RIGHT
JOIN can be rewritten as an equivalent LEFT JOIN, just by swapping which
table gets named first. Same logic, same result, different order on the
page.

## S4 · OUTRO CARD

So why bother learning RIGHT JOIN at all, if it's always rewritable?
Because you'll see it in other people's code, even though this course
sticks with LEFT JOIN exclusively. Not because RIGHT JOIN is wrong — it's
purely for consistency. Once a query joins three, four, five tables, it's
much easier to keep track of "the table that must always appear" when
that table is consistently named first. Recognize RIGHT JOIN, but write
LEFT JOIN. Next lesson: FULL OUTER JOIN, for keeping unmatched rows from
BOTH sides at once. See you there.
