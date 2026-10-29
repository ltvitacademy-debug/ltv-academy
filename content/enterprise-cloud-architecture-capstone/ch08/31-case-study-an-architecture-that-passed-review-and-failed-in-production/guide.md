# Lesson 31 — Case Study: An Architecture That Passed Review and Failed in Production

**Chapter 8 · Capstone: Designing and Defending an Enterprise Cloud Architecture · Lesson 31 of 32**

## What you'll learn

- How a landing zone design can pass a formal architecture review board, with good diagrams and
  real RTO/RPO numbers, and still fail during an actual outage
- Why "networking" so often gets treated as infrastructure rather than as a tier with its own
  disaster recovery requirement — and what that costs when it's wrong
- What question the review board should have asked, and didn't
- Why ADR-003 from Lesson 30 exists specifically to prevent this failure, not as a theoretical
  best practice

This case study is an illustrative, fictional scenario built to make one specific failure mode
concrete — it does not describe a real company or a real incident.

## The company

**Prairiewind Underwriters** is a fictional regional insurance company, roughly HCL's size, that
migrated its claims-processing and policy-quoting systems to Azure two years ago. Like HCL,
Prairiewind built a hub-and-spoke network: one hub in its primary region holding a shared Azure
Firewall, VPN gateway, and DNS Private Resolver, with spoke VNets per application team peered to
it. On paper, the design looks almost identical to the one built in Lessons 29 and 30.

## The review that approved it

Prairiewind's architecture review board met for two sessions before approving the design. The
record of what they covered is detailed:

- Application-tier RTO and RPO for claims processing (2 hours / 30 minutes) and policy quoting
  (4 hours / 2 hours), both backed by geo-replicated databases and a documented failover runbook
- Network segmentation between claims, quoting, and a third-party integrations spoke, each with
  its own NSGs and no direct spoke-to-spoke peering
- Cost projections for the hub's Azure Firewall and gateway, sized for current traffic plus 40%
  headroom
- A tagging and policy-compliance report showing 100% of subscriptions passing the org's required
  guardrails

Every one of those is a real, substantive review item — and every one of them is about the spoke
applications, not the hub itself. The board's checklist had a line item for "application tier
RTO/RPO" and no line item for "shared network services RTO/RPO," so the question of what happens
to the hub during a regional outage was never on the agenda, and nobody raised it from the floor.

## Eighteen months later

A regional Azure outage takes down a subset of services in Prairiewind's primary region for just
under six hours. The claims-processing database fails over to the secondary region exactly as
designed, within its 2-hour RTO. Policy quoting does the same. On paper, the failover runbook
worked.

In practice, almost nothing in the secondary region could actually serve traffic. The hub — the
Azure Firewall, the VPN gateway, the DNS Private Resolver — existed only in the primary region. It
was never deployed to the secondary region, because no ADR, no design document, and no review
item had ever framed it as something that needed its own disaster recovery plan. It was
"infrastructure," and infrastructure wasn't on the RTO/RPO checklist.

With the hub down, every spoke's outbound route — the UDR pointing `0.0.0.0/0` at the firewall's
private IP — pointed at nothing. The failed-over claims database was healthy and reachable from
inside its own spoke, but nothing could resolve internal DNS to find it, and nothing could reach
the internet to serve the public-facing quoting site. The actual time to restore full service was
just under eleven hours — not because any application failed to fail over, but because nobody had
asked whether the network they were failing over *into* actually existed.

## Why the review board missed it

Three contributing factors, each individually reasonable, combined into one blind spot:

1. **The checklist was application-shaped.** "RTO/RPO per workload" naturally produces a list of
   application tiers, because that's the unit everyone thinks in terms of. A shared network layer
   that no single team owns doesn't show up on that list unless someone explicitly adds it.
2. **Ownership was ambiguous.** The hub was built and operated by the platform team, but the DR
   plan was written by each application team for its own workload. Nobody on either side believed
   writing the hub's DR plan was their job.
3. **The design diagram looked complete.** A hub-and-spoke diagram with a secondary region drawn
   next to the primary looks like it has DR built in, even when only the spoke boxes were ever
   actually deployed there. A diagram can imply symmetry that was never built.

## What the review board should have asked

One question would have surfaced this gap in either of Prairiewind's two review sessions: *"If
the primary region's hub goes down, what happens to every spoke that depends on it for egress and
DNS — and is that dependency's own RTO/RPO documented anywhere?"* That single question forces the
shared-services tier onto the same checklist as every application tier, which is exactly what
HCL's ADR-003 in Lesson 30 did by treating the hub as a DR-in-scope tier with its own explicit
RTO/RPO, deployed to both regions, instead of as background infrastructure.

## Key terms

| Term | Meaning |
|---|---|
| Review blind spot | A category of risk that never appears on a review board's checklist, so it's never asked about, regardless of how thorough the review feels |
| Shared-services DR gap | When application tiers have documented failover but the shared network layer they all depend on does not |
| Diagram symmetry | The false impression that a secondary region is fully built out just because it's drawn in the same diagram as the primary |
| Illustrative case study | A fictional, composite scenario built to teach a real failure pattern, not a report of an actual incident |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: name the one review-board
question that would have surfaced Prairiewind's gap, and explain specifically how Lesson 30's
ADR-003 prevents the same gap in HCL's design.
