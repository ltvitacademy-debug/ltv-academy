# Lesson 9 — Inheritance of Permissions · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 9: inheritance of permissions — why a single grant on a catalog or schema reaches every table inside it, automatically.

## S2 · STEPS — Only two object types qualify

Unity Catalog designates exactly two object types as container objects: catalogs, which contain schemas, and schemas, which contain tables, views, volumes, and functions. Everything else doesn't have children to inherit privileges down to.

## S3 · CODE — Inheritance reaches future objects too

Here's the part that surprises people: grant SELECT on a schema today, and a table created in it next month is readable immediately — no new grant required. Inheritance applies to current and future child objects alike.

## S4 · STEPS — The pattern behind Lesson 7's rule

This is the mechanism behind the three-privilege chain from Lesson 7. USE CATALOG and USE SCHEMA are usage privileges — a prerequisite for reaching anything inside that container, no matter what object-level privilege you hold. Reading needs SELECT plus both usage privileges. Writing needs MODIFY plus both. Running a function needs EXECUTE plus both.

## S5 · CODE — MANAGE reduces the requirement

MANAGE is the one exception. Holding MANAGE on a catalog needs no usage privilege at all — it governs the catalog and everything inside directly. But MANAGE on a schema still needs USE CATALOG on its parent catalog — the reduction only applies at the level MANAGE is actually granted, not above it.

## S6 · OUTRO

Next lesson: access control best practices — turning everything Chapter 2 has covered into habits worth keeping.
