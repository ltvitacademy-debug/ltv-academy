# Oracle Flashback Technology

This is a lesson to be honest about, not to force a comparison in: Flashback doesn't have a
direct SQL Server equivalent. SQL Server's closest relative, System-Versioned Temporal Tables,
must be enabled per-table in advance and only covers row history for that one table. Oracle's
Flashback family operates more broadly, at query, table, and whole-database granularity, often
without any per-object setup at all. This is one of Oracle's genuinely distinctive
capabilities.

## What you'll learn

- Flashback Query: viewing data as it existed at a past moment, with no setup required
- Flashback Table: rewinding a table's rows in place
- Flashback Database: rewinding the entire database without a full restore

## Flashback Query reads history that's already there, by default

Oracle's undo mechanism — the same mechanism that lets a transaction roll back and gives
read-consistent results to concurrent readers — retains enough recent history that you can
simply ask for data as it looked in the past, no advance configuration required:

```sql
SELECT * FROM hr.employees
AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '1' HOUR)
WHERE employee_id = 205;

SELECT * FROM hr.employees
AS OF SCN 15482910
WHERE employee_id = 205;
```

This works as long as enough undo has been retained to cover that point in time — controlled
by `UNDO_RETENTION` and how much undo tablespace space is available. It's a query, not a
recovery operation: nothing changes, you're just reading a historical version.

## Flashback Table rewinds a table's data in place

```sql
FLASHBACK TABLE hr.employees TO TIMESTAMP
  (SYSTIMESTAMP - INTERVAL '1' HOUR);
```

Instead of just viewing history, this actually reverts the table's rows to that point — far
faster than a Data Pump import of an old export, and without taking anything else in the
database offline. It requires the table to have row movement enabled
(`ALTER TABLE hr.employees ENABLE ROW MOVEMENT`) since rows may need new physical locations
during the rewind, and it's still bounded by the same undo retention as Flashback Query.

Related and worth knowing: **Flashback Drop** recovers an accidentally dropped table from the
recycle bin — `FLASHBACK TABLE hr.employees TO BEFORE DROP;` — a completely different
mechanism (the recycle bin, not undo) for a completely different mistake.

## Flashback Database rewinds the whole database without a full restore

```sql
SHUTDOWN IMMEDIATE;
STARTUP MOUNT;
FLASHBACK DATABASE TO TIMESTAMP (SYSTIMESTAMP - INTERVAL '2' HOUR);
ALTER DATABASE OPEN RESETLOGS;
```

This is the one that requires setup in advance: **flashback logging** must be enabled
(`ALTER DATABASE FLASHBACK ON`) and the database needs a **Fast Recovery Area** to hold the
flashback logs, with `DB_FLASHBACK_RETENTION_TARGET` controlling how far back you can rewind.
Once configured, `FLASHBACK DATABASE` can undo widespread damage — like a bad batch job that
touched dozens of tables — far faster than a full RMAN restore-and-recover, because it applies
flashback logs rather than replaying every archived redo log from a backup forward.

## Being honest about the comparison to SQL Server

SQL Server's Temporal Tables are the nearest concept, but the comparison only goes so far:
Temporal Tables require `SYSTEM_VERSIONING = ON` per table set up ahead of time and only ever
cover that table's row history — there's no database-wide rewind equivalent to Flashback
Database, and no zero-setup query-any-recent-moment behavior equivalent to Flashback Query's
reliance on always-present undo. Presenting Flashback as "just Oracle's version of Temporal
Tables" would understate what it actually does — it's worth learning on its own terms as one
of the more distinctive corners of the Oracle platform.

## Key terms

| Term | Meaning |
|---|---|
| Flashback Query | `AS OF TIMESTAMP`/`AS OF SCN` — reads historical data via undo, no setup required |
| Flashback Table | Reverts a table's rows to a past point in time, in place |
| Flashback Drop | Recovers a dropped table from the recycle bin |
| Flashback Database | Rewinds the entire database using flashback logs, without a full restore |
| `UNDO_RETENTION` | Controls how far back Flashback Query/Table can reach |
| Fast Recovery Area | Required storage location for flashback logs, enabling Flashback Database |

## Check yourself

A bad batch job touched twelve tables an hour ago. Flashback Database was enabled in advance.
Explain why Flashback Database is likely faster here than an RMAN restore-and-recover to the
same point in time, and what had to be configured beforehand for it to even be an option.
