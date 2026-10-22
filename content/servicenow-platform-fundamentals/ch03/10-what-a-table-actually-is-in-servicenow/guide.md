# Lesson 10 — What a Table Actually Is in ServiceNow

**Chapter 3 · Tables & Relationships · Lesson 10 of 34**

## What you'll learn

- Why ServiceNow's "tables" aren't just database tables — they're records in the system too
- What `sys_db_object` and `sys_dictionary` actually store
- The standard fields every table gets for free, including `sys_id`
- Why you can inspect and extend a table through the UI instead of writing DDL

## Every piece of data lives in a table

Everything you touched in Chapters 1 and 2 — every incident, every user, every module
record — lives as a row in a table, built on ServiceNow's underlying "Glide" data model.
That part sounds like any relational database. What's different is what happens one
level up: in ServiceNow, a table is not just a structure the database engine knows
about — it is itself represented by an actual record, sitting in another table, that
you can open, read, and edit through the ordinary UI.

## `sys_db_object` — the table of tables

Every table in the instance, including the ones that store this fact, has one row in
`sys_db_object`. That row carries the table's real database name (for example
`incident`), its human-readable label ("Incident"), which table it extends (covered
next lesson), and whether it's extendable by other tables. Navigate to **System
Definition > Tables** and you're looking at a list view built directly on
`sys_db_object` — one row per table in the entire instance, admin tables and your own
custom tables included.

## `sys_dictionary` — the columns of every table

A table's columns aren't baked into a schema file either. Each column — called a
**field** in ServiceNow terms — is its own record in `sys_dictionary`, pointing back
at the table it belongs to and carrying that field's name, label, type (string,
reference, choice, and so on), length, and default value. Opening a table's definition
and clicking into its "Columns" related list is really just querying `sys_dictionary`
for every dictionary entry whose table reference matches. Chapter 4 goes deep on the
dictionary; for now, just hold onto the idea that a column's definition is itself
data you can query and edit, not a fixed schema only a DBA can touch.

## Standard fields every table gets

When a table is created — whether it's `incident` or a brand-new custom table you
build yourself — ServiceNow auto-adds a set of standard fields no admin has to define
by hand: `sys_id`, a 32-character GUID that is that record's unique, permanent
primary key; `sys_created_on` and `sys_created_by`, stamped once at creation;
`sys_updated_on` and `sys_updated_by`, refreshed on every save; and `sys_mod_count`,
a running count of how many times the record has been updated. These fields exist on
every single table in the platform, which is exactly why features like audit history
and update sets work the same way regardless of which table a record lives on.

## Why this matters: UI-driven schema changes

Because a table's structure is metadata, not a fixed schema file, you can add a new
field to `incident` by opening **System Definition > Tables**, finding the Incident
row, and adding a dictionary entry — no DDL, no database migration script, no server
restart. The platform reads `sys_dictionary` live and the new field is immediately
available on every form and list built against that table. That single capability —
schema changes through the UI, backed by data you can query the same way you'd query
any other record — is the foundation the rest of this chapter, and most of platform
administration, builds on.

## Key terms

| Term | Meaning |
|---|---|
| `sys_db_object` | The table that holds one record per table in the entire instance |
| `sys_dictionary` | The table that holds one record per field, across every table |
| `sys_id` | The 32-character GUID primary key auto-added to every table |
| Field | ServiceNow's term for a column — defined by a `sys_dictionary` record |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: if a coworker asked
you to prove that "Incident" is just a row somewhere in the system, which table would
you open to show them, and what would you expect to find in it?
