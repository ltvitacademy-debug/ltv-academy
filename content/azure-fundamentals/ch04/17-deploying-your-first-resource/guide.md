# Lesson 17 — Deploying Your First Resource

**Chapter 4 · Working in Azure · Lesson 17 of 18**

## What you'll learn

- Tying together resource groups (Lesson 5), storage accounts (Lessons 6/7), and the CLI (Lesson 15) into one real walkthrough
- Deploying the same thing two ways: through the Portal, and through the CLI
- What actually happens, in order, when a resource gets created
- Cleaning up afterward, and why that matters with pay-as-you-go billing

## The plan: a resource group, then a storage account

Every real Azure deployment starts the same way conceptually: create a
**resource group** to hold things (Lesson 5), then create the actual
resource inside it — here, a **storage account** (Lessons 6/7), one of the
simplest, cheapest real resources to deploy and a good first target.

## Method 1: through the Portal

This is the same Portal you toured in Lesson 4:

1. Sign in to the Azure Portal, search "Resource groups," select **Create**
2. Name it (e.g. `rg-first-deploy`), pick a subscription and region, **Review + create**
3. Inside the new resource group, select **Create a resource → Storage account**
4. Name the storage account (must be globally unique, lowercase, no spaces — e.g. `ltvfirstdeploy01`), confirm the resource group and region, leave defaults, **Review + create**
5. Wait for "Deployment succeeded," then open the resource to see it live

Every field you filled in during that flow maps to something from an earlier
lesson: the resource group is Lesson 5, the region is Lesson 3, and the
account's redundancy setting is the replication concept from Lesson 7.

## Method 2: the same thing, through the CLI

The exact same two resources, as CLI commands from Lesson 15:

```
az login

az group create \
  --name rg-first-deploy \
  --location eastus

az storage account create \
  --name ltvfirstdeploy01 \
  --resource-group rg-first-deploy \
  --location eastus \
  --sku Standard_LRS
```

`--sku Standard_LRS` picks the redundancy tier — Standard performance,
Locally Redundant Storage, the cheapest replication option from Lesson 7.
Run these four lines and you get the exact same result as the five-step
Portal walkthrough above — same resource group, same storage account, same
underlying ARM Resource Manager call either way (Lesson 16).

## What actually happens, in order

Whichever method you use, the sequence underneath is identical:

```
1. Your request (Portal click or CLI command) reaches
   Azure Resource Manager (the same engine ARM templates talk to)
2. Resource Manager checks your RBAC permissions at that scope (Lesson 11)
3. Resource Manager validates the request and provisions the resource
4. The resource becomes visible and billable (Lesson 12) once created
```

The Portal and CLI are two different front doors to the exact same process.

## Cleaning up afterward

Storage accounts are billed the moment they exist, even nearly empty
(Lesson 12's pay-as-you-go model). Deleting the resource group deletes
everything inside it in one action — `az group delete --name
rg-first-deploy` from the CLI, or the **Delete resource group** button in
the Portal. For a practice deployment like this one, deleting it right after
confirming it worked is the right habit, not an afterthought — leaving
practice resources running is exactly the kind of thing a Lesson 12 budget
alert exists to catch.

## Key terms

| Term | Meaning |
|---|---|
| Resource group | The container created first, to hold the resources that go inside it |
| Storage account | A simple, cheap real resource — a good first deployment target |
| SKU | The specific tier/configuration of a resource, e.g. `Standard_LRS` |
| Resource Manager | The engine underneath both the Portal and the CLI |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: what's
identical about deploying through the Portal versus the CLI, and what's
different?
