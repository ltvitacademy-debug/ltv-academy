# Lesson 4 — ACL Evaluation Order in Depth

**Chapter 2 · Advanced ACL Design · Lesson 4 of 24**

## What you'll learn

- A one-sentence recap of the AND rule you already know from Course 3
- The real precedence rule when ACLs exist at more than one level of a table hierarchy
- Why a `task`-level ACL applies to Incident, Problem, and Change — until it doesn't
- The exact two-ACL check an admin has to run before saying "this ACL isn't working"
- How to read `sys_security_acl` for both the base table and the extended table at once

## Quick recap

You already know the headline rule from Course 3: every ACL that applies to an access
attempt must pass — it's an AND across ACLs, never an OR. This lesson assumes that rule
and goes one level deeper: what happens when more than one ACL, defined at different
levels of a table's inheritance hierarchy, could apply to the same record?

## Tables inherit ACLs the same way they inherit fields

`task` is a base table. `incident`, `problem`, and `change_request` all extend it — they
inherit `task`'s fields, and they also inherit `task`'s ACLs. Define a single ACL on
`task` for the `read` operation, and that one ACL governs read access on Incident,
Problem, and Change records simultaneously, without you ever touching those tables'
own ACL lists. That's the whole point of defining security at the base-table level:
write the rule once, and every table beneath it inherits it automatically, including
tables created later that extend `task` in the future.

```javascript
// ACL: table = task, operation = read, requires role: itil
// Governs Incident, Problem, and Change read access — unless overridden below
answer = gs.hasRole('itil');
```

## The real precedence rule: most specific ACL wins

Here's the part that goes beyond Course 3. Inheritance is not absolute — it's a
*default* that a more specific ACL can override. If an ACL also exists directly on
`incident` for the same operation, the platform uses the `incident`-level ACL for
Incident records instead of the `task`-level one. It does not run both and AND them
together the way multiple ACLs at the *same* level do. For a given table and
operation, ServiceNow looks for the closest, most specific match in the inheritance
chain — the exact table first, then its parent, then its parent's parent, up to
`task` — and stops at the first level where a matching ACL exists.

```javascript
// ACL: table = incident, operation = read, requires role: itil
// More specific than the task-level ACL above — for Incident reads, this one runs instead
answer = gs.hasRole('itil') || current.caller_id == gs.getUserID();
```

With both ACLs in place, Problem and Change still fall back to the `task`-level rule
(no more specific ACL exists for them), while Incident now uses its own, more
permissive rule that also lets the caller see their own ticket. The `task`-level ACL
isn't bypassed globally — it's overridden only for the one table that has its own
match.

## The real-world confusion this causes

This is a genuinely common source of "why doesn't this ACL seem to be working." An
admin edits the `task`-level read ACL, tests it against an Incident, and sees no
change — because Incident was never using that ACL in the first place; it has its own,
more specific one. The fix isn't to debug the script harder. It's to check **both**
levels before concluding anything: query `sys_security_acl` for `table = task` and for
`table = incident`, both filtered to `operation = read`, and confirm which one is
actually in effect for the table you're troubleshooting. Skipping this two-level check
is the single most common reason admins misdiagnose ACL behavior on extended tables.

## Key terms

| Term | Meaning |
|---|---|
| Table inheritance | Extended tables (Incident, Problem, Change) inherit fields and ACLs from their base table (`task`) |
| Most specific ACL wins | When ACLs exist at more than one level for the same operation, the one on the exact table overrides the inherited one |
| Base-table ACL | An ACL defined on `task` (or another parent table) that governs every table extending it, by default |
| Override, not AND | A more specific ACL replaces the inherited one for that table — it does not combine with it |

## Check yourself

A `task`-level read ACL requires the `itil` role. No ACL exists directly on
`problem`, but one does exist directly on `incident` requiring `itil_admin` instead.
Which role does a user need to read a Problem record, and which role to read an
Incident record? Explain which ACL governs each, and why.
