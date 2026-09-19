# Lesson 61 — Alerts, Operators & Notifications

**Chapter 10 · SQL Server Agent & Automation · Lesson 61 of 95**

## What you'll learn

- What an alert actually is: a trigger tied to a specific error or condition, separate from a job
- What an operator is, and how notification has really evolved (email/webhook, not pagers)
- How to wire a job's own failure into a real alert and a real notification
- Why alerts and jobs are two different objects even though they're used together constantly

## Alerts are not jobs

It's easy to conflate "the job failed, so something got sent" with a
single mechanism. They're actually two separate objects working
together. A **job** does work and can notify on its own completion
status. An **alert** is a standalone trigger that fires on a specific
SQL Server *error number, severity level, or performance condition*
— independent of whether a job was even involved. An alert can fire
because of a raw engine error (a deadlock, an out-of-space condition)
that no job ever touched.

```sql
EXEC msdb.dbo.sp_add_alert
    @name = N'Severe Errors (Severity 19+)',
    @message_id = 0,
    @severity = 19,
    @notification_message = N'A severity 19+ error occurred — data corruption or resource exhaustion likely.';
```

Severity 19 and above is the real, meaningful line: these are
resource errors and internal-consistency errors serious enough that
Microsoft's own documentation treats them as requiring immediate DBA
attention, not "log it and check later."

## Operators — who actually gets told

An **operator** is Agent's model of a person (or a distribution list,
or a webhook target) who receives notifications:

```sql
EXEC msdb.dbo.sp_add_operator
    @name = N'DBA On-Call',
    @enabled = 1,
    @email_address = N'dba-oncall@company.com';
```

Historically, Agent's operator model included pager notifications —
a real artifact of when this feature was designed. In practice today,
operators are configured for **email** (via Database Mail) or,
increasingly, routed through a webhook/Logic App/Azure Automation
endpoint that then fans out to Teams, Slack, or an incident-management
tool. The underlying Agent object model didn't change; what's
plugged into the notification path did.

## Wiring it together: job, alert, and operator

```sql
-- The job itself notifies an operator on failure:
EXEC sp_update_job
    @job_name = N'Nightly Index Maintenance',
    @notify_level_email = 2,        -- notify on failure
    @notify_email_operator_name = N'DBA On-Call';

-- A standalone alert also notifies, independent of any job:
EXEC msdb.dbo.sp_add_notification
    @alert_name = N'Severe Errors (Severity 19+)',
    @operator_name = N'DBA On-Call',
    @notification_method = 1;  -- email
```

Notice these are two independent notification paths pointing at the
same operator: the job's own `notify_level_email` fires only when
*that job* fails, while the alert fires on the *error condition
itself*, regardless of whether any job was running when it happened.
A production maintenance strategy (Lesson 64 pulls this together)
typically wires both — job-level notification for the routine
maintenance work you scheduled, and severity-based alerts for the
things you didn't schedule but absolutely need to know about anyway.

## Key terms

| Term | Meaning |
|---|---|
| Alert | A standalone trigger on a specific error number, severity, or performance condition |
| Operator | Agent's model of who gets notified — email or webhook-routed today |
| `notify_level_email` on a job | The job's own failure notification, separate from any alert |
| Severity 19+ | The real threshold Microsoft treats as requiring immediate attention |

## Check yourself

You're ready for Lesson 62 when you can explain, without looking: why
are alerts and jobs separate objects even though a production
strategy usually wires both to the same operator, and what's the
real difference between a job's own failure notification and a
severity-based alert?
