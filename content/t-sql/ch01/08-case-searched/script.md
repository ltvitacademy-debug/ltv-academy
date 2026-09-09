# Lesson 8 — CASE Expressions (Searched) · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

The simple CASE from last lesson can only check for exact matches. But
what if you need a real condition — a price range, a comparison, something
more than "does this equal that"? That's the searched CASE.

## S2 · CODE CARD (CASE WHEN ListPrice = 0 THEN ... END AS PriceTier)

Notice there's no expression right after the word CASE this time. Instead,
every WHEN carries its own full condition. List price equals zero, then
not for sale. List price less than 50, then budget. List price less than
500, then mid-range. Else, premium. We'll cover comparison operators like
less-than properly in Chapter 2, but for now just read them as plain
English.

## S3 · CODE CARD (wrong-order example)

Here's the part that trips people up: SQL Server checks these top to
bottom and stops at the very first match, so order isn't just style — it
changes your answer. Put "less than 500" before "less than 50", and a
twenty dollar product matches the broader condition first. It gets labeled
mid-range, and budget never even gets a chance to run for it. Always order
from most specific to least specific.

## S4 · CODE CARD (combining conditions with AND)

And each WHEN can combine multiple conditions with AND or OR, just like
any boolean logic. List price over a thousand AND color equals red —
that's a fully valid condition inside a single WHEN. We'll cover AND and OR
themselves in the next chapter.

## S5 · OUTRO CARD

Simple CASE for exact matches on one value; searched CASE for real
conditions, ranges, and multiple columns. Next lesson: DISTINCT, for
cutting duplicate rows out of your results entirely. See you there.
