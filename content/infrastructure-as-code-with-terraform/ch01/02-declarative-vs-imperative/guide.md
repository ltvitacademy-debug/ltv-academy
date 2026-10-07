# Declarative vs. Imperative

Terraform is a **declarative** tool, and that word does a lot of work in this course. Before going further, it's worth seeing exactly what it means — and what the alternative looks like — using the same simple task Northbridge Retail's team actually needs: standing up a resource group and a storage account.

## What you'll learn

- The difference between declarative and imperative approaches to automation
- Why Terraform is declarative, and what that means in practice
- The same task written two ways: an imperative Azure CLI script and a declarative Terraform file
- What "idempotent" means, and why it matters for infrastructure

## Two ways to tell a tool what to do

An **imperative** script is a list of steps, run in order: first do this, then do that. You, the author, are responsible for every step and for the order they happen in.

A **declarative** configuration instead describes the end state you want — "this resource group and this storage account should exist, with these settings" — and leaves it to the tool to figure out what steps are needed to get there. You never write "create the resource group, then create the storage account inside it." You just describe both, and Terraform works out that the resource group has to exist first.

## The same task, two ways

Here's an imperative Azure CLI script doing the job step by step:

```bash
az group create --name rg-northbridge-dev --location eastus2
az storage account create \
  --name northbridgedevimages \
  --resource-group rg-northbridge-dev \
  --location eastus2 \
  --sku Standard_LRS
```

And here's the declarative Terraform equivalent:

```hcl
resource "azurerm_resource_group" "dev" {
  name     = "rg-northbridge-dev"
  location = "eastus2"
}

resource "azurerm_storage_account" "images" {
  name                     = "northbridgedevimages"
  resource_group_name      = azurerm_resource_group.dev.name
  location                 = azurerm_resource_group.dev.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
```

Both end up creating the same two resources. But the CLI script only knows how to run once, in order, from empty. The Terraform file describes a state — and that distinction matters the moment you run either one a second time.

## Idempotent: run it again, nothing happens

Run the Azure CLI script twice, and the second run either errors out ("a resource group with this name already exists") or, depending on the command, tries to create a duplicate. The script has no memory of what it already did.

Run `terraform apply` on the same configuration twice, and the second run reports **"No changes. Your infrastructure matches the configuration."** Terraform compares the desired state in your files against the real infrastructure, finds nothing to do, and stops. That property — running the same operation repeatedly with no unintended side effects — is called **idempotent**, and it's one of the most important guarantees a declarative tool gives you.

## Why declarative wins for infrastructure

Declarative tools like Terraform and imperative scripts both have a place — a one-off cleanup task is often easier as an imperative script. But for infrastructure that needs to exist consistently across dev, staging, and production, and that needs to be safely re-run without careful thought about "did I already do this step," declarative wins. The rest of this course — state, modules, the plan/apply workflow — all builds on that one idea: describe what should exist, and let Terraform reconcile reality with it.

## Key terms

| Term | Meaning |
|---|---|
| Imperative | A list of ordered steps the author must sequence and track manually |
| Declarative | A description of the desired end state, with the tool determining the steps |
| Idempotent | Running the same operation repeatedly produces the same result with no unintended side effects |
| Desired state | What your configuration says should exist — what Terraform compares reality against |
