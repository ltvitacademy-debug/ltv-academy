# Lesson 6 — Deploying VNets, VPCs, and Subnets

**Chapter 2 · Deploying the Network Layer · Lesson 6 of 32**

## What you'll learn

- How to actually run the deployment order from Lesson 5: resource group, then VNet/VPC, then
  subnets, with the real `az` and `aws` commands
- How to size a CIDR block with room to grow, not just room for what you need today
- Why under-sizing a VNet/VPC's address space is a mistake you can't always fix later without
  disruption
- How the same subnet plan looks in both Azure and AWS, side by side

## Resource group, then VNet, then subnets

Lesson 5 established the order. Here's that order as real commands, Azure first:

```bash
az group create --name rg-prod --location eastus

az network vnet create \
  --resource-group rg-prod \
  --name vnet-prod \
  --address-prefix 10.0.0.0/16 \
  --subnet-name snet-web \
  --subnet-prefix 10.0.1.0/24

az network vnet subnet create \
  --resource-group rg-prod --vnet-name vnet-prod \
  --name snet-app --address-prefixes 10.0.2.0/24

az network vnet subnet create \
  --resource-group rg-prod --vnet-name vnet-prod \
  --name snet-data --address-prefixes 10.0.3.0/24
```

And the AWS equivalent:

```bash
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --region us-east-1

aws ec2 create-subnet \
  --vpc-id vpc-0abc123456789def0 \
  --cidr-block 10.0.1.0/24 \
  --availability-zone us-east-1a

aws ec2 create-subnet \
  --vpc-id vpc-0abc123456789def0 \
  --cidr-block 10.0.2.0/24 \
  --availability-zone us-east-1a

aws ec2 create-subnet \
  --vpc-id vpc-0abc123456789def0 \
  --cidr-block 10.0.3.0/24 \
  --availability-zone us-east-1a
```

Same shape in both clouds: one overall address block (`/16`), then three smaller blocks
(`/24` each) carved out for a web tier, an app tier, and a data tier — each tier isolated in its
own subnet so NSGs/security groups and routing can treat them differently in Lesson 7.

## Sizing with room to grow

A `/16` (about 65,000 addresses) split into `/24` subnets (256 addresses each) only uses three of
those `/24`s above: `10.0.1.0/24`, `10.0.2.0/24`, `10.0.3.0/24`. That's deliberate — it leaves
`10.0.4.0/24` through `10.0.255.0/24` completely unused and available. The real planning
consideration here isn't "how many addresses do I need today," it's "how many subnets will this
environment have in a year." A monitoring tier (Chapter 4), a backup/DR subnet (Chapter 5), or a
second availability zone's worth of subnets for high availability all need their own ranges, and
if the VNet/VPC was sized too tightly up front, there's no room left to add them without either
expanding the address space (disruptive, and not always possible if the range is already in use
elsewhere) or redesigning the whole layout.

```text
Under-planned: VPC sized at 10.0.0.0/24 (256 addresses total)
  -> One subnet barely fits. No room for a second tier, let alone five.

Planned with room to grow: VPC sized at 10.0.0.0/16 (65,536 addresses)
  -> snet-web   10.0.1.0/24
  -> snet-app   10.0.2.0/24
  -> snet-data  10.0.3.0/24
  -> (reserved) 10.0.4.0/24 through 10.0.255.0/24 for everything added later
```

## Verifying what you deployed

Both clouds let you list what exists before moving on to NSGs in Lesson 7:

```bash
az network vnet subnet list \
  --resource-group rg-prod --vnet-name vnet-prod --output table

aws ec2 describe-subnets \
  --filters "Name=vpc-id,Values=vpc-0abc123456789def0" \
  --output table
```

Confirming the subnets exist with the right CIDR ranges, in the right availability zones, before
building anything on top of them, is cheap. Finding out they're wrong after a VM is already
attached is not.

## Key terms

| Term | Meaning |
|---|---|
| Address prefix / CIDR block | The range assigned to a VNet/VPC or subnet, e.g. `10.0.0.0/16` |
| Tier | A logical grouping of resources (web, app, data) placed in its own subnet for isolation |
| Sizing with room to grow | Allocating a larger address block than currently needed so future subnets don't require a redesign |
| `az network vnet subnet list` / `aws ec2 describe-subnets` | The commands used to verify what was actually deployed |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: if a VPC is sized at
`10.0.0.0/24` instead of `10.0.0.0/16`, what happens when the project later needs a fourth or
fifth subnet, and why is that a planning problem rather than a quick fix?
