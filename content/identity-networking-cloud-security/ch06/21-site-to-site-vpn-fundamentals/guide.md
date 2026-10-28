# Lesson 21 — Site-to-Site VPN Fundamentals

**Chapter 6 · Private Connectivity: VPN & Dedicated Circuits · Lesson 21 of 32**

## What you'll learn

- What a site-to-site VPN actually is: an encrypted IPsec tunnel over the public internet connecting an entire on-prem network to a cloud VNet or VPC
- The real gateway pieces on each side — Azure VPN Gateway, AWS Virtual Private Gateway and Customer Gateway
- Why site-to-site VPN is a fundamentally different connection than VNet-to-VNet peering, even though both end in "two networks that can reach each other"
- Why production deployments use two tunnels, not one

## Site-to-site VPN: connecting whole networks, not devices

A **site-to-site VPN** connects an entire on-premises network — the office, the data center — to a
cloud virtual network, so that every device on either side can reach every device on the other
side (subject to firewall rules) using private IP addresses. It does this over the **public
internet**: traffic leaves the on-prem router, crosses the internet like any other packet, and
arrives at the cloud gateway — except the whole trip happens inside an **IPsec** tunnel, which
encrypts and authenticates it so the public internet in the middle doesn't matter for
confidentiality. This is the detail that separates it from VNet peering: peering connects two
cloud networks to each other over Azure's or AWS's own backbone and never touches the internet at
all. Site-to-site VPN exists specifically because one side of the connection — the on-prem
network — isn't in the cloud, so there's no backbone to put it on.

## The gateway pieces, on each side

In Azure, the cloud side is a **VPN Gateway** deployed into a VNet (its own dedicated subnet, the
GatewaySubnet), paired with a **Local Network Gateway** — a resource that just describes the
on-prem side: its public IP and the address ranges behind it. A **Connection** resource ties the
two together with a shared key:

```
On-prem router (public IP: 203.0.113.10)
        |
        |  IPsec tunnel, encrypted, over the public internet
        v
Azure VPN Gateway  <---Connection (shared key)---  Local Network Gateway
  (in VNet, GatewaySubnet)                          (describes the on-prem side)
```

AWS uses the same idea with different names: a **Virtual Private Gateway (VGW)** attached to the
VPC is the cloud side, and a **Customer Gateway (CGW)** is a resource describing the on-prem
device — its public IP and routing type (static routes or BGP). An AWS Site-to-Site VPN connection
links the two, same as Azure's Connection resource links its gateway pair.

## Why two tunnels, not one

Both clouds provision a site-to-site VPN connection as **two tunnels** by default, each terminating
on a different physical endpoint inside the provider's infrastructure, so that one tunnel can go
down — a maintenance event, a hardware failure on the provider's side — without taking the whole
connection with it. The on-prem device needs to be configured to accept both and fail over between
them; a single-tunnel VPN works for a lab, but a real production link almost always relies on this
redundancy, since the whole point of the connection is to keep on-prem resources reachable from the
cloud (or vice versa) without a single point of failure sitting in the middle of it.

## Key terms

| Term | Meaning |
|---|---|
| Site-to-site VPN | An encrypted IPsec tunnel over the public internet connecting an entire on-prem network to a cloud VNet/VPC |
| Azure VPN Gateway | The cloud-side gateway resource deployed into a VNet's GatewaySubnet |
| AWS Virtual Private Gateway (VGW) | The cloud-side gateway resource attached to a VPC |
| Customer/Local Network Gateway | The resource describing the on-prem side — its public IP and address ranges |

## Check yourself

A colleague says "we don't need a site-to-site VPN, we already have VNet peering between our two
VNets." Why doesn't peering solve the problem of connecting the on-prem office network to the
cloud, no matter how many VNets are peered together?
