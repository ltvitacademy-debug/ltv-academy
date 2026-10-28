# Lesson 20 — VNet Peering and Connecting Azure Networks

**Chapter 5 · Azure Networking · Lesson 20 of 32**

## What you'll learn

- How VNet peering connects two VNets over Azure's own backbone, never the public internet
- The difference between regional peering and global peering
- Why peering is non-transitive, and why that single fact drives most real network designs
- What hub-and-spoke means in practice, and why it exists

## Peering: private connectivity over Azure's backbone

Two separate VNets, even in the same subscription, can't talk to each other by default — they're
isolated from each other exactly like they're isolated from everything else. **VNet peering**
connects them: resources in one VNet reach resources in the other using private IP addresses,
with traffic routed entirely over Microsoft's backbone network rather than the public internet. No
VPN, no encryption overhead to configure, and typically lower latency than any connection that
does cross the public internet.

Peering has to be created from **both sides** — two separate peering link objects, one defined on
each VNet, each pointing at the other:

```
az network vnet peering create \
  --resource-group rg-network-demo \
  --name peer-prod-to-dev \
  --vnet-name vnet-prod \
  --remote-vnet vnet-dev \
  --allow-vnet-access true

az network vnet peering create \
  --resource-group rg-network-demo \
  --name peer-dev-to-prod \
  --vnet-name vnet-dev \
  --remote-vnet vnet-prod \
  --allow-vnet-access true
```

Until both sides exist and report `Connected`, the peering isn't actually usable. The two VNets'
address spaces also can't overlap — Azure rejects the peering if they do, the same way it rejects
overlapping subnets inside a single VNet.

## Regional peering vs. global peering

```
Regional peering: both VNets in the same Azure region (e.g. both in eastus)
Global peering:   VNets in different regions (e.g. eastus and westeurope)
```

Both work the same way operationally — same `az network vnet peering create` command, same
non-transitive behavior below — global peering just crosses regions and historically carried a
higher per-GB cost than regional peering for the data transferred across it.

## Peering is non-transitive

This is the fact that drives real network designs more than any other single detail: **peering
does not chain**. If VNet A peers with VNet B, and VNet B peers with VNet C, A **cannot** reach C
through B automatically — A and C have no relationship unless they're explicitly peered with each
other too.

```
VNet-A <---peered---> VNet-Hub <---peered---> VNet-B

VNet-A CANNOT reach VNet-B through the Hub automatically.
Each peering relationship only connects the two VNets it directly names.
```

## Hub-and-spoke: the common fix

The standard design pattern that works around non-transitivity is **hub-and-spoke**: one central
"hub" VNet holds shared services — a firewall, a VPN or ExpressRoute gateway, shared DNS — and
each "spoke" VNet (one per application or team) peers only to the hub, never to other spokes
directly. Spoke-to-spoke traffic that needs to flow is routed deliberately through a network
virtual appliance or Azure Firewall sitting in the hub, using user-defined routes, rather than
relying on peering to carry it automatically. That gives one place to apply firewall rules and
inspect traffic between spokes, instead of a tangle of direct peerings between every pair of
VNets.

## Key terms

| Term | Meaning |
|---|---|
| VNet peering | A private connection between two VNets over Azure's backbone, created as a pair of links, one on each VNet |
| Regional vs. global peering | Same-region peering vs. peering across two different Azure regions |
| Non-transitive | Peering doesn't chain — A peered to B peered to C does not let A reach C automatically |
| Hub-and-spoke | A design where spoke VNets peer only to a central hub holding shared services, not to each other |

## Check yourself

VNet A peers with the Hub, and the Hub peers with VNet B. Can A reach B directly through that
peering chain? Why or why not, and what's the standard way to let A-to-B traffic flow anyway?
