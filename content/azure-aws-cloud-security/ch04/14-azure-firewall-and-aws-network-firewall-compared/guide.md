# Lesson 14 — Azure Firewall and AWS Network Firewall Compared

**Chapter 4 · Network Security Across Both Clouds · Lesson 2 of 4**

## What you'll learn

- How Azure Firewall Policy organizes rules into NAT, network, and
  application rule collections, and what each one actually filters on
- How AWS Network Firewall splits rules into stateless and stateful rule
  groups, and why its stateful rules speak Suricata syntax
- How each firewall is physically wired into the network — subnet
  placement, routing, and the per-AZ deployment model
- Where to reach for FQDN-based filtering versus 5-tuple filtering in each
  cloud, and why that choice matters for egress control

## Azure Firewall: policy, rule collections, and a dedicated subnet

Azure Firewall is a fully managed, stateful firewall deployed into its own
subnet — `AzureFirewallSubnet`, minimum `/26`. Traffic reaches it because a
**user-defined route (UDR)** on the workload subnets sends `0.0.0.0/0` to
the firewall's private IP as the next hop, instead of straight to the
internet.

Rules live in an **Azure Firewall Policy**, organized into rule
collections, each with its own priority:

- **Network rules** — 5-tuple filtering: source, destination, protocol,
  port. This is the IP/port-level equivalent of an NSG rule, but centralized
  for an entire hub instead of per subnet.
- **Application rules** — filter by **FQDN**, not IP. You can allow
  `*.windowsupdate.com` or a specific SaaS domain without ever knowing its
  changing IP ranges — something an NSG or Security Group structurally
  cannot do.
- **NAT rules** — DNAT, translating a public IP:port on the firewall to a
  private IP:port behind it.

```
# Azure Firewall Policy rule collection (conceptual)
RuleCollectionGroup: "DefaultNetworkRuleCollectionGroup"
  RuleCollection: "Allow-DNS" (priority 100)
    Rule: Allow UDP 53 from 10.0.0.0/16 to 168.63.129.16
  RuleCollection: "Allow-Microsoft-Update" (priority 200, Application)
    Rule: Allow https to *.windowsupdate.com from 10.0.0.0/16
```

Standard SKU covers network/application/NAT rules and threat
intelligence-based filtering; **Premium** adds TLS inspection, an
IDPS engine, and URL (not just FQDN) filtering.

## AWS Network Firewall: stateless first-pass, stateful Suricata rules

AWS Network Firewall deploys **firewall endpoints** into dedicated subnets
in each Availability Zone you want covered — one endpoint per AZ, which is
a real operational difference from Azure's single regional firewall
instance: you're wiring routing per AZ, not once per region.

A **Firewall Policy** attaches two kinds of rule groups:

- **Stateless rule groups** — a fast first pass, matching on the same
  5-tuple as a network rule, each rule carrying an explicit priority and an
  action (`aws:pass`, `aws:drop`, `aws:forward_to_sfe`).
- **Stateful rule groups** — written in **Suricata-compatible rule
  syntax**, the same rule language used by the open-source Suricata IDS/IPS
  engine. This is also how domain/FQDN filtering is done in AWS Network
  Firewall — not a separate rule type, but a Suricata rule using the `tls`
  or `http` keyword against `HOME_NET`:

```
# Stateful rule group — Suricata syntax
alert tls $HOME_NET any -> $EXTERNAL_NET any \
  (tls.sni; content:"update.microsoft.com"; nocase; \
   msg:"allowed update domain"; sid:1000001; rev:1)
```

Routing changes per subnet: each protected subnet's route table sends
`0.0.0.0/0` to the Network Firewall endpoint in its own AZ, and the
firewall subnet itself routes to an internet gateway or NAT gateway.

## Side by side

| | Azure Firewall | AWS Network Firewall |
|---|---|---|
| Rule language | Rule collections (Network/Application/NAT) in a Firewall Policy | Stateless 5-tuple rules + stateful Suricata-syntax rules |
| FQDN filtering | Native application rules | Suricata `tls.sni` / `http.host` keywords |
| Deployment | One instance per `AzureFirewallSubnet`, regional | One endpoint per AZ, per-subnet routing |
| Central multi-account management | Azure Firewall Manager | AWS Firewall Manager |
| Deep packet inspection (IDPS/TLS) | Premium SKU | Built into stateful engine |

## Key terms

| Term | Meaning |
|---|---|
| Azure Firewall Policy | The container of rule collections (NAT, Network, Application) applied to one or more Azure Firewalls |
| UDR (User-Defined Route) | A route table entry forcing traffic through the firewall instead of directly to its destination |
| Suricata rule syntax | The IDS/IPS rule language AWS Network Firewall's stateful engine uses natively |
| Firewall endpoint | AWS Network Firewall's per-AZ network interface that traffic is routed through |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why does
AWS Network Firewall need a separate endpoint per Availability Zone, while
Azure Firewall doesn't — and where does FQDN-based filtering actually live
in each one's rule model?
