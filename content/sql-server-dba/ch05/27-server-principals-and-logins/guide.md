# Server Principals & Logins

## What you'll learn

- What a "principal" means in SQL Server's security model
- The two kinds of logins you can create, and the exact syntax for each
- Where SQL Server stores login metadata, and how to inspect it

## Principals: who can ask SQL Server to do something

A **principal** is any entity that can be authenticated and granted permissions — a person,
a group, or a process. SQL Server's security model has principals at three scopes: Windows
(the domain or local machine), server (the instance), and database. This lesson is about the
server scope. A **login** is a server-level principal: it's what gets you *in the door* of the
instance. It does not, by itself, grant access to any database — that's a separate step covered
in the next lesson.

## Creating logins

There are two kinds of server logins, matching the two authentication modes from the previous
lesson.

A Windows-authenticated login maps an existing Windows or Active Directory identity to a SQL
Server login:

```sql
CREATE LOGIN [DOMAIN\jsmith] FROM WINDOWS;
CREATE LOGIN [DOMAIN\DBAs]   FROM WINDOWS;  -- an AD group works too
```

A SQL Server login is one where SQL Server itself owns the credential:

```sql
CREATE LOGIN app_svc
    WITH PASSWORD = 'Str0ng!ButRandom#Pass',
         CHECK_POLICY = ON,
         CHECK_EXPIRATION = ON,
         DEFAULT_DATABASE = InventoryDB;
```

`CHECK_POLICY` enforces the Windows password-complexity policy against the login; leaving it
`ON` is the standard recommendation. `CHECK_EXPIRATION` ties the login to Windows password-age
rules — often turned `OFF` for service accounts that can't interactively change a password, but
left `ON` for human logins.

Useful follow-up statements: `ALTER LOGIN app_svc DISABLE;` to lock a login out without dropping
it, `ALTER LOGIN app_svc WITH PASSWORD = '...';` to rotate a credential, and `DROP LOGIN app_svc;`
to remove it entirely (only once it owns no server-level objects and no orphaned database users
point back to it).

## Where logins live: sys.server_principals

Every server principal — logins, fixed server roles, and the built-in ones — is a row in the
system catalog view `sys.server_principals`:

```sql
SELECT name, type_desc, is_disabled, create_date, default_database_name
FROM sys.server_principals
WHERE type IN ('S', 'U', 'G')   -- SQL login, Windows user, Windows group
ORDER BY name;
```

`type_desc` tells you what you're looking at: `SQL_LOGIN` for a SQL Server login,
`WINDOWS_LOGIN` for an individual Windows account, `WINDOWS_GROUP` for a mapped AD group, and
`SERVER_ROLE` for the fixed and any user-defined server roles. `sys.sql_logins` is a narrower
view (SQL logins only) that also exposes `is_policy_checked` and `is_expiration_checked` if you
need to audit password-policy settings across every SQL login on an instance.

## Server-level vs. database-level: the distinction that trips people up

A login only gets you authenticated to the instance. It does **not** let you touch a single
table. To do anything inside a database, that login needs a corresponding **database user**
mapped to it — a completely separate object, covered in the next lesson. A DBA who forgets this
distinction ends up confused when a newly created login can connect but every query fails with a
permission error: the login exists, but no user maps it into the target database.

## Key terms

| Term | Meaning |
|---|---|
| Principal | Any entity (person, group, process) that can be authenticated and granted permissions |
| Login | A server-level principal; authenticates to the instance but grants no database access by itself |
| `sys.server_principals` | Catalog view listing every login and server role on the instance |
| `CHECK_POLICY` | Login option enforcing Windows password-complexity rules against a SQL login |

## Check yourself

A new SQL login `app_svc` was just created with `CREATE LOGIN`, and the application team says it
still can't query the `InventoryDB` database — they get a permission error, not a login-failure
error. What's missing, and why does the error type point you there?
