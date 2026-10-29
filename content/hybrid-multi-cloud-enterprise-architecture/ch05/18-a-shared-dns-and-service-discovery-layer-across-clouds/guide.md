# Lesson 18 — A Shared DNS and Service Discovery Layer Across Clouds

**Chapter 5 · Multi-Cloud Networking and Connectivity · Lesson 2 of 4**

## What you'll learn

- Why the connectivity from Lesson 17 isn't enough on its own — a
  working tunnel or circuit still leaves services unable to find each
  other by name
- How to extend Azure's Private DNS Resolver and AWS's Route 53
  Resolver — the same inbound/outbound endpoint model from hybrid DNS
  architecture — across the cross-cloud link instead of just to
  on-premises
- Why resolving by name instead of hardcoded IP genuinely matters once
  addresses live behind load balancers, NAT gateways, or autoscaling
  groups on the other cloud
- How to decide which side "owns" a shared internal namespace, and
  why that decision has to be made explicitly

## Connectivity isn't service discovery

A VPN tunnel or a colocation meet-point from Lesson 17 solves routing
— packets can now get from a VNet to a VPC. It does not solve
**naming**. A service in Azure still has no way to ask "where is
`orders-api.internal`?" and get back an AWS private IP, because
Azure's DNS has never heard of AWS's private zones, and the reverse is
equally true. Without a shared resolution layer, the only option is
hardcoding IP addresses into configuration — and cross-cloud private
IPs are exactly the addresses most likely to change, sitting as they
usually do behind a load balancer, a NAT gateway, or an autoscaling
group whose instances come and go. A hardcoded IP that worked at
deploy time is a production incident waiting for the next scale event.

## Reusing the Resolver model across clouds, not just to on-prem

The building blocks here are the same ones from DNS architecture
across multiple accounts and VNets — they just point somewhere new.
Azure's **Private DNS Resolver** has an inbound endpoint (accepts
queries from outside Azure) and an outbound endpoint paired with
forwarding rules (sends specific-domain queries out). Previously that
"outside" was on-premises; now it's AWS, reached over the Lesson 17
link instead of a hybrid circuit:

```
az dns-resolver forwarding-ruleset create \
  --resource-group hub-rg \
  --dns-resolver-outbound-endpoints aws-outbound-endpoint \
  --name forward-to-aws-ruleset

az dns-resolver forwarding-rule create \
  --resource-group hub-rg \
  --ruleset-name forward-to-aws-ruleset \
  --name aws-internal-rule \
  --domain-name "aws.internal." \
  --target-dns-servers '[{"ip-address":"10.50.2.10","port":53}]'
```

AWS's **Route 53 Resolver** mirrors it exactly: an inbound endpoint
accepts queries aimed at Route 53 private hosted zones, and an
outbound endpoint plus a resolver rule forwards queries for a
specific domain — say `azure.internal` — across the link to Azure's
inbound endpoint. Both directions get configured, because name
resolution across a cross-cloud link is not automatically
bidirectional just because the network path is.

## Deciding who owns the shared namespace

With both Resolvers forwarding to each other, the remaining design
question is organizational, not technical: which side is
authoritative for which names? A workable pattern splits it cleanly —
`azure.internal` is Azure's private DNS zone, Azure owns it, and
AWS's Resolver forwards queries for it across; `aws.internal` is the
mirror image. Nobody tries to run one unified zone split across two
clouds' native DNS services, because neither cloud's Private DNS
zone / Private Hosted Zone can be the sole source of truth for records
that another cloud's control plane needs to write. A clear naming
convention — a suffix that tells you which cloud's zone owns a name —
keeps that split obvious to anyone reading a config file, long after
whoever built the link has moved on.

## Key terms

| Term | Meaning |
|---|---|
| Azure Private DNS Resolver | Inbound/outbound endpoints bridging Azure private DNS to a query source outside Azure — on-prem in Lesson 11, AWS here |
| Route 53 Resolver | AWS's equivalent inbound/outbound endpoint pair, forwarding domain-specific queries across the cross-cloud link via a resolver rule |
| Forwarding rule / resolver rule | The per-domain instruction telling a Resolver's outbound endpoint which queries to send to the other cloud, and where |
| Namespace ownership | The explicit decision about which cloud's private zone is authoritative for a given internal domain, so no name has two conflicting sources of truth |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
does working cross-cloud connectivity not automatically give you
cross-cloud name resolution, and what two Resolver components does
each cloud need configured to close that gap in both directions?
