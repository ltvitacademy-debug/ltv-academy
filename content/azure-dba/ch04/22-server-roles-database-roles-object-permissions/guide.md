# Lesson 22 — Server Roles, Database Roles & Object Permissions

**Chapter 4 · Authentication & Authorization · Lesson 4 of 7**

## What you'll learn

- Built-in roles (`db_owner`, `db_datareader`, `db_datawriter`) vs. object-level permissions
- When a built-in role is genuinely the right tool
- When granting specific object-level permissions is the right tool instead
- Why this decision is the difference between fast setup and least privilege (Lesson 24)

## Two ways to grant the same underlying access

Lesson 21 introduced the fixed database roles. This lesson is about
the actual decision: use a built-in role, or grant permissions on
specific objects directly.

```sql
-- Option A: a built-in role -- broad, fast, database-wide
ALTER ROLE db_datareader ADD MEMBER reporting_app;

-- Option B: object-level permissions -- narrow, deliberate, per-object
GRANT SELECT ON Sales.Orders TO reporting_app;
GRANT SELECT ON Sales.OrderLines TO reporting_app;
```

Both let `reporting_app` read data. They are **not** the same grant:
Option A reads *every* table in the database, forever, including
tables created next year. Option B reads exactly two named tables,
and nothing else, ever, unless someone explicitly grants more.

## When a built-in role is genuinely right

- The account **really does need broad access** to the whole
  database — a migration tool, a true database owner, a backup
  service account.
- The database is **small and stable enough** that "every table" and
  "the tables this account should touch" are effectively the same
  set, and likely to stay that way.
- Speed of setup matters more than precision, for a **low-risk,
  short-lived** need (a one-off audit script run once, for example).

## When object-level permissions are the right tool instead

- The account should only ever touch a **known, fixed subset** of
  tables — a reporting app that only ever needs three tables should
  never automatically gain read access to a fourth, sensitive one
  added next quarter.
- You're building toward **least privilege** (Lesson 24) — starting
  from nothing and adding exactly what's needed is the opposite
  instinct from starting from `db_datareader` and hoping nothing
  sensitive gets added to the database later.
- The requirement is **narrower than any built-in role expresses** —
  read three tables, write to one, execute one stored procedure —
  no built-in role matches that shape.

```sql
-- Granular: read three tables, write to one, execute one procedure
GRANT SELECT ON Sales.Orders TO order_service;
GRANT SELECT ON Sales.Customers TO order_service;
GRANT SELECT ON Sales.Products TO order_service;
GRANT INSERT ON Sales.OrderLog TO order_service;
GRANT EXECUTE ON Sales.usp_PlaceOrder TO order_service;
```

## Object-level permission types you'll actually use

| Permission | Applies to | Grants |
|---|---|---|
| `SELECT` | Table, view, column | Read rows |
| `INSERT` / `UPDATE` / `DELETE` | Table, view | Write rows |
| `EXECUTE` | Stored procedure, function | Run the object |
| `ALTER` | Table, procedure, schema | Change the object's definition |

## The decision isn't permanent — check what's actually used

A role assignment or a set of grants isn't a one-time decision to
live with forever. Lesson 25's troubleshooting techniques and
`sys.database_permissions` let you audit what an account actually
uses versus what it was granted, and tighten it later — the decision
made today should be revisited as the database (and the account's real
needs) change.

## Key terms

| Term | Meaning |
|---|---|
| Built-in (fixed) role | A pre-defined bundle of permissions covering an entire database |
| Object-level permission | A permission granted on one specific table, view, procedure, or column |
| `sys.database_permissions` | The system view for auditing what's actually been granted |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: what
is the practical difference between adding an account to
`db_datareader` and granting it `SELECT` on three named tables, and
when would you deliberately choose the narrower option?
