# Alerts & Operators

A job that fails silently at 3 AM might as well not have a monitoring story at all.
Operators and alerts close that gap: an operator is who gets told, an alert is what
triggers telling them, and T-SQL wires the two together without ever opening the Agent
node in SSMS.

## What you'll learn

- How to create an operator with `sp_add_operator`
- How to create a severity-based alert with `sp_add_alert`
- How `sp_add_notification` connects an alert to an operator

## sp_add_operator: who gets told

An operator is just a named notification target — typically an email address, sometimes a
distribution list:

```sql
EXEC msdb.dbo.sp_add_operator
    @name = N'DBA Team',
    @enabled = 1,
    @email_address = N'dba-team@example.com';
```

## sp_add_alert: what triggers a notification

Alerts fire on either a specific error number or, more commonly for a DBA, a severity
level. Severities 19–25 are SQL Server's fatal-error range — the kind worth waking someone
up for:

```sql
EXEC msdb.dbo.sp_add_alert
    @name = N'Severity 021 Errors',
    @message_id = 0,
    @severity = 21,
    @enabled = 1,
    @notification_message = N'A severity 21 error occurred.';
```

`@message_id = 0` with a `@severity` set means "fire on any error at this severity,"
rather than one specific numbered error.

## sp_add_notification: wiring the alert to the operator

Creating an alert and an operator independently doesn't connect them — that's a third
call:

```sql
EXEC msdb.dbo.sp_add_notification
    @alert_name = N'Severity 021 Errors',
    @operator_name = N'DBA Team',
    @notification_method = 1; -- 1 = email
```

Without this step, the alert fires internally and logs to the Agent error log, but nobody
gets an email — a surprisingly common gap in environments where the alert was created but
this last wiring step was skipped.

## Key terms

| Term | Meaning |
|---|---|
| Operator | A named notification target (typically email) created with `sp_add_operator` |
| Alert | A rule that fires on a specific error number or severity level, created with `sp_add_alert` |
| Severity 19–25 | SQL Server's range of fatal errors — the errors most worth alerting on |
| `sp_add_notification` | Links an existing alert to an existing operator and notification method |

## Check yourself

An alert exists for severity 21 errors, and an operator exists with a valid email address,
but nobody receives a notification when the error fires. What's most likely missing?
