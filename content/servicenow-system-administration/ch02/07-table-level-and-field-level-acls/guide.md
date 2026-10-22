# Lesson 7 — Table-Level & Field-Level ACLs

**Chapter 2 · Access Control Lists (ACLs) · Lesson 7 of 36**

## What you'll learn

- What a table-level ACL actually controls, versus a field-level ACL
- The real naming convention: `<table>.<operation>` versus `<table>.<field>`
- Why a user can pass the table-level check and still be blocked from one field
- A concrete, realistic example using the Incident table's `caller_id` field
- How to read an ACL's name to know instantly which layer you're looking at

## Table-level ACLs: access to the whole record

A table-level ACL governs whether a user can perform an operation on a
record *as a whole* — can this role read any Incident at all, can this
role create a new Change Request, can this role delete a Problem
record. It doesn't know or care about individual fields; it's a single
gate the user has to clear before they're allowed anywhere near the
record for that operation. If a user fails the table-level read ACL on
Incident, the conversation about individual fields never even starts —
they simply never see the record.

Table-level ACLs are named `<table>.<operation>`. `incident.read`
governs whether a role can read Incident records at all.
`incident.create` governs whether a role can create them.
`incident.write` governs updates, `incident.delete` governs deletion.
The dotted name tells you immediately what it governs — no need to
open the record to guess.

## Field-level ACLs: access to one specific field

A field-level ACL narrows the scope to a single field on that table.
It's checked **in addition to** the table-level ACL for the same
operation, never as a substitute for it. This is the layer that lets
you say "any agent can read an Incident record, but only members of HR
can see the `caller_id` field if this is a sensitive HR-related
ticket" — or more commonly, "every agent can read Incident, but only
the assignment group's own members can edit `assignment_group`."

Field-level ACLs are named `<table>.<field>` — `incident.caller_id`,
`incident.short_description`, `incident.assignment_group`. Spot the
difference from table-level names: no verb, just the field. That's
your visual cue, right there in the Access Control list, for which
layer you're reading.

## Why a user can pass one check and fail the other

This is the behavior that confuses people troubleshooting access for
the first time: a user opens an Incident, the form loads, they can see
most of the record — table-level read clearly passed — but one field
is blank, or shows as read-only, or doesn't render at all. That's a
field-level ACL doing exactly what it's designed to do. The table-level
ACL already granted them into the record; the field-level ACL is a
second, independent gate that applies only to that one field, and it
failed for this user on this operation.

This is deliberate design, not a bug to work around. It's how
ServiceNow lets you expose most of a record broadly while locking down
genuinely sensitive fields — a salary field on a HR case, a legal note
on a record, a `caller_id` field you don't want a contractor role
reading even though they're allowed to triage the ticket itself.

## A concrete example: `incident.caller_id`

Picture an instance where the `contractor` role can read and update
Incident records generally — `incident.read` and `incident.write` both
list `contractor` in their required roles, and both pass. But there's
also a field-level ACL named `incident.caller_id` that requires the
`itil` role specifically, with no `contractor` role listed. A
contractor opens an Incident, sees the short description, the work
notes, the state — everything the table-level ACLs allow — but the
Caller field is simply missing from their view. Nothing is broken.
Two independent ACLs each did their job: one admitted them to the
record, the other kept one field out of reach.

## Key terms

| Term | Meaning |
|---|---|
| Table-level ACL | Governs access to an entire record for one operation; named `<table>.<operation>` |
| Field-level ACL | Governs access to one specific field; named `<table>.<field>`; checked in addition to table-level |
| `incident.read` | Example table-level ACL — governs reading any Incident record |
| `incident.caller_id` | Example field-level ACL — governs visibility of just the Caller field |
| Required roles | The roles listed on an ACL record that a user needs at least one of |

## Check yourself

A user reports they can open and read an Incident, but one field on
the form is invisible to them. Which layer of ACL is almost certainly
responsible, and why didn't the table-level ACL catch this already?
