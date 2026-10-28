# Lesson 3 — Azure Regions and Resource Naming Conventions

**Chapter 1 · Azure Fundamentals & Governance · Lesson 3 of 4**

## What you'll learn

- What an Azure region is, and why it affects latency, compliance, and which services you can even use
- What a paired region is, and why Microsoft sequences platform updates and recovery across region pairs
- Microsoft's recommended naming convention for resources, and how to read a well-formed resource name on sight
- How to list the regions available to your subscription with Azure CLI

## A region is a latency perimeter, not just a map pin

Every Azure resource has to be deployed somewhere, and Azure organizes its physical datacenters into
**regions** — East US, West Europe, Southeast Asia, and dozens more. A region is a set of
datacenters deployed within a defined latency perimeter, connected together by a dedicated,
low-latency network. That matters for three practical reasons: not every service is available in
every region, some industries and governments require data to stay within a specific region or
country for compliance, and the physical distance between your users and the region you pick shows
up directly as latency.

```
az account list-locations --output table
```

This lists every region available to your subscription, with both its display name ("East US") and
the internal name you'll actually type into every CLI command and template ("eastus") — always
lowercase, no spaces.

## Paired regions

Most Azure regions are matched with another region in the same geography, forming a **paired
region**. Microsoft deliberately sequences planned platform updates across a pair rather than
rolling them out to both at once, and prioritizes recovery of one region in a pair if the other has
an extended outage. East US, for example, is paired with West US. Paired regions matter most when
you're designing for disaster recovery: replicating critical resources to your region's pair is a
documented, supported pattern — replicating to an unrelated, unpaired region is not.

## A naming convention that survives scale

A resource named `StorageAccount1` tells you nothing six months later. Microsoft's own Cloud
Adoption Framework recommends a consistent pattern: **resource-type prefix, workload or app,
environment, region, instance number** — all lowercase, hyphen-separated where the resource type
allows it:

```
az group create --name rg-prod-eastus-web01 --location eastus

az vm create --name vm-prod-eastus-web01 \
  --resource-group rg-prod-eastus-web01 \
  --image Ubuntu2204 \
  --location eastus
```

Not every resource type accepts hyphens — storage account names must be lowercase alphanumeric only,
3 to 24 characters, so the same convention compresses to something like `stprodeastusweb001`.

## Reading a name on sight

Break `rg-prod-eastus-web01` down piece by piece and every segment tells you something specific:

```
rg        -  resource type   (resource group)
prod      -  environment     (production, not test or dev)
eastus    -  region          (East US)
web01     -  workload/instance (first web-tier instance)
```

That's the entire payoff of a naming convention: anyone — including you, months later — can read the
name alone and know what the resource is, what environment it belongs to, and where it lives,
without opening the Portal to check.

## Key terms

| Term | Meaning |
|---|---|
| Region | A set of Microsoft datacenters within a defined latency perimeter, connected by a dedicated network |
| Paired region | A region matched with another in the same geography for sequenced updates and disaster recovery |
| Resource naming convention | A consistent pattern — resource type, environment, region, instance — that keeps resource names identifiable at scale |
| Resource type prefix | A short abbreviation identifying what a resource is, e.g. `rg-` for a resource group or `vm-` for a virtual machine |

## Check yourself

A colleague names a new storage account `StorageAccount1`. Using the naming convention from this
lesson, what would you rename a production web app's storage account in East US to instead, and why
does that name alone tell you more than the original one did?
