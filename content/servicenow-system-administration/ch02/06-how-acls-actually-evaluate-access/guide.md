# Lesson 6 — How ACLs Actually Evaluate Access

**Chapter 2 · Access Control Lists (ACLs) · Lesson 6 of 36**

## What you'll learn

- Where ACLs actually live in the platform: the `sys_security_acl` table
- The real evaluation rule — every applicable ACL must pass, not just one
- Why this is an AND across ACLs, not an OR, and why that surprises new admins
- How table-level and field-level checks stack on top of each other
- The four operations ACLs are evaluated against: read, write, create, delete

## Where ACLs live

Every access control rule in ServiceNow — every one you'll ever see in
the Access Control list, no matter how it was created — is a record on
the `sys_security_acl` table. There's no separate permission engine
bolted on somewhere else. When a user tries to read an Incident, open a
form, run a report, or call a Table API endpoint, the platform looks at
`sys_security_acl` for every rule that could apply to that attempt and
evaluates them before the request goes any further. If you can query
`sys_security_acl`, you can see literally every access rule governing
the instance — nothing is hidden in configuration outside that table.

## The rule almost every new admin gets backwards

Here's the part that trips people up: when more than one ACL applies to
the same operation on the same record or field, **every single one of
them has to pass**. It is an AND across all applicable ACLs — not an
OR. A new admin's instinct is usually "if the user matches any ACL that
grants access, they're in." That's wrong. If three ACLs apply to a
read attempt and two pass but the third fails, access is denied. One
failing ACL is enough to block the whole operation, regardless of how
many others would have allowed it.

This matters constantly in practice. Adding a *new* ACL to tighten
security on a table never weakens what's already there — but it can
absolutely break access that used to work, because now there's one
more rule in the AND chain that has to pass too. Admins who don't
internalize this spend hours confused about why access "used to work"
after they added what they thought was an unrelated, narrower rule.

## Operations: read, write, create, delete

ACLs aren't evaluated as one generic "access" check. Each ACL record
specifies which operation it governs: `read`, `write`, `create`, or
`delete` (plus a few special operations like `report` and
`import_set_report` that rarely come up for day-to-day admin work).
A user can have full read access to Incident but zero ability to
create one, because those are governed by entirely separate ACL
records — `incident.read` is not the same rule as `incident.create`,
even though both apply to the same table. When you're troubleshooting,
the first question is always "which operation failed?" — read, write,
create, or delete — because that immediately narrows which family of
ACLs to inspect.

## Table-level checks and field-level checks both run

The evaluation order conceptually works outward to inward: first the
platform checks whether the user can perform the operation on the
*record* at all (the table-level ACL — covered in depth next lesson).
Passing that table-level check is necessary but not sufficient. For
any field the user is trying to read or write, the platform *also*
checks whether a field-level ACL exists for that specific field, and
if one does, it must pass too. Field-level ACLs are checked **in
addition to** the table-level ACL for that operation, never instead of
it. A user who passes `incident.read` (the table-level ACL) can still
be denied visibility into one specific field, like a salary figure or
a legal hold note, by a field-level ACL that applies only to that
field. We'll go hands-on with that table-level-versus-field-level
distinction in the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| `sys_security_acl` | The single table where every ACL record in the instance lives |
| Applicable ACL | Any ACL whose table, field, and operation match the current access attempt |
| AND evaluation | Every applicable ACL must pass for access to be granted — one failure blocks it |
| Operation | The specific action an ACL governs: read, write, create, or delete |
| Table-level vs. field-level | Record-wide access check vs. a check on one specific field, both enforced |

## Check yourself

Two ACLs apply to a read attempt on a record: one checks the user's
role, the other runs a script that returns `answer = false`. Does the
user get read access? Explain why in terms of how ACLs combine, not
just the final yes/no.
