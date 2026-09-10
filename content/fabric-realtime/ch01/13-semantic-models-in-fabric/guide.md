# Lesson 13 — Semantic Models in Fabric

**Chapter 1 · Microsoft Fabric · Lesson 13 of 70**

## What you'll learn

- A semantic model: the layer between raw tables and a report, in one sentence
- The default model Fabric creates automatically, alongside a Lakehouse
- Relationships and measures — real business logic, defined once
- Where Direct Lake mode actually lives

## Between raw tables and a report

Recall Lesson 4's `trips` table and Lesson 9's `zones` table: two
separate tables, with no defined relationship between them, no
agreed-on business definitions (what counts as "revenue"? "an
active trip"?). A **semantic model** is the layer that adds exactly
that: relationships between tables, measures (business
calculations), and friendly names, so a report author queries
concepts, not raw columns.

## The default model, created automatically

The moment a Lakehouse (Lesson 4) exists, Fabric automatically
creates a matching **default semantic model**, with every Lakehouse
table already present as a candidate for a report — no separate
setup step required, similar in spirit to how a workspace (Lesson
2) already has somewhere for data to live before you ask for it.

## Relationships and measures

```
Relationship: trips.PULocationID -> zones.LocationID
Measure: Total Revenue = SUM(trips[fare_amount])
Measure: Trip Count = COUNTROWS(trips)
```

A **relationship** connects `trips` to `zones` the way Databricks &
Delta Lake Lesson 55's `join()` connected the same two tables in
PySpark — except defined once, in the model, rather than repeated
in every query that needs it. A **measure** is a named, reusable
calculation — `Total Revenue`, defined once, then usable by name in
any report, rather than each report author writing their own
`SUM(fare_amount)` and risking two different definitions of the
same thing.

## Where Direct Lake mode actually lives

Lesson 12's Direct Lake mode isn't a report-level setting — it's a
property of the **semantic model** itself. A model built on top of
a Lakehouse's tables, in Direct Lake mode, is what actually lets
every report built against that model read Delta's Parquet files
directly, with the relationships and measures defined here applying
on top of that fast, direct read.

## Key terms

| Term | Meaning |
|---|---|
| Semantic model | The layer adding relationships, measures, and names on top of raw tables |
| Default semantic model | Auto-created alongside a Lakehouse, one per Lakehouse |
| Measure | A named, reusable calculation — defined once, used everywhere |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
does defining a measure once, in the semantic model, matter more
than it might seem?
