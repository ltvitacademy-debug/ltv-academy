# Script — Query History & Load History for Troubleshooting

## Segment 1 (title)

Before you re-read an error message or start guessing, Snowflake already has an answer waiting: Query History. Every query anyone has run against your account is sitting there, filterable by status, user, warehouse, and time — this is always the first place to look when something breaks.

## Segment 2 (screenshot: Query History / Query Profile)

Snowsight's Activity, Query History list shows every run. Click one and you get its Query Profile — a step-by-step breakdown of the execution plan, which step took the longest, and how many rows moved through each step. It's the execution plan you'd normally have to remember to capture in SSMS, except in Snowflake it's already sitting there for every query already run.

## Segment 3 (code: QUERY_HISTORY in SQL)

The same history is queryable directly. INFORMATION_SCHEMA.QUERY_HISTORY covers the current session's warehouse over the last seven days; SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY holds up to a year, account-wide, with about a forty-five minute lag. Use the fast one for right now, the account-usage one for last week.

## Segment 4 (code: COPY_HISTORY)

Query History answers questions about queries. When the real question is narrower — did this specific file make it into this specific table — COPY_HISTORY is the answer, and it's the same history backing both manual COPY INTO runs and every Snowpipe load. Filter to status not equal LOADED and you've found exactly what broke.

## Segment 5 (outro)

Next lesson: what to do once you know a query failed — diagnosing whether it's a suspended warehouse, a missing grant, or a resource monitor that shut everything down.
