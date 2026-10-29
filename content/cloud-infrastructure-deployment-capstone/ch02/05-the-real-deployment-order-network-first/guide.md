# Lesson 5 — The Real Deployment Order: Network First

**Chapter 2 · Deploying the Network Layer · Lesson 5 of 32**

## What you'll learn

- Why the network layer gets deployed **before** any compute or storage resource, not as an
  afterthought
- The real deployment order a production rollout follows: resource group → VNet/VPC → subnets →
  NSGs/security groups → **then** compute and storage
- What actually happens when you try to create a VM or EC2 instance before the network exists to
  put it in
- Why skipping ahead doesn't save time — it just moves the work to later, as rework

## Compute and storage need somewhere to live

The architecture diagram from Lesson 4 exists on paper. Turning it into a running environment
means deploying resources in a specific order, and that order isn't a style preference — it's
forced by a hard dependency. A virtual machine, an EC2 instance, a database, a storage account —
every one of them has to attach to a network at creation time. In Azure, `az vm create` takes a
`--vnet-name` and `--subnet` argument. In AWS, `aws ec2 run-instances` takes a `--subnet-id`
argument. Neither command lets you skip that argument and "add the network later" — the resource
simply can't exist without somewhere to plug in, the same way you can't install a wall outlet
before the wall is framed.

```bash
# This fails — no VNet/subnet exists yet to attach to
az vm create \
  --resource-group rg-prod \
  --name vm-web01 \
  --image Ubuntu2204 \
  --admin-username azureuser
# Error: --subnet/--vnet-name is required when no default VNet exists in this resource group
```

## The real deployment order

A production rollout follows this order, every time, because each step depends on the one
before it:

```text
1. Resource group          (az group create / the account itself, for AWS)
2. VNet / VPC               (az network vnet create / aws ec2 create-vpc)
3. Subnets                  (az network vnet subnet create / aws ec2 create-subnet)
4. NSGs / security groups    (az network nsg create / aws ec2 create-security-group)
5. Compute and storage       (az vm create / aws ec2 run-instances, THEN attached storage)
```

Steps 2–4 are the whole subject of this chapter. Step 5 — actually deploying VMs, EC2 instances,
storage accounts, and S3 buckets into the network you've just built — is Chapter 3. That ordering
isn't arbitrary: a subnet can't exist without a VNet to carve it from, an NSG gets attached to a
subnet or NIC that already has to exist, and a VM's network interface needs a subnet to request
an address from. Each layer is a prerequisite for the one above it.

## Skipping ahead doesn't save time

It's tempting to deploy a VM first "to get something running" and wire up the network around it
later. In practice this doesn't save a step — it adds one. A VM created in a default or
auto-generated VNet (Azure will create one for you if you don't specify a network, and AWS has a
default VPC in every region) has to be torn down and recreated once the real VNet/VPC and subnets
exist, because a running VM's network interface can't simply be moved from one VNet to another.
The "fast" path of deploying compute first turns into deploy, discover the network is wrong,
delete, redeploy — which is slower than planning and building the network correctly the first
time. This is why every cloud deployment runbook you'll see, Azure's or AWS's, documents the
network as phase one.

## Key terms

| Term | Meaning |
|---|---|
| Deployment order | The required sequence a cloud rollout follows: resource group → network → subnets → security rules → compute/storage |
| Hard dependency | A requirement that can't be worked around — here, compute/storage resources require a subnet to attach to at creation time |
| Default VNet / default VPC | The auto-created network Azure or AWS provides if you don't specify one — convenient for quick tests, wrong for production |
| Rework | Work that has to be redone because it was done out of order — e.g. tearing down a VM to move it to the correct VNet |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why can't a VM's network
interface simply be reassigned from one VNet to another after the VM is already running, and what
does that force you to do if you deployed compute before the network was ready?
