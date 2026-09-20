# Testing Upgrades

## What you'll learn

- How to actually build a realistic upgrade test, not just "install it and see"
- Why restoring real production backups to a staging instance is the core of that test
- How Query Store's plan-comparison feature catches regressions that would otherwise only
  surface after the real upgrade is in production

## Test with real data, not a guess

The only trustworthy way to test an upgrade — whether it's a Cumulative Update or a major
version jump — is to restore an actual, current production backup onto a staging instance
running the target version, and run the real application workload against it. A test database
seeded with a handful of made-up rows will not surface the problems that matter: skewed data
distributions that change the optimizer's row estimates, index fragmentation patterns that
change plan choices, or query patterns that only show up under production-scale volume and
concurrency.

A reasonable test setup:

1. Take (or use the most recent) full backup of the production database.
2. Restore it to a staging/test instance already running the target SQL Server version or CU.
3. Point a copy of the application — or at minimum, a captured/replayed set of representative
   queries — at that restored database.
4. Run the workload and watch for errors, unacceptable slowdowns, and behavior changes, not
   just "does it start."

This is exactly why side-by-side migration and a disciplined patch cadence (previous two
lessons) matter: they give you a target instance to restore into and time to actually do this
testing before production is touched.

## Query Store: catching regressions instead of guessing at them

**Query Store**, once enabled on a database, continuously records the execution plans and
runtime statistics (duration, CPU, reads) for the queries that run against it. Its real value
for upgrade testing is direct plan comparison: capture the query performance profile before the
upgrade (or on the still-running old instance), then run the same workload against the
upgraded/restored copy and compare.

Query Store's "Regressed Queries" report, available in SSMS, ranks queries by how much their
performance changed and shows the old plan next to the new plan side by side. This turns "the
app feels slower after the upgrade" — a vague, hard-to-act-on complaint — into a specific list
of queries with specific plan changes, which you can then act on: force the old plan
temporarily with `sp_query_store_force_plan`, update statistics, or add a missing index, all
before the change ever reaches production.

## What "passing" the test actually means

A test upgrade "passes" when: the application functions correctly end-to-end, no query shows an
unacceptable regression in Query Store's comparison, and any deprecated-feature or
breaking-change items flagged earlier (Data Migration Assistant, from Lesson 60) have been
addressed or confirmed as non-issues. "It installed without errors" is not a passing test — it's
the bare minimum starting point.

## Key terms

| Term | Meaning |
|---|---|
| Staging/test instance | A non-production instance running the target version, used to validate an upgrade before production |
| Query Store | Feature that records historical execution plans and runtime stats per query, enabling before/after comparison |
| Regressed Queries report | Query Store's SSMS report ranking queries by performance change, with old vs. new plan side by side |
| `sp_query_store_force_plan` | Procedure to force a specific historical plan for a query, useful as a stopgap after a regression |

## Check yourself

Why is restoring an actual production backup to staging a better upgrade test than creating a
fresh, empty database on the new version and running a handful of sample queries against it?
