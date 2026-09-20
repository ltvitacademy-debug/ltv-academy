# DBCC CHECKDB, in Practice

`DBCC CHECKDB` is the single most important integrity command in SQL Server, and one of
the easiest to run wrong — either by not running it often enough, or by drowning in
informational noise that hides the one message that actually matters. This lesson is about
running it the way a working DBA actually does.

## What you'll learn

- What `CHECKDB` actually checks, beyond "is the database okay"
- The options that make its output usable instead of overwhelming
- Why `DATA_PURITY` matters on databases upgraded from very old versions

## What CHECKDB actually checks

`DBCC CHECKDB` isn't one check — it's several, run together:

- **Allocation consistency** — that every page claimed by an object is actually allocated,
  and nothing is claimed twice.
- **Structural integrity** — that tables and indexes are internally consistent: page
  linkages, row offsets, and index-to-table agreement all check out.
- **Catalog consistency** — that system metadata describing objects matches what's
  physically on disk.
- **Data purity** — that column values actually fit their declared data type and don't
  violate invariants like negative lengths (see below).

## Running it the way a DBA actually does

The default output is noisy — informational messages for every object, whether or not
anything's wrong. In practice, you run it like this:

```sql
DBCC CHECKDB (N'AdventureWorks2019')
WITH NO_INFOMSGS, ALL_ERRORMSGS, DATA_PURITY;
```

- `NO_INFOMSGS` — suppresses the routine "0 errors" chatter, so a clean run is silent and
  an actual problem stands out.
- `ALL_ERRORMSGS` — makes sure every error is returned, not just a subset, if there
  happens to be more than one.
- `DATA_PURITY` — explicitly checks for column values that violate their data type's
  constraints. Older databases (originally created before SQL Server 2005) don't get this
  check automatically unless it's requested at least once; after that, SQL Server flags
  the database as purity-checked and runs it automatically on every subsequent `CHECKDB`.

## Scheduling it

`CHECKDB` on a large database is I/O- and CPU-intensive, so it belongs in a maintenance
window, run as an Agent job (Lessons 28–31 covered exactly how to build that job). A clean
run produces no output at all under `NO_INFOMSGS` — which is exactly what you want an
overnight job to look like.

## Key terms

| Term | Meaning |
|---|---|
| `DBCC CHECKDB` | Command checking allocation, structural, catalog, and (optionally) data-purity consistency for a database |
| `NO_INFOMSGS` | Option suppressing routine informational output, leaving only real problems |
| `DATA_PURITY` | Option checking that column values respect their data type's constraints |

## Check yourself

Why does adding `WITH NO_INFOMSGS` to a `DBCC CHECKDB` call matter for a job that runs
unattended every night?
