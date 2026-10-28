# Lesson 29 — Lab: Deploying a Small Multi-Tier Environment

**Chapter 8 · Capstone: Deploying and Administering an Azure Environment · Lesson 29 of 32**

## What you'll learn

- How a resource group, tags, and a naming convention (Chapter 1) come together before a single VM gets created
- How to lay out a VNet into a web subnet and an app subnet (Chapter 5) that will carry different security rules later
- How to stand up a web-tier VM and an app-tier VM (Chapter 3) with deliberately different public-IP exposure
- Why a storage account (Chapter 4) belongs in this architecture even though no VM needs it to boot
- How to run the whole sequence from the Azure CLI (Chapter 6), end to end, in the order a real deployment follows

## The scenario

Briarcliff Systems — the same company whose network you diagnosed at the end of the previous course — is moving a small internal application into Azure: a web front end that customers hit directly, and an app tier behind it that should never be reachable from the open internet. You're building the whole environment from scratch in Cloud Shell, using nothing but `az` commands and the governance, compute, storage, and networking habits from Chapters 1 through 6.

## Step 1 — Resource group, with tags from day one

Everything else in this lab lives inside one resource group, and it gets tagged the moment it's created, not retrofitted afterward:

```
az group create \
  --name briarcliff-rg \
  --location eastus \
  --tags environment=production costcenter=it-ops owner=briarcliff-ops
```

Chapter 1's point about tags wasn't decorative: `costcenter` and `owner` are exactly what Lesson 31's cost investigation, later in this chapter, will search on.

## Step 2 — A VNet split into two subnets

One virtual network, two subnets, one per application tier, with address ranges that don't overlap:

```
az network vnet create \
  --resource-group briarcliff-rg \
  --name briarcliff-vnet \
  --address-prefix 10.20.0.0/16 \
  --subnet-name web-subnet \
  --subnet-prefix 10.20.1.0/24

az network vnet subnet create \
  --resource-group briarcliff-rg \
  --vnet-name briarcliff-vnet \
  --name app-subnet \
  --address-prefix 10.20.2.0/24
```

No security rules yet — that's deliberately left for Lesson 30. Right now the goal is just a VNet shaped the way this application needs it: one /24 for whatever faces the internet, a separate /24 for whatever shouldn't.

## Step 3 — The web-tier VM

The web VM goes in `web-subnet` and gets a public IP, because customers need to reach it directly:

```
az vm create \
  --resource-group briarcliff-rg \
  --name web-vm1 \
  --image Ubuntu2204 \
  --size Standard_B2s \
  --vnet-name briarcliff-vnet \
  --subnet web-subnet \
  --public-ip-address web-vm1-pip \
  --admin-username azureuser \
  --generate-ssh-keys
```

`Standard_B2s` is a burstable size — fine for a small front end that isn't under constant heavy load, and cheap enough that it won't be the VM Lesson 31 has to chase down later.

## Step 4 — The app-tier VM, with no public IP at all

The app VM goes in `app-subnet` — and this time `--public-ip-address` is explicitly empty:

```
az vm create \
  --resource-group briarcliff-rg \
  --name app-vm1 \
  --image Ubuntu2204 \
  --size Standard_B2s \
  --vnet-name briarcliff-vnet \
  --subnet app-subnet \
  --public-ip-address "" \
  --admin-username azureuser \
  --generate-ssh-keys
```

This isn't an oversight — it's the whole point of a multi-tier design. The app tier only ever needs to hear from the web tier, never from the internet directly, so it simply doesn't get an internet-facing address. Lesson 30's NSG rules will make that boundary explicit, but the VM itself already enforces half of it just by never having a public IP to begin with.

## Step 5 — A storage account for application data

The app needs somewhere to put uploaded files and logs that isn't just a VM's local disk:

```
az storage account create \
  --resource-group briarcliff-rg \
  --name briarcliffdata001 \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2
```

`Standard_LRS` — locally redundant, standard performance — is the right default for application data that isn't latency-critical and doesn't need geo-redundancy yet. Chapter 4 covered when you'd reach for `ZRS` or `GRS` instead, and this isn't that case.

## What's actually standing now

Five resources, created in an order that matters: a tagged resource group, a VNet shaped into two subnets, a web VM with a public IP, an app VM with none, and a storage account for data that neither VM's OS disk should be holding. Nothing is secured yet and nothing is being watched — that's exactly where Lesson 30 picks up.

## Key terms

| Term | Meaning |
|---|---|
| Resource group | The container every resource in this lab is created inside and tagged through |
| Subnet | A smaller address range carved out of a VNet, here one per application tier |
| Public IP address | An internet-reachable address; assigned to the web VM, deliberately withheld from the app VM |
| Standard_LRS | A storage redundancy/performance tier: standard performance, locally redundant, no geo-replication |

## Check yourself

Why does `app-vm1` get `--public-ip-address ""` instead of a real address, when `web-vm1` gets one? What would have to be true about the application for that choice to be wrong?
