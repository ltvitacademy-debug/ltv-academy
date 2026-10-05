# Lesson 12 — Column Masks · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

A row filter decides which rows come back. This lesson covers the companion feature — deciding what a user sees inside a column that does come back.

## S2 · STEPS — What a column mask changes

Like a row filter, a column mask is a SQL function registered in Unity Catalog. But instead of returning true or false, it returns a value of the same type as the column — the real value, or a redacted one — and Databricks substitutes it automatically wherever that column appears in query results.

## S3 · CODE — A basic mask

Here's the pattern: CREATE FUNCTION defines the logic, ALTER TABLE ALTER COLUMN SET MASK attaches it. A non-HR user querying this table gets the real name but a redacted SSN. HR group members see the actual column — same query, same table, different result based on who's asking.

## S4 · CODE — Conditional masking with USING COLUMNS

Sometimes the masking decision depends on another column in the same row, not just who's asking. USING COLUMNS passes extra arguments into the function — here, a member of the US viewers group sees full US addresses but a redacted string for every other country, evaluated row by row.

## S5 · STEPS — Python logic needs a SQL wrapper

A masking function attached with SET MASK must be a SQL function. Python logic is allowed, but only behind a SQL wrapper function that calls it — applying the Python UDF directly raises a ROUTINE_NOT_FOUND error. And removing a mask entirely is one line: ALTER TABLE ALTER COLUMN DROP MASK.

## S6 · OUTRO

Next lesson: dynamic views — the older, still-supported pattern for row- and column-level control, built directly into a view's SELECT statement instead of a table's schema.
