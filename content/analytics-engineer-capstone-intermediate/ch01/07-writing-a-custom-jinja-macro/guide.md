# Lesson 7 — Writing a Custom Jinja Macro

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 7 of 16**

## What you'll learn

- The real detail about `raw_payments.amount` that makes a macro worth
  writing here, not just a nice-to-have
- `{% macro %}` / `{% endmacro %}` syntax, defining a reusable,
  parameterized chunk of Jinja
- Where to put it in the project and how to call it from a model
- Why this is exactly the "more than one model needs the same logic"
  case that makes a macro worth the indirection

## The real detail: `amount` is in cents

In the real jaffle_shop seed data, `raw_payments.amount` is stored in
**cents**, not dollars — `2691` means $26.91. Every place this project
displays a dollar figure — `fct_orders.amount` today, and the Power BI
pages Lessons 11-12 build on top of it — needs that same
cents-to-dollars conversion applied consistently. Write it once as a
macro instead of a bare `round(amount / 100.0, 2)` copy-pasted into
every model that touches money.

## Defining the macro

```sql
-- macros/cents_to_dollars.sql
{% macro cents_to_dollars(column_name, decimal_places=2) %}
    round({{ column_name }} / 100.0, {{ decimal_places }})
{% endmacro %}
```

`{% macro %}` names it and declares its arguments —
`decimal_places=2` gives that one a default, so most callers can omit
it. `{% endmacro %}` closes the definition. There's no explicit return
value needed: the macro's rendered text *is* its output, substituted
wherever it's called.

## Calling it from `stg_jaffle_shop__payments`

Apply the conversion as early as possible — in the payments staging
model, so every downstream model (including `fct_orders`) already
receives dollars, not cents:

```sql
-- models/staging/stg_jaffle_shop__payments.sql
with source as (
    select * from {{ source('jaffle_shop', 'payments') }}
),
renamed as (
    select
        id as payment_id,
        order_id,
        payment_method,
        {{ cents_to_dollars('amount') }} as amount
    from source
)
select * from renamed
```

This compiles to `round(amount / 100.0, 2) as amount` — plain SQL,
generated once from one macro call, instead of hand-written and
re-typed anywhere else money needs converting.

## Why this specific case is worth a macro

The rule from this project's own custom-macros lesson still applies:
reach for a macro when the same logic shows up in more than one model,
or needs exactly one place to change. A cents-to-dollars conversion
is a textbook case — it's a business rule (two decimal places, this
exact divisor) that every money-touching model in this project needs
identically. If the conversion rule ever changes, there's exactly one
file to edit.

## Key terms

| Term | Meaning |
|---|---|
| `{% macro %}` / `{% endmacro %}` | Defines a named, reusable, parameterized chunk of Jinja |
| `cents_to_dollars` | A macro converting a cents-denominated column to dollars, rounded |
| Apply-early principle | Doing a conversion in staging so every downstream model inherits already-correct units |

## Lab

Write `macros/cents_to_dollars.sql` exactly as shown, then rebuild
`stg_jaffle_shop__payments` using it. Run `dbt compile` and inspect
the compiled SQL for that model to confirm the macro expanded to plain
`round(...)` SQL, not leftover Jinja syntax.

## Check yourself

You're ready for Lesson 8 when you can explain why this conversion
belongs in the staging model specifically, rather than being applied
later in `fct_orders` or inside a Power BI measure.
