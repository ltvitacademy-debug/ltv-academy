# Lesson 27 — Creating Relationships · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Time to build the shape we've been describing. Here's exactly what breaks
without a relationship — and exactly how to fix it.

## S2 · IMAGE: candmrel_reportfiltersnorel.png (broken table, all 256)

Priority and Hours, from two different tables. Every row shows 256 — the
grand total, repeated. Power BI has no relationship telling it which
hours belong to which priority.

## S3 · IMAGE: candmrel_create_compproj.png (Create relationship dialog)

Fix it from the Modeling ribbon: Manage relationships, New. Pick a table
and column on one side, the matching table and column on the other — the
column names don't need to match, just the values inside them.

## S4 · IMAGE: candmrel_reportfilterswithrel.png (fixed table, real splits)

Same visual, same two tables — now split correctly: 31, 77, 148. That's
the entire payoff of a relationship: it gives Power BI a path to carry a
filter from one table into another.

## S5 · IMAGE: relationships-options-04.png (Edit relationship dialog)

And relationships aren't fixed once created. Open Edit relationship any
time — from Manage relationships, the Properties pane, or by
double-clicking the line in Model view — to change how it behaves. We
cover exactly what those options mean starting next lesson.

## S6 · OUTRO CARD (SVG: next lesson, LTV seal)

Next: cardinality — the setting that tells Power BI how many rows on each
side of a relationship can match.
