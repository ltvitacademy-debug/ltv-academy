# Lesson 28 — Jinja Basics Inside dbt

**Chapter 6 · Jinja & Macros · Lesson 28 of 45**

## What you'll learn

- That `ref()`, `is_incremental()`, and `config()` — everything used
  so far — are Jinja, not special dbt syntax
- The two delimiter types: `{{ }}` for expressions, `{% %}` for
  statements (control flow)
- Variables, `if`, and `for` inside dbt SQL
- How to actually see what Jinja compiles down to before it runs

## You've already been writing Jinja

Every `{{ ref('stg_orders') }}`, every `{{ config(...) }}`, every
`{% if is_incremental() %}` from the last four lessons is **Jinja** —
a general-purpose Python templating language, not something dbt
invented. dbt's real job, underneath everything else, is: take a
`.sql` file full of Jinja, render it down to plain SQL, and run *that*
against your warehouse. The warehouse never sees a single curly brace.

## The two delimiters

```sql
-- {{ }} — an EXPRESSION: it produces a value, dropped into the SQL
select * from {{ ref('stg_orders') }}

-- {% %} — a STATEMENT: control flow, produces no value itself
{% if is_incremental() %}
    where updated_at > (select max(updated_at) from {{ this }})
{% endif %}
```

`{{ }}` always renders to *something* — a table reference, a string, a
number. `{% %}` renders to *nothing itself* — it controls whether the
SQL inside it appears at all.

## Variables

```sql
{% set payment_methods = ['credit_card', 'paypal', 'bank_transfer'] %}

select
    order_id,
    payment_method
from {{ ref('stg_orders') }}
where payment_method in (
    {% for method in payment_methods %}
        '{{ method }}'{% if not loop.last %},{% endif %}
    {% endfor %}
)
```

`{% set %}` defines a variable. `loop.last` is Jinja's built-in way to
know you're on the final iteration of a `for` loop — exactly what you
need to skip a trailing comma when generating a comma-separated list.

## `if` and `for` inside real dbt SQL

```sql
{% for status in ['pending', 'shipped', 'delivered', 'cancelled'] %}
    sum(case when order_status = '{{ status }}' then 1 else 0 end)
        as orders_{{ status }}
    {% if not loop.last %},{% endif %}
{% endfor %}
```

This generates one `sum(case when ...)` column per status — four
columns, written once. That's the entire reason Jinja is in dbt at
all: SQL has no loops or variables of its own, so anything repetitive
(one column per status, one `union` per source table) either gets
typed out by hand every time or generated once by a small loop.

## Seeing what Jinja actually compiles to

Every dbt run writes the fully rendered SQL — Jinja gone, plain SQL
only — to `target/compiled/<project>/models/.../<model>.sql`. dbt
Cloud's Studio IDE shows the same thing live, side by side with your
source, in the editor's **Compiled Code** tab: type Jinja on the left,
watch the real SQL that will actually hit the warehouse appear on the
right. That's the fastest way to build confidence that a loop or
conditional is generating exactly the SQL you think it is, before ever
running it against real data.

## Key terms

| Term | Meaning |
|---|---|
| Jinja | The general-purpose templating language dbt SQL is built on — not dbt-specific |
| `{{ }}` | Expression delimiter — renders to a value (a ref, a string, a number) |
| `{% %}` | Statement delimiter — control flow (`if`, `for`, `set`), renders to nothing itself |
| Compiled SQL | The plain SQL dbt actually runs, with all Jinja rendered away — viewable in `target/compiled/` or the Compiled Code tab |

## Lab

1. Write a model with a `{% for %}` loop generating one `case when`
   column per value in a list of 3–4 statuses.
2. Run `dbt compile` and open the generated file under
   `target/compiled/` to confirm the Jinja is gone and only plain SQL
   remains.
3. Add an `{% if %}` block that changes the query differently for a
   `dev` vs. `prod` target (hint: `target.name`), and confirm the
   compiled SQL differs between the two.

## Check yourself

You're ready for Lesson 29 when you can explain the difference between
`{{ }}` and `{% %}` without looking it up, and say exactly where you'd
go to see what your Jinja actually compiled to.
