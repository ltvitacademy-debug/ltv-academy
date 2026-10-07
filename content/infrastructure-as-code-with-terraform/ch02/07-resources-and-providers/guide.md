# Resources & Providers

HCL's generic block syntax from the last lesson becomes useful the moment you use it to describe something real. This lesson covers the two block types that do the actual work in any Terraform configuration: `provider`, which tells Terraform which cloud to talk to, and `resource`, which describes the infrastructure you want it to create. You'll use both constantly for the rest of this course as you build out Northbridge Retail's Azure footprint.

## What you'll learn

- What a `provider` block configures, and why it has to come before any resources that use it
- The `resource "type" "name" { }` syntax and what each part means
- How one resource block references another resource's attributes
- How those references let Terraform build a dependency graph automatically

## The provider block: which cloud, and how to reach it

A **provider** is a plugin that translates HCL into calls against a specific API — Azure, AWS, and hundreds of others each have one. Before you can create any `azurerm_*` resource, Terraform needs to know the provider is required and how to authenticate:

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
```

The `required_providers` block (inside `terraform { }`) declares which provider and version range the configuration needs. The `provider "azurerm" { }` block configures that provider — here, with its defaults, since Northbridge Retail authenticates via Azure CLI login rather than hardcoded credentials in the file.

## The resource block: what to actually create

A **resource** block describes one piece of infrastructure you want to exist:

```hcl
resource "azurerm_resource_group" "northbridge" {
  name     = "rg-northbridge-prod"
  location = "eastus2"
}

resource "azurerm_storage_account" "images" {
  name                     = "northbridgeprodimages"
  resource_group_name      = azurerm_resource_group.northbridge.name
  location                 = azurerm_resource_group.northbridge.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
}
```

Every resource block has the same three parts: the **resource type** (`"azurerm_resource_group"`), defined by the provider and mapped to one specific Azure API; the **local name** (`"northbridge"`), how this configuration refers to the block — scoped to your `.tf` files only, never sent to Azure; and the body, where every attribute the resource type supports gets set.

## References build the dependency graph

Look closely at `resource_group_name` and `location` in the storage account block above — they aren't hardcoded strings, they're references: `azurerm_resource_group.northbridge.name`. That pattern is always `<type>.<local name>.<attribute>`, and it's how one resource reads a value produced by another.

```
azurerm_resource_group.northbridge.name
       |                  |          |
     type            local name   attribute
```

Terraform scans every reference in your configuration and uses them to build a **dependency graph** — it knows `azurerm_resource_group.northbridge` must be created before `azurerm_storage_account.images`, because the storage account's block literally reads the resource group's output. You never write "create the group first." The reference establishes the order on its own, and it works the same way no matter how many resources are chained together.

## Key terms

| Term | Meaning |
|---|---|
| Provider | A plugin that translates HCL into calls against a specific API, such as Azure or AWS |
| Resource type | The provider-defined kind of resource (e.g. `azurerm_storage_account`), mapped to one API |
| Local name | The name a resource block uses within your `.tf` files only — never sent to the provider |
| Dependency graph | The build order Terraform infers automatically from attribute references between resources |
