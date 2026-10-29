# Lesson 27 — Rolling Out a Control Without Breaking the Business

**Chapter 7 · Engineering Security Controls, Not Just Operating Them · Lesson 27 of 32**

## What you'll learn

- Why a control that's technically correct can still create real business pressure to roll it back
  or carve exceptions into it
- How communicating a change before it lands reduces the number of surprised, angry help-desk
  tickets on day one
- Why a clear exception and escalation path keeps a legitimate blocked workflow from turning into
  pressure to kill the whole control
- How a phased rollout — expanding the pilot group from Lesson 26 in waves — manages that risk
  directly

## Correct isn't the same as survivable

A Conditional Access policy that correctly blocks legacy authentication protocols is doing exactly
what it was designed to do. If it also blocks the scanner-to-email workflow the warehouse team has
used for six years, "technically correct" won't save it — someone with enough authority will demand
it be rolled back by end of day, and once a control gets rolled back under pressure, it's much harder
to re-introduce later. The control itself passed every test in Lesson 26. What it didn't survive was
contact with a real business process nobody mapped first.

## Tell people before it happens, not after it breaks

The single cheapest risk-reduction step is communication that happens *before* the change lands:
an email or Teams message to affected groups a week ahead, stating what's changing, when, and who
to contact if something breaks. A help desk that already knows "Conditional Access change rolls out
Tuesday, here's the ticket queue for exceptions" handles the first failure calmly. A help desk
blindsided by the same failure escalates it as an outage, and an outage gets a control reverted fast.

## Give people a way out that doesn't require killing the control

Every rollout needs a documented **exception path**: a specific group, a specific request process,
a specific person who can approve a time-limited exclusion for a legitimate workflow the policy
didn't anticipate. Without that path, the only lever anyone has is "turn the whole policy off" —
which is exactly the outcome that undermines the control for everyone else, not just the one team
with the problem.

```
# Exception path, not a policy rollback
1. Warehouse team flags the scanner-to-email break
2. Security adds the scanner service account to the "CA-Exception-Reviewed" group
   (time-boxed, logged, reviewed again in 30 days)
3. The Conditional Access policy itself is never disabled
```

## Expand in waves, not all at once

Lesson 26's pilot group doesn't jump straight to "everyone." It expands in planned waves — a second,
larger group, then a third, then the remainder — with time between waves to catch issues the first
pilot missed. Each wave is smaller blast radius than the last jump, and each one gives the exception
process a chance to work before the next group hits the same issue.

## Key terms

| Term | Meaning |
|---|---|
| Rollback pressure | Business pushback strong enough to force a technically correct control to be reverted |
| Change communication | Telling affected users and the help desk about a rollout before it happens, not after |
| Exception path | A documented, logged, time-limited way to exclude a legitimate workflow without disabling the whole control |
| Phased rollout | Expanding enforcement to larger groups in planned waves instead of all at once |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why does a documented exception
path protect a control better than simply disabling it for the one team that had a problem?
