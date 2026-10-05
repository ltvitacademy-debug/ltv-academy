# Lesson 4 — RBAC in Snowflake

**Chapter 1 · Snowflake Governance Foundations · Lesson 4 of 25**

## What you'll learn

- How to create a custom role and grant it warehouse, database, and object privileges, hands-on
- The deliberate division of labor between USERADMIN and SECURITYADMIN
- Why a role has zero access until privileges are explicitly granted — least privilege by default
- How the Snowsight object browser visibly changes as a role's privileges change

## Starting point: ACCOUNTADMIN

We'll start a worksheet in ACCOUNTADMIN, visible in the role badge at the top right — but only briefly, just long enough to hand off to the roles that actually do this work.

![A Snowsight worksheet with the role context switched to ACCOUNTADMIN, visible in the top-right badge.](/courses/snowflake-data-governance/ch01/04-rbac-in-snowflake/context-accountadmin.png)
*A worksheet with context switched to ACCOUNTADMIN (top-right badge) — the role we'll use to kick things off before handing control to USERADMIN and SECURITYADMIN.*

## Creating the role, then granting it access

This is a real example from Snowflake's own Tasty Bytes governance quickstart, generalized here as a hands-on RBAC walkthrough:

```sql
USE ROLE useradmin;

CREATE OR REPLACE ROLE tb_test_role
  COMMENT = 'test role for tasty bytes';

USE ROLE securityadmin;

GRANT ALL ON WAREHOUSE tb_dev_wh TO ROLE sysadmin;
GRANT OPERATE, USAGE ON WAREHOUSE tb_dev_wh TO ROLE tb_test_role;

GRANT USAGE ON DATABASE tb_101 TO ROLE tb_test_role;
GRANT USAGE ON ALL SCHEMAS IN DATABASE tb_101 TO ROLE tb_test_role;
```

Notice the division of labor: **USERADMIN creates the role**, then **SECURITYADMIN grants it privileges**. This isn't an accident — it's deliberate RBAC design. Separating "who can create a role" from "who can grant it access" means no single role can both invent a new identity *and* hand it privileges in one uninterrupted step, which is exactly the kind of separation of duties auditors look for.

## A role with no privileges yet

Right after `CREATE ROLE`, before any `GRANT` statements have run against it, a role has access to nothing. Here's what that looks like in Snowsight's object browser:

![A Snowsight worksheet with role context switched to a newly created role (junior_dba, from a different Snowflake quickstart), with the object browser showing only the built-in shared databases and nothing else.](/courses/snowflake-data-governance/ch01/04-rbac-in-snowflake/context-junior-dba.png)
*This worksheet is from Snowflake's own Getting Started quickstart — a different demo role (junior_dba) — but it shows the exact same mechanism: switch to a brand-new role and the object browser is nearly empty. No privileges, no visible objects. tb_test_role starts out identical.*

This is **least privilege by default**: Snowflake doesn't give a new role implicit access to anything. Every single privilege has to be granted explicitly, which is exactly what the next block of SQL does for `tb_test_role`.

## Granting table access, then granting the role to a user

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA tb_101.raw_customer TO ROLE tb_test_role;
GRANT SELECT ON ALL TABLES IN SCHEMA tb_101.raw_pos TO ROLE tb_test_role;
GRANT SELECT ON ALL VIEWS IN SCHEMA tb_101.analytics TO ROLE tb_test_role;

SET my_user_var = CURRENT_USER();
GRANT ROLE tb_test_role TO USER identifier($my_user_var);
```

The first three grants extend `tb_test_role`'s read access to specific schemas. The last two lines are the step it's easy to forget when you're learning RBAC: creating a role and granting it privileges doesn't let anyone *use* that role — a separate `GRANT ROLE ... TO USER` is required. Here it's done dynamically with `CURRENT_USER()`, so the script grants the role to whoever happens to run it.

## Watching privileges become visible

Once `GRANT USAGE ON DATABASE` runs, that database appears in the object browser for anyone using the role — immediately, with no refresh or re-login required:

![The same object browser as before, now with two databases visible in the left-hand panel after USAGE was granted on them.](/courses/snowflake-data-governance/ch01/04-rbac-in-snowflake/databases-visible-after-grant.png)
*Same quickstart, same junior_dba role — after granting USAGE on two databases, they now appear in the object browser. This is what GRANT USAGE ON DATABASE tb_101 does for tb_test_role: zero access becomes visible access, immediately.*

This before/after pair — empty object browser, then populated object browser — is the clearest visual proof that Snowflake privileges aren't cosmetic. A role you haven't granted anything to genuinely cannot see the objects exist, not just query them.

## Key terms

| Term | Meaning |
|---|---|
| RBAC | Role-based access control — privileges are granted to roles, and roles are granted to users, rather than granting privileges to individuals directly |
| Privilege | A specific permission (like USAGE, SELECT, or OPERATE) on a specific object type |
| GRANT | The SQL statement that attaches a privilege to a role, or a role to a user |
| Least privilege | The principle that a role should start with, and keep, only the access it actually needs — nothing implicit or extra |
| Functional role | A custom role (like tb_test_role) built for a specific job, as opposed to one of the six system-defined roles |

## Lab

1. As USERADMIN, create a role of your own (e.g. `my_test_role`).
2. As SECURITYADMIN, grant it USAGE on a warehouse and a database you have access to.
3. Switch into your new role and confirm in the object browser that only the objects you granted are visible — nothing else.
4. Grant the role to your own user with `GRANT ROLE my_test_role TO USER identifier($my_user_var)` (using `SET my_user_var = CURRENT_USER();` first), and confirm you can switch into it from the Switch Role panel.

## Check yourself

- Why does this lesson emphasize that USERADMIN creates the role but SECURITYADMIN grants it privileges, rather than one role doing both?
- What would tb_test_role be able to do immediately after `CREATE ROLE`, before any `GRANT` statements run against it?
- What's the difference between granting a role a privilege and granting a role to a user — why are both steps necessary?
