# Lesson 18 — Auditing Access

**Chapter 4 · Auditing and Monitoring · Lesson 18 of 25**

## What you'll learn

- The three questions a real access audit has to answer
- How to find every user who touched one specific sensitive table
- How to confirm a masking or row access policy actually applied to a query
- How to turn a one-off audit query into a repeatable check

## What an audit actually asks

Lessons 16 and 17 covered the views. Auditing is about asking a specific question of them, repeatably. A real access audit answers three things:

1. **Who** — which users touched this object, directly or indirectly
2. **What** — did they read it, write to it, or both
3. **When and how often** — a single access last quarter is a different story than daily access by someone who shouldn't have it

## Finding every user who touched a specific table

`ACCESS_HISTORY`'s `base_objects_accessed` column holds a semi-structured array — each entry has keys like `objectName`, `objectDomain`, and a nested `columns` array. To filter on one specific table, flatten it:

```sql
SELECT DISTINCT user_name, query_id, query_start_time
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY,
     LATERAL FLATTEN(base_objects_accessed) AS f1
WHERE f1.value:"objectName"::STRING = 'ANALYTICS_DB.FINANCE.PAYROLL'
  AND query_start_time >= DATEADD(day, -30, CURRENT_TIMESTAMP())
ORDER BY query_start_time DESC;
```

`LATERAL FLATTEN` unpacks the array so each accessed object becomes its own row, which is what lets you filter `WHERE f1.value:"objectName"::STRING = ...` down to one table out of everything a query might have touched. Swap `'ANALYTICS_DB.FINANCE.PAYROLL'` for the fully-qualified name of whatever object you're auditing.

## Confirming a masking policy actually fired

Chapter 2 of this course covered writing masking and row access policies. Writing one isn't the same as proving it applied. `ACCESS_HISTORY`'s `policies_referenced` column records exactly that — which policies evaluated for a given query:

```sql
SELECT query_id, query_start_time, user_name, policies_referenced
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
WHERE query_start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
  AND policies_referenced IS NOT NULL;
```

A non-null `policies_referenced` value means at least one masking or row access policy evaluated for that query — the closest thing Snowflake gives you to a receipt that your Chapter 2 controls are actually doing something, not just sitting in the catalog unused.

## From a query to an audit

A query you ran once during an investigation isn't an audit — it's a one-off. Turning it into an audit means:

1. **Define the question precisely.** Which object, which users count as expected vs. unexpected, what counts as a "hit."
2. **Schedule it.** A Snowflake **Task** (covered in the base Snowflake course) can run the query daily or weekly and write results to a log table.
3. **Review the output on a cadence.** Unexplained access becomes something you catch on a schedule, not something you discover by accident months later.

That pattern — a defined question, run on a schedule, reviewed consistently — is what separates "I can write this SQL" from "we have a governance practice." Lesson 19 builds directly on it.

## Key terms

| Term | Meaning |
|---|---|
| LATERAL FLATTEN | SQL construct that unpacks a semi-structured array/object into rows, usable in a FROM clause |
| base_objects_accessed | ACCESS_HISTORY column holding the real, resolved objects a query touched (semi-structured) |
| policies_referenced | ACCESS_HISTORY column recording which masking/row access policies evaluated for a query |
| Task | A Snowflake object that runs SQL on a schedule — the mechanism for turning an audit query into a recurring check |

## Lab

1. Pick one table in your own account you'd consider sensitive. Run the `base_objects_accessed` query above against it (swap in the real fully-qualified name) and review who has actually queried it in the last 30 days.
2. If you have a masking policy applied to any column, run a query against that column, then check `policies_referenced` for that query's row and confirm the policy shows up.
3. Sketch (in plain English, no need to actually build it) what a Task-based version of one of these queries would look like: how often would it run, and what would trigger a human to look at the output?

## Check yourself

Given a table you suspect was accessed by someone outside its normal user list, which ACCESS_HISTORY column and SQL construct would you use to list every user who touched it in the last 30 days — and how would you separately confirm whether a masking policy was active for those queries?
