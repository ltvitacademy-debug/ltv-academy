# Lesson 27 — Virtual Networks & Service Endpoints

**Chapter 5 · Azure SQL Network Security · Lesson 27 of 95**

## What you'll learn

- What an Azure Virtual Network (VNet) is, in exactly the terms a DBA needs
- How a VNet service endpoint extends your VNet's identity onto Azure SQL's public endpoint
- Why service endpoints restrict by network identity instead of IP address
- Configuring a Virtual Network rule and what it actually changes about traffic

## The limitation service endpoints solve

Lesson 26's firewall rules allow-list IP addresses. That works, but IP addresses are a leaky proxy
for "my application." A VM in your VNet can get a different public IP after a restart unless you've
pinned one. An IP-based rule also can't distinguish "this resource, because it's mine" from "this
IP, because it happened to match" — if that IP is later reassigned to someone else's resource inside
Azure's shared address space, the old rule could theoretically still apply.

A **VNet service endpoint** solves this differently: instead of trusting an IP range, it extends
your **Virtual Network's identity** onto Azure SQL's public endpoint. Traffic from a subnet with a
service endpoint enabled is tagged with that subnet's actual Azure network identity, and Azure SQL's
firewall can then have a rule that says "only allow traffic that Azure itself has already vouched
for as coming from *this specific VNet and subnet*" — not just "traffic whose header claims this IP."

```
IP firewall rule:          "let in anything claiming to be from 10.1.2.0/24"
VNet service endpoint rule: "let in only traffic Azure itself confirms came from subnet X in VNet Y"
```

## What a Virtual Network actually is, for this purpose

An Azure **Virtual Network (VNet)** is your own private network space inside Azure — an address
range you define, split into **subnets**, where your VMs, App Service instances, and other
resources get private IP addresses. You've likely met VNets already if you deployed a Managed
Instance (Chapter 2) or an Azure SQL VM, since both require one. For this chapter, what matters is
narrower: a VNet is the unit of network identity that service endpoints and Lesson 28's Private
Endpoints both build on.

## Turning on a service endpoint

Enabling this feature happens in two places that both have to be configured, or it silently doesn't
work:

1. **On the subnet itself** — enable the `Microsoft.Sql` service endpoint on the specific subnet
   whose resources need to reach Azure SQL. This tells Azure "traffic leaving this subnet toward
   Azure SQL should be tagged with this VNet's identity" instead of routing as ordinary internet
   traffic.
2. **On the Azure SQL server** — add a **Virtual Network rule** on the server's Networking page (or
   via T-SQL/PowerShell) naming that specific VNet and subnet.

```sql
-- Server-side: create the virtual network rule referencing the subnet's resource ID
EXEC sp_set_firewall_rule -- server-level IP rules use this proc;
-- Virtual Network rules themselves are configured via the Portal, Azure CLI, or PowerShell
-- (New-AzSqlServerVirtualNetworkRule), not directly through sp_set_firewall_rule.
```

```
az sql server vnet-rule create \
  --resource-group myRG \
  --server myserver \
  --name allow-app-subnet \
  --vnet-name myVNet \
  --subnet mySubnet
```

Once both sides are configured, only traffic originating from that named subnet is allowed through
under this rule — resources anywhere else, even with a matching IP, are still evaluated against the
ordinary IP firewall rules (and rejected unless one of those separately permits them).

## What a service endpoint does not do

A service endpoint still routes traffic over Azure's backbone to Azure SQL's **public endpoint** —
Azure SQL still has a public IP address that technically exists and is technically reachable from
the internet, just gated by the firewall (IP rules plus VNet rules together). It does **not** give
your database a private IP address inside your VNet, and it does not remove Azure SQL's public
endpoint from existence. That distinction — public endpoint with a tighter gate, vs. no public
endpoint at all — is exactly what separates this lesson from Lesson 28's Private Endpoints, and it's
the center of Lesson 29's decision framework.

## Key terms

| Term | Meaning |
|---|---|
| Virtual Network (VNet) | Your private, address-ranged network space inside Azure, split into subnets |
| Service endpoint | A subnet-level setting that tags outbound traffic to a specific Azure service with the VNet's identity |
| Virtual Network rule | The server-side firewall rule that allows traffic tagged with a specific VNet/subnet |
| `Microsoft.Sql` | The service endpoint type that extends VNet identity specifically to Azure SQL |

## Lab

1. On an existing VNet's subnet, enable the `Microsoft.Sql` service endpoint (Portal: subnet
   settings → Service endpoints).
2. On your Azure SQL logical server's Networking page, add a Virtual Network rule pointing at that
   same VNet and subnet.
3. From a VM inside that subnet, confirm you can connect; from a VM in a different subnet without
   the rule, confirm you cannot — even if its IP would otherwise be allowed.

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: what does a service endpoint
change about *how* traffic is identified, and why is that more reliable than an IP-based firewall
rule alone?
