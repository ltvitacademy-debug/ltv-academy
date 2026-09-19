# Lesson 7 — Creating Azure SQL Servers & Databases

**Chapter 2 · Deploying Azure SQL · Lesson 7 of 95**

## What you'll learn

- The real resource hierarchy behind every Azure SQL Database: logical server, then database
- How to create both with the Azure CLI, not just the Portal
- Which properties belong to the server and which belong to the database
- Why understanding this hierarchy matters before Lesson 8's tiers and Lesson 9's DTU/vCore choice

## The hierarchy Lesson 6's lab already used

Lesson 6's lab created a logical server, then a database inside it,
through the Portal. That two-level hierarchy isn't a Portal artifact
— it's the real resource model underneath Azure SQL Database, and
it's the same hierarchy the CLI exposes directly:

```
Subscription
└── Resource group
    └── Logical server           (az sql server)
        ├── database-1            (az sql db)
        ├── database-2            (az sql db)
        └── elastic pool          (az sql elastic-pool) — Lesson 10
```

A logical server owns authentication (the admin login, and later
Entra ID integration in Chapter 4), firewall rules, and auditing
policy. A database owns its own compute/storage tier, backups
retention, and connection limits. Getting this split right matters
because some settings you'll configure later live at one level and
some at the other — get it backwards and you'll spend time looking
for a setting in the wrong blade or the wrong CLI command group.

## Creating the server with the Azure CLI

```
az sql server create \
  --name sql-azuredba-prod01 \
  --resource-group rg-azure-dba-prod \
  --location eastus2 \
  --admin-user sqladmin \
  --admin-password "<a strong password>"
```

This is the CLI equivalent of the "create new server" step Lesson
6's lab did inline in the Portal wizard. The server name must be
globally unique across all of Azure — it becomes part of the DNS
name `<name>.database.windows.net` — which is why real deployments
use a naming convention rather than a plain word like `prod`.

## Creating the database with the Azure CLI

```
az sql db create \
  --name db-orders-prod \
  --resource-group rg-azure-dba-prod \
  --server sql-azuredba-prod01 \
  --edition GeneralPurpose \
  --family Gen5 \
  --capacity 2
```

`--edition`, `--family`, and `--capacity` are the vCore-model
knobs — Lesson 9 covers exactly what each one means and how they
compare to the DTU model's simpler `--edition Standard --capacity
50` style syntax. Both commands return immediately with resource
metadata; actual provisioning finishes in the background, typically
within a minute or two for a single database.

## Why CLI over Portal for real environments

Lesson 6's lab used the Portal because it's the fastest way to see
the pieces the first time. Real environments increasingly use the
CLI (or Bicep/ARM, covered in Chapter 11) because it's repeatable,
scriptable, and reviewable — the exact same `az sql server create`
and `az sql db create` commands can be checked into source control
and run identically in three environments. This lesson isn't
choosing CLI over Portal permanently; it's adding the tool a real
DBA reaches for once "click through the wizard once" stops being
enough.

## Key terms

| Term | Meaning |
|---|---|
| Logical server | Owns authentication, firewall rules, and auditing — the parent of one or more databases |
| `az sql server create` | CLI command creating the logical server resource |
| `az sql db create` | CLI command creating a database inside an existing logical server |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking:
which settings live on the logical server, and which live on the
individual database, and why a firewall rule you add on the server
protects every database underneath it?
