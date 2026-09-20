# GRANT, DENY & REVOKE, in Practice

Three statements control every permission in SQL Server: `GRANT` gives a permission, `DENY`
explicitly blocks it, and `REVOKE` removes a previously granted (or denied) permission without
taking a position either way. Knowing the syntax is the easy part. The part that actually
matters for a DBA is the rule that governs how they interact when they conflict — because that
rule is what makes `DENY` the strongest tool in the whole permission system.

## What you'll learn

- `GRANT`, `DENY`, and `REVOKE` syntax at the object, schema, and database level
- Why `DENY` always overrides `GRANT`, no matter how it was granted
- The permission hierarchy: server, database, schema, object

## The three statements

```sql
-- Give a permission
GRANT SELECT ON dbo.Employee TO ReportingUser;

-- Explicitly block a permission
DENY DELETE ON dbo.Employee TO ReportingUser;

-- Remove a previous GRANT or DENY — back to "unspecified"
REVOKE SELECT ON dbo.Employee FROM ReportingUser;
```

`REVOKE` is not the opposite of `GRANT` the way most people assume — it doesn't deny access, it
simply erases whatever permission statement was there before. After a `REVOKE`, that user's
access to the object falls back to whatever their roles or broader-scoped grants provide.

## DENY always wins

This is the single most important rule in SQL Server's permission model: if a principal has
*both* a `GRANT` and a `DENY` on the same permission — from any source, including different
roles — `DENY` wins, every time.

```sql
GRANT SELECT ON dbo.Employee TO db_datareader;   -- role-level grant
DENY SELECT ON dbo.Employee TO ReportingUser;    -- explicit user-level deny

-- ReportingUser is a member of db_datareader, which has SELECT.
-- ReportingUser STILL cannot SELECT from dbo.Employee — DENY overrides.
```

This is exactly why `DENY` is the tool for "lock this one person out of this one table, no
matter what role membership they pick up later." A `db_owner` membership does not get around an
explicit `DENY` targeting that specific principal and object.

## The permission hierarchy

Permissions can be granted at four levels, and a broader-scoped grant flows down unless
something more specific overrides it:

```
Server  →  Database  →  Schema  →  Object
```

```sql
-- Grant at the schema level — applies to every object in dbo, present and future
GRANT SELECT ON SCHEMA::dbo TO ReportingUser;

-- Grant at the database level — applies to every schema/object in the database
GRANT VIEW DATABASE STATE TO ReportingUser;
```

Granting `SELECT` on a schema is usually more maintainable than granting it object-by-object,
since new tables added to that schema automatically inherit the grant — but it's also broader
than most least-privilege policies want, so it's a deliberate trade-off, not a shortcut to reach
for by default.

## Key terms

| Term | Meaning |
|---|---|
| `GRANT` | Explicitly allows a principal a permission |
| `DENY` | Explicitly blocks a permission, overriding any `GRANT` from any source |
| `REVOKE` | Removes a previous `GRANT` or `DENY`, returning to an unspecified state |
| Permission hierarchy | The server → database → schema → object scope chain permissions can be applied at |

## Check yourself

A user is a member of a role that has `GRANT SELECT` on a table, but the user also has an
explicit `DENY SELECT` on that same table. Can the user run a `SELECT`? Why?
