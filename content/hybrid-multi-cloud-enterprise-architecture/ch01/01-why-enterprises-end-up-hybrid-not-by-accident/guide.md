# Lesson 1 — Why Enterprises End Up Hybrid, Not by Accident

**Chapter 1 · Hybrid Cloud Architecture Fundamentals · Lesson 1 of 4**

## What you'll learn

- The four real forces that push an enterprise toward a hybrid
  architecture, instead of a clean cloud-only estate
- Why "we chose hybrid" is usually a description of how the
  environment actually got built, not a strategy decided on day one
- What a hybrid environment looks like when it happens by accident
  versus when it's deliberately designed and governed
- Why this course treats hybrid as the normal, permanent condition of
  enterprise IT — not a waypoint on the way to "finishing" a migration

## Hybrid is the default, not the exception

Every enterprise architecture course eventually has to deal with a
fact that the marketing slides from cloud vendors tend to skip over:
almost no large enterprise is purely in the cloud. Walk into any
Fortune 1000 IT shop and you'll find Azure or AWS workloads sitting
next to a data center that's been running since before either cloud
existed, connected by VPNs and ExpressRoute circuits, with identity
systems that span both. That's not a failure to finish migrating.
For most organizations, **that is the architecture** — a permanent,
intentional-or-not blend of on-premises and cloud that you design for
rather than something you're racing to eliminate. Understanding *why*
enterprises end up here is the foundation for everything else in this
course, because the reasons determine which parts of the hybrid
estate are temporary scaffolding and which parts are structural.

## Legacy systems that are too costly or risky to migrate

The single biggest reason enterprises stay hybrid is the oldest one:
some systems are too expensive, too risky, or too poorly understood
to move. A mainframe-adjacent AS/400 system running core manufacturing
scheduling, a 20-year-old ERP customization with no remaining
in-house expert, a regulated financial system where a botched
migration could mean a reporting failure to a regulator — these
don't get rewritten because a cloud migration project exists. The
business case has to stand on its own, and for a system that already
works, carries enormous switching risk, and has no clear cloud-native
replacement, that business case frequently loses. You've seen this
pattern already in this path's enterprise architecture material: not
every workload has a positive ROI for migration, and pretending
otherwise just produces a failed project. The realistic outcome is
that these systems stay exactly where they are, indefinitely, while
everything around them moves.

## Data residency and latency requirements

A second, completely independent force is physics and law. Some
workloads have to run close to where the data is generated — a
factory floor control system can't tolerate the round-trip latency of
a call to a region hundreds of miles away, and a trading system's
tolerance for added milliseconds is measured in dollars. Separately,
some data legally cannot leave a jurisdiction, or a regulator requires
it to remain under the organization's direct physical custody rather
than a cloud provider's. Neither of these is solved by "picking a
better cloud region." They're architectural constraints that keep
specific workloads on-premises, or on cloud infrastructure that is
physically local, permanently — regardless of how mature or
cost-effective the public cloud becomes.

## M&A brings in infrastructure you didn't choose

The third force is the one architecture diagrams rarely admit to:
mergers and acquisitions. When Company A acquires Company B, Company
A doesn't get a clean slate — it gets Company B's data centers,
Company B's Active Directory forest, Company B's half-finished AWS
migration, and Company B's vendor contracts, all on day one, all
needing to interoperate with Company A's own estate well before any
integration project could rationalize it. Hybrid architecture is very
often not a decision at all in this scenario — it's the immediate,
unavoidable consequence of two independently-evolved IT estates being
forced together on an acquisition's timeline, which is set by legal
and finance, not by architects.

## Gradual migration, not a deliberate hybrid strategy

Finally, even enterprises that genuinely intend to end up fully in the
cloud get to hybrid by default, because large migrations happen in
waves over years, not in a weekend. A phased migration plan — move
the web tier first, then the application tier, then the data tier
last because it's the riskiest — produces a hybrid environment for
every month of that multi-year project. Budget cycles, staffing
constraints, and the sheer size of enterprise application portfolios
mean that "in progress" can last far longer than anyone planned, and
the hybrid state that was meant to be temporary becomes the
environment people actually operate for years.

## What this means for how you architect

Put these four forces together and you get the real lesson: hybrid
isn't usually chosen, it's arrived at, from several directions at
once, and it rarely goes away on a predictable schedule. That changes
how you should architect. Instead of designing cloud-native systems
that treat the on-prem side as a problem to be eliminated, you design
for a hybrid estate as a durable fact — with real, governed
connectivity, a unified identity model, and a clear, revisited-often
answer to which workloads belong on which side. The rest of this
chapter builds exactly that: the real connectivity patterns that join
on-prem to cloud, the control-plane technologies — Azure Arc and AWS
Outposts — that manage hybrid infrastructure as a single estate
instead of two separate worlds, and a decision framework for what
should actually stay on-premises versus what should move.

## Key terms

| Term | Meaning |
|---|---|
| Hybrid cloud | An architecture that spans on-premises infrastructure and one or more public clouds as a permanent, integrated estate — not a transitional state |
| Brownfield environment | An existing IT estate with established systems, data, and dependencies, as opposed to a "greenfield" build with no legacy constraints |
| Lift-and-shift | Migrating a workload to the cloud with minimal redesign; often rejected for legacy systems because the risk/cost doesn't justify the limited benefit |
| Data residency | A legal or regulatory requirement that specific data remain within a defined geographic or jurisdictional boundary |
| M&A integration | The process of merging two organizations' IT estates after an acquisition, frequently the unplanned origin of a hybrid architecture |

## Check yourself

You're ready for Lesson 2 when you can name the four forces that push
an enterprise toward hybrid without looking back at this guide, and
explain why "we'll finish migrating eventually" is often not a
realistic plan for at least one of them.
