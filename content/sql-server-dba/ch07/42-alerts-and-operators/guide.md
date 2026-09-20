# Alerts & Operators

Jobs and schedules run planned work. **Alerts and operators** handle the unplanned
side: something goes wrong right now, and a person needs to know about it — often
before a user even notices. This lesson creates both halves of that notification path.

## What you'll learn

- Creating an operator with `sp_add_operator`, and how email notification actually
  gets delivered
- Creating an alert tied to a severity level or a specific error number with
  `sp_add_alert`
- A realistic production example: paging someone on severity 16+ errors

## Operators: who gets notified

An operator represents a person or a distribution list. Agent needs Database Mail
configured for email notification to actually be delivered — the operator definition
just says where to send it:

```sql
EXEC msdb.dbo.sp_add_operator
    @name = N'DBA On-Call',
    @enabled = 1,
    @email_address = N'dba-oncall@company.com';
```

That's it structurally — an operator has no logic of its own. It's purely a
destination that an alert (or a job's own failure notification) points at.

## Alerts: watched conditions

An alert watches for either a **specific error number** or **any error at or above a
given severity**, and reacts when it fires — by notifying an operator, running a job,
or both.

```sql
EXEC msdb.dbo.sp_add_alert
    @name = N'Severity 16 or Higher',
    @severity = 16,
    @notification_message = N'A severity 16+ error occurred.';

EXEC msdb.dbo.sp_add_notification
    @alert_name = N'Severity 16 or Higher',
    @operator_name = N'DBA On-Call',
    @notification_method = 1;  -- 1 = email
```

`sp_add_alert` creates the alert row itself; `sp_add_notification` is the separate call
that links an alert to an operator (this mirrors how `sp_attach_schedule` links a
schedule to a job — the watched condition and the notified person are independent
objects joined by a link).

Severity 16 and above generally indicates errors serious enough to need human
attention — resource, object, or general error conditions, up through fatal errors at
19–25. A real production setup almost always includes a severity 16+ (or higher) alert
tied to an on-call operator, so someone gets paged the moment something like that
happens rather than finding out from a user complaint.

An alert can instead watch a specific error number when severity alone isn't precise
enough — for example, error 9002 (transaction log full), which is severity 17 but
specific and actionable enough to warrant its own dedicated alert with a more targeted
message than a generic "severity 17" catch-all would give.

## Key terms

| Term | Meaning |
|---|---|
| Operator | A notification destination — a person or distribution list — with no logic of its own |
| `sp_add_operator` | Creates an operator, typically with an email address |
| Alert | A watched condition: a specific error number, or any error at/above a severity |
| `sp_add_alert` | Creates the alert definition |
| `sp_add_notification` | Links an alert to an operator, specifying the notification method |

## Check yourself

Why does SQL Server separate "the watched condition" (the alert) from "who gets told"
(the operator) into two objects joined by a notification, instead of putting an email
address directly on the alert?
