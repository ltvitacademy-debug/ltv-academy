# Lesson 21 — Generating and Reading dbt Docs

**Chapter 4 · Testing & Documentation · Lesson 21 of 45**

## What you'll learn

- The real command that turns every description and test from
  Lesson 20 into a browsable site
- What the generated docs site actually contains — a searchable
  catalog and an interactive lineage graph, both real, both live
- How to set docs generation up to run automatically, not just
  on-demand
- Why docs "always show the last fully successful run," and what that
  implies about a failing pipeline

## The command that builds the site

Every description you wrote in Lesson 20, every test from Lessons 18
and 19, gets compiled into a real documentation site with one command:

```bash
dbt docs generate
```

Run inside dbt Cloud's Studio IDE Command Bar, or from the dbt Core
CLI. It introspects your entire project — every model, source, test,
snapshot, and macro — and every column's live metadata straight from
the warehouse, and assembles all of it into a static site.

## What's actually in the generated site

The result isn't a wiki someone has to keep in sync by hand — it's
generated directly from the project, the same "never stale" guarantee
Lesson 1 introduced for the lineage graph. Two things make it useful in
practice:

**A searchable catalog of every resource** — models, sources, tests,
snapshots, exposures — each with its column-level descriptions and
metadata surfaced right where the schema.yml file put them:

![The dbt Catalog's model/resource details view — column-level metadata and descriptions, generated directly from schema.yml and live warehouse introspection.](/courses/dbt/ch04/21-generating-dbt-docs/model-details.png)
*Every description you wrote in Lesson 20 ends up here, next to type information dbt pulled straight from the warehouse.*
Source: [dbt Docs — Discover data with Catalog](https://docs.getdbt.com/docs/collaborate/explore-projects)

**A real, interactive lineage graph** — the same DAG concept from
Lesson 1, but now for your entire project, clickable, filterable, and
generated straight from every `ref()` call in your codebase:

![A real dbt Catalog lineage graph for an example project — the interactive DAG, generated from ref() calls, clickable to explore any node's details.](/courses/dbt/ch04/21-generating-dbt-docs/lineage-graph.png)
*Click any model in the graph to open its details, description, and tests — this is the whole project's dependency structure, always current.*
Source: [dbt Docs — Discover data with Catalog](https://docs.getdbt.com/docs/collaborate/explore-projects)

## Setting it up to run automatically

Generating docs manually every time works, but it drifts stale the
moment someone forgets to re-run it after a change. The real,
production setup: in dbt Cloud, open a deploy **Job**, turn on
**Generate docs on run** under Execution Settings, then point your
project's **Artifacts** setting at that job (Account settings →
Projects → Edit → Artifacts). From then on, every successful run of
that job refreshes the docs site automatically.

## The "last successful run" gotcha

One detail worth knowing before you rely on this: the docs site always
reflects the **last fully successful run** — not the current state of
your code. If a job fails partway through, the docs site doesn't go
blank or show partial results; it keeps showing whatever the previous
successful run produced. That's a feature, not a bug (nobody wants
docs that reflect a broken build), but it means a docs site can be
technically accurate and still describe yesterday's code if today's
run hasn't gone green yet.

## Key terms

| Term | Meaning |
|---|---|
| `dbt docs generate` | The command that compiles descriptions, tests, and warehouse metadata into a documentation site |
| Catalog | The searchable resource browser inside the generated docs — models, sources, tests, with column-level detail |
| Lineage graph | The generated site's interactive DAG, built from `ref()` calls, the project-wide version of Lesson 1's graph |
| Generate docs on run | The dbt Cloud job setting that refreshes the docs site automatically on every successful run |

## Lab

1. Run `dbt docs generate` on your own project (or in dbt Cloud's
   Command Bar) and open the resulting site.
2. Find the model you documented in Lesson 20 in the catalog, and
   confirm your description and tests both appear on it.
3. Click through the lineage graph to that same model and trace its
   full upstream dependency chain, staging model to mart.

## Check yourself

You're ready for Lesson 22 when you can explain why a docs site
showing "the last fully successful run" is a deliberate design choice,
not a bug — and what it implies about trusting a docs site during a
red pipeline.
