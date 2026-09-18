# Lesson 8 — Provisioning a Storage Account

**Chapter 2 · Terraform for Azure Data Resources · Lesson 8 of 22**

## What you'll learn

- A complete, real `azurerm_storage_account` configuration, start to finish
- The naming constraints that make storage account names different from most Azure resources
- The meaning of `account_tier` and `account_replication_type`
- Running `terraform plan` and `terraform apply` against this exact configuration

## The resource you already created by hand

DE Foundations Lesson 1, "Azure Storage Accounts," had you create
this exact resource type by hand in the Azure Portal — picking a
name, a region, a redundancy option, clicking Create. Everything
you learned there about *what* a storage account is and *why* you'd
configure it a certain way still applies. This lesson is about
writing that same decision down as code instead of clicks.

## The complete configuration

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.80"
    }
  }
}

provider "azurerm" {
  features {}
}

variable "environment" {
  type        = string
  description = "Environment name, used to build resource names"
  default     = "dev"
}

resource "azurerm_resource_group" "example" {
  name     = "rg-dataeng-${var.environment}"
  location = "eastus2"
}

resource "azurerm_storage_account" "example" {
  name                     = "ltvdataeng${var.environment}001"
  resource_group_name      = azurerm_resource_group.example.name
  location                 = azurerm_resource_group.example.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

output "storage_account_id" {
  value = azurerm_storage_account.example.id
}
```

Every piece of this you've already seen: the `terraform` and
`provider` blocks from Lesson 4, the resource group and storage
account resource blocks from Lesson 6, the variable and output from
Lesson 7 — assembled into one real, deployable configuration.

## Storage account names follow stricter rules than most resources

Unlike a resource group name, an Azure Storage Account name must be:

- **Globally unique across all of Azure** — not just your
  subscription, *every* Azure customer's storage accounts share one
  namespace.
- **Lowercase letters and numbers only** — no hyphens, no
  underscores, no uppercase.
- **3 to 24 characters long.**

That's why the example above builds the name from a variable
(`"ltvdataeng${var.environment}001"`) rather than a fixed string —
it keeps the name short, valid, and distinct per environment without
you having to remember the rules every time you type a literal name.

## `account_tier` and `account_replication_type`

- `account_tier` — `"Standard"` (magnetic/SSD-backed, cost-optimized)
  or `"Premium"` (SSD-only, higher performance, higher cost).
- `account_replication_type` — how many copies of your data Azure
  keeps, and where:

```
LRS  - Locally redundant   - 3 copies, one datacenter
ZRS  - Zone-redundant       - copies across availability zones
GRS  - Geo-redundant        - LRS + async copy to a paired region
RAGRS - Read-access geo-redundant - GRS + read access to the secondary
```

A dev environment typically uses `LRS` (cheapest); production data
a data engineering pipeline can't afford to lose typically uses `GRS`
or higher.

## Running it

```
$ terraform init
$ terraform plan

Terraform will perform the following actions:

  # azurerm_resource_group.example will be created
  + resource "azurerm_resource_group" "example" { ... }

  # azurerm_storage_account.example will be created
  + resource "azurerm_storage_account" "example" { ... }

Plan: 2 to add, 0 to change, 0 to destroy.

$ terraform apply
...
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

Outputs:
storage_account_id = "/subscriptions/.../storageAccounts/ltvdataengdev001"
```

## Key terms

| Term | Meaning |
|---|---|
| Globally unique name | A storage account name must be unique across every Azure customer, not just your subscription |
| `account_tier` | `Standard` or `Premium` — the performance/cost tier of the storage account |
| `account_replication_type` | `LRS`, `ZRS`, `GRS`, or `RAGRS` — how many copies of data are kept, and where |
| `terraform plan` | Shows what will change before anything is actually created |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why
does a storage account's `name` attribute have stricter rules
(globally unique, lowercase-only) than a resource group's `name`,
and why does the example configuration build that name from a
variable instead of a fixed string?
