# Lesson 41 — Secure Views & Row Access Policies

**Chapter 9 · Security & RBAC · Lesson 41 of 60**

## What you'll learn

- What a secure view hides that a regular view doesn't
- When to reach for a secure view instead of a plain one
- How a row access policy filters rows per-role at query time
- How to attach a row access policy to a table's columns

## Secure views hide the definition, not just the data

A regular Snowflake view's underlying SQL is visible to anyone who can
query it — `GET_DDL('VIEW', ...)` or `SHOW VIEWS` reveals the exact
query behind it, including any business logic, filter conditions, or
table names you might not want exposed. A **secure view** hides that
definition from anyone except the view's owner:

```sql
CREATE SECURE VIEW sales.public.regional_summary AS
SELECT region, SUM(amount) AS total_sales
FROM sales.public.transactions
WHERE amount > 0
GROUP BY region;
```

Someone with `SELECT` on `regional_summary` can query it and get
results, but they cannot see the `WHERE amount > 0` filter or that it
reads from `transactions` at all. This matters most when a view's
logic itself is sensitive — a pricing formula, a fraud-detection
filter, or a definition that would reveal a table's existence you'd
rather keep quiet. The tradeoff is real: Snowflake can't apply some
query-optimization shortcuts to secure views the way it can to regular
ones, so use them where hiding the definition actually matters, not by
default on every view.

## Row access policies filter which rows a role sees

A secure view controls the *definition*; a **row access policy**
controls which *rows* come back from a table or view, evaluated fresh
on every query based on who's asking. You define the policy once as a
function that returns `TRUE` for rows a role should see:

```sql
CREATE ROW ACCESS POLICY sales.public.region_filter
  AS (region_col VARCHAR) RETURNS BOOLEAN ->
  CURRENT_ROLE() IN ('SALES_ADMIN')
  OR region_col = CURRENT_ROLE();

ALTER TABLE sales.public.transactions
  ADD ROW ACCESS POLICY sales.public.region_filter
  ON (region);
```

Once attached, every `SELECT * FROM transactions` a user runs is
silently filtered: `SALES_ADMIN` sees every row, but a role named
(say) `WEST` only sees rows where `region = 'WEST'`. No application
code changes, no separate view per region — the same table, the same
query, different rows back depending on who's asking.

## Key terms

| Term | Meaning |
|---|---|
| Secure view | A view whose underlying SQL definition is hidden from anyone but its owner |
| Regular view | A standard view; its definition is visible via GET_DDL or SHOW VIEWS |
| Row access policy | A function attached to a table's column(s) that filters which rows a query returns, based on the querying role |
| CREATE ROW ACCESS POLICY | Defines the filtering function once, independent of any table |
| ALTER TABLE ... ADD ROW ACCESS POLICY | Attaches an existing policy to a specific table's column |

## Lab

1. Create a plain view over a sample table, then run `SHOW VIEWS LIKE
   '<your_view>';` followed by `SELECT GET_DDL('VIEW',
   '<your_view>');` — confirm you can see its full definition.
2. Recreate the same view as `CREATE SECURE VIEW` and run
   `GET_DDL` again from a role other than the owner — confirm the
   definition is no longer visible.
3. Write a row access policy that lets `ACCOUNTADMIN` see all rows of
   a small test table but restricts every other role to rows matching
   `CURRENT_ROLE()`. Attach it with `ALTER TABLE ... ADD ROW ACCESS
   POLICY`.
4. Query the table as two different roles and confirm each sees a
   different slice of the same rows.

## Check yourself

You're ready for Lesson 42 when you can explain the difference between
"hiding a view's definition" and "filtering a table's rows" in one
sentence each, and you know which SQL statement attaches a row access
policy to a table.
