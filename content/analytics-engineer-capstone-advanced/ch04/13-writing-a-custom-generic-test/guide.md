# Lesson 13 — Writing a Custom Generic Test

**Chapter 4 · Testing, Documentation & Governance · Lesson 13 of 26**

## What you'll learn

- The real difference between dbt's built-in generic tests
  (`not_null`, `unique`) and a custom one this platform writes itself
- Real `{% test %}` / `{% endtest %}` syntax, applied to a genuinely
  useful check: a monetary column that should never go negative
- How a custom generic test gets applied to a column in `.yml`, the
  same way a built-in one does
- Why a custom test, not just a comment, is what actually enforces a
  business rule

## Why a custom test, beyond not_null and unique

Built-in generic tests catch structural problems: a null where one
shouldn't be, a duplicate where rows should be unique. They can't
catch a value that's structurally fine but *wrong* — like
`orders.amount` somehow coming out negative, which should never happen
for Jaffle Shop's business but isn't something `not_null` or `unique`
would ever notice.

## Real {% test %} syntax

```sql
-- tests/generic/test_non_negative.sql
{% test non_negative(model, column_name) %}

select *
from {{ model }}
where {{ column_name }} < 0

{% endtest %}
```

A generic test's job is to return the rows that **fail** the check —
dbt treats any row returned by this query as a test failure. A test
that returns zero rows passes. `model` and `column_name` are the two
arguments every column-level generic test receives automatically —
this test doesn't hardcode either one, which is exactly what makes it
reusable across any column on any model.

## Applying it to a column

```yaml
# models/marts/_marts__models.yml
models:
  - name: orders
    columns:
      - name: amount
        tests:
          - non_negative
      - name: order_id
        tests:
          - unique
          - not_null
```

`non_negative` is applied in `.yml` exactly the same way as the
built-in `unique` and `not_null` — once it's defined under
`tests/generic/`, dbt doesn't distinguish "custom" from "built-in" at
the point of use.

## Running it

```
dbt test --select orders
```

If any row in `orders` ever has a negative `amount`, this test fails
and names the model and column it failed on — dbt build (Lesson 15
formalizes this) will stop building anything downstream of `orders`
until it's fixed.

## Why a test, not a comment or a code review

A comment saying "amount should never be negative" relies on every
future developer reading it, every time, forever. A test runs on every
single `dbt build`, automatically, with no one having to remember
anything. That's the real distinction a custom generic test draws:
turning a business rule from a shared belief into an enforced fact.

## Key terms

| Term | Meaning |
|---|---|
| Generic test | A reusable test, parameterized by `model` and `column_name`, applicable to any column via `.yml` |
| `{% test %}` / `{% endtest %}` | The real dbt syntax defining a custom generic test |
| Failing rows | What a generic test's query returns — any row it selects counts as a failure |
| `dbt test --select <model>` | Runs only the tests configured on one model |

## Lab

1. Write `tests/generic/test_non_negative.sql` exactly as shown.
2. Apply it to `orders.amount` in a `.yml` schema file, alongside
   `unique`/`not_null` on `order_id`.
3. Temporarily insert a row with a negative `amount` into a dev copy
   of `orders` and confirm `dbt test --select orders` fails and names
   exactly which row.

## Check yourself

You're ready for Lesson 14 when you can write a custom generic test
from memory and explain, in one sentence, what a generic test's query
is actually supposed to return.
