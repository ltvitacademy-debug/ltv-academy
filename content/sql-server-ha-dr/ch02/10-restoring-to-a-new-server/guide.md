# Restoring to a New Server

Every restore so far has assumed the target server has the exact same folder structure as the
server the backup came from. In practice, that's often false: refreshing a test or staging
environment from a production backup, migrating to new hardware, or rebuilding after a total
server loss all mean restoring onto a server whose drive layout doesn't match. This lesson covers
the `MOVE` clause that makes that possible, and the login mess it leaves behind.

## What you'll learn

- Why a restore can fail outright if the target server's folders don't match the source
- The `MOVE` clause, and how to find the logical file names it needs
- Why database users show up "orphaned" after a cross-server restore, and how to fix it

## The problem: file paths are baked into the backup

A backup stores the exact physical file paths the database used when it was backed up — for
example `D:\SQLData\Prod.mdf` and `E:\SQLLogs\Prod.ldf`. If the target server doesn't have a `D:`
drive, or doesn't have a `SQLData` folder on it, a plain `RESTORE DATABASE` fails immediately,
because SQL Server tries to recreate the files at those exact paths.

## The `MOVE` clause

`MOVE` tells SQL Server to use the backup's data but write the files somewhere else. Each file
needs its own `MOVE`, referenced by its **logical name** (not the physical path) — which is
exactly what `RESTORE FILELISTONLY` (Lesson 7) exists to reveal:

```sql
RESTORE FILELISTONLY
FROM DISK = N'D:\Backup\Prod_Full.bak';
-- returns logical names, e.g. "Prod" and "Prod_log"

RESTORE DATABASE Prod_Staging
FROM DISK = N'D:\Backup\Prod_Full.bak'
WITH MOVE 'Prod' TO N'C:\SQLData\Prod_Staging.mdf',
     MOVE 'Prod_log' TO N'C:\SQLData\Prod_Staging.ldf',
     RECOVERY;
```

Note the restore is also renaming the database itself (`Prod_Staging` instead of `Prod`) — that's
independent of `MOVE`, and a common pairing when restoring a production backup into a same-server
or different-server test copy that needs to coexist alongside the original.

## The side effect: orphaned users

A restored database keeps the **database-level users** it had on the source server, but SQL
Server logins are **server-level** objects, stored separately from the database. If the target
server doesn't have a login with the exact same SID as the one the database user was mapped to
(which it usually won't, on a different server), that user becomes **orphaned** — it exists in the
database but can't authenticate, because there's no matching login to connect it to. This is the
same login/user distinction covered in T-SQL for DBAs, showing up again in a cross-server restore
context.

```sql
-- Find orphaned users after a cross-server restore
EXEC sp_change_users_login 'Report';

-- Fix by creating a matching login and re-linking, or:
ALTER USER MyUser WITH LOGIN = ExistingLoginName;
```

## Key terms

| Term | Meaning |
|---|---|
| `MOVE` | RESTORE clause redirecting a backup's data/log files to new physical paths |
| Logical file name | The internal name RESTORE FILELISTONLY reveals, used by MOVE (not the physical path) |
| Orphaned user | A database user with no matching server login on the target server, after a restore |
| `sp_change_users_login` | System procedure used to detect and repair orphaned users |

## Check yourself

A production backup restores successfully onto a staging server using `MOVE`, but an application
account that worked in production can't log in on staging. What's the most likely cause, and what
command reveals it?
