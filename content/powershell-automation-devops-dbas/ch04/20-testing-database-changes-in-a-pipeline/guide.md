# Testing Database Changes in a Pipeline

CI (Lesson 17) validates that a schema builds. That's necessary, but it's not the same
thing as knowing the migration actually behaves correctly once applied to a real database
with real-ish data in it. That's the job of a testing stage in the pipeline, and the real
pattern behind it is a genuinely throwaway test database.

## What you'll learn

- Why a build succeeding isn't proof a migration actually works correctly
- The spin-up → migrate → smoke-test → tear-down pattern
- What a real smoke-test query set actually checks

## Why a successful build isn't enough

Building the `.sqlproj` (Lesson 17) confirms the schema is internally consistent — no
dangling references, nothing that fails to parse. It says nothing about whether the
migration that adds a column actually runs to completion without error, whether a
default value backfills correctly, or whether a stored procedure that got modified still
returns sane results. Those questions require actually running the migration and the
resulting objects against a database, not just parsing the scripts that define them.

## Spin up, migrate, test, tear down

The pattern that makes this practical in an automated pipeline is to use a genuinely
disposable test database that exists only for the duration of the pipeline run:

```yaml
# Conceptual pipeline stage
- name: Spin up test database
  run: sqlcmd -S localhost -Q "CREATE DATABASE PipelineTestDb"

- name: Apply migrations
  run: ./run-migrations.ps1 -Database PipelineTestDb

- name: Run smoke tests
  run: ./smoke-tests.ps1 -Database PipelineTestDb

- name: Tear down test database
  run: sqlcmd -S localhost -Q "DROP DATABASE PipelineTestDb"
```

Because the database is created fresh and destroyed at the end of every run, there's no
risk of test data accumulating or a prior failed run leaving the environment in a bad
state — every pipeline run starts from nothing and proves the migrations work from a clean
slate, which is exactly the scenario a brand-new environment would actually face.

## What a smoke-test query set checks

A **smoke test** here means a small, fast set of sanity checks, not exhaustive testing —
enough to catch an obviously broken migration or object before it goes anywhere real.
Concretely, that means things like: confirming every expected table and column actually
exists after the migrations run, inserting a representative row and confirming a
constraint or default behaves as expected, and calling a modified stored procedure with
known inputs and checking the output is what it should be.

```sql
-- Example smoke-test checks after migrations run
SELECT COUNT(*) FROM sys.columns
WHERE object_id = OBJECT_ID('dbo.Orders') AND name = 'ShippingZone';
-- expect 1

EXEC dbo.usp_GetOrderTotals @OrderId = 1;
-- expect a single row, non-negative Total
```

If any smoke test fails, the pipeline stops there — the change never reaches production,
and the failure is visible immediately, tied to the specific commit that caused it, rather
than surfacing later as a mysterious production bug.

## Key terms

| Term | Meaning |
|---|---|
| Throwaway test database | A database created fresh for a single pipeline run and destroyed afterward |
| Smoke test | A small, fast set of sanity checks confirming the basics work, not exhaustive testing |
| Pipeline stage | One discrete automated step in a CI/CD pipeline, such as spin-up, migrate, test, or tear-down |

## Check yourself

Why does spinning up a brand-new, empty test database for every pipeline run (rather than
reusing one long-lived test database) give you a more reliable test of whether a migration
actually works?
