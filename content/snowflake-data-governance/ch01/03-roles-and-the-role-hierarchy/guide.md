# Lesson 3 — Roles and the Role Hierarchy

**Chapter 1 · Snowflake Governance Foundations · Lesson 3 of 25**

## What you'll learn

- Snowflake's six system-defined roles and what each one is actually for
- How those roles stack into a hierarchy, and what "inheritance" means for a role granted to another role
- How to list roles in SQL and view the hierarchy graphically in Snowsight
- How to check which role your current session is using

## The six system-defined roles

Every Snowflake account starts with six built-in roles. None of them are optional — they exist from the moment the account is created, and nearly every custom role you'll ever build (starting next lesson) is granted underneath one of them.

```sql
USE ROLE accountadmin;

SHOW ROLES;

SELECT
  "name",
  "comment"
FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "name" IN ('ORGADMIN','ACCOUNTADMIN','SYSADMIN','USERADMIN','SECURITYADMIN','PUBLIC');
```

![A query result listing the six Snowflake system-defined roles — ACCOUNTADMIN, ORGADMIN, PUBLIC, SECURITYADMIN, SYSADMIN, USERADMIN — with one-line descriptions.](/courses/snowflake-data-governance/ch01/03-roles-and-the-role-hierarchy/system-roles-query.png)
*Every Snowflake account ships with these six roles — the starting point for every access decision in this course.*

Here's what each one actually does:

- **ORGADMIN** — manages accounts *within* an organization (creating accounts, viewing organization-level usage). Most individual contributors never touch this role.
- **ACCOUNTADMIN** — the top-level role. It can manage every aspect of the account, including billing. Grant it sparingly — it's the role most likely to cause damage if over-assigned.
- **SECURITYADMIN** — manages grants, and can manage users and roles. This is the role that typically *grants* privileges to other roles (you'll see this directly in Lesson 4).
- **USERADMIN** — creates and manages users and roles, but doesn't grant privileges on data objects. USERADMIN and SECURITYADMIN together implement a deliberate separation of duties: one role creates the role, a different role grants it access.
- **SYSADMIN** — creates and owns warehouses, databases, and most other objects. This is the role most custom roles should be granted under, so that SYSADMIN (not ACCOUNTADMIN) ends up owning the bulk of an account's day-to-day objects.
- **PUBLIC** — automatically available to every user in the account, with no explicit grant required. It's the implicit base of the entire hierarchy.

## The role hierarchy

Roles in Snowflake aren't flat — they stack. **Admin → Users & Roles → Roles**, Graph view, shows this visually:

![Snowsight's Users & Roles page, Roles tab, Graph view, showing ACCOUNTADMIN at the top connected down to SECURITYADMIN and SYSADMIN, with USERADMIN beneath SYSADMIN.](/courses/snowflake-data-governance/ch01/03-roles-and-the-role-hierarchy/role-hierarchy-graph.png)
*ACCOUNTADMIN sits at the top, with SECURITYADMIN and SYSADMIN beneath it — a role at the top inherits everything the roles below it can do.*

ACCOUNTADMIN sits at the top, with SECURITYADMIN and SYSADMIN granted to it, and USERADMIN granted to SYSADMIN. The key mechanic: **a role granted to another role inherits everything that role can do.** Because SECURITYADMIN and SYSADMIN are granted to ACCOUNTADMIN, anyone using ACCOUNTADMIN implicitly has everything SECURITYADMIN and SYSADMIN have — without ACCOUNTADMIN needing its own separate set of grants. This is the same inheritance mechanic you'll use deliberately when you build custom roles in Lesson 4.

## Checking your own role

A worksheet's role badge always shows which role your session is currently using, and the **Switch Role** panel in the user menu lets you confirm it and change it:

![The user preference menu's Switch Role panel, showing the current active role as SYSADMIN.](/courses/snowflake-data-governance/ch01/03-roles-and-the-role-hierarchy/switch-role-menu.png)
*The Switch Role panel — always visible from the user menu, showing the role you're currently using (here, SYSADMIN).*

Get in the habit of checking this before running anything that changes access — it's the fastest way to avoid accidentally running a grant statement as the wrong role, which either fails outright or (worse) succeeds with unintended scope.

## Key terms

| Term | Meaning |
|---|---|
| System-defined role | One of the six roles (ORGADMIN, ACCOUNTADMIN, SECURITYADMIN, USERADMIN, SYSADMIN, PUBLIC) that exists in every Snowflake account by default |
| Role hierarchy | The structure of roles granted to other roles, where a higher role inherits everything the roles beneath it can do |
| ACCOUNTADMIN | The top-level role; can manage every aspect of the account — grant sparingly |
| SECURITYADMIN | Manages grants and can manage users/roles — typically the role that grants privileges to other roles |
| SYSADMIN | Creates and owns warehouses, databases, and most objects — most custom roles are granted under this role |
| USERADMIN | Creates and manages users and roles, separate from granting privileges |
| PUBLIC | Automatically available to every user — the implicit base role |

## Lab

1. Run the `SHOW ROLES` / `RESULT_SCAN` query above against your own account and confirm you see all six system roles.
2. In Snowsight, open **Admin → Users & Roles → Roles**, switch to Graph view, and trace the connections from ACCOUNTADMIN down.
3. Check the Switch Role panel and note which role your own login is currently using.

## Check yourself

- What does it mean for SECURITYADMIN and SYSADMIN to be "granted to" ACCOUNTADMIN, in terms of what ACCOUNTADMIN can do?
- Why does this lesson recommend granting custom roles underneath SYSADMIN rather than ACCOUNTADMIN?
- What's the practical difference between what USERADMIN and SECURITYADMIN are each responsible for?
