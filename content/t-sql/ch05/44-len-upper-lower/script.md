# Lesson 44 — LEN, UPPER, LOWER · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Time for actual string functions. We'll start with three of the simplest
and most common: LEN for length, UPPER and LOWER for changing case.

## S2 · CODE CARD (LEN example)

LEN of first name, as name length. Straightforward — it counts the
characters in a string. Useful for spotting unusually short or long
values, or just validating your data.

## S3 · CODE CARD (LEN trailing-space gotcha)

But here's a genuine gotcha: LEN of the string Hello with three trailing
spaces returns 5, not 8. LEN ignores trailing spaces when counting —
though leading spaces still count normally. This rarely matters with
VARCHAR data, which doesn't naturally pick up trailing spaces. But
remember CHAR from Lesson 41 — it pads values with trailing spaces to hit
its declared length, and LEN simply won't count that padding. A real trap
if you're not expecting it.

## S4 · CODE CARD (UPPER/LOWER example)

UPPER converts every letter to uppercase; LOWER converts every letter to
lowercase. And just like every function you've used so far, neither one
touches the actual stored data — they only affect what shows up in your
query's output.

## S5 · OUTRO CARD

One practical use: wrapping both sides of a comparison in UPPER
guarantees a case-insensitive match, regardless of what the server's
default settings happen to be. LEN counts characters, ignoring trailing
spaces; UPPER and LOWER reshape case in your output only. Next lesson:
SUBSTRING and CHARINDEX, for pulling specific pieces out of a string. See
you there.
