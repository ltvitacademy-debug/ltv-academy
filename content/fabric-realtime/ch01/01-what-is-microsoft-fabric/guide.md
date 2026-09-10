# Lesson 1 — What Is Microsoft Fabric?

**Chapter 1 · Microsoft Fabric · Lesson 1 of 70**

## What you'll learn

- Where Fabric fits, picking up exactly where Azure Databricks & Delta Lake left off
- Fabric as a single, unified SaaS platform — not a cluster you provision
- OneLake, previewed: one lake, shared by every engine in the product
- What's ahead in this course: Fabric, real-time analytics, and production practice

## Picking up where Databricks & Delta Lake left off

The last course ended with a real, governed, declarative pipeline —
workspaces, Delta tables, Unity Catalog, Lakeflow — all running on
Databricks. Microsoft Fabric is a genuinely different product built
around a similar core idea: Delta Lake as the shared table format
(Databricks & Delta Lake's Chapter 2 material is directly reusable
knowledge here), but with Microsoft's own SaaS platform, licensing
model, and set of engines around it.

## Fabric: SaaS, not clusters you provision

Recall Databricks & Delta Lake's Lesson 4: creating a cluster meant
picking a VM size, a runtime version, autoscaling bounds — real
infrastructure decisions. Fabric has no equivalent step. It's a
**Software-as-a-Service** platform: you get a workspace and a
capacity (a pool of compute Microsoft manages, covered properly in
Lesson 14), and every engine — Spark notebooks, a SQL warehouse, a
real-time analytics engine — runs against that capacity without you
ever choosing a VM size or a Spark version yourself.

## OneLake — previewed

```
OneLake
    <- one Lakehouse's Delta tables
    <- one Warehouse's tables
    <- one Eventhouse's KQL data (Chapter 2)
```

Every Fabric item stores its actual data in **OneLake** — one
logical data lake for the entire organization, the way Unity
Catalog's metastore (Databricks & Delta Lake Lesson 38) was one
governance layer across workspaces. Lesson 3 covers this properly;
for now, the core idea is that a Lakehouse, a Warehouse, and (in
Chapter 2) an Eventhouse all read and write the same underlying
OneLake storage, in the same Delta format, without you copying data
between them.

## What this course covers

1. **Microsoft Fabric** (this chapter) — workspaces, lakehouses, warehouses, notebooks, pipelines, Direct Lake, capacities.
2. **Real-Time Data Engineering** — Eventstreams, KQL, Eventhouse, and real streaming semantics (windowing, watermarks) that Databricks & Delta Lake's Structured Streaming material only partly covered.
3. **Production Data Engineering** — CI/CD, testing, observability, incident response: the practices that apply across everything built in this entire 3-course sequence so far.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Fabric | A unified SaaS analytics platform — no clusters to provision |
| Capacity | The managed compute pool every Fabric engine runs against |
| OneLake | One logical data lake, shared by every Fabric engine |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
doesn't creating a Fabric item require choosing a VM size or a
runtime version, the way Databricks' compute form did?
