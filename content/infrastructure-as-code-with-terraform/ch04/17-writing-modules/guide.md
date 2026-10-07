# Writing Modules

The last chapter ended with `terraform state` commands — recovering, moving, and inspecting the resources Terraform already tracks. Those commands exist because a Terraform configuration tends to grow into a tangle of resources that share a lifecycle: they get created together, changed together, and torn down together. A **module** is how you give that cluster of resources a name and a reusable shape, instead of re-typing it every time you need it. Northbridge Retail needs the exact same storage account pattern in dev, staging, and production — this lesson is where you stop copy-pasting it.

## What you'll learn

- What a Terraform module actually is — spoiler: just a folder of `.tf` files
- How to turn a resource block you'd otherwise copy-paste into a local module
- The `module` block syntax: `source`, and calling the same module more than once
- Why every Terraform configuration you've written so far has secretly been "the root module"

## Every configuration is already a module

Here's the detail that makes modules feel less exotic: the directory you run `terraform apply` from is itself called the **root module**. A module, in Terraform's terms, is nothing more than a directory containing `.tf` files. When you write a **child module**, you're doing exactly what you've always done — writing resource blocks in a `.tf` file — except that folder lives somewhere else and gets referenced by the root module instead of run directly.

## Turning a repeated resource into a module

Suppose Northbridge Retail's dev environment currently has this sitting directly in its root module:

```
resource "azurerm_storage_account" "dev" {
  name                     = "stnbretaildev"
  resource_group_name      = azurerm_resource_group.dev.name
  location                 = "eastus2"
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
```

Staging and production need the same resource, with different names and a tougher replication tier in production. Instead of pasting this block three times, move it into its own folder:

```
modules/
  storage-account/
    main.tf
```

```
# modules/storage-account/main.tf
resource "azurerm_storage_account" "this" {
  name                     = "stnbretail${var.environment}"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = var.replication_type
}
```

The `var.*` references are inputs the module doesn't yet declare — that's the subject of the next lesson. For now, notice what changed: the resource itself is identical, it's just no longer hardcoded to one environment.

## Calling the module from the root

Back in the root module, a `module` block replaces the resource block that used to live there directly:

```
module "storage_dev" {
  source              = "./modules/storage-account"
  environment         = "dev"
  resource_group_name = azurerm_resource_group.dev.name
  location             = "eastus2"
  replication_type    = "LRS"
}

module "storage_staging" {
  source              = "./modules/storage-account"
  environment         = "staging"
  resource_group_name = azurerm_resource_group.staging.name
  location             = "eastus2"
  replication_type    = "LRS"
}
```

`source` is the one argument every `module` block must have — it's a relative filesystem path here, but later in this chapter you'll point it at the public Terraform Registry instead. Each `module` block is its own instance: `terraform plan` treats `module.storage_dev` and `module.storage_staging` as completely separate resources with completely separate state addresses, even though they're built from the same `main.tf`.

## Running it

After adding a `module` block, run `terraform init` before `plan` — Terraform needs to resolve and install the module's source, the same way it installs provider plugins:

```
$ terraform init

Initializing modules...
- storage_dev in modules/storage-account
- storage_staging in modules/storage-account

Initializing the backend...
Initializing provider plugins...

Terraform has been successfully initialized!
```

```
$ terraform plan

  # module.storage_dev.azurerm_storage_account.this will be created
  + resource "azurerm_storage_account" "this" {
      + name = "stnbretaildev"
      ...
    }

  # module.storage_staging.azurerm_storage_account.this will be created
  + resource "azurerm_storage_account" "this" {
      + name = "stnbretailstaging"
      ...
    }

Plan: 2 to add, 0 to change, 0 to destroy.
```

Notice the resource addresses: `module.storage_dev.azurerm_storage_account.this`. Every resource inside a child module is namespaced under the module call that created it — that's how Terraform keeps two instances of the same module from colliding in state.

## Key terms

- **Module** — a directory of `.tf` files; every Terraform configuration is a module
- **Root module** — the directory you run `terraform apply` from
- **Child module** — a module called by another module via a `module` block
- **`module` block** — the syntax that instantiates a child module from the root (or another module)
- **`source`** — the required argument on a `module` block naming where the module's files live
