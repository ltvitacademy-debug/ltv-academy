# Lesson 7 — Variables & Outputs

**Chapter 2 · Terraform for Azure Data Resources · Lesson 7 of 22**

## What you'll learn

- Declaring a `variable` block with type, default, and description
- Referencing a variable with `var.<name>` inside a resource block
- Declaring an `output` block to surface a resource's attribute after apply
- Why parameterizing avoids hardcoding a value across environments

## The problem with Lesson 6's hardcoded values

Lesson 6's resource group block hardcoded `"rg-dataeng-dev"` directly
into the resource. That's fine for a single, one-off environment —
but the moment you need the same configuration to also stand up
`rg-dataeng-staging` and `rg-dataeng-prod`, hardcoding forces you to
copy the entire file three times and hand-edit each copy. A
**variable** lets the same configuration produce different
environments just by changing one input.

## Declaring a variable

```hcl
variable "resource_group_name" {
  type        = string
  description = "Name of the resource group to create"
  default     = "rg-dataeng-dev"
}

variable "location" {
  type        = string
  description = "Azure region for all resources"
  default     = "eastus2"
}
```

- `type` constrains what kind of value is valid (`string`, `number`,
  `bool`, or structured types like `list(string)`).
- `description` documents intent for the next engineer who reads it.
- `default` is used when no other value is supplied — omit it, and
  Terraform requires the value to be passed explicitly.

## Referencing a variable

Inside any resource block, `var.<name>` substitutes in the
variable's value:

```hcl
resource "azurerm_resource_group" "example" {
  name     = var.resource_group_name
  location = var.location
}
```

To provision staging instead of dev, you don't edit this file at
all — you override the variable at apply time:

```
terraform apply -var="resource_group_name=rg-dataeng-staging"
```

or, more commonly on a real team, with a separate `.tfvars` file per
environment (`dev.tfvars`, `staging.tfvars`, `prod.tfvars`) applied
with `terraform apply -var-file="staging.tfvars"`.

## Declaring an output

A `variable` is an input; an `output` is the reverse — a value
Terraform prints after `apply` finishes, so you (or another tool, or
another Terraform configuration) can read a result without digging
through the state file by hand:

```hcl
output "resource_group_id" {
  value       = azurerm_resource_group.example.id
  description = "The full Azure resource ID of the created resource group"
}
```

```
$ terraform apply
...
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

resource_group_id = "/subscriptions/.../resourceGroups/rg-dataeng-dev"
```

## Why this matters beyond convenience

Parameterizing with variables is what makes a single Terraform
configuration reusable across dev, staging, and production without
risking a copy-paste mistake — the exact same file, applied with a
different `.tfvars`, is guaranteed to differ only in the values you
intentionally changed. Outputs matter just as much once
configurations get split into multiple files or modules (Lesson 11):
one configuration's output often becomes another configuration's
input.

## Key terms

| Term | Meaning |
|---|---|
| `variable` block | Declares a named input with a type, optional default, and description |
| `var.<name>` | The reference syntax used inside resource blocks to read a variable's value |
| `.tfvars` file | A file supplying variable values for one environment, applied with `-var-file` |
| `output` block | Declares a named value Terraform prints after apply, readable by other tooling |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: how
would you provision the exact same configuration into a dev
environment and a staging environment, using variables instead of
copying the file?
