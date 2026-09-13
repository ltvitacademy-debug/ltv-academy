# Lesson 4 — dbt Project Structure

**Chapter 1 · Analytics Engineering & dbt Fundamentals · Lesson 4 of 45**

## What you'll learn

- The real folder layout every dbt project shares
- What `dbt_project.yml` actually configures
- Where models, macros, tests, and seed data each live, and why the
  split exists
- What `packages.yml` is for, before Chapter 6 covers it in depth

## The folder layout

Whether you're using dbt Cloud or dbt Core, `dbt init` (or dbt
Cloud's project setup) generates the same skeleton:

![A code editor's file explorer showing a real dbt project: analysis/, data/, macros/, models/example/ containing my_first_dbt_model.sql, my_second_dbt_model.sql and schema.yml, tests/, and dbt_project.yml open in the editor with its actual YAML config.](/courses/dbt/ch01/04-dbt-project-structure/starter-project-dbt-cli.png)
*The exact folder structure `dbt init` generates — nothing hidden, nothing generated at runtime that isn't a plain file on disk.*
Source: [dbt Docs — Quickstart for manual install](https://docs.getdbt.com/guides/manual-install)

## What each folder is for

| Folder / file | Purpose |
|---|---|
| `models/` | Your `.sql` transformation files — this is where almost all your work lives, starting Chapter 2 |
| `macros/` | Reusable Jinja snippets you can call from any model (Chapter 6) |
| `tests/` | Custom "singular" tests — one-off SQL assertions (Chapter 4) |
| `data/` (or `seeds/` in newer versions) | Small static `.csv` files dbt loads as tables (Chapter 5) |
| `analysis/` | Ad hoc `.sql` you want dbt to compile (resolve `ref()`s) but never actually run/build |
| `dbt_project.yml` | The project's core config file — required, one per project |
| `packages.yml` | Declares external dbt packages this project depends on (Chapter 6) |

## `dbt_project.yml`: the file that makes it a project

Every dbt project needs exactly one `dbt_project.yml` at its root.
From the screenshot above, the real generated file includes:

```yaml
name: 'my_new_project'
version: '1.0.0'
profile: 'default'

source-paths: ["models"]
analysis-paths: ["analysis"]
test-paths: ["tests"]
data-paths: ["data"]
macro-paths: ["macros"]

target-path: "target"
clean-targets:
    - "target"
    - "dbt_modules"

models:
  my_new_project:
    example:
      materialized: view
```

Two things worth noticing: `profile` points at a *name*, not the
actual connection details (those live outside the project, covered
next lesson) — and the `models:` block is where you set defaults,
like "everything under `models/example/` builds as a view," which
individual models can override.

## Why this split exists

Keeping models, tests, macros, and static data in separate top-level
folders isn't arbitrary — it's what lets dbt (and a human skimming
the file tree) immediately know what kind of thing a file is, without
opening it. A `.sql` file under `models/` is always a transformation
step; one under `tests/` is always an assertion. That predictability
is part of what makes a dbt project navigable at a glance, the same
way the Lineage graph made dependencies visible at a glance in
Lesson 1.

## Key terms

| Term | Meaning |
|---|---|
| `dbt_project.yml` | The required root config file that makes a folder a dbt project |
| `models/` | Where transformation `.sql` files live |
| `packages.yml` | Declares external dbt package dependencies |
| Seed | A small static `.csv` file dbt loads as a table |

## Lab

1. If you ran `dbt init` in an earlier lab (or plan to), open the
   generated folder and match every top-level item to the table
   above.
2. Open `dbt_project.yml` and find the `profile:` line — note that it
   names a profile, but doesn't contain any actual credentials.
3. Without opening it, guess what `models/example/schema.yml` might
   contain, based only on its location and the folder-split logic
   above. Then open it and check.

## Check yourself

You're ready for Lesson 5 when you can list, from memory, what each
top-level folder in a dbt project holds — and explain why `profile:`
in `dbt_project.yml` doesn't itself connect to anything.
