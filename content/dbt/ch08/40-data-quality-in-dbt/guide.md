# Lesson 40 — Data Quality Patterns in dbt

**Chapter 8 · Semantic Layer & Advanced Patterns · Lesson 40 of 45**

## What you'll learn

- Severity levels — `error` vs. `warn` — and why not every failed
  assertion should block a build
- A few `dbt_utils` test macros beyond the modeling macros Lesson 31
  covered
- Source freshness checks, and why they catch a different kind of
  problem than `not_null`/`unique` ever could
- How to put error, warn, and freshness together into one real
  strategy, closing out everything Chapter 4 started

## Not every failed test should block the build

Lesson 18 showed the four generic tests and mentioned a `Warn` status
in the Test Status lens without explaining what produces it. Here's
the answer: every test's `severity` defaults to `error` — a failure
stops the build (and fails a CI check) — but you can downgrade it to
`warn`, which reports the failure without stopping anything:

```yaml
models:
  - name: orders
    columns:
      - name: notes
        data_tests:
          - not_null:
              config:
                severity: warn
```

Use `error` for assertions where a violation means the data is
actually wrong (`order_id` must be unique). Use `warn` for assertions
that flag something worth a human's attention but aren't automatically
a broken pipeline (a `notes` field being unexpectedly empty on a few
rows). Treating every assertion as equally critical trains a team to
ignore red CI checks — reserving `error` for genuine breakage is what
keeps a failing test meaningful.

## `dbt_utils` test macros

Lesson 31 covered `dbt_utils`'s *modeling* macros
(`generate_surrogate_key()`, `date_spine()`). The same package also
ships generic tests for assertions the four built-ins from Lesson 18
can't express:

```yaml
models:
  - name: fct_orders
    data_tests:
      - dbt_utils.equal_rowcount:
          arguments:
            compare_model: ref('stg_orders')
    columns:
      - name: order_id
        data_tests:
          - dbt_utils.not_null_proportion:
              arguments:
                at_least: 0.99
```

`equal_rowcount` asserts two models have the same row count — useful
right after a transformation that should only reshape data, never drop
rows. `not_null_proportion` is a looser cousin of Lesson 18's strict
`not_null`: "at least 99% populated" instead of "100% or fail," a
good fit paired with `severity: warn` for a column that's allowed a
few gaps.

## Freshness: catching a problem tests can't see

`not_null` and `unique` check the data that's *there*. They say
nothing about data that stopped arriving. **Source freshness** checks
that instead — how old is the newest row, compared to how old it's
allowed to be:

```yaml
sources:
  - name: crm
    tables:
      - name: customers
        loaded_at_field: updated_at
        freshness:
          warn_after: {count: 12, period: hour}
          error_after: {count: 24, period: hour}
```

Run it with `dbt source freshness`. If the CRM's data hasn't been
updated in 12 hours, that's a warning; past 24 hours, an error — the
kind of upstream pipeline failure that `not_null` tests would stay
completely silent about, because the stale rows that *are* there are
still perfectly valid, non-null rows.

## One real strategy, pulling it together

- **`error`** severity, strict tests (`unique`, `not_null` on keys) —
  for violations that mean the data is definitively wrong.
- **`warn`** severity, looser tests (`not_null_proportion`,
  `accepted_values` on a field still being cleaned up) — for things
  worth watching, not worth blocking a deploy over.
- **Freshness checks** on every source a schedule (Chapter 7's jobs)
  depends on — catching "the upstream pipeline silently stopped"
  before it ever reaches a test.

## Key terms

| Term | Meaning |
|---|---|
| `severity: warn` | Downgrades a test failure to a warning — reported, but doesn't fail the build |
| `dbt_utils.equal_rowcount` | Asserts two models have the same row count |
| `dbt_utils.not_null_proportion` | Asserts at least a given percentage of a column is non-null |
| Source freshness | Checks how old the newest source row is, against `warn_after`/`error_after` thresholds |

## Lab

1. Take one existing test in your project and add `severity: warn` to
   it — decide, in one sentence, why that assertion doesn't need to
   block a build.
2. Add a `dbt_utils.equal_rowcount` test between a staging model and
   its source, confirming row counts match after a pure reshape.
3. Add a `freshness` block to one source, run `dbt source freshness`,
   and read the resulting Pass/Warn/Error output.

## Check yourself

You're ready for the Capstone (Chapter 9) when you can explain the
difference between a test that should `error` and one that should
`warn` — and why freshness checks catch a failure mode ordinary column
tests structurally cannot.
