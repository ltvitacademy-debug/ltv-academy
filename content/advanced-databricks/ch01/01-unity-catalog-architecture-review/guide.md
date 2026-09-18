# Lesson 1 — Unity Catalog Architecture, Revisited

**Chapter 1 · Beyond the Basics: Unity Catalog Deep Dive · Lesson 1 of 34**

## What you'll learn

- A fast recap of the object hierarchy from Databricks & Delta Lake Lesson 38 — not a re-teach
- What that lesson didn't cover: workspace bindings and metastore-to-workspace topology at scale
- Why one organization usually runs one metastore per region, not one per team
- What this chapter goes deeper on that Lessons 38-45 only introduced

## The hierarchy, in one pass

Databricks & Delta Lake Lesson 38 already covered this in full:

![Unity Catalog's object hierarchy — a metastore containing catalogs, each holding schemas, each holding tables, views, volumes, functions, models, and secrets.](/courses/advanced-databricks/ch01/01-unity-catalog-architecture-review/object-hierarchy.png)

Metastore → catalog → schema → table/view/volume/function. One
governance layer, shared across every workspace attached to it.
That's the whole picture at the level Lesson 38 needed it. This
course assumes you have that picture already — the rest of this
lesson is what that picture leaves out.

## What "attached" actually means, at scale

Lesson 38 said a metastore is "shared across every workspace in that
region" — true, but incomplete. A metastore can be attached to many
workspaces, and a **catalog** within it can be **bound to a subset**
of those workspaces specifically. A `finance` catalog might be
readable only from the two workspaces Finance actually uses, even
though ten other workspaces share the same metastore. That binding
is the real access-control lever this chapter spends Lessons 2 and 6
on — not just who can read a table, but which workspace can even see
the catalog exists.

```
One metastore (region: eastus2)
├── workspace-finance-prod   -- catalog binding: finance, shared
├── workspace-finance-dev    -- catalog binding: finance, shared
├── workspace-marketing-prod -- catalog binding: marketing only
└── workspace-data-eng       -- catalog binding: ALL catalogs
```

## Why one metastore per region, not per team

A new team's instinct is often "we need our own metastore for
isolation." In practice, Databricks recommends **one metastore per
region** for the whole organization, with isolation handled by
catalog-level workspace bindings instead — Lesson 38's shared
governance benefit only holds if there's actually one shared
metastore to govern. Splitting metastores per team recreates exactly
the per-workspace permission silos Unity Catalog was built to
eliminate.

## What this chapter actually adds

Lessons 38-45 introduced catalogs/schemas (39-40), managed vs.
external tables (41), GRANT/REVOKE (42), row/column security (43),
lineage (44), and volumes (45) — each at the level needed to get
something working. This chapter revisits five of those six topics
(2-6) at production scale: external locations as their own governed
object (2), managed-vs-external as a real architectural decision
with migration cost (3), volumes for the file-access patterns a
single Lesson 45 example didn't cover (4), lineage as an API and
compliance tool rather than a graph you glance at (5), and access
control patterns beyond a single `GRANT` statement (6).

## Key terms

| Term | Meaning |
|---|---|
| Metastore | The top-level, region-scoped governance container — one per region, organization-wide |
| Catalog binding | Restricting which workspaces can see/use a specific catalog, within a shared metastore |
| Workspace isolation | Achieved through catalog bindings, not through separate metastores |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does splitting into multiple metastores per team undo the actual
benefit Unity Catalog provides?
