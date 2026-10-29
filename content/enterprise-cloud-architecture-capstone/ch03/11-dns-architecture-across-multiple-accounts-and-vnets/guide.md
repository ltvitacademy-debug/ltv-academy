# Lesson 11 — DNS Architecture Across Multiple Accounts and VNets

**Chapter 3 · Network Architecture at Enterprise Scale · Lesson 3 of 4**

## What you'll learn

- Why name resolution gets genuinely hard once an organization has
  more than one VNet or VPC, instead of staying a single-server
  afterthought
- How Azure Private DNS zones and virtual network links work, and
  what the Azure Private DNS Resolver adds on top of them
- How AWS Route 53 Private Hosted Zones, VPC associations, and the
  Route 53 Resolver's inbound/outbound endpoints solve the same
  problem on AWS
- Why centralizing DNS in the hub, rather than running it per spoke,
  is the pattern that actually scales — and what that costs you in
  flexibility

## Why DNS gets hard at more than one network

A single VNet or VPC can resolve its own private resource names
without much thought — Azure and AWS both provide basic private name
resolution inside one network automatically. The moment a second
network enters the picture, that stops being enough. A workload in
spoke A needs to resolve a name that lives in spoke B's private DNS
zone. A workload anywhere in Azure needs to resolve an on-premises
name during a hybrid migration, and an on-premises server needs to
resolve an Azure private name right back. Multiply that by dozens of
spokes and a landing-zone's worth of accounts, and "just configure
DNS on each VNet" turns into dozens of inconsistent configurations
that nobody can reason about as a whole.

## Azure: Private DNS zones, virtual network links, and the Resolver

Azure's building block is the **private DNS zone** — a zone like
`internal.contoso.com` that holds private A/CNAME records, created
once:

```
az network private-dns zone create \
  --resource-group hub-rg \
  --name internal.contoso.com
```

A private DNS zone only resolves for VNets it's **linked** to. A
**virtual network link** connects a zone to a VNet, and critically,
that link can span VNets in different subscriptions:

```
az network private-dns link vnet create \
  --resource-group hub-rg \
  --zone-name internal.contoso.com \
  --name spoke-a-link \
  --virtual-network spoke-a-vnet \
  --registration-enabled false
```

That single mechanism — one zone, linked to every spoke that needs
it — is what lets a hub-hosted DNS zone serve every spoke without
duplicating the zone per spoke. Private DNS zones alone, though, only
resolve Azure-native names for linked VNets; they don't help with
**hybrid** resolution, where an on-premises resolver needs to reach
Azure private names or vice versa. That's what the **Azure Private
DNS Resolver** adds: an **inbound endpoint** lets on-premises DNS
servers query Azure private zones through a private IP in a VNet, and
an **outbound endpoint** lets Azure VMs forward queries for specific
domains — via DNS forwarding rulesets — out to on-premises DNS
servers. Put together, the Resolver turns "Azure DNS" and
"on-premises DNS" into one coherent resolution path in both
directions, without standing up IaaS DNS servers to do it by hand.

## AWS: Private Hosted Zones, associations, and Route 53 Resolver

AWS's building block is the **Private Hosted Zone**, Route 53's
version of a private DNS zone, which likewise only resolves for VPCs
it's **associated** with:

```
aws route53 create-hosted-zone \
  --name internal.example.com \
  --vpc VPCRegion=us-east-1,VPCId=vpc-0a1b2c3d4e5f67890 \
  --hosted-zone-config PrivateZone=true

aws route53 associate-vpc-with-hosted-zone \
  --hosted-zone-id Z1D633PJN98FT9 \
  --vpc VPCRegion=us-east-1,VPCId=vpc-0f1e2d3c4b5a69870
```

A hosted zone created in one account can be associated with a VPC in
a different account by authorizing the association first — the same
cross-account sharing idea as Azure's cross-subscription virtual
network link, expressed through Route 53's authorization API instead.

For hybrid resolution, AWS's answer is the **Route 53 Resolver**: an
**inbound endpoint** accepts DNS queries from on-premises aimed at
Route 53-hosted private zones, and an **outbound endpoint** paired
with a **resolver rule** forwards queries for specific domains out to
on-premises DNS servers — the same inbound/outbound split Azure's
Private DNS Resolver uses, under different names.

## Centralized vs. per-account DNS

With both building blocks, there are genuinely two ways to organize
DNS across a multi-account or multi-VNet org:

- **Per-account/per-spoke DNS**: each team runs its own private
  zone(s) and resolver configuration. Maximum autonomy, but every
  team re-solves the same hybrid-resolution problem independently,
  and nothing guarantees any two teams' configurations are
  consistent — one team's resolver rule can silently diverge from
  another's.
- **Centralized DNS in the hub**: one set of private zones (or
  hosted zones) and one Resolver/Private DNS Resolver deployment
  lives in the hub, and every spoke links or associates into it. One
  team owns DNS architecture; every spoke gets consistent, centrally
  managed resolution by default, the same shared-services pattern the
  hub already provides for firewalling and connectivity.

Centralized DNS is the pattern that scales, for the same reason
centralized egress through the hub scales: one consistent policy
instead of N inconsistent ones. The tradeoff is that a team wanting
an unusual DNS configuration — a nonstandard forwarder, a zone that
genuinely shouldn't be organization-wide — has to go through the
central team rather than just configuring it themselves, which is
exactly the kind of guardrail-vs-gate tension this chapter's
governance-at-scale material (Chapter 5) returns to directly.

## Key terms

| Term | Meaning |
|---|---|
| Private DNS zone / Private Hosted Zone | Azure's / AWS's private namespace for internal names, resolved only for networks explicitly linked/associated to it |
| Virtual network link / VPC association | The mechanism connecting a private zone to a VNet or VPC, and the thing that can cross subscription/account boundaries |
| Azure Private DNS Resolver | Inbound/outbound endpoints that bridge Azure private DNS and on-premises DNS in both directions |
| Route 53 Resolver | AWS's equivalent: inbound endpoints accept on-premises queries, outbound endpoints plus resolver rules forward domain-specific queries out to on-premises DNS |
| Centralized DNS | Hosting zones/resolvers once in the hub and linking every spoke into them, instead of each spoke running its own |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
does a private DNS zone alone not solve hybrid, on-premises-to-cloud
resolution, and what specific component — on both Azure and AWS —
closes that gap?
