# Lesson 1 — What Is Analytics Engineering?

**Chapter 1 · Analytics Engineering & dbt Fundamentals · Lesson 1 of 45**

## What you'll learn

- What "analytics engineering" actually means, as a distinct role from
  data analyst and data engineer
- What problem dbt exists to solve, in one sentence
- What a real dbt project looks like — file explorer, models, and a
  visual lineage graph
- What this course assumes you already know

## Analytics engineering: between data engineer and data analyst

A data engineer gets data *into* the warehouse — pipelines, ingestion,
infrastructure (Snowflake, covered in the previous course in this
path, is exactly that layer). A data analyst pulls data *out* —
dashboards, ad hoc queries, reporting. **Analytics engineering** is
the layer in between: transforming raw, loaded data into clean,
tested, documented models that analysts and BI tools can trust without
re-deriving the logic themselves every time.

Before dbt, that middle layer was usually a pile of untested, undocumented
SQL scripts, or logic buried inside a BI tool where nobody else could
see it. dbt gives that layer the same rigor software engineers expect
from application code: version control, testing, documentation, and
CI/CD — all applied to SQL transformations specifically.

## A real dbt project

Everything in dbt lives in a project — a folder structure with
`models/`, `macros/`, tests, and configuration — developed inside a
real IDE with a visual map of how everything connects:

![The dbt Cloud Studio IDE: a file explorer showing a real project structure (models/marts, macros, dbt_packages), a model's SQL with a ref() call, and the Lineage tab showing the actual dependency graph — a raw source flowing into a staging model, into a marts model.](/courses/dbt/ch01/01-what-is-analytics-engineering/dbt-cloud-ide.png)
*That graph on the Lineage tab isn't a diagram someone drew — it's generated directly from the ref() calls in the SQL itself, always accurate, never stale.*
Source: [dbt Docs — Develop in the Cloud IDE](https://docs.getdbt.com/docs/cloud/dbt-cloud-ide/develop-in-the-cloud)

That's the core idea this whole course builds toward: instead of
hardcoding a table name everywhere it's referenced, a dbt model
references other models by name (`ref('stg_customers')`), and dbt
figures out the entire dependency order — and draws the graph — for
you.

## What problem dbt actually solves

In one sentence: dbt turns SQL transformation logic — the kind that
used to live as untracked scripts or hidden BI-tool calculations —
into version-controlled, tested, documented, and automatically
ordered **models**, run directly against your warehouse.

Four things dbt adds that raw SQL scripts don't have on their own:

- **Dependency management** — write `ref()` calls, not hardcoded table
  names; dbt runs everything in the right order automatically.
- **Testing** — assert things like "this column is never null" or
  "these two tables' keys always match," and dbt fails loudly when
  they don't.
- **Documentation** — descriptions and column definitions live next
  to the code and generate a real, browsable docs site.
- **Version control & CI/CD** — a dbt project is just files, so
  everything from the Git/GitHub/CI-CD course in this catalog applies
  directly to it.

## What this course assumes

This course assumes real SQL fluency (T-SQL Development) and cloud
warehouse basics (the Snowflake course, immediately before this one in
the Analytics Engineer path) — CTEs, joins, and how a warehouse like
Snowflake actually runs a query. Nothing here re-teaches SQL. Every
lesson is about the modeling layer dbt builds *on top of* a warehouse
you already know how to use.

## Key terms

| Term | Meaning |
|---|---|
| Analytics engineering | The layer between data engineering and data analysis — transforming loaded data into trusted, modeled data |
| dbt model | A `.sql` file defining one transformation step, referenced by other models via `ref()` |
| Lineage graph | dbt's automatically generated dependency diagram, built from `ref()` calls, never hand-drawn |
| dbt project | The folder structure (models, macros, tests, config) that makes up a dbt codebase |

## Lab

1. If you don't already have one, sign up for a free dbt Cloud trial
   account (or install dbt Core locally, covered next lesson).
2. Look at a real, public dbt project on GitHub (search "dbt project"
   on GitHub, or use dbt Labs' own "Jaffle Shop" example project) and
   find its `models/` folder — note the staging vs. marts split even
   before this course explains why that split exists.
3. Write one sentence, in your own words, describing what analytics
   engineering is that doesn't use the words "data engineer" or "data
   analyst."

## Check yourself

You're ready for Lesson 2 when you can explain, in one sentence, what
problem dbt solves — and why "just write SQL scripts" isn't good
enough at scale.
