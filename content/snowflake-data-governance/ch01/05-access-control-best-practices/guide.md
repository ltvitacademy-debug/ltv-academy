# Lesson 5 — Access Control Best Practices

**Chapter 1 · Snowflake Governance Foundations · Lesson 5 of 25**

## What you'll learn

- A checklist of well-established Snowflake access-control best practices, building directly on Lessons 3 and 4
- Why future grants matter for schemas that grow over time
- How to audit existing grants instead of assuming they still make sense
- Why this lesson has no screenshots — and why that's deliberate, not a gap

## This lesson is principles, not a new screen

Lessons 3 and 4 covered every UI screen relevant to access control: the role hierarchy graph, the Switch Role panel, and the object browser before and after a grant. This lesson doesn't introduce a new screen — it's the set of principles experienced Snowflake practitioners apply *using* those same screens and SQL statements you already know. There's genuinely no new UI to show, so this lesson relies on `code` and `steps` slides only, which is exactly the documented exception in this course's screenshot policy for lessons that are conceptual rather than visual.

## The least-privilege checklist

1. **Grant privileges to roles, roles to users — never privileges directly to a person.** This is the RBAC model Lesson 4 demonstrated end to end. If you ever find yourself about to `GRANT SELECT ... TO USER`, stop — create or reuse a role instead.
2. **Follow least privilege.** Grant only what a role needs right now. It's far safer to add a privilege later when someone requests it than to over-grant up front "just in case" and then have to remember to claw it back.
3. **Keep ACCOUNTADMIN membership to a tiny handful of people.** Do day-to-day administration as SECURITYADMIN, USERADMIN, or SYSADMIN instead — each of those roles can do its job without carrying the account-wide blast radius ACCOUNTADMIN has.
4. **Preserve separation of duties.** Lesson 4 showed USERADMIN creating a role and SECURITYADMIN granting it privileges, as two distinct steps under two distinct roles. Don't collapse this into ACCOUNTADMIN out of convenience — the separation exists specifically so no single role can both invent an identity and arm it with access in one motion.
5. **Name roles and warehouses consistently**, e.g. `<team>_<function>_role` (`analyst_role`, `finance_reader`, `etl_service_role`). A consistent convention keeps `SHOW ROLES` legible once an account has fifty roles instead of five.
6. **Audit grants periodically.** Don't assume a grant made months ago still makes sense — people change teams, projects wind down, and access that was reasonable at the time quietly becomes a liability.

## Future grants: don't let new objects slip through

A schema that grows over time — new tables added weekly, say — creates a maintenance problem: does every new table get a fresh, manual `GRANT SELECT`? In practice, that step gets forgotten. Future grants solve it:

```sql
GRANT SELECT ON FUTURE TABLES IN SCHEMA governance_demo.sales TO ROLE analyst_role;
GRANT SELECT ON FUTURE VIEWS IN SCHEMA governance_demo.sales TO ROLE analyst_role;
```

These statements don't touch any table that exists today — they apply automatically to any table or view created in `governance_demo.sales` **from this point forward**. `analyst_role` never has to wait on a manual grant again for objects in that schema, and nobody has to remember to run one.

## Auditing what's actually been granted

Don't take an account's privilege structure on faith — check it, in both directions:

```sql
SHOW GRANTS TO ROLE analyst_role;
SHOW GRANTS ON TABLE governance_demo.sales.orders;
```

`SHOW GRANTS TO ROLE` answers "what can this role actually do?" — useful when you inherit a role you didn't build and need to understand its blast radius. `SHOW GRANTS ON <object>` answers the opposite question: "who currently has access to this specific table?" — useful before you change or drop something sensitive. Neither of these is a one-time setup step; run them periodically as part of a routine access review, not just when something breaks.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting only the access a role needs right now, adding more deliberately rather than over-granting up front |
| Future grants | A GRANT ... ON FUTURE statement that applies automatically to objects created later in a schema or database |
| Functional role | A custom role built for a specific job (e.g. analyst_role), as distinct from a system-defined role |
| Separation of duties | Splitting role creation (USERADMIN) and privilege granting (SECURITYADMIN) across different roles so no single role does both |
| SHOW GRANTS | The SQL statement family used to audit what a role can do, or who has access to an object |

## Lab

1. Pick a schema you have access to and run `GRANT SELECT ON FUTURE TABLES IN SCHEMA <your schema> TO ROLE <a role you control>;` — note that it succeeds even if the schema is currently empty.
2. Run `SHOW GRANTS TO ROLE <that role>;` and read through everything it reports. Does anything surprise you?
3. Pick one table and run `SHOW GRANTS ON TABLE <that table>;`. Is every role on that list one you'd expect to see?

## Check yourself

- Why does this lesson recommend granting only what's needed now, rather than granting generously up front "to save a future request"?
- What specific problem do future grants solve that a one-time manual grant doesn't?
- What's the difference between what `SHOW GRANTS TO ROLE` and `SHOW GRANTS ON TABLE` each tell you, and when would you reach for each one?
