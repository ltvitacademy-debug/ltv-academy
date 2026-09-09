# Lesson 34 — Lazy Evaluation · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Here's the single biggest surprise for anyone coming from Pandas into
Spark. Spark doesn't run anything until you explicitly ask it to.

## S2 · CODE CARD (Pandas eager)

Pandas is eager. Every line runs the instant Python reaches it. By
the time you're on line three, lines one and two have already fully
executed.

## S3 · CODE CARD (Spark lazy)

Spark does something completely different. Read, filter, group by —
none of that actually touches real data. Every line just adds a step
to a plan. Nothing runs until dot show, an action, actually asks for
a result — and THAT line triggers everything above it, all at once.

## S4 · CODE CARD (the surprise + why it matters)

This trips up almost everyone the first time. Call filter on its
own, and nothing happens — no output, no error. It just built a plan
nobody asked to run yet. But here's why this is actually valuable:
because Spark sees your WHOLE sequence of operations before running
any of it, it can optimize the entire thing — skip steps, combine
passes over the data. Pandas simply can't do this, because each
line's already run by the time it could.

## S5 · OUTRO CARD

Nothing runs until you ask — and that delay is exactly what makes
Spark's optimization possible. Next lesson names this distinction
properly: transformations versus actions. See you there.
