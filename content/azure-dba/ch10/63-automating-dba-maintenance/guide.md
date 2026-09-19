# Lesson 63 — Automating DBA Maintenance

**Chapter 10 · SQL Server Agent & Automation · Lesson 63 of 95**

## What you'll learn

- Turning Chapter 9's manual maintenance tasks into scheduled Agent jobs
- Ola Hallengren's maintenance solution — the real, widely-used community standard, not a from-scratch reinvention
- Sequencing maintenance correctly: order and timing genuinely matter
- Where Managed Instance/VM-hosted automation differs from Azure SQL Database's own built-in defaults

## What actually needs automating

Chapters 8-9 taught index maintenance (Lesson 53), statistics
maintenance (54), DBCC CHECKDB (55), and finding resource bottlenecks
(58) — all things a DBA can run by hand once, but nobody actually
wants to run by hand every week across dozens of databases. That's
exactly what Lesson 60's job/step/schedule pattern exists for.

```sql
EXEC dbo.sp_add_job @job_name = N'Nightly Maintenance - Index Rebuild';

EXEC dbo.sp_add_jobstep
    @job_name = N'Nightly Maintenance - Index Rebuild',
    @step_name = N'Rebuild fragmented indexes',
    @subsystem = N'TSQL',
    @command = N'EXEC dbo.RebuildFragmentedIndexes;';

EXEC dbo.sp_add_schedule
    @schedule_name = N'Nightly2AM',
    @freq_type = 4, @freq_interval = 1,
    @active_start_time = 020000;
```

## Don't reinvent this from scratch: Ola Hallengren's solution

In practice, almost nobody hand-writes their own index/statistics/
integrity-check maintenance scripts from zero. **Ola Hallengren's
Maintenance Solution** is the real, widely-adopted, free, open-source
standard the SQL Server community has converged on for exactly this
— covering index optimization (smart REBUILD vs. REORGANIZE decisions
based on actual fragmentation level, not a blanket rule), statistics
updates, and integrity checks, all driven by well-tested stored
procedures you install once and schedule.

Knowing this exists — and that recreating it yourself is usually
wasted effort — is itself a real, practical piece of DBA knowledge,
not a shortcut around understanding Lesson 53's REBUILD/REORGANIZE
trade-off. You still need that understanding to configure Hallengren's
thresholds sensibly.

## Sequencing matters

Maintenance jobs aren't independent — running them in the wrong order
wastes work or causes contention:

```
1. Integrity check (DBCC CHECKDB) FIRST
   -- no point optimizing indexes on a corrupted database
2. Index maintenance SECOND
   -- rebuilding an index also updates its statistics as a side effect
3. Statistics maintenance THIRD
   -- catches any tables whose indexes weren't touched in step 2
```

Running index maintenance before an integrity check, or scheduling
two maintenance jobs to overlap on the same tables, is a real,
common mistake this ordering avoids.

## Managed Instance/VM vs. Azure SQL Database

Lesson 59 already flagged the real platform difference: Azure SQL
Database has limited native Agent support, so a lot of what this
lesson describes applies most directly to Managed Instance or
VM-hosted SQL Server. For Azure SQL Database specifically, Microsoft
already automates much of Chapter 9's maintenance (index/statistics
maintenance happens automatically to a meaningful degree) — a DBA's
job there shifts toward *verifying* that automation is working, not
scheduling it from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Ola Hallengren's Maintenance Solution | The widely-adopted, free, community-standard SQL Server maintenance script set |
| Maintenance sequencing | Integrity check, then index maintenance, then statistics — order genuinely matters |

## Check yourself

You're ready for Lesson 64 when you can explain, without looking: why
does running an integrity check before index maintenance matter, and
why does index maintenance update statistics as a side effect?
