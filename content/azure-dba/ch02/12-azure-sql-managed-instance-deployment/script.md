# Script — Azure SQL Managed Instance Deployment & Configuration

## Segment 1 (title)

Managed Instance needs everything Azure SQL Database needs, plus one hard requirement: a dedicated subnet inside a Virtual Network, delegated specifically to it. That network isolation is what makes near-full SQL Server surface area possible on a PaaS product.

## Segment 2 (screenshot: compute and storage configuration)

This is the real Portal screen for configuring a new Managed Instance's compute and storage — the same vCore choices from Lesson 9, scoped to an instance instead of a single database, plus the VNet and subnet selection required before you can even reach it.

## Segment 3 (code: the honest deployment time)

Provisioning a new Managed Instance commonly takes four to six hours, sometimes longer — not the minute or two Azure SQL Database needed. That's the real provisioning time for the infrastructure behind its near-full SQL Server surface with PaaS patching.

## Segment 4 (screenshot: deployment in progress)

This is exactly what you should expect to see for hours after clicking create — a deployment-in-progress status, not an error. Never assume a deployment still running after twenty minutes has failed.

## Segment 5 (steps: what to actually do while it deploys)

There's nothing to click or fix while it runs. Confirm the subnet has no conflicting resources, prepare firewall and NSG rules ahead of time, and draft the migration plan you'll execute once it's up — don't delete and retry just because it's taking a while.

## Segment 6 (outro)

Next up: SQL Server on Azure VMs and hybrid SQL — the full-IaaS option, and Azure Hybrid Benefit applied to licensing directly.
