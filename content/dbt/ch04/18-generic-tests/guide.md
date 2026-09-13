# Lesson 18 — Generic Tests: not_null, unique, relationships

**Chapter 4 · Testing & Documentation · Lesson 18 of 45**

## What you'll learn

- The four generic tests dbt ships with, and exactly what each one
  asserts
- The real YAML syntax for attaching a test to a column in
  `schema.yml`
- How a generic test actually works under the hood — it's a `select`
  that should return zero rows
- What a real failing test looks like across a project, in dbt's own
  test-status view

## The four built-in generic tests

dbt ships with four generic tests out of the box — "generic" because
each one is a reusable, parameterized assertion you attach to any
column, rather than a one-off SQL query you write yourself (that's
next lesson's singular tests):

- **`not_null`** — the column contains no null values, ever.
- **`unique`** — the column contains no duplicate values.
- **`accepted_values`** — every value in the column comes from a
  supplied list you provide.
- **`relationships`** — referential integrity: every value in this
  column exists somewhere in another model's column (a foreign key
  that actually resolves).

## Real YAML syntax

Tests live in the same `schema.yml` file as model and column
descriptions (more on that pairing next lesson), under a `data_tests:`
key per column:

```yaml
models:
  - name: orders
    columns:
      - name: order_id
        data_tests:
          - unique
          - not_null
      - name: status
        data_tests:
          - accepted_values:
              arguments:
                values: ['placed', 'shipped', 'completed', 'returned']
      - name: customer_id
        data_tests:
          - relationships:
              arguments:
                to: ref('customers')
                field: id
```

Tests with no extra input (`unique`, `not_null`) are listed by name
alone. Tests that need input — `accepted_values`'s list of valid
values, `relationships`'s target model and field — take an
`arguments:` block.

## What's actually happening under the hood

Every generic test compiles down to the same idea: a `select`
statement that returns the rows that **violate** the assertion. If
that query returns zero rows, the test passes. If it returns any rows,
those rows are the failures, and dbt reports how many there were. A
`not_null` test on `order_id` compiles to roughly
`select * from orders where order_id is null` — if that returns
anything, something is null when it shouldn't be, and now you have the
actual failing rows, not just a red X.

## What a failing test looks like — and how to spot it across a project

Run `dbt test` and each test streams a `PASS` or `FAIL` line as it
executes, with the failure count and how long it took. But that's one
run — for a real project with dozens or hundreds of tests, you need to
see test health across everything at a glance. dbt Cloud's Catalog
gives you exactly that with a **Test Status lens** over the lineage
graph:

![The dbt Catalog Test Status lens over a real project's lineage graph — each model node carries a colored badge for its latest test status: Pass, Error, Fail, Warn, Skipped, or Reused.](/courses/dbt/ch04/18-generic-tests/test-status-lens.png)
*Every node in the DAG shows its own test status badge — a failing test is visible at a glance, right where it happened in the pipeline, not buried in a log.*
Source: [dbt Docs — Discover data with Catalog](https://docs.getdbt.com/docs/collaborate/explore-projects)

A non-zero failure count also means `dbt test` returns a non-zero exit
code — which is exactly what a CI/CD pipeline checks to decide whether
a pull request is safe to merge.

## Key terms

| Term | Meaning |
|---|---|
| Generic test | A reusable, parameterized assertion (not_null, unique, accepted_values, relationships) attached to a column in YAML |
| `data_tests:` | The schema.yml key under which a column's tests are listed |
| Test failure | Any row returned by the test's underlying select statement — the query should return zero rows to pass |
| Test Status lens | dbt Catalog's lineage-graph view showing each model's latest Pass/Fail/Error/Warn/Skipped status |

## Lab

1. Add `unique` and `not_null` tests to the primary key column of one
   of your Chapter 2 or 3 models.
2. Add a `relationships` test on a foreign key column, pointing at the
   model it should resolve against.
3. Run `dbt test` and read the output — then deliberately break one
   assertion (insert a duplicate key, if you're using seed data) and
   run it again to see a real `FAIL` line.

## Check yourself

You're ready for Lesson 19 when you can explain, in your own words,
why every generic test is really just a `select` statement that should
return zero rows — and what that implies about writing your own test
when none of the four built-ins fit.
