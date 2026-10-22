# Lesson 26 — Transform Maps & Field Mapping

**Chapter 6 · Import Sets & Transform Maps · Lesson 26 of 34**

## What you'll learn

- What a Transform Map actually does between the staging table and a target table
- How field mapping connects a staging column to a target field, one pair at a time
- What coalesce means and how it decides insert versus update — ServiceNow's real upsert mechanism
- When a Run Script transform is needed instead of a plain 1:1 mapping
- Why getting coalesce wrong is one of the most common real-world import mistakes

## What a Transform Map does

A Transform Map is the piece that finally moves data out of the raw staging table (Lesson 24)
and into a real target table — `sys_user`, a custom CMDB table, anything with its own real
business logic and relationships. Where the Data Source (Lesson 25) only decided how data got
*into* staging, the Transform Map decides what happens to it from there: which staging columns
become which target fields, and whether a given staged row should create a new record or update
one that already exists.

Every Transform Map is tied to one source table (the `imp_` staging table) and one target table.
You can have more than one Transform Map pointed at the same staging table if you need to route
different parts of the same import to different targets, but the common case is one staging
table feeding one target table through one map.

## Field mapping

Field mapping is the heart of a Transform Map: a list of pairs, each connecting one staging
column to one target field. For a staging table built from an HR CSV with columns like
`first_name`, `last_name`, `emp_email`, and `dept_code`, a mapping into `sys_user` might look
like:

- `first_name` → `first_name`
- `last_name` → `last_name`
- `emp_email` → `email`
- `dept_code` → `department` (often resolved to a reference-field lookup, not just copied as text)

Field mapping is why column names don't have to match between source and target — the source
file's `emp_email` header has no obligation to match `sys_user`'s `email` field name. The map is
exactly where that translation happens, by hand, field by field.

## Coalesce: ServiceNow's upsert mechanism

Running the same import twice without coalesce would simply create duplicate records every
time — a new `sys_user` row for the same person, over and over. **Coalesce** is the setting that
prevents that: you mark one field (or a combination of fields) as the coalesce field, and when a
transform runs, it first checks whether a record already exists in the target table with a
matching value in that field.

- If a match is found, the existing record is **updated** with the mapped values from the new
  row.
- If no match is found, a **new record is inserted**.

This insert-or-update behavior is commonly called an "upsert" in data engineering, and coalesce
is ServiceNow's implementation of exactly that pattern. For a `sys_user` import, email is a
natural coalesce field — it's unique per person and stable across re-imports, so rerunning the
same HR file next month updates each existing employee's record instead of creating 500 brand
new duplicate users.

Picking the wrong coalesce field — or forgetting to set one at all — is one of the most common
real-world Transform Map mistakes, and it's usually discovered only after a table fills up with
duplicates from a second import run.

## Beyond 1:1 mapping: Run Script

Not every field can be a straight copy. Sometimes a target field needs logic beyond "take this
column's value" — combining two staging columns into one target field, looking up a related
record instead of storing raw text, or applying a business rule conditionally. For cases like
that, a **Run Script** transform lets you write a small script against the staging record (often
referenced as `source`) and the target record (`target`) to compute the field's value. This
lesson only needs you to recognize that Run Script transforms exist and what they're for — deep
scripting technique is covered later in this path, in the Scripting & Application Development
course.

## Key terms

| Term | Meaning |
|---|---|
| Transform Map | The record defining how staging data maps into a target table |
| Field mapping | A pair connecting one staging column to one target field |
| Coalesce | The field (or fields) used to decide whether to update an existing record or insert a new one |
| Upsert | The general term for "update if it exists, otherwise insert" — what coalesce implements |
| Run Script | A transform script used for field logic beyond simple 1:1 mapping |

## Check yourself

You forgot to set a coalesce field on a Transform Map for a monthly HR import into `sys_user`.
What happens the second time you run that same import, and why?
