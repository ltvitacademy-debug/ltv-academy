# Lesson 2 — On-Prem-to-Cloud Extension Patterns

**Chapter 1 · Hybrid Cloud Architecture Fundamentals · Lesson 2 of 4**

## What you'll learn

- The real connectivity options that join an on-premises network to an
  Azure VNet or AWS VPC — site-to-site VPN, Azure ExpressRoute, and
  AWS Direct Connect — and when each one actually fits
- Why "extend the network" is only half the problem, and why identity
  has to extend with it
- How Azure AD Connect / Microsoft Entra Connect and AWS Directory
  Service turn an on-premises Active Directory into the identity
  source for cloud resources, instead of running two separate
  directories
- The hub-and-spoke pattern most enterprises land on once more than
  one on-prem site and more than one cloud VNet/VPC are involved

## Connectivity is the first wall you hit

Once an enterprise accepts that it's going to run hybrid — for the
reasons covered in Lesson 1 — the very first practical problem is
mundane but non-negotiable: how does a server sitting in an
on-premises data center talk to a VM sitting in an Azure VNet or an
AWS VPC? You already built single-cloud VNets and VPCs earlier in
this path. This lesson is about the layer that joins that private
cloud network back to a private on-premises network, so the two
behave like one estate instead of two networks that happen to be able
to reach each other over the public internet.

## Site-to-site VPN: the default starting point

A site-to-site VPN is an IPsec tunnel between an on-premises VPN
device (or firewall) and a cloud-side VPN gateway — Azure VPN Gateway
or AWS Site-to-Site VPN attached to a Virtual Private Gateway or
Transit Gateway. It runs over the public internet, encrypted, and
it's the pattern almost everyone starts with because it's fast to
stand up and genuinely inexpensive. Its real limitation is that it
inherits the internet's variability: throughput and latency aren't
guaranteed, which matters for anything bandwidth-heavy or
latency-sensitive. For a lot of hybrid workloads — a dev/test
environment, a backup replication job, a moderate-traffic application
tier — a site-to-site VPN is entirely sufficient, and there's no
reason to reach for anything more expensive until you actually hit its
limits.

## ExpressRoute and Direct Connect: dedicated, private circuits

When a workload genuinely needs predictable bandwidth and latency —
the latency-sensitive and high-volume cases Lesson 1 flagged as
reasons workloads stay on-prem — the answer is a dedicated circuit
that never touches the public internet at all. On Azure, that's
**ExpressRoute**: a private connection from your on-premises network,
through a connectivity provider's infrastructure, directly into
Microsoft's network, terminating in an ExpressRoute circuit that peers
with your VNets. On AWS, the equivalent is **Direct Connect**: a
dedicated network connection from your premises (or a colocation
facility) straight into AWS, terminating in a virtual interface that
peers with your VPCs. Both exist for the same reason — a VPN gives you
encryption and reachability, but a dedicated circuit gives you
guaranteed, consistent throughput and lower, more predictable latency,
at a materially higher cost and with real provisioning lead time
measured in weeks, not minutes. Enterprises frequently run both:
ExpressRoute or Direct Connect as the primary path for production
traffic, with a site-to-site VPN configured as an automatic failover
if the dedicated circuit goes down.

## Extending identity: Active Directory doesn't stay put

A connected network solves reachability, but it doesn't solve who's
allowed to log into what. Most enterprises already have an
on-premises Active Directory holding every employee account, group,
and policy — and the realistic hybrid pattern is never "stand up a
second, independent directory in the cloud." It's extending the
existing one. **Microsoft Entra Connect** (formerly Azure AD Connect)
synchronizes on-premises AD accounts, groups, and password hashes (or
federates authentication) into Microsoft Entra ID, so a single
identity works to sign into both the on-prem domain and cloud
resources and SaaS apps. On the AWS side, **AWS Directory Service**
offers AD Connector, which proxies authentication requests back to
your existing on-premises AD rather than duplicating it, and Managed
Microsoft AD, which runs an actual AD domain inside AWS that can
establish a trust relationship with your on-prem forest. Either way,
the pattern is the same: one authoritative identity source,
extended — not replaced — into the cloud.

## Hub-and-spoke: the pattern once it gets complex

Once an enterprise has more than one on-premises site and more than
one cloud VNet or VPC, connecting everything point-to-point stops
scaling — the number of connections to manage grows far faster than
the number of sites. The pattern that replaces it is **hub-and-spoke**:
a central hub VNet or VPC holds the shared connectivity
infrastructure — the VPN gateway or ExpressRoute/Direct Connect
termination, shared firewalls, DNS forwarders — and every other
VNet/VPC (each "spoke") peers only to the hub, never directly to each
other. On-premises connectivity terminates once, in the hub, and every
spoke inherits it through that single relationship. This is the same
hub-and-spoke topology you've already seen inside a single cloud's
networking design; hybrid architecture just extends it so that
on-premises sites are, functionally, additional spokes connecting
through the same hub.

## Key terms

| Term | Meaning |
|---|---|
| Site-to-site VPN | An encrypted IPsec tunnel over the public internet connecting an on-premises network to a cloud VNet/VPC; cheap and fast to deploy, variable throughput |
| Azure ExpressRoute | A dedicated, private circuit connecting on-premises infrastructure directly to Microsoft's network, bypassing the public internet |
| AWS Direct Connect | AWS's equivalent dedicated private circuit, connecting on-premises or colocation infrastructure directly into AWS |
| Microsoft Entra Connect | The sync/federation service that extends on-premises Active Directory identities into Microsoft Entra ID |
| AWS Directory Service | AWS's hybrid identity service family, including AD Connector (proxies to on-prem AD) and Managed Microsoft AD (trusts on-prem AD) |
| Hub-and-spoke | A network topology where all on-prem and cloud connectivity terminates in a central hub, and spokes connect only to the hub |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking back:
why would an enterprise run both a dedicated circuit and a
site-to-site VPN for the same connection, and why does hybrid identity
nearly always mean extending an existing Active Directory rather than
building a second one?
