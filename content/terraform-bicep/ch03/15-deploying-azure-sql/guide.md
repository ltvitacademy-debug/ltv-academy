# Lesson 15 — Deploying Azure SQL With Bicep

**Chapter 3 · Bicep for Azure Data Resources · Lesson 15 of 22**

## What you'll learn

- A real, complete Bicep resource block for an Azure SQL logical server and database
- Why the server's admin password belongs in a secure parameter, not the file
- How to confirm a deployment actually succeeded in the Azure Portal, not just the CLI
- What changes and what stays the same versus deploying a Storage Account (Lesson 8)

## The resource, in full

Azure DBA Lesson 3 covered Azure SQL Database vs. Managed Instance
vs. a SQL Server VM. This lesson deploys the first of those — a
logical server plus one database — as code:

```
resource sqlServer 'Microsoft.Sql/servers@2023-08-01-preview' = {
  name: sqlServerName
  location: location
  properties: {
    administratorLogin: sqlAdminLogin
    administratorLoginPassword: sqlAdminPassword
  }
}

resource sqlDatabase 'Microsoft.Sql/servers/databases@2023-08-01-preview' = {
  parent: sqlServer
  name: sqlDatabaseName
  location: location
  sku: {
    name: 'S0'
    tier: 'Standard'
  }
}
```

`sqlDatabase`'s `parent: sqlServer` line is the same automatic
dependency Lesson 12 covered — Bicep knows the database can't exist
before the server does, without an explicit `dependsOn`.

## A password never belongs in the file

`sqlAdminPassword` is declared as a `@secure()` parameter, never a
plain string with a default:

```
@secure()
param sqlAdminPassword string
```

`@secure()` tells Bicep never to log this value in deployment history
or output it anywhere — it must be supplied at deploy time (from a
Key Vault reference, an environment variable, or a CI/CD secret —
Lesson 20 covers that last one), never hardcoded.

## What's actually different from provisioning a Storage Account

The mechanics are identical to Lesson 8's Terraform storage account —
a resource block, a name, a few properties, a deploy command. What's
different is the *shape*: Azure SQL is a two-resource pair (server,
then database as its child), where a Storage Account was a single
resource. Most real Azure resources for data engineering work this
way — a parent resource with one or more children declared right
alongside it.

## Confirming it actually worked

`az deployment group create` returning success is one signal. The
Azure Portal's own deployment history for that resource group is the
second, independent confirmation — showing the deployment as
"Succeeded" alongside every resource it touched:

![The Azure Portal's deployment history for a resource group, confirming a deployment actually succeeded — independent confirmation beyond the CLI's own exit code.](/courses/terraform-bicep/ch03/15-deploying-azure-sql/deployment-history.png)

## Key terms

| Term | Meaning |
|---|---|
| `parent:` | Declares one resource as a child of another — the automatic-dependency mechanism from Lesson 12 |
| `@secure()` | Marks a parameter as a secret — never logged or output, must be supplied at deploy time |
| Deployment history | The Azure Portal's own record of a deployment's outcome, independent of the CLI |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
does `sqlAdminPassword` need `@secure()`, and what would go wrong if
it were declared as a plain `string` parameter with a default value?
