# Lesson 3 — Setting Up Warehouses and Roles

**Chapter 2 · Snowflake Foundations · Lesson 3 of 26**

## What you'll learn

- Real `CREATE WAREHOUSE` syntax, and why a small team needs more than
  one
- Real `CREATE ROLE` / `GRANT ... TO ROLE` syntax for two specific
  roles this platform needs: `TRANSFORMER` and `ANALYST`
- How Snowflake's built-in role hierarchy (`ACCOUNTADMIN` →
  `SYSADMIN`/`SECURITYADMIN`) is the real foundation any custom role
  gets slotted into
- Why "who can do what" has to be decided before a single dbt model
  gets built

## Two warehouses, not one

A warehouse is Snowflake's unit of compute — and a small team is
already better served by more than one. Jaffle Shop's platform gets
two, sized for very different jobs:

```sql
-- dbt builds run here: bigger, auto-suspends fast since builds are bursty
CREATE OR REPLACE WAREHOUSE transforming_wh
  WAREHOUSE_SIZE = 'SMALL'
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  COMMENT = 'Used by dbt builds (TRANSFORMER role)';

-- BI queries run here: smaller, never competes with a long dbt build for compute
CREATE OR REPLACE WAREHOUSE reporting_wh
  WAREHOUSE_SIZE = 'X-SMALL'
  AUTO_SUSPEND = 300
  AUTO_RESUME = TRUE
  COMMENT = 'Used by Power BI and ad hoc analyst queries (ANALYST role)';
```

Separate warehouses mean a heavy `dbt build` never makes a business
user's Power BI report sit waiting in a queue — the two workloads never
share compute.

## Snowflake's built-in role hierarchy, as the real foundation

Every Snowflake account ships with five system-defined roles arranged
in a hierarchy: `ACCOUNTADMIN` sits on top, encapsulating
`SECURITYADMIN` (which manages grants, and inherits `USERADMIN`, which
creates users and roles) and `SYSADMIN` (which creates warehouses,
databases, and other objects — and is the real parent almost every
custom role gets slotted under). `PUBLIC` is the floor every role has
automatically. A custom role like `TRANSFORMER` doesn't replace this
hierarchy — it gets built on top of it.

## Creating the two roles this platform actually needs

```sql
-- Only a role with CREATE ROLE (ACCOUNTADMIN here) can run these
CREATE ROLE IF NOT EXISTS transformer;
CREATE ROLE IF NOT EXISTS analyst;

-- Slot both into the hierarchy under SYSADMIN, so a sysadmin can
-- always see and manage what each custom role owns
GRANT ROLE transformer TO ROLE sysadmin;
GRANT ROLE analyst TO ROLE sysadmin;

-- Let dbt's role actually use its warehouse
GRANT USAGE ON WAREHOUSE transforming_wh TO ROLE transformer;

-- Let analysts (and Power BI) use theirs
GRANT USAGE ON WAREHOUSE reporting_wh TO ROLE analyst;

-- Assign the roles to real users
GRANT ROLE transformer TO USER dbt_service_account;
GRANT ROLE analyst TO USER power_bi_service_account;
```

`TRANSFORMER` is the role dbt itself runs as in every environment —
Chapter 2's remaining lessons give it write access to `DEV` and `PROD`
and read access to `RAW`. `ANALYST` is deliberately narrower: it will
only ever get read access to `PROD`'s finished marts (Lesson 5
assigns exactly that), never to `RAW` or `DEV`. Deciding this now, in
SQL, before a single model exists, is what makes "governed" a fact
about the platform instead of a hope about how people will behave.

## Key terms

| Term | Meaning |
|---|---|
| Warehouse | Snowflake's unit of compute; separate warehouses isolate workloads from each other |
| `AUTO_SUSPEND` | Seconds of idle time before a warehouse stops billing compute |
| `TRANSFORMER` role | The role dbt runs as across every environment in this platform |
| `ANALYST` role | The read-only role Power BI and people use against finished marts only |
| Role hierarchy | The tree of `GRANT ROLE ... TO ROLE` relationships rooted in SYSADMIN/SECURITYADMIN under ACCOUNTADMIN |

## Lab

1. Write the two `CREATE WAREHOUSE` statements above, picking sizes
   and `AUTO_SUSPEND` values you'd defend in a real design review.
2. Write the `CREATE ROLE`, `GRANT ROLE ... TO ROLE sysadmin`, and
   `GRANT USAGE ON WAREHOUSE ... TO ROLE` statements for both
   `transformer` and `analyst`.
3. In one sentence each, explain why `ANALYST` doesn't get `USAGE` on
   `transforming_wh`, and why `TRANSFORMER` doesn't get `USAGE` on
   `reporting_wh`.

## Check yourself

You're ready for Lesson 4 when you can write both `CREATE WAREHOUSE`
statements and both roles' grants from memory, and explain where
`TRANSFORMER` and `ANALYST` sit in Snowflake's built-in role hierarchy.
