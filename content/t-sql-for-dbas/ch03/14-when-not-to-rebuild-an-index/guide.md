# When Not to Rebuild an Index

Lesson 11 gave the documented fragmentation thresholds. This lesson is the judgment
layer on top of them: the real tradeoffs that make "just rebuild it" the wrong answer
on a specific server, at a specific time, more often than the thresholds alone suggest.

## What you'll learn

- Why `REBUILD` on a huge table during business hours can cause more harm than the
  fragmentation it fixes
- What `ONLINE = ON` actually buys you, and its real limitations
- Why `REORGANIZE` is frequently the safer default, not just the "lesser" option
- Reading log growth and transaction log impact from a rebuild before running one

## The cost a rebuild itself imposes

`ALTER INDEX ... REBUILD` is a fully logged operation — rebuilding a large index
generates a large amount of transaction log, which then has to be written, and
replicated to any secondary if the database is in an Availability Group or is being
log-shipped. On a busy OLTP table during business hours, that log volume competes
directly with the application's own writes for log-drive I/O:

```sql
ALTER INDEX IX_Orders_CustomerID ON dbo.Orders REBUILD;
```

Run against a genuinely large table at the wrong time, this single statement can spike
log growth, saturate the log drive, and cause exactly the kind of blocking and slowness
a DBA is supposed to be preventing — not just for the table being rebuilt, but for
everything else sharing that log file.

## ONLINE = ON helps, but isn't free

```sql
ALTER INDEX IX_Orders_CustomerID ON dbo.Orders
    REBUILD WITH (ONLINE = ON);
```

`ONLINE = ON` (available in Enterprise edition historically, and in more editions from
SQL Server 2019 onward) lets reads and writes continue against the table for most of the
operation, instead of the table-level lock a standard offline rebuild takes. It's not
free, though: it still needs a brief schema-modification lock at the very start and end
of the operation, it uses row versioning that adds tempdb and log overhead of its own,
and it can still run for a long time on a very large table — "online" describes
concurrency during the rebuild, not the resource cost of doing it.

## Why REORGANIZE is often the safer default

`ALTER INDEX ... REORGANIZE` is always online, works incrementally in small steps, can
be interrupted (killing the session simply stops it where it is, with no rollback of
completed work), and generates dramatically less transaction log per unit of
defragmentation than a rebuild does. For an index in the 10–30% fragmentation range —
exactly where Lesson 11's thresholds put it — that's not just "the documented choice,"
it's usually the genuinely lower-risk one during business hours, even when a rebuild
would technically produce a cleaner result.

## Reading the room before running either one

Before rebuilding anything on a production table, a DBA checks:

- **Table size and current load** — is this a huge table, and is the server already
  under I/O or CPU pressure right now (Lesson 6's monitoring queries)?
- **Log file headroom** — does the transaction log have room to grow for the duration
  of the operation, or will this trigger autogrowth mid-rebuild (Chapter 8 covers file
  growth in depth)?
- **The maintenance window** — can this genuinely wait for an off-hours window instead
  of running now?

When any of those answers is unfavorable, reorganizing now and scheduling the rebuild
for the maintenance window is very often the correct professional call — not a
compromise, but the actual right decision given the constraints in front of you.

## Key terms

| Term | Meaning |
|---|---|
| `ONLINE = ON` | REBUILD option allowing concurrent reads/writes during most of the operation, at the cost of extra tempdb/log overhead |
| Schema-modification lock | A brief but exclusive lock an online rebuild still takes at the very start and end of the operation |
| Maintenance window | A scheduled off-hours period set aside for resource-intensive operations like index rebuilds |

## Check yourself

Why can `ALTER INDEX ... REBUILD WITH (ONLINE = ON)` still cause a noticeable
performance hit on a busy server, even though reads and writes keep working throughout
most of the operation?
