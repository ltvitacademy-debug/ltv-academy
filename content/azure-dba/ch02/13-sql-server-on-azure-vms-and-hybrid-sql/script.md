# Script — SQL Server on Azure Virtual Machines & Hybrid SQL

## Segment 1 (title)

SQL Server on an Azure VM is genuinely full IaaS — the real binary, on a VM you provision, behaving exactly like an on-prem instance because it is one, just running on Azure's hypervisor.

## Segment 2 (code: what full IaaS gets you)

Every SQL Server feature and version with no PaaS gaps, full OS-level access for any agent or tool, your own patching cadence, and the same backup and HA/DR work an on-prem DBA already does.

## Segment 3 (code: Hybrid Benefit on the VM itself)

Azure Hybrid Benefit lets you apply an existing SQL Server license with Software Assurance to a VM image, so you pay Azure only for infrastructure, not a license you already own. For a real migration, this is often the single biggest cost lever in the whole project.

## Segment 4 (steps: hybrid SQL connectivity)

Hybrid SQL means some workloads stay on-prem by design while others run in Azure, connected over private networking. VPN Gateway gives an encrypted tunnel over the public internet; ExpressRoute gives a private, dedicated circuit with no public internet at all.

## Segment 5 (steps: Chapter 2's arc, closed)

Azure SQL Database is fastest and least to manage. Managed Instance gives near-full surface, still PaaS, but takes hours to deploy. SQL Server on a VM is full IaaS with full surface and real hybrid connectivity.

## Segment 6 (outro)

Chapter 2 is complete. Chapter 3, Designing & Scaling Database Resources, picks this same three-way decision back up against real business requirements, plus partitioning, compression, sharding, and Azure Arc and Fabric.
