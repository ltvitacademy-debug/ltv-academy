# SQL Server Upgrade Planning

## What you'll learn

- The two real paths to a new SQL Server version: in-place upgrade vs. side-by-side migration
- Why compatibility level is a separate decision from the physical upgrade, and why leaving it
  at the old level for a while is a normal, deliberate choice
- How to find deprecated and breaking-change risks before you touch production, using the
  Data Migration Assistant

## In-place upgrade vs. side-by-side migration

There are only two real ways to move an instance to a new major version.

An **in-place upgrade** runs the new version's setup.exe against the existing instance. It
replaces the binaries, upgrades system databases, and leaves user databases attached — same
server name, same instance name, same connection strings. It's fast and low-effort, but it's
also the riskiest: there's no easy way back, downtime is mandatory for the duration of the
upgrade, and you're upgrading the OS-level SQL Server install itself, warts and all.

A **side-by-side migration** installs the new version somewhere else — a new server, a new
instance, or even the same box on a different port — and moves databases over with a backup
and restore (or detach/attach, or log shipping for minimal downtime). The old instance keeps
running the whole time. If anything is wrong with the new instance, you just point applications
back at the old one. This is the safer path, and it's the one most production shops use for a
major version jump, even though it means more work: new connection strings, re-pointing
SSIS/Agent jobs, re-creating logins, and coordinating a cutover.

For anything business-critical, side-by-side is the default answer. In-place upgrades are
reasonable for lower-stakes systems, dev/test environments, or when downtime is cheap and a
tested backup already exists as the fallback.

## Compatibility level: a separate dial from the version

The physical version of SQL Server and a database's **compatibility level** are two different
things, and conflating them is a common upgrade mistake. Compatibility level is set per
database:

```sql
ALTER DATABASE Sales SET COMPATIBILITY_LEVEL = 150; -- SQL Server 2019 behavior
```

When you upgrade an instance in place — say from 2017 to 2022 — the databases *keep their old
compatibility level* by default. That's not an oversight; it's a real, common practice. A new
compatibility level activates a new cardinality estimator and new query optimizer behaviors,
and those can cause plan regressions on workloads that were tuned against the old optimizer.
Leaving compatibility level at the pre-upgrade value for a period after the physical upgrade
gets you the new engine's stability, performance, and security fixes immediately, while
deferring the optimizer-behavior change until you've had time to test it deliberately — often
using Query Store to compare plans before and after the bump (more on that in the next lesson).
Only raise compatibility level as its own, separate, tested step.

## Finding deprecated features and breaking changes

Every major version removes or changes something. Some deprecated features throw warnings for
years before removal; others change behavior silently. Before any major-version upgrade,
Microsoft's real, free tool for this is the **Data Migration Assistant (DMA)**. Point it at the
source instance and it produces an assessment report: deprecated features in use, breaking
changes that will affect the databases, and behavior-change warnings, all before you've touched
anything. DMA also assesses migration compatibility if the target is Azure SQL Database or
Managed Instance, but its on-prem-to-on-prem assessment is just as useful for planning an
in-place or side-by-side upgrade between two on-prem versions.

Run DMA's assessment against every database you plan to move, read the report before scheduling
any downtime, and treat anything flagged as "will break" as a blocker, not a footnote.

## Key terms

| Term | Meaning |
|---|---|
| In-place upgrade | Running new-version setup against an existing instance; same instance, no easy rollback |
| Side-by-side migration | Standing up a new instance and moving databases via backup/restore; old instance stays as fallback |
| Compatibility level | A per-database setting controlling optimizer/cardinality-estimator behavior, independent of the physical engine version |
| Data Migration Assistant (DMA) | Microsoft's free tool that assesses a database for deprecated features and breaking changes before an upgrade |

## Check yourself

Why would a DBA deliberately leave a database's compatibility level at its pre-upgrade value
for weeks after an in-place upgrade, instead of raising it to match the new engine right away?
