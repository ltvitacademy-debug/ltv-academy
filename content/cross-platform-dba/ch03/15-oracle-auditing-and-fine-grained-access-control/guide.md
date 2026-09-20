# Oracle Auditing & Fine-Grained Access Control

SQL Server auditing is built around SQL Server Audit objects writing to the Windows
Application log, a file, or the Security log. Oracle's modern answer is **Unified
Auditing**, introduced in 12c and the default (and recommended) mechanism from that release
forward. Beyond auditing — recording what happened — Oracle also has a genuinely distinctive
capability for controlling what a query is even allowed to see in the first place: Virtual
Private Database.

## What you'll learn

- Unified Auditing: policies, predefined policies, and the unified audit trail
- The difference between auditing (recording access) and Fine-Grained Auditing (recording
  access only under specific conditions)
- Virtual Private Database (VPD) / Fine-Grained Access Control for row-level security

## Unified Auditing replaced the old, fragmented approach

Older Oracle versions split auditing across three separate mechanisms — standard auditing
(`AUDIT_TRAIL` parameter), fine-grained auditing, and OS-level auditing — with output scattered
across different tables and files. Unified Auditing consolidates all of it into one audit
trail, defined with policies:

```sql
CREATE AUDIT POLICY app_table_writes
  ACTIONS INSERT, UPDATE, DELETE ON hr.employees;

AUDIT POLICY app_table_writes;
```

Oracle also ships **predefined policies** ready to enable, without writing your own:

```sql
AUDIT POLICY ORA_SECURECONFIG;   -- security-relevant config changes
AUDIT POLICY ORA_LOGON_FAILURES; -- failed login attempts
```

All audit records — from custom policies, predefined policies, or SYS actions — land in one
place, queryable as a normal view:

```sql
SELECT event_timestamp, dbusername, action_name, object_name
FROM unified_audit_trail
WHERE dbusername = 'APP_OWNER'
ORDER BY event_timestamp DESC;
```

That single queryable trail is the real improvement over the old approach — no more
correlating `SYS.AUD$`, OS audit files, and FGA logs by hand.

## Fine-Grained Auditing narrows *when* an audit record is written

Standard/unified auditing on a table records every matching action. **Fine-Grained Auditing
(FGA)**, via `DBMS_FGA`, goes further — it audits only when a specific condition is true or a
specific column is touched, so you're not drowning in records for routine access:

```sql
BEGIN
  DBMS_FGA.ADD_POLICY(
    object_schema   => 'HR',
    object_name     => 'EMPLOYEES',
    policy_name     => 'salary_access_audit',
    audit_condition => NULL,
    audit_column    => 'SALARY'
  );
END;
/
```

This policy only fires when a query actually touches the `SALARY` column — a routine `SELECT
first_name, last_name FROM employees` generates nothing, but any query that reads salary does.

## Virtual Private Database restricts what a query can see, not just what's recorded

**Fine-Grained Access Control**, marketed as **Virtual Private Database (VPD)**, is a
different problem entirely: instead of recording access after the fact, it transparently
rewrites every query against a table to add a `WHERE` predicate — enforced at the database
level, invisible to and unbypassable by the application. There's no direct SQL Server feature
that works quite this way (SQL Server's row-level security uses a comparable predicate-function
idea, but VPD predates it by over a decade and is the pattern the industry converged on).

```sql
CREATE OR REPLACE FUNCTION hr.region_filter(
  p_schema IN VARCHAR2, p_object IN VARCHAR2
) RETURN VARCHAR2 IS
BEGIN
  RETURN 'region_id = SYS_CONTEXT(''hr_ctx'', ''region_id'')';
END;
/

BEGIN
  DBMS_RLS.ADD_POLICY(
    object_schema   => 'HR',
    object_name     => 'EMPLOYEES',
    policy_name     => 'region_policy',
    function_schema => 'HR',
    policy_function => 'region_filter',
    statement_types => 'SELECT,INSERT,UPDATE,DELETE'
  );
END;
/
```

Once this policy is active, `SELECT * FROM hr.employees` run by any session is silently
rewritten to include `AND region_id = SYS_CONTEXT('hr_ctx','region_id')` — the session's
context value, set earlier by application logic — before it ever executes. The application
never has to remember to filter by region; the database enforces it no matter what SQL is
sent.

## Key terms

| Term | Meaning |
|---|---|
| Unified Auditing | Oracle 12c+ default auditing mechanism, one consolidated audit trail |
| `unified_audit_trail` | The view exposing all unified audit records |
| Predefined policy | Ready-made audit policy (e.g. `ORA_LOGON_FAILURES`) needing only `AUDIT POLICY` to enable |
| Fine-Grained Auditing (FGA) | `DBMS_FGA` — audits only when a condition/column is actually touched |
| Virtual Private Database (VPD) | `DBMS_RLS` — transparently adds a row-filtering predicate to every query |
| Policy function | PL/SQL function returning the `WHERE` predicate a VPD policy injects |

## Check yourself

A colleague wants to "audit" salary access by asking every developer to remember to log who
queried the `SALARY` column. Explain why Fine-Grained Auditing is the better tool for this —
and separately, why VPD, not auditing at all, is the right tool if the requirement is
"the query should never even return other regions' rows."
