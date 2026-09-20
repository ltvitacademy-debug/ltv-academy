# Script — Logins, Users, Roles & Permissions

## Segment 1 (title)

Security in SQL Server runs on a distinction that trips up almost everyone new to administration: a login is not a user. A login gets you onto the instance. A user is what that login maps to inside a specific database.

## Segment 2 (code: server-level vs. database-level)

Sys.server_principals lives in master and lists every login on the instance. Sys.database_principals is database-scoped — run it inside AdventureWorks and you get AdventureWorks's users, run it inside msdb and you get msdb's.

## Segment 3 (code: mapping users back to their login)

The two catalogs are linked by sid. Join database principals to server principals on sid and every mapped user should show a matching login. A user with no matching login is an orphaned user, usually from restoring a backup to a server where that login doesn't exist — we'll dig into that in lesson twenty-six.

## Segment 4 (steps: bundled permission sets)

Instead of granting permissions one at a time, SQL Server ships fixed roles. Sysadmin at the server level grants full control of the entire instance. Db_owner at the database level grants full control of one database. Db_datareader and db_datawriter grant select or insert-update-delete across every table in that database.

## Segment 5 (outro)

Roles are a shortcut for common cases — but real permission management means understanding grant, deny, and revoke directly. Next up: that syntax in practice, and why deny always wins over grant.
