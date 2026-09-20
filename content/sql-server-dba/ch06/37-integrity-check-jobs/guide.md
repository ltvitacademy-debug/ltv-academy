# Integrity Check Jobs

## What you'll learn

- The real `DBCC CHECKDB` syntax and what it actually checks
- Why corruption detection can't wait for someone to notice a problem
- Realistic cadence tradeoffs between small and very large databases

## What DBCC CHECKDB actually does

```sql
DBCC CHECKDB ('InventoryDB') WITH NO_INFOMSGS, ALL_ERRORMSGS;
```

`CHECKDB` validates the logical and physical integrity of every object in the database:
allocation consistency, page structure, index/table consistency, and more. It's the single most
important corruption-detection tool a DBA has, because SQL Server does not proactively surface
corruption on its own — a corrupt page can sit undetected until a query happens to touch it,
which is often long after a backup rotation has already carried the corruption into every backup
you have.

`NO_INFOMSGS` suppresses routine informational messages so job output (and any alerting built on
top of it) only shows something when there's an actual problem. `ALL_ERRORMSGS` ensures every
error is returned rather than a truncated subset on a large error set.

## Why it has to be scheduled, not reactive

Waiting to run `CHECKDB` until something looks wrong means you find out about corruption after
it's already affected queries, and possibly after it's already baked into your most recent
backups. Running it on a schedule turns corruption into something you catch on your terms, with
enough lead time to restore from a known-good backup before the corrupted backup becomes the only
one you have.

## Cadence tradeoffs by database size

`CHECKDB` reads essentially the entire database, which makes it I/O- and CPU-intensive — the
central tradeoff is thoroughness vs. runtime and resource contention on production:

- **Small to medium databases** — nightly `CHECKDB` is realistic; the run finishes well within a
  maintenance window and the resource cost is a rounding error.
- **Very large databases (multi-terabyte)** — a full nightly `CHECKDB` may not finish in an
  acceptable window or may contend too much with production. The realistic compromise: run
  `CHECKDB` weekly (often on a lower-traffic day), and consider offloading to `WITH
  PHYSICAL_ONLY` on the nights between — a faster subset check that catches storage-level
  corruption (torn pages, checksum failures) without the full logical consistency pass.
- **Alternative for the largest environments** — restore the latest backup to a separate server
  and run `CHECKDB` there instead, verifying the backup is actually restorable and clean without
  costing the production instance anything at all.

```sql
-- Faster, storage-level-only check for nights between full CHECKDB runs
DBCC CHECKDB ('InventoryDB') WITH PHYSICAL_ONLY, NO_INFOMSGS;
```

## What happens if it finds something

`CHECKDB` reports the problem and, depending on severity, a repair option
(`REPAIR_REBUILD`/`REPAIR_ALLOW_DATA_LOSS`) — but restoring from a known-good backup taken before
the corruption is almost always the better answer than a repair option whose name is honest about
what it might cost you. This is exactly why the backup cadence from the previous lesson and the
integrity-check cadence here have to be considered together.

## Key terms

| Term | Meaning |
|---|---|
| `DBCC CHECKDB` | Validates logical and physical integrity of every object in a database |
| `NO_INFOMSGS` | Suppresses routine info messages so output only shows real problems |
| `WITH PHYSICAL_ONLY` | Faster subset check for storage-level corruption only, skipping full logical checks |
| Corruption detection lag | The risk that undetected corruption gets carried forward into every subsequent backup |

## Check yourself

A 6 TB production database can't finish a full `DBCC CHECKDB` within its nightly maintenance
window. Name two realistic ways to still get integrity checking done without simply skipping it.
