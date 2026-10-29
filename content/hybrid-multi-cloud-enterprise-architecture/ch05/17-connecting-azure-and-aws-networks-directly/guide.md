# Lesson 17 — Connecting Azure and AWS Networks Directly

**Chapter 5 · Multi-Cloud Networking and Connectivity · Lesson 1 of 4**

## What you'll learn

- Why a VNet in Azure and a VPC in AWS can't talk to each other at all
  until you build something, and the two real ways to build it
- How to stand up a gateway-to-gateway IPsec VPN tunnel directly
  between an Azure VPN Gateway and an AWS Virtual Private Gateway
- How a colocation meet-point lets an ExpressRoute circuit and a
  Direct Connect connection reach each other without touching the
  public internet at all
- Why many real multi-cloud designs end up using both, for the same
  reason Lesson 10 of the network-architecture material used both for
  hybrid on-prem connectivity

## There is no cloud-to-cloud networking by default

An Azure VNet and an AWS VPC are both private networks, and neither
one has any idea the other exists. That's true even though both
clouds give you the pieces to resolve this at the on-premises
boundary — an ExpressRoute circuit, a Direct Connect connection, a
VPN gateway — because none of that infrastructure is wired to the
other cloud by default. If a service in a VNet needs to reach a
service in a VPC, you build the path yourself, and there are really
only two mechanisms for it, the same two you already know from hybrid
connectivity: a **VPN tunnel**, or a **dedicated private circuit**.
The difference this time is that both ends are a cloud, not a data
center.

## Option one: gateway-to-gateway VPN

The most direct path is an IPsec tunnel running straight between an
**Azure VPN Gateway** and an AWS **Virtual Private Gateway** (or a
Transit Gateway VPN attachment), with each side's public gateway IP
configured as the other's remote endpoint:

```
# Azure side: a local network gateway representing the AWS VPN endpoint
az network local-gateway create \
  --resource-group hub-rg \
  --name aws-vpc-gateway \
  --gateway-ip-address 52.14.88.201 \
  --local-address-prefixes 10.50.0.0/16

az network vpn-connection create \
  --resource-group hub-rg \
  --name azure-to-aws \
  --vnet-gateway1 azure-vpn-gw \
  --local-gateway2 aws-vpc-gateway \
  --shared-key "<pre-shared-key>" \
  --enable-bgp true
```

On the AWS side, a matching **customer gateway** points back at the
Azure VPN Gateway's public IP, and a **VPN connection** attaches it to
the VPC's virtual private gateway. Enabling BGP on both ends, rather
than hand-entering static routes, is what lets each side learn the
other's address space automatically and keeps routing correct if
either side's subnets change later. This is genuinely fast to stand
up — hours, not weeks — and it's the right starting point for most
multi-cloud workloads that don't need guaranteed throughput.

## Option two: a colocation meet-point

For sustained, high-throughput cross-cloud traffic, the pattern from
Lesson 10 applies again: an ExpressRoute circuit and a Direct Connect
connection can both land in the **same connectivity provider
facility**, and a cross-connect inside that facility joins them
directly. Neither circuit touches the public internet at any point —
traffic leaves the Azure peering location, crosses the meet-point, and
arrives at the Direct Connect location entirely over private
infrastructure. Several connectivity providers also offer a managed
cloud-exchange layer that provisions and cross-connects both sides for
you, but the underlying mechanism is the same meet-point idea, just
with less manual circuit work.

## Choosing, and why both shows up again

A VPN is the pragmatic default: cheap, fast to provision, adequate for
most service-to-service traffic. A colocation meet-point earns its
cost and lead time when the cross-cloud traffic is sustained and
throughput-sensitive — a continuous data replication job, not an
occasional API call. And exactly as in Lesson 10, a VPN tunnel
configured as a failover path for a meet-point circuit is a real
pattern here too: if the dedicated path degrades, routing fails over
to the VPN at reduced throughput instead of a hard outage. That
redundancy, not either path alone, is what actually makes a
cross-cloud connection resilient — a point Lesson 20 returns to
directly.

## Key terms

| Term | Meaning |
|---|---|
| Azure VPN Gateway / AWS Virtual Private Gateway | The gateway resource on each cloud's side that terminates an IPsec VPN tunnel |
| Local network gateway / customer gateway | Azure's / AWS's representation of the *other* side's public endpoint, configured so each gateway knows how to reach its peer |
| BGP over the tunnel | Dynamic route exchange between the two gateways, so address-space changes propagate automatically instead of needing static routes maintained by hand |
| Colocation meet-point | A connectivity-provider facility where an ExpressRoute circuit and a Direct Connect connection are cross-connected, keeping cross-cloud traffic off the public internet entirely |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: what
two mechanisms exist for connecting an Azure VNet directly to an AWS
VPC, and what specific tradeoff decides which one a given workload
should use?
