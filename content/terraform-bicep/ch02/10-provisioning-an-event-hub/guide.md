# Lesson 10 — Provisioning an Event Hub

**Chapter 2 · Terraform for Azure Data Resources · Lesson 10 of 22**

## What you'll learn

- Why an Event Hub always comes in a namespace/hub pair of resources, never alone
- The real `azurerm_eventhub_namespace` and `azurerm_eventhub` resource blocks
- How `partition_count` and `message_retention` map to concepts Fabric Lesson 20 already taught
- Why `namespace_id` — not a namespace name string — is what links the two resources

## Two resources, not one

Fabric & Real-Time Analytics Lesson 20 taught Event Hubs as a streaming
ingestion concept: partitions for parallel consumption, a retention
window, a namespace as the container a client actually connects to.
In Terraform, that maps to exactly two resources, always used
together — you can't provision an Event Hub without a namespace to
put it in, the same way you can't provision a database without a
server:

```
resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "West Europe"
}

resource "azurerm_eventhub_namespace" "example" {
  name                = "acceptanceTestEventHubNamespace"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  sku                 = "Standard"
  capacity            = 1

  tags = {
    environment = "Production"
  }
}

resource "azurerm_eventhub" "example" {
  name              = "acceptanceTestEventHub"
  namespace_id      = azurerm_eventhub_namespace.example.id
  partition_count   = 2
  message_retention = 1
}
```

## The link is a resource reference, not a string

Notice `namespace_id = azurerm_eventhub_namespace.example.id` — the
Event Hub doesn't take a namespace *name*, it takes the namespace
resource's actual `id` attribute, produced only after that resource
is created. This is what tells Terraform the Event Hub depends on the
namespace and must be created after it; there's no separate
`depends_on` needed because the reference itself creates the
dependency graph edge.

## `partition_count` and `message_retention`, from concept to number

Fabric Lesson 20 explained *why* an Event Hub is partitioned — so
multiple consumers can read in parallel without stepping on each
other — and why retention exists — so a consumer that falls behind
still has a window to catch up. This lesson doesn't re-explain either
concept; it just shows where they land as arguments:

- `partition_count` — the number of partitions, set once at creation. Lesson 20's guidance on expected concurrent consumers is exactly what should drive this number.
- `message_retention` — retention window in days for the Standard tier.

## SKU affects what capacity even means

The namespace's `sku` — `Basic`, `Standard`, or `Premium` — changes
what `capacity` (throughput units) means and whether features like
Auto-Inflate are even available. Standard is the common choice for
most data engineering workloads; Premium forces a new resource if you
ever change into it later, since it's a different underlying SKU
family, not just a bigger version of Standard.

## Key terms

| Term | Meaning |
|---|---|
| `azurerm_eventhub_namespace` | The container resource an Event Hub is provisioned inside |
| `azurerm_eventhub` | The Event Hub resource itself, linked to its namespace by `namespace_id` |
| `partition_count` | Number of partitions for parallel consumption, set at creation |
| `message_retention` | Retention window in days for events in the hub |

## Check yourself

You're ready for Lesson 11 when you can explain: why does
`azurerm_eventhub` reference `azurerm_eventhub_namespace.example.id`
instead of just the namespace's name string, and what would happen if
you tried to write the Event Hub resource before the namespace
resource existed in the same file?
