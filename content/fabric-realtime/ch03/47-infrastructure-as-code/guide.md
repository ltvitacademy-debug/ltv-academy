# Lesson 47 — Infrastructure as Code: ARM/Bicep and Terraform Basics

**Chapter 3 · Production Data Engineering · Lesson 47 of 70**

## What you'll learn

- What IaC covers that Lessons 45–46's CI/CD and Git integration don't
- ARM templates and Bicep — Microsoft's native declarative format
- Terraform — the multi-cloud alternative, same underlying idea
- Why "click through the Azure portal" has the same problem as manual deploys

## A different layer than Fabric items

Lessons 45–46 covered version-controlling and automatically
deploying Fabric *items* — notebooks, Eventstreams, KQL Querysets.
**Infrastructure as Code (IaC)** covers a layer beneath that: the
actual Azure resources a Fabric workspace depends on — the Event
Hub namespace feeding an Eventstream (Lesson 20), the Fabric
Capacity itself (Lesson 13), a storage account, a resource group.
Those are provisioned through Azure, not through Fabric's own Git
integration, and need their own version-controlled, repeatable
definition.

## Bicep — Microsoft's declarative format

```bicep
resource eventHubNamespace 'Microsoft.EventHub/namespaces@2023-01-01-preview' = {
  name: 'nyc-taxi-events-prod'
  location: 'eastus'
  sku: {
    name: 'Standard'
    capacity: 2
  }
}

resource fabricCapacity 'Microsoft.Fabric/capacities@2023-11-01' = {
  name: 'ltv-academy-capacity-prod'
  sku: { name: 'F64' }
}
```

Bicep describes the **desired end state** — "this Event Hub
namespace should exist, with this SKU" — rather than a sequence of
manual steps. Running it against an environment that already
matches this definition does nothing; running it against an empty
resource group creates everything described, in one repeatable
action.

## Terraform — the same idea, cloud-agnostic

```hcl
resource "azurerm_eventhub_namespace" "taxi_events" {
  name     = "nyc-taxi-events-prod"
  location = "eastus"
  sku      = "Standard"
  capacity = 2
}
```

Terraform expresses the identical declarative idea, but through a
provider model that also works against AWS, GCP, and other clouds —
useful for a team that manages infrastructure across more than one
cloud, or simply prefers Terraform's tooling and ecosystem over
Bicep's Azure-only scope.

## Why "click through the portal" has the same problem as manual deploys

This is exactly Lesson 45's "click Deploy" problem, one layer down:
a person clicking through the Azure portal to create an Event Hub
namespace can't guarantee dev, test, and prod all end up
configured identically, and there's no record of exactly what was
clicked. IaC solves it the same way CI/CD solved deployment — a
definition file replaces institutional memory, and the same file
provisions every environment identically.

## Key terms

| Term | Meaning |
|---|---|
| Infrastructure as Code | Version-controlled, repeatable definitions for the Azure resources underneath Fabric |
| Bicep | Microsoft's declarative, Azure-native IaC format |
| Terraform | A cloud-agnostic declarative alternative with the same underlying idea |

## Check yourself

You're ready for Lesson 48 when you can explain, without looking: why
does IaC operate on a different layer than the Git integration and
CI/CD covered in Lessons 45–46?
