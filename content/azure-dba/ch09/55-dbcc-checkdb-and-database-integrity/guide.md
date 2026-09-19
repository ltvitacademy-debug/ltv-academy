# Lesson 55 — DBCC CHECKDB & Database Integrity

**Chapter 9 · Database Performance & Maintenance · Lesson 55 of 95**

## What you'll learn

- What DBCC CHECKDB actually checks, and why corruption is a different problem from slowness
- How Azure SQL Database and Managed Instance handle this differently than on-prem — and why you should still understand it
- The REPAIR options, and why they're a last resort with real, permanent data-loss risk
- How to read the output enough to know when to escalate instead of guessing

## A different kind of problem

Everything so far in this chapter — fragmentation, stale statistics —
is a *performance* problem. The database still returns correct
answers; it just takes longer or picks a worse plan. Corruption is a
different category entirely: a page on disk that doesn't match what
SQL Server expects it to contain, because of a bad disk sector, a
storage-layer bug, a botched failover, or hardware silently lying
about a write actually completing. An index rebuild doesn't fix this.
Neither does an updated statistics object. If corruption goes
undetected, it doesn't stay contained — a corrupt page in an index
can propagate to a corrupt result set handed to your application
with no error at all.

## What DBCC CHECKDB actually checks

`DBCC CHECKDB` validates the physical and logical integrity of every
object in the database: page checksums, allocation consistency
(does every page belong to exactly the object it thinks it belongs
to), b-tree structure, and — depending on options — the actual data
values against constraints.

```sql
DBCC CHECKDB ('SalesDB') WITH NO_INFOMSGS;
```

`NO_INFOMSGS` suppresses the routine object-count messages so real
errors don't get lost in the noise. Run without it the first time you
learn this command, specifically so you see what a healthy run
actually looks like — recognizing "nothing's wrong" matters as much
as recognizing "something's wrong."

On-prem, this is a scheduled DBA responsibility — typically weekly,
via SQL Server Agent, on a maintenance window that can absorb the
I/O it generates (a full CHECKDB is not cheap; it reads essentially
the whole database).

## How Azure SQL handles this differently

On Azure SQL Database and Managed Instance, Microsoft runs the
integrity checks for you as part of the managed service — you don't
schedule `DBCC CHECKDB` yourself the way you would on a VM or on-prem.
That does **not** make this lesson's content irrelevant to a real
Azure DBA:

- You still need to know what corruption *is* to interpret an
  incident correctly if Microsoft's automated detection surfaces one.
- SQL Server on an **Azure VM** is IaaS — full DBA responsibility,
  same as on-prem, including scheduling `CHECKDB` yourself.
- Understanding what CHECKDB protects against is DP-300 exam content
  regardless of which deployment model you personally administer day
  to day.

## REPAIR options — the last resort

If `CHECKDB` finds corruption, the honest first move is **restore
from a known-good backup**, not repair. `REPAIR_ALLOW_DATA_LOSS` is
exactly what it says on the label:

```sql
-- Diagnose only — no changes made:
DBCC CHECKDB ('SalesDB') WITH NO_INFOMSGS, ALL_ERRORMSGS;

-- Last resort, and only in single-user mode:
ALTER DATABASE SalesDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DBCC CHECKDB ('SalesDB', REPAIR_ALLOW_DATA_LOSS);
ALTER DATABASE SalesDB SET MULTI_USER;
```

`REPAIR_ALLOW_DATA_LOSS` can delete corrupted rows, pages, or entire
allocation units to make the database internally consistent again —
consistent, not complete. Whatever it removes is gone. It requires
single-user mode because it needs exclusive access to make structural
changes safely. This is a genuine last resort specifically because a
recent backup gives you your data back; `REPAIR_ALLOW_DATA_LOSS`
gives you a database that no longer errors, with an unknown amount of
data quietly missing.

## Key terms

| Term | Meaning |
|---|---|
| Corruption | A page on disk that doesn't match what SQL Server expects — a correctness problem, not a speed problem |
| `DBCC CHECKDB` | Validates physical and logical integrity of every object in a database |
| `NO_INFOMSGS` | Suppresses routine messages so real errors stand out |
| `REPAIR_ALLOW_DATA_LOSS` | Last-resort repair that can permanently delete corrupted data to restore consistency |

## Check yourself

You're ready for Lesson 56 when you can explain, without looking: why
is corruption a fundamentally different problem from the fragmentation
and stale statistics covered earlier in this chapter, and why should
restoring from backup almost always come before `REPAIR_ALLOW_DATA_LOSS`?
