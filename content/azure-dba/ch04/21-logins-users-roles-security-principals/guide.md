# Lesson 21 — Logins, Users, Roles & Security Principals

**Chapter 4 · Authentication & Authorization · Lesson 3 of 7**

## What you'll learn

- The real hierarchy: server-level logins vs. database-level users
- How one login maps to a user in a specific database
- Fixed server roles vs. fixed database roles — different scope, different job
- Why this hierarchy exists instead of one flat permission list

## Two levels, not one

Every permission question in SQL Server/Azure SQL comes back to one
structural fact: **logins live at the server level, users live at the
database level**, and they are two different objects that happen to
be connected.

```sql
-- SERVER level: can this credential connect to the server AT ALL?
CREATE LOGIN app_user WITH PASSWORD = 'StrongP@ssw0rd123!';

-- DATABASE level: what does app_user become INSIDE this one database?
USE Sales;
CREATE USER app_user FOR LOGIN app_user;
```

A login answers "can this identity connect to the server." A user
answers "what is this identity allowed to do inside *this specific
database*." The same login can map to a user with a different name
in a different database, or to no user at all in a database it was
never given access to — connecting successfully says nothing about
what you can touch once you're in.

## The mapping, visually

```
Server (the instance / logical server)
  |
  |-- LOGIN: app_user          <- can connect to the server
  |
  +-- Database: Sales
  |     |-- USER: app_user     <- maps to the login above, permissions live here
  |
  +-- Database: Reporting
        |-- USER: app_user_ro  <- same login, DIFFERENT user name, different rights
```

## Fixed server roles — instance-wide power

Fixed server roles apply across the **entire server**, not one
database:

| Role | What it grants |
|---|---|
| `sysadmin` | Full control of the server — every database, every setting |
| `securityadmin` | Manage logins and their server-level permissions |
| `dbcreator` | Create, alter, drop, and restore any database |
| `public` | Every login is automatically a member — minimal baseline rights |

```sql
ALTER SERVER ROLE securityadmin ADD MEMBER app_admin_login;
```

## Fixed database roles — one-database power

Fixed database roles apply **only inside the database they're
assigned in**:

| Role | What it grants |
|---|---|
| `db_owner` | Full control of this one database |
| `db_datareader` | Read every table in this database |
| `db_datawriter` | Insert/update/delete in every table in this database |
| `public` | Every database user is automatically a member — minimal baseline rights |

```sql
ALTER ROLE db_datareader ADD MEMBER app_user;
```

Lesson 22 goes deeper on when a built-in role like `db_datareader` is
the right tool versus granting specific object-level permissions
instead.

## Why the hierarchy exists at all

A flat list of "who can do what" doesn't scale past a handful of
databases. Separating server-level connection rights from
database-level permissions means one login can have completely
different access in ten different databases on the same server —
exactly what you want when one server hosts a production database, a
reporting database, and a staging database side by side.

## Key terms

| Term | Meaning |
|---|---|
| Security principal | Any entity (login, user, role) that can be granted a permission |
| Login | Server-level object — the credential that connects to the server |
| User | Database-level object — what a login becomes, and can do, inside one specific database |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: what
question does a login answer versus what question a user answers, and
why can the same login map to different users with different rights
in different databases on the same server?
