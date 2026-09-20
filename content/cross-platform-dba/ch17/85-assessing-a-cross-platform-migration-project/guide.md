# Assessing a Cross-Platform Migration Project

Chapter 16 closed out PostgreSQL. Every platform-specific chapter before this one taught
Oracle, MySQL, and PostgreSQL on their own terms — architecture, security, performance,
backup/recovery, HA. This chapter turns that knowledge into something practical: how do you
actually plan and execute a migration from SQL Server to one of these platforms? This lesson
covers the first, most-skipped step — assessing the project honestly before anyone commits to
a timeline.

## What you'll learn

- Why a real inventory of database objects comes before any migration estimate
- How to map dependencies that don't show up in a simple object list
- Why identifying features with no target-platform equivalent has to happen early
- How to build a timeline estimate that survives contact with reality

## Inventory: what's actually in the database

A migration estimate built without a real inventory is a guess wearing a spreadsheet. The
inventory has to list every object type, not just tables: tables and their row counts,
views, stored procedures, functions, triggers, SQL Agent jobs, linked servers, CLR
assemblies, Service Broker objects, full-text catalogs, and every login and permission grant.
Row counts and object counts both matter — a database with 40 tables and 300 stored
procedures is a very different project from one with 400 tables and 30 procedures, even if
both are "500 objects." Pull this inventory from `sys.objects`, `sys.tables`, and
`sys.sql_modules` directly, not from documentation, because documentation is usually stale
and undocumented objects are exactly the ones that break a migration late.

## Dependency mapping: what the inventory alone won't show

An object list tells you what exists. It doesn't tell you what depends on what. Three
dependency categories cause the most damage when missed:

- **Linked servers** — cross-server queries via `OPENQUERY` or four-part names. Every target
  platform handles cross-instance access differently (Oracle database links, PostgreSQL
  `postgres_fdw` or `dblink`, MySQL federated tables), and none of them are drop-in
  replacements for a SQL Server linked server.
- **Cross-database queries** — `SELECT ... FROM OtherDB.dbo.Table` inside a stored procedure
  is trivial in SQL Server and often impossible in the same form on the target. Oracle in
  particular has no concept of one instance hosting multiple independently-connectable
  databases the way SQL Server does; this alone can force a schema consolidation.
- **Application-embedded SQL** — hardcoded T-SQL inside application code, ORMs generating
  SQL Server-specific syntax, and reporting tools pointed directly at tables. None of this
  lives in the database, so it never shows up in a database-only inventory, and it's often
  the single largest source of rework in a real migration.

## Finding features with no target-platform equivalent — before the timeline, not during

Every SQL Server migration eventually runs into a feature the target platform simply
doesn't have in the same form: Service Broker, CLR integration, certain `FILESTREAM` usage,
specific SQL Agent job step types, or T-SQL syntax with no clean translation. The mistake
that wrecks timelines isn't hitting one of these — it's finding it six weeks into
development instead of during assessment. A deliberate pass through the inventory,
platform by platform, asking "does the target even have this concept" surfaces these gaps
while they're still a planning problem instead of a live production problem. Some gaps mean
a redesign; some mean a small piece stays on SQL Server permanently. Either way, that
decision belongs in the estimate, not discovered after it.

## Building a timeline that's honest, not optimistic

A credible estimate has to separate schema conversion, code conversion (procedures,
functions, triggers), data movement, application changes, testing, and a parallel-run or
cutover period — because each has a different multiplier once real dependencies surface.
Teams that estimate only "convert the schema" and extrapolate a total from that number are
almost always wrong, often by two or three times. A more honest approach: estimate each
category separately using the dependency map from above, add explicit time for the features
with no direct equivalent, and add a contingency buffer that scales with how much
application-embedded SQL was found — because that's the category assessment can most easily
undercount.

## Key terms

| Term | Meaning |
|---|---|
| Inventory | A complete list of database objects, by type and count, pulled from system catalogs |
| Dependency mapping | Identifying what objects, servers, and applications rely on each other |
| Feature parity gap | A source-platform feature with no direct equivalent on the target platform |
| Cutover | The point where production traffic moves from the old platform to the new one |

## Check yourself

Why is application-embedded SQL often the hardest dependency category to find during
assessment, and why does that make it the most dangerous one to underestimate?
