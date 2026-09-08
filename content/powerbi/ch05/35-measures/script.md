# Lesson 35 — Measures · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Here's the second way DAX adds new information to your model, and the
one you'll genuinely reach for far more often than a calculated column:
measures.

## S2 · IMAGE: data-pane-measures.png

A measure calculates dynamically — its actual value depends entirely on
whatever happens to be filtering it at the exact moment someone views
the report. Nothing about it gets stored ahead of time; every single
view triggers a completely fresh calculation, recomputed on demand
rather than sitting in the model waiting to be read. You'll spot
measures in the Data pane by their distinctive calculator icon, sitting
apart from the regular columns underneath each table, which is a small
visual cue worth learning to recognize at a glance.

## S3 · CODE: Projected Sales = SUM('Reseller Sales'[Last Years Sales])*1.06

Here's a genuinely real one: taking last year's total sales and
projecting it forward with a six percent increase. Sum the column,
multiply the result by one point oh six, and that's the entire formula
— nothing more complicated hiding underneath it.

## S4 · IMAGE: last-year-sales-projected-sales-chart.png

Filter this measure by reseller, by region, or by product, and Projected
Sales recalculates correctly every single time, automatically, with no
extra work from you. That's the entire point of a measure — it's a live
formula reacting to context, never a value that got calculated once and
then just sits there unchanged.

## S5 · OUTRO CARD

So here's where things stand: calculated columns get stored once, at the
moment you create them, and only change again when the underlying data
refreshes. Measures get calculated completely fresh, every single time
someone actually looks at the report, reacting instantly to whatever
they're filtering by. Next lesson puts the two directly side by side and
settles, once and for all, exactly when you should reach for each one.
