# Lesson 8 — Views, Temporary & Transient Tables

**Chapter 2 · Snowflake SQL — What's Different From T-SQL · Lesson 8 of 60**

## What you'll learn

- How Snowflake views compare to SQL Server views (mostly the same)
- Snowflake's three table persistence types: permanent, transient, and temporary
- Why transient tables exist, and what you give up for the storage savings
- How Time Travel and Fail-safe retention differ across all three types

## Views — mostly what you already know

A Snowflake view is defined the same way as in SQL Server: a stored query,
computed at read time, with no data of its own:

```sql
CREATE OR REPLACE VIEW reporting.high_value_customers AS
SELECT customer_id, SUM(order_total) AS lifetime_value
FROM raw.orders
GROUP BY customer_id
HAVING SUM(order_total) > 10000;
```

`CREATE OR REPLACE VIEW` is the standard pattern (rather than `DROP VIEW`
+ `CREATE VIEW`), and it behaves the same as `ALTER VIEW` conceptually.
Snowflake also supports **secure views** (hiding the view's definition
and query plan details from users who can query it but shouldn't see its
internals) and **materialized views** (a view whose results are
physically stored and automatically kept in sync) — both are extensions
beyond standard SQL Server views, but standard views are what you'll use
day to day and they need no adjustment coming from T-SQL.

## The concept SQL Server doesn't have: three table types

SQL Server has permanent tables and `#temp` tables. Snowflake has three
persistence types, and the middle one — transient — has no direct SQL
Server equivalent:

```sql
CREATE TABLE           orders (id NUMBER, total NUMBER);   -- permanent (default)
CREATE TRANSIENT TABLE staging_orders (id NUMBER, total NUMBER);
CREATE TEMPORARY TABLE session_scratch (id NUMBER, total NUMBER);
```

**Permanent** — the default. Full **Time Travel** (query or restore the
table as it existed at a past point, 1 day by default, up to 90 on
Enterprise Edition and above) plus a **Fail-safe** period (an extra 7
days after Time Travel ends, during which only Snowflake support can
recover data, for disaster recovery). Both windows cost storage.

**Transient** — same durability as permanent (survives sessions, visible
to everyone with access) but with **no Fail-safe period at all**, and
Time Travel capped at 0 or 1 day. Cheaper to store because Snowflake
isn't retaining that extra recovery window. Use transient tables for data
you can reproduce or reload if something goes wrong — staging tables in
an ELT pipeline (Chapter 5) are the classic case.

**Temporary** — scoped to the **session that created it**. It exists only
for that session, is invisible to every other session and user, and is
dropped automatically the moment the session ends — no `DROP TABLE`
needed. Like transient tables, no Fail-safe, minimal Time Travel. This is
the closest thing to SQL Server's `#temp` tables, but scoped to a
Snowflake session rather than a specific connection-with-tempdb.

## Comparing recovery windows

| Table type | Fail-safe | Time Travel | Lifespan | SQL Server analog |
|---|---|---|---|---|
| Permanent | 7 days | 1–90 days | Until dropped | Regular table |
| Transient | None | 0–1 day | Until dropped | No direct equivalent |
| Temporary | None | 0–1 day | Session only | `#temp` table |

## Why this matters in practice

Fail-safe storage isn't free, and most pipeline staging data doesn't need
a disaster-recovery window at all — if a load fails, you just reload the
source file. Marking staging and intermediate tables `TRANSIENT` is a
routine cost-saving habit in Snowflake pipelines that has no equivalent
decision to make in SQL Server, where every table carries the same
recovery model by default.

## Key terms

| Term | Meaning |
|---|---|
| Permanent table | Default type — full Time Travel + 7-day Fail-safe |
| Transient table | No Fail-safe, minimal Time Travel, cheaper storage, persists across sessions |
| Temporary table | Session-scoped only, auto-dropped at session end, no Fail-safe |
| Time Travel | Query/restore a table as of a past point in time |
| Fail-safe | Snowflake-support-only recovery window after Time Travel ends (permanent tables only) |

## Lab

1. Create one of each: a permanent table, a transient table, and a
   temporary table, all with the same columns.
2. Run `SHOW TABLES;` and note the `kind` column distinguishing them.
3. End your session (close and reopen the worksheet) and confirm the
   temporary table is gone while the other two remain.

## Check yourself

You're ready for Lesson 9 when you can explain why you'd mark a staging
table `TRANSIENT` instead of leaving it as the default permanent type.
