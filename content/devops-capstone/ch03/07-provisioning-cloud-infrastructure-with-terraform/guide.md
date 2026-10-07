# Provisioning Cloud Infrastructure With Terraform

Phase 1 gave you two containerized services running locally under Compose. Phase 2 moves them onto real Azure infrastructure, and it starts the way every serious infrastructure project should: not by clicking around the Azure portal, but by writing Terraform that describes what should exist. This lesson builds the `infra/terraform/` project for Northbridge Retail — resource groups, VNets, and the Postgres Flexible Server — and walks through a real incident that happens almost immediately once more than one engineer touches the same Terraform state: a locking collision.

## What you'll learn

- How `infra/terraform/` is organized, and why modules (networking, database, state backend) beat one giant file
- How to configure the `azurerm` remote state backend so Terraform state isn't a file on someone's laptop
- The resource groups and VNets for dev and prod, and the Postgres Flexible Server resource
- What actually happens when two engineers run `terraform apply` at the same time, and why the second one fails safely instead of corrupting state

## Project structure

Northbridge's Terraform lives at `infra/terraform/` inside the `storefront` monorepo, split into modules so dev and prod can share code without sharing state:

```
infra/terraform/
  backend.tf              # remote state configuration
  main.tf                 # root module: wires networking + database together
  variables.tf
  outputs.tf
  modules/
    networking/           # resource group, VNet, subnets
    database/             # Postgres Flexible Server
  environments/
    dev.tfvars
    prod.tfvars
```

Each environment is applied with its own var file (`terraform apply -var-file=environments/dev.tfvars`), but both environments read from the same module code — a VNet in dev and a VNet in prod are the same Terraform resource type with different inputs, not two copies of hand-written HCL.

## Remote state: the `azurerm` backend

Before any resource gets created, Terraform needs somewhere durable to keep track of what it created. A `.tfstate` file on one engineer's laptop is a single point of failure and makes collaboration impossible — nobody else's `terraform apply` knows what the first person already built. Northbridge configures an `azurerm` backend that stores state as a blob in Azure Storage:

```hcl
# infra/terraform/backend.tf
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sttfstatenorthbridge"
    container_name       = "tfstate"
    key                  = "dev.terraform.tfstate"
  }
}
```

Production uses the same storage account and container with a different `key`:

```hcl
# applied with: terraform init -backend-config="key=prod.terraform.tfstate"
```

That one difference — `dev.terraform.tfstate` vs. `prod.terraform.tfstate` — is what keeps the two environments' state completely isolated inside one storage account, so Northbridge doesn't need to stand up and pay for a second backend just to separate dev from prod.

## Resource groups and VNets

```hcl
# modules/networking/main.tf
resource "azurerm_resource_group" "this" {
  name     = "rg-northbridge-${var.environment}"
  location = "eastus"
}

resource "azurerm_virtual_network" "this" {
  name                = "vnet-northbridge-${var.environment}"
  address_space       = [var.vnet_cidr]
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
}

resource "azurerm_subnet" "aks_nodes" {
  name                 = "snet-aks-nodes"
  resource_group_name  = azurerm_resource_group.this.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = [var.aks_subnet_cidr]
}

resource "azurerm_subnet" "postgres" {
  name                 = "snet-postgres"
  resource_group_name  = azurerm_resource_group.this.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = [var.postgres_subnet_cidr]
  delegation {
    name = "postgres-delegation"
    service_delegation {
      name    = "Microsoft.DBforPostgreSQL/flexibleServers"
      actions = ["Microsoft.Network/virtualNetworks/subnets/join/action"]
    }
  }
}
```

`environments/dev.tfvars` sets `vnet_cidr = "10.10.0.0/16"` and `environments/prod.tfvars` sets `vnet_cidr = "10.20.0.0/16"` — the same module, two non-overlapping address spaces, so dev and prod networks could even be peered later without a renumbering project.

## The Postgres Flexible Server

```hcl
# modules/database/main.tf
resource "azurerm_postgresql_flexible_server" "this" {
  name                   = "psql-northbridge-${var.environment}"
  resource_group_name    = var.resource_group_name
  location               = "eastus"
  version                = "16"
  administrator_login    = var.admin_login
  administrator_password = var.admin_password
  storage_mb             = 32768
  sku_name               = "GP_Standard_D2s_v3"
  delegated_subnet_id    = var.postgres_subnet_id
  zone                   = "1"
}

resource "azurerm_postgresql_flexible_server_database" "product_catalog" {
  name      = "product_catalog"
  server_id = azurerm_postgresql_flexible_server.this.id
}

resource "azurerm_postgresql_flexible_server_database" "checkout" {
  name      = "checkout"
  server_id = azurerm_postgresql_flexible_server.this.id
}
```

Note the `administrator_password` variable — it is never a literal string in `.tfvars` committed to Git. It's sourced from Key Vault via a data source once Lesson 9 wires that up; for now it's marked `sensitive = true` and passed at apply time.

## The incident: two `terraform apply` runs collide

Early in the infrastructure build-out, two Northbridge engineers each want to add a subnet to the dev VNet. Both pull `main`, both run `terraform apply` within a few minutes of each other, against the same `rg-northbridge-dev` resource group. Here's what happens:

```
$ terraform apply
Acquiring state lock. This may take a few moments...

Error: Error acquiring the state lock

Error message: state blob is already locked
Lock Info:
  ID:        3f2a9e7c-...
  Path:      tfstate/dev.terraform.tfstate
  Operation: OperationTypeApply
  Who:       priya@NORTHBRIDGE-DEV01
  Created:   2026-08-14 14:22:03 UTC
```

The `azurerm` backend uses an Azure Storage **blob lease** as a distributed lock. The instant the first `apply` starts, it leases the state blob; the second `apply` can't acquire that lease, so Terraform refuses to proceed and prints exactly who is holding the lock. The second engineer waits a few minutes and reruns — no state corruption, no half-applied plan, no mystery drift.

This is the whole argument for remote state with locking in one sentence: **without it**, both applies would have read the same stale local state file, computed two different diffs against the real Azure resources, and one of them would have silently overwritten the other's changes in the state file — leaving Terraform's record of the world out of sync with Azure itself, which is far harder to diagnose than a locked blob telling you to wait.

## Key terms

- **Remote state** — Terraform's record of managed resources stored in a shared backend (here, an Azure Storage blob) instead of a local file
- **State locking** — a mechanism preventing two concurrent `apply`/`plan` operations from writing to state at the same time
- **Blob lease** — the Azure Storage primitive the `azurerm` backend uses to implement state locking
- **Module** — a reusable, parameterized unit of Terraform code (here, `networking` and `database`) applied once per environment with different variables
- **`tfvars`** — a file supplying variable values for a specific environment (`dev.tfvars`, `prod.tfvars`)
