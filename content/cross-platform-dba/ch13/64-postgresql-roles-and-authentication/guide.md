# PostgreSQL Roles & Authentication

Chapter 13 moves from PostgreSQL's architecture into security, and the first concept to
unlearn is the SQL Server (and Oracle) habit of thinking in separate "users" and "roles."
PostgreSQL doesn't have that distinction — it has exactly one concept, the **role**, and
whether a role behaves like a login account or like a permission group is just a matter of
which attributes you give it.

## What you'll learn

- PostgreSQL's unified role model, and why there's no separate "user" object
- Real `CREATE ROLE` syntax and the attributes that shape what a role can do
- How pg_hba.conf's authentication methods (trust, md5/scram-sha-256, peer) tie into roles

## One concept: the role

In SQL Server, logins exist at the server level and users exist at the database level, and
you map one to the other. In PostgreSQL, there is just the **role**. A role can:

- Be granted the `LOGIN` attribute, letting it authenticate and open a connection — at that
  point it's functionally what you'd call a "user" in SQL Server or Oracle terms
- Be created without `LOGIN`, in which case it exists purely as a permission-grouping object
  — functionally what you'd call a "role" or "group" elsewhere
- Be a member of other roles, inheriting their privileges (unless `NOINHERIT` is set)

`CREATE USER` still exists in PostgreSQL, but it's literally shorthand for `CREATE ROLE ...
WITH LOGIN` — under the hood, both create the exact same kind of object. There is no separate
"user" system table; `pg_roles` is the one catalog for all of it.

## Real CREATE ROLE syntax

```sql
-- a login role (functionally a "user")
CREATE ROLE app_user WITH LOGIN PASSWORD 'a_real_secret' VALID UNTIL '2027-01-01';

-- a group role, no login, used purely for permission grouping
CREATE ROLE reporting_team;

-- a role with elevated attributes
CREATE ROLE ops_admin WITH LOGIN PASSWORD 'another_secret'
  CREATEDB CREATEROLE;

-- make app_user a member of reporting_team, inheriting its grants
GRANT reporting_team TO app_user;
```

Common role attributes include `LOGIN`/`NOLOGIN`, `SUPERUSER`/`NOSUPERUSER`, `CREATEDB`,
`CREATEROLE`, `REPLICATION` (needed for a role used by a streaming-replication connection),
and `PASSWORD`/`VALID UNTIL` for password-based roles. Every one of these is a flag on the
same underlying role object — there's no separate syntax tree for "user attributes" versus
"role attributes" the way SQL Server splits server-level and database-level permission
grammar.

## Authentication methods, driven by pg_hba.conf

A role having a password set doesn't automatically mean password authentication is what gets
used — that's determined by which `pg_hba.conf` rule matches the connection (from the earlier
lesson on that file). The common methods:

- **trust** — no authentication at all; the role is trusted purely because it connected from
  a matching source. Appropriate only for tightly controlled local development, never
  production.
- **peer** — for local Unix-domain socket connections, PostgreSQL checks the connecting OS
  user's username against the role name (or a mapping) instead of asking for a password at
  all.
- **md5** / **scram-sha-256** — real password authentication, with `scram-sha-256` being the
  modern, stronger method (md5 is legacy and being phased toward scram-sha-256 as the
  default in current PostgreSQL versions).

This split — role attributes defining *what* a role can do, and pg_hba.conf rules defining
*how* it proves who it is — is a clean separation SQL Server doesn't really have in the same
shape, since SQL Server bundles authentication mode into a single server-wide setting rather
than per-connection-source rules.

## Key terms

| Term | Meaning |
|---|---|
| Role | PostgreSQL's single unified concept for both users and permission groups |
| LOGIN | Role attribute allowing that role to authenticate and open a connection |
| CREATE USER | Shorthand for CREATE ROLE ... WITH LOGIN — creates the same object type |
| scram-sha-256 | The modern password-based authentication method set in pg_hba.conf |
| peer | Authentication method trusting the OS username for local socket connections |

## Check yourself

A SQL Server DBA new to PostgreSQL asks "where's the user table, separate from the roles
table?" What's the accurate answer, and what real command is `CREATE USER` shorthand for?
