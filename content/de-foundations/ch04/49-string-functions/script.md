# Lesson 49 — String Functions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Real data is rarely clean text — let's fix that, with string
functions.

## S2 · CODE CARD (trim/upper/lower)

Trim strips leading and trailing whitespace, upper and lower force
consistent casing. Wrapping one inside the other applies both at
once — and this genuinely matters, because inconsistent whitespace
and casing are exactly what breaks a join or a group by later if
left alone.

## S3 · CODE CARD (concat + lit)

Concat joins any number of columns and literal strings together.
Notice lit wrapping the comma — a plain Python string can't be
mixed directly into a column expression, so lit wraps it as a
literal value Spark can place right alongside real columns.

## S4 · CODE CARD (substring)

And substring pulls out part of a string by position — but the
start position is one-indexed, not zero-indexed like Python's own
string slicing. That trips up anyone coming straight from plain
Python, so watch for it deliberately.

## S5 · OUTRO CARD

Trim and case for clean text, concat with lit to join it, substring
one-indexed. Next lesson: date functions, for working with real
timestamps.
