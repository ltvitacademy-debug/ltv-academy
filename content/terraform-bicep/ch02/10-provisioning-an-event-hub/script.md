# Script — Provisioning an Event Hub

## Segment 1 (title)

Fabric & Real-Time Analytics Lesson 20 taught Event Hubs as a streaming concept — partitions, retention, a namespace you connect to. In Terraform, that's always two resources together: a namespace, and the Event Hub inside it.

## Segment 2 (code: namespace and hub, linked)

The namespace resource sets the SKU and capacity. The Event Hub references it with namespace_id, not a name string — that reference is what tells Terraform the hub depends on the namespace and must be created after it, no separate depends_on required.

## Segment 3 (code: partition_count and message_retention)

Lesson 20 already explained why an Event Hub is partitioned — parallel consumption — and why retention exists — so a lagging consumer still has a window to catch up. This lesson just shows where those concepts land: partition_count and message_retention, both simple arguments on the resource.

## Segment 4 (steps: what the namespace SKU changes)

The namespace's sku — Basic, Standard, or Premium — changes what capacity even means and which features are available. Standard is the common choice for most data engineering workloads; switching into Premium later forces a brand-new resource, since it's a different SKU family entirely.

## Segment 5 (outro)

A namespace and an Event Hub, provisioned together, the concepts from Lesson 20 now expressed as two linked resource blocks. Next up: stopping the copy-paste — Terraform modules.
