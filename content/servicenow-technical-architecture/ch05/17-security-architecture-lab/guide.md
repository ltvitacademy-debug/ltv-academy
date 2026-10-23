# Lesson 17 — Security Architecture Lab

**Chapter 5 · Security Architecture · Lesson 17 of 32**

## What you'll learn

- How to apply Lessons 15 and 16 together against one real, overly
  restrictive security setup
- How to tell the difference between a field that's genuinely
  sensitive and a field that's merely been locked down by default
- How to redesign an ACL strategy that removes a real workaround
  instead of just forbidding it
- What a finished, defensible security-architecture recommendation
  looks like, end to end

## The scenario

A finance department's expense-management process runs on a custom
scoped application on top of ServiceNow. Three years ago, a security
review locked down the `expense_line_item` table with strict
field-level ACLs: every field — amount, cost center, vendor,
approval-chain notes, and a field that records **manual
approval-chain overrides** (a controller bypassing the normal
multi-step approval sequence for an urgent payment) — requires the
`finance_admin` role to read, a role with fewer than five people
assigned company-wide.

The finance analysts who actually process and reconcile expenses day
to day don't have `finance_admin`. For three years, they've worked
around this the way Lesson 16 predicted: every week, one of the five
`finance_admin` holders runs a full export of `expense_line_item` —
every field, every record — to a spreadsheet, and emails it to the
twelve-person analyst team so they can do their actual jobs. That
spreadsheet, not the ServiceNow table, is the real system analysts
use daily. It has no ACLs, no audit trail of who looked at what, and
it includes the approval-chain-override field, the single most
sensitive piece of data on the table, sitting in a dozen inboxes.

You're the Technical Architect asked to fix this. Walk through the
three real steps below.

## Step 1 — Separate "genuinely sensitive" from "locked down by default"

The first real task is going field by field and asking which fields
actually carry risk if an analyst sees them, versus which fields were
simply swept into the same blanket restriction three years ago
without that question being asked.

```
Field                      | Analysts need it daily? | Genuinely sensitive?
amount                     | Yes                      | No
cost center                | Yes                      | No
vendor                     | Yes                      | No
approval-chain notes       | Yes                      | No
approval-chain override    | No                       | Yes
```

Four of the five fields are both needed daily and carry no special
risk beyond ordinary expense data already covered by role-based
access to the application itself. Only the override field is
genuinely sensitive — it records who bypassed a control and why, and
exposing it broadly would undercut the control it's meant to audit.
The original lockdown treated all five identically; the real risk
profile doesn't.

## Step 2 — Redesign the ACL strategy to remove the reason to export

Following Lesson 15's point that this should be a strategy decision,
not a one-off fix to this one table, the redesign: create a
`finance_analyst` role, scoped specifically to `expense_line_item`,
with read access to amount, cost center, vendor, and approval-chain
notes — the four fields analysts actually use — and no access to the
override field. The override field keeps its existing field-level ACL
requiring `finance_admin`, unchanged.

This single change removes the reason the weekly full export exists.
Analysts can now see what they need directly in ServiceNow, with
proper per-user audit logging on every access, and the one field that
genuinely needs tight control stays tightly controlled — not loosened
along with everything else out of convenience.

## Step 3 — Retire the workaround and confirm the fix actually holds

Fixing the ACL doesn't automatically stop the habit of exporting;
that has to be retired deliberately. The architect's recommendation
includes: notifying the finance team that in-platform access now
covers their daily work, disabling the scheduled export job that
generated the spreadsheet, and — the real verification step — checking
back after two or three weeks to confirm analysts have actually
stopped requesting ad hoc exports from `finance_admin` holders. If a
new export request shows up, that's a signal some analyst still needs
a field the `finance_analyst` role doesn't cover, and the role
definition gets revisited rather than assuming the fix is finished
just because it shipped.

## The finished recommendation, in brief

1. **Classify**: four of five fields are frequently needed and not
   genuinely sensitive; one field (approval-chain override) is
   genuinely sensitive and stays restricted.
2. **Redesign**: a new `finance_analyst` role grants exactly the four
   needed fields; the override field's existing ACL is untouched.
3. **Retire and verify**: the weekly export job is shut off, and
   follow-up confirms the workaround actually stopped — not just that
   the new role was created.

This is Lesson 16's judgment made concrete: strict exactly where risk
justifies it, frictionless everywhere else — and the proof that it
worked is a workaround that disappears, not a policy memo that gets
ignored.

## Key terms

| Term | Meaning |
|---|---|
| Blanket restriction | Applying the same access control to every field on a table regardless of each field's actual risk level |
| Field-level ACL | An access control restricting read or write access to one specific field, independent of access to the record as a whole |
| Scoped role | A role created for a specific, narrow purpose (here, daily analyst access to four named fields) rather than a broad administrative role |
| Workaround retirement | Deliberately shutting down the process that enabled a workaround, and verifying it actually stopped, after fixing its root cause |

## Check yourself

Why does granting the `finance_analyst` role access to four of the
five fields, while leaving the approval-chain-override field under
`finance_admin`, satisfy Lesson 16's judgment better than either
leaving all five fields locked down or unlocking all five to stop the
export?
