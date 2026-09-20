# Finding Orphaned Users

Restore a database backup to a different server — for a migration, a refresh of a test
environment, or a disaster recovery failover — and something quietly breaks almost every time:
the database's users still exist, but the server logins they used to map to don't exist on the
new server. Those users are now **orphaned**: present in the database, unable to authenticate
through any login. This is one of the single most common post-restore support tickets a DBA
gets.

## What you'll learn

- Why restoring to a different server creates orphaned users
- The real query to detect them: `sys.database_principals` vs. `sys.server_principals`
- Fixing them with `ALTER USER ... WITH LOGIN` — and why `sp_change_users_login` is legacy

## Why this happens

A database user is linked to a server login by matching `sid` values. When you back up a
database and restore it to a *different* SQL Server instance, the users come along with the
database — but the logins live in `master`, not inside the database backup. If the target
server doesn't already have a login with the exact same `sid`, the restored user has nothing to
map to.

## Detecting orphaned users

```sql
SELECT
    dp.name AS orphaned_user,
    dp.sid
FROM sys.database_principals dp
WHERE dp.type IN ('S', 'U')          -- SQL logins and Windows logins
  AND dp.sid IS NOT NULL
  AND dp.name NOT IN ('guest', 'dbo', 'INFORMATION_SCHEMA', 'sys')
  AND NOT EXISTS (
      SELECT 1 FROM sys.server_principals sp
      WHERE sp.sid = dp.sid
  );
```

This is the real check: every database user whose `sid` has no matching row in
`sys.server_principals` is orphaned. SQL Server also ships a built-in procedure for the same
check, `sp_orphaned_users` (or `sys.sp_change_users_login 'Report'` on older versions), but
knowing the underlying query matters because it's what you'd adapt to filter by database, join
to `sys.databases`, or run across every database on an instance in one pass.

## Fixing an orphaned user

The modern, supported way is `ALTER USER ... WITH LOGIN`:

```sql
-- The login already exists on this server, just with a different sid history —
-- remap the existing user to it
ALTER USER ReportingUser WITH LOGIN = ReportingUser;
```

If the matching login doesn't exist yet on the target server, create it first — matching the
original SQL login's password (for a SQL login) or the Windows account (for a Windows login) —
then run the same `ALTER USER ... WITH LOGIN` to relink it.

`sp_change_users_login` performed the same job on older SQL Server versions and is now
documented as legacy/deprecated in favor of `ALTER USER`. It still works on many installations,
but new scripts should use `ALTER USER ... WITH LOGIN` — it's the syntax Microsoft actively
supports and the one that behaves predictably with contained databases and newer authentication
types.

## Key terms

| Term | Meaning |
|---|---|
| Orphaned user | A database user whose `sid` has no matching login in `sys.server_principals` |
| `sid` | Security identifier; the value that links a database user to its server login |
| `ALTER USER ... WITH LOGIN` | The modern statement that remaps an existing database user to a login |
| `sp_change_users_login` | The legacy procedure for the same fix; still functional but not the recommended approach |

## Check yourself

After restoring a database backup to a new server, a query shows a database user with a `sid`
that has no matching row in `sys.server_principals`. What's the modern statement to fix it?
