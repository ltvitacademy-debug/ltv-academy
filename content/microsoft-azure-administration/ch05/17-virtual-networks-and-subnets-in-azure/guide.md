# Lesson 17 — Virtual Networks and Subnets in Azure

**Chapter 5 · Azure Networking · Lesson 17 of 32**

## What you'll learn

- How to actually create a VNet and a subnet with `az network vnet create`, not just describe one
- How Azure carves up the address space you assign, and where the subnets inside it come from
- Why every subnet loses 5 of its addresses to Azure itself, no matter how you size it
- Why a VNet is a regional resource, and what that means for a multi-region design

## From concept to `az network vnet create`

The previous course covered what a VNet is in general: a customer-defined, isolated slice of
private address space, Azure's name for the same idea AWS calls a VPC. In Azure specifically, you
create one with a single CLI command:

```
az group create --name rg-network-demo --location eastus

az network vnet create \
  --resource-group rg-network-demo \
  --name vnet-prod \
  --address-prefix 10.0.0.0/16 \
  --subnet-name snet-web \
  --subnet-prefix 10.0.1.0/24
```

`--address-prefix` is the VNet's overall CIDR block — here, `10.0.0.0/16`, about 65,000 addresses.
`--subnet-name` and `--subnet-prefix` create the VNet's first subnet in the same call, because
Azure won't let you create a VNet with zero subnets. Everything after this — VMs, load balancers,
NSGs — attaches to a subnet, never directly to the VNet.

## Adding more subnets

A single subnet is rarely the end state. Add more with `az network vnet subnet create`:

```
az network vnet subnet create \
  --resource-group rg-network-demo \
  --vnet-name vnet-prod \
  --name snet-app \
  --address-prefixes 10.0.2.0/24

az network vnet subnet create \
  --resource-group rg-network-demo \
  --vnet-name vnet-prod \
  --name snet-data \
  --address-prefixes 10.0.3.0/24

az network vnet subnet list \
  --resource-group rg-network-demo \
  --vnet-name vnet-prod \
  --output table
```

Each subnet's range has to be unique within the VNet and can't overlap any sibling subnet — Azure
rejects the create call if it does. You can expand a VNet's address space later by adding another
range, but you generally can't shrink or re-carve a range that already has resources in it.

## Every subnet loses 5 addresses to Azure

This is the detail that catches people sizing their first subnet: Azure reserves 5 IP addresses in
**every** subnet, regardless of size, for its own use.

```
Subnet 10.0.1.0/24 (256 addresses total):
  10.0.1.0   -> network address (reserved)
  10.0.1.1   -> default gateway (reserved)
  10.0.1.2   -> mapped to Azure DNS (reserved)
  10.0.1.3   -> mapped to Azure DNS (reserved)
  10.0.1.255 -> broadcast address (reserved)
  -> 251 usable addresses for your resources
```

A `/24` barely notices losing 5 out of 256. A `/28` (16 addresses total) loses the same 5 and is
left with only 11 usable — plan small subnets with that in mind, especially for subnets that host
delegated services like Azure Bastion or a gateway, which have their own minimum-size requirements
on top of this.

## VNets are regional, not global

A VNet lives in exactly one Azure region. `vnet-prod` above was created in `eastus`, and every
subnet inside it inherits that region — there's no such thing as a VNet that spans `eastus` and
`westeurope`. If a design needs resources in multiple regions, that means multiple VNets, one per
region, connected afterward (peering, covered in Lesson 20). The resource group that holds a VNet,
by contrast, can span regions freely — region and resource group are independent concepts.

## Key terms

| Term | Meaning |
|---|---|
| Address prefix | The CIDR block assigned to a VNet or subnet, e.g. `10.0.0.0/16` |
| Subnet | A smaller CIDR range carved out of a VNet's address space; every resource attaches here, not to the VNet directly |
| Reserved addresses | The 5 addresses (network, gateway, two for DNS, broadcast) Azure takes from every subnet automatically |
| Regional resource | A VNet exists in exactly one Azure region; multi-region designs use multiple peered VNets |

## Check yourself

You need a subnet sized for 20 virtual machines. Why would a `/28` (16 addresses) actually be too
small, and what's the smallest CIDR block that comfortably covers 20 usable addresses after
Azure's reservations?
