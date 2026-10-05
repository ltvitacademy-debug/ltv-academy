# Lesson 12 — Column Masks

**Chapter 3 · Fine-Grained Security · Lesson 12 of 25**

## What you'll learn

- What a column mask is and how it differs from a row filter
- The real `CREATE FUNCTION` + `ALTER TABLE ... ALTER COLUMN ... SET MASK` pattern
- Conditional masking based on another column, using `USING COLUMNS`
- Why Python masking logic needs a SQL wrapper function
- How to remove a mask

## What a column mask actually does

A row filter decides which rows come back. A **column mask** decides what a user sees *inside* a column that does come back. Like a row filter, it's a SQL user-defined function registered in Unity Catalog — but instead of returning a boolean, it returns a value of the same type as the column, which Databricks substitutes for the real value when the masking condition applies.

## A basic mask

```sql
CREATE FUNCTION ssn_mask(ssn STRING)
  RETURN CASE WHEN is_account_group_member('HumanResourceDept') THEN ssn ELSE '***-**-****' END;

CREATE TABLE users (name STRING, ssn STRING);
ALTER TABLE users ALTER COLUMN ssn SET MASK ssn_mask;
```

A non-HR user running `SELECT * FROM users` gets back `James  ***-**-****` — the real `ssn` value never leaves the table for them. HR group members see the actual column. You can also apply a mask in the same statement that creates the table: `CREATE TABLE users (name STRING, ssn STRING MASK ssn_mask)`.

## Conditional masking with `USING COLUMNS`

Sometimes the masking decision depends on *another* column in the same row, not just the querying user. `USING COLUMNS` passes extra arguments to the masking function beyond the masked column itself:

```sql
CREATE FUNCTION mask_address_by_country(address STRING, country STRING, group_suffix STRING DEFAULT '_address_viewers')
RETURN IF(
  is_account_group_member(country || group_suffix),
  address,
  'REDACTED'
);

CREATE TABLE customers (
  name STRING,
  address STRING MASK mask_address_by_country USING COLUMNS (country, '_address_viewers'),
  country STRING
);
```

A member of the `US_address_viewers` group sees full U.S. addresses but a `REDACTED` string for every other country's rows — the mask evaluates per row, using that row's own `country` value. This is the same pattern a real HR or sales table uses to let regional teams see only their own region's PII.

## Python masking logic needs a SQL wrapper

Column masks can use Python logic, but a masking function applied with `SET MASK` must itself be a SQL function — you can't attach a Python UDF directly as a mask. The fix is a two-step wrapper:

```sql
CREATE OR REPLACE FUNCTION email_mask_python(email STRING)
RETURNS STRING
LANGUAGE PYTHON
AS $$
import re
return re.sub(r'^[^@]+', lambda m: '*' * len(m.group()), email)
$$;

CREATE OR REPLACE FUNCTION email_mask_sql(email STRING)
RETURN email_mask_python(email);

ALTER TABLE contacts ALTER COLUMN email SET MASK email_mask_sql;
```

Trying to apply `email_mask_python` directly as a mask raises a `[ROUTINE_NOT_FOUND]` error — the SQL wrapper is what `SET MASK` actually needs.

## Removing a mask

```sql
ALTER TABLE users ALTER COLUMN ssn DROP MASK;
```

Future queries return the unmasked column for every user, regardless of group membership.

## Key terms

| Term | Meaning |
|---|---|
| Column mask | A UDF attached to a column with `ALTER TABLE ... ALTER COLUMN ... SET MASK`, returning a real or redacted value |
| `USING COLUMNS` | Clause passing additional columns or constants into a masking function beyond the masked column |
| SQL wrapper function | A SQL UDF that calls a Python/Scala UDF — required because `SET MASK` only accepts SQL functions |

## Lab

Write a masking function for a `salary` column that shows the real value only to members of a `finance` group and returns `NULL` to everyone else. Apply it with `ALTER TABLE ... SET MASK`, then confirm with `DROP MASK` that the original values return.

## Check yourself

Without looking back: what's the practical difference between a row filter and a column mask, and why can't you apply a Python UDF directly as a column mask?
