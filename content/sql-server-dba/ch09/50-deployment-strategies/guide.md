# Deployment Strategies

Getting schema into source control (Lesson 49) answers *where the truth lives*. This lesson
answers the next question: how does that truth actually get pushed to a real database without
breaking it.

## What you'll learn

- The spectrum of deployment approaches, from fully manual to fully automated
- How DACPAC-based deployment works and what it buys over manual scripts
- What migration-based tools are, as a category, and how they differ from DACPACs
- Why zero-downtime schema changes need their own pattern (expand-contract)

## Manual scripted deployment

The most basic approach is exactly what it sounds like: a DBA (or a developer, reviewed by a
DBA) writes a `.sql` change script by hand — `ALTER TABLE ... ADD`, a new `CREATE PROCEDURE` —
and runs it against each environment in order: dev, then test, then production. This is
completely viable for a small team with infrequent changes, and it has one real advantage:
a human reads every line before it runs, so subtle issues (a missing index on a new foreign
key, a column being added `NOT NULL` to a table with existing rows) get caught by inspection.

It doesn't scale well. As the number of environments and the frequency of releases grow, manual
scripting becomes error-prone and slow — it's easy to run script 7 but skip script 6 in one
environment, and now that environment's schema no longer matches anywhere else. That's exactly
the schema drift problem covered in Lesson 53.

## DACPAC-based deployment

Building on an SSDT database project, a **DACPAC** (data-tier application package) is a
compiled snapshot of the intended schema. Deploying it doesn't mean running a change script by
hand — `sqlpackage.exe` (or the equivalent SSDT publish action) compares the DACPAC against the
live target database and generates the diff script automatically, then runs it. The DBA
reviews the generated diff (or a report of it) rather than hand-writing the change. This removes
the "did I run every script in order" risk, because the tool is comparing against the actual
current state of the target, not assuming it knows what state the target is in.

The tradeoff: DACPAC deployment is schema-only. It's excellent for tables, views, and procedures,
but it isn't designed to carry data migrations (backfilling a new column, splitting a table) —
that logic still needs to be scripted separately and coordinated with the deployment.

## Migration-based tools

A different category of tooling — the kind of role that tools like Flyway, Liquibase, or DbUp
fill — takes a version-based approach instead of a state-based one. Rather than comparing
"what should this look like" against "what does it look like now," each schema change is
written as a small, numbered migration script, and the tool keeps a table in the database
recording which migrations have already run. Deploying means running any migrations that
haven't executed yet, in order. This model is popular because it naturally handles both schema
changes and small data changes in the same numbered sequence, and it works well in CI/CD
pipelines where deployments are frequent and fully automated. The honest tradeoff versus a
DACPAC is that migrations are one-directional by design — you write the change, and rolling it
back means writing and running a separate "down" migration, not just re-deploying an older
DACPAC.

## Zero-downtime deployment: expand-contract

For a table under active read/write load, some schema changes (renaming a column, changing a
data type) cannot happen as a single instant operation without briefly blocking or breaking the
application. The **expand-contract** pattern splits the change into safe stages: *expand* by
adding the new column/structure alongside the old one and writing to both, *migrate* the
application to read from the new structure once it's fully populated, then *contract* by
dropping the old structure only after nothing depends on it anymore. It takes longer than a
single `ALTER`, but nothing is ever down.

## Key terms

| Term | Meaning |
|---|---|
| Manual scripted deployment | Hand-written change scripts run in order across environments |
| DACPAC | A compiled snapshot of intended schema; deployment tools diff it against the live database |
| Migration-based tool | A category of tools (e.g., Flyway, Liquibase, DbUp) tracking numbered, one-directional migration scripts |
| Expand-contract | A staged pattern for zero-downtime schema changes: add new, migrate usage, then remove old |

## Check yourself

A team deploys several times a day through CI/CD and wants both schema and small data changes
tracked in the same sequence. Would a DACPAC-based approach or a migration-based tool fit that
workflow better, and why?
