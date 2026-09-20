# Rollback Strategies for Database Deployments

The SQL Server DBA course covered rollback as an operational concept — what a DBA does
when a deployment goes wrong. This lesson expands that specifically for a CI/CD context:
what a rollback actually looks like when the deployment itself was automated, and the real
limits on what "rollback" can even mean once a migration has touched real data.

## What you'll learn

- The paired down-migration pattern, and exactly what it can and can't undo
- Why some schema changes are genuinely hard or impossible to cleanly reverse
- Forward-fix-only as a legitimate, honest strategy for those cases

## Paired up/down migrations

The cleanest rollback strategy is to write a **down-migration** alongside every
**up-migration** — a script that reverses exactly what the up-migration did.

```text
migrations/
├── 0003_add_status_column_to_orders.sql        (up: adds the column)
└── 0003_add_status_column_to_orders.down.sql   (down: drops the column)
```

```sql
-- 0003_add_status_column_to_orders.sql (up)
ALTER TABLE dbo.Orders ADD Status VARCHAR(20) NOT NULL DEFAULT ('Pending');

-- 0003_add_status_column_to_orders.down.sql (down)
ALTER TABLE dbo.Orders DROP COLUMN Status;
```

If a deployment needs to be undone, the pipeline runs the down-migration instead of a
manual, improvised fix. This works cleanly for additive changes like this one — adding and
then dropping a column is a fully symmetric operation as long as nothing has started
depending on that column's data yet.

## Where clean reversal breaks down

Not every change is symmetric. If migration `0003` adds the `Status` column and, a week
later, real orders have been placed with real status values in it, "rolling back" by
dropping the column doesn't just undo a schema change anymore — it destroys real data that
now exists because of decisions made after the migration ran. A down-migration for a
`DROP COLUMN` that already has meaningful data in it, or for a migration that merged two
tables together, isn't a clean mechanical reversal; it's a data-loss decision dressed up as
one.

## Forward-fix-only

For changes where clean reversal genuinely isn't possible without losing real data, the
honest strategy is **forward-fix-only**: rather than attempting to un-deploy a migration
that's already touched live data, you deploy a *new* migration that fixes the actual
problem going forward — the same additive principle Lesson 19 established for migrations
generally. If a bad migration broke a stored procedure, the fix is a new migration that
corrects the procedure, not an attempt to travel backward in time to a state that, in
practice, no longer safely exists.

## Choosing the strategy up front

The decision about which strategy applies belongs in code review (Lesson 16), not
discovered during an actual incident: a reviewer looking at a migration that adds a column
with no meaningful data risk can reasonably expect a working down-migration; a reviewer
looking at a migration that drops a column or reshapes a table should flag, explicitly,
that this change has no clean rollback and that forward-fix is the only realistic recovery
path if something goes wrong.

## Key terms

| Term | Meaning |
|---|---|
| Down-migration | A script that reverses a specific up-migration's schema change |
| Symmetric change | A schema change (like adding then dropping a column) that can be cleanly reversed as long as no dependent data exists yet |
| Forward-fix-only | Deploying a new migration to correct a problem, rather than attempting to reverse a migration that's already touched real data |

## Check yourself

A migration adds a `Status` column to `Orders`, and two weeks later, thousands of real
orders have meaningful status values in that column. Why would running the paired
down-migration at this point be the wrong move, and what should the team do instead?
