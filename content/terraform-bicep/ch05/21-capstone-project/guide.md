# Lesson 21 — Capstone: Provisioning a Data Platform's Infrastructure

**Chapter 5 · Capstone · Lesson 21 of 22**

## What you'll build

A single Terraform configuration that provisions the actual
infrastructure a small data platform needs before a single pipeline
can run: a resource group, a Storage Account for landing raw data, an
Event Hub for streaming ingestion, and a Fabric Capacity to run it
all on — the same four resource types this course has taught
individually, now provisioned together, behind a remote state
backend, reviewed through a real plan before anything applies.

## The shape: one root module, one child module

Lesson 11 introduced Terraform modules. This capstone uses that
pattern for real: a reusable `landing-zone` module that provisions
the Storage Account and Event Hub together (the two resources every
environment needs identically), called once from a root
configuration that also provisions the resource group and Fabric
Capacity directly:

```
main.tf                    # resource group, Fabric Capacity, calls the module
modules/
  landing-zone/
    main.tf                #   azurerm_storage_account + azurerm_eventhub_namespace/eventhub
    variables.tf            #   inputs: name prefix, location
    outputs.tf               #   outputs: storage account id, event hub connection string
```

```
module "landing_zone" {
  source        = "./modules/landing-zone"
  name_prefix   = var.name_prefix
  location      = azurerm_resource_group.platform.location
}
```

## Remote state, from the start

This isn't a demo run with local state. Lesson 17's `azurerm` backend
is configured before the first `apply` — a second engineer picking up
this same platform later needs the same state Lesson 19's import
lesson depends on being available and correct.

```
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sttfstateplatform"
    container_name       = "tfstate"
    key                  = "data-platform.tfstate"
  }
}
```

## Plan, reviewed, then applied

Lesson 18's workflow runs exactly as taught: `terraform plan` first,
producing a diff naming every resource about to be created — one
resource group, one Fabric Capacity, and (from inside the module)
one Storage Account and one Event Hub namespace with its Event Hub.
Only after that plan is reviewed does `terraform apply` actually
create anything.

```
$ terraform plan
  # azurerm_resource_group.platform will be created
  # azurerm_fabric_capacity.platform will be created
  # module.landing_zone.azurerm_storage_account.data will be created
  # module.landing_zone.azurerm_eventhub_namespace.stream will be created
  # module.landing_zone.azurerm_eventhub.events will be created

Plan: 5 to add, 0 to change, 0 to destroy.
```

## What this actually proves

Career & Capstone's Project 2 (a warehouse migration) and Project 3
(a streaming fraud detector) both needed exactly this kind of
infrastructure standing before any pipeline logic could run. This
capstone is that missing piece, made real: the same resource types
from Lessons 6-10, organized with the module pattern from Lesson 11,
protected by remote state from Lesson 17, and reviewed through the
plan/apply discipline from Lesson 18 — provisioned once, reviewably,
and rebuildable from this exact configuration if anything is ever
lost.

## Key terms

| Term | Meaning |
|---|---|
| Root module | The top-level Terraform configuration that calls one or more child modules |
| Child module | A reusable, self-contained set of resources (`landing-zone`) called with inputs and producing outputs |
| `terraform plan` output | The named diff of exactly what will be created, changed, or destroyed |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why
does this capstone provision the Storage Account and Event Hub
through a module instead of declaring them directly in the root
configuration, the way the resource group is declared?
