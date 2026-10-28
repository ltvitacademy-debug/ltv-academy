# Lesson 13 — VPC Fundamentals and CIDR Planning

**Chapter 4 · AWS Networking: VPC · Lesson 13 of 32**

## What you'll learn

- What a VPC actually is, and why it's AWS's version of the isolated virtual network the prior
  Azure course called a VNet
- How to plan a CIDR block for a VPC before you create a single subnet
- Why every subnet you carve out of it loses 5 addresses to AWS, no matter how you size it
- Why a subnet lives in exactly one Availability Zone, and what that means for planning more
  than one

## A VPC: your own isolated slice of a region

A **VPC (Virtual Private Cloud)** is a logically isolated, customer-defined slice of private
address space inside an AWS Region — the same underlying idea the Azure course covered as a
VNet, just AWS's name and implementation for it. Nothing inside your VPC is reachable from
another customer's VPC, or even from a different VPC in your own account, unless you
deliberately connect them later in this course. Every AWS account also gets a **default VPC**
in every Region the first time you use it, already wired with a default subnet per
Availability Zone and an internet route — useful for quick experiments, but production
designs almost always build a custom VPC instead so the address space is planned on purpose.

```bash
aws ec2 create-vpc \
  --cidr-block 10.0.0.0/16 \
  --region us-east-1
```

`--cidr-block` is the entire address space this VPC will ever have, and AWS requires it to fall
somewhere between `/16` (about 65,000 addresses) and `/28` (16 addresses) for the VPC's primary
block. `10.0.0.0/16` is the conventional starting point for a single VPC — big enough to carve
into dozens of subnets without running out of room, small enough to plan by hand.

## Carving the VPC into subnets

A VPC by itself holds nothing — every EC2 instance, load balancer, and RDS database attaches to
a **subnet**, a smaller CIDR range cut out of the VPC's block:

```bash
aws ec2 create-subnet \
  --vpc-id vpc-0abc123456789def0 \
  --cidr-block 10.0.1.0/24 \
  --availability-zone us-east-1a

aws ec2 create-subnet \
  --vpc-id vpc-0abc123456789def0 \
  --cidr-block 10.0.2.0/24 \
  --availability-zone us-east-1b
```

Two details drive real CIDR planning here. First, a subnet's range has to fit entirely inside
the VPC's block and can't overlap any sibling subnet — AWS rejects the call if it does, so you
plan the split (`10.0.1.0/24`, `10.0.2.0/24`, `10.0.3.0/24`...) before you start creating
subnets, not after. Second, `--availability-zone` pins that subnet to exactly **one** AZ for its
entire life — a subnet never spans AZs. Designing for high availability means creating matching
subnets in at least two AZs (as above), not one large subnet and hoping AWS spreads it around.

## Every subnet loses 5 addresses to AWS

This is the detail that catches people sizing their first subnet: AWS reserves 5 IP addresses in
**every** subnet, regardless of size, for its own use.

```
Subnet 10.0.1.0/24 (256 addresses total):
  10.0.1.0   -> network address (reserved)
  10.0.1.1   -> VPC router (reserved)
  10.0.1.2   -> mapped to Amazon-provided DNS (reserved)
  10.0.1.3   -> reserved for future use
  10.0.1.255 -> broadcast address (not supported in a VPC, still reserved)
  -> 251 usable addresses for your resources
```

A `/24` barely notices losing 5 out of 256. A `/28` (16 addresses total) loses the same 5 and is
left with only 11 usable — worth remembering before sizing a small subnet for something like a
database tier that still needs room to grow.

## Key terms

| Term | Meaning |
|---|---|
| VPC | A customer-defined, isolated slice of private address space in one AWS Region — AWS's equivalent of an Azure VNet |
| CIDR block | The address range assigned to a VPC or subnet, e.g. `10.0.0.0/16` |
| Subnet | A smaller CIDR range carved out of a VPC's address space, pinned to exactly one Availability Zone |
| Reserved addresses | The 5 addresses (network, router, two for DNS/future use, broadcast) AWS takes from every subnet automatically |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why does a subnet's
Availability Zone get fixed at creation time, and what does that force you to do if you want a
design that survives one AZ going down?
