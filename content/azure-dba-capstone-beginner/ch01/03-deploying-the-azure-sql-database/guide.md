# Lesson 3 — Deploying the Azure SQL Database

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 3 of 10**

## What you'll learn

- The real two-level resource hierarchy behind Overlook's database: logical server, then database
- How to deploy both with the Azure CLI, the same commands used in production
- Which service tier is the honest, appropriately-sized choice for this project
- Why this deployment choice already has real backup consequences, before Lesson 4 even starts

## The hierarchy you're deploying

Overlook's database is an **Azure SQL Database** — the PaaS tier, where
Microsoft manages the underlying OS, patching, and (as you'll see in
Lesson 4) the backup mechanism itself. Every Azure SQL Database sits inside
a two-level hierarchy:

```
Subscription
└── Resource group:  rg-overlook-dba-capstone
    └── Logical server:  sql-overlook-capstone    (az sql server create)
        └── Database:    db-overlook-core          (az sql db create)
```

The **logical server** owns the admin login, firewall rules, and the DNS
name (`<server-name>.database.windows.net`) — it's a management boundary,
not a physical machine you provision or patch. The **database** owns its
own compute/storage tier and, importantly for this capstone, its own
backup retention settings. Getting this split right matters: some settings
you'll touch in later lessons live at the server level, some at the
database level.

## Deploying the logical server

```
az group create \
  --name rg-overlook-dba-capstone \
  --location eastus2

az sql server create \
  --name sql-overlook-capstone \
  --resource-group rg-overlook-dba-capstone \
  --location eastus2 \
  --admin-user overlookadmin \
  --admin-password "<a strong password>"
```

The server name must be globally unique across all of Azure — it becomes
part of the public DNS name, which is exactly why real deployments use a
project-specific naming convention (`sql-overlook-capstone`) rather than a
generic word. `--admin-user` and `--admin-password` set up SQL
authentication for this project; Chapter 4 of the full Azure DBA course
covers layering Microsoft Entra ID authentication on top, but that's out
of scope for this capstone.

## Deploying the database

```
az sql db create \
  --name db-overlook-core \
  --resource-group rg-overlook-dba-capstone \
  --server sql-overlook-capstone \
  --edition GeneralPurpose \
  --family Gen5 \
  --capacity 2
```

**General Purpose** is the right, honest choice here — it's the standard
vCore tier for real production workloads that don't need the premium tier's
higher I/O or the Hyperscale tier's massive-scale storage. For a single
provider network's patient-scheduling and billing database, General
Purpose at a small compute size (`--capacity 2`, meaning 2 vCores) is sized
appropriately — not under-provisioned, and not paying for capacity nobody
needs. This mirrors the real tier-selection logic from the full Azure DBA
course's purchasing-model lessons, applied to a concrete, small project
instead of left abstract.

## Allowing your own connection

A freshly created logical server has no firewall rules — nothing can
reach it yet, including you:

```
az sql server firewall-rule create \
  --resource-group rg-overlook-dba-capstone \
  --server sql-overlook-capstone \
  --name allow-my-ip \
  --start-ip-address <your-public-ip> \
  --end-ip-address <your-public-ip>
```

This opens exactly one IP address — yours — rather than the broad
"Allow Azure services" toggle, which is the narrower, more defensible
default for a project like this.

## The backup consequence you've already made

Here's the detail worth sitting with before Lesson 4: by deploying this as
an **Azure SQL Database** rather than SQL Server on an Azure VM, you've
already decided something about backups — Microsoft takes automated full,
differential, and log backups on its own schedule, and you don't get to run
a raw `BACKUP DATABASE` statement against it the way you would on-prem.
That's not a gap in this capstone; it's the real, accurate behavior of the
platform you chose, and it shapes exactly what Lessons 4 through 7 actually
look like for this project.

## Key terms

| Term | Meaning |
|---|---|
| Logical server | The Azure resource owning the admin login, firewall rules, and DNS name for one or more databases |
| General Purpose tier | The standard vCore service tier for production workloads without extreme I/O or scale needs |
| Firewall rule | An IP range explicitly allowed to connect to the logical server — nothing connects by default |
| PaaS (Azure SQL Database) | The tier where Microsoft manages the OS and the backup mechanism, not you |

## Lab

Run the three CLI commands above (resource group, server, database) against
your own subscription, using a unique server name. Confirm the database
shows as **Online** in the Azure Portal before continuing to Lesson 4.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: which
settings live on the logical server versus the database, and why deploying
Azure SQL Database (instead of SQL Server on a VM) already changes what a
backup plan for this project can and can't include.
