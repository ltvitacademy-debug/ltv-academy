# Querying With Athena

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 6 of 10**

## What you'll learn

- The one setup step Athena needs before it will run any query
- A real, simple `SELECT` against the cataloged `orders_raw` table
- How Athena's pay-per-query pricing actually works, with a real number

## The one setup step: a query results location

Athena needs somewhere to write every query's results, and it won't run a query without
one configured. This is a separate S3 location from the raw data — never write query
results back into the raw zone, or the next crawler run could pick up stray result files
as if they were source data:

```
s3://northfield-athena-results/
```

Set it once, in the Athena console under **Settings → Query result location**, or via the
CLI:

```
aws athena start-query-execution \
  --query-string "SELECT 1" \
  --result-configuration OutputLocation=s3://northfield-athena-results/
```

## Proving the pipeline works

Before writing anything complicated, run the simplest possible query to confirm Athena can
actually see the table the crawler built:

```sql
SELECT *
FROM northfield_raw_db.orders_raw
LIMIT 10;
```

This returns 10 rows pulled straight from one or more of the 31 CSV files sitting in
`orders-raw/` — no data warehouse, no loading step, just SQL running directly against
files in S3. If this query returns real rows with the right columns, the entire chain from
Lesson 1 through Lesson 5 is proven out.

A second useful check — counting rows confirms all 31 days actually got picked up:

```sql
SELECT COUNT(*) AS row_count
FROM northfield_raw_db.orders_raw;
```

## How you're actually being charged

Athena bills by **data scanned per query**, at roughly $5 per terabyte scanned (as of this
course), rounded up to the nearest 10 MB per query, with a 10 MB minimum. For a month of
small CSV files — a few megabytes total — `SELECT * ... LIMIT 10` costs a fraction of a
cent. That's the real tradeoff behind choosing Athena over a warehouse for this project:
there's no bill at all until someone actually runs a query, and even then it's close to
free at this data volume.

This pricing model is also why file format and partitioning matter as data grows — Lesson
8 picks this exact point back up, because a bigger raw zone with no partitioning means
every query scans far more data than it needs to, and the bill (and the wait) grows with
it.

## Key terms

| Term | Meaning |
|---|---|
| Query result location | The S3 path where Athena writes every query's output — must be separate from source data |
| Data scanned | The volume of S3 data Athena reads to answer a query — the basis for its per-query cost |
| `LIMIT` | SQL clause restricting the number of rows returned, useful for a quick sanity check |

## Check yourself

Why must Athena's query result location be a different S3 location from the raw data
being queried, and roughly how much does a `SELECT * LIMIT 10` against a few megabytes of
CSV actually cost?
