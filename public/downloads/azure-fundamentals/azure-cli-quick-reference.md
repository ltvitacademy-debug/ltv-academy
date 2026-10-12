# Azure CLI Quick Reference

The commands from Lesson 15 (Azure CLI Basics) and Lesson 17 (Deploying
Your First Resource), compiled into one reference with the general pattern
spelled out, so you can read an unfamiliar `az` command without having to
look each piece up separately.

## The general pattern

Almost every Azure CLI command follows the same shape:

```
az <service> <action> --<parameter> <value>
```

| Piece | Meaning |
|---|---|
| `az` | You're calling the Azure CLI |
| `<service> <action>` | What you're doing, e.g. `group create`, `storage account create` |
| `--<parameter> <value>` | A named value the action needs, e.g. `--name`, `--location` |

## Authentication and identity

```sh
az login                          # sign in — opens a browser to authenticate
az account show                   # confirm which subscription you're using
az account list                   # see all subscriptions you have access to
```

## Resource groups (Lesson 5)

```sh
az group create \
  --name rg-demo \
  --location eastus               # create a resource group

az group list                     # see all resource groups in the subscription

az group delete \
  --name rg-demo                  # delete the group AND everything inside it
```

## Storage accounts (Lessons 6/7)

```sh
az storage account create \
  --name ltvfirstdeploy01 \
  --resource-group rg-first-deploy \
  --location eastus \
  --sku Standard_LRS               # Standard performance, Locally Redundant Storage
```

`--sku Standard_LRS` is the redundancy tier — the cheapest replication
option. Storage account names must be globally unique, lowercase, with no
spaces or special characters.

## Virtual machines

```sh
az vm list                        # see all virtual machines in the subscription
```

## Why this matters more than it looks

A CLI command is **scriptable** (save it in a file, run it any time, run it
as part of an automated pipeline), **repeatable** (the tenth run creates
exactly the same thing as the first, with no chance of a misclick), and
**fast** (one command instead of clicking through several Portal menus).
That's the same instinct the Terraform & Bicep course and Infrastructure as
Code (Lesson 16) build on directly — once you're doing something more than
once, a saved command beats repeating clicks from memory.

## What happens underneath, every time

Whether you use the CLI or the Portal, the request goes through the same
process:

```
1. Your request reaches Azure Resource Manager
2. Resource Manager checks your RBAC permissions at that scope
3. Resource Manager validates the request and provisions the resource
4. The resource becomes visible and billable once created
```

## Clean-up habit

Resources are billed from the moment they exist. For any practice
deployment, delete the resource group as soon as you've confirmed it
worked:

```sh
az group delete --name rg-first-deploy
```
