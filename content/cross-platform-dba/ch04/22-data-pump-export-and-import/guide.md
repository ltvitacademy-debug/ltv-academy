# Data Pump: Export & Import

Chapter Four closes where Lesson 17 opened it: logical backup, in depth. Data Pump's
`expdp`/`impdp` are the modern replacement for the legacy `exp`/`imp` utilities, and they do
real work RMAN structurally can't — moving a schema between environments, refreshing a subset
of data, or migrating across versions and platforms.

## What you'll learn

- Real `expdp`/`impdp` syntax, including the required `DIRECTORY` object
- `REMAP_SCHEMA` and selective export/import with `TABLES`, `QUERY`, and `INCLUDE`/`EXCLUDE`
- Why this is a distinct tool from RMAN, not a smaller version of it

## Every Data Pump job needs a directory object first

Data Pump reads and writes dump files through a database **directory object** — a named
pointer to an OS path, not the raw OS path itself:

```sql
CREATE DIRECTORY dpump_dir AS '/u01/app/oracle/dpdump';
GRANT READ, WRITE ON DIRECTORY dpump_dir TO hr;
```

Every `expdp`/`impdp` invocation references this directory by name, not a file path — Data
Pump jobs run as server-side processes, so the path has to already be valid and accessible
on the database server, not wherever the client happens to be running.

## Exporting a schema is the most common real-world job

```
expdp hr/password DIRECTORY=dpump_dir DUMPFILE=hr_schema.dmp \
  LOGFILE=hr_export.log SCHEMAS=hr
```

This captures every object `hr` owns — tables, indexes, constraints, procedures — as one
portable dump file. Larger jobs benefit from `PARALLEL=4` (using multiple worker processes)
and `DUMPFILE=hr_%U.dmp` (letting Data Pump split output across multiple files as it runs in
parallel).

## Import can reshape what it loads, not just replay the export

```
impdp hr/password DIRECTORY=dpump_dir DUMPFILE=hr_schema.dmp \
  REMAP_SCHEMA=hr:hr_staging \
  REMAP_TABLESPACE=hr_data:hr_staging_data
```

`REMAP_SCHEMA` loads the exported objects into a *different* schema than they came from — the
standard way to refresh a staging or test environment from a production export without
touching production's own schema. `REMAP_TABLESPACE` does the same for storage. Both are real
options Data Pump supports natively, not manual post-processing.

## Selective export and import filter what actually moves

```
expdp hr/password DIRECTORY=dpump_dir DUMPFILE=orders_only.dmp \
  TABLES=hr.orders \
  QUERY="hr.orders:\"WHERE order_date >= TRUNC(SYSDATE) - 30\""

expdp hr/password DIRECTORY=dpump_dir DUMPFILE=hr_no_audit.dmp \
  SCHEMAS=hr EXCLUDE=TABLE:"IN ('AUDIT_LOG')"
```

`TABLES=` scopes an export to specific tables instead of a whole schema. `QUERY=` filters
*rows* within an exported table — useful for exporting "just last 30 days" instead of an
entire history table. `INCLUDE`/`EXCLUDE` filter by object type or name pattern. None of this
has an RMAN equivalent — RMAN backs up physical files at the block level and has no concept
of "just these rows" or "just this one table."

## Data Pump and RMAN are not competing tools

By the end of this chapter, the pattern should be clear: RMAN backs up and recovers the
physical database, block by block, for disaster recovery and point-in-time restore of
everything. Data Pump exports and imports logical objects, selectively, portably, for
migration, refresh, and targeted data movement. A production Oracle environment schedules
both — RMAN running the recovery strategy, Data Pump running the migration and refresh
workflows — because asking one tool to do the other's job doesn't work.

## Key terms

| Term | Meaning |
|---|---|
| Directory object | Database pointer to a server-side OS path, required for every Data Pump job |
| `expdp` / `impdp` | Data Pump export and import command-line utilities |
| `REMAP_SCHEMA` | Loads imported objects into a different schema than they were exported from |
| `TABLES=` | Scopes export/import to specific tables |
| `QUERY=` | Filters which rows within a table are exported |
| `PARALLEL=` | Runs the job across multiple worker processes for speed |

## Check yourself

A team needs to refresh a test environment's `HR` schema with last month's production data,
but only the `orders` table, filtered to the last 30 days, and loaded into a schema called
`hr_test` instead of `hr`. Write out (in words) which Data Pump options accomplish each part
of that requirement, and explain why RMAN couldn't do this job at all.
