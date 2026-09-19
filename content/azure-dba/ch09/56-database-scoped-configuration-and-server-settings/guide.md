# Lesson 56 — Database-Scoped Configuration & Server Settings

**Chapter 9 · Database Performance & Maintenance · Lesson 56 of 95**

## What you'll learn

- Why database-scoped configuration exists at all — what problem it solves
- `MAXDOP` and query optimizer compatibility level as the two most consequential settings
- Why this matters especially on Managed Instance or a VM hosting multiple databases
- How to inspect and change these settings safely

## The problem: one server, different databases, different needs

A traditional server-level setting applies to every database on that
instance, uniformly. That's fine when one instance hosts one
workload. It breaks down the moment one instance hosts several
databases with genuinely different needs — an OLTP database that
wants short, highly parallel-averse queries sitting next to a
reporting database that wants to use every core it can get for a big
aggregation. **Database-scoped configuration** lets you override
specific server defaults *per database*, without needing a separate
instance for every workload shape.

```sql
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 4;
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = 4;
```

That second line matters on an Always On or geo-replicated topology:
scoped configuration can differ between the primary and secondary
replicas, because a secondary handling read-only reporting traffic
might genuinely want a different `MAXDOP` than the primary handling
OLTP writes.

## MAXDOP — the most consequential one

`MAXDOP` (maximum degree of parallelism) caps how many CPU cores a
single query can use. Set too high on an OLTP database, a handful of
expensive queries can consume every core and starve the many small,
fast queries an OLTP workload actually depends on. Set too low on a
reporting/analytics database, big aggregations that could finish in
seconds by using several cores instead run single-threaded and take
minutes.

```sql
-- Check current effective value:
SELECT * FROM sys.database_scoped_configurations
WHERE name = 'MAXDOP';

-- Override for this database only:
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 4;
```

Microsoft's general guidance for OLTP is to cap `MAXDOP` at the
number of cores in one NUMA node (never leave it uncapped at 0 on a
modern multi-core server), while analytics-heavy databases often
tolerate — or want — a higher cap. Database-scoped configuration is
what lets both live on the same instance without one workload's
`MAXDOP` preference breaking the other.

## Query optimizer compatibility level

Compatibility level controls which version of the query optimizer's
behavior a database uses — not the SQL Server *engine* version, but
specifically the cardinality estimator and optimizer rules that
version shipped with.

```sql
ALTER DATABASE SalesDB SET COMPATIBILITY_LEVEL = 150; -- SQL Server 2019 behavior
```

This is a database-level setting, not server-level, which is exactly
why it matters here: a Managed Instance genuinely might host one
legacy database still pinned to an older compatibility level because
a migration surfaced plan regressions on the newer optimizer, sitting
next to a newly built database running the current level. Pinning
compatibility level is a real, sanctioned way to buy time during a
migration — not something to leave in place indefinitely, since it
also means missing every optimizer improvement shipped since that
version.

## Why this is especially real on Managed Instance / VM

Azure SQL Database is already one database per logical unit, so
"different databases with different needs on the same server" is
less of a live question there. Managed Instance and SQL Server on an
Azure VM are explicitly designed to host *multiple* databases per
instance — which is exactly the scenario database-scoped
configuration was built for, and exactly why DP-300 tests it under
those deployment models specifically.

## Key terms

| Term | Meaning |
|---|---|
| Database-scoped configuration | Settings overridden per database instead of applying uniformly server-wide |
| `MAXDOP` | Caps how many CPU cores a single query can use |
| Compatibility level | Which optimizer/cardinality-estimator behavior a database uses, independent of engine version |
| NUMA node | A guideline boundary for OLTP `MAXDOP` caps on multi-core servers |

## Check yourself

You're ready for Lesson 57 when you can explain, without looking: why
would an OLTP database and a reporting database on the same Managed
Instance want different `MAXDOP` settings, and why is pinning an older
compatibility level a temporary bridge rather than a permanent fix?
