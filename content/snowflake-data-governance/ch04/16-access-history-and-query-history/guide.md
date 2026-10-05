# Lesson 16 — Access History and Query History

**Chapter 4 · Auditing and Monitoring · Lesson 16 of 25**

## What you'll learn

- The difference between QUERY_HISTORY and ACCESS_HISTORY — two distinct ACCOUNT_USAGE views
- Why "what ran" and "what data it actually touched" are different questions
- Real, correct SQL to query both views
- The edition and latency constraints that apply to ACCESS_HISTORY

## Two logs, two different questions

Every chapter before this one taught you how to *control* access — roles, masking policies, row access policies, tags. This chapter is about proving, after the fact, that the controls actually worked. The two foundational views for that are `QUERY_HISTORY` and `ACCESS_HISTORY`, both in the `SNOWFLAKE.ACCOUNT_USAGE` schema.

**QUERY_HISTORY** answers "what ran, who ran it, and did it succeed?" — a flat log of every statement executed in the account:

```sql
SELECT query_id, query_text, user_name, role_name,
       start_time, execution_status
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD(day, -1, CURRENT_TIMESTAMP())
ORDER BY start_time DESC
LIMIT 50;
```

**ACCESS_HISTORY** answers a narrower, governance-specific question: "which tables and columns did this query actually read or write?" That's a different thing from the query's text — a `SELECT *` from a view doesn't name the underlying tables in its text, but ACCESS_HISTORY resolves them for you:

```sql
SELECT query_id, query_start_time, user_name,
       direct_objects_accessed, base_objects_accessed
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
WHERE query_start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
ORDER BY query_start_time DESC;
```

## Why text search on QUERY_HISTORY isn't a substitute

It's tempting to think you can just `ILIKE` the query text in `QUERY_HISTORY` for a table name and call that an access audit. Two real reasons that fails:

1. **Indirection.** A query that selects from a secure view, or calls a UDF that reads a table internally, never mentions the base table by name in its own text — but it did read it. ACCESS_HISTORY's `base_objects_accessed` column resolves through that indirection to the real underlying object.
2. **Column-level granularity.** `direct_objects_accessed` and `base_objects_accessed` record which *columns* were touched, not just which table — essential when you need to prove a specific sensitive column (say, `ssn` or `salary`) was or wasn't read by a given query.

## Real columns on ACCESS_HISTORY

| Column | What it holds |
|---|---|
| `query_id` | Links back to the matching row in QUERY_HISTORY |
| `query_start_time` | When the query began |
| `user_name` | Who ran it |
| `direct_objects_accessed` | Objects named directly in the query |
| `base_objects_accessed` | Underlying objects resolved through views/UDFs |
| `objects_modified` | What was written to (INSERT/UPDATE/MERGE/COPY) |
| `object_modified_by_ddl` | DDL changes (CREATE/ALTER/DROP) to the object itself |
| `policies_referenced` | Masking or row access policies that applied |

## Constraints to know before you rely on this

- **Edition:** `ACCESS_HISTORY` requires **Enterprise Edition or higher** — it is not available on Standard Edition.
- **Latency:** data can lag up to **180 minutes (3 hours)** behind real time. Don't expect it for same-minute incident response.
- **Retention:** 365 days of history, with data available starting **February 22, 2021** on accounts that existed before that date.
- **QUERY_HISTORY**, by contrast, is available on every edition and has lower latency — it's the right first stop for "did this query even run," while ACCESS_HISTORY is the right stop for "did this query touch that specific table or column."

## Key terms

| Term | Meaning |
|---|---|
| QUERY_HISTORY | ACCOUNT_USAGE view logging every query: text, user, role, status, timing |
| ACCESS_HISTORY | ACCOUNT_USAGE view logging the actual tables/columns a query read or wrote, resolved through views/UDFs |
| direct_objects_accessed | ACCESS_HISTORY column: objects named directly in the query |
| base_objects_accessed | ACCESS_HISTORY column: underlying objects resolved through indirection |
| policies_referenced | ACCESS_HISTORY column recording which masking/row access policies applied to the query |

## Lab

1. Run the `QUERY_HISTORY` query above against your own account (swap in a smaller `LIMIT` if you have a busy account) and confirm you see your own recent queries.
2. Run the `ACCESS_HISTORY` query and find a query that selected from a view. Compare its `direct_objects_accessed` (the view) against its `base_objects_accessed` (the real table behind it).
3. Note your Snowflake edition. If you're on Standard Edition, `ACCESS_HISTORY` will return zero rows or an access error — confirm that's what you see, and understand why (Enterprise Edition+ only).

## Check yourself

Given a query that selects from a secure view wrapping a sensitive table, which ACCOUNT_USAGE view and column would you check to prove that query actually read the underlying sensitive table — and why wouldn't searching the query's own text be sufficient?
