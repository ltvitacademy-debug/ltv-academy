# Lesson 9 — Hub-and-Spoke vs. Transit Gateway Topologies Compared

**Chapter 3 · Network Architecture at Enterprise Scale · Lesson 1 of 4**

## What you'll learn

- Why a flat, fully-meshed network between every team's VNet or VPC
  stops working long before an organization reaches enterprise scale
- How Azure builds hub-and-spoke out of VNet peering plus
  user-defined routes, and why that peering is explicitly
  **non-transitive**
- How AWS Transit Gateway replaces peering with a single managed,
  transitive router that spoke VPCs attach to
- When to reach for Azure Virtual WAN instead of hand-built peering,
  and how to decide between the Azure and AWS patterns when a design
  has to support both

## The problem hub-and-spoke exists to solve

By the time an organization has a landing zone (Chapter 2) handing
out subscriptions or accounts to individual teams, it also has a
network problem: those teams need to reach a shared firewall, a
shared DNS resolver, maybe a shared file share or identity service —
and sometimes they need to reach each other. The naive answer is to
peer every network directly to every other network it needs to
reach. That's a full mesh, and a full mesh's connection count grows
as roughly N² against the number of networks. At 5 teams that's
tolerable. At 50, it's an unmanageable tangle of peering
relationships, each one needing its own route and firewall review.

Hub-and-spoke fixes this by designating one central network — the
**hub** — as the only thing every spoke connects to. Spokes don't
peer with each other at all. Anything a spoke needs from another
spoke, or from the internet, or from on-premises, routes through the
hub first. The connection count drops to roughly N, and more
importantly, every cross-network packet now passes a single point
where an architect can put a firewall, log the traffic, and enforce
one policy instead of fifty.

## Azure's version: VNet peering is non-transitive

Azure builds hub-and-spoke directly out of VNet peering, and the one
fact that makes the whole pattern work is that **VNet peering is not
transitive**. If spoke A peers with the hub, and spoke B peers with
the hub, spoke A cannot reach spoke B through the hub automatically —
Azure's networking layer simply won't route it. That sounds like a
limitation, but it's the feature: it means the hub is forced to be
the only path, and an architect can decide exactly what happens to
traffic that tries to cross from one spoke to another.

The way that's actually enforced is with **user-defined routes
(UDRs)**. Each spoke subnet gets a route table whose default route
(`0.0.0.0/0`) points at the hub's firewall or network virtual
appliance (NVA) instead of straight to the internet:

```
az network route-table create \
  --resource-group hub-rg \
  --name spoke-to-hub-routes

az network route-table route create \
  --resource-group hub-rg \
  --route-table-name spoke-to-hub-routes \
  --name default-to-firewall \
  --address-prefix 0.0.0.0/0 \
  --next-hop-type VirtualAppliance \
  --next-hop-ip-address 10.0.0.4
```

That single route is what turns "non-transitive peering" into
"centralized egress": every spoke's outbound traffic, and any
traffic genuinely destined for another spoke, physically passes
through the hub's firewall, where one policy applies to all of it.
The hub itself typically holds Azure Firewall (or a third-party NVA),
a VPN/ExpressRoute gateway for on-premises connectivity, and shared
services like a domain controller or a private DNS resolver — all of
it reachable from every spoke, none of it duplicated per spoke.

For organizations with many spokes and multiple regions, Azure also
offers **Virtual WAN**, which replaces hand-built hub VNets and
manually maintained UDRs with a Microsoft-managed hub that spokes
connect into; it's the closer Azure analog to Transit Gateway and is
usually the better choice once the number of spokes or regions makes
manually wiring UDRs across every one of them too error-prone to
maintain by hand.

## AWS's version: Transit Gateway as a managed router

AWS reached the same architectural goal from a different starting
point. VPC peering, like Azure's VNet peering, is non-transitive, and
for years the only way to build a hub in AWS was the same
UDR-and-NVA pattern described above, run by hand per VPC. **Transit
Gateway** replaces that by acting as a single, AWS-managed regional
router that VPCs, VPNs, and Direct Connect links attach to:

```
aws ec2 create-transit-gateway \
  --description "enterprise-hub-tgw"

aws ec2 create-transit-gateway-vpc-attachment \
  --transit-gateway-id tgw-0123456789abcdef0 \
  --vpc-id vpc-0a1b2c3d4e5f67890 \
  --subnet-ids subnet-0f1e2d3c4b5a69870
```

Where Azure needs a UDR per spoke subnet to force traffic toward a
hub NVA, Transit Gateway handles routing natively: each VPC
attachment gets associated with a **transit gateway route table**,
and that route table decides which other attachments it can reach.
That makes it straightforward to build an inspection VPC that every
other attachment's traffic is forced through, or to isolate a
sensitive VPC so it can only reach the shared-services attachment and
nothing else — the same centralized-egress and blast-radius control
that Azure gets from UDRs, but expressed as route table associations
on a managed service instead of static routes an architect has to
keep consistent by hand.

## Comparing the two patterns

| | Azure hub-and-spoke | AWS Transit Gateway |
|---|---|---|
| Mechanism | VNet peering (non-transitive) + UDRs forcing traffic through a hub NVA/firewall | Managed, natively transitive router; VPCs attach to it directly |
| Who enforces "no direct spoke-to-spoke"? | The architect, via UDRs on every spoke | The TGW route table associations |
| Scales to many spokes/regions via | Virtual WAN (managed hub) once hand-built UDRs get unwieldy | Transit Gateway peering across regions, or a Direct Connect Gateway attachment |
| Centralized inspection point | Azure Firewall or NVA sitting in the hub VNet | A dedicated inspection VPC attached to the TGW with its own route table |

The architectural intent is identical on both clouds: one shared
connection point, centralized policy enforcement, and a connection
count that scales linearly instead of quadratically. What differs is
how much of the transitive routing the cloud provider manages for
you versus how much an architect has to wire by hand with route
tables — and that difference is exactly why Azure's answer to "too
many hand-built UDRs" is Virtual WAN, a managed hub that behaves a
lot more like Transit Gateway than like classic hub-and-spoke
peering.

## Key terms

| Term | Meaning |
|---|---|
| Hub-and-spoke | A topology where every network (spoke) connects only to a central network (hub); spokes never connect directly to each other |
| VNet/VPC peering | A direct network connection between two virtual networks that is explicitly non-transitive on both Azure and AWS |
| User-defined route (UDR) | An Azure route table entry that overrides default routing — the mechanism that forces spoke traffic through a hub firewall |
| Transit Gateway | AWS's managed, natively transitive router that VPCs, VPNs, and Direct Connect links attach to, replacing manual hub-NVA wiring |
| Azure Virtual WAN | Microsoft's managed hub service, the closer Azure analog to Transit Gateway once manual UDR management stops scaling |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
is VNet/VPC peering's non-transitivity actually the thing that makes
hub-and-spoke work, and what specific mechanism — UDRs on Azure,
route table associations on AWS Transit Gateway — turns that
non-transitivity into enforced centralized egress?
