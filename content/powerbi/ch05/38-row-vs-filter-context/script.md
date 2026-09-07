# Lesson 38 — Row Context vs. Filter Context · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every DAX formula runs inside a surrounding situation — a context.
Understand this one idea, and the rest of the chapter gets far easier.

## S2 · CODE: = [Freight] + [Tax]

Row context is the current row. In a calculated column, this formula
automatically knows which Freight and which Tax to use — the ones in
this row, right now. No filter needed; DAX evaluates it once per row.

## S3 · IMAGE: qsdax_4_context.png (annotated Store Sales CALCULATE formula)

Filter context is different: the set of filters currently narrowing down
what a formula sees. Here, CALCULATE adds an explicit filter — Channel
equals Store — directly inside the formula. This measure only sums sales
where that condition holds.

## S4 · CODE: [Total Sales] → grand total, then → 2024 only

Same measure, no edits, two different numbers — once with no filter,
once with a Year slicer set to 2024. The formula never changed. The
context around it did. That's the whole idea.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

A calculated column only ever sees row context, frozen at refresh time.
A measure lives inside filter context, recalculated constantly. Next:
CALCULATE, the function that lets you write filter context directly into
a formula.
