# Auditing & MongoDB Security Best Practices

Authentication, RBAC, and encryption cover who can connect, what they can do, and whether
the data is protected in flight and at rest. Auditing answers a different question: *who
actually did what, and when* — the record you pull up after the fact. This lesson also
pulls the whole chapter together into a real hardening checklist worth running against any
MongoDB deployment before it goes anywhere near production.

## What you'll learn

- What MongoDB's audit log captures, and its licensing tier
- The core hardening checklist: auth, network binding, the legacy HTTP interface
- Why each item on that checklist is a real, documented risk, not a theoretical one

## Auditing: an Enterprise/Atlas feature

Like encryption at rest, **auditing is an Enterprise/Atlas feature**, not available in
Community Server. Enabled and configured through settings like:

```
auditLog:
  destination: file
  format: JSON
  path: /var/log/mongodb/audit.json
  filter: '{ atype: "authenticate" }'
```

The audit log can record authentication attempts, authorization checks (who tried to do
what and whether it was allowed), schema changes, and more — with a filter expression to
scope logging to the events that actually matter rather than drowning in noise. This is
the same category of tool as SQL Server Audit — an after-the-fact record for compliance
and incident investigation, not a preventive control on its own.

## The hardening checklist

Three items belong on every real MongoDB production checklist, beyond authentication and
RBAC already covered in this chapter:

**1. Enable authentication.** Covered in Lesson 17, worth repeating here as the single
highest-impact item: `security.authorization: enabled`, no exceptions.

**2. Bind to specific network interfaces, not `0.0.0.0`.** By default (older versions) or
by explicit misconfiguration, `mongod` can be told to listen on every network interface —
`net.bindIp: 0.0.0.0` — meaning it's reachable from anywhere that can route to the
machine, not just trusted application servers. The fix is binding to specific,
known-trusted addresses:

```
net:
  bindIp: 127.0.0.1,10.0.1.15
```

This is the same idea as restricting a SQL Server instance to specific network interfaces
or firewall rules rather than leaving it wide open — a database engine should be reachable
by the application tier that needs it, and by nothing else.

**3. Disable the legacy HTTP interface.** Older MongoDB versions exposed a simple HTTP
status interface directly on the database port range — a real, historically exploited
attack surface, since disabled by default since MongoDB 3.2. It's still worth explicitly
confirming it's off on any deployment you administer:

```
net:
  http:
    enabled: false
```

Verifying it rather than assuming it — configuration drift and old config files copied
forward from older versions are exactly how a "disabled by default" setting ends up
re-enabled without anyone intending it.

## Putting the checklist together

None of these four items (auth, RBAC scoped to least privilege, network binding, HTTP
interface) is exotic or MongoDB-specific in spirit — every one has a direct SQL Server
equivalent. What's specific to MongoDB is that several of them are **off by default**,
which makes this chapter's running theme — verify, don't assume — the actual job.

## Key terms

| Term | Meaning |
|---|---|
| Audit log | MongoDB's record of authentication, authorization, and schema-change events; Enterprise/Atlas only |
| `net.bindIp` | Setting controlling which network interfaces `mongod` listens on |
| `0.0.0.0` binding | Listening on every interface — reachable from anywhere that can route to the host |
| Legacy HTTP interface | An old, disabled-by-default status interface on the database port range; verify it's off |

## Check yourself

Per this lesson's hardening checklist, why is binding `mongod` to `0.0.0.0` considered a
real risk rather than just a convenience, and what should it be bound to instead?
