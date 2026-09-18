# Lesson 11 — Terraform Modules

**Chapter 2 · Terraform for Azure Data Resources · Lesson 11 of 22**

## What you'll learn

- The problem a module solves: the same resource blocks, copy-pasted across dev/staging/prod
- The `module` block syntax — `source`, inputs, and outputs
- What a "data landing zone" module looks like for the resources built in this chapter
- Why a module is just a folder of `.tf` files, nothing more exotic than that

## The problem: three environments, one set of resources

Lessons 8 through 10 built a Storage Account, a Fabric Capacity, and
an Event Hub — each as a standalone resource block. A real project
needs that same set of resources three times over: dev, staging, and
production, each in its own resource group, each with slightly
different names and SKUs. Copy-pasting those resource blocks three
times means three places to fix the same bug, and no guarantee the
copies stay in sync as the design evolves.

## The fix: a module

A Terraform module is nothing more than a folder of `.tf` files with
its own `variable` and `output` declarations — the same kind of file
you've been writing all chapter, just parameterized. A
`modules/data-landing-zone/main.tf` might look like:

```
variable "environment" {
  type = string
}

variable "storage_sku" {
  type    = string
  default = "Standard_LRS"
}

resource "azurerm_resource_group" "this" {
  name     = "rg-landing-zone-${var.environment}"
  location = "eastus2"
}

resource "azurerm_storage_account" "this" {
  name                     = "stlz${var.environment}"
  resource_group_name      = azurerm_resource_group.this.name
  location                 = azurerm_resource_group.this.location
  account_tier             = "Standard"
  account_replication_type = replace(var.storage_sku, "Standard_", "")
}

output "storage_account_id" {
  value = azurerm_storage_account.this.id
}
```

## Calling the module three times

The root configuration that consumes this module has one `module`
block per environment — the `source` points at the module's folder,
and each call passes in whatever's different for that environment:

```
module "landing_zone_dev" {
  source      = "./modules/data-landing-zone"
  environment = "dev"
}

module "landing_zone_staging" {
  source      = "./modules/data-landing-zone"
  environment = "staging"
}

module "landing_zone_prod" {
  source       = "./modules/data-landing-zone"
  environment  = "prod"
  storage_sku  = "Standard_GRS"
}

output "prod_storage_id" {
  value = module.landing_zone_prod.storage_account_id
}
```

Now there's exactly one file that defines what a "data landing zone"
means — a bug fix or a new resource added to `main.tf` inside the
module applies to all three environments the next time `apply` runs,
instead of needing to be hand-copied into three separate places.

## Inputs and outputs are the module's whole interface

A module's `variable` blocks are its inputs, and `output` blocks are
what it exposes back to whatever called it — that's the entire
contract. Nothing inside the module is visible to the caller except
what's explicitly declared as an output; a resource defined inside the
module but never output simply isn't reachable from outside it. This
is what keeps a module reusable across projects, not just across
environments in one project.

## Key terms

| Term | Meaning |
|---|---|
| Module | A folder of `.tf` files with its own inputs and outputs |
| `source` | The `module` block argument pointing at the module's folder or registry path |
| Module input | A `variable` declared inside the module, set by the caller |
| Module output | An `output` declared inside the module, read by the caller as `module.name.output_name` |

## Check yourself

You're ready for Lesson 12 when you can explain: if you fix a bug
inside `modules/data-landing-zone/main.tf`, do you need to change
anything in the three `module` blocks that call it to pick up that
fix, and why or why not?
