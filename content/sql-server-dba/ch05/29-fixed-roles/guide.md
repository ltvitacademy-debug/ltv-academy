# Fixed Roles

## What you'll learn

- The fixed server roles every instance ships with, and what each grants
- The fixed database roles every database ships with, and what each grants
- Why reaching for a fixed role — especially `sysadmin` or `db_owner` — is often the wrong
  default

## Fixed roles exist so you don't hand-write common permission sets

A **role** is a principal that other principals (logins or users) become members of, inheriting
whatever permissions the role has. SQL Server ships with pre-built, fixed roles at both the
server and database scope covering the permission bundles almost every environment needs, so you
don't re-derive them from scratch.

## Fixed server roles

These apply instance-wide and a login becomes a member with `ALTER SERVER ROLE ... ADD MEMBER`:

```sql
ALTER SERVER ROLE dbcreator ADD MEMBER [DOMAIN\jsmith];
```

The ones a DBA actually uses:

- **`sysadmin`** — unrestricted access to everything on the instance. Full control, no exceptions.
  This is the role real production incidents happen because of when it's over-granted.
- **`securityadmin`** — manage logins: create/alter/drop logins, GRANT/DENY/REVOKE server-level
  permissions. Notably, a securityadmin *can* grant themselves more access indirectly, so it's not
  a safe "junior DBA" role either.
- **`dbcreator`** — create, alter, drop, and restore any database.
- **`processadmin`** — kill running processes (`KILL`) on the instance.
- **`diskadmin`** — manage disk files (mostly legacy, rarely used directly today).
- **`serveradmin`** — configure server-wide settings, and `SHUTDOWN` the instance.
- **`public`** — every login is a member automatically; grants a minimal permission baseline. You
  don't add members to `public` — it's implicit.

## Fixed database roles

These apply inside one database, and a user becomes a member with
`ALTER ROLE ... ADD MEMBER`:

```sql
USE InventoryDB;
ALTER ROLE db_datareader ADD MEMBER app_reader;
```

The ones that matter day to day:

- **`db_owner`** — full control over the database: schema changes, permissions, everything. The
  database-scoped equivalent of `sysadmin`.
- **`db_datareader`** — `SELECT` on every table and view in the database.
- **`db_datawriter`** — `INSERT`, `UPDATE`, `DELETE` on every table in the database.
- **`db_ddladmin`** — run DDL (`CREATE`/`ALTER`/`DROP`) on database objects, without data access.
- **`db_securityadmin`** — manage database role membership and permissions within the database.
- **`db_backupoperator`** — back up the database.
- **`db_denydatareader`** / **`db_denydatawriter`** — explicitly deny read or write, overriding
  grants from anywhere else — useful for a temporary lockdown.

## When to use them, and when not to

Fixed roles are the right call for genuinely broad, well-understood needs: an application that
truly needs unrestricted read/write on every table is a legitimate `db_datareader` +
`db_datawriter` pairing. The mistake is defaulting to `db_owner` or `sysadmin` because it's the
fast path to "it works now" — that's a permission footprint far beyond what most applications or
people actually need, and it's the single most common finding in a real-world security review.
The next lesson covers building **custom roles** scoped to exactly what a job requires, which is
the correct answer for anything more specific than "needs to read everything" or "needs to write
everything."

## Key terms

| Term | Meaning |
|---|---|
| Fixed server role | A built-in, instance-scoped role (`sysadmin`, `dbcreator`, etc.) with a fixed permission set |
| Fixed database role | A built-in, database-scoped role (`db_owner`, `db_datareader`, etc.) with a fixed permission set |
| `sysadmin` | The fixed server role granting unrestricted access to the entire instance |
| `db_owner` | The fixed database role granting full control over one database |

## Check yourself

An application only ever runs `SELECT` statements against three tables in a reporting database.
Someone added its login to `db_owner` "to be safe." What's wrong with that, and what fixed roles
(or approach) would actually match its real needs?
