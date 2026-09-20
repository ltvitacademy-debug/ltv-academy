# SQL*Plus, SQL Developer & Oracle Enterprise Manager

Chapter 2 closes with the tools a DBA actually opens day to day. Oracle's tooling landscape maps
loosely onto the SQLCMD / SSMS / monitoring-dashboard split a SQL Server DBA already knows — but
each tool has its own real identity, purpose, and audience, and it's worth knowing which one to
reach for.

## What you'll learn

- SQL*Plus, Oracle's original command-line client
- SQL Developer, Oracle's free GUI IDE
- Oracle Enterprise Manager, Oracle's monitoring and management platform
- Which tool fits which task, and roughly how each maps to something SQL Server-familiar

## SQL*Plus: the command-line client

**SQL*Plus** is Oracle's original command-line interface, shipping with the database and client
installs since long before any GUI tool existed. It runs SQL and PL/SQL directly, and it's the
tool most DBA scripts, health checks, and administrative one-liners are still written for —
scriptable, always available, and not dependent on a GUI being installed at all.

A typical SQL*Plus session looks like:

```
sqlplus hr@orclpdb

SQL> SELECT table_name FROM user_tables;
SQL> EXIT;
```

For a SQL Server DBA, SQL*Plus is the closest thing to `sqlcmd` — a lightweight, always-there,
script-friendly way to run SQL against the database, without a GUI in the way.

## SQL Developer: the free GUI IDE

**SQL Developer** is Oracle's free graphical IDE — a Java-based application for browsing schema
objects, writing and running SQL and PL/SQL, and doing general development work against an
Oracle database. It plays a role loosely similar to SQL Server Management Studio (SSMS): a
visual tree of schemas and objects, a query editor with syntax highlighting, and result grids —
though SQL Developer leans more toward the developer's day-to-day work than toward deep DBA
administration, even though it does include some DBA-oriented features (like a Data Modeler and
basic DBA navigator panels).

## Oracle Enterprise Manager: monitoring and management

**Oracle Enterprise Manager (OEM)** is Oracle's monitoring and management platform, and it comes
in two different weights:

- **EM Express** — a lightweight, web-based console bundled with the database itself, useful for
  basic monitoring and administration of a single database without installing anything extra.
- **Enterprise Manager Cloud Control** — a full, separately-installed enterprise product for
  monitoring and managing many databases (and other Oracle targets) across an organization —
  dashboards, alerting, performance history, patching — the kind of thing an enterprise DBA team
  runs centrally rather than something every DBA installs individually.

The SQL Server-familiar comparison here is looser: OEM's role spans what a SQL Server shop might
split across SSMS's Activity Monitor, SQL Server Agent alerts, and a separate enterprise
monitoring product — Oracle bundles considerably more of that under one product family.

## Choosing the right tool

- Writing an admin script or a quick one-off query → **SQL*Plus**.
- Browsing schema objects, developing and testing SQL/PL-SQL day to day → **SQL Developer**.
- Watching performance, health, and alerts across one or many databases → **Oracle Enterprise
  Manager** (EM Express for one database, Cloud Control for many).

## Key terms

| Term | Meaning |
|---|---|
| SQL*Plus | Oracle's original command-line client for running SQL and PL/SQL |
| SQL Developer | Oracle's free, Java-based GUI IDE for schema browsing and SQL/PL-SQL development |
| Oracle Enterprise Manager (OEM) | Oracle's monitoring/management platform, spanning EM Express (single database) and Cloud Control (enterprise-wide) |
| EM Express | Lightweight, web-based console bundled with the database for basic monitoring |

## Check yourself

You need to write a repeatable admin script, browse a schema's objects interactively, and check
whether a database's performance has degraded over the last week. Name the one tool from this
lesson best suited to each of those three tasks.
