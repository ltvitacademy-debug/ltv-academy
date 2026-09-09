# Lesson 47 — when() and Conditional Logic · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's build real if-else logic — when, and conditional logic.

## S2 · CODE CARD (basic if/else)

When condition, value is the if — it returns that value wherever
the condition is true. Otherwise is the else, covering everything
not matched. Together they build one single expression, exactly
what withColumn from last lesson needs.

## S3 · CODE CARD (chaining)

You can chain multiple when calls, like elif — each one checked top
to bottom, first match wins. Order genuinely matters here: check the
broad condition too early, and it'll wrongly catch rows a later,
narrower condition was meant to catch.

## S4 · CODE CARD (no otherwise)

And here's the trap: if a row matches no when condition, and
there's no otherwise, the result is null for that row. Not an
error, not a guess — just null. That's a real, easy-to-miss source
of unexpected nulls in production pipelines, which Lesson 51 picks
up directly.

## S5 · OUTRO CARD

When for the if, otherwise for the else, order matters when
chaining, and always account for the unmatched case. Next lesson:
data type conversion, casting columns between types.
