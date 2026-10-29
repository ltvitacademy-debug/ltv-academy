# Lesson 4 — HCL Syntax: Variables, Outputs, and Locals

**Chapter 1 · Terraform Fundamentals · Lesson 4 of 4**

## What you'll learn

- How a real `variable` block works — type, default, and
  description — and how to supply a value for one
- How an `output` block exposes a value after `apply` finishes, and
  why that matters once configurations start depending on each other
- What a `locals` block is for, and how it differs from both a
  variable and an output
- How to read a small, complete configuration that uses all three
  together

## `variable`: an input you can change without editing code

A `variable` block declares a named input your configuration expects,
with an optional type constraint, default value, and description:

```hcl
variable "location" {
  type        = string
  default     = "eastus"
  description = "Azure region for all resources in this configuration"
}

variable "environment" {
  type        = string
  description = "Deployment environment name, e.g. dev or prod"
}
```

`location` has a `default`, so it's optional to supply — leave it
alone and it's `"eastus"`. `environment` has no default, so Terraform
will prompt for it (or refuse to run non-interactively) unless you
supply one, typically with `-var="environment=dev"` on the command
line or a `.tfvars` file. You reference either one elsewhere in the
configuration as `var.location` and `var.environment`. The point of
pulling these out as variables instead of hard-coding them is exactly
what it sounds like: the same configuration can deploy a dev
environment today and a prod environment tomorrow without touching
the `.tf` files themselves.

## `output`: exposing a value after apply

An `output` block exposes a value once `apply` finishes — useful for
anything another process, another Terraform configuration, or just
you at the terminal, needs to read back out:

```hcl
output "resource_group_id" {
  value       = azurerm_resource_group.rg.id
  description = "The resource ID of the created resource group"
}
```

After `apply`, Terraform prints that value to the console, and
`terraform output resource_group_id` retrieves it on demand
afterward. This is also how one Terraform configuration can feed
values into another — a networking configuration might `output` a
VNet ID that an application configuration later reads in, instead of
either hard-coding it or re-declaring the same resource twice.

## `locals`: computed values reused within a config

A `locals` block defines named values computed from other
expressions, meant to be reused within this configuration — not
supplied from outside like a variable, and not exposed outside like
an output:

```hcl
locals {
  resource_group_name = "rg-${var.environment}-ltv"
  common_tags = {
    environment = var.environment
    managed_by  = "terraform"
  }
}
```

`local.resource_group_name` and `local.common_tags` can now be
referenced anywhere in this configuration. The usual reason to reach
for a `locals` block is avoiding repetition — compute a tag map or a
naming convention once, in one place, instead of retyping the same
expression on every resource.

## Putting all three together

Here's a small, complete configuration that uses all three:

```hcl
variable "environment" {
  type        = string
  description = "Deployment environment name, e.g. dev or prod"
}

locals {
  resource_group_name = "rg-${var.environment}-ltv"
  common_tags = {
    environment = var.environment
    managed_by  = "terraform"
  }
}

resource "azurerm_resource_group" "rg" {
  name     = local.resource_group_name
  location = "eastus"
  tags     = local.common_tags
}

output "resource_group_id" {
  value       = azurerm_resource_group.rg.id
  description = "The resource ID of the created resource group"
}
```

Read it top to bottom: `environment` comes in as a variable, `locals`
derives a naming convention and a tag map from it once, the
`resource` block consumes both, and `output` exposes the result once
it's real. That pattern — variables in, locals computed once,
resources built from them, outputs exposed at the end — is the shape
nearly every real Terraform configuration takes, and it's exactly
what Chapter 2 builds on, starting with a real Azure resource group
and VNet.

## Key terms

| Term | Meaning |
|---|---|
| `variable` | A named input, with optional type/default/description, supplied from outside the config |
| `output` | A named value exposed after `apply`, readable by `terraform output` or by another config |
| `locals` | Named values computed from expressions, reused within the config, not supplied or exposed externally |
| `-var` / `.tfvars` | Ways to supply a value for a variable that has no default |

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: how
do `variable`, `locals`, and `output` each differ in where their
value comes from and where it goes?
