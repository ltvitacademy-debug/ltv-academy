# Lesson 47 — TRIM, LTRIM, RTRIM · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Real-world data is rarely as clean as a hand-written example. Stray
spaces creep in constantly — from copy-pasted spreadsheets, sloppy form
input, imports from other systems. This lesson: cleaning that up with
TRIM, LTRIM, and RTRIM.

## S2 · CODE CARD (LTRIM/RTRIM example)

LTRIM strips spaces from the left, the leading side, of a string. RTRIM
strips them from the right, the trailing side. Three spaces before Hello,
gone with LTRIM. Three spaces after Hello, gone with RTRIM. Neither one
touches anything in the middle of the string.

## S3 · CODE CARD (TRIM example)

TRIM handles both sides in a single call — it's shorthand for nesting
LTRIM inside RTRIM, which is how developers used to have to write it
before TRIM existed as its own function. Cleaner, same result.

## S4 · CODE CARD (trailing space breaks comparison)

And here's why this actually matters, not just for tidiness: a trailing
space breaks an exact match. Where first name equals quote John with a
trailing space quote — that looks identical to John on screen, but to an
exact comparison, they're different strings entirely. Untrimmed
whitespace is a genuinely common, invisible cause of queries silently
failing to find rows they should have found.

## S5 · OUTRO CARD

LTRIM for the left, RTRIM for the right, TRIM for both — cheap insurance
against a whole class of invisible bugs. Next lesson shifts from strings
to dates, starting with the date and time data types themselves. See you
there.
