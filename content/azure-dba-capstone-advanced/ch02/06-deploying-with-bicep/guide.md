# Lesson 6 — Deploying With Bicep

**Chapter 2 · Provisioning With Bicep · Lesson 6 of 26**

## What you'll learn

- The real `az deployment group create` command that deploys Overlook's template
- How parameter values actually get supplied at deploy time, password included
- Two independent ways to confirm the deployment actually succeeded
- Why Chapter 2 ends here, and what Chapter 3 builds on top of it

## The deploy command

With the template written (Lesson 4) and parameterized (Lesson 5), deploying it is one command:

```
az deployment group create \
  --resource-group OverlookRG \
  --template-file main.bicep \
  --parameters environmentName=dev \
               sqlServerName=overlook-sql-dev \
               sqlDatabaseName=OverlookDB \
               sqlAdminLogin=overlookadmin \
               sqlAdminPassword=$SQL_ADMIN_PASSWORD
```

Every value after `--parameters` corresponds directly to a `param` declared in Lesson 5.
`$SQL_ADMIN_PASSWORD` is an environment variable set in the shell (or a CI/CD pipeline's secret
store) immediately before this command runs — never a value typed in plain text on the command
line where it could end up in shell history, and never a literal string sitting in a script file
checked into source control.

## Deploying prod is the same command, different values

```
az deployment group create \
  --resource-group OverlookRG-Prod \
  --template-file main.bicep \
  --parameters environmentName=prod \
               sqlServerName=overlook-sql-prod \
               sqlDatabaseName=OverlookDB \
               sqlAdminLogin=overlookadmin \
               sqlAdminPassword=$SQL_ADMIN_PASSWORD_PROD
```

This is Lesson 5's parameterization paying off directly: the template file, and the resource
definitions inside it, are completely unchanged between these two commands. Only the resource
group, the names, and which secret variable holds the password differ.

## Confirming the deployment actually worked — two independent checks

A deployment command returning success is one signal, but it's not the only one worth checking:

1. **The CLI's own exit code and JSON output** — `az deployment group create` returns a
   `provisioningState` of `Succeeded` and prints the resource IDs it created.
2. **The Azure Portal's deployment history for the resource group** — an independent, second
   confirmation, showing the deployment as "Succeeded" alongside every resource it touched. This
   matters specifically because it's a *different system* reporting the same outcome — if the CLI
   reported success but the Portal's own history showed something else, that discrepancy would be
   worth investigating before trusting the environment.

Checking both, rather than just trusting the command that ran, is the same habit a DBA uses after
any production change — never rely on a single source of truth for "did this actually work."

## What exists now, and what doesn't yet

After this lesson, Overlook has a real, reproducible Azure SQL server and database — in dev, and
optionally in prod — deployed from a reviewable file instead of remembered Portal clicks. What it
does not have yet: any firewall rule allowing a specific client to connect, any encryption beyond
Azure SQL's TDE default, any auditing, and no failover group. Those are exactly Chapters 3 and 4,
built on top of this now-reproducible foundation.

## Key terms

| Term | Meaning |
|---|---|
| `az deployment group create` | The Azure CLI command that deploys a Bicep template into a resource group |
| `provisioningState` | The deployment's reported outcome — `Succeeded`, `Failed`, or similar |
| Independent confirmation | Checking a second, different system (Portal history) rather than trusting one source alone |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what changes, and what stays
exactly the same, between deploying Overlook's dev environment and its prod environment with this
template?
