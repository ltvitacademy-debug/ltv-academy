# Lesson 60 — Data Governance in Production

**Chapter 3 · Production Data Engineering · Lesson 60 of 70**

## What you'll learn

- What "governance" actually means, beyond a vague compliance word
- Cataloging, lineage, and ownership — the three concrete pieces
- Microsoft Purview as Fabric's governance layer, and its Unity Catalog parallel
- Why governance matters more, not less, once real-time pipelines are involved

## Governance, made concrete

"Governance" sounds abstract until it's broken into three real
questions: **What data exists, and where?** (cataloging). **Where
did this specific value actually come from?** (lineage). **Who is
responsible for this table, and who's allowed to change it?**
(ownership). None of these questions has an obvious answer once a
data platform has dozens of tables, several pipelines, and multiple
teams — which is exactly the point in this course's timeline where
that stops being hypothetical.

## Cataloging: what exists, and where

Microsoft Purview integrates with Fabric to build a searchable
catalog of every workspace's items — KQL Databases, Lakehouses,
Warehouses — so a new team member (or the person who built
something six months ago) can find "the table with taxi fares" by
searching, instead of asking around. This is the same underlying
need Databricks & Delta Lake's Unity Catalog (Lesson 38) solves for
that platform — different implementation, identical purpose.

## Lineage: where did this value come from?

```
RawTripEvents (Eventstream ingestion)
  -> Window transformation (Lesson 30)
  -> "high-value-trips" table (Lesson 36's routing)
  -> Real-Time Dashboard tile (Lesson 28)
```

**Lineage** traces a specific number on a dashboard back through
every transformation that produced it — genuinely useful when a
number looks wrong and the question is "which of these four stages
introduced the error," the same underlying need as Databricks &
Delta Lake's Lesson 44 (Data Lineage in Unity Catalog), applied to
this course's own real-time pipeline instead of a batch one.

## Ownership: who's responsible, who can change it

Lesson 44's data contract already established a producer and a
consumer relationship for one specific dataset. Ownership
generalizes that: every table, Eventstream, and dashboard in a real
production system needs a named owner — not necessarily the only
person who *can* touch it, but the person accountable for it working
correctly and the first point of contact when something's wrong.

## Why real-time raises the governance stakes

A batch table that's wrong for a day gets caught and fixed before
most people notice. A real-time dashboard that's wrong is wrong
*right now*, in front of whoever's watching it — which is exactly
why cataloging, lineage, and ownership matter more here, not less,
even though this entire course's material has been comparatively
lighter on governance until this point.

## Key terms

| Term | Meaning |
|---|---|
| Cataloging | Making every data asset findable and searchable |
| Lineage | Tracing a value back through every transformation that produced it |
| Ownership | A named, accountable owner for every data asset |

## Check yourself

You're ready for Lesson 61 when you can explain, without looking: why
does lineage matter more for a real-time dashboard than for a batch
report that only refreshes once a day?
