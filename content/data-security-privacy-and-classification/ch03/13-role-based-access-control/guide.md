# Lesson 13 — Role-Based Access Control

**Chapter 3 · Access Control · Lesson 13 of 30**

## What you'll learn

- The core idea of role-based access control (RBAC): permissions attach to roles, roles attach to people
- Real T-SQL for creating a database role, granting it permissions, and adding members
- The difference between `GRANT`, `DENY`, and `REVOKE`
- Why RBAC scales better than granting permissions to individual users one at a time

## The core idea

Without RBAC, every new hire means someone manually figuring out "what does this person need" and running a pile of one-off grants against their personal login. Multiply that by hundreds of employees and dozens of systems, and nobody can answer "who can see customer SSNs" without querying every table's permission list directly.

**Role-based access control** breaks that into two separate, much simpler questions: What permissions does the *Sales Analyst* role need? And which *people* are Sales Analysts? Permissions attach to the role once. People attach to the role as they join, move, or leave (Lesson 12's JML lifecycle). Change the role's permissions once, and every member inherits the change immediately — no need to re-touch a hundred individual logins.

## Creating a role and granting it permissions

SQL Server implements this directly with database roles. You create a role, then grant permissions to the role — never to an individual user:

```sql
-- Create a role scoped to one database
CREATE ROLE SalesAnalystRole;

-- Grant the role exactly what a sales analyst needs
GRANT SELECT ON dbo.Orders TO SalesAnalystRole;
GRANT SELECT ON dbo.Customers TO SalesAnalystRole;
GRANT SELECT, INSERT, UPDATE ON dbo.SalesNotes TO SalesAnalystRole;
```

Three `GRANT` statements, aimed at the role, define the role's entire entitlement. Every person later added to `SalesAnalystRole` inherits all three immediately.

## Adding and removing members

`ALTER ROLE ... ADD MEMBER` is the modern way to put a user into a role (the older `sp_addrolemember` stored procedure still works but is documented as legacy):

```sql
-- Add a user to the role (Joiner / Mover event)
ALTER ROLE SalesAnalystRole ADD MEMBER [DOMAIN\jsmith];

-- Remove a user from the role (Mover / Leaver event)
ALTER ROLE SalesAnalystRole DROP MEMBER [DOMAIN\jsmith];
```

This is exactly where the Joiner-Mover-Leaver lifecycle from Lesson 12 becomes a one-line operation instead of a research project: a Joiner gets added to the right role, a Mover gets dropped from the old role and added to the new one, and a Leaver gets dropped from every role they were in.

## GRANT, DENY, and REVOKE

These three permission statements look similar but behave differently, and the difference matters:

- **`GRANT`** — gives a permission
- **`REVOKE`** — removes a previously granted permission, returning to a neutral "no explicit permission" state
- **`DENY`** — explicitly blocks a permission, and **a `DENY` always wins**, even if the same user also belongs to a different role that `GRANT`s the same permission

```sql
-- Even though SalesAnalystRole grants SELECT on dbo.Customers,
-- explicitly block the SSN column for that role:
DENY SELECT ON dbo.Customers(SSN) TO SalesAnalystRole;
```

That last example is also a preview of column-level security (Lesson 22) — permissions in SQL Server can scope down to individual columns, not just whole tables.

## Why RBAC scales

The payoff isn't just fewer keystrokes. With RBAC, an auditor can answer "who can see customer SSNs" by reading the permissions on a handful of roles instead of auditing every individual login. An access review (Lesson 16) becomes "review this role's permission list once, then review its membership list" instead of re-deriving every person's effective access from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Role-based access control (RBAC) | Granting permissions to roles, then assigning people to roles, instead of granting permissions to individuals directly |
| Database role | A named SQL Server object that permissions are granted to, and that users can be added to as members |
| DENY | An explicit block on a permission that overrides any GRANT the same user receives through another role |

## Lab

On a test database (never production), run `CREATE ROLE`, grant it `SELECT` on one table, add yourself as a member with `ALTER ROLE ... ADD MEMBER`, then query `sys.database_permissions` to see the grant you created. Finally, run a `DENY` on one column of that table and note how it changes what you can query, even though the role still grants `SELECT` on the table overall.

## Check yourself

- Why does RBAC make an access review faster than reviewing every individual user's permissions one by one?
- Between `GRANT`, `DENY`, and `REVOKE`, which one wins if a user's role grants `SELECT` but a separate `DENY` targets the same column?
