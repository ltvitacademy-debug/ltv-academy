# Database-Scoped Configuration

Before SQL Server 2016, tuning options like max degree of parallelism lived only at the
server level — changing them for one database meant changing them for every database on
the instance. `ALTER DATABASE SCOPED CONFIGURATION` fixed that, letting a DBA tune
query-processing behavior per database, without a server restart and without affecting
anything else sharing the instance.

## What you'll learn

- Why database-scoped configuration matters most on multi-tenant or multi-app instances
- Three real, commonly-used database-scoped options
- How to give a readable secondary in an Availability Group its own settings

## Why scope these settings to a database at all

A single instance often hosts databases for genuinely different workloads: a reporting
database that benefits from wide parallelism, sitting next to an OLTP database that runs
better with limited parallelism. Before database-scoped configuration, the server-level
`max degree of parallelism` setting was a compromise across every database. Now each
database can carry its own override.

## Three real options worth knowing

- **MAXDOP** — overrides the server-level max degree of parallelism for just this
  database. A reporting database can run wide parallel plans while an OLTP database next
  to it stays limited.
- **LEGACY_CARDINALITY_ESTIMATION** — toggles between the modern cardinality estimator
  (introduced in SQL Server 2014) and the legacy pre-2014 estimator, per database. Useful
  when an upgrade changes plan shapes for the worse on a specific database and reverting
  buys time to tune properly.
- **PARAMETER_SNIFFING** — turns parameter sniffing off for the database, so the optimizer
  stops caching a plan based on the first parameter value it saw. Useful when a query's
  optimal plan varies wildly by parameter and sniffing keeps causing bad-plan reuse; the
  cost is losing the benefit of sniffing for queries where it does help.

## Real syntax

```sql
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 4;

ALTER DATABASE SCOPED CONFIGURATION
    SET LEGACY_CARDINALITY_ESTIMATION = ON;

ALTER DATABASE SCOPED CONFIGURATION
    SET PARAMETER_SNIFFING = OFF;

-- View current settings
SELECT * FROM sys.database_scoped_configurations;
```

Any of these can also be set `FOR SECONDARY`, giving a readable secondary replica in an
Availability Group different settings than the primary — useful when the secondary serves
a different workload, like reporting.

## Key terms

| Term | Meaning |
|---|---|
| Database-scoped configuration | Query-processing settings tunable per database since SQL Server 2016 |
| MAXDOP (database-scoped) | Overrides the server's max degree of parallelism for one database |
| LEGACY_CARDINALITY_ESTIMATION | Switches between the 2014+ and pre-2014 cardinality estimator per database |
| PARAMETER_SNIFFING | Turns off plan caching based on first-seen parameter values, per database |

## Check yourself

A shared instance hosts a wide-parallel reporting database and a latency-sensitive OLTP
database. Before SQL Server 2016, why was tuning MAXDOP for one a problem for the other,
and how does database-scoped configuration solve it?
