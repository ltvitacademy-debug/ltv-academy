# Module Inputs & Outputs

The storage account module from the last lesson referenced `var.environment`, `var.resource_group_name`, and `var.replication_type` without ever declaring them — that configuration would fail `terraform init`. A module's `variable` blocks and `output` blocks are its entire public interface: variables are how the caller passes values in, and outputs are how the caller gets values back out. This lesson finishes the storage account module Northbridge Retail needs, then wires its output into a second resource that depends on it.

## What you'll learn

- Declaring `variable` blocks inside a module, with types and optional defaults
- Declaring `output` blocks so a module can expose values to whatever calls it
- The `module.<name>.<output>` syntax for reading one module's output elsewhere in the config
- Why anything inside a module that isn't an output stays invisible to the caller

## Declaring the module's inputs

Every `var.*` reference inside a module must correspond to a `variable` block declared somewhere in that same module — usually in its own `variables.tf` file:

```
# modules/storage-account/variables.tf
variable "environment" {
  type        = string
  description = "Short environment name, e.g. dev, staging, prod"
}

variable "resource_group_name" {
  type = string
}

variable "location" {
  type    = string
  default = "eastus2"
}

variable "replication_type" {
  type        = string
  default     = "LRS"
  description = "Storage replication type, e.g. LRS, GRS, ZRS"
}
```

`location` and `replication_type` have defaults, so a caller can omit them entirely; `environment` and `resource_group_name` don't, so Terraform refuses to plan until every caller supplies them. This is the same `variable` syntax from Chapter 2 — modules don't introduce new syntax, they just scope it to a smaller file.

## Declaring the module's outputs

An `output` block inside the module exposes a value to whatever called it:

```
# modules/storage-account/outputs.tf
output "storage_account_id" {
  value = azurerm_storage_account.this.id
}

output "primary_blob_endpoint" {
  value = azurerm_storage_account.this.primary_blob_endpoint
}
```

Nothing else inside the module — not the resource itself, not any local value computed along the way — is reachable from outside it. If a module doesn't output something, the caller simply cannot see it, by design.

## Consuming one module's output as another resource's input

This is where modules start paying off. Northbridge Retail's data pipeline needs a Function App that writes its logs into the storage account the module just created. Instead of hardcoding a storage account name into the Function App's configuration, reference the module's output directly:

```
module "storage_dev" {
  source               = "./modules/storage-account"
  environment          = "dev"
  resource_group_name  = azurerm_resource_group.dev.name
}

resource "azurerm_linux_function_app" "pipeline" {
  name                       = "func-nbretail-pipeline-dev"
  resource_group_name        = azurerm_resource_group.dev.name
  location                   = azurerm_resource_group.dev.location
  storage_account_name       = module.storage_dev.storage_account_name
  storage_account_access_key = module.storage_dev.primary_access_key
  service_plan_id            = azurerm_service_plan.dev.id
}
```

`module.storage_dev.storage_account_name` reads exactly the way a resource attribute reference does — `module.<module name>.<output name>` — and Terraform automatically orders the apply so the storage account exists before the Function App needs its name.

## Confirming it in the plan

```
$ terraform plan

  # module.storage_dev.azurerm_storage_account.this will be created
  + resource "azurerm_storage_account" "this" { ... }

  # azurerm_linux_function_app.pipeline will be created
  + resource "azurerm_linux_function_app" "pipeline" {
      + storage_account_name = (known after apply)
      ...
    }

Plan: 2 to add, 0 to change, 0 to destroy.
```

`(known after apply)` on `storage_account_name` is the planner being honest: it knows the Function App depends on the module's output, but the module's resource hasn't been created yet, so the exact value isn't known until `apply` actually runs.

## Key terms

- **Module `variable`** — an input declared inside a module; required unless it has a `default`
- **Module `output`** — a value declared inside a module and exposed to its caller
- **`module.<name>.<output>`** — the reference syntax for reading a module's output elsewhere in the configuration
- **Interface** — the combination of a module's variables and outputs; it's the only part of the module visible from outside
