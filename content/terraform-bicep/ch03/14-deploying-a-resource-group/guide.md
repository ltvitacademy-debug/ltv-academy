# Lesson 14 — Deploying a Resource Group

**Chapter 3 · Bicep for Azure Data Resources · Lesson 14 of 22**

## What you'll learn

- The `az deployment group create` command that actually runs a Bicep file
- Scoping a deployment to a specific resource group vs. a subscription
- What VS Code's deployment pane shows while a deployment runs
- What-if, Bicep's version of Lesson 18's Terraform `plan`

## The command that runs a Bicep file

Everything through Lesson 13 was authoring. Deploying it is a
single Azure CLI command, scoped to an existing resource group:

```
az deployment group create \
  --resource-group data-platform-dev \
  --template-file main.bicep \
  --parameters storageAccountName=dataplatformdevsa01
```

`--resource-group` is the scope — this deployment can only create,
update, or delete resources inside `data-platform-dev`, never outside
it. `--parameters` supplies the values the file's `param` declarations
need (Lesson 13), either inline like this or from a `.bicepparam` file.

## What-if: Bicep's version of Terraform's plan

Lesson 18 will cover Terraform's `plan` step — a dry run showing
what would change before anything actually does. Bicep has the same
idea, one flag earlier:

```
az deployment group create \
  --resource-group data-platform-dev \
  --template-file main.bicep \
  --parameters storageAccountName=dataplatformdevsa01 \
  --what-if
```

`--what-if` reports exactly what would be created, modified, or left
unchanged — without touching anything — the same "see the diff before
you commit to it" review this course keeps coming back to.

## Watching it run in VS Code

Run the deployment from inside VS Code with the Bicep extension's
"Deploy Bicep File" command, and the extension opens a deployment
pane showing live progress per resource:

![VS Code's deployment pane showing a Bicep deployment's live progress, resource by resource.](/courses/terraform-bicep/ch03/14-deploying-a-resource-group/bicep-deployment-pane.png)

That's a convenience over the CLI, not a different deployment — under
the hood it runs the exact same `az deployment group create` call.

## Scope: resource group vs. subscription

Every deployment targets a scope. `az deployment group create`
targets a resource group — the right scope for almost everything in
this course (a storage account, an Event Hub, an Azure SQL server all
live inside one). `az deployment sub create` targets an entire
subscription instead, used for things that live above any single
resource group, like the resource group itself.

## Key terms

| Term | Meaning |
|---|---|
| `az deployment group create` | Runs a Bicep/ARM template against a specific existing resource group |
| Scope | What a deployment is allowed to touch — resource group, subscription, or higher |
| `--what-if` | A dry run reporting the exact diff without changing anything |
| Deployment pane | VS Code's live progress view for a running deployment |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
would you run a deployment with `--what-if` before running it for
real, and what does it actually tell you that a plain deploy doesn't?
