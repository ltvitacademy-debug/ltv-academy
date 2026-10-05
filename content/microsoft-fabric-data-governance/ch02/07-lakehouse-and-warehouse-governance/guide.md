# Lesson 7 — Lakehouse and Warehouse Governance

**Chapter 2 · OneLake · Lesson 7 of 25**

## What you'll learn

- The two main OneLake-backed storage-and-compute item types: Lakehouse and Warehouse
- The real difference between them — schema-on-read vs. a T-SQL engine that enforces a schema
- Why that difference is a governance decision, not just a technical one
- What they share by default: OneLake storage and inherited workspace roles

## Two item types, one "New item" picker

Lakehouse and Warehouse both come from the same place — the Fabric workspace's **New item** picker. That matters: a workspace member doesn't have to go hunting through different products for different storage styles the way they might across separate on-prem tools. Both items are backed by OneLake (Lesson 6) and both start out governed by whatever roles the workspace itself already has (Lesson 5).

![Fabric's New item picker filtered to "lake," with Lakehouse highlighted among Mirrored Snowflake, Snowflake database, and Warehouse options.](/courses/microsoft-fabric-data-governance/ch02/07-lakehouse-and-warehouse-governance/new-lakehouse-menu.png)
*Lakehouse: "Store big data for cleaning, querying, reporting, and sharing" — one card among several storage item types in the same picker.*

## Lakehouse: schema-on-read

A **Lakehouse** stores files and tables together in one item. It's Spark-oriented and **schema-on-read** — structure gets applied when the data is queried, not locked in when it's written. That flexibility is the whole point: engineering teams that need to land raw or semi-structured data before it's fully modeled get a place to work with it without having to define a rigid structure up front.

## Warehouse: an enforced schema

A **Warehouse** is a full T-SQL engine, and it's **schema-on-write** — the schema is defined and enforced, not something that can silently drift. The same "New item" picker's Store data section shows Warehouse and Sample warehouse side by side.

![Fabric's New item picker Store data section, with Sample warehouse and Warehouse cards both outlined.](/courses/microsoft-fabric-data-governance/ch02/07-lakehouse-and-warehouse-governance/warehouse-home-hub.png)
*"Warehouse: Provide strategic insights from multiple sources into your entire business" — a Sample warehouse option starts one pre-loaded with data.*

A real warehouse makes that enforced structure visible the moment you open it. The screenshot below is a sample warehouse's SQL editor: an Explorer tree showing Schemas, dbo, and a fixed set of Tables (Date, Geography, Hackney, Medallion, Time, Trip, Weather), with a data preview grid open on the Date table.

![A Warehouse SQL editor: the Explorer tree showing Schemas > dbo > Tables (Date, Geography, Hackney, Medallion, Time, Trip, Weather), with a Data preview grid open on the Date table.](/courses/microsoft-fabric-data-governance/ch02/07-lakehouse-and-warehouse-governance/warehouse-with-sample-table-view.png)
*That Tables list isn't a loose suggestion — it's the schema the warehouse enforces. Every consumer querying this warehouse sees the same defined structure.*

For a reporting or BI consumer, that's exactly the guarantee you want: the shape of the data isn't going to change out from under their report. For an engineering team still shaping raw data, it would just get in the way — which is why both item types exist side by side instead of one replacing the other.

## Which one to steer a team toward

Both land their actual data in OneLake by default (Lesson 6), and both inherit the workspace's roles (Lesson 5) unless additional item-level security gets layered on top — which is exactly what Lesson 8 covers next. The governance call this lesson sets up isn't "which is better" — it's **who's consuming the data**:

- Point engineering and data science teams that need flexibility toward a **Lakehouse**
- Point BI and reporting consumers that need a guaranteed, consistent structure toward a **Warehouse**

## Key terms

| Term | Meaning |
|---|---|
| Lakehouse | OneLake-backed storage item combining files and tables, Spark-oriented, schema-on-read |
| Warehouse | OneLake-backed, full T-SQL engine with an enforced, defined schema |
| Schema-on-read vs. schema-on-write | Whether structure is applied at query time (Lakehouse) or locked in and enforced at write time (Warehouse) |

## Lab

Pick a real reporting workload you're familiar with (or imagine one: a monthly sales dashboard built for a finance team). Write two or three sentences arguing whether it belongs in a Lakehouse or a Warehouse, and why — specifically in terms of whether the consumer needs a guaranteed schema or needs flexibility while the data is still being shaped.

## Check yourself

Can you explain the core difference between a Lakehouse and a Warehouse without looking back, say which one a governance-minded team would pick for BI-facing data and why, and name where both actually store their data?
