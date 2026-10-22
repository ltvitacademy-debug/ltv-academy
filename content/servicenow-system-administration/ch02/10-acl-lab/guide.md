# Lesson 10 — ACL Lab

**Chapter 2 · Access Control Lists (ACLs) · Lesson 10 of 36**

## What you'll learn

- How to work a real access-denied report start to finish, using Lessons 6-9
- How to tell a table-level problem from a field-level problem before touching anything
- How to read a Security Debugger trace to find the exact failing ACL
- How to decide whether a role gap or a script condition is the real cause
- When elevating to `security_admin` actually becomes necessary

## The ticket

A fulfiller named Dana opens a ticket: "I can open Incidents assigned
to my team just fine, and I can edit most fields, but I can't change
the Assignment group field — it's greyed out. It worked for me on
other tickets last month." Dana holds the `itil` role. Your job is to
work this the same way you'd work any access-denied report, using the
order of operations from Lesson 9.

## Step 1 — Classify it: table-level or field-level?

Dana can open the record and edit most fields, so the table-level
write ACL (`incident.write`) is clearly passing — if it weren't, she
couldn't edit anything on the record at all, per Lesson 6's rule that
table-level access is a prerequisite for field access. The symptom is
isolated to one specific field, `assignment_group`, which immediately
points at a field-level ACL: `incident.assignment_group`. That's
exactly the pattern from Lesson 7 — table-level access granted, one
field blocked independently on top of it.

## Step 2 — Reproduce it with the Security Debugger

Rather than guessing, turn on Debug Security Rules and either
impersonate Dana or have her reload the same Incident with the
debugger active. The security log for that page load shows
`incident.write` passing (role: `itil`), and then, lower in the trace,
`incident.assignment_group` failing. The debugger names the exact ACL
and the operation — this is the field-level write ACL, not a read
problem, which matches what Dana described: she can *see* the field,
just not edit it.

## Step 3 — Open the failing ACL and read its ingredients

Opening `incident.assignment_group` (write) shows, per Lesson 8's
three ingredients:

- **Requires role**: empty — no role requirement listed at all.
- **Condition**: none.
- **Script**: present. It checks whether the current user is a
  member of the group currently in `current.assignment_group`, and
  only sets `answer = true` if they are.

That script explains everything. Dana holds `itil`, which is why the
table-level write ACL passes — but this field-level ACL doesn't care
about roles at all; it cares whether she's a *member of whichever
group the record is currently assigned to*. Last month, Dana's ticket
happened to be assigned to her own group, so the script passed. This
ticket is assigned to a different group she isn't a member of, so the
script now returns `answer = false` — which is exactly why it "used to
work" and now doesn't, even though nothing about her role changed.

## Step 4 — Confirm, don't assume

Check the actual Incident's `assignment_group` value and check Dana's
real group memberships on `sys_user_grmember`. Confirming both,
rather than trusting her memory of "it worked before," verifies the
script's logic matches reality: she is not currently a member of the
group this specific record is assigned to, so the ACL script is
correctly returning false.

## Step 5 — Decide whether anything needs to change

This isn't a bug — the field-level ACL is doing exactly what it was
written to do: only members of the current assignment group can
reassign it. If the real requirement is "any `itil` user can reassign
any incident," the ACL's script needs to change, which means editing
`sys_security_acl` — and that requires Elevating Roles into
`security_admin` first, per Lesson 9, precisely because that edit
touches the record governing this very permission. If the business
rule actually is "only the current group can reassign," then no
change is needed at all — you simply explain the real behavior to
Dana, and she requests reassignment through her team lead or the
record's assigned group instead.

## Key terms

| Term | Meaning |
|---|---|
| Classify first | Decide table-level vs. field-level from the symptom before opening anything |
| `incident.write` | Table-level ACL — passing explains why Dana can edit most fields |
| `incident.assignment_group` | Field-level ACL — the one actually blocking this edit |
| Group-membership script | A script-based condition checking membership against `current.assignment_group` |
| Edit vs. explain | Only elevate and edit the ACL if the business requirement has actually changed |

## Check yourself

Why did the exact same ACL pass for Dana last month and fail for her
this month, with no change to her role at all? Walk through which
ingredient of the ACL is responsible, and why a role-based fix alone
wouldn't address it.
