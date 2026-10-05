# Lesson 7 — Masking Policies

**Chapter 2 · Data Protection · Lesson 7 of 25**

## What you'll learn

- The exact shape of a `CREATE MASKING POLICY` statement
- Why a masking policy's `RETURNS` type must match the column's data type
- How to write multiple `WHEN` branches inside the policy's `CASE` expression
- How to manage policies: `SHOW`, `DESCRIBE`, and attach/detach with `ALTER TABLE`

## The anatomy of `CREATE MASKING POLICY`

Lesson 6 showed you what masking *looks like* from the querying side. This lesson is about writing the policy object itself — the thing that actually produces that behavior.

Every masking policy has the same backbone:

```sql
CREATE [OR REPLACE] MASKING POLICY <name> AS (val <type>) RETURNS <type> ->
CASE
  WHEN <condition> THEN <expression>
  ...
  ELSE <expression>
END;
```

`val` is the incoming column value, typed to match whatever column the policy will be attached to. `RETURNS` declares the output type — and it has to match `val`'s type exactly, because Snowflake has to guarantee the masked result is still a legal value for that column. A `STRING`-typed column needs a policy that returns `STRING`; a `DATE`-typed column needs one that returns `DATE`. You can't mix them — a masking policy written for a date column can't be attached to a name column, even if the logic looks similar.

That's exactly why the Tasty Bytes example needs *two* policies, not one. Different columns need different `RETURNS` types:

![The customer_loyalty table's columns — first_name, last_name, e_mail, and phone_number are all STRING-typed; birthday_date is DATE-typed.](/courses/snowflake-data-governance/ch02/07-masking-policies/columns-needing-different-policy-types.png)
*Different column types need different policies — a STRING policy covers names, e-mail, and phone; a DATE policy covers birthday. Snowflake requires the policy's RETURNS type to match the column exactly.*

## The two real policies, side by side

```sql
CREATE OR REPLACE MASKING POLICY governance.tasty_pii_string_mask AS (val STRING) RETURNS STRING ->
CASE
  -- these active roles have access to unmasked values
  WHEN CURRENT_ROLE() IN ('ACCOUNTADMIN','SYSADMIN')
    THEN val
  -- if a column is tagged with TASTY_PII : PHONE_NUMBER, mask all but first 3 digits
  WHEN SYSTEM$GET_TAG_ON_CURRENT_COLUMN('TAGS.TASTY_PII') = 'PHONE_NUMBER'
    THEN CONCAT(LEFT(val,3), '-***-****')
  -- if tagged EMAIL, mask everything before the @ sign
  WHEN SYSTEM$GET_TAG_ON_CURRENT_COLUMN('TAGS.TASTY_PII') = 'EMAIL'
    THEN CONCAT('**~MASKED~**','@', SPLIT_PART(val, '@', -1))
  -- all other conditions: fully masked
  ELSE '**~MASKED~**'
END;

CREATE OR REPLACE MASKING POLICY governance.tasty_pii_date_mask AS (val DATE) RETURNS DATE ->
CASE
  WHEN CURRENT_ROLE() IN ('ACCOUNTADMIN','SYSADMIN')
    THEN val
  WHEN SYSTEM$GET_TAG_ON_CURRENT_COLUMN('TAGS.TASTY_PII') = 'BIRTHDAY'
    THEN DATE_FROM_PARTS(YEAR(val) - (YEAR(val) % 5), 1, 1)
  ELSE NULL
END;
```

Read the string policy's `CASE` top to bottom: privileged roles get the real value and exit immediately. Everything else falls through to a tag check — `SYSTEM$GET_TAG_ON_CURRENT_COLUMN` reads whatever `TASTY_PII` tag value is attached to *the specific column being queried* (tags are covered properly in Lesson 10, but you can see their effect here already). A column tagged `PHONE_NUMBER` gets partial masking; a column tagged `EMAIL` keeps its domain; anything else — or no matching tag at all — gets fully masked. The date policy follows the identical shape, just with a `DATE_FROM_PARTS` bucketing expression instead of string manipulation, and it returns `DATE`.

Here's the date policy's result column specifically, next to the string-masked columns beside it:

![The same masked customer_loyalty result, with birthday_date showing dates bucketed to the first of a 5-year window, like 1955-01-01, next to the fully string-masked name and contact columns.](/courses/snowflake-data-governance/ch02/07-masking-policies/date-masking-policy-result.png)
*BIRTHDAY_DATE is bucketed to the 1st of a 5-year window — that's what the DATE-returning policy with DATE_FROM_PARTS does. The STRING-typed columns beside it are masked by a completely separate policy object.*

## Managing policies

Once a policy exists, you manage it with standard DDL:

```sql
SHOW MASKING POLICIES IN SCHEMA governance;
DESCRIBE MASKING POLICY governance.tasty_pii_string_mask;

-- applying a policy directly to a single column (no tag involved):
ALTER TABLE raw_customer.customer_loyalty
  MODIFY COLUMN last_name
  SET MASKING POLICY governance.tasty_pii_string_mask;

-- removing it again:
ALTER TABLE raw_customer.customer_loyalty
  MODIFY COLUMN last_name
  UNSET MASKING POLICY;
```

`SHOW MASKING POLICIES` lists every policy object in a schema; `DESCRIBE MASKING POLICY` prints the exact signature and body of one. `SET MASKING POLICY` on `ALTER TABLE ... MODIFY COLUMN` attaches a policy straight to a column — no tag required. That's a perfectly valid way to use masking policies; tagging (Lesson 10) is a scaling technique on top of this, not a replacement for it.

## The assignment mechanism is invisible at query time

Whether a policy reaches a column directly, or through a tag, the person running the query can't tell the difference — and doesn't need to:

![The downstream analytics_mask_test view, queried as the same low-privileged role, still returning masked values regardless of how the underlying policy was assigned to the column.](/courses/snowflake-data-governance/ch02/07-masking-policies/policy-identity-is-invisible-downstream.png)
*How a policy got attached — directly or via tag — is invisible at query time. Only the masking behavior itself is visible to the querying role.*

## Key terms

| Term | Meaning |
|---|---|
| Masking policy | A named Snowflake object that defines, via a CASE expression, how a column's value should be transformed for a given role |
| Signature type (`val` type) | The data type of the incoming column value the policy is declared against |
| Returns type | The policy's declared output type — must match the signature type, and must match the column it's attached to |
| `SHOW` / `DESCRIBE MASKING POLICY` | Commands for listing policies in a schema and inspecting one policy's exact definition |
| `SET` / `UNSET MASKING POLICY` | The `ALTER TABLE ... MODIFY COLUMN` clauses that attach or remove a policy directly from a column |

## Lab

1. Write a `CREATE MASKING POLICY` for a `STRING` column that fully masks the value for every role except `ACCOUNTADMIN`.
2. Write a second policy for a `DATE` column of your choosing that returns `NULL` for everyone except `ACCOUNTADMIN`.
3. In words, describe the `ALTER TABLE` statement you'd run to attach your string policy directly to a column, and the one you'd run to remove it again.

## Check yourself

- Why can't a single masking policy serve both a `STRING` column and a `DATE` column?
- What does `SYSTEM$GET_TAG_ON_CURRENT_COLUMN` let a policy's `CASE` expression do that a flat, non-tag-aware policy couldn't?
- What's the difference between `SET MASKING POLICY` and `UNSET MASKING POLICY` on `ALTER TABLE ... MODIFY COLUMN`?
