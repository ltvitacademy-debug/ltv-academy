# Script — Alerts, Operators & Notifications

## Segment 1 (title)

A job does work and can notify on its own completion. An alert is a separate, standalone trigger that fires on a specific SQL Server error number, severity level, or performance condition — independent of whether a job was even involved.

## Segment 2 (code: alerts and operators)

Severity 19 and above is the real threshold Microsoft treats as requiring immediate attention — resource exhaustion or data corruption. An operator is Agent's model of who gets notified. Historically pagers, in practice today email through Database Mail or a webhook routed to Teams or Slack.

## Segment 3 (steps: wiring job, alert, and operator together)

A job's own notify_level_email fires only when that specific job fails. A standalone alert fires on the error condition itself, regardless of whether any job was running. A production strategy typically wires both to the same operator.

## Segment 4 (outro)

Job-level notification covers the routine maintenance you scheduled; severity-based alerts cover the things you didn't schedule but need to know about anyway. Next up: a real troubleshooting flow when a job actually fails.
