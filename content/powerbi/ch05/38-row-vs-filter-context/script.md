# Lesson 38 — Row Context vs. Filter Context · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Every single DAX formula runs inside a surrounding situation — what DAX
calls a context. Genuinely understand this one idea properly, and
everything else in this chapter gets dramatically easier to follow.

## S2 · CODE: = [Freight] + [Tax]

Row context is simply the current row. Inside a calculated column, this
formula automatically knows exactly which Freight and which Tax value to
use — specifically the ones sitting in this particular row, right now,
nothing else. No filter is needed at all here; DAX just evaluates the
formula once for every single row, using that row's own values directly.

## S3 · IMAGE: qsdax_4_context.png

Filter context is something genuinely different: the entire set of
filters currently narrowing down exactly what a formula can even see.
Here, CALCULATE adds an explicit filter directly into the formula
itself — channel equals store — and this measure now only sums sales
where that specific condition actually holds true, layered on top of
whatever else the report happens to be filtering by already.

## S4 · CODE: [Total Sales] no filter -> grand total | Year=2024 -> 2024 only

Same exact measure, with zero edits made to it, yet it produces two
completely different numbers — once with no filter applied at all, and
once with a Year slicer specifically set to 2024. The formula itself
never changed even slightly. Only the context surrounding it changed.
That difference, right there, is genuinely the whole idea this lesson is
built around.

## S5 · OUTRO CARD

A calculated column only ever sees row context, frozen permanently at
the moment of refresh. A measure lives entirely inside filter context
instead, recalculated constantly as that context shifts. Next: CALCULATE
itself, the specific function that actually lets you write filter
context directly into a formula on purpose.
