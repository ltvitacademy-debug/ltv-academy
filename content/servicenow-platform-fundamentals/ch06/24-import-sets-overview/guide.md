# Lesson 24 — Import Sets: Overview

**Chapter 6 · Import Sets & Transform Maps · Lesson 24 of 34**

## What you'll learn

- Why ServiceNow never lets external data write directly into a real table
- The two-stage pattern: an Import Set staging table, then a Transform Map
- How the `imp_` staging table is created, and what "raw and unmodified" means
- Where Import Sets sit relative to Data Sources and Transform Maps in the full pipeline
- Why this pattern protects data quality on tables like `sys_user` or a custom CMDB table

## The problem Import Sets solve

Every admin eventually needs to bring data into ServiceNow from somewhere else — a CSV of new
hires from HR, a spreadsheet of assets from a vendor, a nightly feed from an external database.
The naive approach would be to write directly into the target table, row by row, as the file is
read. ServiceNow deliberately does not work that way. If even one row in that external file has
a malformed email address, a missing required field, or a department name that doesn't match any
real record, a direct-write approach either corrupts a live table or crashes partway through,
leaving you with a half-loaded mess on a table real users and processes depend on.

Import Sets exist specifically to prevent that. If you've worked with a staging-and-transform
pattern in a data pipeline before — landing raw data untouched, then validating and reshaping it
before it reaches anything production-facing — this is the same idea, built directly into the
platform.

## The two-stage pattern

Loading data into ServiceNow always happens in two distinct stages:

1. **Staging.** Data from the external source — file, database, API — lands in an Import Set
   table first. This table is a literal, unmodified copy of the source rows. Nothing is
   validated, cleaned, or mapped yet. Think of this as a landing zone: raw data, exactly as it
   arrived, isolated from anything else in the instance.
2. **Transform.** A Transform Map then reads the staged rows and maps each staging column to a
   real field on a target table — `sys_user`, `cmdb_ci`, or any custom table. This is where field
   mapping, update-vs-insert logic, and any transform scripts run. Only data that successfully
   passes through this stage ever touches the target table.

Because staging and transforming are separate steps, a bad row in the source file never corrupts
a live table. It sits in the staging table, visible and inspectable, while an admin fixes the
source data or the mapping and reruns the transform — without re-downloading or re-uploading
anything.

## The Import Set table itself

When you first load data into ServiceNow through a Data Source, the platform automatically
creates a new staging table for that load, prefixed `imp_` — for example, `imp_new_employees`
or `imp_asset_feed`. Each column in the source file becomes a column on this table, with no
renaming or reformatting. If the source CSV has a column header like `emp_email`, the staging
table gets a column called `emp_email`, holding exactly what was in the file.

This auto-created table is reusable. The next time you run the same import, new rows load into
the same staging table (or a fresh run state, depending on how the Data Source is configured),
and the same Transform Map can process them again. You never hand-build the staging table's
schema — ServiceNow infers it from whatever columns the source actually contains.

## Where this fits in the bigger picture

The full pipeline has three moving parts, each covered across this chapter:

- A **Data Source** (Lesson 25) defines *where* the data comes from — a file, a JDBC connection,
  an FTP location, or a web service — and is what actually populates the Import Set staging table.
- The **Import Set table** (this lesson) is the raw landing zone that results from running that
  Data Source.
- A **Transform Map** (Lesson 26) defines how staged rows become real records on a target table.

Understanding this lesson's staging concept first makes Lessons 25 and 26 click into place —
Data Sources fill the staging table, and Transform Maps empty it into something real.

## Key terms

| Term | Meaning |
|---|---|
| Import Set | The overall record of one data-loading operation and its staged rows |
| Staging table (`imp_*`) | An auto-created table holding a raw, unmodified copy of source data |
| Transform Map | The mapping layer that moves staged data into a real target table |
| Target table | The real table — e.g., `sys_user` — that ultimately receives validated, mapped data |
| Landing zone | A data-engineering term for an untouched, raw holding area before validation — the staging table's role |

## Check yourself

Why does ServiceNow refuse to let external data write directly into a table like `sys_user`,
and what specifically would go wrong if it did?
