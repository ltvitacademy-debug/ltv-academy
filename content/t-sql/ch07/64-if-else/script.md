# Lesson 64 — IF/ELSE · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Back in Chapter 1, CASE gave you branching logic that produces a value,
right inside a SELECT. This lesson gives you something different: real
control flow that decides which CODE actually runs.

## S2 · CODE CARD (IF/ELSE example)

Declare product count, capture it from a query, then IF product count is
greater than 500, print large catalog, ELSE print small catalog. IF
checks a condition — a predicate, exactly like WHERE — and runs the
statement right after it only if that's true. ELSE runs its own statement
only if the IF was false. And PRINT, showing up here for the first time,
just outputs a message to the Messages tab in SSMS — handy for exactly
this kind of demonstration, and for debugging scripts later on. The
crucial difference from CASE: you cannot put IF inside a SELECT list. IF
decides between running one chunk of code or another — it doesn't
produce an inline value the way CASE does.

## S3 · CODE CARD (ELSE IF chain)

And you can chain multiple conditions with ELSE IF. Very large catalog,
large catalog, medium catalog, small catalog — each ELSE IF only gets
checked if every condition above it came back false. Same top-to-bottom
evaluation order you already learned with searched CASE back in
Chapter 1 — just applied to control flow instead of a value this time.

## S4 · OUTRO CARD

CASE gives you a value; IF-ELSE gives you a decision about what code
runs at all. That distinction becomes essential once you start writing
stored procedures later in this chapter. Next lesson: BEGIN and END
blocks, for running more than one statement per branch. See you there.
