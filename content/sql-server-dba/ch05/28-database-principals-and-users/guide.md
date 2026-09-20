# Database Principals & Users

## What you'll learn

- How a server login becomes something that can actually touch a database
- Contained database users — the case where there's no server login at all
- Where SQL Server stores database-level principal metadata

## From login to user: the missing link from last lesson

The previous lesson ended on a gap: a login authenticates to the instance but grants no
database access. The object that closes that gap is a **database user** — a database-level
principal, mapped to a server login, that SQL Server checks permissions against inside a
specific database.

```sql
USE InventoryDB;
CREATE USER app_svc FOR LOGIN app_svc;
```

This creates a user named `app_svc` inside `InventoryDB`, mapped to the server login of the
same name. The user name doesn't have to match the login name — `CREATE USER app_reader FOR
LOGIN app_svc;` is legal and sometimes useful when the same login needs different-looking
identities in different databases. Once the user exists, it has no permissions yet; that's
`GRANT`/role membership, covered in the next two lessons.

Dropping the mapping is `DROP USER app_svc;` — this removes the database user only, and leaves
the server login untouched. If you drop the *login* first without dropping the user, you get an
**orphaned user**: a database user whose SID no longer matches any server login. Orphaned users
are a common real-world mess after a database restore onto a different instance, and
`sp_change_users_login` (or, in modern versions, `ALTER USER ... WITH LOGIN = ...`) is the
standard way to re-link them.

## Contained database users: skipping the server login entirely

SQL Server also supports **contained database users**, which don't require a server login at
all — the authentication credential lives *inside the database itself*. This only works when
the database's containment level is set to `PARTIAL` (the only supported level today):

```sql
ALTER DATABASE InventoryDB SET CONTAINMENT = PARTIAL;

USE InventoryDB;
CREATE USER app_reader WITH PASSWORD = 'AnotherStr0ng!Pass';
```

A contained user is enormously useful for portability: because the credential travels with the
database, restoring or attaching that database on a completely different instance doesn't
orphan anything — there's no server-level login to lose the link to. This is exactly the model
Azure SQL Database uses by default. The tradeoff is that contained users bypass some
server-level auditing and centralized login management, so most on-prem shops use them
selectively (portable app databases, migration scenarios) rather than as a blanket default.

## Where database users live: sys.database_principals

```sql
USE InventoryDB;
SELECT name, type_desc, authentication_type_desc, create_date
FROM sys.database_principals
WHERE type IN ('S', 'U', 'G')
ORDER BY name;
```

`authentication_type_desc` is the column that tells contained users apart from login-mapped
ones: it reads `INSTANCE` for a user backed by a server login, and `DATABASE` for a contained
user authenticating with its own in-database password.

## Key terms

| Term | Meaning |
|---|---|
| Database user | A database-level principal, usually mapped to a server login, that permissions are actually granted to |
| Orphaned user | A database user whose SID no longer matches any server login (common after a cross-instance restore) |
| Contained database user | A user with credentials stored inside the database itself — no server login required |
| `sys.database_principals` | Catalog view listing every user, role, and principal inside a specific database |

## Check yourself

You restore a production database onto a new instance for testing. Several application logins
report they can connect to the instance but can't access the restored database, even though the
same-named users exist inside it. What's almost certainly wrong, and what fixes it?
