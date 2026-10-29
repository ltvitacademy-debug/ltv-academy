# Lesson 5 — Provisioning an Azure Resource Group and VNet with Terraform

**Chapter 2 · Provisioning Real Infrastructure · Lesson 1 of 4**

## What you'll learn

- How to write a real `azurerm_resource_group` and `azurerm_virtual_network`
  configuration from scratch, not just read one
- The real arguments `azurerm_subnet` needs to attach a subnet to that VNet
- How Terraform builds its dependency graph automatically from resource
  references like `azurerm_resource_group.example.location` — no `depends_on`
  required
- What `terraform plan` shows you before any of this actually exists in Azure

## From `az network vnet create` to a resource block

The Azure Administration course built a resource group and a VNet with
`az group create` and `az network vnet create` — two imperative commands, run
in order, that you'd have to remember to run again if you ever rebuilt the
environment. Terraform describes the same two objects **declaratively**, as
resource blocks in a `.tf` file:

```hcl
resource "azurerm_resource_group" "example" {
  name     = "rg-network-demo"
  location = "eastus"
}

resource "azurerm_virtual_network" "example" {
  name                = "vnet-prod"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}
```

The shape is the one Lesson 3 already covered: `resource "<type>" "<local
name>"` followed by a block of arguments. `azurerm_resource_group` takes just
`name` and `location`. `azurerm_virtual_network` takes `address_space` — a
**list**, even when it holds one CIDR block, because a VNet can have more
than one — plus `location` and `resource_group_name`, which here aren't typed
in by hand but pulled from the resource group above it.

## The VNet's subnets

Exactly as the Azure Administration course taught, nothing attaches directly
to a VNet — everything attaches to a subnet carved out of it. `azurerm_subnet`
is its own resource type, referencing the VNet it belongs to by name:

```hcl
resource "azurerm_subnet" "web" {
  name                 = "snet-web"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet" "app" {
  name                 = "snet-app"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.2.0/24"]
}
```

`virtual_network_name` takes the VNet's **name**, as a string reference to
`azurerm_virtual_network.example.name` — not an ID, the way you'll see AWS do
it in Lesson 6. `address_prefixes` is a list for the same reason
`address_space` was: a subnet can technically hold more than one CIDR range,
though most hold exactly one, as both do here.

## How Terraform knows the create order

Nothing in this file says "create the resource group first, then the VNet,
then the subnets." Terraform works that order out on its own, from the
references themselves. The moment `azurerm_virtual_network.example` writes
`azurerm_resource_group.example.location`, Terraform's dependency graph (from
Lesson 3) records that the VNet depends on the resource group — it literally
cannot know the resource group's `location` until the resource group has been
created and that value is known. The two subnets depend on the VNet the same
way, through `virtual_network_name`. Four resources, three implicit
dependency edges, zero explicit ordering — Terraform reads the graph and
creates things in the only order that satisfies it.

## `terraform plan` before anything is real

Lesson 2 covered `plan` and `apply` in the abstract; here's what `plan`
actually prints for this exact file, before a single Azure API call fires:

```
Terraform will perform the following actions:

  # azurerm_resource_group.example will be created
  # azurerm_virtual_network.example will be created
  # azurerm_subnet.web will be created
  # azurerm_subnet.app will be created

Plan: 4 to add, 0 to change, 0 to destroy.
```

Four resources, four creates, and the order they're listed in is incidental —
what actually governs execution order at `apply` time is the dependency graph
underneath, not the order resources happen to appear in the file or in this
plan output.

## Key terms

| Term | Meaning |
|---|---|
| `address_space` / `address_prefixes` | The CIDR list argument on a VNet / subnet respectively — a list even with one entry |
| Implicit dependency | An ordering Terraform infers automatically because one resource references another's attribute |
| Attribute reference | A value like `azurerm_resource_group.example.location`, read from another resource block instead of typed literally |
| `terraform plan` | The dry-run step that lists every create/update/destroy before `apply` touches real infrastructure |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why does
`azurerm_virtual_network.example` writing `azurerm_resource_group.example.location`
instead of the literal string `"eastus"` change how Terraform schedules the
two resources' creation?
