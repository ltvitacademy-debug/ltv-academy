# Auditing & Security Queries

"Who has access to this?" and "who actually did this?" are two different questions, and SQL
Server answers them differently. The first is a point-in-time query against the catalog views
you've already used this chapter. The second needs something actually recording events as they
happen — which is what SQL Server Audit exists for. This lesson closes out security
administration by covering both: quick ad hoc security queries, and the real audit feature
behind them.

## What you'll learn

- Ad hoc queries for answering "who can do what" right now
- SQL Server Audit: `CREATE SERVER AUDIT`, `CREATE SERVER AUDIT SPECIFICATION`
- Reading audit output with `sys.fn_get_audit_file`

## Ad hoc security queries

Two questions come up constantly enough to be worth having ready:

```sql
-- Every explicit permission granted or denied on a specific table
SELECT
    pr.name AS principal_name,
    pe.permission_name,
    pe.state_desc
FROM sys.database_permissions pe
JOIN sys.database_principals pr ON pe.grantee_principal_id = pr.principal_id
WHERE pe.major_id = OBJECT_ID('dbo.Employee');

-- Every member of every fixed database role
SELECT
    r.name AS role_name,
    m.name AS member_name
FROM sys.database_role_members rm
JOIN sys.database_principals r ON rm.role_principal_id = r.principal_id
JOIN sys.database_principals m ON rm.member_principal_id = m.principal_id
ORDER BY r.name;
```

`sys.database_permissions` lists every explicit `GRANT`/`DENY`/`REVOKE` at the object, schema, or
database level — `state_desc` shows `GRANT`, `DENY`, or `GRANT_WITH_GRANT_OPTION`. This answers
"who can do what" as of right now, but it doesn't tell you who actually *did* anything — for
that, you need an audit trail.

## SQL Server Audit

SQL Server Audit is the built-in feature for recording security-relevant events — logins,
permission changes, `SELECT`/`INSERT`/`UPDATE`/`DELETE` on specific objects — to a file, the
Windows Security log, or the Application log.

```sql
-- Server-level audit object: where events get written
CREATE SERVER AUDIT Security_Audit
TO FILE (FILEPATH = 'D:\Audits\');

ALTER SERVER AUDIT Security_Audit WITH (STATE = ON);

-- Database-level specification: which events get captured
CREATE DATABASE AUDIT SPECIFICATION Employee_Access_Audit
FOR SERVER AUDIT Security_Audit
ADD (SELECT, UPDATE ON dbo.Employee BY public)
WITH (STATE = ON);
```

The audit object (`CREATE SERVER AUDIT`) defines *where* events go and basic filtering; the
audit specification (`CREATE DATABASE AUDIT SPECIFICATION` or `CREATE SERVER AUDIT
SPECIFICATION`) defines *what* gets captured. You need both — an audit with no specification
records nothing.

## Reading audit output

```sql
SELECT
    event_time,
    server_principal_name,
    database_name,
    object_name,
    statement,
    succeeded
FROM sys.fn_get_audit_file('D:\Audits\Security_Audit*.sqlaudit', DEFAULT, DEFAULT)
ORDER BY event_time DESC;
```

`sys.fn_get_audit_file` reads the binary `.sqlaudit` files directly and returns them as a
queryable result set — this is how you actually answer "who ran this `UPDATE`, and when," after
the fact, instead of guessing from application logs.

## Key terms

| Term | Meaning |
|---|---|
| `sys.database_permissions` | Catalog view listing explicit GRANT/DENY/REVOKE statements |
| SQL Server Audit | The built-in feature recording security-relevant events to a file or log |
| Server Audit | The object defining where audit events are written |
| Audit Specification | The object defining which events get captured (server- or database-level) |
| `sys.fn_get_audit_file` | Function that reads `.sqlaudit` files back into a queryable result set |

## Check yourself

Why isn't a catalog-view query like `sys.database_permissions` enough to answer "who actually
ran this `UPDATE` last Tuesday"? What do you need instead?
