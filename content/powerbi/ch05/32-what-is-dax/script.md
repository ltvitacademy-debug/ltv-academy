# Lesson 32 — What Is DAX? · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words
at this voice's measured pace, with real safety margin on both ends.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Four chapters in, and you haven't written a single formula yet. That's
about to change, and here's exactly why it matters. Power BI can already
sum, count, and average a column the moment you drag it onto a visual —
no formula required. For a lot of ordinary reporting, that's genuinely
enough, and it's exactly why this course waited four full chapters
before introducing DAX at all.

## S2 · CODE: Total Sales = SUM(Sales[SalesAmount])

DAX, Data Analysis Expressions, is the formula language behind every
calculation Power BI can't produce automatically. Here's the simplest
formula possible: a measure that sums a column, which on its own is
nothing a dragged field couldn't already do by itself. The real payoff
comes once that measure has an actual name — Total Sales becomes
something you can reference inside other, more ambitious formulas later,
instead of retyping the same SUM everywhere you need it.

## S3 · IMAGE: qsdax_3_chart.png (Previous Quarter Sales report)

Automatic summarization runs out fast. Sales for the previous quarter,
to compare against this one. Year over year growth as a percentage. A
running total that only counts values above some threshold. None of
those are simply sum this column — each one needs a formula that reasons
about which rows to actually include, not just which column to add up.
This chart is exactly that: comparing this quarter against last, built
with two functions working together, CALCULATE and PREVIOUSQUARTER. You
haven't met either one properly yet, but CALCULATE gets two entire
lessons to itself later in this chapter, because it's genuinely the
single most important function in the whole language.

## S4 · OUTRO CARD (SVG: chapter intro, LTV seal)

Fifteen lessons ahead, building in order: what DAX actually is, how a
formula is put together, calculated columns versus measures, the core
mental model of row and filter context, iterator functions, CALCULATE's
modifiers, and finally variables and the habits that keep formulas
genuinely readable. Next: the anatomy of a DAX formula, piece by piece.
