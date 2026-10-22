# Lesson 11 — Base Tables & Table Extension

**Chapter 3 · Tables & Relationships · Lesson 11 of 34**

## What you'll learn

- What a "base table" is, and why ServiceNow ships with generic ones like `task`
- How table extension actually works as a real inheritance mechanism
- Why an extended-table record is also technically a row in its parent
- Why a query against a base table can return rows that look completely different

## Base tables: generic on purpose

A **base table** is a foundational table ServiceNow ships with that is deliberately
generic — built to hold the fields and behavior that many more specific record types
all need, without committing to any one of them. `task` is the base table behind
Incident, Problem, Change, and Request management. `cmdb_ci` is the base table behind
every configuration item type in the CMDB — a server, a database instance, a network
switch. Neither `task` nor `cmdb_ci` is meant to be used directly very often; they
exist so other tables can build on top of them.

## Table extension: real inheritance, not a copy-paste

**Table extension** is the mechanism that lets one table build on another. When you
look at `incident`'s definition in `sys_db_object`, its "Extends table" field points
to `task`. That single relationship means `incident` automatically inherits every
field `task` has — `short_description`, `state`, `priority`, `assignment_group`, and
dozens more — without a single one of those fields being redefined on `incident`
itself. The `incident` table then adds its *own* fields on top: `caller_id`,
`category`, `close_code` — fields that only make sense on an incident, not on a
generic task.

```
task (base table)
  short_description, state, priority,
  assignment_group, assigned_to, ...
    |
    |-- extends --> incident        (adds: caller_id, category, close_code)
    |-- extends --> problem         (adds: known_error, workaround)
    |-- extends --> change_request  (adds: risk, type, backout_plan)
```

ServiceNow's modern extension pattern gives each extended table its own physical
table under the hood (sometimes called "Extends" with vertical table separation),
while still presenting the inherited fields as if they live right there on the
child table's form. In practice, from an admin's chair, the distinction that matters
is simpler than the physical storage detail: an incident record *is* a task record,
with extra fields bolted on.

## Why an incident is also, technically, a task

Because `incident` extends `task`, every incident record is simultaneously a row
that satisfies a query against `task`. If you build a report or a list against the
`task` table with no further filtering, ServiceNow returns incidents, problems,
change requests, and service catalog requests all mixed together in one result set —
because every one of them *is* a task, just dressed up with its own extra fields.
This is exactly how a manager's single "all open work across every queue" dashboard
can exist without separately querying four different tables and stitching the
results together by hand.

## Why this is the architecture, not a coincidence

This inheritance is precisely why Incident, Problem, and Change Management — the
ITIL practices from your first course in this path — behave so consistently with
each other inside ServiceNow: the same `state` field, the same `assignment_group`
field, the same priority calculation logic, all live once on `task` and get
inherited everywhere. When you learn how one of those shared behaviors works on
Incident, you've actually learned how it works on Problem and Change too, because
it's the same field, defined once, on the same base table.

## Key terms

| Term | Meaning |
|---|---|
| Base table | A generic, foundational table (e.g. `task`, `cmdb_ci`) meant to be extended |
| Table extension | ServiceNow's inheritance mechanism: a child table gets all of its parent's fields plus its own |
| Extends table | The `sys_db_object` field recording which parent table a given table extends |
| Shared behavior | Logic (like priority calculation) defined once on a base table, inherited by every table that extends it |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why does a report
built directly against the `task` table return incidents, problems, and changes all
mixed together, instead of returning nothing?
