# Lesson 14 — Generating dbt Docs and Reading the Lineage Graph

**Chapter 4 · Testing, Documentation & Governance · Lesson 14 of 26**

## What you'll learn

- Real `dbt docs generate` and `dbt docs serve` commands
- What the lineage graph actually shows, node by node, for this
  platform's real models
- How the graph makes Lesson 12's schema-change blast radius visible,
  not just listable
- Why generated docs — not a wiki someone updates by hand — are what
  "anyone outside the data team can see what depends on what" means

## Generating the docs

```
dbt docs generate
dbt docs serve
```

`dbt docs generate` reads every model's `.sql`, every `.yml`
description, every test, and every `ref()`/`source()` call in the
project, and builds a static site describing all of it. `dbt docs
serve` runs a local web server so that site can actually be opened in
a browser. Nothing here is hand-maintained — every page is derived
directly from the project's own real files, which is exactly why it
can never drift out of date the way a separately maintained wiki page
can.

## Reading the lineage graph

The generated site's lineage graph is a visual version of the same
`ref()`/`source()` dependency graph Lesson 12's `dbt ls --select
model+` already queried as text. For this platform, it draws:

```
source: raw_customers  -->  stg_jaffle_shop__customers  -->  customers
source: raw_orders      -->  stg_jaffle_shop__orders      -->  orders --> customers
source: raw_payments    -->  stg_jaffle_shop__payments    -->  int_orders__payment_summary --> orders
source: raw_customers  -->  customer_status_snapshot   (the Lesson 10 snapshot, its own node)
```

Every arrow in this graph is a real `ref()` or `source()` call
somewhere in the project's SQL — the graph isn't drawn by hand, it's
derived, which means it's never wrong about what actually depends on
what.

## Connecting this back to Lesson 12

Lesson 12's `dbt ls --select stg_jaffle_shop__orders+` answered "what's
downstream of this model" as a text list. This lesson's lineage graph
answers the exact same question visually — click
`stg_jaffle_shop__orders`, and every downstream node highlights. For
someone who isn't comfortable reading a `dbt ls` selector syntax
(a business stakeholder, a new team member), the graph is the same
real answer in a form they can actually use.

## Why generated docs matter for the original business ask

Lesson 1 named "nobody outside the data team can tell what any of this
actually does" as one of the five real governance gaps. Generated
docs are the direct answer: a column's description, its tests, and
every model it depends on are all one click away for anyone with
access to the docs site — not locked inside a developer's head or a
stale wiki page nobody's updated since the project started.

## What goes into a column description

```yaml
# models/marts/_marts__models.yml
models:
  - name: customers
    description: "One row per customer, with lifetime value and order history."
    columns:
      - name: customer_id
        description: "Primary key — unique identifier for a customer."
      - name: lifetime_value
        description: "Total amount paid across all of this customer's orders, in dollars."
```

Every `description:` field here shows up directly on the generated
docs site, next to that column's tests and its place in the lineage
graph — one `.yml` edit, reflected everywhere the docs site shows that
column.

## Key terms

| Term | Meaning |
|---|---|
| `dbt docs generate` | Builds a static documentation site from the project's models, tests, and descriptions |
| `dbt docs serve` | Serves the generated docs site locally for viewing in a browser |
| Lineage graph | A visual rendering of the real `ref()`/`source()` dependency graph |
| Generated vs. hand-maintained docs | Generated docs are derived from real project files and can't silently drift out of date |

## Lab

1. Run `dbt docs generate` and `dbt docs serve` against this platform's
   project (or describe exactly what each command does if working
   conceptually).
2. Find `stg_jaffle_shop__orders` in the lineage graph and list every
   downstream node it highlights.
3. Write the `description:` fields for `orders.amount` and
   `orders.status`, and explain where each one would show up on the
   generated docs site.

## Check yourself

You're ready for Lesson 15 when you can describe what `dbt docs
generate` actually builds, and you can find a model's full downstream
lineage visually, not just as a `dbt ls` text list.
