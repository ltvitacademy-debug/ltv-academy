# Lesson 19 — Schema Enforcement · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's see a real guardrail in action — schema enforcement.

## S2 · CODE CARD (vs nullable=False)

Recall Foundations Lesson 43 — nullable equals false was just a
hint, and Spark generally still loaded a bad null anyway. Delta
actually enforces it: a schema mismatch fails the write outright. A
real guardrail, not a hint.

## S3 · CODE CARD (what gets caught)

Try appending data with an extra column, a missing one, or an
incompatible type, and Delta rejects it by default with a clear
analysis exception — naming exactly which columns don't match, and
showing both schemas side by side.

## S4 · CODE CARD (consistency, concrete)

This is Lesson 18's consistency guarantee, made completely
visible: nobody can silently corrupt a table's shape with one bad
write. Compare that to a malformed CSV row, which could become a
silent null with no warning at all — this is Delta's answer to
exactly that risk.

## S5 · OUTRO CARD

A real rejection, not a silent hint. Next lesson: schema evolution,
the deliberate escape hatch when the shape genuinely needs to
change.
