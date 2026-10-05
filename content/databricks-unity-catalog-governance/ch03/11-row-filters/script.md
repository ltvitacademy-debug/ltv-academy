# Lesson 11 — Row Filters · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Three moves from table-level grants to something finer — filtering the actual rows a query returns.

## S2 · STEPS — Filtering rows, not tables

A GRANT is all or nothing — a user sees every row of a table, or none of it. A row filter changes that. It's a SQL function attached to a table that Databricks evaluates against every row at query time. Rows where the function returns false are silently excluded — the user still has SELECT on the table, the filter just narrows what comes back.

## S3 · CODE — CREATE FUNCTION + ALTER TABLE

Here's the real pattern: CREATE FUNCTION defines the logic, ALTER TABLE SET ROW FILTER attaches it. In this example, admins get true unconditionally and see every row. Everyone else gets region equals US — so the exact same SELECT statement returns a different result depending on who's running it.

## S4 · CODE — ACL-style filtering with a mapping table

For logic too custom for a single column check, Databricks recommends a mapping table — an ordinary table listing which users can see which rows, joined into the filter using SESSION_USER. Because it's just a table, updating access is an INSERT or DELETE, not a redeploy.

## S5 · STEPS — Disable, replace, remove

Filters can be disabled with DROP ROW FILTER, or replaced in place with CREATE OR REPLACE FUNCTION. One ordering rule matters: always drop the row filter from the table before dropping the function itself — do it in the wrong order and the table becomes inaccessible.

## S6 · OUTRO

Next lesson: column masks — the same enforcement model, but narrowing what a query sees inside a column instead of which rows it returns.
