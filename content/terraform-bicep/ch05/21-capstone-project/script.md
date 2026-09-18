# Script — Capstone: Provisioning a Data Platform's Infrastructure

## Segment 1 (title)

This capstone provisions the actual infrastructure a small data platform needs before a single pipeline can run — a resource group, a Storage Account, an Event Hub, and a Fabric Capacity, the same four resource types from earlier in this course, now provisioned together.

## Segment 2 (code: root module and child module)

The Storage Account and Event Hub — the two resources every environment needs identically — live inside a reusable landing-zone module, called once from a root configuration that provisions the resource group and Fabric Capacity directly.

## Segment 3 (code: remote state from the start)

This isn't a demo with local state. The azurerm backend is configured before the first apply, so a second engineer picking this up later has the same state to work from.

## Segment 4 (code: plan, reviewed, then applied)

Plan runs first, naming every resource about to be created across both the root configuration and the module. Only after that plan is reviewed does apply actually create anything.

## Segment 5 (outro)

The same resource types, organized with modules, protected by remote state, reviewed through plan before apply. Next up: wrapping up the capstone and this course.
