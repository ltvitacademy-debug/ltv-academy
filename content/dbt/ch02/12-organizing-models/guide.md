# Lesson 12 — Organizing Models Across a Project

**Chapter 2 · Sources, Models & ref() · Lesson 12 of 45**

## What you'll learn

- Where the models you've built so far (staging, one marts model)
  actually live in a real project's folder structure
- The three-layer shape most real dbt projects converge on — a
  preview, not the full teaching (that's Chapter 3)
- One organizing principle that holds regardless of project size:
  folders mirror data flow, not just file type

## What you've built so far, placed on a map

Across this chapter you built a source declaration, a staging model,
and one model that joins two staging models together. In a real
project, those don't all sit in one flat `models/` folder — they're
organized by *what stage of transformation they represent*:

```
models/
├── staging/
│   └── jaffle_shop/
│       ├── src_jaffle_shop.yml       (Lesson 7 — sources)
│       ├── stg_jaffle_shop__customers.sql   (Lesson 8)
│       └── stg_jaffle_shop__orders.sql      (Lesson 8)
└── marts/
    └── customers.sql                  (Lesson 10 — built on staging)
```

Two folders so far: `staging/`, subdivided by source, and `marts/`,
where business-facing models land. That's not the whole picture —
just what this chapter's lessons have actually produced.

## A preview of the full shape (Chapter 3 teaches this properly)

Most real dbt projects converge on three layers, not two:

- **Staging** — 1:1 with sources, light cleanup (you know this one).
- **Intermediate** — joins and logic that aren't yet a final,
  business-facing model; exists purely to keep marts models
  readable.
- **Marts** — the final, business-facing models: what analysts and
  BI tools actually query.

This lesson isn't teaching *how* to build an intermediate model, or
exactly when one earns its place instead of folding logic straight
into a marts model — Chapter 3 covers that in full, with real
examples. For now, just recognize the shape: raw → staging →
(sometimes intermediate) → marts.

## The organizing principle that scales

Whether a project has ten models or a thousand, one rule keeps it
navigable: **folders mirror the data's transformation stage, not
just its business subject.** A `staging/` folder only ever contains
staging models; a `marts/` folder only ever contains business-facing
models. That predictability is what let you open the folder tree
above and know exactly what each file does before reading a line of
SQL — the same benefit Lesson 4 described for the top-level
`models/`, `macros/`, `tests/` split, just one level deeper.

## Key terms

| Term | Meaning |
|---|---|
| `staging/` | Subfolder for 1:1, lightly-cleaned models — one subfolder per source, by convention |
| `marts/` | Subfolder for final, business-facing models |
| Intermediate | The (optional) layer between staging and marts — full treatment in Chapter 3 |

## Lab

1. Move your Lesson 7-10 files into a `staging/<source_name>/` and
   `marts/` structure matching the tree above, if they aren't
   already organized that way.
2. Run `dbt run` again and confirm moving files didn't change
   anything about how the project builds — folder location is
   organizational, not functional.
3. Write one sentence predicting when you'd add an `intermediate/`
   folder to this project, before Chapter 3 tells you the actual
   answer.

## Check yourself

You're ready for Chapter 3 when you can place any model you've built
so far into the correct folder — staging or marts — and explain why
folder location doesn't change how dbt actually resolves `ref()`
calls.
