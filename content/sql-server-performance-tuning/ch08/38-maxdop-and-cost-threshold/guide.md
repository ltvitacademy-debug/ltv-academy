# MAXDOP & Cost Threshold for Parallelism

Chapter 7 was all about Query Store. This chapter turns to something that affects every
query on the instance whether Query Store is involved or not: how SQL Server decides whether
to split a query across multiple CPU cores, and how many cores it's allowed to use when it
does.

## What you'll learn

- What `max degree of parallelism` actually controls, and Microsoft's real sizing guidance
- What `cost threshold for parallelism` controls, and why its default is outdated
- How to set both with `sp_configure`, correctly

## Max degree of parallelism (MAXDOP)

`max degree of parallelism` caps how many logical processors a single query can use for a
parallel operation. It does **not** limit how many queries can run concurrently — it limits
how many threads *one* query's parallel operators can span.

Microsoft's current guidance, per the server's NUMA and core configuration:

- **Fewer than or equal to 8 logical processors, single NUMA node** — MAXDOP up to the number
  of logical processors.
- **More than 8 logical processors, single NUMA node** — MAXDOP of 8.
- **Multiple NUMA nodes, fewer than or equal to 8 logical processors per NUMA node** — MAXDOP
  up to the number of logical processors per NUMA node.
- **Multiple NUMA nodes, more than 8 logical processors per NUMA node** — MAXDOP of 8 (or a
  bit higher, tuned to the workload, but rarely beyond 8–16 even on large servers).

The instance-wide default is set with `sp_configure`:

```sql
EXEC sp_configure 'max degree of parallelism', 8;
RECONFIGURE;
```

It can also be overridden per database (SQL Server 2016+) or per query with a hint:

```sql
ALTER DATABASE CURRENT SET MAXDOP = 4;

SELECT * FROM Sales.SalesOrderDetail
OPTION (MAXDOP 1);
```

The right number isn't "as high as possible." Very high MAXDOP on a NUMA system can mean a
single query pulls threads across NUMA node boundaries, which introduces its own latency —
this is exactly why the guidance caps at the per-node processor count rather than the
system-wide total.

## Cost threshold for parallelism

`cost threshold for parallelism` sets the estimated-cost bar a query's plan has to clear
before the optimizer even *considers* going parallel at all. Below the threshold, SQL Server
always runs the query serially, regardless of `max degree of parallelism`.

```sql
EXEC sp_configure 'cost threshold for parallelism', 50;
RECONFIGURE;
```

The default value is **5** — a number set decades ago, on hardware that no longer resembles
anything running SQL Server today. On modern hardware, a default of 5 lets cheap, small
queries go parallel unnecessarily, burning CPU cycles on parallelism overhead (spawning
threads, coordinating results) for work that would've finished just as fast on one thread.
Values between **25 and 50** are common, reasonable starting points on modern hardware — the
right number for a specific workload still needs verifying against that workload's own query
cost distribution, not copied blindly from a blog post.

## Why both settings matter together

These two settings answer two different questions. Cost threshold decides *whether* a query
is even allowed to go parallel; MAXDOP decides *how wide* it's allowed to go once it does.
Getting cost threshold right without addressing MAXDOP (or vice versa) only solves half the
problem — a workload full of small, cheap OLTP queries mostly needs a sane cost threshold so
those queries stop going parallel at all, while a data warehouse full of large aggregations
mostly needs MAXDOP sized correctly for the actual queries that *should* be parallel.

## Key terms

| Term | Meaning |
|---|---|
| Max degree of parallelism (MAXDOP) | Caps how many logical processors one query's parallel operators can use |
| Cost threshold for parallelism | The estimated plan cost a query must exceed before the optimizer considers a parallel plan at all |
| NUMA node | A hardware grouping of processors and memory where local access is faster than cross-node access |
| Parallelism overhead | The CPU cost of spawning and coordinating parallel threads, wasted if the query didn't need to go parallel |

## Check yourself

A server has two NUMA nodes with 12 logical processors each. Per Microsoft's guidance
covered in this lesson, what MAXDOP value is generally appropriate, and why not simply set it
to 24 (the full processor count)?
