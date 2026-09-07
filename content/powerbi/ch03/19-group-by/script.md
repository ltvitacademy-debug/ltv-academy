# Lesson 19 — Group By & Aggregations · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Sometimes you don't want every row — you want the summary. This lesson is
about collapsing detail into totals, without losing the shape of your
data.

## S2 · IMAGE: initial-table.png (detailed row-per-transaction table)

Here's a table with one row per country, product, and sales channel
combination — twelve rows of real detail. Useful, but often more than you
actually need for a report.

## S3 · IMAGE: home-icon.png (Group By button)

Group By, on the Home ribbon — same three-locations pattern as everything
else this chapter.

## S4 · IMAGE: add-aggregated-column-window.png (Group By dialog, Advanced)

Switch to Advanced mode to group by more than one column at once. Here,
grouping by Country and Sales Channel together, then summing Units into a
new Total Units column. Add grouping adds more columns to group by. Add
aggregation adds more summary columns. Use either as many times as you
need.

## S5 · IMAGE: add-aggregated-column-final.png (summarized result)

Twelve detail rows collapse into six summary rows — one for every unique
Country and Sales Channel combination, with Units summed inside each one.

## S6 · IMAGE: row-operation-final-table.png (advanced summary with top performer)

Group By can go further, too. Beyond a simple total, you can keep All
Rows for each group and pull out something specific from inside it — like
naming each group's best-selling product alongside the total. That uses a
bit of Power Query M directly, past what this lesson covers, but it's
worth knowing Group By can reach this far.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Group by one column or several, sum or average or count — that's how you
turn detail into a summary without leaving Power Query. Next lesson:
merging queries — combining two entirely different tables into one. See
you there.
