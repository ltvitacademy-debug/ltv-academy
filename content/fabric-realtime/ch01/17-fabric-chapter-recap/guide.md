# Lesson 17 — Fabric Chapter Recap — Where This Fits With Databricks

**Chapter 1 · Microsoft Fabric · Lesson 17 of 70 — Chapter Finale**

## What you'll learn

- Every lesson in this chapter, in one line each
- The single throughline: OneLake and Delta, underneath every item type
- One NYC Taxi record, traced through Fabric's own items
- What's ahead: real-time analytics, where Fabric genuinely does something new

## This chapter, in one line each

1. **What Is Microsoft Fabric?** — SaaS, not clusters; OneLake, previewed.
2. **Fabric Workspaces** — the same container idea, a simpler role model.
3. **OneLake** — one automatic, tenant-wide lake; no `MANAGED LOCATION` decision.
4. **Creating a Lakehouse** — Files (bronze instinct) and Tables (real Delta).
5. **Fabric Lakehouse vs. Databricks Lakehouse** — same Delta format, different platform.
6. **Fabric Notebooks** — same cells and DataFrame API, different attachment.
7. **Shortcuts** — a reference, not a copy; Unity Catalog's external tables, reimagined.
8. **Fabric Data Factory** — the same ADF activity model, movement not transformation.
9. **Dataflows Gen2** — Power Query, for smaller, business-user transformations.
10. **Fabric Warehouse** — full T-SQL, real writes, completing the circle to the T-SQL course.
11. **Lakehouse vs. Warehouse** — chosen by who's actually querying, day to day.
12. **Direct Lake Mode** — Delta's own files, read directly; speed and freshness, both.
13. **Semantic Models** — relationships and measures, defined once.
14. **Capacities and SKUs** — one shared compute pool, bursting and smoothing.
15. **Git Integration** — item definitions tracked, never the underlying data.
16. **The Monitoring Hub** — one unified run history, across every item type.

## The single throughline

Every one of these seventeen lessons is really the same message,
said seventeen different ways: **Fabric is a new platform built
around the exact same Delta Lake foundation** the previous course
established in depth. Nothing about `_delta_log/`, ACID guarantees,
schema enforcement, or the DataFrame API changed — only the
platform surrounding that foundation did.

## One record, through Fabric's own items

A single NYC Taxi trip: arrives as a CSV, moved by a **Copy
activity** (Lesson 8) into a **Lakehouse's Files** (Lesson 4) →
loaded into a real **Delta table** in **Tables**, the same
transaction log guarantees from the previous course applying
unchanged → cleaned by a **notebook**, real PySpark, attached to
that same lakehouse (Lesson 6) → related to a `zones` table and
summarized by a **measure**, inside a **semantic model** (Lesson
13) → read by a Power BI report in **Direct Lake mode** (Lesson
12), fast and current, with no copy ever made.

## What's ahead

Chapter 1 was mostly "the same ideas, a new platform." Chapter 2,
**Real-Time Data Engineering**, is where Fabric does something
genuinely new relative to everything covered so far — Eventstreams,
KQL, and real streaming semantics (windowing, watermarks) that the
previous course's Structured Streaming material only partially
addressed.

## Check yourself

Chapter complete when you can explain, without looking: what is the
one idea underneath almost every lesson in this chapter?
