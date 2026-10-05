# Lesson 7 — Privileges and GRANT · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 7: privileges and GRANT — what you can actually grant a principal, now that you know who they are.

## S2 · CODE — The shape every grant follows

Every grant in Unity Catalog follows one shape: GRANT, one or more privilege types, ON a securable object, TO a principal. The securable object can be a catalog, schema, table, view, volume, function, and a handful of other types.

## S3 · SCREENSHOT — The same names, as checkboxes

Here's Catalog Explorer's Request permissions dialog. Every checkbox you see — USE CATALOG, SELECT, MODIFY, CREATE TABLE — is a real privilege name, the exact same word you'd type after GRANT in SQL. The UI and the SQL are two views of the same underlying privilege model.

## S4 · CODE — Reading a table needs three privileges

Here's the one that trips people up first: SELECT on a table is not, by itself, enough to read it. Unity Catalog requires the full chain — USE CATALOG on the catalog, USE SCHEMA on the schema, and SELECT on the table itself. All three, or the query fails.

## S5 · STEPS — The all-or-nothing grant

ALL PRIVILEGES grants every privilege applicable to an object type, checked live rather than fixed at grant time. But deliberately, to avoid accidental privilege escalation, it excludes four: MANAGE, READ METADATA, EXTERNAL USE SCHEMA, and EXTERNAL USE LOCATION. Those have to be granted by name.

## S6 · CODE — REVOKE: the mirror image

REVOKE takes the exact same shape as GRANT, with FROM instead of TO. Undoing a grant is just as explicit as making one.

## S7 · OUTRO

Next lesson: ownership — the one principal that starts with every privilege on an object, by default.
