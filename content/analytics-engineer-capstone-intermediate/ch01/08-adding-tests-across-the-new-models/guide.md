# Lesson 8 — Adding Tests Across the New Models

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 8 of 16**

## What you'll learn

- Which generic tests belong on which new model, and why
- Real `schema.yml` syntax for `not_null`, `unique`, and
  `accepted_values`
- How a `relationships` test ties `fct_orders.customer_id` back to the
  customers mart
- Why one of these tests is about to become the exact tripwire Lessons
  13-15 rely on

## What needs testing, and why

Four models now exist with no tests on them: `stg_jaffle_shop__orders`,
`stg_jaffle_shop__payments`, `int_orders__joined`, and `fct_orders`.
Each gets the tests that match what could actually go wrong with it —
not every test on every column.

```yaml
# models/marts/schema.yml
models:
  - name: fct_orders
    columns:
      - name: order_id
        data_tests:
          - unique
          - not_null
      - name: customer_id
        data_tests:
          - relationships:
              arguments:
                to: ref('customers')
                field: customer_id
      - name: status
        data_tests:
          - accepted_values:
              arguments:
                values: ['placed', 'shipped', 'completed', 'returned']
```

## Why `order_id` gets `unique` and `not_null`

`fct_orders` is grain-one-row-per-order. `not_null` catches a broken
join dropping the key entirely; `unique` catches the thing this
project's design is specifically trying to avoid — a join that
produces *more than one row per order*. Keep that in mind: this exact
test is what Lesson 13 shows failing, for a reason that was quietly
set up back in Lesson 6.

## Why `customer_id` gets a `relationships` test

A `relationships` test is referential integrity: every `customer_id`
value in `fct_orders` has to actually exist in the customers mart.
`to: ref('customers')` points at the Beginner project's mart directly
— the same model `int_orders__joined` already joins against in
Lesson 4. This test would catch a customer that gets removed from the
mart while orders referencing them still exist.

## Why `status` gets `accepted_values`, using your own Lesson 1 data

Lesson 1's lab had you record the real status values present in
`raw_orders`. Use that exact list here — `accepted_values` fails if
any row shows a status outside the supplied list, which is exactly
how a typo or a new, undocumented status value upstream gets caught
instead of silently flowing through to Ops's report.

## Running the tests

```bash
dbt test --select fct_orders stg_jaffle_shop__orders stg_jaffle_shop__payments int_orders__joined
```

Every test should `PASS` right now — if `unique` on `order_id` is
already failing, stop here and don't move forward until it passes;
Lesson 13 walks through diagnosing that exact failure on purpose,
later, once you understand the mechanism causing it.

## Key terms

| Term | Meaning |
|---|---|
| `data_tests:` | The schema.yml key under which a column's tests are listed |
| `relationships` test | Confirms every value in one column exists in another model's column |
| `accepted_values` | Confirms every value in a column comes from a supplied list |

## Lab

Write the `schema.yml` block above for `fct_orders`, run
`dbt test --select fct_orders`, and confirm all three tests pass.
Then add a basic `not_null` + `unique` pair on the primary key column
of `stg_jaffle_shop__orders`, `stg_jaffle_shop__payments`, and
`int_orders__joined` as well.

## Check yourself

You're ready for Lesson 9 when every test above passes and you can
explain, specifically, what a failing `unique` test on `order_id`
would mean about the data, versus what it would mean about the model
that built it.
