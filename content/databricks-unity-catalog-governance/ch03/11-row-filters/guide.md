# Lesson 11 — Row Filters

**Chapter 3 · Fine-Grained Security · Lesson 11 of 25**

## What you'll learn

- What a row filter is, and how it's enforced differently than a `GRANT`
- The real `CREATE FUNCTION` + `ALTER TABLE ... SET ROW FILTER` pattern
- A working example: admins see everything, everyone else sees only their region
- The mapping-table pattern for access-control-list-style row filtering
- How to modify, disable, and safely remove a row filter

## What a row filter actually does

Unity Catalog grants (`GRANT SELECT ON TABLE ...`) are all-or-nothing: a user can see every row of a table or none of them. A **row filter** goes further — it's a SQL function, registered in Unity Catalog, that Databricks evaluates against every row at query time. Rows where the function returns `false` are silently excluded from the result set. The user still has `SELECT` on the table; the filter just narrows what they get back.

Each table can have exactly one row filter. The filter function accepts zero or more parameters, and each parameter is bound to a column (or a constant) when the filter is applied.

## Writing and applying a row filter

Create the filter function, then attach it to a table with `ALTER TABLE`:

```sql
CREATE FUNCTION us_filter(region STRING)
RETURN IF(IS_ACCOUNT_GROUP_MEMBER('admin'), true, region = 'US');

CREATE TABLE sales (region STRING, id INT);
ALTER TABLE sales SET ROW FILTER us_filter ON (region);
```

Members of the `admin` group get `true` unconditionally and see every row. Everyone else gets the result of `region = 'US'` — so a query against `sales` only returns U.S. rows for a non-admin, with no change needed in the querying application or the `SELECT` statement itself. You can also apply the filter in the same statement that creates the table, using `CREATE TABLE ... WITH ROW FILTER us_filter ON (region)`.

## Access-control-list style filtering with a mapping table

Not every filtering rule is a simple column match. For custom logic — org hierarchies, replicated access-control lists from a source system — Databricks' own documentation recommends a **mapping table**: an ordinary table that lists which users or groups can see which rows, joined into the filter function.

```sql
CREATE TABLE valid_users (username STRING);
INSERT INTO valid_users VALUES ('fred@databricks.com'), ('barney@databricks.com');

CREATE FUNCTION row_filter()
  RETURN EXISTS(
    SELECT 1 FROM valid_users v
    WHERE v.username = SESSION_USER()
  );

CREATE TABLE data_table (x INT, y INT, z INT)
  WITH ROW FILTER row_filter ON ();
```

`SESSION_USER()` returns the querying user's identity, so the filter checks whether that user appears in `valid_users` before returning any rows at all. Because the mapping table is a normal table, updating access is just an `INSERT`/`DELETE` against it — no redeployment of the filter function required.

## Changing or removing a row filter

```sql
-- Disable the filter: future queries return all rows
ALTER TABLE sales DROP ROW FILTER;

-- Modify the filter logic in place
CREATE OR REPLACE FUNCTION us_filter(region STRING)
RETURN IF(IS_ACCOUNT_GROUP_MEMBER('admin'), true, region = 'US');
```

One ordering rule matters: you must run `ALTER TABLE ... DROP ROW FILTER` **before** you `DROP FUNCTION` the filter function. Dropping the function first leaves the table referencing a function that no longer exists, which makes the table inaccessible until you drop the orphaned filter reference with the same `ALTER TABLE ... DROP ROW FILTER` statement.

## Key terms

| Term | Meaning |
|---|---|
| Row filter | A UDF attached to a table with `ALTER TABLE ... SET ROW FILTER`; rows where it returns `false` are excluded |
| `IS_ACCOUNT_GROUP_MEMBER()` | Built-in function checking account-level group membership, commonly used inside filter logic |
| Mapping table | An ordinary table of allowed users/values joined into a filter function — an access-control-list pattern |

## Lab

Using a table you can create in your own workspace, write a row filter function that lets members of an `admin` group see all rows, and restricts everyone else to rows where a `department` column equals `'engineering'`. Apply it with `ALTER TABLE`, then confirm with `DROP ROW FILTER` that removing it restores full visibility.

## Check yourself

Can you explain, without looking back: what does a row filter actually change about a `SELECT * FROM table` query, and why must you drop the row filter from the table before dropping its underlying function?
