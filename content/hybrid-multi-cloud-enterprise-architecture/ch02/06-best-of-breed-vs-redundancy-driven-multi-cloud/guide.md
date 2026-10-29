# Lesson 6 — Best-of-Breed vs. Redundancy-Driven Multi-Cloud

**Chapter 2 · Multi-Cloud Strategy · Lesson 2 of 4**

## What you'll learn

- The real difference between two shapes of multi-cloud that get
  talked about as if they were the same thing
- Why best-of-breed multi-cloud is usually affordable, and why
  redundancy-driven multi-cloud usually isn't
- How to tell which one a proposed workload actually needs, before
  you commit an architecture to either

## Two very different things both called "multi-cloud"

Lesson 5 established that real multi-cloud needs a concrete driver.
This lesson is about what happens once you have one — because "we're
going multi-cloud" can mean two architecturally and financially very
different commitments, and conflating them is one of the most common
mistakes in enterprise cloud strategy.

## Best-of-breed multi-cloud: one workload, one cloud each

**Best-of-breed multi-cloud** means picking the best available
service for each individual workload, and running that workload on
whichever provider offers it — while any other workload stays on
whichever provider suits it best. A company might run its core ERP
and identity estate on Azure because that's where its Microsoft
365 and Entra ID investment already lives, while routing one specific
machine-learning workload to a different provider because that
provider's model catalog or specialized ML tooling is a genuinely
better fit for that one use case.

The defining trait: **each individual workload still runs on exactly
one cloud.** Nothing is duplicated. The multi-cloud-ness lives at the
portfolio level — "our company's workloads are spread across two
providers" — not inside any single workload. The integration cost is
real but bounded: a network path between the two environments, a
shared identity layer (Chapter 4 covers this in depth), and whatever
data movement the ML workload needs from the ERP system. That's a
manageable, well-understood integration surface, not a doubling of
anything.

## Redundancy-driven multi-cloud: the same workload, twice

**Redundancy-driven multi-cloud** is a different thing entirely: it
means running the *same* workload, in parallel or in hot standby, on
two different providers, so that a failure of one provider doesn't
take the workload down. This is sometimes called active-active or
active-passive multi-cloud depending on whether both copies serve
real traffic simultaneously or one sits ready to take over.

This is the pattern people usually picture when they say "multi-cloud
resilience" — and it is genuinely more resilient against one specific
failure mode: a provider-wide outage, account suspension, or regional
disaster that a single-cloud multi-region design can't protect
against (because a single-cloud multi-region design is still
dependent on that one provider's global control plane staying up).
But it is also genuinely, substantially more expensive than
best-of-breed multi-cloud, because now you're not integrating two
different workloads across two clouds — you're building, testing,
deploying, and keeping in sync **two independent copies of the same
system**, each one a full implementation on a different provider's
services, with no guarantee the two providers' equivalent services
even behave identically under load.

## Why the cost difference is so large

With best-of-breed multi-cloud, you write and maintain one
implementation per workload. The "multi-cloud" part is a networking
and identity problem between two separately-owned systems — real
work, but a single, well-scoped integration layer.

With redundancy-driven multi-cloud, every change to the workload has
to be designed, built, and validated twice — once per provider — and
kept behaviorally equivalent, because a failover that lands on a
system with different behavior than the primary isn't actually
providing the resilience you paid for. That means duplicated
infrastructure code, duplicated test suites, duplicated on-call
runbooks, and ongoing data-synchronization engineering to keep both
copies current enough that a failover doesn't lose data. Lesson 7
breaks that operational cost down in detail; the short version is
that redundancy-driven multi-cloud is one of the most expensive
patterns in enterprise architecture, and it should be reserved for
the small number of workloads where an extended provider-level outage
is genuinely existential — not applied as a default resilience
pattern.

## Telling the two apart before you build

When a multi-cloud proposal comes in, ask directly: is this one
workload moving to a second provider because that provider does it
better (best-of-breed), or is this the same workload being built
twice so it survives a provider outage (redundancy-driven)? The
answer changes the entire cost and complexity profile of the project,
and a proposal that's vague about which one it is should be sent back
until it's specific.

## Key terms

| Term | Meaning |
|---|---|
| Best-of-breed multi-cloud | Each individual workload runs on exactly one cloud, chosen because that provider suits it best; the portfolio spans clouds, not any single workload |
| Redundancy-driven multi-cloud | The same workload is built and run on two providers in parallel or hot standby, specifically to survive a provider-level outage |
| Active-active | Both copies of a redundancy-driven workload serve real traffic simultaneously |
| Active-passive | One copy serves traffic while the other sits ready to take over on failover |

## Check yourself

You're ready for Lesson 7 when you can explain, in one sentence each,
why best-of-breed multi-cloud scales its cost with the number of
workloads involved, while redundancy-driven multi-cloud roughly
doubles the engineering cost of any single workload it's applied to.
