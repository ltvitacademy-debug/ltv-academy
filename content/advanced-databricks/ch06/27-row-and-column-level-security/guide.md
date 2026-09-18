# Lesson 27 — Row- & Column-Level Security in Unity Catalog

**Chapter 6 · Advanced Security & Governance · Lesson 27 of 34**

## What you'll learn

- A fast recap of Databricks & Delta Lake Lesson 43 — not a re-teach
- `is_account_group_member()` vs. the legacy `is_member()` — and why it matters
- Applying masks and filters consistently across dozens of tables, not one
- Attribute-based access control (ABAC): governing by tag, not by column name

## What Lesson 43 already covered

Databricks & Delta Lake Lesson 43 covered column masks and row
filters in full, with one worked example each:

```sql
-- Lesson 43's pattern
CREATE FUNCTION mask_vendor_id(vendor_id STRING)
RETURNS STRING
RETURN CASE WHEN is_member('data-engineers') THEN vendor_id ELSE 'REDACTED' END;

ALTER TABLE nyc_taxi.silver.trips
ALTER COLUMN VendorID SET MASK mask_vendor_id;
```

A function, evaluated per query, hiding a column's value or an
entire row based on who's asking — one table, one column, one row
filter. That picture is correct and this course assumes you already
have it. What it leaves out is everything that happens once "one
table" becomes forty.

## `is_account_group_member()`, not `is_member()`

Lesson 43's example used `is_member()`, which checks membership in a
**workspace-local** group. Unity Catalog's own identity model is
**account-level** — the same catalog can be attached to multiple
workspaces, and a workspace-local group check doesn't reliably mean
the same thing in each of them. `is_account_group_member()` checks
membership in an **account-level** group instead, consistently, no
matter which attached workspace the query actually runs from.

```sql
CREATE FUNCTION mask_ssn(ssn STRING)
RETURNS STRING
RETURN CASE
    WHEN is_account_group_member('pii-readers') THEN ssn
    ELSE 'REDACTED'
END;
```

For a single-workspace toy example, the difference is invisible.
The moment a catalog is bound to more than one workspace — exactly
the multi-workspace picture Lesson 1 already established as normal
— `is_member()`'s workspace-local check becomes a real, silent gap:
a group that looks like "the same group" from two different
workspaces might not resolve the same way at all.

## Applying this across dozens of tables, not one

Lesson 43's pattern — write one function, run one `ALTER TABLE` — is
completely reasonable for one table. It does not scale to a real
lakehouse with dozens of PII-bearing columns spread across many
tables, written by hand, one `ALTER TABLE` at a time:

```sql
-- Doing this by hand, forty times, is how masks quietly drift --
-- one table gets updated when the policy changes, another doesn't
ALTER TABLE sales.customers ALTER COLUMN ssn SET MASK mask_ssn;
ALTER TABLE hr.employees ALTER COLUMN ssn SET MASK mask_ssn;
ALTER TABLE finance.contractors ALTER COLUMN ssn SET MASK mask_ssn;
-- ...37 more tables, each a separate statement to remember and re-run
```

The real production question isn't "how do I mask one column" —
Lesson 43 already answered that — it's "how do I guarantee every
column that *should* carry this mask actually does, today and after
the next table gets added."

## Attribute-based access control (ABAC) — govern by tag, not by name

The systematic fix is to stop tying protection to a specific
column's name at all, and tie it to a **tag** the column carries
instead:

```sql
-- Tag the column with what it IS, not just what it's called
ALTER TABLE sales.customers ALTER COLUMN ssn
  SET TAGS ('pii_category' = 'ssn');

-- One policy, tied to the TAG -- applies to every column carrying
-- it, in every table, present or future, without a separate
-- ALTER TABLE per table
CREATE MASKING POLICY mask_by_pii_tag
  FOR COLUMNS TAGGED ('pii_category' = 'ssn')
  RETURN CASE WHEN is_account_group_member('pii-readers')
              THEN value ELSE 'REDACTED' END;
```

This is the real difference between Lesson 43's scope and this
lesson's: Lesson 43 protects *a* column; a tag-based policy protects
*every column that is what the tag says it is*, including one added
to a table next quarter that nobody remembers to run an `ALTER
TABLE` against by hand. Access control becomes a property of the
data's classification, not a list of specific objects someone has
to keep in sync manually.

## Key terms

| Term | Meaning |
|---|---|
| `is_account_group_member()` | Checks account-level group membership, consistent across every workspace attached to a metastore |
| `is_member()` (legacy) | Checks workspace-local group membership — can behave differently per attached workspace |
| ABAC (attribute-based access control) | Governing by a tag/attribute the data carries, not by a specific object's name |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why
does tagging a column and writing one tag-based masking policy scale
better than writing a separate `ALTER TABLE ... SET MASK` for every
PII column in the lakehouse?
