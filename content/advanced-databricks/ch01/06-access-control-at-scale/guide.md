# Lesson 6 — Access Control at Scale

**Chapter 1 · Beyond the Basics: Unity Catalog Deep Dive · Lesson 6 of 34**

## What you'll learn

- A fast recap: Lesson 42's `GRANT`/`REVOKE` and Lesson 43's row/column security
- Reusable row filters and column masks — one function, applied across many tables
- Scripting grants across a whole schema instead of typing one at a time
- Why group-based, SCIM-synced grants are what actually survives at scale

## The recap

Databricks & Delta Lake Lesson 42 already covered `GRANT`/`REVOKE`
syntax and privilege inheritance; Lesson 43 covered row filters and
column masks on one table; Lesson 47 already flagged "grant to
groups, not individuals" as a best practice. That's a single table,
a single grant, a single mask. This lesson is what happens when
there are three hundred tables, not one.

## Reusable masks — one function, applied everywhere

```sql
CREATE FUNCTION mask_ssn(ssn STRING)
RETURN CASE
  WHEN is_member('pii-readers') THEN ssn
  ELSE 'XXX-XX-' || RIGHT(ssn, 4)
END;

ALTER TABLE nyc_taxi.silver.customers
ALTER COLUMN ssn SET MASK mask_ssn;

ALTER TABLE nyc_taxi.silver.support_tickets
ALTER COLUMN customer_ssn SET MASK mask_ssn;
```

Lesson 43's example applied a mask to one column on one table. The
pattern that actually scales is a single reusable function like
`mask_ssn`, applied with `ALTER TABLE ... SET MASK` across every
table that happens to carry that column — one policy, defined once,
enforced consistently everywhere it's attached, instead of
reasoning about masking logic separately per table.

## Scripting grants across a schema, not typing them one at a time

```sql
-- INFORMATION_SCHEMA drives the grant, instead of a human typing
-- 300 individual GRANT statements by hand:
SELECT 'GRANT SELECT ON TABLE ' || table_catalog || '.' ||
       table_schema || '.' || table_name ||
       ' TO `analytics-team`;' AS grant_stmt
FROM nyc_taxi.information_schema.tables
WHERE table_schema = 'gold';
```

At the scale of a handful of tables, typing individual `GRANT`
statements is fine. At the scale of hundreds, it isn't — generating
them from `information_schema.tables` (or granting once at the
schema/catalog level when every table underneath should share the
same policy) is the real pattern, not three hundred hand-typed lines
that inevitably drift out of sync with what actually exists.

## Group-based, SCIM-synced — the part that actually survives

```sql
GRANT SELECT ON SCHEMA nyc_taxi.gold TO `analytics-team`;
-- `analytics-team` is synced from Entra ID via SCIM:
-- add someone to the Entra group, they inherit the grant
-- automatically; remove them, access disappears automatically.
-- Zero GRANT statements touched, in either direction.
```

Lesson 47 already said "groups, not individuals." The reason that
holds up at scale specifically is SCIM sync from an identity
provider: group membership changes propagate into Databricks
automatically, so the hundreds of `GRANT`s attached to that group
never need to be touched again as people join, leave, or change
teams — the alternative is re-auditing every individual grant by
hand, indefinitely.

## Key terms

| Term | Meaning |
|---|---|
| Reusable mask function | One `CREATE FUNCTION`, attached via `SET MASK` across every table that needs it |
| Scripted grants | Generating `GRANT` statements from `information_schema` instead of hand-typing hundreds |
| SCIM-synced groups | Group membership changes from the identity provider, with zero `GRANT`s touched |

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: why
does attaching one reusable mask function to many tables scale better
than writing masking logic separately for each table?
