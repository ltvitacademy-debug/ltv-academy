# Lesson 6 — Resource Blocks

**Chapter 2 · Terraform for Azure Data Resources · Lesson 6 of 22**

## What you'll learn

- The `resource "type" "name" { }` syntax — Terraform's basic building block
- Real Azure resource types a data engineer actually provisions
- How resources reference each other's attributes
- Why the resource's local name is not the same as the Azure resource's actual name

## The shape every resource block shares

Every resource you provision with Terraform, regardless of type,
follows the same three-part syntax:

```hcl
resource "azurerm_resource_group" "example" {
  name     = "rg-dataeng-dev"
  location = "eastus2"
}
```

- `"azurerm_resource_group"` — the **resource type**, defined by the
  provider (`azurerm`). It tells Terraform exactly which Azure API
  this block maps to.
- `"example"` — the **local name**, how *this configuration* refers
  to this specific resource block. It's scoped to your `.tf` files
  only — Azure never sees it.
- The block body — every attribute the resource type supports; some
  required, some optional with defaults.

## Two resource types a data engineer uses constantly

A resource group is almost always the first thing provisioned,
since most other Azure resources must live inside one:

```hcl
resource "azurerm_resource_group" "example" {
  name     = "rg-dataeng-dev"
  location = "eastus2"
}
```

A storage account — the same resource type DE Foundations Lesson 1
had you create by hand in the Portal — needs a resource group to
belong to:

```hcl
resource "azurerm_storage_account" "example" {
  name                     = "ltvdataeng001"
  resource_group_name      = azurerm_resource_group.example.name
  location                 = azurerm_resource_group.example.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
```

## Referencing another resource's attributes

Notice `resource_group_name` and `location` above aren't hardcoded
strings — they're references to the resource group block:
`azurerm_resource_group.example.name`. That reference syntax is
always `<type>.<local name>.<attribute>`. Terraform uses these
references to build a dependency graph automatically: it knows the
resource group must be created before the storage account, because
the storage account's block literally reads the resource group's
attributes.

```
azurerm_resource_group.example.name
     |            |         |
   type      local name  attribute

# Terraform creates azurerm_resource_group.example FIRST,
# because azurerm_storage_account.example depends on its output.
```

You never have to write "create the resource group first" — the
reference itself establishes the order.

## Local name vs. real name — don't confuse the two

`azurerm_storage_account.example` is how *this Terraform
configuration* refers to the resource. The actual Azure resource is
named by the `name` attribute inside the block — `ltvdataeng001` in
the example above. Two different engineers could each write a
resource block with the local name `example`, and as long as their
`name` attribute values differ, they're creating two entirely
different, non-conflicting Azure resources. The local name only has
to be unique *within your configuration files* — the real `name`
attribute is what has to be valid and, for some resource types like
storage accounts, globally unique across all of Azure.

## Key terms

| Term | Meaning |
|---|---|
| Resource type | The provider-defined kind of resource (e.g. `azurerm_storage_account`), maps to one Azure API |
| Local name | The name a resource block uses within your `.tf` files only — never seen by Azure |
| Attribute reference | `<type>.<local name>.<attribute>` — how one resource block reads another's value |
| Dependency graph | The build order Terraform infers automatically from attribute references |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: how
does Terraform know to create a resource group before a storage
account that belongs to it, without you writing that order anywhere?
