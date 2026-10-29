# Lesson 15 — Active-Active vs. Active-Passive Multi-Region Patterns

**Chapter 4 · Resilience and Disaster Recovery · Lesson 15 of 32**

## What you'll learn

- What active-active and active-passive multi-region patterns each
  actually mean, in terms of where live traffic is served from
- The real cost of active-active: data synchronization complexity and
  running full duplicate capacity, continuously
- The real cost of active-passive: slower failover and a replication-lag
  window where recent writes can be lost
- How to pick between them using the RTO and RPO targets from Lesson 14,
  instead of picking a pattern first and justifying it afterward

## Active-passive: one region leads, one waits

In an **active-passive** pattern, one region — the primary — serves all
live production traffic. The second region is a standby that isn't
serving user traffic at all. Data replicates one direction, primary to
secondary, continuously or on a schedule depending on the RPO target.

The standby itself can be provisioned at different tiers:

- **Cold / pilot light** — only the data layer is kept current;
  compute is provisioned from Infrastructure as Code only after a
  disaster is declared. Cheapest, slowest to fail over.
- **Warm standby** — the full stack already exists in the secondary
  region at reduced capacity, and gets scaled up when failover happens.
- **Hot standby** — the secondary region runs at full capacity already,
  just not receiving traffic, so failover is close to instant once
  traffic is redirected.

What makes active-passive attractive is simplicity: replication is
one-directional, so there's no risk of two regions disagreeing about
the current state of the same record. What makes it slower is exactly
what you'd expect — failing over means detecting the outage, promoting
the secondary's data store to primary, redirecting traffic (often via
DNS, which has its own propagation delay), and, for anything short of a
hot standby, scaling up compute that wasn't running yet. And because
replication to the standby is rarely perfectly synchronous, there is
almost always a small window of in-flight writes that existed in the
primary but never made it to the secondary before the failure — that
window is your real-world RPO, whether or not anyone wrote it down.

## Active-active: both regions are live, all the time

In an **active-active** pattern, both regions serve live production
traffic simultaneously, with some form of global traffic distribution
— DNS-based routing, a global load balancer, or anycast — sending each
request to whichever region is appropriate. If one region fails, the
others simply absorb its traffic; there's no "promote the standby" step
because there was no standby.

That gets you close to the best possible RTO — failover is really just
rerouting traffic, which can happen in seconds — and it eliminates the
replication-lag RPO gap for reads, since both regions' data stores are
continuously kept in sync with each other, not just one feeding the
other. But it introduces a problem active-passive never has to solve:
if the same record can be written in either region, what happens when
it's written in both regions at nearly the same time? That's a real
distributed-systems problem — conflict resolution, multi-master
replication, or deliberately partitioning which records each region is
allowed to write, and it adds genuine engineering complexity that
doesn't go away just because the infrastructure diagram looks
symmetrical.

Active-active also costs more by design: both regions run full
production capacity all the time, not "capacity that mostly sits idle
until needed." You are paying for two complete production environments
simultaneously, continuously, whether or not a failure ever happens.

## Choosing with RTO and RPO, not with preference

Lesson 14 already supplies the deciding inputs. If a workload's RTO is
measured in hours and its RPO in tens of minutes, a warm active-passive
standby meets both targets at a fraction of active-active's running
cost — there's no reason to pay for synchronized dual-region capacity
you don't need. If the RTO is seconds and the RPO is effectively zero,
active-passive cannot meet that bar no matter which standby tier you
pick, because DNS propagation and data-store promotion alone will blow
past a seconds-level RTO. In that case active-active, with its
synchronization complexity and its cost, is the only pattern that
actually satisfies the requirement — which is also exactly why it
should be reserved for the workloads that genuinely need it, not
applied by default.

## Key terms

| Term | Meaning |
|---|---|
| Active-passive | One region serves live traffic; the other is a standby (cold, warm, or hot) that takes over on failover |
| Active-active | Both regions serve live traffic simultaneously, behind global traffic distribution |
| Replication lag | The gap between when data is written to the primary and when it reaches the secondary — the real-world RPO in an active-passive design |
| Conflict resolution | The logic needed when the same record could be written in two regions at once — a problem unique to active-active |
| Global traffic distribution | DNS-based routing, a global load balancer, or anycast — how active-active sends each request to an appropriate region |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
does active-active achieve a better RTO and a smaller replication-lag
RPO gap than active-passive, and what specific new engineering problem
does it introduce in exchange that active-passive never has to solve?
