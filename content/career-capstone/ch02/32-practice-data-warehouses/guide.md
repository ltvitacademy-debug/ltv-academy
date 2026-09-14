# Lesson 32 — Practice Questions: Data Warehouses

**Chapter 2 · DP-700 Certification Prep · Lesson 32 of 81**

## What you'll learn

- A worked set of DP-700-style scenarios focused on Fabric Warehouse
- How to distinguish "needs a Warehouse" scenarios from "needs a
  Lakehouse" scenarios under exam pressure
- Where semantic models and SQL endpoints fit into Warehouse
  scenarios specifically

## How to use this lesson

Same format as Lesson 31: read each scenario as DP-700 would present
it, answer it yourself first, then check the reasoning. This lesson's
quiz runs longer than a normal 5-question quiz because Warehouse
questions are one of the most heavily-tested single topics on the
real exam.

## Worked question 1

*A team's BI tool connects over a standard SQL connection string and
issues T-SQL queries with joins across five tables and window
functions. They need strict schema guarantees. What Fabric item
should they provision?*

A **Warehouse** (Fabric Lesson 10). The SQL-connection-string detail
and window-function usage are the giveaway — a Lakehouse's SQL
endpoint supports a subset of T-SQL for read access, but a Warehouse
is the full T-SQL surface with enforced schema, built for exactly
this kind of BI-tool connectivity.

## Worked question 2

*A Warehouse table needs to support concurrent multi-statement
transactions with rollback. Does Fabric Warehouse support this, and
how does that compare to a Lakehouse?*

Yes — Fabric Warehouse supports full multi-table transactions,
matching traditional SQL Server/T-SQL transactional behavior
(Fabric Lesson 11's comparison). A Lakehouse, by contrast, gets its
consistency guarantees from Delta Lake's per-table ACID transactions
(Databricks Lesson 18) rather than a single cross-table transaction
scope — a subtler distinction the exam likes to test directly.

## Worked question 3

*A Warehouse and a Lakehouse both expose a "SQL endpoint." A
scenario asks which one supports INSERT/UPDATE/DELETE through that
endpoint.* 

Only the **Warehouse**. A Lakehouse's SQL endpoint is read-only —
writes to a Lakehouse table happen through Spark, a pipeline, or a
Dataflow, never directly through its SQL endpoint. This read/write
asymmetry is one of the single most exam-tested Warehouse-vs-
Lakehouse facts.

## Key terms

| Term | Meaning |
|---|---|
| Warehouse SQL endpoint | Full read/write T-SQL surface |
| Lakehouse SQL endpoint | Read-only T-SQL subset over Lakehouse tables |
| Warehouse transactions | Full multi-table ACID transactions, unlike a Lakehouse's per-table Delta guarantees |

## Check yourself

Take the quiz below. If you miss more than one, revisit Fabric
Lessons 10 and 11 before continuing to Lesson 33.
