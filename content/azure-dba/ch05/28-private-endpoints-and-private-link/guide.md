# Lesson 28 — Private Endpoints & Private Link

**Chapter 5 · Azure SQL Network Security · Lesson 28 of 95**

## What you'll learn

- What a Private Endpoint actually is: a private IP for your database, inside your own VNet
- How Azure Private Link routes that traffic entirely off the public internet
- The real before/after of approving a private endpoint connection
- Why this is the strongest network control in this chapter, and what it costs you

## The problem Lessons 26-27 don't fully solve

Firewall rules (Lesson 26) and VNet service endpoints (Lesson 27) both narrow *who* can reach Azure
SQL's public endpoint. Neither one removes that public endpoint. Azure SQL still has a publicly
resolvable DNS name and a public IP that technically exists on the internet, gated by rules that —
however well configured — are still rules layered on top of public exposure. For workloads with a
strict compliance requirement of "this database must not be reachable from the public internet, full
stop," gating isn't enough. You need to remove the public path entirely.

## What a Private Endpoint actually is

A **Private Endpoint** is a network interface, with its own **private IP address from your own
VNet's address space**, that represents your Azure SQL server (or database) as if it were just
another resource living inside your VNet. Once it's created, your applications connect to that
private IP — traffic never leaves Azure's private backbone, and never touches the public internet
at all, even though it's headed to a PaaS resource like Azure SQL that isn't literally deployed
inside your VNet.

This is powered by **Azure Private Link**, the underlying service that makes first-party and
third-party PaaS services (Azure SQL, Storage, Key Vault, and others) reachable via a private IP
inside a consumer's VNet. Private Link is the mechanism; the Private Endpoint is the specific
network object it creates for your server.

```
Public endpoint + firewall (Lessons 26-27):
  public DNS name resolves → public IP exists → gated by firewall/VNet rules

Private Endpoint (this lesson):
  DNS name resolves to a PRIVATE IP inside your VNet → no public path exists for this traffic at all
```

## The approval workflow — a real before/after

Creating a Private Endpoint isn't instant and automatic from the consumer's side alone — it goes
through a connection request that the resource owner (or an Azure Policy/RBAC-driven automatic
approval) must approve. Before approval, the connection sits in a pending state:

![Azure Portal private endpoint connections list showing a connection in Pending state, awaiting approval](/courses/azure-dba/ch05/28-private-endpoints-and-private-link/pec-list-before.png)
*Before approval: the private endpoint connection exists but traffic isn't flowing yet — it's Pending.*

Once approved (by someone with the right permission on the Azure SQL server side), the connection
state flips to Approved and the private IP path becomes live:

![Azure Portal private endpoint connections list showing the same connection now in Approved state](/courses/azure-dba/ch05/28-private-endpoints-and-private-link/pec-list-after.png)
*After approval: the same connection, now Approved — the private IP path is live and traffic flows.*

This approval step matters operationally: someone controlling the Azure SQL server has to explicitly
say yes to each private endpoint connection request, which is itself a security control — a VNet
owner can't silently wire up private connectivity to your database without your side approving it.

## DNS is the part that quietly breaks this

A Private Endpoint's private IP only does anything useful if clients actually resolve the server's
DNS name to that private IP instead of the public one. This requires an **Azure Private DNS zone**
(`privatelink.database.windows.net`) linked to the consuming VNet, with a DNS record pointing the
server's name at the new private IP. Skip this, and clients still resolve to the public IP and either
fail (if you've also locked down public access) or quietly bypass the private path entirely. Lesson
30's troubleshooting checklist treats this DNS step as one of the most common real-world failure
points — worth remembering now, before you hit it in practice.

## What you give up

Private Endpoints cost real setup complexity: a VNet, a subnet for the endpoint, correct private DNS
zone linking, and — if you fully disable the public endpoint — a hard requirement that every client,
including your own workstation for ad-hoc admin work, has network line-of-sight into that VNet
(VPN, ExpressRoute, or a jump box). That trade-off, and when it's worth it, is Lesson 29's entire
subject.

## Key terms

| Term | Meaning |
|---|---|
| Private Endpoint | A network interface with a private IP, inside your VNet, representing your Azure SQL server |
| Azure Private Link | The underlying service that makes PaaS resources reachable via a private IP |
| Connection approval | The pending → approved workflow the resource owner controls before traffic flows |
| `privatelink.database.windows.net` | The Private DNS zone that must resolve the server name to its private IP |

## Lab

1. Create a Private Endpoint for a test Azure SQL server, targeting a subnet in your VNet.
2. Observe the connection in **Pending** state on the server's Private endpoint connections page,
   then approve it and confirm it flips to **Approved**.
3. Link a `privatelink.database.windows.net` Private DNS zone to the VNet and confirm `nslookup`
   against the server's name now resolves to the private IP from inside that VNet.

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: what specifically does a Private
Endpoint remove that a well-configured firewall rule and VNet service endpoint still leave in place?
