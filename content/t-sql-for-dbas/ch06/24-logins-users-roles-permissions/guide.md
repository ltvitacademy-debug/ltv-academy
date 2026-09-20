# Logins, Users, Roles & Permissions

Security in SQL Server runs on a distinction that trips up almost everyone new to
administration: a **login** is not a **user**. A login gets you onto the instance. A user is
what that login maps to *inside a specific database*. Confusing the two — or not knowing how to
query either one — makes basic security questions like "who can actually touch this database"
much harder to answer than they need to be.

## What you'll learn

- The login vs. user distinction, and how they're linked
- Querying `sys.server_principals` and `sys.database_principals`
- Fixed server roles vs. fixed database roles

## Logins vs. users

A **login** is a server-level principal — it authenticates you to the SQL Server *instance*.
A **user** is a database-level principal — it's what a login is mapped to *inside a particular
database*, and it's the user (not the login directly) that gets granted permissions on objects
in that database.

```sql
-- Server-level: every login on the instance
SELECT name, type_desc, is_disabled
FROM sys.server_principals
WHERE type IN ('S', 'U', 'G')  -- SQL login, Windows login, Windows group
ORDER BY name;

-- Database-level: every user in the CURRENT database
SELECT name, type_desc, default_schema_name
FROM sys.database_principals
WHERE type IN ('S', 'U', 'G')
ORDER BY name;
```

`sys.server_principals` lives in `master` and lists every login on the instance.
`sys.database_principals` is database-scoped — run it inside `AdventureWorks2012` and you get
`AdventureWorks2012`'s users, run it inside `msdb` and you get `msdb`'s. The two are linked by
`sid`: a database user's `sid` should match the server login's `sid` it maps to.

## Mapping logins to users

```sql
SELECT
    dp.name AS database_user,
    sp.name AS server_login,
    dp.type_desc
FROM sys.database_principals dp
LEFT JOIN sys.server_principals sp ON dp.sid = sp.sid
WHERE dp.type IN ('S', 'U', 'G');
```

Every mapped user should show a matching `server_login`. A user with no matching login (a
`NULL` in `server_login`) is an **orphaned user** — covered in depth in Lesson 26 — usually the
result of restoring a database backup to a server where the matching login doesn't exist.

## Fixed roles: server and database

Rather than granting permissions one at a time, SQL Server ships with pre-built roles that
bundle common permission sets:

**Fixed server roles** (membership grants instance-wide power):

| Role | Grants |
|---|---|
| `sysadmin` | Full control of the entire instance |
| `securityadmin` | Manage logins and their permissions |
| `dbcreator` | Create, alter, drop, restore any database |
| `public` | Every login is a member; minimal baseline permissions |

**Fixed database roles** (membership grants power inside one database):

| Role | Grants |
|---|---|
| `db_owner` | Full control of the database |
| `db_datareader` | `SELECT` on every table/view in the database |
| `db_datawriter` | `INSERT`/`UPDATE`/`DELETE` on every table in the database |
| `db_denydatawriter` | Explicitly denies write access, regardless of other grants |

```sql
-- Who's a member of sysadmin?
SELECT m.name AS login_name
FROM sys.server_role_members rm
JOIN sys.server_principals r ON rm.role_principal_id = r.principal_id
JOIN sys.server_principals m ON rm.member_principal_id = m.principal_id
WHERE r.name = 'sysadmin';
```

## Key terms

| Term | Meaning |
|---|---|
| Login | A server-level principal that authenticates to the SQL Server instance |
| User | A database-level principal, mapped to a login, that permissions are actually granted to |
| `sys.server_principals` | Catalog view listing every login (and server role) on the instance |
| `sys.database_principals` | Catalog view listing every user (and database role) in the current database |
| Fixed role | A built-in SQL Server role bundling a standard set of permissions |

## Check yourself

Why does a permission grant on a table target a database *user*, not a server *login*, directly?
