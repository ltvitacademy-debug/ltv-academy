# Lesson 42 — Dynamic Data Masking in Snowflake

**Chapter 9 · Security & RBAC · Lesson 42 of 60**

## What you'll learn

- What a masking policy is and how it differs from a row access policy
- How to write a masking policy with CASE logic based on the querying role
- How to attach a masking policy to a column with ALTER TABLE
- Why masking happens at query time, not by altering the stored data

## Masking policies protect columns, not rows

Row access policies from Lesson 41 filter which *rows* a role sees.
**Dynamic data masking** works at the column level instead: the raw
value is still stored exactly as-is, but Snowflake substitutes a
masked value at query time for any role that shouldn't see the real
one. Nothing about the underlying data changes — a `SELECT *` from a
privileged role returns the real value, and the exact same `SELECT *`
from an unprivileged role returns a masked one, with zero difference
in how either role wrote the query.

```sql
CREATE MASKING POLICY hr.public.ssn_mask AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('HR_ADMIN') THEN val
    ELSE '***-**-' || RIGHT(val, 4)
  END;
```

This policy returns the full value for `HR_ADMIN`, and for every other
role returns everything but the last four characters replaced with
asterisks — a familiar partial-masking pattern for SSNs, card numbers,
or phone numbers.

## Attaching a masking policy to a column

A masking policy defined on its own does nothing until it's attached
to a specific column:

```sql
ALTER TABLE hr.public.employees
  MODIFY COLUMN ssn
  SET MASKING POLICY hr.public.ssn_mask;
```

From this point on, every query against `employees.ssn` — from any
tool, any BI report, any ad-hoc worksheet — is masked or not, purely
based on the querying role. Swap the policy for a different table's
column with the same `ALTER TABLE ... MODIFY COLUMN ... SET MASKING
POLICY` pattern, and a single policy definition can be reused across
many tables that share the same sensitive column type (every SSN
column in the account, for instance, using one shared policy).

## Key terms

| Term | Meaning |
|---|---|
| Masking policy | A function attached to a column that returns a masked or real value depending on the querying role |
| CREATE MASKING POLICY | Defines the masking logic once, independent of any table |
| ALTER TABLE ... SET MASKING POLICY | Attaches an existing masking policy to a specific column |
| Row access policy vs. masking policy | Row access policies filter which rows return; masking policies alter what a returned column's value looks like |
| Query-time masking | The stored value never changes — Snowflake substitutes the masked value only as query results are returned |

## Lab

1. Create a small test table with a fake "SSN" or "phone number"
   column and a handful of rows.
2. Write a masking policy that shows the real value only to
   `ACCOUNTADMIN` and masks it for every other role, following the
   `CASE ... CURRENT_ROLE() ...` pattern above.
3. Attach it with `ALTER TABLE ... MODIFY COLUMN ... SET MASKING
   POLICY`.
4. Query the table as `ACCOUNTADMIN`, then switch to a different role
   and query it again — confirm the exact same `SELECT` returns
   different values depending on your active role.

## Check yourself

You're ready for Lesson 43 when you can explain, in one sentence, why
dynamic data masking never changes what's actually stored on disk, and
you can write the two-statement pattern (CREATE MASKING POLICY, then
ALTER TABLE ... SET MASKING POLICY) from memory.
