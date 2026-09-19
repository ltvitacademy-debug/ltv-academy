# Lesson 29 — Public vs. Private Database Connectivity

**Chapter 5 · Azure SQL Network Security · Lesson 29 of 95**

## What you'll learn

- The real decision this chapter has been building toward: public-with-a-firewall vs. fully private
- Why "public endpoint, tight firewall" is not the same security posture as "no public endpoint"
- A concrete framework for choosing, based on compliance, workload, and operational cost
- How the three controls from Lessons 26-28 combine instead of being mutually exclusive

## Restating the three tools, side by side

| Control | What it restricts | Public endpoint still exists? |
|---|---|---|
| Firewall rule (Lesson 26) | Source IP address | Yes |
| VNet service endpoint (Lesson 27) | Source network identity (subnet) | Yes |
| Private Endpoint (Lesson 28) | Nothing to restrict — there's no public path for this traffic | No, for the traffic using the private path |

The first two rows are both variations on the same posture: **public endpoint, gated**. The third row
is a different posture: **no public exposure for private-path traffic.** These aren't just different
amounts of the same thing — they're categorically different postures, and conflating them is the
single most common Azure SQL network-security misunderstanding.

## Why "tight firewall" isn't "no public endpoint"

A perfectly configured firewall — one IP allowed, everyone else denied, no Azure-services checkbox,
VNet rules layered on top — still leaves a real, DNS-resolvable, internet-routable endpoint sitting
there. That endpoint is a target for:

- **Reconnaissance and scanning.** The server's public DNS name and IP are discoverable; attackers
  can and do probe public Azure SQL endpoints even without a valid credential, looking for
  misconfigurations, weak TLS settings, or firewall rules opened too widely by mistake.
- **Configuration drift.** A firewall rule is a setting someone can change — accidentally widen an IP
  range, forget to remove a rule added "just for testing," or leave the Azure-services checkbox on
  from initial setup. Every one of those mistakes is *reachable from the internet* the moment it
  happens, because the endpoint never stopped being public.
- **Compliance language that means what it says.** Some regulatory or contractual requirements state
  plainly that a system must not have a public network path, not merely "a public network path that's
  access-controlled." A tight firewall satisfies neither the letter nor the intent of that requirement.

A Private Endpoint removes the target itself for that traffic path, not just the ability to reach it
incorrectly. There's no drift-to-exploit if there's no public listener to drift toward.

## Why "always go fully private" isn't automatically right either

Fully private connectivity isn't free, and treating it as the default-correct answer regardless of
context creates its own problems:

- **Every client needs network line-of-sight** into the VNet — VPN, ExpressRoute, VNet peering, or a
  jump box. Ad-hoc admin access from your laptop at a coffee shop stops working unless you've built
  that path too.
- **Operational overhead.** DNS zones, private endpoint approval workflows, and VNet/subnet planning
  are real ongoing configuration surface, not a one-time setup cost.
- **Third-party and SaaS integrations** that expect to reach your database over the public internet
  (some BI tools, some SaaS connectors) may not support connecting through a VPN or ExpressRoute at
  all, forcing an exception you now have to secure some other way.

## A decision framework

```
Does a compliance/contractual requirement say "no public network path"?
  YES → Private Endpoint is not optional. Plan the VNet/DNS work now.
  NO  → continue

Do ALL legitimate clients already have (or can easily get) network line-of-sight
into a VNet — VPN, ExpressRoute, peering, jump box?
  YES → Private Endpoint is the stronger default; do it.
  NO  → firewall + VNet service endpoints, scoped as tightly as the real client
         list allows, is a defensible interim posture — revisit as clients migrate
```

Note this isn't strictly either/or in practice — many real environments run a Private Endpoint for
the majority of production traffic while keeping a tightly firewalled public path open for a specific
legacy integration that can't yet reach the VNet, with a plan to close that path once it can.

## Key terms

| Term | Meaning |
|---|---|
| Gated public posture | Public endpoint exists, access narrowed by firewall/VNet rules |
| Fully private posture | No public network path exists for private-path traffic |
| Configuration drift | A rule or setting that widens exposure over time, reachable the moment it happens |
| Line-of-sight | Network path (VPN, ExpressRoute, peering, jump box) required to reach a private-only resource |

## Lab

1. For a real or hypothetical workload you know, write down which compliance requirements (if any)
   it's subject to, and whether any of them mention "public network path" explicitly.
2. List every legitimate client that needs to reach that database, and note whether each one already
   has VNet line-of-sight or would need new infrastructure to get it.
3. Using the decision framework above, write one sentence stating which posture you'd choose and why.

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does a firewall rule allowing
exactly one IP still count as "public endpoint" for compliance purposes, in a way a Private Endpoint
does not?
