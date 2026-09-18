# Lesson 9 — Provisioning a Fabric Capacity

**Chapter 2 · Terraform for Azure Data Resources · Lesson 9 of 22**

## What you'll learn

- The real `azurerm_fabric_capacity` resource in the AzureRM Terraform provider
- How the SKU sizing you already learned in Fabric & Real-Time Analytics maps to a `sku` block in code
- What `administration_members` does, and why it can't be left empty
- Why this resource is recent enough that its absence from older tutorials doesn't mean it doesn't exist

## The resource: `azurerm_fabric_capacity`

Fabric & Real-Time Analytics Lesson 64 taught you how to size a Fabric
Capacity — choosing an SKU like F64 based on expected concurrent load,
and understanding what an F-SKU actually buys you in CU-seconds. That
lesson had you make the choice in the Portal. This lesson takes the
exact same choice and writes it as code:

```
resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "West Europe"
}

resource "azurerm_fabric_capacity" "example" {
  name                = "exampleffc"
  resource_group_name = azurerm_resource_group.example.name
  location            = "West Europe"

  administration_members = [data.azurerm_client_config.current.object_id]

  sku {
    name = "F32"
    tier = "Fabric"
  }

  tags = {
    environment = "test"
  }
}
```

The `sku.name` field is exactly the SKU you sized by hand in Lesson 64
— `F2` through `F2048` are the valid values, and `tier` is always
`"Fabric"`. Nothing about *how* to choose F32 vs. F64 changes here;
this lesson is only about writing the choice down as a resource block
instead of a Portal dropdown.

## `administration_members` is not optional in practice

The provider marks `administration_members` optional, but a Fabric
Capacity with no administrators is a capacity nobody can manage after
`apply` finishes — including you. Each entry has to be either a
Microsoft Entra user's UPN (`someone@yourtenant.onmicrosoft.com`) or a
service principal's object ID, not an email alias or display name. The
example above uses a data source to grab whichever identity is
currently authenticated to the AzureRM provider:

```
data "azurerm_client_config" "current" {}
```

That one line is doing real work: it means the Terraform file doesn't
need to hardcode a specific person's UPN, so the same file still
applies correctly after that person leaves the team.

## Be honest about how new this is

This resource type only recently reached the AzureRM provider — the
underlying Microsoft.Fabric ARM API it wraps is itself fairly new
(API version 2023-11-01 and later). If you're working from an older
Terraform tutorial, blog post, or a pinned `azurerm` provider version
from a year or two back, `azurerm_fabric_capacity` may genuinely not
exist yet in that version, and you'd be looking at provisioning
through the Fabric REST API directly, or through Az PowerShell/CLI
(`az resource create` against `Microsoft.Fabric/capacities`) as a
stopgap. Don't assume a missing resource type is your mistake — check
which provider version your `required_providers` block is actually
pinned to before troubleshooting further.

## Key terms

| Term | Meaning |
|---|---|
| `azurerm_fabric_capacity` | The AzureRM provider resource for a Microsoft Fabric Capacity |
| `sku` block | Nested block setting the F-SKU (`F2`–`F2048`) and `tier` (`"Fabric"`) |
| `administration_members` | UPNs or service principal object IDs that can manage the capacity |
| `data "azurerm_client_config"` | A data source exposing the currently authenticated identity's IDs |

## Check yourself

You're ready for Lesson 10 when you can explain: why does the example
above use a data source for `administration_members` instead of a
hardcoded UPN string, and what happens to a Fabric Capacity that gets
applied with an empty `administration_members` list?
