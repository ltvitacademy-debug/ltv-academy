# Lesson 2 — Account, Database and Schema Structure · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE

Before you can control who sees what, you need to know where things
live. This lesson covers Snowflake's object hierarchy — the
addressing scheme every governance rule in this course hangs off of.

## S2 · SCREENSHOT — Databases explorer

In Snowsight, Data, then Databases, lists every database in this
account — the level right below the account itself. This is the top
of the hierarchy you work with day to day: account, then database,
then schema, then the objects inside each schema.

## S3 · CODE — CREATE DATABASE / SCHEMA

Creating that structure in SQL is three statements. CREATE DATABASE
for a new database, CREATE SCHEMA for a schema inside it, and USE
DATABASE plus USE SCHEMA to set your working context. Every object
you create after this point — tables, views, and later, tags and
masking policies — lives at a fully qualified address: database dot
schema dot object.

## S4 · SCREENSHOT — New Database dialog

The same action is available in the UI — the New Database dialog
takes a name and an optional comment, and produces exactly the same
result as the CREATE DATABASE statement you just saw.

## S5 · CODE — SHOW DATABASES/SCHEMAS/TABLES

SHOW DATABASES, SHOW SCHEMAS, and SHOW TABLES walk the hierarchy one
level at a time — a quick way to confirm what actually exists without
opening the UI.

## S6 · SCREENSHOT — Drilldown

Here's that hierarchy drilled all the way down in the object browser
— a database, a schema inside it, and a table inside that schema.
This is exactly the structure your governance objects will live in
too: masking policies, row access policies, and tags are ordinary
schema objects, which is why the hierarchy matters for governance,
not just organization — privileges are grantable at every level,
database, schema, or individual object.

## S7 · OUTRO

Next up: roles and the role hierarchy. Objects now have an address —
next we decide who's allowed to reach them.
