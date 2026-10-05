# Lesson 22 — Data Retention and Time Travel

**Chapter 5 · Enterprise Governance · Lesson 22 of 25**

## What you'll learn

- Why how long data exists is itself a governance decision, not just a recovery feature
- Real, correct Time Travel syntax: AT, BEFORE, and UNDROP
- The real retention limits by Snowflake edition
- What Fail-safe is, and why it isn't a governance control you can rely on

## Retention is a governance lever

Every other lesson in this course has governed *who can see* data. This lesson governs something different: *how long data exists at all*. That matters for two opposite reasons at once — you need enough retention to recover from a mistake, and you need a defined ceiling so "forever" isn't the accidental default for data a compliance policy says should eventually disappear.

**Time Travel** is the mechanism: Snowflake keeps enough history on a table to let you query or restore it as it existed at a past point in time, for as long as the table's retention policy says to.

## Querying the past: AT and BEFORE

Both clauses accept the same three ways of naming a past moment:

```sql
-- As of an absolute timestamp
SELECT * FROM orders
  AT(TIMESTAMP => 'Wed, 26 Jun 2024 09:20:00 -0700'::TIMESTAMP_LTZ);

-- As of 5 minutes ago (OFFSET is seconds, negative = past)
SELECT * FROM orders AT(OFFSET => -60*5);

-- As of just before a specific query ran
SELECT * FROM orders
  BEFORE(STATEMENT => '8e5d0ca9-005e-44e6-b858-a8f5b37c5726');
```

`AT` includes the state as of that exact moment; `BEFORE` gives you the state immediately prior. `STATEMENT` is especially useful for governance investigations — "show me this table exactly as it was right before query X ran" is a precise, defensible way to establish what changed and when.

## Undoing a drop — within the window

```sql
UNDROP TABLE orders;
```

`UNDROP` restores a dropped table to its original database and schema — but only if you're still inside its Time Travel retention window. Past that window, the table isn't recoverable by you at all.

## Setting the retention policy itself

```sql
ALTER TABLE orders SET DATA_RETENTION_TIME_IN_DAYS = 7;
```

This is the real governance decision: how many days of Time Travel history this table keeps. The real limits, by edition:

| Edition | DATA_RETENTION_TIME_IN_DAYS range |
|---|---|
| Standard | 0 or 1 day only |
| Enterprise or higher | 0 to 90 days (permanent tables) |

Transient and temporary tables cap at 1 day regardless of edition. The default on a new object is 1 day. Setting it to `0` disables Time Travel for that object entirely — sometimes appropriate for genuinely transient staging data, never appropriate for anything a retention or legal-hold policy requires you to be able to recover.

## After Time Travel: Fail-safe, and why it isn't a control

When a permanent table's Time Travel window ends, its historical data moves into **Fail-safe** for **7 additional days**. Fail-safe is not queryable by you at all — no `AT`, no `BEFORE`, no `UNDROP`. Only Snowflake itself can recover Fail-safe data, and only through a support engagement. Treat Fail-safe as a true last resort, not a governance feature you design around — your actual retention policy is the `DATA_RETENTION_TIME_IN_DAYS` you set, not the Fail-safe window behind it.

## Key terms

| Term | Meaning |
|---|---|
| Time Travel | Snowflake's mechanism for querying or restoring a table's past state, within its retention window |
| DATA_RETENTION_TIME_IN_DAYS | The object-level setting controlling how many days of Time Travel history are kept |
| AT / BEFORE | Clauses for querying a table as of (AT) or immediately prior to (BEFORE) a TIMESTAMP, OFFSET, or STATEMENT |
| UNDROP | Statement that restores a dropped table, view, or schema, only within its Time Travel window |
| Fail-safe | A 7-day, non-queryable recovery period after Time Travel ends, accessible only by Snowflake support |

## Lab

1. On a scratch table, run `ALTER TABLE <name> SET DATA_RETENTION_TIME_IN_DAYS = 7` and confirm the setting with `SHOW TABLES LIKE '<name>';` (check the `retention_time` column).
2. Make a small change to a row, note the time, then query the table with `AT(OFFSET => -60)` to see it as it was a minute ago.
3. Drop the scratch table, then immediately run `UNDROP TABLE <name>;` and confirm it's restored.

## Check yourself

Why does this lesson insist that Fail-safe is "not a governance feature you design around" — what's the real difference between relying on `DATA_RETENTION_TIME_IN_DAYS` and relying on Fail-safe to recover something?
