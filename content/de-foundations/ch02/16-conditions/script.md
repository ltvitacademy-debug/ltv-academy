# Lesson 16 — Conditions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Almost every real data engineering task involves making a decision
about a value. Conditions are how Python actually makes that
decision.

## S2 · CODE CARD (if/elif/else)

If, elif, else — Python checks each condition top to bottom, and runs
the very first one that's true. Everything after that gets skipped
entirely. Elif and else are both optional.

## S3 · CODE CARD (and/or/not)

You can combine conditions too. AND requires both sides to be true.
OR requires at least one. NOT flips a condition's truth value
completely. And watch out for a classic typo — a single equals sign
assigns a value, a double equals sign compares two values. Mixing
those up is one of the most common early mistakes.

## S4 · CODE CARD (validation pattern)

Here's a real validation pattern — one condition per business rule,
checked in sequence. Negative fare, invalid. Zero or negative
passengers, invalid. This exact shape is what Lesson 27's mini ETL
and Chapter 4's PySpark cleaning lessons build on directly.

## S5 · OUTRO CARD

Branch, combine, invert — three tools, endless real validation logic.
Next lesson: loops, for doing something to every row, automatically.
See you there.
