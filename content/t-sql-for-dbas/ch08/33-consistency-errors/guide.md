# Consistency Errors

Lesson 32 covered running `DBCC CHECKDB` cleanly. This lesson covers the day it isn't clean —
what the error output actually means, how error numbers map to severity, and the honest order
of operations for fixing corruption instead of making it worse.

## What you'll learn

- How to read `CHECKDB` output when it reports real errors instead of silence
- Why `REPAIR_ALLOW_DATA_LOSS` is a last resort, not a first response
- The actual fix a DBA reaches for before touching repair options

## Reading real CHECKDB error output

A clean `CHECKDB` run under `NO_INFOMSGS` produces nothing. A dirty one looks like this:

```
Msg 8928, Level 16, State 1
Object ID 421576540, index ID 1, partition ID 72057594045972480:
Page (1:8934) could not be processed. See other errors for details.

Msg 8939, Level 16, State 1
Table error: Object ID 421576540, index ID 1, page (1:8934).
Test (IS_OFF (BUF_IOERR, pBUF->bstat)) failed.

CHECKDB found 0 allocation errors and 2 consistency errors in table
'Sales.SalesOrderDetail' (object ID 421576540).
```

The pieces that matter for triage:

- **Msg number and severity** — `Level 16` errors are the ones `CHECKDB` itself raises for
  real structural problems; they're not something to filter out.
- **Object ID / page number** — identifies exactly which table and page is damaged, which
  tells you the blast radius (one table, or something instance-wide like a system table).
- **The summary line** — `CHECKDB found N allocation errors and N consistency errors` is the
  line to grep for in a job's output log; anything other than all-zeros means a page is
  actually inconsistent with what it should contain.

## Consistency errors versus allocation errors

`CHECKDB`'s summary line always reports two counts, and they mean different things:

| Error type | What it means |
|---|---|
| Allocation errors | A page's ownership bookkeeping is wrong — claimed by two objects, or not claimed by any |
| Consistency errors | The data or structure on a page contradicts what SQL Server expects — a corrupted row, a broken index-to-table linkage, or a page that failed an I/O check |

Both mean corruption. Allocation errors are sometimes easier to repair without loss;
consistency errors on data pages are the ones most likely to mean losing rows if the fix
comes down to `REPAIR_ALLOW_DATA_LOSS`.

## The real order of operations

When `CHECKDB` comes back dirty, the honest sequence — in order — is:

1. **Don't panic-run a repair.** Note the object ID, page numbers, and error numbers first;
   they're needed regardless of which fix path is taken.
2. **Check for a clean, recent backup.** If `Sales.SalesOrderDetail` is corrupted and last
   night's full backup predates the corruption, `RESTORE` is the fix with zero data loss —
   restore the database (or, if using page-level restore, just the damaged pages) from that
   backup rather than repairing in place.
3. **Re-run `CHECKDB` a second time** if the first run is ambiguous — a transient I/O glitch
   can occasionally look like corruption; a repeatable error confirms it's real.
4. **`REPAIR_ALLOW_DATA_LOSS` is the last resort**, only reached for when there's no usable
   backup:

```sql
ALTER DATABASE AdventureWorks2019 SET SINGLE_USER
  WITH ROLLBACK IMMEDIATE;

DBCC CHECKDB (N'AdventureWorks2019', REPAIR_ALLOW_DATA_LOSS);

ALTER DATABASE AdventureWorks2019 SET MULTI_USER;
```

That option name is not a euphemism — it can and does delete the corrupted rows or
deallocate the damaged pages to bring the database back to a structurally consistent state.
It fixes the error; it does not recover the data that was on that page. A restore from
backup is always preferred when one exists.

## Key terms

| Term | Meaning |
|---|---|
| Allocation error | A page-ownership bookkeeping mismatch found by `CHECKDB` |
| Consistency error | Data or structure on a page contradicting what SQL Server expects |
| `REPAIR_ALLOW_DATA_LOSS` | `CHECKDB` repair option that can delete corrupted rows/pages to restore structural consistency — a last resort, not a first response |

## Check yourself

Why is restoring from a clean backup almost always the better fix for corruption than
running `DBCC CHECKDB` with `REPAIR_ALLOW_DATA_LOSS`?
