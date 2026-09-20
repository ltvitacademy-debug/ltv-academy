# Script — Auditing & MongoDB Security Best Practices

## Segment 1 (title)

Authentication, RBAC, and encryption cover who can connect, what they can do, and whether data is protected. Auditing answers a different question — who actually did what, and when. This lesson also pulls the chapter together into a real hardening checklist.

## Segment 2 (code: audit logging)

Like encryption at rest, auditing is an Enterprise or Atlas feature. The audit log can record authentication attempts, authorization checks, and schema changes, with a filter to scope logging to what actually matters — the same category of tool as SQL Server Audit, an after-the-fact record for investigation.

## Segment 3 (code: bind to specific interfaces)

mongod can be told to listen on every network interface with bindIp 0.0.0.0, making it reachable from anywhere that can route to the machine. The fix is binding to specific, known-trusted addresses — the same idea as restricting a SQL Server instance's network interfaces rather than leaving it wide open.

## Segment 4 (steps: the hardening checklist)

Enable authentication, no exceptions. Bind to specific interfaces, not 0.0.0.0. And confirm the legacy HTTP status interface is disabled — off by default since MongoDB 3.2, but worth verifying rather than assuming, since config drift can quietly re-enable it.

## Segment 5 (outro)

None of these four items is exotic — every one has a direct SQL Server equivalent. What's specific to MongoDB is that several are off by default. Next up: backup and restore strategies, logical, physical, and managed.
