# Lesson 12 — Designing Network Architecture That Scales Past One Team

**Chapter 3 · Network Architecture at Enterprise Scale · Lesson 4 of 4**

## What you'll learn

- Why a network design that works fine for the first three teams can
  quietly stop working at thirty, and what actually breaks
- How disciplined IP address planning and central IPAM prevent the
  single most common cause of a network redesign nobody budgeted for
- How to combine landing-zone vending (Chapter 2) with the hub-and-
  spoke, hybrid connectivity, and centralized DNS patterns from this
  chapter into one repeatable spoke template
- Where to draw the line between what a central network team owns
  and what an individual team is allowed to self-serve

## The failure mode: it worked for three teams

Nearly every unmanageable enterprise network started as a reasonable
design for a small number of teams. Three teams peering directly to
each other and to a shared services VNet is fine — nine connections,
easy to reason about, easy to review. The same organization at thirty
teams, still peering directly because nobody revisited the decision,
has roughly 435 potential pairwise connections, overlapping IP
ranges because nobody was tracking allocations centrally, and no
single place to answer "can team 14 reach team 22, and should they be
able to?" None of the individual decisions along the way were
wrong for the team size at the time. The design simply didn't have a
built-in answer for what happens as N grows, and nobody is forced to
revisit that until it's already painful.

## Principle one: non-overlapping address space, planned centrally

The single most common root cause of a later, expensive network
redesign is IP address overlap — two spokes independently assigned
the same CIDR block, discovered only when they need to talk to each
other or peer through the hub, at which point one of them has to be
entirely re-addressed. The fix is unglamorous but non-negotiable: one
central address plan, allocated from a reserved supernet before any
spoke is created, not after:

```
# reserved supernet: 10.0.0.0/8
# hub:          10.0.0.0/16
# spoke pool:   10.1.0.0/16 – 10.255.0.0/16, /20 per spoke
#   spoke-finance:    10.1.0.0/20
#   spoke-platform:   10.2.0.0/20
#   spoke-analytics:  10.3.0.0/20
```

Whether that's tracked in an actual IPAM tool or a disciplined
spreadsheet matters less than the discipline of **allocating before
provisioning** — a new spoke's CIDR comes from the central plan as
part of onboarding it, the same moment it gets its subscription or
account from the landing zone, not something a team picks for itself
once they already have the environment.

## Principle two: a standardized, repeatable spoke template

Chapter 2 covered landing-zone vending — a new team gets a
subscription or account through an automated process, not a manual
request. The network side of that same process is a **spoke
template**: an IaC module that stands up a new spoke with the right
shape already applied — the correct CIDR block from the central plan,
a peering (or Transit Gateway attachment) to the hub, the UDRs or
route table associations that force traffic through the hub firewall,
and a virtual network link or VPC association into the centralized
DNS zone from Lesson 11. A team onboarding gets a spoke that already
matches every other spoke structurally, with zero chance of someone
reinventing the egress or DNS pattern slightly differently each time:

```hcl
module "spoke" {
  source       = "git::https://devops/terraform-modules//spoke-network"
  spoke_name   = "analytics"
  cidr_block   = "10.3.0.0/20"
  hub_vnet_id  = module.hub.vnet_id
  dns_zone_id  = module.hub.private_dns_zone_id
}
```

This is the same principle Chapter 4's module-writing material
applies generally — a reusable module is how "every spoke is built
the same way" survives past the point where one person remembers how
the first spoke was built.

## Principle three: segmentation that survives more teams joining

Hub-and-spoke centralizes egress, but it doesn't automatically mean
every spoke can reach every other spoke through the hub — and it
shouldn't. Per-spoke NSGs or security groups, and per-spoke route
table associations on a Transit Gateway, should default to **deny
spoke-to-spoke** and only allow it where there's a real, reviewed
reason. The goal is that adding spoke thirty-one never requires
re-auditing spokes one through thirty — each spoke's access is scoped
to what it actually needs (the hub's shared services, maybe one or
two specific other spokes), not implicitly to everything that happens
to also be attached to the hub.

## Principle four: a clear ownership boundary

Finally, scaling past one team means being explicit about who owns
what. A central network/platform team owns the hub — the firewall
policy, the DNS zones, the IP address plan, the spoke template itself
— because those are exactly the things that create inconsistency and
risk if every team owns its own version. Individual teams own what
happens **inside** their own spoke — their own subnets, their own
NSG rules for their own workloads, their own application
architecture — because requiring central review for everything
inside a spoke is how a platform team becomes the bottleneck that
teams route around. That split is the same guardrails-vs-gates
tension Chapter 5 names directly, applied specifically to the
network layer: a few things genuinely need one owner and one
consistent policy; everything else should be self-service.

## Key terms

| Term | Meaning |
|---|---|
| Central address plan | A reserved supernet subdivided and allocated to spokes before they're provisioned, preventing CIDR overlap |
| IPAM | IP address management — the discipline (tool or process) of tracking which CIDR blocks are allocated to which spoke |
| Spoke template | A reusable IaC module that provisions a new spoke with the correct CIDR, hub connectivity, routing, and DNS link already applied |
| Deny spoke-to-spoke by default | A segmentation default where a spoke can reach the hub's shared services but not other spokes, unless specifically reviewed and allowed |
| Ownership boundary | The explicit line between what the central network team owns (hub, DNS, IP plan) and what each team owns (inside its own spoke) |

## Check yourself

This closes Chapter 3. You're ready for Chapter 4 when you can
explain, without looking: what specific failure actually happens when
an organization skips a central IP address plan, and why does a
standardized spoke template matter more as the number of teams grows,
not less?
