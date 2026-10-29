# Lesson 14 — Writing Your First Reusable Terraform Module

**Chapter 4 · Modules & Reusability · Lesson 2 of 4**

## What you'll learn

- The conventional anatomy of a module folder — `variables.tf`,
  `main.tf`, `outputs.tf` — and why that split isn't required but is
  almost always followed
- How to declare real input variables with type constraints, so a
  module rejects bad input instead of failing deep inside a resource
- A complete, real `network` module: `vnet_name`, `address_space`, and
  `subnet_count` in, a VNet and its subnets out
- How to call that module from a root configuration with a `module`
  block, and read its outputs back out with `module.<name>.<output>`

## The anatomy of a module folder

A module is just a directory. By convention — not by requirement —
that directory holds three files: `variables.tf` declares what the
module accepts, `main.tf` holds the actual resource blocks, and
`outputs.tf` declares what the module hands back to whoever called it.
Terraform doesn't enforce these filenames; it loads every `.tf` file
in the directory as one combined configuration. Splitting them this
way is purely for humans — anyone opening the module can go straight
to `variables.tf` to see its interface without reading the resource
logic first.

## Declaring inputs: `modules/network/variables.tf`

```hcl
variable "vnet_name" {
  type        = string
  description = "Name of the virtual network this module creates"
}

variable "address_space" {
  type        = list(string)
  description = "CIDR block(s) for the virtual network"
}

variable "subnet_count" {
  type        = number
  default     = 2
  description = "How many subnets to carve out of the address space"
}

variable "location" {
  type = string
}

variable "resource_group_name" {
  type = string
}
```

Each `variable` block names one input and constrains its `type` —
`string`, `list(string)`, `number` — so Terraform rejects a bad call
(a number where a list was expected) at `plan` time, before anything
touches a real resource. `subnet_count` carries a `default`, which
makes it optional for callers; `vnet_name`, `address_space`,
`location`, and `resource_group_name` have no default, so they're
required every time the module is called.

## The resource logic: `modules/network/main.tf`

```hcl
resource "azurerm_virtual_network" "this" {
  name                = var.vnet_name
  address_space       = var.address_space
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_subnet" "this" {
  count                = var.subnet_count
  name                 = "${var.vnet_name}-subnet-${count.index}"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = [cidrsubnet(var.address_space[0], 8, count.index)]
}
```

Inside the module, every input is read back with `var.vnet_name`,
`var.address_space`, and so on — the same `var.` syntax Lesson 4
introduced for the root configuration, because a module's variables
work exactly the same way. `cidrsubnet(var.address_space[0], 8,
count.index)` carves a `/24` subnet out of the VNet's address space
for each value of `count.index`, so `subnet_count = 3` produces three
non-overlapping subnets automatically, with no hand-calculated CIDR
ranges to keep in sync.

## Declaring outputs: `modules/network/outputs.tf`

```hcl
output "vnet_id" {
  value = azurerm_virtual_network.this.id
}

output "subnet_ids" {
  value = azurerm_subnet.this[*].id
}
```

`subnet_ids` uses the splat operator `[*]` to collect the `id` of
every `azurerm_subnet.this` resource created by `count` into a single
list — exactly what a caller needs to wire a VM's network interface or
a database's private endpoint into one of these subnets later.

## Calling the module from the root configuration

```hcl
module "network" {
  source              = "./modules/network"
  vnet_name           = "vnet-dev"
  address_space       = ["10.0.0.0/16"]
  subnet_count        = 3
  location            = "eastus"
  resource_group_name = azurerm_resource_group.dev.name
}

output "dev_subnet_ids" {
  value = module.network.subnet_ids
}
```

`source = "./modules/network"` points at the folder from Lesson 14's
own setup, relative to the calling configuration. Everything else in
the block is an input value, matched against the `variable` names the
module declared. Outside the module, its outputs are reached with
`module.network.subnet_ids` — `module`, then the local name given in
the `module` block, then the output's name — the same pattern Lesson
16 builds on to wire this module's subnets into a compute module and a
database module.

## Key terms

| Term | Meaning |
|---|---|
| `variables.tf` | Conventional file declaring a module's input variables and their types |
| `outputs.tf` | Conventional file declaring what a module hands back to its caller |
| `cidrsubnet()` | A built-in function that carves a smaller CIDR block out of a larger one |
| `module.<name>.<output>` | Syntax for reading a module's output value from outside the module |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: what
does the `source` argument in a `module` block point to, and how do
you read a value back out of a module once it's been called?
