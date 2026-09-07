# Lesson 40 — Context Transition · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Row context and filter context are two different things. Context
transition is the bridge between them — and the trigger is simple:
CALCULATE, evaluated inside row context.

## S2 · CODE: measure reference inside a calculated column (implicit CALCULATE)

The automatic case: reference a measure from inside a calculated column,
and context transition happens with no CALCULATE visible at all. Every
measure is secretly wrapped in its own CALCULATE — that's why it quietly
respects the current row.

## S3 · CODE: Customer Segment = IF(CALCULATE(SUM(Sales[Sales Amount]), ALLEXCEPT(Customer, Customer[CustomerKey])) < 2500, "Low", "High")

The explicit case. For one customer row: row context starts things off.
CALCULATE triggers context transition — that one customer becomes a
filter. ALLEXCEPT keeps just that filter. SUM totals their sales. IF
labels the row. Every customer repeats this independently.

## S4 · OUTRO CARD (SVG: next lesson, LTV seal)

Row context in, filter context out — that's the whole trick behind
formulas that otherwise look impossible. Next: iterator functions, which
lean on this exact mechanism to calculate row by row.
