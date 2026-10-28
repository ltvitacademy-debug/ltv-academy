# Lesson 14 — Public vs. Private Subnets and Internet Gateways

**Chapter 4 · AWS Networking: VPC · Lesson 14 of 32**

## What you'll learn

- What actually makes a subnet "public" — it's a route, not a label you set
- What an Internet Gateway (IGW) is, and why it's the one component that turns on internet
  connectivity for a VPC at all
- Why a route to an IGW alone doesn't make an instance reachable — it still needs a public IP
- Why private subnets exist, and what kind of workload belongs in one

## There's no "public subnet" checkbox

Lesson 13 carved a VPC into subnets, but nothing about that process made any of them public or
private — AWS has no literal `--type public` flag. A subnet becomes **public** purely because
its route table sends internet-bound traffic (`0.0.0.0/0`) to an **Internet Gateway**. A
**private subnet** is simply one whose route table has no such route. The label lives entirely
in the routing, which is exactly why Lesson 15 covers route tables next — this lesson covers the
one component a route to the internet actually has to point at.

## The Internet Gateway: the on/off switch for internet access

An **Internet Gateway (IGW)** is a horizontally scaled, redundant, highly available VPC
component that AWS manages for you — there's no instance size to pick, no capacity to plan. It
does exactly two things: it's the target a route table points `0.0.0.0/0` traffic at, and it
performs the network address translation between an instance's private IP and its public IP.
A VPC has at most one IGW, and that IGW has to be explicitly attached before it does anything:

```bash
aws ec2 create-internet-gateway

aws ec2 attach-internet-gateway \
  --vpc-id vpc-0abc123456789def0 \
  --internet-gateway-id igw-0def456789abc123
```

Creating the IGW and attaching it to a VPC still doesn't make any subnet public on its own —
that happens in the next step, pointing a route table at it.

## Pointing a subnet's route table at the IGW

```bash
aws ec2 create-route \
  --route-table-id rtb-0abc123456789def0 \
  --destination-cidr-block 0.0.0.0/0 \
  --gateway-id igw-0def456789abc123
```

Once the subnet's route table has this route, it's a public subnet by definition. But a route is
only half of what's needed for an instance inside it to actually be reachable from the internet
— the instance also needs a **public IP address**, either auto-assigned at launch or attached
afterward as an Elastic IP. Without one, the instance can still *initiate* outbound connections
through the IGW, but nothing on the internet has an address to reach it at.

```bash
aws ec2 modify-subnet-attribute \
  --subnet-id subnet-0abc123456789def0 \
  --map-public-ip-on-launch
```

`--map-public-ip-on-launch` tells that subnet to assign every new instance a public IP
automatically, so you don't have to remember to request one by hand each time.

## Private subnets: where the backend lives

A **private subnet** has no route to an IGW at all, so nothing inside it is directly reachable
from the internet, and typically nothing inside it even has a public IP. That's exactly where a
real design puts an application tier or a database tier: instances that other instances in the
VPC need to talk to, but that the public internet should never reach directly. Lesson 15 covers
how those private-subnet instances still get *outbound* internet access — for OS patching, for
example — without ever becoming inbound-reachable.

## Key terms

| Term | Meaning |
|---|---|
| Internet Gateway (IGW) | A VPC component AWS manages that enables internet connectivity and performs NAT for instances with public IPs |
| Public subnet | A subnet whose route table sends `0.0.0.0/0` traffic to an Internet Gateway |
| Private subnet | A subnet with no route to an Internet Gateway — not directly reachable from the internet |
| Public IP / Elastic IP | The address an instance needs, in addition to a public route, to actually be reachable from the internet |

## Check yourself

A subnet's route table sends `0.0.0.0/0` to an Internet Gateway, but an instance inside it was
launched without a public IP. Can someone on the internet reach that instance directly? Why or
why not?
