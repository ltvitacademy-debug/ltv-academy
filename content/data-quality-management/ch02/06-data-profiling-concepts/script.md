# Lesson 6 — Data Profiling Concepts · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 5 named "profile" as the first stage of the data quality lifecycle, deliberately separate from "define." Today we unpack exactly what that separation means, before we touch any SQL.

## S2 · STEPS — Discovery, not judgment

Profiling describes what data actually contains — it doesn't decide whether that's good or bad. A profiling pass might report "this column is 3% null" with no opinion on whether 3% is acceptable; that judgment belongs to the define stage, made by the data owner and steward. Profiling's only job is to make the real shape of the data visible.

## S3 · SCREENSHOT — SSMS

Every profiling technique in this chapter runs as a T-SQL query inside SQL Server Management Studio — Object Explorer on the left shows what tables exist; the Query Editor on the right is where profiling queries run. And that's the key distinction: Object Explorer confirms a table exists. It tells you nothing about whether the data inside it is any good.

## S4 · STEPS — Three levels

Profiling works at three levels. Column profiling looks at one column at a time — row counts, null rates, distinct values. Relationship profiling looks across tables — do foreign keys actually match up, are there orphaned rows. Pattern profiling looks at the shape of values within a column — does every row in a phone column actually look like a phone number?

## S5 · STEPS — Core metrics

Whatever the level, most profiling results boil down to five repeating metrics: row count, null count and rate, distinct count, min and max, and a pattern or format breakdown. You'll use all five starting next lesson.

## S6 · OUTRO

Column, relationship, pattern — and five metrics that show up everywhere. Next up: Lesson 7 puts this vocabulary to work with real T-SQL profiling queries.
