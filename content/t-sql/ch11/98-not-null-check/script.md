# Lesson 98 — NOT NULL and CHECK Constraints · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

We've covered constraints that guarantee identity and uniqueness. Now the
two simplest, and in some ways most important: NOT NULL and CHECK.

## S2 · CODE CARD (NOT NULL)

NOT NULL requires a value — full stop. Every column is nullable by default
in T-SQL unless you explicitly say otherwise. It's the simplest constraint
in the whole language: no value, no row.

## S3 · CODE CARD (CHECK range)

A CHECK constraint goes further. It doesn't just ask is there a value — it
validates that the value satisfies any boolean expression you write. Here's
a real one from AdventureWorks's Production dot Product table: list price
can never be negative.

## S4 · CODE CARD (CHECK list)

CHECK constraints can enforce a list of valid values too — also real, from
that same table: a product's class code has to be L, M, or H, or unknown.
Ranges, lists, pattern matching — any logic on that row, checked
automatically on every insert and update.

## S5 · CODE CARD (violation)

Here's why this matters more than it might seem. Any application form
could validate that a price isn't negative — but if even one code path
forgets, bad data gets in, silently, forever. A CHECK constraint makes
that physically impossible to bypass, no matter what wrote the insert.

## S6 · OUTRO CARD

Require a value, then validate it — two of your simplest, sturdiest tools.
Next lesson: the first of three relationship shapes between tables,
starting with one-to-one. See you there.
