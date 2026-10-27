# Lesson 3 — Creating the Warehouse and Loading the Data

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 3 of 10**

## What you'll learn

- How to create a right-sized virtual warehouse with `CREATE WAREHOUSE`, including
  auto-suspend
- How to define an internal stage and a file format, and load a CSV export with `COPY INTO`
- Why `ON_ERROR = 'ABORT_STATEMENT'` is the correct default for a small, trustworthy daily load

## Creating the warehouse

The plan from Lesson 2 called for one small warehouse. Here's the real SQL:

```sql
CREATE WAREHOUSE IF NOT EXISTS SUPPORT_WH
  WAREHOUSE_SIZE = 'XS'
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;
```

`WAREHOUSE_SIZE = 'XS'` matches the actual workload — loading one small CSV a day and running
one summary query. `AUTO_SUSPEND = 60` means the warehouse shuts itself off after 60 seconds of
no activity, so Driftwood isn't paying for idle compute between the one load and the one query
each day. `AUTO_RESUME = TRUE` means the next query or load automatically wakes it back up —
nobody has to remember to turn it on.

## Defining the stage and file format

Ticket exports land as CSV files. The stage and file format are defined once:

```sql
CREATE SCHEMA IF NOT EXISTS DRIFTWOOD_ANALYTICS.SUPPORT;

CREATE STAGE IF NOT EXISTS DRIFTWOOD_ANALYTICS.SUPPORT.TICKETS_STAGE
  FILE_FORMAT = (
    TYPE = CSV
    FIELD_OPTIONALLY_ENCLOSED_BY = '"'
    SKIP_HEADER = 1
  );
```

Each day's export lands under a date-partitioned path, the same discipline the Advanced
capstone uses for billing and usage data:

```
@TICKETS_STAGE/dt=2026-10-26/support_tickets_2026-10-26.csv
```

## The raw table

```sql
CREATE TABLE IF NOT EXISTS DRIFTWOOD_ANALYTICS.SUPPORT.RAW_TICKETS (
  TICKET_ID     NUMBER,
  CREATED_AT    TIMESTAMP_NTZ,
  PRIORITY      VARCHAR(10),
  CHANNEL       VARCHAR(20),
  STATUS        VARCHAR(20),
  SUBJECT       VARCHAR(500)
);
```

One row per ticket, exactly as exported — no filtering, no transformation. That's what "raw"
means.

## Loading with COPY INTO

```sql
COPY INTO DRIFTWOOD_ANALYTICS.SUPPORT.RAW_TICKETS
FROM @DRIFTWOOD_ANALYTICS.SUPPORT.TICKETS_STAGE/dt=2026-10-26/
ON_ERROR = 'ABORT_STATEMENT';
```

`ON_ERROR = 'ABORT_STATEMENT'` rejects the entire load if even one row fails to parse, rather
than silently loading a partial day's tickets. For a daily count the VP of Support will look at
every week, a load that fails loudly and gets investigated beats one that quietly under-counts
Tuesday's Urgent tickets.

## Checking the load

```sql
SELECT COUNT(*) AS ROWS_LOADED FROM DRIFTWOOD_ANALYTICS.SUPPORT.RAW_TICKETS;
```

A quick row count after each load is a cheap sanity check — if yesterday's export had roughly
200 tickets and today's load shows 4, something upstream is worth investigating before the VP
ever sees a number.

## Key terms

| Term | Meaning |
|---|---|
| `AUTO_SUSPEND` | Seconds of inactivity before Snowflake automatically suspends a warehouse to stop billing compute |
| `COPY INTO` | The statement that loads staged files into a table |
| `ON_ERROR = 'ABORT_STATEMENT'` | Rejects an entire load if any row fails to parse, rather than loading a partial result |

## Lab

Write the `CREATE WAREHOUSE`, `CREATE STAGE`, and `CREATE TABLE` statements for this project from
memory, then compare them to the ones above. Did you remember `AUTO_SUSPEND`?

## Check yourself

Why is `WAREHOUSE_SIZE = 'XS'` the right choice here, and what would change your mind about that
sizing if Driftwood's ticket volume grew one hundred times over?
