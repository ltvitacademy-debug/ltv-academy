# Database Migrations as Code

Lesson 18 introduced the migration-runner category as an alternative to DACPAC deployment.
This lesson goes into exactly how that pattern actually works — the mechanism nearly every
real migration tool implements, whether it's a popular open-source library or a
hand-rolled internal script.

## What you'll learn

- The numbered, sequential migration script pattern
- The migrations-tracking table, and why it's the mechanism that makes "don't run this
  twice" actually work
- Why migrations are additive by convention, and what that means in practice

## Numbered, sequential scripts

The core idea is simple: every schema change is its own small script, numbered in the order
it needs to run.

```text
migrations/
├── 0001_create_orders_table.sql
├── 0002_create_customers_table.sql
├── 0003_add_status_column_to_orders.sql
└── 0004_add_index_on_orders_customerid.sql
```

Each file is self-contained and does one thing. `0003` assumes `0001` has already run
(the `Orders` table exists) and adds a column to it. The numbering is what guarantees every
environment applies changes in the exact same order, regardless of which branch or PR each
one originally came from — this is the concrete answer to the sequencing problem Lesson 15
raised.

## The migrations-tracking table

The mechanism that makes this safe to run repeatedly is a small table, typically something
like `__MigrationHistory` or `SchemaVersions`, that lives in the target database itself and
records which migration numbers have already been applied there.

```sql
CREATE TABLE dbo.__MigrationHistory (
    MigrationId    VARCHAR(50)  NOT NULL PRIMARY KEY,
    AppliedAtUtc   DATETIME2    NOT NULL DEFAULT SYSUTCDATETIME()
);
```

A migration runner's actual logic, every time it runs, is: read this table, see which
migration numbers are already recorded, and apply — in order — only the ones that
aren't. That's what makes it safe to run the exact same pipeline step against a database
that's already fully up to date: nothing happens, because everything's already recorded as
applied. It's also what makes it safe to run against a brand-new empty database: every
migration runs, in order, from `0001` onward.

## Why migrations are additive

Because migration `0003` has already run against real environments once it's merged and
deployed anywhere, you don't go back and edit `0003` after the fact, even to fix a mistake
in it — anyone who already ran the old version of `0003` has a database that doesn't match
the new one, and the tracking table would (wrongly) tell them it's already applied. The
correct fix for a mistake in an already-applied migration is a new migration —
`0005_fix_status_column_default.sql` — that corrects the problem going forward. This is the
same principle Lesson 15 raised about branches: once something has run against real data,
it becomes a fact you build on top of, not something you rewrite.

## Key terms

| Term | Meaning |
|---|---|
| Migration script | A single numbered, sequential script that makes one schema change |
| Migrations-tracking table | A table in the target database recording which migration numbers have already been applied there |
| Additive migrations | The convention of never editing an already-applied migration, only adding new ones to fix problems |

## Check yourself

A developer notices migration `0003_add_status_column_to_orders.sql` has a typo in the
default value it sets. Why is editing that file directly the wrong fix once it's already
been deployed anywhere, and what should the developer do instead?
