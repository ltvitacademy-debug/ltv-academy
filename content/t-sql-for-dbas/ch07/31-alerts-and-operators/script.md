# Script — Alerts & Operators

## Segment 1 (title)

A job that fails silently at 3 AM might as well have no monitoring at all. Operators and alerts close that gap: an operator is who gets told, an alert is what triggers telling them, and T-SQL wires the two together.

## Segment 2 (code: who gets told)

An operator is just a named notification target, usually an email address or a distribution list, created with sp_add_operator.

## Segment 3 (code: what triggers it)

Alerts fire on a specific error number or, more commonly, a severity level. Severities nineteen through twenty-five are SQL Server's fatal-error range — the kind worth waking someone up for. Sp_add_alert with message_id zero and a severity set means fire on any error at that severity.

## Segment 4 (steps: wiring them together)

Creating an alert and an operator separately doesn't connect them. Sp_add_notification is the third call that actually links the alert to the operator and picks the notification method — without it, the alert fires and logs, but nobody gets an email.

## Segment 5 (outro)

Alerting tells you something went wrong after the fact. Preventing it in the first place starts with checking database integrity directly. Next up: DBCC CHECKDB, in practice.
