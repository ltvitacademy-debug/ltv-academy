# Lesson 39 — Users, Roles & the Snowflake Role Hierarchy

**Chapter 9 · Security & RBAC · Lesson 39 of 60**

## What you'll learn

- The five system-defined roles every Snowflake account ships with
- How those roles form a hierarchy through GRANT ROLE ... TO ROLE
- Where a custom role like JUNIOR_DBA fits into that hierarchy
- How to switch roles and confirm your active role in Snowsight

## Snowflake's access control is entirely role-based

Every query in Snowflake runs as a **role**, never as a user directly.
A user can be granted multiple roles, switch between them per
worksheet or per session, and each role carries its own set of
privileges — what databases it can see, what warehouses it can use,
what objects it can create. Five roles are system-defined and exist in
every account before you create anything:

![The Switch Role menu in Snowsight's user-preferences panel, listing every role available to the current user: ACCOUNTADMIN (marked Default), JUNIOR_DBA, ORGADMIN, SYSADMIN, PUBLIC, and SECURITYADMIN.](/courses/snowflake/ch09/39-users-roles-and-role-hierarchy/role-switcher-hierarchy.png)
*Every role available to a user shows up here — the five built-in roles plus any custom roles, like JUNIOR_DBA, that have been granted to you.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

## The built-in hierarchy

The five system-defined roles aren't independent — they're arranged in
a tree, and a role granted to another role inherits everything that
role can do:

- **ACCOUNTADMIN** — the top-level role. It encapsulates both
  SECURITYADMIN and SYSADMIN, meaning it can do everything they can
  do plus account-level tasks like billing. Snowflake's own
  documentation recommends granting it to only a small number of
  people.
- **SECURITYADMIN** — manages grants across the account (it can grant
  or revoke any privilege) and inherits USERADMIN.
- **USERADMIN** — dedicated to creating and managing users and roles.
  It's the role that actually runs `CREATE USER` and `CREATE ROLE` in
  a well-run account.
- **SYSADMIN** — creates and manages warehouses, databases, and other
  objects. In practice, this is the role that ends up as the parent
  of every custom role you create, so a system administrator can
  always see and manage what a custom role owns.
- **PUBLIC** — the floor. Every user and every role automatically has
  PUBLIC, whether you grant it or not.

## Building a custom role into the hierarchy

Real teams don't run everything as SYSADMIN — they create narrower
custom roles, like the `JUNIOR_DBA` role from Snowflake's own
Quickstart, and grant those to specific users:

```sql
-- Only ACCOUNTADMIN (or another role with CREATE ROLE) can do this
CREATE ROLE junior_dba;

-- Assign the role to a specific user
GRANT ROLE junior_dba TO USER analyst1;

-- Slot the new role into the hierarchy under SYSADMIN
GRANT ROLE junior_dba TO ROLE sysadmin;
```

That last `GRANT ROLE ... TO ROLE` line matters as much as the first
two: without it, `junior_dba` is an island. Granting it up to
`sysadmin` means anything `junior_dba` can access, a system
administrator can see and manage too — the hierarchy stays connected
instead of accumulating orphaned roles nobody remembers the purpose
of.

## Key terms

| Term | Meaning |
|---|---|
| ACCOUNTADMIN | Top-level role; encapsulates SECURITYADMIN and SYSADMIN; grant sparingly |
| SECURITYADMIN | Manages grants across the account; inherits USERADMIN |
| USERADMIN | Creates and manages users and roles |
| SYSADMIN | Creates warehouses, databases and other objects; typical parent for custom roles |
| PUBLIC | The base role automatically available to every user and role |
| Role hierarchy | The tree of `GRANT ROLE ... TO ROLE` relationships that determines which roles inherit which privileges |

## Lab

1. In Snowsight, click your user menu in the bottom-left corner and
   open **Switch Role** — note every role listed and which one is
   marked **Default**.
2. In a worksheet, run `SELECT CURRENT_ROLE();` and confirm it matches
   whichever role that worksheet is currently using.
3. Switch to a role with `CREATE ROLE` privileges (ACCOUNTADMIN on a
   trial account) and create a custom role:
   `CREATE ROLE lta_student;` then `GRANT ROLE lta_student TO USER
   <your_username>;`
4. Slot it into the hierarchy: `GRANT ROLE lta_student TO ROLE
   sysadmin;` Switch to `lta_student` and run `SELECT CURRENT_ROLE();`
   again to confirm the switch took effect.

## Check yourself

You're ready for Lesson 40 when you can name the five built-in
Snowflake roles from memory, and explain in one sentence why
ACCOUNTADMIN is normally reserved for a small number of people rather
than granted broadly.
