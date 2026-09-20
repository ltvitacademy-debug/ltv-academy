# Capstone: A Change Management Scenario

The blocking incident is closed, and it exposed something else: nobody at Meridian can tell you
what `DispatchDB`'s schema looked like six months ago, because changes have always gone straight
into production from SSMS with nothing saved. The next request — a real one — is your chance to
apply Chapter 9 and change that permanently.

## What you'll learn

- How to turn an ad hoc schema request into a version-controlled, reviewed migration
- How to write a rollback script before you need one, not after
- How to deploy a real change safely and verify it afterward

## The request

Meridian's compliance team needs every hazardous-materials load flagged so dispatch can route it
correctly. That means a new column on `dbo.Loads`, plus an index to support the app's new
"Hazmat only" filter:

```sql
ALTER TABLE dbo.Loads ADD HazmatFlag BIT NOT NULL CONSTRAINT DF_Loads_HazmatFlag DEFAULT (0);
CREATE INDEX IX_Loads_HazmatFlag ON dbo.Loads (HazmatFlag) INCLUDE (LoadID, Status);
```

Six months ago this would have been typed directly into a production query window. Instead, it
becomes migration script `0047_AddHazmatFlagToLoads.sql` in the `meridian-database-scripts`
repository — the version-control practice Chapter 9 covers, applied for the first time to
`DispatchDB`.

## Reviewed, tested, and reversible

The script goes through a pull request so a second set of eyes checks it before it goes
anywhere near production — is the default correct, does the new index actually match the
app's query pattern, is this the right table. It's applied first against a restored copy of
`DispatchDB` on a staging instance to confirm it runs clean and the app's new filter works
against it.

Before deployment, you write the rollback script alongside the forward one, not after
something goes wrong:

```sql
-- 0047_AddHazmatFlagToLoads_Rollback.sql
DROP INDEX IX_Loads_HazmatFlag ON dbo.Loads;
ALTER TABLE dbo.Loads DROP CONSTRAINT DF_Loads_HazmatFlag;
ALTER TABLE dbo.Loads DROP COLUMN HazmatFlag;
```

## Deploying it

The change goes out in a scheduled low-traffic window, wrapped so a failure partway through
doesn't leave `DispatchDB` in a half-changed state:

```sql
BEGIN TRANSACTION;
ALTER TABLE dbo.Loads ADD HazmatFlag BIT NOT NULL CONSTRAINT DF_Loads_HazmatFlag DEFAULT (0);
CREATE INDEX IX_Loads_HazmatFlag ON dbo.Loads (HazmatFlag) INCLUDE (LoadID, Status);
COMMIT TRANSACTION;
```

After it commits, you verify with a quick check against `sys.columns` and `sys.indexes`,
confirm DispatchTrack's new filter returns correct results in production, and record the
deployment — script number, date, who reviewed it, who ran it — in the change log that didn't
exist before Lesson 64. Six months from now, whoever inherits this from *you* will be able to
answer the question nobody could answer about `DispatchDB` on your first day.

## Key terms

| Term | Meaning |
|---|---|
| Migration script | A numbered, version-controlled script that applies one discrete schema change |
| Rollback script | The paired script that reverses a migration, written before deployment, not after a failure |
| Pull request review | Having a second person review a change before it's applied to production |
| Change log | A durable record of what changed, when, and by whom |

## Check yourself

Why does the rollback script for migration 0047 get written and reviewed *before* the forward
script is ever run against production — instead of being written only if something goes wrong?
