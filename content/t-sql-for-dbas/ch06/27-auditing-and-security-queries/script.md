# Script — Auditing & Security Queries

## Segment 1 (title)

"Who has access to this" and "who actually did this" are two different questions. The first is a point-in-time query against catalog views. The second needs something actually recording events as they happen — that's what SQL Server Audit is for.

## Segment 2 (code: who can do what, right now)

Sys.database_permissions lists every explicit grant, deny, or revoke at the object, schema, or database level. Join it to database principals and you get a straight answer to "who can do what" as of right now — but it says nothing about who actually did anything.

## Segment 3 (code: SQL Server Audit — object plus specification)

A server audit defines where events get written — a file, the Windows security log, or the application log. A database audit specification defines what actually gets captured, like select and update on a specific table. You need both pieces — an audit with no specification records nothing.

## Segment 4 (steps: two different questions)

Access is a snapshot: what permissions exist right now. Actions need a trail: what actually happened, and when. Sys.fn_get_audit_file reads the binary sqlaudit files the audit writes and returns them as a normal queryable result set, so you can actually answer "who ran this update last Tuesday."

## Segment 5 (outro)

That closes out security administration. Next up: Chapter Seven, SQL Server Agent and Automation, starting with querying job history.
