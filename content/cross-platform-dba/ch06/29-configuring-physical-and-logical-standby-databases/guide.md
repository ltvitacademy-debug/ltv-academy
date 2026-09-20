# Configuring Physical & Logical Standby Databases

Oracle Data Guard Fundamentals treated "standby database" as one concept. It's actually
two, and the difference isn't cosmetic — a **physical standby** and a **logical standby**
are kept in sync by fundamentally different mechanisms, and that difference determines what
each one can and can't do for you.

## What you'll learn

- Physical standby: an exact block-for-block copy, kept current by Redo Apply
- Logical standby: a SQL-Apply-driven copy that's logically, not physically, identical
- How each one is created
- Why you'd pick one over the other for a given requirement

## Physical standby: an exact copy, media recovery forever

A **physical standby** is a block-for-block identical copy of the primary database. It's
kept current through **Redo Apply**, which is really just continuous media recovery: shipped
redo is applied directly to the standby's data files, the same mechanism used to recover a
database after a crash, just running perpetually. Because it's block-for-block identical,
a physical standby is the safest, simplest option, and with the **Active Data Guard** option
licensed, it can even serve read-only queries *while* redo apply continues in the
background (real-time query) — offloading reporting load from the primary. You create one
with RMAN:

```sql
-- On the auxiliary (future standby) instance, connected to
-- both target (primary) and auxiliary:
RMAN> DUPLICATE TARGET DATABASE FOR STANDBY FROM ACTIVE DATABASE;

-- Then start managed recovery to begin applying shipped redo:
ALTER DATABASE RECOVER MANAGED STANDBY DATABASE
  USING CURRENT LOGFILE DISCONNECT FROM SESSION;
```

## Logical standby: transformed via SQL Apply, and open for business

A **logical standby** starts life as a physical standby, then gets converted. From that
point on, it's kept current by **SQL Apply**: incoming redo is mined (Oracle's LogMiner
technology under the hood) and reconstructed into the actual SQL statements that produced
it, which are then executed against the logical standby. The result is a database that's
**logically** identical — the same data, when you query it — but not physically identical:
a logical standby is open read-write for its own objects, can carry additional indexes,
materialized views, or tables that don't exist on the primary, and remains continuously
queryable, no Active Data Guard license required for that. The tradeoff is real: SQL Apply
doesn't support every data type and every DDL operation, so a logical standby isn't a
guaranteed drop-in replacement the way a physical standby is.

```sql
-- Prepare the primary (identifies unsupported objects, builds
-- the dictionary the logical standby will mine from):
EXEC DBMS_LOGSTDBY.BUILD;

-- On the standby, once it's a logical standby:
ALTER DATABASE START LOGICAL STANDBY APPLY;
```

## Choosing between them

Default to a **physical standby** for straightforward HA/DR — it's simpler, it has no
data-type or DDL limitations, and Active Data Guard covers the "I also want to run reports
against it" need without changing its nature. Reach for a **logical standby** specifically
when you need a standby that's continuously open for read-write access to its own
supplementary objects, or as a stepping stone in some **rolling upgrade** strategies, where
the logical standby can run a newer Oracle version than the primary during a controlled
transition. It's a narrower, more specialized tool than the physical standby default.

## Key terms

| Term | Meaning |
|---|---|
| Physical standby | Block-for-block identical copy, kept current by continuous media recovery (Redo Apply) |
| Logical standby | SQL-Apply-driven copy, logically identical but not physically identical to the primary |
| Redo Apply | Physical standby's sync mechanism — shipped redo applied directly via media recovery |
| SQL Apply | Logical standby's sync mechanism — redo mined into SQL, then executed |
| Active Data Guard | Licensed option enabling real-time read-only queries on a physical standby during apply |

## Check yourself

A team wants a standby that can also host a handful of extra reporting tables and indexes
that don't exist on the primary, kept open for read-write access the whole time. Which
standby type fits, and what capability do they give up compared to the other type?
