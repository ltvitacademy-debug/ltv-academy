# Course Introduction: From SQL Server DBA to Cross-Platform DBA

This course closes out the SQL Server Database Administrator career path — but it isn't
another SQL Server course. Everything from T-SQL Development through PowerShell
Automation & DevOps for DBAs built deep, real SQL Server expertise. This course asks a
different question: what happens when the job also includes Oracle, MySQL, or
PostgreSQL, because that's what the company actually runs?

## What you'll learn

- Why this course exists at the end of a SQL Server-focused path, not the beginning
- What genuinely transfers from SQL Server DBA work, and what doesn't
- The three platforms this course covers, and why these three specifically

## Real DBAs rarely get to specialize in only one platform

A "SQL Server DBA" job posting is common, but a huge number of real DBA roles — especially
at mid-size companies without a dedicated team per platform — expect one person to keep
several different database engines healthy. A company that grew through acquisition might
run SQL Server for its ERP, Oracle for a legacy finance system nobody wants to touch, and
PostgreSQL for a newer internal tool. That DBA doesn't get to say "I only do SQL Server."

## What actually transfers, and what doesn't

Every DBA instinct built across this path — measure before you change something, a
recovery model determines what's restorable, indexes trade write cost for read speed,
replication has a consistency/latency tradeoff, an untested backup isn't a real backup —
transfers directly. Those are relational database facts, not SQL-Server-specific facts.

What doesn't transfer is syntax, tooling, and architecture detail: Oracle's SGA/PGA memory
model isn't SQL Server's buffer pool wearing a different name, RMAN isn't BACKUP DATABASE
with different keywords, and PostgreSQL's MVCC and VACUUM process solve a problem SQL
Server's locking model doesn't even have. This course teaches each platform on its own
terms — the same discipline this whole path applied when Azure Database Administrator
didn't just relabel on-prem SQL Server concepts for the cloud.

## Why Oracle, MySQL, and PostgreSQL specifically

These three, alongside SQL Server, cover the large majority of real-world relational
database deployments a DBA is actually likely to encounter. Oracle dominates large
enterprise and legacy systems; MySQL is everywhere in web applications and is one of the
most widely deployed open-source databases in the world; PostgreSQL has become the
default choice for new open-source projects and is increasingly common in enterprise
environments too. Deep, credible exposure to these three — not just a surface-level
comparison table — is what this course delivers, platform by platform, before a final
chapter on cross-platform migration and a capstone project running all three side by side.

## Key terms

| Term | Meaning |
|---|---|
| Relational concept | A database idea true across engines (indexes, transactions, backups) |
| Platform-specific detail | Syntax, architecture, or tooling unique to one database engine |
| RDBMS | Relational Database Management System — the category SQL Server, Oracle, MySQL, and PostgreSQL all belong to |

## Check yourself

Name one DBA instinct from earlier in this path that you'd expect to transfer directly to
Oracle, and one specific piece of SQL Server knowledge you'd expect to be useless there.
