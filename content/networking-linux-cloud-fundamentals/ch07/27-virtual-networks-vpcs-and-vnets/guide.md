# Lesson 27 — Virtual Networks: VPCs and VNets

**Chapter 7 · Cloud Networking & Storage Concepts · Lesson 27 of 32**

## What you'll learn

- What a virtual network actually is, and why every cloud account needs one before anything else
- Why AWS calls it a VPC and Azure calls it a VNet, even though the underlying idea is the same
- How your private IP address space stays isolated from every other customer sharing the same physical hardware
- Why a virtual network is the foundation almost everything else in this chapter builds on top of

## A private network you define, inside someone else's data center

When you launch a server in the cloud, it doesn't just float out in the open internet. It lives
inside a **virtual network** — an isolated, software-defined slice of network space that you
create and control, even though the actual routers and switches underneath belong to the cloud
provider and are shared across thousands of customers. AWS calls this a **VPC** (Virtual Private
Cloud). Azure calls the same concept a **VNet** (Virtual Network). Different names, same job:
give you a private IP address range that nothing outside your account can see or touch unless you
explicitly allow it.

This is the thing every earlier chapter's networking concepts — IP addressing, subnetting, routing
— were building toward. A VPC or VNet is where you apply all of it, just inside a cloud provider's
infrastructure instead of on physical hardware you own.

## You define the address space

When you create a VPC or VNet, the first thing you choose is its IP address range, written in CIDR
notation — something like `10.0.0.0/16`, which gives you roughly 65,000 private addresses to work
with. That range is yours. The cloud provider doesn't assign it to anyone else, and your instances
inside it get private IP addresses drawn from that block, completely separate from any other
customer's VPC or VNet even if that customer picked the exact same `10.0.0.0/16` range for their
own network.

```
Your VPC:        10.0.0.0/16     (65,536 private addresses, yours alone)
Another customer's VPC: 10.0.0.0/16     (same range, totally separate — no collision)
```

That's the isolation guarantee: two completely unrelated companies can both use `10.0.0.0/16` and
never interfere with each other, because each VPC or VNet is its own walled-off network namespace.

## Isolated by default, connected on purpose

A brand-new VPC or VNet starts out isolated — nothing inside it can reach the public internet, and
nothing on the internet can reach in, until you deliberately configure a path. That's a deliberate
default: isolation is the safe starting point, and you open specific doors (an internet gateway, a
NAT gateway, a VPN connection, peering to another VPC/VNet) only for the traffic you actually need.
Chapter 8's end-to-end lab walks through building exactly that kind of path for a single Linux VM.

## Worked example: where your resources actually sit

```
AWS VPC: 10.0.0.0/16  "production-vpc"
  └─ holds EC2 instances, an RDS database, a load balancer —
     all assigned private IPs from the 10.0.0.0/16 range

Azure VNet: 10.0.0.0/16  "production-vnet"
  └─ holds Azure VMs, an Azure SQL instance, a load balancer —
     same idea, same math, different vendor's console
```

Whether you call it a VPC or a VNet, the resources you create afterward — virtual machines,
databases, load balancers — all get placed inside it and draw their private addresses from the
range you defined.

## Key terms

| Term | Meaning |
|---|---|
| VPC | AWS's name for a customer-defined, isolated virtual network with its own private IP range |
| VNet | Azure's name for the same concept — a customer-defined, isolated virtual network |
| Isolation | The guarantee that your VPC/VNet's private address space can't be seen or reached by other customers |
| CIDR block | The IP address range (e.g. `10.0.0.0/16`) you assign when you create a VPC or VNet |

## Check yourself

Two unrelated companies both create a VPC using the exact same address range, `10.0.0.0/16`. Why
doesn't this cause any conflict between them?
