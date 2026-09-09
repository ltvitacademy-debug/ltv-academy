# Lesson 26 — CROSS JOIN · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every join so far has needed an ON clause to decide what matches. This
lesson is about the one join that skips that entirely, on purpose: CROSS
JOIN.

## S2 · CODE CARD (CROSS JOIN example)

Notice there's no ON clause here at all. CROSS JOIN pairs every single row
from the first table with every single row from the second table. No
filtering, no matching — just every possible combination. This is called
the Cartesian product, and it's the most important concept in this entire
lesson.

## S3 · STEPS CARD (504 × 4 = 2,016 / NOT 504 + 4)

Here's the number that matters: row counts multiply, they don't add. A
CROSS JOIN between a table with 504 rows and one with 4 rows doesn't give
you 508 rows. It gives you two thousand and sixteen — 504 times 4. That
multiplication, not addition, is the single thing to remember.

## S4 · CODE CARD (accidental CROSS JOIN warning)

And that's exactly why CROSS JOIN shows up as a classic real-world bug —
usually by accident. Forget the ON clause on what was meant to be an
INNER JOIN, and SQL Server doesn't throw an error. It silently produces a
Cartesian product instead, and a query that should return a few hundred
rows suddenly returns millions.

## S5 · OUTRO CARD

CROSS JOIN is rare, but it does have a real use: generating every
combination of two small sets on purpose — every size paired with every
color, for a full product-variant matrix, even for combinations that
don't exist yet. Next lesson: SELF JOIN, for when a table needs to join to
itself. See you there.
