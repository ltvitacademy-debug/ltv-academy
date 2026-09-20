# Roles, Privileges & Grants in Oracle

SQL Server splits permissions into server-level and database-level scopes. Oracle draws its
line differently: **system privileges** (things you can do across the database, like creating
tables anywhere) versus **object privileges** (things you can do to one specific object, like
`SELECT` on one table). Both are granted with the same `GRANT` statement, but the distinction
changes how you reason about access.

## What you'll learn

- Real `GRANT`/`REVOKE` syntax for both privilege types
- The difference between a system privilege and an object privilege
- Oracle's predefined roles — CONNECT, RESOURCE, DBA — and what each actually contains

## System privileges control what you can do database-wide

A system privilege is an action, not tied to any one object:

```sql
GRANT CREATE SESSION TO app_owner;
GRANT CREATE TABLE TO app_owner;
GRANT CREATE ANY TABLE TO dba_jsmith;   -- "ANY" = in any schema, not just your own
GRANT UNLIMITED TABLESPACE TO app_owner;
```

`CREATE SESSION` is the single most important system privilege — without it, an otherwise
fully-provisioned account can't even log in. Privileges with `ANY` in the name (`SELECT ANY
TABLE`, `DROP ANY TABLE`) are schema-crossing and should be handed out carefully; they're the
closest thing Oracle has to SQL Server's `db_owner`-across-every-database problem.

## Object privileges control what you can do to one specific thing

```sql
GRANT SELECT, INSERT, UPDATE ON hr.employees TO app_owner;
GRANT EXECUTE ON hr.calculate_bonus TO app_owner;
GRANT SELECT ON hr.employees TO app_owner WITH GRANT OPTION;
```

`WITH GRANT OPTION` lets the grantee turn around and grant that same privilege to someone
else — the object-privilege equivalent of `WITH GRANT OPTION` in SQL Server's `GRANT`
syntax, and just as worth auditing for sprawl. `REVOKE` mirrors the syntax exactly:

```sql
REVOKE INSERT, UPDATE ON hr.employees FROM app_owner;
```

## Roles bundle privileges so you don't grant them one at a time

A role is a named collection of privileges, granted to a user the same way a privilege is:

```sql
CREATE ROLE reporting_reader;
GRANT SELECT ON hr.employees TO reporting_reader;
GRANT SELECT ON hr.departments TO reporting_reader;
GRANT reporting_reader TO analyst_jdoe;
```

This is Oracle's direct equivalent of a SQL Server database role — define access once,
assign the role to as many users as need it, and change the role's privileges in one place
instead of chasing every user's individual grants.

## Three predefined roles ship with every database

- **CONNECT** — historically bundled several privileges, but since Oracle 10g it's been
  reduced to essentially just `CREATE SESSION`. Don't assume it grants more than that on a
  modern database; check what it actually contains before relying on it.
- **RESOURCE** — grants object-creation privileges like `CREATE TABLE`, `CREATE PROCEDURE`,
  `CREATE TRIGGER`, `CREATE SEQUENCE` (all scoped to the grantee's own schema) — the
  "give this schema owner what it needs to build objects" role. It also quietly carries
  the `UNLIMITED TABLESPACE` system privilege as a side effect in most releases — worth
  knowing before you hand RESOURCE out casually.
- **DBA** — the broadest predefined role, carrying nearly every system privilege in the
  database. It is not the same as being SYS, but it's close enough that granting DBA to a
  named per-person account (rather than sharing SYSTEM) is exactly how real teams provision
  DBA-level people day to day.

Predefined roles are a starting point, not a substitute for custom roles scoped to what a
job actually needs — the same least-privilege discipline that applies to SQL Server roles
applies here.

## Key terms

| Term | Meaning |
|---|---|
| System privilege | A database-wide action, e.g. `CREATE TABLE`, `CREATE SESSION` |
| Object privilege | A privilege on one specific object, e.g. `SELECT` on one table |
| `WITH GRANT OPTION` | Lets the grantee re-grant the privilege to others |
| `CONNECT` role | Predefined role, effectively just `CREATE SESSION` since 10g |
| `RESOURCE` role | Predefined role granting object-creation privileges in your own schema |
| `DBA` role | Predefined role carrying nearly every system privilege |

## Check yourself

Explain the difference between `GRANT SELECT ANY TABLE TO analyst_jdoe;` and `GRANT SELECT ON
hr.employees TO analyst_jdoe;` — what does each actually allow, and which is the least-privilege
choice for someone who only needs to query one table?
