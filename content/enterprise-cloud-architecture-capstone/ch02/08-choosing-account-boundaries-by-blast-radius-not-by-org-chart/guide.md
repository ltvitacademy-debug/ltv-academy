# Lesson 8 — Choosing Account Boundaries by Blast Radius, Not by Org Chart

**Chapter 2 · Landing Zones and Multi-Account Design · Lesson 4 of 4**

## What you'll learn

- Why mirroring the org chart — one subscription or account per team
  or department — is the single most common multi-account design
  mistake
- What **blast radius** actually means as a design criterion, and how
  to use it to decide where an account or subscription boundary
  belongs
- The four real dimensions that should drive a boundary decision:
  security isolation, compliance scope, billing/cost isolation, and
  operational access
- How to turn that framework into the deciding logic behind the
  subscription vending or Account Factory pipeline you learned in
  Lessons 6 and 7

## The org chart is not a security boundary

Lessons 6 and 7 covered how to build account and subscription
boundaries — management groups, OUs, vending, Account Factory. Neither
one tells you where those boundaries should actually go, and the most
common answer teams reach for by default is wrong: mirror the org
chart. One subscription for the Marketing team, one for Engineering,
one for Finance, matching the company's reporting structure.

This fails for a structural reason, not a stylistic one: an org chart
describes **who reports to whom**, not **what should blow up
together**. Teams reorg constantly — a reorg that moves three
engineers from one department to another has nothing to do with
whether their workloads should still share a subscription, yet an
org-chart-mapped boundary forces someone to redraw the cloud structure
every time the people structure changes. Worse, a department-sized
boundary is usually the wrong size in both directions at once: too
coarse to separate a team's genuinely risky production database from
its low-stakes internal wiki (both end up in "Engineering"), and too
fine to let a security or compliance boundary span the teams that
actually need to share it.

## Blast radius: the actual question to ask

The right question isn't "which team owns this," it's: **if this one
account or subscription were fully compromised, misconfigured, or hit
a hard provider limit, what's the worst case?** That worst case is the
boundary's **blast radius**. A well-drawn boundary contains the
largest blast radius the organization is willing to tolerate from a
single incident — no smaller than necessary, because more boundaries
means more operational overhead, and no larger than that, because a
bigger boundary means a bigger worst case.

This reframes the decision from an org-chart lookup into an actual
risk calculation, and it explains why the same answer — isolate
production from everything else — shows up constantly in real
designs: a compromised credential or a bad deployment in a
non-production account should never be able to reach a production
database, no matter which team happens to own both.

## Four dimensions that actually drive the line

In practice, four separate concerns tend to decide where a real
boundary belongs, and they don't always point the same direction:

- **Security blast radius** — a compromised credential, an
  over-permissive role, or a misconfigured network path should be
  contained inside the boundary it started in. Production versus
  non-production is the boundary almost every real design draws first,
  because the two environments have fundamentally different risk
  tolerances.
- **Compliance/regulatory scope** — a workload subject to a specific
  regulatory framework needs its audit scope contained to the
  accounts or subscriptions that actually hold regulated data,
  instead of pulling every workload the company runs into the same
  audit. Isolating that workload into its own boundary keeps the audit
  small and specific.
- **Billing and cost isolation** — a workload with volatile or
  unpredictable cost (a large training job, a bursty batch process)
  can drown out visibility into a shared budget. A dedicated boundary
  gives it a dedicated budget and a clean chargeback line, independent
  of who owns it organizationally.
- **Operational access** — different workloads legitimately need
  different sets of people with different levels of access. A
  boundary drawn around "who needs access to this" is sometimes the
  right line even when the other three dimensions don't force one.

A boundary decision usually comes down to asking all four questions
about a given workload and drawing the line where the answers actually
diverge from whatever's already on the other side of an existing
boundary — not where the org chart happens to draw it.

## Two anti-patterns, same underlying mistake

**One account per team** mirrors the org chart directly, and inherits
every problem above: boundaries that have to be redrawn on every
reorg, and teams whose high-risk production workload and low-risk
internal tooling end up sharing one account because they share one
manager.

**One shared account for everything** is the opposite mistake with the
same root cause — ignoring blast radius entirely, just in the other
direction. A single mistake, misconfiguration, or compromised
credential anywhere in that account has a blast radius equal to the
entire company's cloud footprint.

## Wiring the framework into vending

Whatever boundary framework an organization settles on becomes the
actual decision logic inside the subscription vending pipeline from
Lesson 6 or the Account Factory request from Lesson 7 — the inputs a
requester provides (workload type, data sensitivity, expected cost
profile) determine which management group or OU a new subscription or
account lands in, automatically, instead of a human deciding case by
case which boundary a new workload belongs in.

## Key terms

| Term | Meaning |
|---|---|
| Blast radius | The worst-case damage if a given account or subscription is fully compromised, misconfigured, or hits a hard limit |
| Org-chart mirroring | The anti-pattern of mapping account/subscription boundaries 1:1 onto reporting structure instead of risk |
| Compliance scope | The set of accounts or subscriptions an audit has to examine; isolating regulated workloads keeps this scope small |
| Billing isolation | Giving a workload with volatile or unpredictable cost its own dedicated budget boundary |

## Check yourself

You've completed Chapter 2 when you can explain, without looking: why
is "which team owns this workload" the wrong first question to ask
when deciding whether it needs its own account or subscription, and
what question should replace it?
