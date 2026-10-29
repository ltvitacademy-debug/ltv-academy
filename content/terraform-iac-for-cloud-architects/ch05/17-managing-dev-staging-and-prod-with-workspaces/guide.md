# Lesson 17 — Managing Dev, Staging, and Prod with Workspaces

**Chapter 5 · Terraform Workspaces & Environments · Lesson 17 of 32**

## What you'll learn

- What a Terraform **workspace** actually is: a named state file, not a
  separate copy of your configuration
- How to create and switch workspaces with `terraform workspace new`
  and `terraform workspace select`
- How to read `terraform.workspace` inside a configuration and use it
  to vary resource naming and sizing by environment
- Why you've already been using a workspace, even if you've never run
  one of these commands before

## Workspaces: one config, many state files

Every Terraform working directory starts in a workspace literally
named `default` — you've been using it since Chapter 1 without ever
typing the word. A **workspace** is Terraform's built-in mechanism for
keeping multiple, independent state files for the *same* configuration.
The `.tf` files don't change. What changes is which state file
`terraform plan` and `terraform apply` read from and write to. Create
a `dev` workspace and a `prod` workspace from the same `main.tf`, and
Terraform tracks two completely separate sets of real infrastructure
against two completely separate state files — all without duplicating
a single line of HCL.

## Creating and switching workspaces

```
terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

terraform workspace list
terraform workspace select prod

terraform apply
```

`terraform workspace new <name>` creates a workspace and switches to
it immediately. `terraform workspace list` shows every workspace that
exists for this backend, with an asterisk marking the one you're
currently in. `terraform workspace select <name>` switches without
creating anything — this is the command you'll run constantly, right
before every `plan` or `apply`, to make sure you're pointed at the
environment you actually mean to touch.

## Reading `terraform.workspace` in your config

Terraform exposes the active workspace's name as the built-in
`terraform.workspace` value, readable anywhere in your configuration.
That's what makes one config file produce environment-appropriate
infrastructure:

```hcl
locals {
  vm_size_by_env = {
    dev     = "Standard_B1s"
    staging = "Standard_B2s"
    prod    = "Standard_D2s_v3"
  }
}

resource "azurerm_resource_group" "main" {
  name     = "rg-myapp-${terraform.workspace}"
  location = "eastus"
}

resource "azurerm_linux_virtual_machine" "app" {
  name                = "vm-myapp-${terraform.workspace}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = lookup(local.vm_size_by_env, terraform.workspace, "Standard_B1s")
  admin_username      = "azureuser"
  # ...
}
```

Select the `prod` workspace and this config names the resource group
`rg-myapp-prod` and sizes the VM `Standard_D2s_v3`. Select `dev` and
the exact same files produce `rg-myapp-dev` on a `Standard_B1s`. The
`lookup()` function reads `local.vm_size_by_env` using
`terraform.workspace` as the key, falling back to `"Standard_B1s"` if
someone creates a workspace name that isn't in the map.

## The real payoff — and the real limit

This is genuinely convenient for environments that are structurally
identical and differ only in scale: same resources, different sizes,
different names, maybe a different instance count. One `terraform
apply` cycle per environment, no copy-pasted directories. But notice
what workspaces do *not* give you: every workspace still shares the
same backend, the same provider configuration, and typically the same
credentials. There's nothing stopping you from running `terraform
apply` against `prod` by accident while thinking you're in `dev` —
Lesson 18 covers exactly that risk, and when it's serious enough to
reach for separate state files instead.

## Key terms

| Term | Meaning |
|---|---|
| Workspace | A named state file within one backend, tied to one configuration — created with `terraform workspace new` |
| `default` workspace | The workspace every working directory starts in automatically, before you create any others |
| `terraform.workspace` | A built-in read-only value exposing the active workspace's name inside your HCL |
| `terraform workspace select` | Switches the active workspace without creating one — run it before every `plan`/`apply` |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: if
two workspaces share the same `main.tf`, the same provider block, and
the same backend, what exactly is different between them once you run
`terraform workspace select prod` versus `terraform workspace select
dev`?
