# Lesson 40 — Context Transition · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Row context and filter context are two genuinely different things, as
the last two lessons covered. Context transition is the actual bridge
between them, and the trigger for it is simple: CALCULATE, evaluated
while sitting inside row context.

## S2 · CODE: Referencing [Total Sales] inside a calculated column

Here's the automatic case, the one people miss most often: reference a
measure from inside a calculated column, and context transition happens
completely automatically, with no visible CALCULATE anywhere in the
formula at all. Every single measure is secretly wrapped in its own
implicit CALCULATE — that's genuinely why it quietly respects whatever
row it's currently sitting in, without you ever writing that explicitly.

## S3 · CODE: Customer Segment = IF(CALCULATE(...) < 2500, "Low", "High")

Now the explicit case, spelled out step by step. For one particular
customer row: row context starts everything off. CALCULATE then triggers
context transition — that single customer becomes an actual filter.
ALLEXCEPT keeps just that one filter and clears the rest. SUM totals
their sales under that filter. IF labels the row Low or High based on
the result. And every single customer repeats this exact same process
completely independently of every other customer.

## S4 · OUTRO CARD

Row context goes in, filter context comes out — that's genuinely the
entire trick behind formulas that otherwise look nearly impossible to
write. Next: iterator functions, which lean on this exact same mechanism
to calculate results row by row across an entire table.
