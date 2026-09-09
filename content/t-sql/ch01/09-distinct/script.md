# Lesson 9 — DISTINCT · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Select normally hands you back every matching row, duplicates and all.
Sometimes that's exactly what you don't want. This lesson: DISTINCT, for
cutting duplicate rows out entirely.

## S2 · CODE CARD (SELECT Color FROM Production.Product;)

Select color from Production dot Product. Run that, and you'll see the
same color over and over — once for every single product that has it.
Lots of repetition.

## S3 · CODE CARD (SELECT DISTINCT Color FROM Production.Product;)

Add the word DISTINCT right after SELECT, and now every color shows up
exactly once, no matter how many products share it. Same query, one word
added, completely different shape of result.

## S4 · CODE CARD (SELECT DISTINCT Color, Size FROM Production.Product;)

Here's the part people get wrong: when you select DISTINCT on two columns,
it doesn't give you every distinct color and every distinct size
separately. It gives you every distinct color-and-size PAIRING that
actually exists. Red Large and Red Small both share the color red, but
they're two different rows here.

## S5 · CODE CARD (SELECT DISTINCT ProductID, Color FROM Production.Product;)

And that leads straight into a classic mistake. Add a column that's unique
per row — like a product ID, a primary key — and DISTINCT stops doing
anything useful, because now every single row is already unique on its
own. You'll get every row back, no reduction at all. If you want genuinely
unique colors, don't select a column that varies row by row alongside it.

## S6 · OUTRO CARD

DISTINCT removes duplicate rows, but it looks at the whole row, not one
column in isolation. Later, in Chapter 4, you'll meet GROUP BY, which looks
similar but exists for a different job: aggregating within groups. We'll
draw that line clearly when we get there. For now, that closes out
DISTINCT — next lesson wraps up Chapter 1 with comments and formatting
habits. See you there.
