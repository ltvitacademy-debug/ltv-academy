# Lesson 3 — Resources, Data Sources, and the Terraform State File

**Chapter 1 · Terraform Fundamentals · Lesson 3 of 4**

## What you'll learn

- What a `resource` block actually declares, and why Terraform
  treats it as something it owns and manages
- What a `data` source is, how it differs from a `resource`, and why
  reading something isn't the same as managing it
- What `terraform.tfstate` actually contains, in concrete terms
- Why Terraform diffs your configuration against **state**, not
  against the live cloud, and why that one fact explains almost every
  surprising thing Terraform does

## `resource`: something Terraform creates and owns

Every `resource` block you write is an instruction to Terraform:
create this, and from now on, manage it. Here's one declaring an
Azure resource group:

```hcl
resource "azurerm_resource_group" "rg" {
  name     = "rg-ltv-demo"
  location = "eastus"
}
```

`azurerm_resource_group` is the resource **type** (defined by the
`azurerm` provider), `rg` is the local **name** you use to refer to
it elsewhere in this configuration (as `azurerm_resource_group.rg`),
and the block body sets its real properties. Once this is applied,
Terraform considers this resource group **its own** — if you delete
the block and run `apply` again, Terraform destroys the real resource
group to match. That ownership is the whole point of a `resource`
block: it's not just a record of something that exists, it's a
standing instruction for what *should* exist.

## `data`: reading something you don't manage

A `data` source looks similar, but means something very different —
it **reads** information about something that already exists, and
Terraform never creates, changes, or destroys it:

```hcl
data "azurerm_resource_group" "existing" {
  name = "rg-shared-networking"
}

resource "azurerm_virtual_network" "vnet" {
  name                = "vnet-ltv-demo"
  location            = data.azurerm_resource_group.existing.location
  resource_group_name = data.azurerm_resource_group.existing.name
  address_space       = ["10.0.0.0/16"]
}
```

`data.azurerm_resource_group.existing` looks up a resource group that
some other process (or some other Terraform configuration entirely)
already created, and exposes its real attributes — like `location` —
so this configuration can reuse them. Deleting that `data` block and
re-applying does **nothing** to the real resource group; Terraform
simply stops reading it. That's the whole distinction: `resource`
means "manage this," `data` means "tell me about this."

## The state file: Terraform's own record

Every time you run `apply`, Terraform writes the result into
`terraform.tfstate` — a JSON file, by default sitting right in your
working directory, that records every resource Terraform manages and
the last values it knows for each one: IDs, computed attributes,
dependency relationships, all of it. You can look at it, but you
should never hand-edit it; `terraform state list` and `terraform
state show azurerm_resource_group.rg` are the supported ways to
inspect it.

```
terraform state list

azurerm_resource_group.rg
azurerm_virtual_network.vnet
```

## Why state, not the live cloud, is what gets diffed

This is the single most important mechanical fact in Terraform:
`plan` and `apply` diff your `.tf` configuration against **state**,
not directly against whatever's actually running in Azure right now.
State is Terraform's memory of what it created and what it looked
like last time Terraform checked. Most providers do refresh state
from the real API as part of `plan`, which is why drift — someone
changing a resource by hand in the Azure Portal — usually does get
detected. But the comparison that decides what to create, update, or
destroy is always "declared config vs. state," never "declared config
vs. whatever's live," and that's exactly why losing or corrupting a
state file is so dangerous: without it, Terraform has no memory of
what it's managing, and the next `plan` can propose recreating
resources that already exist.

## Key terms

| Term | Meaning |
|---|---|
| `resource` block | Declares something Terraform creates, owns, and manages going forward |
| `data` source | Reads information about something that already exists; never creates, changes, or destroys it |
| `terraform.tfstate` | The JSON file recording every resource Terraform manages and its last-known real-world values |
| `terraform state list` | Lists every resource currently tracked in state |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: what
is the practical difference between a `resource` block and a `data`
source, and why does Terraform diff your configuration against the
state file instead of the live cloud?
