# Lesson 12 — Azure SQL Managed Instance Deployment & Configuration

**Chapter 2 · Deploying Azure SQL · Lesson 12 of 95**

## What you'll learn

- The VNet requirement that makes Managed Instance's deployment fundamentally different from Azure SQL Database's
- How long a real Managed Instance deployment actually takes — and why
- What the compute/storage configuration step actually looks like
- What to do (and not do) while a deployment is running for hours

## The requirement Lesson 3 and 7 didn't need: a VNet subnet

Every Azure SQL Database deployment in this chapter so far needed
only a logical server. Managed Instance needs that same logical
resource shape but adds one hard requirement neither Azure SQL
Database nor SQL Server on a VM has in quite the same way: a
**dedicated subnet inside a Virtual Network**, delegated
specifically to Managed Instance and used by nothing else. This
isn't optional configuration you can skip and add later — it's a
precondition for creation, because Managed Instance's near-100%
SQL Server surface area (Lesson 3) depends on network isolation a
shared multi-tenant database can't offer.

![Configuring compute and storage for a new Azure SQL Managed Instance in the Azure Portal.](/courses/azure-dba/ch02/12-azure-sql-managed-instance-deployment/open-compute-storage-page.png)

This is the real Portal compute/storage configuration page during
Managed Instance creation — the same vCore-model choices from
Lesson 9 (service tier, vCores, storage), but scoped to an instance
rather than a single database, plus the VNet/subnet selection this
screen requires before you can even reach it.

## The honest part: deployment takes hours

This is the detail that surprises almost every DBA the first time:
provisioning a new Managed Instance commonly takes **four to six
hours**, sometimes longer, not the minute or two Azure SQL Database
needed in Lesson 6's lab. This isn't a bug or a slow subscription —
it's the actual provisioning time for the underlying infrastructure
Managed Instance builds to give you that near-full SQL Server
surface with PaaS patching guarantees.

![The Azure Portal showing a Managed Instance deployment in progress — a status a DBA should expect to see for hours, not minutes.](/courses/azure-dba/ch02/12-azure-sql-managed-instance-deployment/azure-sql-managed-instance-create-deployment-in-progress.png)

That screenshot is exactly what you should expect to see for a long
stretch after clicking create — a deployment-in-progress status,
not an error. Planning around this reality matters operationally:
never start a Managed Instance deployment as the last step before a
deadline, and never assume a deployment that's still running after
twenty minutes has failed.

## What to actually do during a multi-hour deployment

There's genuinely nothing to click or fix while it runs — the
correct DBA behavior is to plan the *next* steps rather than babysit
the Portal:

```
While Managed Instance deploys (hours):
  - Confirm the VNet subnet has no conflicting resources
  - Prepare firewall/NSG rules for the subnet ahead of time
  - Draft the migration or connection plan you'll execute once it's up
  - Do NOT delete and retry just because it's "taking a while"
```

## Key terms

| Term | Meaning |
|---|---|
| Delegated subnet | A VNet subnet reserved exclusively for Managed Instance — required before creation |
| Deployment-in-progress | The normal, expected status for hours during Managed Instance creation |
| Instance pool | An optional way to reduce per-instance deployment time for multiple smaller instances (not covered in depth here) |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking:
why can't you simply skip the VNet subnet requirement and add it
after a Managed Instance is already running, the way you might add
a firewall rule to Azure SQL Database after the fact?
