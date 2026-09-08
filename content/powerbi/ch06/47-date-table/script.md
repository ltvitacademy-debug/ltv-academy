# Lesson 47 — Building a Date Table · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every single time intelligence function this chapter covers depends
entirely on one thing existing first: a table with exactly one row for
every single day, with genuinely no gaps anywhere in it. Here's exactly
how to build one properly and mark it correctly.

## S2 · CODE: Right-click date table -> Mark as date table

Right-click your date table in the Fields pane, select Mark as date
table, then confirm Mark as date table one more time in the dialog that
appears. Power BI's automatic date and time detection is genuinely
convenient day to day, but marking your own table gives you real control
over fiscal years and custom hierarchies that the automatic version
simply can't offer.

## S3 · IMAGE: date-tables_02.png / date-tables_03.png

Pick specifically the column that holds the actual date values
themselves, not just something that looks like a date. Validated
successfully means it genuinely passed every single check Power BI runs
against it before accepting the table.

## S4 · CODE: Four validation rules

Four rules get checked every single time you mark a table: unique
values with no duplicates, no null values anywhere, contiguous dates
with absolutely no gaps between them, and — if it happens to be a
Date/Time column specifically — the exact same timestamp on every single
row. Fail even one of these rules, and Power BI tells you specifically
why, right there in the dialog.

## S5 · OUTRO CARD (SVG: chapter progress, LTV seal)

With a genuinely real date table marked and validated, every single
function in this entire chapter finally has something solid to actually
stand on. Next: CALENDAR, for building a date table completely from
scratch when you don't already have one sitting in your source data.
