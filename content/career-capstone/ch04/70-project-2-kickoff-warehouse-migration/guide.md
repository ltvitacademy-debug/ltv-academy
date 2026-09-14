# Lesson 70 — Project 2 Kickoff: A Multi-Source Data Warehouse Migration

**Chapter 4 · Added Projects — Capstones · Lesson 70 of 81**

## What you'll learn

- The requirements for Project 2, a very different problem shape than Project 1
- Why migration projects need Chapter 1's process applied differently, not skipped
- Scoping three legacy sources into one target: a Fabric Data Warehouse
- What "migration" adds on top of ordinary system design

## The requirements, as given

A retailer has grown by acquisition. It now runs three separate systems
holding overlapping data: a legacy on-prem SQL Server database (orders),
a newer cloud CRM (customers), and a third-party inventory system
(products, stock levels). Leadership wants all three consolidated into one
Fabric Data Warehouse so a single BI team can report across the whole
business, instead of three teams each reporting on their own slice.

```
Functional:
  - Consolidate orders, customers, and inventory into one warehouse
  - Support cross-source reporting (e.g. "revenue by customer segment,
    inventory-adjusted") that no single source system can answer alone
  - Preserve historical data — this is a migration, not a fresh start

Non-functional:
  - Legacy systems keep running during migration (no big-bang cutover)
  - Data must reconcile: totals in the new warehouse must match the
    old systems during the transition period
  - Downtime for the eventual cutover must be minimal and scheduled
```

This is a different problem shape than Project 1. Project 1 designed a
system from nothing; Project 2 designs a system that has to coexist with,
and eventually replace, three systems that already exist and already have
years of real data in them.

## Applying Chapter 1's process to a migration

Lesson 2's functional/non-functional split still applies — it's the same
process, not a different one, just answering different questions. Lesson
4's storage choice resolves quickly here: the target is explicitly a
**Fabric Data Warehouse**, not a lakehouse, because Fabric & Real-Time
Analytics Lesson 10's warehouse strengths — a full T-SQL surface, strong
multi-table joins, familiar to the BI team doing cross-source reporting —
match this project's actual query pattern better than Lesson 11's
lakehouse case did for Project 1.

```
Project 1: build from nothing        -> lakehouse (simple aggregations)
Project 2: consolidate 3 systems     -> Fabric Data Warehouse
           for BI-team cross-source     (T-SQL, complex joins,
           reporting                    familiar to the BI team)
```

## Why "no big-bang cutover" changes the design

Lesson 5's processing-model choice here isn't really batch-vs-streaming —
all three legacy sources are batch-extractable. The real design question
is **migration order and coexistence**: which source moves first, how the
new warehouse and the old systems both stay correct at the same time
during the overlap period, and how reconciliation gets checked before
anyone trusts the new warehouse alone. That's the subject of Lesson 71.

## Scoping with a case study in mind

Lesson 22's retail inventory case study sketched a related but narrower
problem — this project is that same industry, but the actual challenge is
consolidation across systems that don't share a common key scheme yet,
which Lesson 71 will assess directly.

## Key terms

| Term | Meaning |
|---|---|
| Consolidation target | One Fabric Data Warehouse replacing three separate legacy systems |
| Coexistence period | The overlap where old systems and new warehouse must both stay correct |
| Reconciliation | Verifying the new warehouse's totals match the old systems before cutover |

## Check yourself

You're ready for Lesson 71 when you can explain, without looking: why does
"no big-bang cutover" turn this project's real design question into
migration order and coexistence, rather than batch-vs-streaming?
