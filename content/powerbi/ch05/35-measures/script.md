# Lesson 35 — Measures · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

The second way DAX adds new information — and the one you'll use far
more often: measures.

## S2 · IMAGE: data-pane-measures.png (Data pane, measures highlighted)

A measure calculates dynamically — its value depends entirely on
whatever's filtering it right now. Nothing is stored; every view
triggers a fresh calculation. Measures show up in the Data pane with a
calculator icon.

## S3 · CODE: Projected Sales = SUM('Reseller Sales'[Last Years Sales])*1.06

Here's a real one: last year's sales, projected forward with a 6%
increase. Sum the column, multiply by 1.06 — done.

## S4 · IMAGE: last-year-sales-projected-sales-chart.png (comparison chart)

Filter this by reseller, region, or product, and Projected Sales
recalculates correctly every single time — because it's a live formula,
not a value stored ahead of time.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

Calculated columns, stored once. Measures, calculated fresh every time.
Next: putting the two side by side and settling exactly when to reach
for each.
