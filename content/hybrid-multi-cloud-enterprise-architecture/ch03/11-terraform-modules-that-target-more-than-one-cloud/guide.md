# Lesson 11 — Terraform Modules That Target More Than One Cloud

**Chapter 3 · Workload Portability Across Clouds · Lesson 3 of 4**

## What you'll learn

- Why Terraform's provider model (from course 8) makes multi-cloud
  modules possible, but doesn't make them automatic
- The real pattern for a module that accepts a `cloud` variable and
  branches into the correct provider's resources
- Why you can't put an `azurerm_virtual_network` and an
  `aws_vpc` in the same resource block and conditionally pick one —
  and what you do instead
- How `count` on a per-cloud basis, combined with child modules, keeps
  a multi-cloud root module readable instead of turning into one giant
  nested-ternary mess

## Why "multi-cloud Terraform" isn't one trick

Course 8 established that a provider is a plugin translating generic
HCL into one specific cloud's API calls. That means `azurerm` and
`aws` are just two providers declared in the same `required_providers`
block — nothing stops a single Terraform configuration from knowing
about both. But declaring both providers doesn't make a resource
conditionally become either one. `resource "azurerm_virtual_network"`
is a fixed block type; it can never become an
`aws_vpc` at `apply` time. The branching has to happen at the
*resource-selection* level, not inside a single resource.

## The `count`-per-cloud pattern

The idiomatic way to write a module that targets exactly one cloud at
a time, selected by a variable, is to declare **both** resource blocks
in the module and use `count` to create zero or one of each:

```hcl
variable "cloud" {
  type = string
  validation {
    condition     = contains(["azure", "aws"], var.cloud)
    error_message = "cloud must be \"azure\" or \"aws\"."
  }
}

variable "cidr_block" {
  type    = string
  default = "10.20.0.0/16"
}

# --- Azure branch ---
resource "azurerm_resource_group" "this" {
  count    = var.cloud == "azure" ? 1 : 0
  name     = "rg-${var.name}"
  location = var.azure_region
}

resource "azurerm_virtual_network" "this" {
  count               = var.cloud == "azure" ? 1 : 0
  name                = "vnet-${var.name}"
  address_space       = [var.cidr_block]
  location            = azurerm_resource_group.this[0].location
  resource_group_name = azurerm_resource_group.this[0].name
}

# --- AWS branch ---
resource "aws_vpc" "this" {
  count      = var.cloud == "aws" ? 1 : 0
  cidr_block = var.cidr_block
  tags       = { Name = var.name }
}

# --- Unified output regardless of which branch ran ---
output "network_id" {
  value = var.cloud == "azure" ? azurerm_virtual_network.this[0].id : aws_vpc.this[0].id
}
```

Exactly one branch actually provisions anything on any given `apply`
— the other branch's `count` evaluates to `0`, so Terraform creates
zero instances of those resources and they simply don't exist in
state. The `output` block gives every caller of this module the same
`network_id` attribute name regardless of which cloud produced it,
which is the actual portability payoff: the *calling* code doesn't
need its own `cloud == "azure"` branch, because the module already
normalized that away.

## Composing it as child modules at scale

For anything beyond a toy example, nest this pattern inside dedicated
child modules rather than inlining both clouds' resources in one file:

```hcl
module "network" {
  source      = "./modules/network"
  cloud       = var.cloud          # "azure" or "aws", passed down once
  name        = "app-prod"
  cidr_block  = "10.20.0.0/16"
}

module "app_workload" {
  source     = "./modules/workload"
  cloud      = var.cloud
  network_id = module.network.network_id
}
```

The root module declares `var.cloud` exactly once and threads it
through every child module. Each child module internally applies the
same `count`-per-cloud branching you just saw. This keeps the
branching logic contained and reviewable instead of spreading
`var.cloud == "azure" ? ... : ...` ternaries through every resource
in a flat configuration — which is what actually makes a multi-cloud
Terraform codebase maintainable instead of a maze.

## Provider aliasing for true dual-cloud applies

If a single `apply` genuinely needs to touch both clouds at once —
replicating a resource to both, not choosing one — you declare
provider aliases and reference them explicitly per resource, rather
than branching on a variable at all:

```hcl
provider "azurerm" {
  features {}
}

provider "aws" {
  alias  = "secondary"
  region = "us-east-1"
}

resource "azurerm_storage_account" "primary" {
  # uses the default azurerm provider
}

resource "aws_s3_bucket" "replica" {
  provider = aws.secondary
  bucket   = "app-replica-bucket"
}
```

This is a genuinely different situation from the `count` pattern —
here you *want* both resources created on every `apply`, so there's no
conditional at all, just two providers and two resources living in the
same state.

## Key terms

| Term | Meaning |
|---|---|
| `count`-per-cloud pattern | Declaring both clouds' resource blocks in a module and using `count = var.cloud == "x" ? 1 : 0` to create only one branch |
| Provider alias | A second configured instance of a provider (or a different provider entirely) referenced explicitly per resource via `provider = aws.secondary` |
| Unified module output | An output attribute name (like `network_id`) that stays consistent regardless of which cloud branch actually provisioned the resource |
| Child module composition | Nesting the cloud-branching logic inside dedicated modules so the root configuration passes `var.cloud` down once instead of repeating ternaries |

## Check yourself

You're ready for Lesson 12 when you can explain why
`resource "azurerm_virtual_network"` can never conditionally "become"
an `aws_vpc`, and describe exactly how the `count`-per-cloud pattern
gets around that limitation to still produce a unified `network_id`
output.
