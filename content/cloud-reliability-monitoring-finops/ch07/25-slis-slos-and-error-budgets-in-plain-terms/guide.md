# Lesson 25 — SLIs, SLOs, and Error Budgets in Plain Terms

**Chapter 7 · Site Reliability Engineering Fundamentals · Lesson 1 of 4**

## What you'll learn

- What an **SLI** actually is: one measured, user-facing number, not a
  vague feeling of "the app seems fine"
- What an **SLO** is: a target drawn on top of an SLI, with a time
  window attached
- What an **error budget** is, and why it's really a budget for
  *unreliability* that engineering is allowed to spend
- Why an error budget is the thing that turns "is this reliable
  enough" from a gut-feel argument into a number everyone can look at

## The problem SRE is actually solving

Every team that ships a service eventually has the same argument:
engineering wants to move fast and ship features; someone else — a
support lead, a VP, a customer — wants the thing to never go down.
Without a number to anchor that argument, it never actually resolves;
it just repeats every time there's an incident. Site Reliability
Engineering, as Google's SRE book formalized it, exists to replace
that argument with math. The tool it uses is a chain of three ideas:
the **SLI**, the **SLO**, and the **error budget**.

## SLI: the thing you actually measure

A **Service Level Indicator** is a single, concrete, measured metric
that reflects how well a service is doing from the user's point of
view. Not "server CPU" — that's an internal health signal, not a user
experience. A good SLI answers a question a real user would recognize:

- **Availability** — what fraction of requests got a successful
  response? `successful_requests / total_requests`
- **Latency** — what fraction of requests completed faster than some
  threshold? e.g. "percent of requests under 300ms"
- **Durability** — for stored data, what fraction remains retrievable
  over time?
- **Freshness** — for a pipeline or cache, how far behind real-time is
  the data a user sees?

Notice each of these is a ratio or percentage, measured continuously,
from signals you already have from the metrics and logs work earlier
in this course. An SLI is not an opinion. It's a number you can plot
on a graph right now.

## SLO: the target drawn on top of the SLI

A **Service Level Objective** takes that SLI and attaches a target and
a time window: "99.9% of requests succeed, measured over a rolling 30
days." That's it — an SLO is just a goal line on the SLI's chart. The
window matters as much as the percentage: 99.9% measured over 30 days
behaves very differently from 99.9% measured over a single day,
because a short, sharp outage that would blow a daily SLO barely dents
a 30-day one.

It's worth being precise about one more distinction the SRE book
insists on: an SLO is an *internal* engineering target. An **SLA**
(Service Level Agreement) is the external, contractual promise to
customers — usually looser than the internal SLO on purpose, so there's
margin to notice and fix a problem before it breaches a paying
customer's contract and triggers a penalty.

## Error budget: the unreliability you're allowed to spend

This is the idea that makes the whole framework useful instead of just
descriptive. If your SLO is 99.9% availability, then by definition
you're *allowed* 0.1% unreliability. That 0.1% is your **error
budget** — over a 30-day window, 0.1% works out to roughly 43 minutes
of allowed downtime or failed requests.

```
Error budget = 100% - SLO target

SLO = 99.9% over 30 days
Error budget = 0.1% of 30 days ≈ 43 minutes

SLO = 99.95% over 30 days
Error budget = 0.05% of 30 days ≈ 21 minutes
```

The error budget reframes reliability as a resource to be spent
deliberately, not a score to maximize blindly. A team that has spent
none of its budget this month has room to take real risk — ship a
risky migration, roll out a big feature, try a more aggressive
deploy cadence. A team that has already burned 90% of its budget on
an early-month outage has almost no room left; the rational move is to
slow down, freeze non-essential changes, and spend the rest of the
month hardening instead of shipping. Critically, that's a decision the
data makes for you — nobody has to argue about whether it's "safe
enough" to deploy, because the budget either has room or it doesn't.

## Why 100% is never the target

A target of 100% reliability is a trap, not a goal, for two reasons.
First, it's not actually achievable — networks drop packets, hardware
fails, dependencies have their own outages, and chasing the last
sliver of nines costs disproportionately more engineering effort for
each additional nine. Second, and more subtly: a service with zero
error budget has zero room to take any risk at all, which means zero
room to deploy anything, ever, because every deploy carries some
nonzero chance of causing a brief blip. An error budget isn't a
concession to laziness — it's what makes shipping software possible
in the first place.

## Key terms

| Term | Meaning |
|---|---|
| SLI (Service Level Indicator) | A single measured, user-facing metric — availability, latency, durability, or freshness — expressed as a ratio or percentage |
| SLO (Service Level Objective) | A target value for an SLI plus a time window, e.g. "99.9% over 30 days"; the internal engineering goal |
| SLA (Service Level Agreement) | The external, contractual reliability promise to customers, usually looser than the internal SLO, with financial penalties for breach |
| Error budget | 100% minus the SLO target — the amount of unreliability a team is allowed to "spend" before it must slow down and prioritize reliability work |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
is an SLO measured over 99.9% *over 30 days* a meaningfully different
commitment from 99.9% measured over a single day, and why does a
service with a 0% error budget actually struggle to ship anything at
all?
