# Relational Concepts That Transfer vs. What Doesn't

Lesson 1 introduced the core idea: relational database facts transfer across platforms,
platform-specific detail doesn't. This lesson makes that distinction concrete with specific
examples in both directions, so you have a working mental checklist before Chapter 2 starts
Oracle in earnest.

## What you'll learn

- Specific conceptual knowledge that transfers directly to any relational platform
- Specific SQL-Server-flavored knowledge that will actively mislead you elsewhere
- A practical way to sort new information into one bucket or the other as you learn

## What transfers: the ideas, not the implementation

**ACID transactions.** Every serious relational database implements atomicity,
consistency, isolation, and durability. A transaction either fully commits or fully rolls
back, committed data survives a crash, and concurrent transactions don't see each other's
half-finished work. That's true in SQL Server, Oracle, MySQL (with InnoDB), and
PostgreSQL. How each platform implements isolation under the hood differs, but the
guarantee itself is the same contract you already reason about.

**Normalization.** First, second, and third normal form, and the tradeoffs of
deliberately denormalizing for read performance, are relational modeling theory — they
don't belong to any one vendor. A well-normalized schema in SQL Server is recognizably
the same discipline as a well-normalized schema in PostgreSQL.

**Indexing tradeoffs.** The core tradeoff — an index speeds up reads that use it but adds
overhead to every write that touches the indexed columns, and an unused index is pure
cost — is true everywhere. The specific index types and storage details differ (more on
that starting in Chapter 2), but the tradeoff you weigh as a DBA deciding whether to add
one is identical.

**Operational discipline.** Measuring before changing something, treating an untested
backup as not a real backup, understanding what a recovery model or its equivalent
determines about what's restorable, and thinking about replication as a consistency/latency
tradeoff — none of that is SQL-Server-specific. It's how a competent relational DBA thinks,
full stop.

## What doesn't transfer: names, syntax, and architecture detail

**System catalog names.** SQL Server's `sys.databases`, `sys.tables`, and
`sys.dm_exec_requests` have no direct Oracle, MySQL, or PostgreSQL equivalent by that
name. Oracle has `DBA_TABLES` and `V$SESSION`. PostgreSQL has `pg_catalog` and
`information_schema`. MySQL has `information_schema` and `performance_schema`. Querying
metadata is a skill that transfers; the exact object names you'd type do not.

**Backup tool syntax.** SQL Server's `BACKUP DATABASE ... TO DISK` is not a dialect that
Oracle's RMAN or PostgreSQL's `pg_basebackup` happen to spell differently. RMAN is an
entirely different tool with its own scripting language, catalog concept, and recovery
workflow. Knowing SQL Server backup syntax gives you zero head start on typing an RMAN
command correctly.

**Memory architecture terminology.** SQL Server's buffer pool is not "the SGA under
another name." Oracle's System Global Area is a specific, named, multi-component shared
memory structure (buffer cache, shared pool, redo log buffer, and more) with its own
sizing parameters and behavior, covered in depth in Chapter 2. Assuming a one-to-one
mapping between SQL Server memory concepts and Oracle's will produce wrong mental models,
not just wrong syntax.

**Instance/database terminology itself.** In SQL Server, "instance" and "database" are
used almost interchangeably in casual conversation. In Oracle, they are formally distinct
things with a precise technical meaning — a distinction Chapter 2 opens with, because
getting it wrong causes real confusion.

## A practical sorting habit

As you move through this course, ask one question about anything new you learn: "is this
a fact about how relational databases work, or a fact about how this specific vendor built
their product?" If it's the former, file it as permanent knowledge. If it's the latter,
file it as platform-specific and don't assume it generalizes, even to a platform that
looks superficially similar.

## Key terms

| Term | Meaning |
|---|---|
| ACID | Atomicity, Consistency, Isolation, Durability — the transaction guarantee shared by serious RDBMS platforms |
| Normalization | Schema design discipline (1NF, 2NF, 3NF, and deliberate denormalization) independent of any vendor |
| System catalog | A platform's internal metadata tables/views describing its own objects — named differently per platform |
| SGA | System Global Area — Oracle's specific shared memory structure, not a renamed SQL Server buffer pool |

## Check yourself

List two more concepts (beyond this lesson's examples) that you'd expect to transfer from
SQL Server DBA work, and two more platform-specific details you'd expect not to.
