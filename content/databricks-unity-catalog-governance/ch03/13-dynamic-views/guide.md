# Lesson 13 — Dynamic Views

**Chapter 3 · Fine-Grained Security · Lesson 13 of 25**

## What you'll learn

- What a dynamic view is, and how it differs from a row filter or column mask
- The real functions that make it work: `is_account_group_member()`, `is_member()`, `session_user()`
- Column-level, row-level, and data-masking examples, straight from Databricks' own documentation
- When to reach for a dynamic view instead of a row filter or column mask today

## What a dynamic view is

A **dynamic view** is an ordinary Unity Catalog view whose `SELECT` statement itself contains the access-control logic — a `CASE` expression or `WHERE` clause that changes its result depending on who's running the query. It predates row filters and column masks as Unity Catalog's fine-grained security mechanism, and it's still fully supported today.

Three functions make dynamic views work:

- **`is_account_group_member()`** — true if the current user belongs to a given account-level group. Recommended for dynamic views against Unity Catalog data.
- **`is_member()`** — the older, workspace-level equivalent, kept for compatibility with the legacy Hive metastore. Avoid it against Unity Catalog data, since it doesn't check account-level groups.
- **`session_user()`** — returns the current user's email address, for logic keyed on identity rather than group membership.

## Column-level permissions

```sql
CREATE VIEW sales_redacted AS
SELECT
  user_id,
  CASE WHEN
    is_account_group_member('auditors') THEN email
    ELSE 'REDACTED'
  END AS email,
  country,
  product,
  total
FROM sales_raw
```

Apache Spark evaluates the `CASE` expression at query time and substitutes either the real `email` or the literal `'REDACTED'` — every other column passes through untouched, and the aliasing (`AS email`) keeps the column name identical for anyone querying the view.

## Row-level permissions

```sql
CREATE VIEW sales_redacted AS
SELECT
  user_id, country, product, total
FROM sales_raw
WHERE
  CASE
    WHEN is_account_group_member('managers') THEN TRUE
    ELSE total <= 1000000
  END;
```

Only `managers` group members see transactions over a million dollars; everyone else's `WHERE` clause silently drops those rows. This is the dynamic-view equivalent of a row filter, written directly into the view instead of attached to a table.

## Data masking with regular expressions

Because a dynamic view's logic is ordinary Spark SQL, you can go past simple redaction into partial masking:

```sql
-- user.x.lastname@example.com -> 'example' (the domain only)
CREATE VIEW sales_redacted AS
SELECT
  user_id,
  region,
  CASE
    WHEN is_account_group_member('auditors') THEN email
    ELSE regexp_extract(email, '^.*@(.*)$', 1)
  END
FROM sales_raw
```

Every user can analyze email domains for trend purposes; only `auditors` members ever see a complete address.

## Dynamic views vs. row filters and column masks today

Databricks still fully supports dynamic views, but recommends them primarily for compatibility with existing Hive-metastore-era logic or very ad hoc, one-off views. For governing real tables going forward, row filters and column masks (Lessons 11–12) are generally preferred: they attach directly to the table, so every view and query against that table inherits the same protection automatically, instead of needing every consumer to query through the correctly-written view. Databricks also recommends *not* granting users direct read access to the raw tables and views a dynamic view is built on — only the dynamic view itself — since the protection lives entirely in the view's logic, not the underlying data.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic view | A view whose SELECT statement contains CASE/WHERE logic that changes results by querying user |
| `is_account_group_member()` | Checks account-level group membership — the recommended function for Unity Catalog dynamic views |
| `session_user()` | Returns the querying user's email address, for identity-based (not group-based) view logic |

## Lab

Write a dynamic view over a table of your choosing that redacts a `phone_number` column to `'REDACTED'` for everyone except members of a `support` group, using `is_account_group_member()`. Then extend it so members of a `sales` group see only rows where `region = 'west'`.

## Check yourself

Without looking back: name the three functions dynamic views rely on, and explain why Databricks recommends `is_account_group_member()` over `is_member()` for views against Unity Catalog data.
