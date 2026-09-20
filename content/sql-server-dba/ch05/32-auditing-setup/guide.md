# Auditing Setup

## What you'll learn

- The real object model behind SQL Server Audit: server audit, server audit specification,
  database audit specification
- The exact T-SQL to stand up an audit writing to a file
- Where audited events actually land, and how to read them

## Why "who did this" needs a real feature, not a trigger

DDL/DML triggers can log some changes, but they're clumsy for real audit requirements —
compliance usually wants logins, permission changes, and specific statement classes captured
consistently, without hand-writing trigger logic on every table. **SQL Server Audit** is the
built-in feature for exactly this, and it has three layers.

## Layer 1: the server audit — where output goes

The **server audit** object defines the destination: a file, the Windows Security log, or the
Application log.

```sql
CREATE SERVER AUDIT Audit_Compliance
    TO FILE (FILEPATH = 'D:\SQLAudit\')
    WITH (ON_FAILURE = CONTINUE);

ALTER SERVER AUDIT Audit_Compliance WITH (STATE = ON);
```

`ON_FAILURE = CONTINUE` keeps the instance running if the audit target becomes unreachable
(the alternative, `SHUTDOWN`, halts SQL Server itself rather than let an action go unaudited —
a real option for the strictest compliance environments, used rarely because an unreachable log
share taking down production is a serious operational risk).

## Layer 2: server audit specification — server-scoped events

Attach server-level event categories to the audit:

```sql
CREATE SERVER AUDIT SPECIFICATION ServerSpec_Compliance
    FOR SERVER AUDIT Audit_Compliance
    ADD (FAILED_LOGIN_GROUP),
    ADD (SERVER_ROLE_MEMBER_CHANGE_GROUP),
    ADD (DATABASE_OBJECT_PERMISSION_CHANGE_GROUP)
    WITH (STATE = ON);
```

Server audit action groups cover instance-wide activity: failed logins, server role membership
changes, login creation, and similar. These are pre-built groups (`FAILED_LOGIN_GROUP` and
dozens of others) — you don't hand-write the detection logic.

## Layer 3: database audit specification — database-scoped events, down to the object

```sql
USE InventoryDB;
CREATE DATABASE AUDIT SPECIFICATION DbSpec_Payroll
    FOR SERVER AUDIT Audit_Compliance
    ADD (SELECT ON dbo.Payroll BY public),
    ADD (INSERT, UPDATE, DELETE ON dbo.Payroll BY public)
    WITH (STATE = ON);
```

This is object-level granularity — audit every `SELECT` against one sensitive table, by anyone
(`public`), without touching triggers or application code.

## Reading the results

Audit records land in the target you configured — for a file target, query them with the
`sys.fn_get_audit_file` function, or open them from SSMS's Audit node ("View Audit Logs"):

```sql
SELECT event_time, server_principal_name, database_name,
       object_name, statement, action_id
FROM sys.fn_get_audit_file('D:\SQLAudit\*.sqlaudit', DEFAULT, DEFAULT)
ORDER BY event_time DESC;
```

Every event line ties back to a real login and statement, which is the whole point: a
compliance question like "who read the Payroll table last month" becomes a query against the
audit file, not a guess.

## Key terms

| Term | Meaning |
|---|---|
| Server audit | The top-level audit object defining the destination (file, Security log, Application log) |
| Server audit specification | Attaches server-scoped event groups (failed logins, role changes) to a server audit |
| Database audit specification | Attaches database-scoped, object-level events (SELECT on a specific table) to a server audit |
| `sys.fn_get_audit_file` | Table-valued function for reading recorded audit events out of a file target |

## Check yourself

Compliance wants a record of every `SELECT` against the `Payroll` table, by anyone, going
forward. Which of the three SQL Server Audit layers actually captures that, and what does the
`ADD (...)` clause look like?
