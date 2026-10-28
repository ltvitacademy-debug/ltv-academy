# Lesson 25 — Public, Private & Hybrid Cloud

**Chapter 6 · Cloud Computing Fundamentals · Lesson 25 of 32**

## What you'll learn

- What public cloud actually means — AWS, Azure, and GCP's multi-tenant, shared infrastructure
- What private cloud means — dedicated infrastructure for one organization, on-prem or hosted
- What hybrid cloud really is — a real, connected mix of both, not just "using more than one tool"
- The real business reasons companies choose hybrid: compliance, latency, legacy systems, and gradual migration

## Public cloud: shared infrastructure, pay as you go

**Public cloud** is what most people mean when they say "the cloud" — AWS, Azure, and Google
Cloud. It's **multi-tenant**: the same physical datacenters and hardware serve many different
customers at once, kept isolated from each other by the hypervisor layer covered in Lesson 24.
You pay for what you use, you get effectively unlimited scale on demand, and you never own or
rack a single piece of hardware.

## Private cloud: dedicated, not shared

**Private cloud** means infrastructure dedicated to a single organization — no other company's
workloads ever run on it. It can live **on-premises**, in a company's own datacenter, or be
**hosted** by a third-party vendor on hardware set aside exclusively for that one customer. Either
way, the organization gets more direct control over compliance, security configuration, and
customization than public cloud allows — at the cost of losing the "someone else handles the
hardware" elasticity, and taking on real operational investment to run it.

## Hybrid cloud: a real mix, connected

**Hybrid cloud** isn't just "we use AWS for one thing and have a server somewhere else" — it's
on-premises infrastructure and public cloud infrastructure connected over a private, dedicated
link, such as **Azure ExpressRoute** or a **site-to-site VPN**, so workloads on both sides can
talk to each other securely without routing over the open internet.

A realistic example: a bank keeps its core transaction database on-premises, inside its own
datacenter, because of strict data-residency requirements — but runs its customer-facing web
application in Azure, connected back to that on-prem database through ExpressRoute. Customers get
a modern, scalable web experience; the regulated data never actually leaves the bank's own walls.

## Why companies actually choose hybrid

Hybrid cloud isn't indecision — it solves specific, real problems:

- **Compliance and data residency** — regulations may require certain data to stay within a specific location or jurisdiction, ruling out moving it to a public cloud region outright
- **Latency** — some workloads need to sit physically close to on-premises equipment, like sensors on a factory floor, where even a small network delay to a distant cloud region matters
- **Legacy systems** — some applications are too old, too fragile, or too tightly coupled to existing hardware to re-architect for the cloud any time soon
- **Gradual migration** — moving to the cloud piece by piece, rather than all at once, spreads out risk and lets a team learn as they go

## Picking a model honestly

Most new companies, with no existing datacenter investment and no unusual regulatory burden,
simply start in the public cloud — it's the path of least operational overhead. Private and
hybrid cloud earn their complexity only when there's a concrete reason — regulation, latency, a
legacy system, or an existing datacenter nobody's ready to walk away from — to justify it.

## Key terms

| Term | Meaning |
|---|---|
| Public cloud | Multi-tenant cloud infrastructure shared across many customers — AWS, Azure, GCP |
| Private cloud | Dedicated infrastructure for a single organization, on-premises or hosted |
| Hybrid cloud | On-premises and public cloud infrastructure connected over a private link |
| ExpressRoute / VPN | A private, non-internet connection linking an on-premises network to the cloud |

## Check yourself

A company keeps its core customer database on-premises but runs its web application in the public
cloud, connected through ExpressRoute. Name one real business reason — not a technical
preference — that would justify this hybrid setup.
