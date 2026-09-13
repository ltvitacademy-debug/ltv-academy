# Lesson 2 — Snowflake Architecture: Storage, Compute & Cloud Services

**Chapter 1 · Snowflake Architecture & Getting Started · Lesson 2 of 60**

## What you'll learn

- Snowflake's three architectural layers: storage, compute, and cloud services
- Why separating storage from compute is the single most important idea in this course
- How that separation lets multiple warehouses query the same data without fighting each other
- Why warehouses can be resized or suspended independently of the data they read

## The three layers

Snowflake looks like one product from the worksheet, but underneath it is
built from three layers that scale independently of each other:

![Snowflake's official architecture diagram: three stacked layers labeled Cloud Services (Security, Management, Metadata, Optimization), Compute (Virtual Warehouses), and Database Storage (Structured, Semi-structured, Unstructured).](/courses/snowflake/ch01/02-snowflake-architecture-storage-compute-cloud-services/snowflake-architecture-3-layers.png)
*Storage, compute, and cloud services are three separate layers — none of them is "the database" on its own.*
Source: [Snowflake Documentation — Key Concepts & Architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)

**Database storage** — the bottom layer. When you load data into Snowflake,
it reorganizes it into a compressed, columnar internal format and stores it
in cloud storage (S3, Azure Blob, or GCS, depending on which cloud your
account runs on). You never touch these files directly, and there's no
"data files live on this drive" concept the way there is with SQL Server —
Snowflake manages storage entirely, splitting tables into micro-partitions
behind the scenes.

**Compute** — the middle layer, made of **virtual warehouses**. A virtual
warehouse is a cluster of compute resources (CPU, memory, temp disk) that
does the actual work of running a query. Warehouses read from storage but
don't own it — any warehouse can query any table it has access to.

**Cloud services** — the top layer, coordinating everything else:
authentication, infrastructure management, metadata, query parsing and
optimization, and access control. This is the layer that makes Snowflake
feel like a single managed service instead of a cluster you have to babysit.

## Why the separation is the big idea

On SQL Server, storage and compute live on the same box. If ten analysts
run heavy queries at once, they compete for the same CPU and memory as
whatever wrote the data. Scaling up means buying a bigger box for
*everything* — storage and compute together, whether you need more of both
or not.

Snowflake decouples them on purpose:

- **Multiple warehouses, one copy of the data.** An `ANALYTICS_WH` running
  dashboard queries and a `LOAD_WH` bulk-loading files can both hit the
  same table at the same time. Neither blocks the other, because they're
  separate compute clusters reading from shared storage — not separate
  copies of the data.
- **Warehouses scale independently.** Need more power for one workload?
  Resize that warehouse. The data underneath doesn't move, get copied, or
  even notice.
- **Warehouses turn off.** A warehouse that isn't running a query can be
  suspended — and while it's suspended, it costs nothing, because storage
  and compute are billed separately. Lesson 4 covers auto-suspend and
  auto-resume in detail; it only works *because* compute is separate from
  storage in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Database storage layer | Where Snowflake keeps your data — compressed, columnar, split into micro-partitions, managed entirely by Snowflake |
| Compute layer | The virtual warehouses that actually run queries against the storage layer |
| Virtual warehouse | A cluster of compute resources you create, size, and suspend independently of the data |
| Cloud services layer | The coordination layer: auth, metadata, query optimization, access control |
| Micro-partition | The small, immutable, compressed unit Snowflake automatically splits table data into |

## Lab

1. In Snowsight, open **Admin → Warehouses** and note the warehouses that
   already exist in your account (a trial account ships with `COMPUTE_WH`).
2. Run `SELECT CURRENT_WAREHOUSE();` in a worksheet — confirm it matches
   what the UI shows as your active warehouse.
3. Run `SHOW WAREHOUSES;` and look at the `size` and `state` columns —
   these describe the compute layer only. Nothing about this command tells
   you where the underlying data physically lives, because that's a
   separate layer you don't manage directly.

## Check yourself

You're ready for Lesson 3 when you can explain, in one sentence, why two
warehouses of different sizes can query the same table at the same time
without slowing each other down.
