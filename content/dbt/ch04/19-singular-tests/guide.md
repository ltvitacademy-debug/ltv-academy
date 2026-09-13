# Lesson 19 — Singular Tests

**Chapter 4 · Testing & Documentation · Lesson 19 of 45**

## What you'll learn

- What a singular test is, and how it differs from the four generic
  tests in Lesson 18
- The real `tests/` folder convention and how a test gets its name
- dbt Labs' own published singular test example, in full
- When to reach for a singular test instead of a generic one — and
  when that's a sign you should build a reusable generic test instead

## When a generic test isn't enough

Lesson 18's four generic tests — `not_null`, `unique`,
`accepted_values`, `relationships` — cover an enormous amount of
ground, but they're general-purpose by design. Some assertions are
specific to your business, not reusable across projects: "refunds are
negative, so the total for any order should never go negative" isn't
a rule dbt could ship as a built-in, because it depends entirely on
how *your* data models refunds. That's exactly the gap a **singular
test** fills — a one-off, custom SQL query, written by you, that
expresses one specific assertion about your own data.

## The mechanics: just a `.sql` file

A singular test is nothing more than a `.sql` file saved in your
project's `tests/` directory. It's a `select` statement — the same
rule from Lesson 18 applies unchanged: if the query returns any rows,
those rows are the failures, and the test fails. If it returns zero
rows, the test passes. The test's name comes directly from its
filename, and you can use `ref()`, `source()`, and Jinja inside it
exactly like you would inside a model.

## A real example, from dbt Labs' own documentation

```sql
-- tests/assert_total_payment_amount_is_positive.sql
-- Refunds have a negative amount, so the total amount should always be >= 0.
-- Therefore return records where total_amount < 0 to make the test fail.
select
    order_id,
    sum(amount) as total_amount
from {{ ref('fct_payments') }}
group by 1
having total_amount < 0
```

Read the comment first — it states the business assertion in plain
English — then the query: group payments by order, sum the amount,
and return any order where that sum went negative. If even one row
comes back, some order's payments net out to a number that shouldn't
be possible, and the test fails with that exact `order_id` in hand for
debugging. Note the missing semicolon at the end — dbt Labs'
convention omits trailing semicolons in test SQL files.

## Documenting a singular test

Since a singular test isn't declared in a model's `schema.yml`, it
gets its own small YAML entry if you want to add a description:

```yaml
# tests/schema.yml
data_tests:
  - name: assert_total_payment_amount_is_positive
    description: >
      Refunds have a negative amount, so the total amount should
      always be >= 0. Returns records where total_amount < 0.
```

## When to reach for singular vs. generic

Write a singular test for a **one-off assertion** specific to this
project — the payments-never-negative rule above has no reason to
exist anywhere else. But if you notice yourself writing nearly the
same singular test against several different models — the same shape
of query, just a different table each time — that repetition is the
signal to promote it into a custom **generic test** instead (a topic
this course returns to alongside macros), so the logic is written
once and reused everywhere it applies, the same way `not_null` is.

## Key terms

| Term | Meaning |
|---|---|
| Singular test | A one-off, custom SQL file in `tests/` expressing a single, project-specific assertion |
| `tests/` directory | Where singular test `.sql` files live; the filename becomes the test's name |
| Failing rows | Any row a singular test's select statement returns — the specific records that violate the assertion |
| Singular vs. generic | Singular for one-off assertions; promote to a generic test once the same shape repeats across models |

## Lab

1. Think of one business rule about your own project's data that none
   of the four generic tests could express (a sum that should never be
   negative, a date that should never be in the future, etc.).
2. Write it as a singular test in `tests/`, following the
   `assert_...` naming pattern.
3. Run `dbt test` and confirm it passes — then temporarily break the
   assumption in your data to confirm it correctly fails.

## Check yourself

You're ready for Lesson 20 when you can explain, using your own
example, the exact signal that tells you to promote a singular test
into a generic one instead.
