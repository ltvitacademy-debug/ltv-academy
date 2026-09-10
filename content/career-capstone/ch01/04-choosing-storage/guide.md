# Lesson 4 — Choosing Storage: OLTP vs. OLAP vs. Object Storage

**Chapter 1 · System Design for Data Engineers · Lesson 4 of 81**

## What you'll learn

- Three storage shapes you already know how to use, revisited as a choice
- The one question that actually decides between them
- Where each fits the taxi platform from Lessons 2–3
- Why real systems usually need more than one

## Three shapes, three different jobs

```
OLTP:            row-oriented, optimized for fast single-row
                 reads/writes -- the vendor's own booking system
OLAP:             column-oriented, optimized for aggregating
                 across millions of rows -- Fabric Warehouse (T-SQL
                 Lesson 10), KQL Database (Fabric Lesson 21)
Object storage:   files (often Delta/Parquet) in cheap, durable
                 blob storage -- OneLake (Fabric Lesson 3), the
                 Lakehouse's Files area (Fabric Lesson 4)
```

You've already used all three throughout this track — this lesson
is about recognizing them as a *choice*, not three unrelated tools
that happened to come up in different courses.

## The one question that decides between them

**How is the data actually going to be read?** A system serving
"update this one trip's fare" needs OLTP's fast single-row access.
A system serving "average fare across 200,000 trips today" needs
OLAP's columnar scan efficiency — reading a single `FareAmount`
column across every row, not whole rows one at a time. A system
that just needs to durably hold raw files before they're processed
needs object storage's cheap, durable capacity, with no fast query
pattern required at all yet.

## Fitting the taxi platform

```
Vendor's live booking app:        OLTP (row-level trip updates)
Raw incoming trip files:          Object storage (Delta/Parquet on OneLake)
Aggregated dashboards & reports:  OLAP (KQL Database or Fabric Warehouse)
```

None of these is "the" right answer for the whole platform — each
piece of the platform has a different read pattern, which is
exactly why real systems combine all three rather than picking one.

## Why real systems need more than one

The medallion architecture (Databricks & Delta Lake, throughout
that course) is this exact idea, formalized: raw object storage
(bronze) feeds cleaned object storage (silver) feeds an OLAP-shaped
serving layer (gold). Trying to force one storage shape to do every
job — OLTP for analytics, or OLAP for millisecond single-row
updates — works badly in both directions, which is why the
question isn't "which one" but "which one, for which part."

## Key terms

| Term | Meaning |
|---|---|
| OLTP | Row-oriented, fast single-row reads/writes |
| OLAP | Column-oriented, fast aggregation across many rows |
| Object storage | Cheap, durable file storage, no built-in fast query pattern |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
does "average fare across 200,000 trips" favor OLAP over OLTP, in
terms of what actually gets read?
