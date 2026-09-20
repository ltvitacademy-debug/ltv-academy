# Post-Install Configuration

## What you'll learn

- The real post-install checklist every production SQL Server instance needs
- Why tempdb's default single-file setup is wrong for most production servers
- Which settings ship with defaults that are safe, and which ship with defaults that are traps

## Setup finished — now the real configuration starts

Lesson 8 covered what the Setup wizard configures. This lesson covers what it doesn't: a short
list of settings that ship with out-of-box defaults tuned for "works everywhere," not for your
specific production server. Skipping this checklist is one of the most common reasons a
brand-new SQL Server install performs worse than it should from day one.

## Max server memory

Out of the box, max server memory is effectively unlimited — the Database Engine will consume
RAM until the OS is starved. Set it explicitly, leaving enough headroom for the OS itself and
any co-hosted services (Analysis Services, Integration Services, monitoring agents). A common
starting rule of thumb is total RAM minus 4-8 GB for the OS (more if other major services share
the box), then adjust based on observed memory pressure. Configure with:

```sql
EXEC sp_configure 'max server memory (MB)', 24576;
RECONFIGURE;
```

## Max degree of parallelism (MAXDOP)

Controls how many CPU cores a single query's parallel execution plan can use. Microsoft's
current general guidance (since SQL Server 2016, and refined since): for servers with 8 or
fewer logical cores, set MAXDOP up to the core count; for more than 8, cap it at 8 in most OLTP
scenarios, and tune from there per NUMA node boundaries and workload type. The out-of-box
default (0 = unlimited, any query can use every core) can let a single reporting query starve
concurrent OLTP work on the same box.

## Cost threshold for parallelism

Works together with MAXDOP: it's the estimated-cost threshold (in the optimizer's internal
cost units, not seconds) a query plan must exceed before the optimizer even considers a
parallel plan. The out-of-box default is **5**, set in the early 1990s for hardware nothing
like today's — it's far too low for modern servers, causing small, cheap queries to go parallel
unnecessarily. Common practice is raising it to somewhere in the 25-50 range and tuning from
observed workload behavior.

## TempDB file count and sizing

Out of the box, tempdb typically has one data file. Because every session on the instance can
use tempdb concurrently, a single data file becomes a point of contention — specifically on
allocation page contention (`PFS`/`GAM`/`SGAM` pages). Current Microsoft guidance: configure
multiple equally-sized tempdb data files, all pre-sized to the same size and with the same
autogrowth settings, generally starting around one file per logical core up to about 8 files
(revisit if contention persists past that). Equally sized matters because SQL Server's
proportional-fill algorithm allocates more heavily to larger files, defeating the point of
splitting them if they drift apart in size.

## Backup compression default

`backup compression default` controls whether new backups are compressed by default without
having to specify `WITH COMPRESSION` on every `BACKUP` statement. It's off by default in most
editions historically, though modern guidance is to turn it on for most workloads — compressed
backups are smaller and, counter-intuitively, often *faster* to write because there's less to
push to disk, at the cost of a bit more CPU during the backup. Set with:

```sql
EXEC sp_configure 'backup compression default', 1;
RECONFIGURE;
```

## Key terms

| Term | Meaning |
|---|---|
| Max server memory | Caps how much RAM the Database Engine can consume; unlimited by default |
| MAXDOP | Max degree of parallelism — cores available to one query's parallel plan |
| Cost threshold for parallelism | Optimizer cost a plan must exceed before parallelism is even considered |
| TempDB file count | Multiple equally-sized data files reduce allocation-page contention |

## Check yourself

A new SQL Server instance is running with every setting left at its out-of-box default. Which
one of the settings in this lesson is most likely to cause a visible performance problem first,
and why?
