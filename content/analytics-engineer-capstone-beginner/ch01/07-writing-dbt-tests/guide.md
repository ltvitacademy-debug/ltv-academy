# Lesson 7 — Writing dbt Tests

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 7 of 10**

## What you'll learn

- How to turn Lesson 1's vague "trust" into real, checkable `not_null` and `unique` tests
- The real `schema.yml` syntax, written against this project's own `customer_id` column
- How to run the tests and read a real pass/fail result
- What a failing test would actually look like, and why that's the point

## From "trustworthy" to two real tests

Lesson 1 defined trust concretely: every customer has a non-null customer ID, and every
customer ID is unique. This lesson is where that definition stops being a sentence and
becomes something dbt actually checks, every time the project runs — the same
`not_null`/`unique` pattern from the prerequisite dbt course, now written against this
project's real primary key.

## The real `schema.yml`

```yaml
# models/staging/jaffle_shop/stg_jaffle_shop__customers.yml
version: 2

models:
  - name: stg_jaffle_shop__customers
    description: One row per Jaffle Shop customer, lightly cleaned from raw_customers.
    columns:
      - name: customer_id
        description: The unique identifier for a customer.
        data_tests:
          - not_null
          - unique
      - name: first_name
        description: The customer's first name.
      - name: last_name
        description: The customer's last name.
```

Notice this lives in its own `.yml` file next to the staging model's `.sql` file, using
the same `data_tests:` key and the same two generic tests — `not_null` and `unique` —
from the prerequisite dbt course. Nothing about the syntax changes for a smaller project;
only the model and column names do.

## What each test actually checks

- **`not_null`** on `customer_id` — compiles to roughly
  `select * from stg_jaffle_shop__customers where customer_id is null`. If that query
  returns any rows, the test fails, and those rows are exactly the broken ones.
- **`unique`** on `customer_id` — checks for duplicate values in that column. If any
  customer ID shows up twice, the test fails, and dbt reports how many duplicates it
  found.

Both tests are really just `select` statements that should return zero rows — the same
mental model from the dbt course's testing chapter, applied here instead of staying
abstract.

## Running the tests

```bash
dbt test --select stg_jaffle_shop__customers
```

A clean run reports `PASS` for both tests:

```
1 of 2 PASS not_null_stg_jaffle_shop__customers_customer_id ... [PASS in 0.84s]
2 of 2 PASS unique_stg_jaffle_shop__customers_customer_id ..... [PASS in 0.79s]
```

## What a failure would look like

If the real `raw_customers` data had a blank `id` or a repeated one, the same run would
instead show a `FAIL` line with a nonzero failure count — for example,
`FAIL 1 unique_stg_jaffle_shop__customers_customer_id`, meaning one duplicate
`customer_id` exists. The honest move at that point isn't to delete the test; it's to go
look at the actual failing row with a `select` against the staging model and figure out
why the raw data has a duplicate, exactly the troubleshooting habit the dbt course's own
testing chapter taught.

## Why this is the whole point of the project

Lesson 1's Ops Manager didn't ask for a report — they asked for a list they could
**trust**. These two tests are the literal, checkable answer to that ask. Anyone at
Jaffle Shop can now see, at a glance, whether this table currently meets that bar, instead
of taking someone's word for it.

## Key terms

| Term | Meaning |
|---|---|
| `data_tests:` | The schema.yml key under which a column's generic tests are listed |
| `not_null` | Asserts a column has no null values |
| `unique` | Asserts a column has no duplicate values |
| `dbt test --select <model>` | Runs just the tests attached to one model |

## Lab

1. Create `models/staging/jaffle_shop/stg_jaffle_shop__customers.yml` in your own
   project, with the exact `not_null`/`unique` tests above on `customer_id`.
2. Run `dbt test --select stg_jaffle_shop__customers` and confirm both tests `PASS`
   against your own real data from Lesson 3.
3. Optionally, insert one duplicate `customer_id` directly into `raw_customers` in
   Snowflake, rebuild the staging model, rerun the tests, and read the real `FAIL` output
   — then remove the duplicate and confirm you're back to passing.

## Check yourself

You're ready for Lesson 8 when both tests pass against your own project, and you can
explain, from memory, what SQL each test roughly compiles down to and why a passing test
means that query returned zero rows.
