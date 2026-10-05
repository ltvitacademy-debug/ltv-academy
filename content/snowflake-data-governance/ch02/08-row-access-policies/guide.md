# Lesson 8 — Row Access Policies

**Chapter 2 · Data Protection · Lesson 8 of 25**

## What you'll learn

- How a row access policy differs from a masking policy — rows, not column values
- The mapping-table pattern for scaling row-level security past hardcoded role names
- How to write and attach a `CREATE ROW ACCESS POLICY`
- Why row access policies, like masking, travel automatically into downstream views

## Filtering rows instead of column values

Masking policies (Lessons 6–7) change what a role sees **inside** a cell — a real phone number becomes a partially masked one, but the row is still there. A **row access policy** does something different: it decides whether an entire row is visible to a role **at all**. A row access policy is a boolean expression — `TRUE` means the row is visible to the current role, `FALSE` means it's silently filtered out. No error, no indication anything was hidden — the row simply isn't in the result set.

## The mapping-table pattern

You could write a policy that hardcodes role names directly into its logic (`WHEN CURRENT_ROLE() = 'SALES_TOKYO' THEN city = 'Tokyo'`), but that doesn't scale — every new role needs the policy itself rewritten. The pattern used here instead is a **mapping table**: a real table of `(role, city_permissions)` pairs that the policy checks against with a subquery.

```sql
USE ROLE accountadmin;

CREATE OR REPLACE TABLE governance.public.row_policy_map
  (role STRING, city_permissions STRING);

INSERT INTO governance.row_policy_map
VALUES ('TB_TEST_ROLE','Tokyo');
```

That's the entire setup: one row in a plain table says `tb_test_role` is allowed to see `Tokyo`. Adding a new role's access later is an `INSERT`, not a policy rewrite.

## The policy itself

```sql
CREATE OR REPLACE ROW ACCESS POLICY governance.customer_city_row_policy
AS (city STRING) RETURNS BOOLEAN ->
  CURRENT_ROLE() IN ('ACCOUNTADMIN','SYSADMIN') -- these roles bypass the policy
  OR EXISTS (
    SELECT rp.role
    FROM governance.row_policy_map rp
    WHERE rp.role = CURRENT_ROLE()
      AND rp.city_permissions = city
  )
  COMMENT = 'Limits rows by mapping table of ROLE and CITY: governance.row_policy_map';

ALTER TABLE raw_customer.customer_loyalty
  ADD ROW ACCESS POLICY governance.customer_city_row_policy ON (city);
```

Read the boolean expression as two ways a row can pass: the querying role is a privileged bypass role (`ACCOUNTADMIN`/`SYSADMIN`), **or** the mapping table has a row proving `CURRENT_ROLE()` is permitted to see this particular `city` value. `ALTER TABLE ... ADD ROW ACCESS POLICY ... ON (city)` is what actually attaches the policy to the table, naming which column(s) the policy's signature maps to.

## What it looks like from the filtered role

Querying `raw_customer.customer_loyalty` as `tb_test_role` — the role the mapping table only grants `Tokyo` access to — returns rows from Tokyo and nowhere else:

![A query result from customer_loyalty queried as tb_test_role, where every single row's CITY column reads Tokyo, with FIRST_NAME and LAST_NAME also masked from the policies in Lessons 6-7.](/courses/snowflake-data-governance/ch02/08-row-access-policies/row-policy-filters-to-tokyo.png)
*Every row: Tokyo only. The row access policy filters rows at the same time the masking policies from Lessons 6-7 are filtering column values — the two stack independently.*

Notice the names are masked here too — this table has both a row access policy and masking policies active simultaneously. They're independent mechanisms stacking on the same table: one decides which rows show up, the other decides what those rows' values look like.

## It propagates downstream, same as masking

Just like masking, a row access policy attached to a base table carries automatically into anything built on top of it:

![The downstream customer_loyalty_metrics_v view, grouped by city and queried as the same restricted role, returning only a single Tokyo row even though the view spans every city in the base table.](/courses/snowflake-data-governance/ch02/08-row-access-policies/row-policy-propagates-downstream.png)
*Grouped by city, queried by the same restricted role — only Tokyo appears. Like masking, a row access policy attached to a base table travels automatically into views built on it.*

## Key terms

| Term | Meaning |
|---|---|
| Row access policy | A boolean expression attached to a table that determines whether each row is visible to the querying role |
| Mapping table pattern | A real table of (role, permission) pairs that a policy's EXISTS subquery checks, instead of hardcoding role names in the policy |
| Row-level security | The general term for restricting visibility to specific rows based on the querying identity |
| Policy bypass role | A role explicitly allowed through a row access policy's boolean logic regardless of the mapping table, typically an admin role |

## Lab

1. Sketch a mapping table for a scenario of your choosing (e.g. region, department, or client) with at least two role/value pairs.
2. Write the `CREATE ROW ACCESS POLICY` that checks your mapping table via `EXISTS`, including a bypass clause for an admin role.
3. Write the `ALTER TABLE ... ADD ROW ACCESS POLICY` statement that would attach it to a real table and column.

## Check yourself

- What does a row access policy return, and what does TRUE vs FALSE mean for a given row?
- Why does the mapping-table pattern scale better than hardcoding role names directly into the policy's CASE or boolean logic?
- If a table has both a masking policy and a row access policy active, do they conflict, or do they operate independently? What does the Tokyo screenshot show about that?
