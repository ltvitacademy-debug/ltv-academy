# Lesson 1 — Incident Table & State Model

**Chapter 1 · Implementing Incident Management · Lesson 1 of 32**

## What you'll learn

- Why the `incident` table extends `task`, and what that inheritance actually buys you
- The six real state values on an out-of-box incident, and what each one is supposed to mean
- Why "On Hold" is not just a state flip — it requires a real Hold Reason
- How a Data Policy enforces Resolution Code and Close Notes before Resolved
- Why a well-implemented instance never lets New jump straight to Closed

## The Incident table inherits from Task

System Administration's table hierarchy lesson showed you that `task` is the
parent table behind every process record in ServiceNow — incident, problem,
change, and request item all extend it. That is not a modeling curiosity; it
is why `incident` arrives with `short_description`, `description`, `state`,
`priority`, `assigned_to`, `assignment_group`, and `opened_by` already built
in, instead of every ITSM app needing to define them from scratch. When you
implement Incident Management, you are really implementing the incident-
specific layer on top of a table whose core fields, security rules, and
numbering scheme ServiceNow has already solved once at the `task` level. The
implementation skill this chapter builds is deciding what incident adds on
top: its own state model, its own required fields, and its own automation.

## The six-state model, state by state

Out of the box, `incident.state` carries six real values: **New** (opened,
not yet triaged), **In Progress** (actively being worked), **On Hold**
(work is paused, waiting on something outside the assignee's control),
**Resolved** (the fix is in place, pending caller confirmation or auto-close),
**Closed** (confirmed done, record is final), and **Canceled** (opened in
error, duplicate, or no longer needed). Lesson 1 of the ITSM Foundations
course covered these as ITIL concepts; implementing them means deciding
which transitions the platform should allow, and which it should block.

## On Hold needs a reason, not just a flag

A common implementation mistake is letting an agent set State to On Hold
with nothing else recorded — six months later nobody can tell why 40% of
open incidents are sitting there. A correctly implemented instance makes
`hold_reason` a real, populated field the moment State is set to On Hold,
with values like **Awaiting Caller**, **Awaiting Change**, and **Awaiting
Vendor**. That single field is what lets a manager's dashboard answer "what
are we actually waiting on?" instead of just "how many tickets are stuck."

## Enforcing Resolved before Closed

Two implementation guardrails separate a mature Incident Management
configuration from a default one. First, **Resolved requires a Resolution
Code and Close Notes** — the platform should refuse the state change until
both are populated, which is exactly the kind of rule System Administration's
Data Policy lesson covered: a Data Policy can enforce a field as mandatory
only when a specific condition (State = Resolved) is true, rather than
making Resolution Code mandatory on every record, every state, always.
Second, a well-implemented instance **blocks the jump from New directly to
Closed** — every incident should pass through Resolved first, because
Resolved is where the resolution evidence lives. Skip it, and you get closed
incidents with no record of what fixed them.

## Key terms

| Term | Meaning |
|---|---|
| `task` table | The parent table incident, problem, change, and request item all extend |
| State model | The ordered set of values a record's lifecycle moves through: New → In Progress → On Hold → Resolved → Closed (or Canceled) |
| Hold Reason | A required field, set alongside State = On Hold, recording what the incident is actually waiting on |
| Data Policy | The mechanism used to make Resolution Code and Close Notes mandatory only when State = Resolved |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why does a
well-implemented instance refuse to let an incident move from New straight
to Closed, and what two fields does a Data Policy require before an
incident can move to Resolved?
