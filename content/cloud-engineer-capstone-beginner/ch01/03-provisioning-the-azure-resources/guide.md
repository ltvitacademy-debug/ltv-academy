# Lesson 3 — Provisioning the Azure Resources

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 3 of 10**

## What you'll learn

- How to name and tag a resource group before anything goes inside it
- How to create the storage account the product images will live in
- How to create the virtual machine the catalog app will run on, and why one command
  provisions more than "just a VM"
- Why creating resources in this order — group, then storage, then VM — isn't arbitrary

## Starting with the resource group

Everything in this project shares one lifecycle: it gets created together, managed together,
and — eventually, in a much later project — retired together. That's exactly what a resource
group is for, so it's the first thing Theo creates, tagged from the start rather than tagged as
an afterthought:

```
az group create \
  --name rg-driftwood-eastus-catalog \
  --location eastus \
  --tags environment=production app=catalog owner=theo.bryant
```

The name follows a plain convention: resource type, company, region, workload —
`rg-driftwood-eastus-catalog`. The tags matter beyond bookkeeping: if a cost question ever comes
up about this project, `app=catalog` is exactly what you'd search on to find every resource
tied to it.

## Creating the storage account

Next, the storage account that will hold the product images — a single management and billing
boundary that can hold blob, file, queue, and table storage, though this project only needs
blob:

```
az storage account create \
  --name stdriftwoodimages \
  --resource-group rg-driftwood-eastus-catalog \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2
```

A few deliberate choices here:

- **`stdriftwoodimages`** — storage account names have to be globally unique across all of
  Azure, 3–24 characters, lowercase letters and numbers only, because the name becomes part of
  the public endpoint URL.
- **`Standard_LRS`** — Standard tier (not Premium) because product images don't need
  sub-millisecond latency, and locally redundant storage is a reasonable default for a first
  project without a stated geo-redundancy requirement.
- **`StorageV2`** — the general-purpose v2 kind, which is the right default for nearly every
  real deployment and supports blob storage along with everything else this account might need
  later.

## Creating the virtual machine

Last, the VM that will run the catalog application server:

```
az vm create \
  --resource-group rg-driftwood-eastus-catalog \
  --name vm-catalog01 \
  --image Ubuntu2204 \
  --size Standard_B2s \
  --admin-username azureuser \
  --generate-ssh-keys
```

That single command provisions more than "a VM" — it creates the VM, an OS disk, a network
interface, and, since nothing says otherwise, a public IP address and a default network
security group. `Standard_B2s` is a burstable size: it gets a baseline amount of CPU and can
burst above it for short periods, which fits a catalog app that sees steady-but-not-huge traffic
today. If Lesson 6's monitoring later shows the app genuinely needs more sustained CPU than
B-series provides, upsizing to a D-series VM is a one-line change — not a reason to over-provision
now.

## Confirming what actually exists

Before moving on, check what Azure actually created, not just what the commands claimed to
create:

```
az resource list \
  --resource-group rg-driftwood-eastus-catalog \
  --output table
```

This returns every resource in the group — the storage account, the VM, its disk, its NIC, its
public IP, and the virtual network Azure created by default — confirming the resource group
holds exactly what this project needs, nothing more.

## Key terms

| Term | Meaning |
|---|---|
| Resource group | The shared-lifecycle container everything in this project is deployed into |
| `az storage account create` | Creates the top-level namespace that will hold the product-image blob container |
| `az vm create` | Provisions a VM plus its OS disk, NIC, and (by default) a public IP and NSG, in one command |
| `az resource list` | Lists every resource actually created in a group, regardless of type |

## Lab

Run `az group create`, `az storage account create`, and `az vm create` with the names and
settings above (or your own naming convention, kept consistent). Then run `az resource list`
against the resource group and confirm you can account for every resource it returns — including
the ones you didn't type a command for directly.

## Check yourself

You're ready for Lesson 4 when you can explain, from memory, why `az vm create` creates more
resources than just the VM, and why `Standard_B2s` was a reasonable starting size for this
workload rather than a guess.
