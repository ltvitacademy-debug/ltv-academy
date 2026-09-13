# Lesson 40 — GRANT, Privileges & Least Privilege in Snowflake

**Chapter 9 · Security & RBAC · Lesson 40 of 60**

## What you'll learn

- The GRANT syntax for object privileges, warehouse usage, and database/schema access
- Why Snowflake privileges are granted to roles, never directly to users
- What the principle of least privilege looks like in practice
- How to check what a role can actually do with SHOW GRANTS

## GRANT gives a role a privilege on an object

Every privilege in Snowflake follows the same shape: `GRANT
<privilege> ON <object> TO ROLE <role>`. You never grant a privilege
straight to a user — you grant it to a role, and separately grant that
role to whichever users need it. That indirection is what makes
Snowflake's security model manageable: revoke a role from a user and
every privilege that came with it disappears in one step, instead of
hunting down a dozen individual grants.

```sql
-- Let a role use a warehouse's compute
GRANT USAGE ON WAREHOUSE analytics_wh TO ROLE junior_dba;

-- Let a role see into a database and schema
GRANT USAGE ON DATABASE cybersyn TO ROLE junior_dba;
GRANT USAGE ON SCHEMA cybersyn.public TO ROLE junior_dba;

-- Let a role actually read rows from a table
GRANT SELECT ON TABLE cybersyn.public.company_metadata TO ROLE junior_dba;
```

Notice the layering: `USAGE` on the warehouse, database, and schema
just lets a role "see through" to what's inside — it doesn't grant
access to any data by itself. `SELECT` on the table is the privilege
that actually lets rows come back. Miss the `USAGE` grants and a role
with `SELECT` on a table still can't query it, because it can't reach
the table at all.

You can watch a GRANT take effect immediately in the UI:

![The Snowsight object browser panel after running GRANT USAGE ON DATABASE Public_Data and GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE_PUBLIC_DATA_FREE to the JUNIOR_DBA role — both databases now appear in the tree, where a moment earlier neither was visible to that role.](/courses/snowflake/ch09/40-grant-privileges-and-least-privilege/grant-usage-database-access.png)
*Before the GRANT statements ran, JUNIOR_DBA's object browser showed only SNOWFLAKE and SNOWFLAKE_SAMPLE_DATA. After, the newly granted databases appear.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

## Least privilege, in practice

"Least privilege" means a role gets exactly the access its job
requires — no more. In Snowflake this shows up as a handful of
concrete habits:

1. **Grant to roles, never to users directly.** Users inherit access
   through the roles they're assigned.
2. **Grant the narrowest object you can.** `SELECT` on one table beats
   `SELECT` on an entire schema if that's all the role needs.
3. **Use future grants for objects that don't exist yet** —
   `GRANT SELECT ON FUTURE TABLES IN SCHEMA ... TO ROLE ...` — so new
   tables in a schema automatically pick up the same access instead of
   silently being unreadable (or, worse, someone reflexively granting
   too much just to unblock a report).
4. **Audit with `SHOW GRANTS`.** `SHOW GRANTS TO ROLE junior_dba;`
   lists exactly what a role can do, right now — the fastest way to
   catch a role that's quietly accumulated more access than its job
   needs.

## Key terms

| Term | Meaning |
|---|---|
| GRANT | The statement that gives a role a privilege on an object |
| USAGE | The privilege that lets a role "see through" a warehouse, database, or schema |
| SELECT | The privilege that lets a role actually read rows from a table or view |
| Least privilege | Granting a role only the access its job requires, nothing more |
| Future grant | A grant that applies automatically to objects created later in a schema |
| SHOW GRANTS | The command that audits exactly what privileges a role currently holds |

## Lab

1. As `ACCOUNTADMIN`, create a warehouse-usage grant for the custom
   role you made in Lesson 39:
   `GRANT USAGE ON WAREHOUSE compute_wh TO ROLE lta_student;`
2. Grant it read access to a sample database:
   `GRANT USAGE ON DATABASE snowflake_sample_data TO ROLE
   lta_student;` and `GRANT USAGE ON SCHEMA
   snowflake_sample_data.tpch_sf1 TO ROLE lta_student;`
3. Grant `SELECT` on one table only:
   `GRANT SELECT ON TABLE snowflake_sample_data.tpch_sf1.customer TO
   ROLE lta_student;`
4. Switch to `lta_student` and confirm you can query that one table
   but not others in the same schema. Then run `SHOW GRANTS TO ROLE
   lta_student;` from `ACCOUNTADMIN` and read the full list back.

## Check yourself

You're ready for Lesson 41 when you can explain why a role needs
`USAGE` on a warehouse, database, *and* schema before a `SELECT` grant
on a table actually does anything, and you can write a `SHOW GRANTS`
statement from memory.
