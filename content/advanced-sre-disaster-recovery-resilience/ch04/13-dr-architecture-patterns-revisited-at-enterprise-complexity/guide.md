# Lesson 13 — DR Architecture Patterns Revisited at Enterprise Complexity

**Chapter 4 · Advanced Disaster Recovery Architecture · Lesson 13 of 32**

## What you'll learn

- Why active-active and active-passive, the two patterns you already
  know from the enterprise architecture capstone, behave differently
  once you're protecting dozens of interdependent services instead of
  one workload
- Why a real enterprise doesn't pick one pattern for "the system" —
  it mixes patterns by workload tier, driven by each tier's own
  RTO/RPO targets
- What a **failover domain** is, and why services that depend on each
  other have to fail over together, not independently
- Why a service's real-world RTO is bounded by the slowest dependency
  it calls during a failover, not by its own standby tier

## The patterns haven't changed — the scale has

If you took the enterprise cloud architecture capstone, you already
know the two core multi-region patterns cold. **Active-passive** runs
one region live and keeps a standby — cold, warm, or hot — ready to
take over. **Active-active** runs both regions live simultaneously
behind global traffic distribution, trading replication-conflict
complexity for a much better RTO. And you know how to choose between
them: not by preference, but by letting a workload's RTO and RPO
targets decide, because tighter targets cost more in standing
infrastructure and replication complexity whether or not a disaster
ever happens.

None of that reasoning is wrong. It was just built around a single
workload with a single RTO/RPO target. At enterprise complexity, you
are not protecting "the application" — you're protecting dozens of
interdependent services, each potentially owned by a different team,
each with its own data store, and each capable of calling several of
the others during normal operation. The coordination problem that
creates doesn't scale linearly with the number of services. It
multiplies, because now the question isn't just "what pattern does
this service need," it's "what happens when this service's pattern
and its dependency's pattern disagree about what just happened."

## Real enterprises mix patterns by tier, not by preference

The first real-world consequence of that scale is that no enterprise
runs one DR pattern for its entire estate. Running everything
active-active because it sounds the most resilient would mean paying
for two complete, continuously synchronized production environments
for a reporting dashboard that could tolerate a day of downtime
without anyone outside the team noticing. Real practice assigns a
tier to each workload — the same RTO/RPO-per-tier approach from the
capstone course, now applied service by service instead of
application by application — and lets each tier's targets dictate its
pattern:

- **Tier 0** (a payments ledger, an order-taking path): RTO in
  seconds, RPO near zero → active-active is often the only pattern
  that qualifies.
- **Tier 1** (checkout, pricing): RTO in minutes, RPO under a minute →
  a warm standby, active-passive, meets this without the
  synchronization overhead active-active would add.
- **Tier 2** (search, recommendations): RTO in hours → a cold,
  backup-restore posture is genuinely sufficient.
- **Tier 3** (internal reporting): RTO in a day or more → no standing
  DR infrastructure at all.

That's a deliberate mix, not an inconsistency. Each service gets the
pattern its own numbers justify.

## Where the real complexity shows up: the boundary between tiers

Mixing patterns by tier is straightforward on a slide. It gets hard
at the point where a service in one tier calls a service in another
tier — which, at enterprise scale, is most of the time. Say checkout
is active-active across two regions, and it calls a pricing service
that's active-passive with one primary region. A regional failure
takes down both. Checkout, being active-active, is already serving
customers fine from the surviving region — its own failover is
essentially instant. But if the pricing service's standby hasn't
finished promoting yet, checkout is now making calls into a region
that no longer exists. Checkout "failed over" successfully by every
metric that only measures checkout, and the checkout flow is still
broken for every customer who reaches it.

This is why enterprise DR architecture introduces the idea of a
**failover domain**: a set of services, grouped not by team or by
codebase but by real dependency, that have to move together during a
regional event rather than independently. A service's effective RTO
is bounded by the slowest dependency it actually calls during
failover — not by the standby tier of the service itself. Getting that
wrong is the single most common way an enterprise DR plan looks
correct on paper and fails the first time it's exercised for real.

## Cross-cutting dependencies make this worse before it gets better

There's one more layer: some dependencies aren't part of any one
service's call graph at all — DNS, identity and IAM, secrets
management, the config and service-mesh control plane. Every
service's failover, in every tier, routes through these shared
systems. If the DR plan protects dozens of services individually but
never asks whether DNS or the identity provider itself has a DR
posture, every one of those individual plans inherits that single
point of failure silently. Resilience at enterprise scale is as much
about the handful of systems everything else depends on as it is
about the services with the biggest customer footprint.

## Key terms

| Term | Meaning |
|---|---|
| Failover domain | A set of services grouped by real dependency that must fail over together, not independently, during a regional event |
| Tiered DR posture | Assigning active-active, warm standby, cold, or no DR capacity per workload tier, driven by that tier's own RTO/RPO |
| Effective RTO | A service's real recovery time, bounded by the slowest dependency it calls during failover — not its own standby tier |
| Cross-cutting dependency | Shared infrastructure (DNS, IAM, secrets, service mesh control plane) that every service's failover routes through regardless of tier |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
can an active-active service still fail during a regional event even
though its own failover worked correctly, and what does that tell you
about where a service's real RTO actually comes from?
