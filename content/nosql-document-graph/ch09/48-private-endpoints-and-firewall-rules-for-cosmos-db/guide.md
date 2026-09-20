# Private Endpoints & Firewall Rules for Cosmos DB

The previous lesson introduced network isolation as one layer of Cosmos DB's security
model. This lesson goes one level deeper into the two mechanisms a DBA actually configures:
IP firewall rules, the simpler allow-list approach, and Private Endpoints, the stronger
option that removes the public internet from the path entirely.

## What you'll learn

- How Cosmos DB's IP firewall rules restrict access by public IP range
- What a Private Endpoint actually does — and why it's a materially stronger control than a firewall rule
- How these two mechanisms compare, and when each is the right fit

## IP firewall rules: an allow-list on the public endpoint

By default, a newly created Cosmos DB account is reachable from any IP address on the
internet (authentication via keys or RBAC is still required — this doesn't bypass that).
The **IP firewall** narrows this down to an explicit allow-list: specific public IP
addresses or CIDR ranges, such as an office's outbound IP or a known application server's
address. Azure also exposes a toggle to allow access from "Azure services" (useful for
things like Azure Data Factory or Azure Functions that don't have a fixed IP), which should
be scoped as narrowly as the workload allows rather than left broadly enabled.

This is the direct equivalent of a SQL Server firewall rule restricting which client IPs can
reach a public endpoint — simple to configure, and a meaningful improvement over "open to
the world," but the account still has a public IP address that firewall rules are filtering
traffic *to*. It's a control on top of a publicly reachable surface, not a removal of that
surface.

## Private Endpoints: removing the public path entirely

A **Private Endpoint** is a network interface with a private IP address, provisioned inside
your own Azure Virtual Network, that maps directly to your specific Cosmos DB account using
Azure Private Link. Once configured:

- Traffic from resources inside that VNet (or peered/connected VNets, or on-premises via
  VPN/ExpressRoute) reaches Cosmos DB over the Microsoft backbone network, never touching
  the public internet
- The Cosmos DB account's public network access can be disabled entirely, so even a leaked
  key is useless to an attacker without network-level access to the VNet first
- DNS resolution for the account's endpoint is redirected (via a private DNS zone) to the
  private IP, so application connection strings don't need to change

This is a materially stronger posture than firewall rules: a firewall rule filters *who can
reach* a public endpoint, while a Private Endpoint means there generally isn't a reachable
public endpoint to begin with. It's the Azure-native equivalent of putting a database server
on a private subnet with no public-facing NIC at all — familiar territory for a DBA who has
locked down SQL Server behind a VNet before.

## Choosing between them

Firewall rules are quick to set up and reasonable for scenarios with a small number of
known, stable public IPs (a dev/test environment, a single on-prem office). Private
Endpoints require more upfront VNet and DNS configuration but are the recommended approach
for production workloads, especially anything handling sensitive data, because they
eliminate the public attack surface rather than just filtering it. The two aren't mutually
exclusive during a migration — an account can keep firewall rules in place for existing
access paths while a Private Endpoint is rolled out, then disable public access once
everything routes through the VNet.

## Key terms

| Term | Meaning |
|---|---|
| IP firewall rule | An allow-list of public IP addresses/ranges permitted to reach a Cosmos DB account's public endpoint |
| Private Endpoint | A private-IP network interface inside a VNet, using Azure Private Link, that maps directly to a Cosmos DB account |
| Azure Private Link | The underlying Azure service that enables private, backbone-network connectivity to a PaaS resource like Cosmos DB |
| Public network access (disabled) | An account setting that removes the publicly reachable endpoint once Private Endpoint connectivity is in place |

## Check yourself

How does a Private Endpoint differ from an IP firewall rule in terms of what it actually
removes from the attack surface, not just what it filters?
