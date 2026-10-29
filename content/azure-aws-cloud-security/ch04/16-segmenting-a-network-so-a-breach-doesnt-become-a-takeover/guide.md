# Lesson 16 — Segmenting a Network So a Breach Doesn't Become a Takeover

**Chapter 4 · Network Security Across Both Clouds · Lesson 4 of 4**

## What you'll learn

- Why a flat network turns one compromised resource into unrestricted
  lateral movement, and what "blast radius" means in concrete terms
- How Azure's hub-spoke topology uses VNet peering and forced routing
  through a central firewall to contain that movement
- How AWS achieves the same thing with multiple VPCs and a Transit
  Gateway, instead of one large VPC with subnets
- Why a separate AWS account, or an Azure subscription boundary, is a
  stronger containment boundary than any network control alone

## The problem segmentation solves: blast radius

If every workload sits in one flat network where everything can reach
everything, compromising any single VM gives an attacker a clear path to
every other resource on that network — databases, internal APIs, domain
controllers, all of it. **Blast radius** is the honest way to describe
that exposure: the segmentation question is "when something goes wrong,
how much else does it reach," not "will something go wrong."

## Azure: hub-spoke, with the firewall doing the gatekeeping

The standard pattern is a **hub-spoke topology**. The hub VNet holds
shared services — Azure Firewall, a VPN/ExpressRoute gateway, shared
DNS. Each workload or environment (dev, staging, prod, or a specific
application) gets its own **spoke VNet**, peered to the hub.

VNet peering by itself only connects two VNets directly — it does **not**
automatically let spoke-to-spoke traffic flow through the hub. To force
spoke traffic through the hub's firewall (rather than peering spokes
directly to each other), you combine peering with **user-defined routes**
on each spoke that send `0.0.0.0/0`, or specific spoke CIDR ranges, to the
firewall's private IP. Without that UDR, a spoke can only talk to the
hub and whatever it's directly peered to — nothing is implicitly open.

Inside a spoke, further segmentation comes from **NSGs and Application
Security Groups** on individual subnets — a web tier subnet, an app tier
subnet, and a data tier subnet inside the same spoke, each with its own
NSG restricting what can reach it. At larger scale, **Azure Virtual WAN**
manages hub-spoke connectivity across many regions from one control plane
instead of hand-wiring peering everywhere.

## AWS: multiple VPCs, tied together through Transit Gateway

AWS's equivalent starting point isn't one big VPC with lots of subnets —
it's **separate VPCs per workload or environment**, each with its own CIDR
range. That's already a stronger boundary than a subnet, because a VPC is
a fully isolated network by default; nothing crosses between VPCs unless
you explicitly connect them.

For a handful of VPCs, **VPC peering** works, but it doesn't scale — every
pair needs its own peering connection, and peering doesn't transit (a
peered to b peered to c does not let a reach c). For real hub-and-spoke
scale, you use a **Transit Gateway**: a central hub that VPCs attach to,
with its own **route tables** controlling exactly which attachments can
reach which other attachments.

```
# Transit Gateway route table — deny-by-default between spokes
aws ec2 create-transit-gateway-route \
  --transit-gateway-route-table-id tgw-rtb-0abc123 \
  --destination-cidr-block 10.20.0.0/16 \
  --transit-gateway-attachment-id tgw-attach-0inspection
```

A Transit Gateway route table that only routes each spoke VPC to a shared
**inspection VPC** (running something like AWS Network Firewall), and
nothing spoke-to-spoke directly, reproduces the Azure hub-spoke pattern:
every cross-workload packet passes through a central chokepoint by
default, not by accident.

## The strongest boundary isn't network at all

Network segmentation reduces blast radius, but the hardest boundary in
either cloud is an **account boundary** (AWS) or a **subscription**
boundary (Azure) — a compromised credential or role in one account
generally cannot touch resources in a separate account at all, regardless
of network connectivity, because IAM/RBAC trust doesn't cross the boundary
by default. This is why **AWS Organizations** (with per-environment or
per-workload accounts) and Azure **management groups** over separate
subscriptions are treated as the top tier of segmentation — network
design contains lateral movement; account/subscription separation
contains it even if the network design has a gap.

## Key terms

| Term | Meaning |
|---|---|
| Blast radius | How much an attacker can reach once a single resource is compromised |
| Hub-spoke | Azure topology: a shared-services hub VNet, workload spoke VNets peered to it, routing forced through the hub |
| Transit Gateway | AWS hub that multiple VPCs attach to, with route tables controlling which attachments can reach each other |
| Inspection VPC | A shared VPC (often behind Network Firewall) that a Transit Gateway routes all cross-VPC traffic through |

## Check yourself

You're ready to move to Chapter 5 when you can explain, without looking:
why does VNet peering (or VPC peering) alone not give you hub-spoke
segmentation, and what has to be added to actually force spoke traffic
through a central chokepoint?
