# Custom Roles & Permissions

## What you'll learn

- How to create a database role scoped to exactly what a job requires
- The three permission verbs — `GRANT`, `DENY`, `REVOKE` — and how `DENY` wins ties
- Why custom roles are the principle of least privilege put into practice

## Creating a custom role

The previous lesson ended with the standard fix for an over-privileged application: stop using
`db_owner` and build a role that matches the actual need. `CREATE ROLE` does exactly that:

```sql
USE InventoryDB;
CREATE ROLE reporting_reader;

GRANT SELECT ON SCHEMA::dbo TO reporting_reader;

ALTER ROLE reporting_reader ADD MEMBER app_reader;
```

This role can `SELECT` from anything in the `dbo` schema — nothing more. No DDL, no writes, no
access outside that schema. Compare that to `db_owner`, which the earlier lesson's "safe"
application login had, and which could drop every table in the database.

## GRANT, DENY, REVOKE — and how ties resolve

Three permission statements do all the work:

- **`GRANT`** — gives a permission.
- **`DENY`** — explicitly blocks a permission, even if it was granted somewhere else (directly,
  or through another role).
- **`REVOKE`** — removes a previously granted or denied permission, returning to "no explicit
  statement either way."

```sql
GRANT SELECT ON dbo.Orders TO reporting_reader;
DENY  SELECT ON dbo.Payroll TO reporting_reader;
REVOKE INSERT ON dbo.Orders FROM reporting_reader;
```

The rule that matters in practice: **`DENY` always wins**, regardless of how many `GRANT`s exist
elsewhere. If a user is a member of five roles and even one of them has a `DENY` on a given
object, that user cannot access it — no combination of other grants overrides it. This makes
`DENY` the right tool for a targeted lockdown ("nobody, through any role, touches the `Payroll`
table") without having to audit every other role's grants.

## Adding and removing members

```sql
ALTER ROLE reporting_reader ADD MEMBER app_reader;
ALTER ROLE reporting_reader DROP MEMBER app_reader;
```

A user can belong to multiple roles at once, and their effective permission on any object is the
union of every role's grants — except wherever a `DENY` applies, which subtracts back out
regardless of source.

## Least privilege in practice

The whole point of building `reporting_reader` instead of using `db_datareader` (or worse,
`db_owner`) is scope: `db_datareader` reads *every* table, including ones this application has
no business seeing. A custom role that grants exactly the schemas, tables, or even columns
(`GRANT SELECT ON dbo.Orders (OrderID, CustomerID) TO ...` works too) a job needs is the
practical expression of least privilege — and it's also easier to audit later, because the
role's name and its grants describe exactly what it's for.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE ROLE` | Defines a new, custom database-scoped role with no permissions until granted |
| `GRANT` | Gives a permission on an object, schema, or database to a principal or role |
| `DENY` | Explicitly blocks a permission; overrides any `GRANT` from any other source |
| Least privilege | Granting exactly the access a job requires — no more |

## Check yourself

Two roles, `reporting_reader` and `finance_team`, both have a user as a member. `reporting_reader`
grants `SELECT` on the whole `dbo` schema; `finance_team` has an explicit `DENY SELECT` on
`dbo.Payroll`. Can that user read `dbo.Payroll`? Why?
