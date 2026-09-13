# Lesson 54 — Query History & Load History for Troubleshooting

**Chapter 14 · Monitoring & Troubleshooting · Lesson 54 of 60**

## What you'll learn

- Why Query History — not the error message alone — is the first place
  to look when something breaks
- How to read the Query Profile for a failed or slow query
- How to check whether a specific file actually loaded, using
  `COPY_HISTORY`
- The difference between session-level history and the account-wide
  `ACCOUNT_USAGE` views

## Query History is your first stop

Every query you or anyone else has run against your account shows up
in Snowsight's **Activity ▸ Query History** — filterable by status,
user, warehouse, and time range. Before you re-read error text or
guess, open the failed query here first:

![Snowsight's Query History and Query Profile view: a completed query selected from the history list, with the Query Profile tab open showing the query's execution steps, most expensive nodes, and duration statistics.](/courses/snowflake/ch14/54-query-history-and-load-history-for-troubleshooting/query-history-profile.png)
*Query History shows every run, and Query Profile breaks a single run into the steps that actually cost time.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

Click any row to open its **Query Profile** — a step-by-step
breakdown of the execution plan, which step took the longest, how many
rows moved through each step, and how much of that time was actually
compute versus queueing. This is the SQL Server equivalent of pulling
up an actual execution plan instead of guessing why a query is slow —
except in Snowflake it's always sitting there for every query already
run, no `SET STATISTICS` required beforehand.

You can filter the list to `Status = Failed` and a time window to find
exactly the run that broke, even if it happened at 3 a.m. and nobody
was watching.

## The same thing in SQL: QUERY_HISTORY

The UI is a view over a table function you can query directly —
useful when you want to check history from a script, a Task, or a
monitoring query rather than clicking through Snowsight:

```sql
SELECT query_id, query_text, user_name, warehouse_name,
       execution_status, error_message, start_time, total_elapsed_time
FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY())
WHERE execution_status = 'FAIL'
ORDER BY start_time DESC
LIMIT 25;
```

`INFORMATION_SCHEMA.QUERY_HISTORY()` only sees queries run in the
**current session's warehouse context** over the last 7 days by
default. For a longer-retention, account-wide view across every
warehouse and user, use:

```sql
SELECT query_id, query_text, user_name, warehouse_name,
       execution_status, error_message, start_time
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE execution_status = 'FAIL'
  AND start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
ORDER BY start_time DESC;
```

`ACCOUNT_USAGE` views hold up to a year of history but lag reality by
up to 45 minutes — use `INFORMATION_SCHEMA` for "what just happened,"
`ACCOUNT_USAGE` for "what happened last week."

## Load History: did the file actually load?

Query History tells you about queries. When the question is narrower —
"did this specific file make it into this specific table?" — use
`COPY_HISTORY`, which is what backs Snowpipe's and `COPY INTO`'s own
load tracking from Chapters 3 and 4:

```sql
SELECT file_name, status, row_count, row_parsed,
       first_error_message, last_load_time
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  table_name => 'RAW.ORDERS_STAGING',
  start_time => DATEADD(hours, -24, CURRENT_TIMESTAMP())
))
WHERE status <> 'LOADED'
ORDER BY last_load_time DESC;
```

This is the single most useful query in this lesson: it answers "did
that file load, and if not, why not" for both manual `COPY INTO` runs
and every Snowpipe load in the last 24 hours, without hunting through
application logs that don't exist. For loads older than the retention
window `INFORMATION_SCHEMA.COPY_HISTORY` covers, `SNOWFLAKE.ACCOUNT_USAGE.COPY_HISTORY`
holds up to a year, same trade-off as `QUERY_HISTORY` above.

## Key terms

| Term | Meaning |
|---|---|
| Query History | Snowsight's list of every query run, filterable by status/user/warehouse/time |
| Query Profile | A single query's execution plan, broken into steps with timing and row counts |
| `COPY_HISTORY` | Table function/view showing whether specific files loaded, and why a load failed |
| `ACCOUNT_USAGE` | Longer-retention (up to 1 year), account-wide history views, with up to ~45 min lag |

## Lab

1. In Snowsight, open **Activity ▸ Query History**, filter to
   `Status = Failed`, and find one real failed query in your account
   (run a deliberately broken query first if you don't have one) —
   open its Query Profile.
2. Run the `QUERY_HISTORY()` table function query above against your
   own account and confirm it matches what the UI showed.
3. Run a `COPY INTO` against a staged file (from Chapter 3's lab), then
   run the `COPY_HISTORY` query above filtered to that table — confirm
   you can see the file, its status, and its row count.

## Check yourself

You're ready for Lesson 55 when you can find a specific failed query
in Query History without help, read its Query Profile to say roughly
where the time went, and tell the difference between "the query
failed" (Query History) and "the file didn't load" (`COPY_HISTORY`).
