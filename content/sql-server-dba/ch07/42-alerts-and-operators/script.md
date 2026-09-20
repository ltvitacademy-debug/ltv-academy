# Script — Alerts & Operators

## Segment 1 (title)

Jobs and schedules run planned work. Alerts and operators handle the unplanned side: something goes wrong right now, and a person needs to know about it — often before a user even notices.

## Segment 2 (code: sp_add_operator)

sp_add_operator creates a notification destination — a person or distribution list. It has no logic of its own, and it needs Database Mail configured on the instance to actually deliver email.

## Segment 3 (code: sp_add_alert + sp_add_notification)

sp_add_alert creates the watched condition — here, any error at severity 16 or higher. sp_add_notification is the separate call that links that alert to an operator and picks the delivery method, in this case email.

## Segment 4 (steps: a real production pattern)

A real production setup ties a severity 16-plus alert to an on-call operator so someone gets paged immediately. A specific error number, like 9002 for a full transaction log, can get its own more targeted alert instead of a generic severity catch-all.

## Segment 5 (outro)

Next up: proxies and credentials — how a CmdExec or PowerShell job step runs safely without using the SQL Server service account directly.
