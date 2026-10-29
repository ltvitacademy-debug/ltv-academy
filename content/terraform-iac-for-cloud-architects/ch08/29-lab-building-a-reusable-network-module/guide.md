# Lesson 29 — Lab: Building a Reusable Network Module

**Chapter 8 · Capstone: A Real Multi-Environment Terraform Project · Lesson 29 of 32**

## What you'll learn

- How to turn the module ideas from Chapter 4 into one real, reusable network module, built for a
  fictional company called Caldwell Ridge Analytics
- How two variables — an address space and a subnet count — let the exact same module produce a
  differently sized network every time it's called
- How Terraform's built-in `cidrsubnet()` function carves subnets out of a parent address block
  automatically, instead of typing every CIDR by hand
- How to wire that module into a root configuration that uses the remote Azure Storage backend from
  Chapter 3, instead of local state

## The scenario

Caldwell Ridge Analytics is a mid-size analytics firm about to roll out a new customer-reporting
platform, and they need a network foundation under it — a virtual network and a handful of
subnets, in Azure. They already know, before writing a single line of HCL, that this network will
need to exist twice: once as a small dev environment for testing, and once as a larger prod
environment for real customer traffic. Writing the VNet and subnet resources out twice, by hand, in
two separate configurations, is exactly the kind of duplication Chapter 4 warned about. The fix is
the same one Chapter 4 taught: write it once, as a module, and parameterize the two things that
actually differ between dev and prod — how big the address space is, and how many subnets to carve
out of it.

## The module's inputs

```hcl
# modules/network/variables.tf

variable "environment" {
  type        = string
  description = "Short environment name, e.g. dev or prod. Used in resource names and tags."
}

variable "location" {
  type    = string
  default = "eastus2"
}

variable "vnet_address_space" {
  type        = list(string)
  description = "CIDR block(s) for the virtual network, e.g. [\"10.10.0.0/20\"]."
}

variable "subnet_count" {
  type        = number
  description = "How many equally-sized subnets to carve out of the VNet address space."
}

variable "subnet_newbits" {
  type        = number
  description = "Bits added to the VNet prefix when carving each subnet."
  default     = 8
}
```

Nothing in this file mentions Caldwell Ridge, dev, prod, or any specific address range. That's the
whole point of a module's variables block — it's the contract between the module and whoever calls
it, and every one of these values gets supplied from the outside.

## The module's resources

```hcl
# modules/network/main.tf

resource "azurerm_resource_group" "network" {
  name     = "rg-cra-${var.environment}-network"
  location = var.location
}

resource "azurerm_virtual_network" "this" {
  name                = "vnet-cra-${var.environment}"
  address_space       = var.vnet_address_space
  location            = azurerm_resource_group.network.location
  resource_group_name = azurerm_resource_group.network.name

  tags = {
    environment = var.environment
    managed_by  = "terraform"
  }
}

resource "azurerm_subnet" "this" {
  count                = var.subnet_count
  name                 = "snet-cra-${var.environment}-${count.index}"
  resource_group_name  = azurerm_resource_group.network.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = [cidrsubnet(var.vnet_address_space[0], var.subnet_newbits, count.index)]
}
```

`count = var.subnet_count` is what actually creates one subnet, repeated `subnet_count` times. Each
pass through the loop computes its own CIDR block with `cidrsubnet()`, which takes the parent
address space, how many extra bits to borrow (`subnet_newbits`), and which numbered subnet this is
(`count.index`) — and returns a correct, non-overlapping block every time. Asking for a seventh
subnet later is a one-line change to `subnet_count`, not six more lines of hand-typed arithmetic.

## What the module hands back

```hcl
# modules/network/outputs.tf

output "vnet_id" {
  value = azurerm_virtual_network.this.id
}

output "subnet_ids" {
  value = azurerm_subnet.this[*].id
}

output "resource_group_name" {
  value = azurerm_resource_group.network.name
}
```

`subnet_ids` uses the `[*]` splat operator because `count` created a *list* of subnet resources, not
one — the output has to gather all of their IDs, not just the first. These three outputs are
exactly what a caller needs to wire compute or a load balancer into this network later, without
ever reaching into the module's internals.

## Wiring it into a real, remote-backed root config

```hcl
# envs/dev/main.tf

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-cra-tfstate"
    storage_account_name = "stcratfstate"
    container_name       = "tfstate"
    key                  = "network/dev.tfstate"
  }
}

provider "azurerm" {
  features {}
}

module "network" {
  source             = "../../modules/network"
  environment        = "dev"
  vnet_address_space = ["10.10.0.0/20"]
  subnet_count       = 2
}
```

Notice the `backend "azurerm" {}` block lives here, in the root configuration — not inside
`modules/network`. A child module is never allowed to declare its own backend; backend
configuration is a property of the configuration you actually run `terraform init` in, which is why
the same module can be called from a dev root config pointed at one state file and a prod root
config pointed at a completely different one, as Lesson 30 does next.

## Key terms

| Term | Meaning |
|---|---|
| Module inputs | The `variable` blocks in a module's own files — the contract that lets every caller configure it differently |
| `cidrsubnet()` | A built-in Terraform function that computes a subnet's CIDR block from a parent address space, an extra bit count, and an index |
| Splat operator (`[*]`) | Gathers a value from every instance of a resource created with `count`, e.g. `azurerm_subnet.this[*].id` |
| Backend ownership | The remote backend block belongs to the calling root configuration, never to the module it calls |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why can the exact same
`modules/network` source be called from a dev root config and a prod root config without ever
editing the module itself — and what specifically has to be different between those two callers?
