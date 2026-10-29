# Lesson 30 — Lab: Writing the ADRs and DR Plan for Your Design

**Chapter 8 · Capstone: Designing and Defending an Enterprise Cloud Architecture · Lesson 30 of 32**

## What you'll learn

- How to write a real ADR for the three biggest decisions in Lesson 29's landing zone, in the
  Context / Options / Decision / Consequences format Lesson 22 taught
- How to set RTO and RPO targets per workload tier instead of one number for the whole
  organization, the way Lesson 14 argued for
- Why a disaster recovery plan that only covers application tiers is missing the one dependency
  every single tier shares
- How to schedule a DR test that actually proves the plan, instead of one that only reads well on
  paper

## The same design, now documented

Lesson 29 designed Harlow Creek Logistics' landing zone and network. A design that only exists as
a set of decisions someone remembers is a design that erodes the first time a new engineer
questions why something was built a certain way. This lesson writes that design down as ADRs, then
builds the disaster recovery plan on top of it.

## ADR-001: Hub-and-spoke over a flat shared network

```
Title: ADR-001 — Hub-and-spoke topology for HCL's Azure network
Status: Accepted

Context
  HCL's three product teams need isolated networks that can still reach shared services
  (firewall, DNS, VPN/ExpressRoute) without each team re-deploying its own copy.

Options considered
  A. One flat shared VNet for all teams, segmented by subnet
  B. Hub-and-spoke: one hub for shared services, one spoke VNet per team/environment
  C. Fully isolated VNets per team with no shared services at all

Decision
  Option B. Each spoke peers to the hub; shared services are deployed once in the hub
  and consumed by every spoke through peering and forced-tunnel UDRs.

Consequences
  + Shared services (firewall, DNS) are deployed and patched once, not six times
  + A misconfigured spoke can't directly reach another spoke without passing through
    the firewall, where it's inspected
  - The hub becomes a dependency every spoke relies on for egress and name resolution
  - Hub capacity (firewall throughput, gateway bandwidth) has to be planned for all
    spokes' combined traffic, not just one team's
```

The "Consequences" section's second bullet point is the one worth sitting with — it's the honest
cost of the decision, not a problem to hide. It becomes directly relevant two sections down.

## ADR-002: Subscription-per-team-per-environment over a shared subscription

```
Title: ADR-002 — Subscription boundaries by blast radius
Status: Accepted

Context
  Three product teams, each needing prod and non-prod isolation, plus platform-owned
  shared infrastructure.

Options considered
  A. One subscription per team (prod and non-prod share a subscription)
  B. One subscription per team per environment (eight total, per Lesson 29)
  C. One subscription for the whole org

Decision
  Option B, following the blast-radius principle from Lesson 8 rather than mapping
  subscriptions to the org chart.

Consequences
  + A non-prod mistake in one team can never reach that same team's production resources
  + Cost and quota reporting is already segmented by team and environment with no extra tagging
  - Eight subscriptions means eight sets of policy assignments to verify, not one
```

## ADR-003: The hub's shared services get their own RTO and RPO

```
Title: ADR-003 — Shared network services are a DR-in-scope tier, not "just networking"
Status: Accepted

Context
  Every spoke depends on the hub for egress (via the firewall) and name resolution
  (via the DNS Private Resolver). A DR plan that sets RTO/RPO for application tiers
  but says nothing about the hub leaves that dependency undocumented.

Options considered
  A. Treat the hub as infrastructure with no formal RTO/RPO of its own
  B. Give the hub's shared services an explicit RTO/RPO at least as strict as the
     strictest spoke that depends on it, and a secondary-region deployment to match

Decision
  Option B. The hub's firewall, gateway, and DNS Private Resolver are deployed in
  both the primary region (East US 2) and the secondary region (Central US), with
  their own documented RTO/RPO.

Consequences
  + No spoke can be "recovered" while silently depending on a hub that has no DR plan
  - Doubles the shared-services deployment and ongoing cost
```

ADR-003 exists because the gap it closes is exactly the kind of thing a review board can miss —
Lesson 31 shows a case where a different organization didn't write this ADR, and it cost them.

## Setting RTO and RPO by tier, not by one number

Lesson 14 argued against a single organization-wide RTO/RPO. HCL's three product teams don't carry
equal risk if they're down, so they don't get equal targets:

| Tier | RTO | RPO | Reasoning |
|---|---|---|---|
| Customer Portal (prod) | 1 hour | 15 minutes | Public-facing; every minute down is visible to customers |
| Dispatch (prod) | 4 hours | 1 hour | Business-critical but has manual fallback procedures |
| Fleet Analytics (prod) | 24 hours | 24 hours | Internal reporting; stale data is tolerable for a day |
| Shared hub services (ADR-003) | 1 hour | 15 minutes | Must meet or beat the strictest tier that depends on it |

The hub's own target is set to match Customer Portal's, not Fleet Analytics' — a shared dependency
can never recover slower than the fastest tier counting on it, or that tier's own target is
meaningless.

## The DR pattern: active-passive, Central US as the secondary region

HCL adopts active-passive (Lesson 15's comparison) rather than active-active — the cost of running
every tier live in two regions simultaneously isn't justified by Fleet Analytics' and Dispatch's
RTO targets, even though Customer Portal's tighter target gets the most attention during failover
drills.

## Scheduling a DR test that actually proves it

Lesson 16 was explicit: a DR plan that's never tested is a guess. HCL schedules a quarterly game
day with three required checks, in order:

1. Fail over Customer Portal to Central US and confirm the 1-hour RTO is met
2. Fail over the hub's shared services and confirm spokes in Central US can still reach the
   internet and resolve internal DNS — not just that the firewall resource exists
3. Fail back to East US 2 and confirm no configuration drift was introduced during the test

Step 2 is the one most DR plans skip, because it's tempting to assume "the network will just
work" once the application tier fails over. It won't, unless the hub was actually deployed and
tested in the secondary region too.

## Key terms

| Term | Meaning |
|---|---|
| ADR | A written record of Context, Options considered, Decision, and Consequences for one architecture decision |
| Tiered RTO/RPO | Setting recovery targets per workload based on its actual business impact, not one number for everything |
| Shared-dependency DR | The principle that a service everything else depends on must recover at least as fast as the strictest thing depending on it |
| DR game day | A scheduled, real failover test — the only way to know a DR plan works instead of just reads well |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does ADR-003 set the hub's
RTO/RPO to match Customer Portal's tightest target instead of an average across all three teams,
and what would a DR test miss if it only validated Step 1 above and skipped Step 2?
