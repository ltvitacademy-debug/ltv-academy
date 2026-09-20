# Editions & Versions

## What you'll learn

- The real, current SQL Server editions and what actually separates them
- How to tell "edition" apart from "version" — two different axes people conflate
- Which feature differences actually bite a working DBA (not marketing bullet points)

## Edition vs. version — two different questions

"What SQL Server are you running?" has two independent answers, and DBAs need to keep them
separate:

- **Version** is *when* — SQL Server 2016, 2017, 2019, 2022 (and 2025 as it ships), each with
  its own feature set, and its own end-of-support date you need to track.
- **Edition** is *how much* — Enterprise, Standard, Developer, Express, Web — the same version
  of the product, licensed and feature-capped differently.

You can run SQL Server 2022 Standard or SQL Server 2022 Enterprise; both are "2022," but they
support very different workloads. `SELECT @@VERSION` and `SERVERPROPERTY('Edition')` are how
you check both facts on a running instance — the first line of any triage.

## The real editions

- **Enterprise** — the full feature set: no hard limit on the memory the Database Engine can
  use, table and index partitioning, Online Index Rebuild (rebuild an index without blocking
  concurrent access to the table), Transparent Data Encryption, Always On Availability Groups
  with multiple secondaries, advanced auditing, and columnstore/In-Memory OLTP capabilities at
  full scale. Licensed per core, and priced accordingly — it's the edition production systems
  with real uptime and performance requirements run.
- **Standard** — the mainstream production edition. Has Availability Groups (capped at fewer
  replicas than Enterprise), basic auditing, and most day-to-day T-SQL surface area — but caps
  Engine memory usage well below Enterprise, lacks Online Index Rebuild, and lacks table
  partitioning. A huge share of real-world production SQL Server runs on Standard.
- **Developer** — functionally identical to Enterprise, licensed for free for development and
  testing only, never production. This is what you install on your own machine to learn on;
  it's exactly why a script that works fine in a Developer-edition sandbox can fail or behave
  differently once deployed to a production Standard-edition server that lacks a feature you
  used.
- **Express** — free, production-legal, but capped hard: a small maximum database size per
  database, a memory ceiling far below Standard, and no SQL Server Agent. Suited to small
  embedded or lightweight application scenarios, not serious production databases.
- **Web** — a lower-cost, hosting-provider-oriented edition with capabilities between Express
  and Standard, licensed specifically for web-facing workloads through qualifying hosting
  agreements.

## Feature differences that actually bite

Marketing comparison charts list dozens of rows; in practice, a handful of edition gaps are
the ones that surprise DBAs mid-project:

1. **Online Index Rebuild** (Enterprise only) — on Standard, rebuilding a large index takes an
   exclusive lock for the duration, which means a maintenance window; on Enterprise, the table
   stays available throughout.
2. **Table/index partitioning** (Enterprise only, in most supported versions) — a common
   assumption for "how we'll manage a huge fact table" that quietly doesn't exist on Standard.
3. **Max memory for the Database Engine** — Standard caps this per version (historically well
   below Enterprise's effectively unlimited ceiling); a Standard-edition server with 256 GB of
   RAM installed may only be able to use a fraction of it for the buffer pool.
4. **Availability Group secondary count** — Standard supports Basic Availability Groups (one
   database, one secondary, no readable secondary); Enterprise supports multiple databases per
   AG and multiple readable secondaries.

## Why this matters to a DBA

A developer builds and tests on Developer edition and never notices an edition gap. A DBA is
the one who has to know, before a script or a design ships to production, whether the target
instance's edition actually supports what's about to be deployed against it — because finding
out during a failed deployment, or worse during an outage, is the expensive way to learn it.

## Key terms

| Term | Meaning |
|---|---|
| Version | Which release of SQL Server (2016, 2019, 2022, ...) — determines the feature baseline |
| Edition | The licensed tier (Enterprise, Standard, Developer, Express, Web) — determines feature caps within a version |
| Online Index Rebuild | Enterprise-only feature rebuilding an index without blocking concurrent table access |
| `SERVERPROPERTY('Edition')` | T-SQL to check the running instance's edition |

## Check yourself

A colleague built and tested a maintenance script using Online Index Rebuild on their laptop's
Developer-edition instance. It's about to be deployed to a production server. What's the first
thing you'd check, and why?
