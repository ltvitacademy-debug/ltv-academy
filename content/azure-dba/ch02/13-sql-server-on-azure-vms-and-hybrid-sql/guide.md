# Lesson 13 — SQL Server on Azure Virtual Machines & Hybrid SQL

**Chapter 2 · Deploying Azure SQL · Lesson 13 of 95**

## What you'll learn

- Why SQL Server on an Azure VM is genuinely full IaaS, closing the loop from Lesson 4
- How Azure Hybrid Benefit applies to VM licensing, not just vCore compute
- What "hybrid SQL" means in practice: on-prem Active Directory, ExpressRoute, and VPN scenarios
- How Chapter 2's whole arc — Database, Managed Instance, VM — resolves into one closing picture

## Full IaaS, closing the loop from Lesson 4

Lesson 4 mapped IaaS vs. PaaS onto all three options; SQL Server on
an Azure VM was the one row where you patch both the OS and SQL
Server yourself. This lesson is that row, in practice: you provision
a VM (choosing the OS image, size, and disks like any other Azure
VM), install SQL Server on it — or use a pre-built Azure Marketplace
image with SQL Server already installed — and from that point
forward it behaves exactly like an on-prem instance, because it
genuinely *is* one, just running on Azure's hypervisor instead of
your own hardware.

```
What you get for "just" full IaaS:
  - every SQL Server feature and version, no PaaS feature gaps
  - full OS-level access — install any agent, any tool, any driver
  - your own patching cadence — control, but also obligation
  - the same backup/HA/DR work an on-prem DBA already does
```

## Azure Hybrid Benefit, applied to the VM itself

Lesson 9 covered Azure Hybrid Benefit as a vCore-model discount on
Azure SQL Database compute. On a VM, Hybrid Benefit works
differently but toward the same goal: it lets you apply an existing
SQL Server license (with Software Assurance) to a SQL Server-on-VM
image, so you pay Azure only for the VM's infrastructure and not
again for a SQL Server license you already own. For an organization
migrating existing licensed servers into Azure, this is often the
single biggest cost lever in the whole migration — bigger than the
purchasing-model decisions in Lessons 8-9, because it applies to
the full retail SQL Server license cost, not just a usage-based
compute rate.

## Hybrid SQL: when "in Azure" isn't the whole story

"Hybrid SQL" describes architectures where some SQL Server
workloads stay on-prem permanently — not as a migration in progress,
but by design — while others run in Azure, connected together over
private, non-internet-routed networking. Two connectivity options
make that real:

| Option | What it provides |
|---|---|
| VPN Gateway | Encrypted tunnel over the public internet between on-prem and Azure |
| ExpressRoute | Private, dedicated circuit — no public internet at all |

A common real driver for hybrid SQL: an organization's Active
Directory domain controllers stay on-prem, but a SQL Server VM in
Azure joins that same domain over ExpressRoute or VPN, so Windows
Authentication keeps working exactly as it did before any workload
moved. Chapter 4's Entra ID authentication content revisits this
same on-prem-identity problem from the authentication side
specifically.

## Chapter 2's arc, closed

```
Azure SQL Database        -- fastest, least to manage, database-scoped
Azure SQL Managed Instance -- near-full surface, still PaaS, hours to deploy
SQL Server on Azure VM     -- full IaaS, full surface, hybrid connectivity
```

Every lesson since Lesson 7 has been one deployment option in
depth. Chapter 3 picks this exact decision back up — not "how do I
deploy each one" anymore, but "which one actually fits this specific
business requirement," now that storage, scaling, and compliance
are all on the table too.

## Key terms

| Term | Meaning |
|---|---|
| SQL Server on Azure VM | Full IaaS; the actual SQL Server binary, on a VM you manage above the hypervisor |
| Azure Hybrid Benefit (VM) | Applies an owned SQL Server license to a VM image, avoiding a second license cost |
| Hybrid SQL | Some workloads permanently on-prem, others in Azure, connected via VPN or ExpressRoute |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking:
why is Azure Hybrid Benefit often the single biggest cost lever for
an organization migrating licensed on-prem servers to SQL Server on
an Azure VM, compared to the vCore-vs-DTU decision for Azure SQL
Database?

---

Chapter 2 is complete. Chapter 3, "Designing & Scaling Database
Resources," picks this exact three-way decision back up against
real business requirements — plus table partitioning, compression,
sharding, and the newer Azure Arc and Microsoft Fabric integrations
DP-300's current blueprint added.
