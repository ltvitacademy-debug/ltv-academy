# PostgreSQL Migration & Upgrade Strategies

This lesson closes out the PostgreSQL section of the course. Every PostgreSQL chapter since
Chapter 12 has built toward one practical question a DBA eventually has to answer: how do you
move a running PostgreSQL database to a new major version without either an unacceptable
outage or a leap of faith? PostgreSQL gives you two real strategies, and they trade off
downtime against operational complexity in opposite directions.

## What you'll learn

- Why PostgreSQL major-version upgrades are a bigger event than a SQL Server version upgrade
- `pg_upgrade` for in-place upgrades, and its two modes
- Using logical replication for a near-zero-downtime migration

## Why PostgreSQL major versions are a bigger deal

PostgreSQL's on-disk data format can change between major versions (PostgreSQL numbers major
versions as a single number — 15, 16, 17 — since the versioning scheme changed at version 10).
A new major version's server binaries generally cannot just start up against an old version's
data directory the way a SQL Server minor update might. That means a major-version upgrade is
never just "install the new binaries" — the data itself has to be converted or reloaded in some
form, which is exactly why PostgreSQL provides dedicated tooling for it rather than leaving it
to a generic backup-and-restore process.

## `pg_upgrade`: in-place upgrade

`pg_upgrade` is PostgreSQL's built-in tool for upgrading a data directory to a new major
version without a full logical dump-and-reload of every row. It runs against an old cluster
and a newly-initialized new-version cluster, and offers two modes:

- **Copy mode** (the default) — data files are copied from the old cluster to the new one in the
  new version's format. Safe and keeps the old cluster fully intact as a fallback, but copying
  every data file takes time roughly proportional to database size, meaning real downtime for
  a large database.
- **Link mode** (`--link`) — instead of copying data files, `pg_upgrade` hard-links them,
  which is dramatically faster since no data is physically rewritten. The tradeoff is that the
  old cluster is no longer usable as an independent fallback afterward, since both clusters
  now point at the same underlying files.

Either way, `pg_upgrade` is an in-place approach: there's a maintenance window during which the
database is unavailable while the upgrade runs, even though link mode makes that window much
shorter than copy mode or a full dump-and-reload.

## Logical replication: near-zero-downtime migration

For a near-zero-downtime approach, the tool is one you already have from Lesson 82: logical
replication. Because a logical subscriber doesn't need to match the publisher's PostgreSQL
major version, you can stand up a brand-new cluster on the target major version, create a
publication on the old cluster and a subscription on the new one, and let logical replication
catch the new cluster up while the old one keeps serving live traffic. Once the new cluster's
data is current, you cut application traffic over to it — a brief connection-switch rather than
a multi-hour maintenance window. This is significantly more operationally complex than
`pg_upgrade`: it means running two clusters side by side, watching replication lag before
cutover, and handling the same logical-replication limits from Lesson 82 (no automatic DDL
replication, sequences need separate handling). The same dump-and-reload idea using `pg_dump`
and `pg_restore` (Lesson 70) is also a valid migration path for a small enough database, at
the cost of the downtime a full dump and reload takes.

## Choosing between them

The real tradeoff is downtime versus complexity. `pg_upgrade` in link mode is fast and simple
for a maintenance window a business can tolerate. Logical replication is the right call when a
maintenance window isn't acceptable, at the cost of running and monitoring a temporary
side-by-side migration. Both approaches deserve the same discipline this whole path has
applied to every risky operation: test the upgrade path against a realistic copy of production
data before doing it for real, and have a rollback plan that doesn't depend on the migration
having gone perfectly.

## Key terms

| Term | Meaning |
|---|---|
| Major-version upgrade | Moving to a new PostgreSQL version number where the on-disk format may differ |
| `pg_upgrade` | Built-in in-place upgrade tool, run with copy mode or link mode |
| Copy mode | `pg_upgrade` default; copies data files, keeps old cluster as fallback, slower |
| Link mode | `pg_upgrade --link`; hard-links data files, much faster, no fallback cluster |
| Logical-replication migration | Standing up a new-version cluster as a subscriber, then cutting over traffic |

## Check yourself

A production database is 8 TB and the business has told you a maintenance window longer than
15 minutes isn't acceptable. Which upgrade strategy from this lesson fits that constraint, and
what extra operational work does it commit you to that `pg_upgrade` wouldn't?
