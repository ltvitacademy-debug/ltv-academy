# Lesson 61 — UNPIVOT · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

PIVOT turns rows into columns. This lesson closes out Chapter 6 with its
exact opposite: UNPIVOT, which turns columns back into rows.

## S2 · CODE CARD (UNPIVOT example)

Imagine a table already shaped wide, spreadsheet-style — one column per
quarter, Q1 sales through Q4 sales. UNPIVOT, sales amount, for quarter,
in Q1 sales, Q2 sales, Q3 sales, Q4 sales. This takes those four separate
columns and turns them into just two instead — quarter, holding which
column each value came from, and sales amount, holding the actual
value — with one row per original column, per sales ID.

## S3 · STEPS CARD (PIVOT needs aggregate / UNPIVOT doesn't)

The syntax deliberately mirrors PIVOT, just running in the opposite
direction. PIVOT needs an aggregate function to summarize values into new
columns. UNPIVOT needs no aggregate at all — it's pure reshaping, not
summarizing. You'll reach for this most often with data that arrives
already wide — a spreadsheet import, a legacy system export — that needs
normalizing into a proper tall shape before you can join, group, or
aggregate it cleanly.

## S4 · OUTRO CARD

That wraps up Chapter 6. You can now build queries out of other
queries — scalar and multi-value subqueries, correlated subqueries,
EXISTS, CTEs including recursive ones, views, and reshaping data both
directions with PIVOT and UNPIVOT. Chapter 7 moves into T-SQL as an
actual programming language: variables, control flow, loops, and stored
procedures. See you there.
