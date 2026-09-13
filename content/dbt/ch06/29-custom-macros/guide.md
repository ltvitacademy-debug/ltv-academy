# Lesson 29 — Writing Custom Macros

**Chapter 6 · Jinja & Macros · Lesson 29 of 45**

## What you'll learn

- What a macro is: a named, reusable, parameterized chunk of Jinja —
  a function for SQL
- How to define one in `macros/` and call it from a model
- Arguments and a return value via `{% macro %}` / `{{ return() }}`
- When a macro is worth it, versus when it's just obscuring plain SQL

## A macro is a function for SQL

Lesson 28's `for` loop generating one column per status is useful — but
copy-pasted into three different models, it's now three places to
update if the list of statuses changes. A **macro** is that same Jinja
logic, defined once in `macros/`, parameterized, and called by name
from anywhere in the project — exactly the reuse motivation behind
writing a function in any other language.

## Defining a macro

```sql
-- macros/cents_to_dollars.sql
{% macro cents_to_dollars(column_name, decimal_places=2) %}
    round({{ column_name }} / 100.0, {{ decimal_places }})
{% endmacro %}
```

`{% macro %}` opens the definition, names it, and declares its
arguments — `decimal_places=2` gives that argument a default, so
callers can omit it. `{% endmacro %}` closes it. No `{{ return() }}`
needed here because the macro's own rendered text *is* the output —
Jinja just substitutes the whole macro call with whatever text sits
between `{% macro %}` and `{% endmacro %}`.

## Calling it from a model

```sql
-- models/marts/fct_orders.sql
select
    order_id,
    customer_id,
    {{ cents_to_dollars('order_total_cents') }} as order_total,
    {{ cents_to_dollars('tax_cents', 4) }} as tax_amount
from {{ ref('stg_orders') }}
```

This compiles to:

```sql
select
    order_id,
    customer_id,
    round(order_total_cents / 100.0, 2) as order_total,
    round(tax_cents / 100.0, 4) as tax_amount
from analytics.stg_orders
```

Every model that needs a cents-to-dollars conversion calls the same
macro — one place to fix a rounding bug, one place to add currency
support later, instead of hunting down every copy-pasted `round(...)`
across the project.

## Returning a real value with `{% macro %}` / `return()`

Some macros need to compute something and hand back an actual Python
value — a list, a dict — not just render text. That's what
`{{ return() }}` is for:

```sql
-- macros/get_status_list.sql
{% macro get_status_list() %}
    {% set statuses = ['pending', 'shipped', 'delivered', 'cancelled'] %}
    {{ return(statuses) }}
{% endmacro %}
```

```sql
{% set statuses = get_status_list() %}
select
    order_id,
    {% for status in statuses %}
        sum(case when order_status = '{{ status }}' then 1 else 0 end)
            as orders_{{ status }}{% if not loop.last %},{% endif %}
    {% endfor %}
from {{ ref('stg_orders') }}
group by 1
```

Now that status list is defined once and reused by every model that
needs it — including any future macro that also needs the same list.

## When a macro is worth it (and when it isn't)

Reach for a macro when the same Jinja logic shows up in more than one
model, or when a single piece of logic (a rounding rule, a status
list, a business definition) needs exactly one place to change. Don't
reach for one to "SQL-ify" something a plain `CASE` statement already
handles clearly in one model — a macro that exists purely to hide five
lines of straightforward SQL behind a function call makes the
compiled output *harder* to trace, not easier, for the one person who
has to debug it later.

## Key terms

| Term | Meaning |
|---|---|
| Macro | A named, reusable, parameterized chunk of Jinja — a function for SQL |
| `{% macro %}` / `{% endmacro %}` | Defines a macro's name, arguments, and body |
| `{{ return(value) }}` | Hands back a real Python value (list, dict) instead of rendered text |
| `macros/` | The project folder where custom macros live |

## Lab

1. Write a `cents_to_dollars` macro like the one above, with a default
   `decimal_places` argument.
2. Call it from two different models, confirming both compile
   correctly via `dbt compile`.
3. Write a second macro that returns a list via `{{ return() }}`, and
   use it inside a `{% for %}` loop in a model.

## Check yourself

You're ready for Lesson 30 when you can explain why a macro that's
only ever called from one model is usually not worth the indirection —
and when it becomes worth it the moment a second model needs the same
logic.
