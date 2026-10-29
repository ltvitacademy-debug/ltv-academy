# Lesson 24 — A Single Data Platform Serving Multiple Clouds

**Chapter 6 · Data Architecture Across Hybrid and Multi-Cloud · Lesson 24 of 32**

## What you'll learn

- Why "one logical data platform" doesn't require "one physical copy
  in one place" — and why that distinction is the key to reconciling
  this chapter's earlier lessons
- How a **lakehouse** architecture — open table formats on top of
  cloud object storage — decouples the storage layer from the compute
  engine, letting more than one cloud's compute read the same tables
- Real open table formats (Delta Lake, Apache Iceberg, Apache Hudi)
  and real cross-cloud catalogs (Databricks Unity Catalog, the Iceberg
  REST catalog standard) that make this practical today
- When deliberate regional data partitioning — rather than one shared
  table — is the right answer instead, tying back to data gravity and
  sovereignty

## Reconciling gravity, replication, and "one platform"

This chapter has built toward a real tension. Lesson 21 said data
gravity pulls compute toward wherever data already lives. Lesson 23
said sovereignty requirements can legally force data to stay pinned to
specific regions. And yet enterprises genuinely want "a single data
platform" — one consistent way to query, govern, and trust their data,
regardless of which cloud a given analyst or application happens to be
running in.

The resolution is that **"single platform" describes a consistent
format, catalog, and governance layer — not a single physical storage
location.** You can have one logical platform while the actual bytes
remain where gravity or sovereignty require them to be. This lesson
covers how that's actually built.

## The lakehouse pattern: storage decoupled from compute

A **lakehouse** architecture stores data as files in cloud object
storage (Azure Data Lake Storage, Amazon S3) using an **open table
format** that adds database-like structure — schema, transactions, time
travel — on top of plain files. The three real formats in production
use today are:

- **Delta Lake** (originated at Databricks, now open source)
- **Apache Iceberg** (originated at Netflix, now an Apache project with
  very broad multi-engine adoption)
- **Apache Hudi** (originated at Uber)

The architectural payoff is that the storage layer and the compute
engine are no longer the same product. Any compute engine that
understands the table format — Databricks Spark, Snowflake, Trino,
AWS Athena, Microsoft Fabric — can read and often write the same
underlying tables, regardless of which cloud that compute engine is
running in. That's the mechanism that makes a genuinely multi-cloud
data platform possible: the data's physical home doesn't have to
match every compute engine that needs to touch it.

## The catalog is what actually makes it "one platform"

Open file formats alone aren't enough — something has to track which
tables exist, their schemas, their permissions, and where their data
actually lives, consistently, no matter which compute engine or cloud
is asking. That's the job of a **catalog**:

- **Databricks Unity Catalog** is a real, production governance and
  catalog layer that spans workspaces across AWS, Azure, and Google
  Cloud, giving one consistent permission model and table registry
  across all three.
- **The Iceberg REST catalog** is an open standard, not tied to one
  vendor, that lets Snowflake, Databricks, Trino, and other engines
  all discover and read the same Iceberg tables through one consistent
  catalog interface.
- **Snowflake's cross-cloud and cross-region replication** features
  let a Snowflake account maintain synchronized data across AWS,
  Azure, and Google Cloud deployments, presenting what functions as
  one platform to the people querying it.

The catalog, not the storage bucket, is what actually makes the
platform feel singular: one governance model, one place to see what
exists and who can touch it, even when the physical bytes are
deliberately scattered across clouds and regions.

## When the physical copy still has to be local

None of this erases Lessons 21 and 23. In practice, a genuinely
multi-cloud lakehouse rarely means "every engine reads one physical
copy across the public internet" — that reintroduces exactly the
egress cost and latency problems from Lesson 21, and it can directly
violate the residency requirements from Lesson 23. Instead, real
deployments combine the catalog idea with:

- **Deliberate regional/domain partitioning.** Data is physically
  split by region or business domain (EU customer data in an EU
  region, US data in a US region, or sales data separate from
  operational telemetry), with each cloud's compute serving the subset
  that's local to it.
- **Table-level replication for shared reference data.** Smaller,
  slower-changing datasets that genuinely need to be read everywhere
  (reference/lookup tables, aggregated metrics) are replicated at the
  table level between regions, using the mechanisms from Lesson 22 —
  while the large, gravity-bound operational data stays put.
- **One catalog, many physical locations.** The catalog presents a
  single namespace and governance model, while under the hood, each
  table's actual files may live in whichever region or cloud the data
  gravity, cost, and compliance realities of Lessons 21–23 require.

## The architectural takeaway

A single data platform spanning multiple clouds is a real, achievable
goal — but it's achieved by standardizing the **format and the
catalog**, not by forcing all data into one physical location. Get this
backward — chase one global, physically unified copy of everything —
and you'll fight data gravity, egress cost, and sovereignty law all at
once, for no real benefit. Get it right, and an analyst can query one
consistent platform while the data underneath it quietly respects
exactly where it needs to physically live.

## Key terms

| Term | Meaning |
|---|---|
| Lakehouse | An architecture storing data as files in cloud object storage, using an open table format to add schema, transactions, and time travel on top |
| Open table format | A specification (Delta Lake, Apache Iceberg, Apache Hudi) that lets multiple different compute engines read/write the same underlying data files consistently |
| Catalog | The governance layer (e.g. Databricks Unity Catalog, the Iceberg REST catalog) that tracks which tables exist, their schema, and permissions, consistently across clouds and engines |
| Regional/domain partitioning | Deliberately splitting physical data by region or business domain so each cloud's compute serves its own local subset, rather than one shared global copy |

## Check yourself

You're ready for Chapter 7 when you can explain, without looking: how
can an enterprise honestly call something "one data platform" even
when its underlying data is physically split across multiple clouds
and regions — and what two things actually make that true?
