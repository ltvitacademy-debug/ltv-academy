# Lesson 15 — IN and BETWEEN · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson's OR chains work fine for two or three values. But what
happens when you need to check a column against ten different values?
T-SQL gives you two shortcuts for exactly this: IN and BETWEEN.

## S2 · CODE CARD (OR chain vs IN)

IN takes a comma-separated list and matches any row where the column
equals one of those values. Color equals red or color equals blue or
color equals black — that whole chain becomes color IN, open paren, red,
blue, black, close paren. Same result, much easier to read once the list
gets long.

## S3 · CODE CARD (NOT IN)

And of course it negates the same way everything else does — color NOT IN
that list matches every row except the ones in it.

## S4 · CODE CARD (BETWEEN 50 AND 100)

BETWEEN is the other shortcut, for ranges. List price BETWEEN 50 AND 100
is shorthand for list price greater-than-or-equal to 50, AND
less-than-or-equal to 100. And here's the detail worth remembering:
BETWEEN is inclusive on both ends. A product priced at exactly 50, or
exactly 100, both count as matches.

## S5 · CODE CARD (BETWEEN with dates)

And BETWEEN isn't limited to numbers — it works on dates too, using the
exact same inclusive logic. Order date between January first and December
31st of 2013 grabs every order placed anywhere in that year, boundaries
included.

## S6 · OUTRO CARD

IN for a list of exact matches, BETWEEN for an inclusive range — both are
just cleaner ways to write things you already know how to do with OR and
comparison operators. Next lesson: NULL, and why it breaks nearly every
rule you've learned so far. See you there.
