# Lesson 28 — Measuring Whether a Control Actually Reduced Risk

**Chapter 7 · Engineering Security Controls, Not Just Operating Them · Lesson 28 of 32**

## What you'll learn

- Why deploying a control successfully is not the same claim as confirming it reduced risk
- How to establish a real baseline before a control ships, so "after" has something honest to
  compare against
- What a drop in a specific incident or alert type after deployment actually tells you, versus what
  it doesn't
- How a compliance metric like Microsoft Secure Score fits into this picture — and why it's a
  signal, not proof by itself

## Shipped is not the same as worked

By Lesson 27, a control has been written as code, tested in audit or report-only mode, piloted, and
rolled out in waves without a business revolt. That's a real, hard-won engineering achievement — and
it still hasn't answered the one question that actually matters: did the organization get measurably
safer because of it? A control can be live, enforced, and completely stable while quietly doing
nothing to reduce the risk it was built for. Shipping and working are two different claims, and only
measurement tells you if the second one is true.

## Baseline before, or you have nothing to compare

You can't tell if something changed if you never recorded what "before" looked like. Before a new
MFA-enforcing Conditional Access policy ships, pull the actual numbers: how many account-compromise
alerts fired last month, how many legacy-authentication sign-ins were logged, what the relevant
Secure Score control's current point value is. Write those numbers down with a date, the same way
you'd commit the control itself to a repository — a baseline that only exists in someone's memory is
not a baseline.

## Measure the same thing again, after

```
Metric: "Risky sign-in" alerts tied to compromised credentials
  Before (30 days pre-rollout):   47
  After  (30 days post-rollout):  9

Metric: Legacy authentication sign-ins logged
  Before: 1,180/day
  After:  60/day
```

An 81% drop in risky sign-in alerts and a near-elimination of legacy auth traffic, measured on the
same window length, against the same baseline, is real evidence the MFA policy did what it was
built to do. A single week of good-looking numbers right after rollout, with no defined baseline to
compare against, is not evidence — it's an anecdote.

## Secure Score: a signal, not proof on its own

Microsoft Secure Score assigns point values to specific configured controls and rolls them into one
compliance percentage. A properly enforced Conditional Access MFA policy moves the score up because
Microsoft recognizes that specific control as implemented. That's useful corroboration — it confirms
the control is actually configured the way you think it is — but it measures configuration, not
outcomes. The incident and alert counts are what tell you whether the configuration actually reduced
real risk; Secure Score is the second signal that confirms the configuration behind it is intact.

## Key terms

| Term | Meaning |
|---|---|
| Baseline | Recorded metrics from before a control shipped, needed to measure any real change |
| Risky sign-in alert | An Azure AD / Entra sign-in event flagged for signs of credential compromise |
| Microsoft Secure Score | A point-based compliance metric reflecting which recommended controls are actually configured |
| Outcome metric | A measure of real-world effect (incidents, alerts) versus a measure of configuration state |

## Check yourself

You're ready for the Chapter 7 capstone when you can explain, without looking: why is a rising
Secure Score alone not sufficient proof that a control actually reduced risk, and what else do you
need alongside it?
