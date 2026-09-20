# Script — Testing Database Changes in a Pipeline

## Segment 1 (title)

CI validates that a schema builds — that it's internally consistent. That's not the same as knowing a migration actually behaves correctly once applied to a real database. That's the job of a testing stage, built around a genuinely throwaway test database.

## Segment 2 (code: spin up, migrate, test, tear down)

The pattern is spin up, migrate, test, tear down. A disposable test database is created fresh for the pipeline run, migrations are applied to it, smoke tests run against it, and then it's destroyed — every run starts from a clean slate.

## Segment 3 (code: a real smoke-test check)

A smoke test is a small, fast set of sanity checks, not exhaustive testing — confirming expected columns exist after migrations run, and calling a modified stored procedure with known inputs to check the output is sane.

## Segment 4 (steps: why building isn't enough)

Because the database is fresh every run, there's no risk of leftover test data or a prior failed run leaving things in a bad state — it proves the migrations work exactly the way a brand-new environment would actually experience them.

## Segment 5 (outro)

If a smoke test fails, the pipeline stops there, tied to the specific commit that caused it. Next up: rollback strategies for database deployments — down-migrations, and forward-fix-only when reversal isn't clean.
