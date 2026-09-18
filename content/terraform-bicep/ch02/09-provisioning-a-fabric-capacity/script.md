# Script — Provisioning a Fabric Capacity

## Segment 1 (title)

Fabric & Real-Time Analytics Lesson 64 had you size a Fabric Capacity by hand in the Portal — choosing an SKU like F64 based on expected load. This lesson takes that exact same choice and writes it as a real Terraform resource block.

## Segment 2 (code: the azurerm_fabric_capacity resource)

The AzureRM provider's azurerm_fabric_capacity resource takes a resource group, a location, and a sku block — name is the F-SKU you already know how to choose, F2 through F2048, and tier is always "Fabric". Nothing about how to size it changes; only how you write the choice down.

## Segment 3 (code: administration_members isn't really optional)

The provider marks administration_members optional, but a capacity with nobody listed is a capacity nobody can manage after apply finishes. Each entry has to be a real Entra user UPN or a service principal object ID — this example pulls the currently authenticated identity from a data source instead of hardcoding one person's name.

## Segment 4 (steps: how new this resource actually is)

This resource type is recent — it wraps a Microsoft.Fabric ARM API that itself only reached general availability recently. An older tutorial or a provider version pinned a year or two back may genuinely not have it yet. That's not your mistake to debug; check your required_providers version first.

## Segment 5 (outro)

The SKU choice from Lesson 64, now a resource block. Next up: an Event Hub namespace and Event Hub, the same way.
