# Lesson 2 — Resource Groups and Azure Resource Manager

**Chapter 1 · Azure Fundamentals & Governance · Lesson 2 of 4**

## What you'll learn

- What a resource group actually is: a logical container for resources that share a lifecycle
- Why a resource group's own location is just metadata, not where every resource inside it has to live
- What Azure Resource Manager (ARM) is, and why every deployment tool — Portal, CLI, PowerShell, SDKs, templates — calls the same ARM API underneath
- How ARM templates declare what to deploy, and how resource locks protect what's already running

## A resource group is a shared lifecycle, not just a folder

A **resource group** is the logical container every Azure resource is deployed into — one level below
a subscription in the hierarchy from Lesson 1. Resources in the same resource group share a
**lifecycle**: they're typically deployed together, managed together, and — critically — deleted
together. There's no separate step to empty a resource group before deleting it; delete the group and
everything inside it goes with it.

```
az group create --name rg-prod-eastus-web --location eastus

az group delete --name rg-test-westus-app --yes --no-wait
```

The `--location` on `az group create` is easy to misread as "every resource in this group must live
in East US." It isn't. That location only stores the resource group's own metadata — individual
resources inside it can be deployed to any region you choose. `az group delete` removes the group
and every resource in it; `--yes` skips the confirmation prompt and `--no-wait` returns control to
you immediately instead of blocking until deletion finishes.

## Azure Resource Manager: the layer everything calls

Here's the detail that ties the whole platform together. Whether you click through the Azure Portal,
run an Azure CLI command, run an Azure PowerShell cmdlet, call the REST API directly, or deploy an
ARM template, every single one of those tools sends its request to the same place: the **Azure
Resource Manager (ARM)** API. ARM is the control plane for the entire platform — it authenticates the
request, checks RBAC and Azure Policy, and then actually creates, updates, or deletes the resource.
No tool bypasses it. That's also why RBAC and Azure Policy, once assigned at a scope, apply no matter
which tool someone used to try to make a change.

## ARM templates: declaring what you want

An **ARM template** is a JSON file (or its more readable alternative, **Bicep**) that declares the
resources you want deployed, rather than the step-by-step commands to create them:

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2023-01-01",
      "name": "stprodeastusweb001",
      "location": "eastus",
      "sku": { "name": "Standard_LRS" },
      "kind": "StorageV2"
    }
  ]
}
```

ARM reads the template, compares it to what's already deployed, and only changes what's actually
different — submit the same template twice and the second run makes no changes at all. That
**idempotence** is what makes templates safe to re-run as part of a repeatable deployment process,
rather than a one-time script you have to remember to edit next time.

## Protecting what's already deployed

Because everything in a resource group shares a lifecycle, the resource group level is also where you
apply protection against accidental deletion:

```
az lock create \
  --name DontDelete \
  --resource-group rg-prod-eastus-web \
  --lock-type CanNotDelete
```

A `CanNotDelete` lock blocks deletion of the resource group and everything inside it until the lock
itself is removed — a small safeguard worth setting on anything running in production, independent of
whatever RBAC permissions someone has.

## Key terms

| Term | Meaning |
|---|---|
| Resource group | A logical container for resources that share a lifecycle — deployed, managed, and deleted together |
| Azure Resource Manager (ARM) | The management layer every deployment tool calls underneath — Portal, CLI, PowerShell, SDKs, templates |
| ARM template / Bicep | A declarative file describing the resources to deploy; ARM only changes what's actually different |
| Resource lock | A setting (`CanNotDelete` or `ReadOnly`) that blocks accidental changes to a resource group or resource |

## Check yourself

If you delete a resource group, what happens to every resource inside it — and why does that make
deciding resource group boundaries a deliberate design decision, rather than an arbitrary way to
organize resources?
