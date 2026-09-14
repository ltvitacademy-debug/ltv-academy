# Lesson 64 — Project 1 Kickoff: A Real-Time Retail Analytics Platform

**Chapter 4 · Added Projects — Capstones · Lesson 64 of 81**

## What you'll learn

- The requirements for Project 1, stated the way a stakeholder would state them
- How to turn those requirements into functional vs. non-functional lists (Lesson 2)
- Applying Lesson 4's storage choice and Lesson 5's processing model to this specific system
- Why this project needs a hybrid, not a pure batch or pure streaming design

## The requirements, as given

A retail chain has stores and an online storefront. Leadership wants one
dashboard showing sales by region and by product category, refreshed often
enough to catch a bad in-store promotion the same day it launches. That's
the whole brief — vague on purpose, because scoping vague requirements is
the actual skill Lesson 2 taught.

```
Functional:
  - Ingest in-store POS sales and online order events
  - Report total sales by region and by product category
  - Support "what happened today" and "what happened this quarter"

Non-functional:
  - Dashboard must reflect in-store sales same-day, not next-day
  - Must handle Black Friday-scale traffic spikes without falling over
  - Must not lose a sale event even if a downstream step fails
```

The non-functional list is where this project gets interesting. "Same-day"
freshness plus "don't lose events" plus "survive traffic spikes" rules out
the simplest possible design — nightly batch only — before you've written a
single line of code.

## Fixing the grain before anything else

Lesson 8 was explicit: grain first, schema second. For this project, the
grain is **one row per line item per sale**, in-store or online — the same
grain choice Lesson 8 walked through for `FactOrders`, and the same grain
Databricks & Delta Lake Lesson 25's medallion architecture will carry from
bronze all the way to the gold layer this project builds toward.

## Choosing storage and processing model

Lesson 4 laid out OLTP vs. OLAP vs. object storage as a decision, not a
default. In-store POS systems and the online storefront both produce
event-shaped data that needs to land somewhere cheap and durable before
anything analytical happens to it — that's object storage (a lakehouse's
bronze layer), not a transactional database.

Lesson 5's batch-vs-streaming-vs-hybrid choice resolves here too:

```
Nightly POS exports  -> batch    (stores already batch their exports)
Online order events  -> streaming (orders happen continuously, all day)
                      -> HYBRID ingestion, unified at the bronze layer
```

This is a deliberate hybrid, not a compromise. Lesson 6's Lambda
architecture is the right shape for it: a batch path for the nightly
in-store data, a streaming path (built the way Fabric & Real-Time
Analytics Lesson 19's Eventstreams handle continuous event ingestion) for
online orders, both landing in the same bronze layer so downstream
transforms don't need to know which path a row came from.

## Scoping the freshness SLA

Lesson 18 covered designing for freshness SLAs directly. "Same-day" isn't
precise enough to build against — Lesson 65 will turn it into an actual
number (how many hours old is too old) once the ingestion layer's real
constraints are on the table.

## Key terms

| Term | Meaning |
|---|---|
| Grain | One row per line item per sale — fixed now, carried through every later lesson |
| Hybrid ingestion | Batch for nightly POS exports, streaming for online orders, unified at bronze |
| Freshness SLA | The dashboard's "how current" requirement, to be made precise in Lesson 65 |

## Check yourself

You're ready for Lesson 65 when you can explain, without looking: why does
this project's non-functional requirements rule out a pure nightly-batch
design before any implementation detail is decided?
