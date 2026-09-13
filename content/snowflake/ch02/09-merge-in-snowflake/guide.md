# Lesson 9 — MERGE in Snowflake

**Chapter 2 · Snowflake SQL — What's Different From T-SQL · Lesson 9 of 60**

## What you'll learn

- Snowflake's `MERGE INTO` syntax, which is nearly identical to T-SQL's `MERGE`
- The two real differences: no `OUTPUT` clause, and no `WHEN NOT MATCHED BY SOURCE`
- How to work around both when you need that behavior
- Why `MERGE` matters more in Snowflake — it's the backbone of Chapter 5's ELT patterns

## The core syntax — nearly identical

If you know T-SQL `MERGE`, Snowflake's version reads almost the same:

```sql
MERGE INTO target_table AS t
USING staging_table AS s
  ON t.customer_id = s.customer_id
WHEN MATCHED THEN
  UPDATE SET t.email = s.email, t.updated_at = CURRENT_TIMESTAMP()
WHEN NOT MATCHED THEN
  INSERT (customer_id, email, updated_at)
  VALUES (s.customer_id, s.email, CURRENT_TIMESTAMP());
```

Same `MERGE INTO ... USING ... ON`, same `WHEN MATCHED THEN UPDATE/DELETE`,
same `WHEN NOT MATCHED THEN INSERT`. Snowflake also supports multiple
`WHEN MATCHED` clauses with extra `AND` conditions, evaluated in order,
exactly like T-SQL:

```sql
MERGE INTO target_table AS t
USING staging_table AS s
  ON t.customer_id = s.customer_id
WHEN MATCHED AND s.is_deleted = TRUE THEN
  DELETE
WHEN MATCHED THEN
  UPDATE SET t.email = s.email
WHEN NOT MATCHED THEN
  INSERT (customer_id, email) VALUES (s.customer_id, s.email);
```

## Difference 1 — no `OUTPUT` clause

T-SQL lets you capture the rows a `MERGE` affected with `OUTPUT ... INTO`:

```sql
-- T-SQL only — no Snowflake equivalent
MERGE INTO target_table AS t
USING staging_table AS s ON t.customer_id = s.customer_id
WHEN MATCHED THEN UPDATE SET t.email = s.email
OUTPUT $action, inserted.*, deleted.* INTO audit_log;
```

Snowflake's `MERGE` has **no `OUTPUT` clause at all** — you can't capture
affected rows inline as part of the statement. If you need an audit
trail of what a `MERGE` changed, the Snowflake pattern is to run the
`MERGE`, then separately query the target table's **Time Travel** history
(`AT`/`BEFORE` clauses, or the `CHANGES` clause) to see what changed, or
to log changes yourself in the staging step before merging.

## Difference 2 — no `WHEN NOT MATCHED BY SOURCE`

T-SQL supports both directions of "not matched": rows in the source not
in the target (`WHEN NOT MATCHED [BY TARGET]`) and rows in the target
not in the source (`WHEN NOT MATCHED BY SOURCE`) — letting one `MERGE`
handle inserts, updates, *and* deletes for rows that disappeared from
the source:

```sql
-- T-SQL only — Snowflake has no BY SOURCE / BY TARGET qualifiers
MERGE INTO target_table AS t
USING staging_table AS s ON t.customer_id = s.customer_id
WHEN NOT MATCHED BY TARGET THEN INSERT (...) VALUES (...)
WHEN NOT MATCHED BY SOURCE THEN DELETE;
```

Snowflake's `WHEN NOT MATCHED` only means "in source, not in target" —
there's no way to target "in target, not in source" from inside the same
`MERGE`. To delete target rows that no longer exist in the source,
Snowflake needs a separate statement:

```sql
DELETE FROM target_table t
WHERE NOT EXISTS (
  SELECT 1 FROM staging_table s WHERE s.customer_id = t.customer_id
);
```

## Why this matters going forward

Chapter 5 builds ELT patterns almost entirely around `MERGE` — it's how
Snowflake pipelines apply changed rows from a staging table into a
target without a manual `UPDATE`/`INSERT` split. Knowing up front that
`OUTPUT` and `WHEN NOT MATCHED BY SOURCE` aren't available means you
won't go looking for them mid-pipeline later.

## Key terms

| Term | Meaning |
|---|---|
| `MERGE INTO` | Same core syntax as T-SQL `MERGE` — match, update/delete, or insert in one statement |
| `WHEN MATCHED` | Row exists in both target and source — update or delete it |
| `WHEN NOT MATCHED` | Row exists in source but not target — insert it (Snowflake has no "by source" variant) |
| `OUTPUT` clause | Not available in Snowflake `MERGE` — use Time Travel or a separate query instead |

## Lab

Write a `MERGE` that upserts rows from a staging table into a target
table (insert new customer IDs, update existing ones' email). Then write
the separate `DELETE ... WHERE NOT EXISTS` statement that would remove
target rows no longer present in staging — the workaround for T-SQL's
`WHEN NOT MATCHED BY SOURCE`.

## Check yourself

You're ready for Lesson 10 when you can name both real differences
between Snowflake and T-SQL `MERGE` without looking them up.
