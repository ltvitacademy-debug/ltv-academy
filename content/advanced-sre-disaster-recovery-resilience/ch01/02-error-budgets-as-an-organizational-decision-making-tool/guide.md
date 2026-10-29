# Lesson 2 — Error Budgets as an Organizational Decision-Making Tool

**Chapter 1 · SRE Principles at Enterprise Scale · Lesson 2 of 4**

## What you'll learn

- A quick recap of what an error budget actually is, and why it's
  `1 - SLO`, not a separate measurement
- Why Google's SRE book treats the error budget as a policy
  mechanism, not just a number on a dashboard
- What a written error budget policy contains, and what happens when
  a team actually burns through theirs
- How fast-burn vs. slow-burn alerting changes the organizational
  response to the same underlying budget

## Error budget, briefly recapped

You already know the mechanics: if a service has a 99.9% availability
SLO over a 30-day window, its error budget is the remaining 0.1% —
roughly 43 minutes of allowed unavailability in that window. Every
failed request, every minute of downtime, every bit of degraded
performance that violates the SLI spends down that budget. That part
hasn't changed since you learned it. What changes at enterprise scale
is what the organization actually *does* with that number once it's
calculated.

## From metric to policy

The Google SRE book's central insight about error budgets is that
they're not meant to sit quietly on a dashboard — they're meant to
be the basis of a **negotiated agreement between product development
and SRE** about acceptable risk, decided in advance, before any
incident forces the conversation. Without an error budget, every
reliability-versus-velocity argument becomes a fresh political fight
in the moment: should we ship this risky feature today, or should we
slow down? With an error budget, that argument is settled ahead of
time by a simple rule: as long as the budget isn't exhausted, product
teams can ship features and take reasonable risks, because the
organization has already agreed that level of risk is acceptable. The
error budget turns an abstract tradeoff into an objective, shared
number both sides already agreed to respect.

## The policy that actually gets enforced

At enterprise scale, this agreement is written down as an **error
budget policy** — a real document, usually owned jointly by SRE
leadership and a product or engineering leader, that spells out
exactly what happens at each budget threshold. A typical policy
includes: the measurement window, the escalation path when budget
burn crosses a warning threshold, and — the part that makes this a
real mechanism rather than an aspiration — what happens when the
budget is **fully exhausted**. The common and well-documented
consequence: the team stops shipping new features and redirects its
engineering capacity entirely to reliability work until the budget
recovers. This isn't a suggestion or a guideline that gets quietly
ignored under deadline pressure — in organizations that take SRE
seriously, it's an enforced freeze, with the authority to say no to a
launch sitting with SRE, not with the team that wants to ship.

## Fast burn vs. slow burn

Not every bit of budget consumption deserves the same response, and
mature SRE practice distinguishes between **burn rate** scenarios.
A fast burn — the budget getting consumed in a matter of hours because
of an active outage — triggers an immediate page and incident
response; the organizational question is "stop the bleeding now."
A slow burn — a service quietly running a little worse than its SLO
for days, consuming budget steadily without any single dramatic
incident — triggers a very different conversation: not a page, but a
scheduled review, often surfaced through the same error budget policy,
asking whether the team needs to pause feature work and address
systemic reliability debt before the budget actually runs out.
Alerting on burn rate rather than on raw error counts is what lets an
organization tell these two situations apart and respond
proportionally instead of either over-paging on noise or under-
reacting to a slow bleed.

## Why this matters at hundreds of services

At the scale of one service, an exhausted error budget is a
conversation between two people. At the scale of hundreds of services
across dozens of teams, the error budget policy is what lets the
organization make that same decision consistently and fairly,
everywhere, without a VP having to personally adjudicate every feature
freeze. It's the mechanism that lets error budgets function as
genuine governance — a decision-making tool the whole company can
trust to behave the same way twice.

## Key terms

| Term | Meaning |
|---|---|
| Error budget | The allowed amount of unreliability under an SLO (`1 - SLO`), spent by every SLI violation in the measurement window |
| Error budget policy | A written, jointly-owned document spelling out what happens at each level of budget burn, including a feature freeze when the budget is exhausted |
| Feature freeze | The enforced consequence of a fully exhausted error budget — the team stops shipping new features and works only on reliability until the budget recovers |
| Burn rate | How fast a service is consuming its error budget; fast burn triggers paging/incident response, slow burn triggers a scheduled policy review |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does Google's SRE book describe the error budget as a negotiated
agreement rather than just a measurement, and what concretely happens
to a team's work when its error budget policy says the budget is
exhausted?
