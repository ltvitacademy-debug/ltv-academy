# Comparing SQL Server, Oracle, MySQL & PostgreSQL at a Glance

This lesson is a map, not a deep dive. Before Chapter 2 spends five lessons going deep on
Oracle alone, it's worth stepping back and seeing how all four platforms sit next to each
other — licensing, typical use case, and architecture family. Treat this as orienting
context you'll refer back to, not something to memorize in detail.

## What you'll learn

- An honest, high-level comparison of licensing models across all four platforms
- Where each platform is typically deployed in the real world, and why
- The broad architecture family each platform belongs to

## The comparison at a glance

| Platform | Licensing model | Typical real-world use case | Architecture family |
|---|---|---|---|
| SQL Server | Commercial (per-core or Server+CAL); free Express edition with limits | Enterprise Windows-centric shops, BI/reporting stacks, mid-size to large business applications | Single-process engine with an integrated buffer pool; tight OS integration on Windows |
| Oracle Database | Commercial, per-core, often the most expensive of the four; free XE (Express) edition with limits | Large enterprise, finance, telecom, and long-lived legacy systems where Oracle has been entrenched for decades | Instance (background processes + SGA memory) separate from the database (physical files); multi-process architecture on Linux/Unix |
| MySQL | Open source (GPL) with a paid Enterprise edition from Oracle Corporation | Web applications, content platforms, and read-heavy workloads at massive scale (it powers a large share of the web) | Pluggable storage engine architecture — the server layer is separate from the storage engine (typically InnoDB) underneath it |
| PostgreSQL | Fully open source (PostgreSQL License, a permissive license); no paid edition required | New open-source projects, analytics workloads needing extensibility, increasingly common in enterprise too | Multi-process architecture with MVCC (multi-version concurrency control) as a core design principle |

## A few honest caveats

This table is deliberately simplified, and a few things are worth flagging so it doesn't
overclaim. Oracle Corporation actually owns MySQL today (since acquiring Sun
Microsystems), which is a genuinely interesting wrinkle — it doesn't make MySQL and Oracle
Database the same product or architecture, but it's worth knowing. "Open source" doesn't
mean "free of all cost" at scale — running MySQL or PostgreSQL still costs money in
infrastructure, support contracts, and DBA time, it just removes the per-core software
license line item. And "typical use case" describes tendencies, not rules — you will find
Oracle running web applications and PostgreSQL running core enterprise finance systems.
The point of this table is orientation, not a rule to apply rigidly.

## Why this matters going in

Licensing pressure and use-case fit are two of the four real reasons from Lesson 2 that
companies end up multi-platform in the first place. Having this comparison in mind as you
start Chapter 2's deep dive into Oracle gives you a sense of where Oracle sits relative to
the other three platforms you'll eventually cover, rather than learning Oracle in a
vacuum.

## Key terms

| Term | Meaning |
|---|---|
| Per-core licensing | A commercial licensing model charging based on the number of processor cores the database runs on |
| MVCC | Multi-Version Concurrency Control — PostgreSQL's core approach to handling concurrent reads and writes |
| Storage engine | The underlying component that actually stores and retrieves data, pluggable in MySQL's architecture |
| XE / Express edition | A free, feature-limited edition offered by both Oracle and SQL Server |

## Check yourself

Looking at the comparison table, which platform's licensing model would you expect to draw
the most cost-reduction pressure from a company trying to cut infrastructure spend, and why?
