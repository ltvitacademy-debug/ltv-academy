# Lesson 28 — Data Quality Issue Management

**Chapter 5 · Remediation and Monitoring · Lesson 28 of 30**

## What you'll learn

- Why a data quality issue needs a tracked lifecycle, not just a Slack
  message
- The fields a well-formed data quality issue record needs
- A standard issue status lifecycle: new, triaged, in progress,
  resolved, verified, closed
- How issue management closes the loop between monitoring (Lesson 26),
  scorecards (Lesson 27), and root cause work (Lesson 23)
- How to prioritize when more issues exist than anyone has time to fix

## Why issues need to be tracked, not just mentioned

An alert fires (Lesson 26), someone notices a red tile on a scorecard
(Lesson 27), or a stakeholder emails to say a report looks wrong. Every
one of those is the start of a **data quality issue** — and if the only
record of it is a Slack message or a hallway conversation, it has no
owner, no priority, no due date, and no way for anyone to check six
months later whether it actually got fixed. Issue management is what
turns "someone mentioned this once" into a trackable, closeable thing.

## What a well-formed issue record needs

A data quality issue, logged properly, carries more than a one-line
description:

| Field | Why it matters |
|---|---|
| Description | What's actually wrong, specifically — not "data is bad" |
| Affected table/field | Where the problem lives |
| Detected by | Which rule, monitor, or person found it (Lesson 26) |
| Severity | How much it matters — tied to Lesson 21's thresholds |
| Owner | Who's responsible for resolving it (often not the data team) |
| Root cause | Filled in once Lesson 23's analysis is done |
| Status | Where it is in the lifecycle (below) |
| Due date | When it needs to be resolved by, set from severity |

Skipping any of these turns the issue log into a list nobody can
actually act on — a "severity" column with nothing to compare it
against, or an "owner" column that's always blank, defeats the purpose.

## A standard issue lifecycle

Most issue-tracking processes — whether built in a dedicated data
quality tool, a general ticketing system, or a spreadsheet — use some
version of this lifecycle:

1. **New** — detected, not yet looked at
2. **Triaged** — severity assigned, owner identified
3. **In progress** — root cause work and/or remediation (Lessons 23–25)
   underway
4. **Resolved** — a fix has been applied
5. **Verified** — the original detection check has been re-run and
   confirmed passing (this is Lesson 25's "verify" stage, applied here)
6. **Closed** — done, with the root cause and fix documented for future
   reference

Jumping straight from "resolved" to "closed" without passing through
"verified" is the same shortcut Lesson 25 warned about — a fix that was
never actually confirmed is a liability, not a resolution.

## Closing the loop

Issue management is the record-keeping layer that ties the rest of
this chapter together:

- **Lesson 26's monitor** detects and creates the issue
- **Lesson 27's scorecard** shows the aggregate status (how many open
  issues, by severity) stakeholders actually see
- **Lesson 23's root cause analysis** fills in the "root cause" field
- **Lesson 24–25's cleansing and remediation** move the status from
  "in progress" to "resolved"
- The cycle closes only when **verified**, re-running the exact check
  that detected the issue in the first place

Without this record, a monitoring program just generates alerts into a
void — issue management is what makes those alerts accountable.

## Prioritizing when there's more than anyone can fix

Every real program eventually has more open issues than capacity to
fix them in parallel. Prioritization, not a first-in-first-out queue,
is what keeps the highest-impact issues from sitting behind low-stakes
ones:

- **Business impact first** — an issue affecting a regulatory report or
  customer-facing numbers outranks an internal-only dashboard
  discrepancy
- **Blast radius** — a root cause feeding ten downstream reports is
  worth fixing before ten unrelated single-report issues
- **Severity from Lesson 21** — issues already past a hard threshold
  outrank ones still in a "watch" status
- **Fixability** — a quick, well-understood fix sometimes belongs ahead
  of a bigger unknown, simply to reduce total open issues fast — a
  judgment call to make explicitly, not by accident

## Key terms

| Term | Meaning |
|---|---|
| Data quality issue | A tracked record of a specific, detected problem |
| Severity | How much an issue matters, tied to agreed thresholds |
| Issue lifecycle | The states an issue moves through from detection to closure |
| Verified | Confirmed, by re-running the original check, that a fix actually worked |

## Lab

1. Write a complete issue record (using the table of fields above) for
   this scenario: a monitor detected that 12% of transactions in the
   `payments` table have a `currency_code` that isn't in the ISO 4217
   reference list, up from under 1% a month ago.
2. Assign it a status from the six-stage lifecycle and justify why it's
   at that stage, not an earlier or later one.
3. Write one sentence on where this issue would rank in a prioritized
   queue against two other hypothetical open issues of your own
   invention, and why.

## Check yourself

Can you list the six stages of a standard issue lifecycle, in order,
and explain what distinguishes "resolved" from "verified"? Can you name
at least three factors that should influence how issues get
prioritized when there isn't time to fix everything at once?
