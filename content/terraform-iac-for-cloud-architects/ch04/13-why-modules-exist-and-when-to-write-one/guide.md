# Lesson 13 — Why Modules Exist and When to Write One

**Chapter 4 · Modules & Reusability · Lesson 1 of 4**

## What you'll learn

- The real maintenance problem a copy-pasted resource block creates
  once the same infrastructure pattern has to exist in more than one
  place
- What a Terraform **module** actually is — not a special engine
  feature, just a folder of `.tf` files with its own inputs and
  outputs
- The practical rule of thumb for *when* to extract a module, and why
  writing one too early is its own kind of mistake
- How this maps to something already covered in this path: a module
  is to a block of HCL what a PowerShell function is to a block of
  script

## The copy-paste problem

Chapters 1-3 built one environment at a time — one resource group, one
VNet, one subscription. In a real job, "one environment" is never the
whole story: there's a dev VNet, a staging VNet, and a prod VNet, and
the team managing them is bigger than one person. The naive way to get
all three is to copy the same `azurerm_virtual_network` block into each
environment's `.tf` file and change a couple of values:

```hcl
# dev/main.tf
resource "azurerm_virtual_network" "dev" {
  name                = "vnet-dev"
  address_space       = ["10.0.0.0/16"]
  location            = "eastus"
  resource_group_name = azurerm_resource_group.dev.name
}

# staging/main.tf
resource "azurerm_virtual_network" "staging" {
  name                = "vnet-staging"
  address_space       = ["10.1.0.0/16"]
  location            = "eastus"
  resource_group_name = azurerm_resource_group.staging.name
}
```

This works, right up until someone decides every VNet needs a network
security group attached, or a naming-convention audit flags that
`staging` doesn't match the pattern. Now that fix has to land in every
copy, by hand, and it's easy to miss one — the same copy-paste
maintenance trap Lesson 7 of the PowerShell-for-Azure-Automation course
described for a duplicated loop, just one layer lower, in the
infrastructure itself instead of the script.

## What a module actually encapsulates

A **module** solves this by giving a proven pattern — "our standard
VNet setup" — one name and one home: a folder of `.tf` files that
takes in a few input variables (a name, an address space) and produces
the same resource every time, with the NSG and the naming convention
already baked in. Call it from three places with three different
inputs, and all three environments get the exact same structure, built
from the exact same HCL:

```hcl
module "dev_network" {
  source        = "../modules/network"
  vnet_name     = "vnet-dev"
  address_space = ["10.0.0.0/16"]
}
```

Lesson 14 writes that `network` module in full. For now, the point is
the shape: a `module` block calls a folder of HCL the same way a
`resource` block configures a resource, and whatever that folder does,
it does consistently every time it's called — fix the NSG rule inside
the module once, and every caller picks up the fix automatically.

## When to actually write one

It's tempting to make everything a module from day one, but that's its
own mistake. A module adds a layer of indirection — inputs to
understand, outputs to trace — that isn't worth paying for until
there's real duplication to remove. The practical rule of thumb: once
the same resource block has been copy-pasted two or three times,
especially across environments or across teams, extract it into a
module. Before that point, a plain resource block sitting in the root
configuration is simpler to read and easier to change. Terraform's own
module documentation leans the same way — modules exist to remove
duplication and encapsulate a reviewed pattern, not to make a one-off
configuration look more sophisticated than it needs to be.

## Key terms

| Term | Meaning |
|---|---|
| Module | A folder of `.tf` files with its own input variables and outputs, callable from a `module` block |
| Root module | The working directory `terraform init`/`plan`/`apply` runs from; it can call other modules but isn't one itself |
| `module` block | The syntax that calls a module and passes it input values, the same way a `resource` block configures a resource |
| Rule of two-to-three | The practical threshold for extracting a module: once a pattern is copy-pasted that many times, not before |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: what
real problem does a Terraform module solve that a copy-pasted resource
block doesn't, and why is writing a module before you've actually
repeated a pattern often the wrong call?
