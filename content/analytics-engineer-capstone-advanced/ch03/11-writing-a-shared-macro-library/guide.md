# Lesson 11 — Writing a Shared Macro Library

**Chapter 3 · Building the dbt Model Layer · Lesson 11 of 26**

## What you'll learn

- Real `{% macro %}` / `{% endmacro %}` syntax, for logic reused across
  more than one model
- Three small, genuinely reusable macros: `cents_to_dollars()`,
  `date_spine_days()`, and `payment_method_is_valid()`
- Where shared macros live in a real dbt project, and how they get
  called from a model
- Why a macro library is a governance tool, not just a convenience

## Why a macro library, not just repeated SQL

Jaffle Shop's `amount` columns are stored as integer cents (a common
real pattern, avoiding floating-point rounding in money columns). Both
`orders.sql` and any future mart that touches money need to convert
cents to dollars the same way, every time. Writing that conversion
inline in three different models means three chances for someone to
get the divisor wrong. A shared macro means one definition, reused
everywhere.

## Macro 1 — cents_to_dollars

```sql
-- macros/cents_to_dollars.sql
{% macro cents_to_dollars(column_name, decimal_places=2) %}
    round({{ column_name }} / 100.0, {{ decimal_places }})
{% endmacro %}
```

Called from a model like any built-in dbt function:

```sql
select
    order_id,
    {{ cents_to_dollars('amount') }} as amount_dollars
from {{ ref('orders') }}
```

## Macro 2 — a date spine helper

```sql
-- macros/date_spine_days.sql
{% macro date_spine_days(start_date, end_date) %}
    {{ dbt_utils.date_spine(
        datepart="day",
        start_date="to_date('" ~ start_date ~ "', 'YYYY-MM-DD')",
        end_date="to_date('" ~ end_date ~ "', 'YYYY-MM-DD')"
       )
    }}
{% endmacro %}
```

This wraps `dbt_utils.date_spine` (a real, standard macro from the
`dbt_utils` package) with this platform's own simpler call signature —
useful anywhere a mart needs one row per calendar day (for example, a
"days since last order" calculation) without every model re-deriving
the right `dbt_utils` arguments from scratch.

## Macro 3 — a small validation helper

```sql
-- macros/payment_method_is_valid.sql
{% macro payment_method_is_valid(column_name) %}
    {{ column_name }} in ('credit_card', 'coupon', 'bank_transfer', 'gift_card')
{% endmacro %}
```

A small boolean expression macro, usable both inside a model's
`WHERE` clause and — more importantly, previewing Chapter 4 — inside a
custom generic test, so the same definition of "valid payment method"
can't drift between a model and the test checking it.

## Where these live, and the resulting folder

```
macros/
  cents_to_dollars.sql
  date_spine_days.sql
  payment_method_is_valid.sql
```

A flat `macros/` folder is enough for a library this size. A larger
project groups macros by purpose (`macros/finance/`,
`macros/validation/`) the same way `models/staging/jaffle_shop/`
groups staging models by source.

## Why this is a governance tool, not just a shortcut

A shared macro is a single, named, version-controlled definition of a
business rule. If leadership ever changes which payment methods count
as valid, that's a one-line edit to
`payment_method_is_valid.sql` — not a search-and-replace across every
model and test that happened to repeat the same list inline.

## Key terms

| Term | Meaning |
|---|---|
| Macro | Reusable Jinja/SQL logic, callable from any model with `{{ macro_name(...) }}` |
| `dbt_utils` | A real, widely-used dbt package of common macros, including `date_spine` |
| Validation macro | A macro returning a boolean expression, reusable in both models and tests |

## Lab

1. Write all three macros exactly as shown, under `macros/`.
2. Call `cents_to_dollars('amount')` from a copy of `orders.sql` and
   confirm the output column is a sane dollar value.
3. Explain, in one sentence, why defining "valid payment method" as a
   macro instead of inline SQL matters for Chapter 4's custom test.

## Check yourself

You're ready for Lesson 12 when you can write `cents_to_dollars` from
memory and explain why a shared macro reduces the risk of three models
quietly disagreeing about the same business rule.
