# Lesson 9 — Generating and Reading dbt Docs

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 9 of 16**

## What you'll learn

- The real two-step command sequence that builds and serves dbt's
  documentation site
- What actually populates the docs — descriptions, tests, and column
  info you've already written, not new content to author
- How to read the lineage graph for the model layer built in this
  chapter
- Why documenting this layer now, before Power BI touches it, matters

## The two real commands

```bash
dbt docs generate
dbt docs serve
```

`dbt docs generate` compiles a `catalog.json` from the project's
actual metadata — every model, every column, every test, every
description already written in `schema.yml` files across this
chapter's work. `dbt docs serve` then starts a local web server and
opens that catalog as a browsable site. Nothing about this chapter's
descriptions or tests needs to be written twice — the docs reuse
exactly what already exists in the project.

## What the generated docs actually show

For each model built this chapter — the two new staging models, the
intermediate join, `fct_orders` — the docs site shows: its compiled
SQL, its materialization (`view`, `table`, or `incremental`), every
column with its description (if one was written in `schema.yml`), and
every test attached to it, with current pass/fail status pulled from
the last `dbt test` run.

## Reading the lineage graph for this chapter's work

The docs site's lineage graph (the DAG view) now shows this chapter's
additions as real nodes and edges: `raw_orders` and `raw_payments`
flowing into their staging models, both staging models and the
Beginner project's `customers` mart flowing into `int_orders__joined`,
and that model flowing into `fct_orders`. This is the single clearest
way to *see* the plan from Lesson 2 made real — if a model is missing
an edge you expect, that's a `ref()`/`source()` call that isn't
wired up the way you think it is.

## Why document this before Power BI gets involved

Lesson 10 onward connects Power BI directly to `fct_orders`. Whoever
builds the Finance and Ops pages — possibly not you — needs to trust
what that model's columns actually mean without re-deriving the whole
pipeline from scratch. A documented, tested model with a visible
lineage graph is what makes that handoff possible instead of requiring
a conversation every time someone has a question about a column.

## Key terms

| Term | Meaning |
|---|---|
| `dbt docs generate` | Compiles the project's current metadata into `catalog.json` |
| `dbt docs serve` | Starts a local server hosting the browsable docs site |
| Lineage graph | The DAG view showing every model's upstream and downstream dependencies |

## Lab

Run both commands, open the docs site, and find `fct_orders` in the
lineage graph. Click through its upstream edges until you reach
`raw_orders` and `raw_payments` directly — confirm every model in
between (`stg_jaffle_shop__orders`, `stg_jaffle_shop__payments`,
`int_orders__joined`) appears exactly where Lesson 2's plan said it
would.

## Check yourself

You're ready for Lesson 10 when you can trace `fct_orders`'s full
upstream lineage by clicking through the graph alone, without opening
a single `.sql` file.
