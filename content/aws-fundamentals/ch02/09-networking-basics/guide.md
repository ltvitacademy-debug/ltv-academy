# Lesson 9 — Networking Basics: VPC

**Chapter 2 · Core AWS Services Overview · Lesson 9 of 18**

## What you'll learn

- What a VPC is, and why almost everything you run in AWS lives inside one
- Subnets, and the public/private distinction
- How traffic actually gets in and out through an Internet Gateway and route tables
- The difference between security groups and network ACLs

## A VPC is your own private network inside AWS

A **VPC (Virtual Private Cloud)** is an isolated, private network you
define inside an AWS Region — your own address space, carved up
however you choose, that other AWS customers' traffic never crosses
into. Every AWS account gets a **default VPC** in each Region to get
started quickly, but real production setups almost always define
their own. A VPC is created with a **CIDR block** — a range of IP
addresses like `10.0.0.0/16` — that everything inside it draws its
addresses from.

```
VPC: 10.0.0.0/16   (an isolated network inside one Region)
  ├─ Public subnet:  10.0.1.0/24   (us-east-1a)
  ├─ Private subnet: 10.0.2.0/24   (us-east-1a)
  └─ Private subnet: 10.0.3.0/24   (us-east-1b)
```

## Subnets: carving the VPC up, one AZ at a time

A **subnet** is a slice of the VPC's address range, and — unlike the
VPC itself, which spans a whole Region — each subnet lives in exactly
one Availability Zone. Subnets are typically split into two kinds:
**public subnets**, which have a route out to the internet, and
**private subnets**, which don't. A public-facing web server or a NAT
gateway might sit in a public subnet; a database or an internal
processing job — including most of what a data pipeline actually
runs — typically sits in a private subnet, reachable only from inside
the VPC.

## Getting traffic in and out: Internet Gateways and route tables

What makes a subnet "public" isn't a label — it's its **route
table**. An **Internet Gateway** is attached to the VPC to allow
traffic to and from the public internet at all, and a subnet is
"public" specifically because its route table sends internet-bound
traffic (`0.0.0.0/0`) to that Internet Gateway. A private subnet's
route table has no such route — nothing in it can reach the internet
directly, though it can still reach other resources inside the VPC.

```
Public subnet route table:        Private subnet route table:
  10.0.0.0/16 -> local               10.0.0.0/16 -> local
  0.0.0.0/0   -> Internet Gateway    (no route to the internet)
```

## Security groups vs. network ACLs

Two layers control traffic within a VPC. A **security group** is a
stateful firewall attached to individual resources (like an EC2
instance) — if you allow inbound traffic on a port, the matching
outbound response is automatically allowed too. A **network ACL
(NACL)** operates at the subnet level instead, is stateless (inbound
and outbound rules are evaluated independently), and is typically
used more sparingly, as a coarser, subnet-wide backstop rather than
the primary control.

## Key terms

| Term | Meaning |
|---|---|
| VPC | An isolated, private network you define inside an AWS Region |
| Subnet | A slice of a VPC's address range, confined to one Availability Zone |
| Internet Gateway | The component attached to a VPC that allows internet traffic in and out |
| Security group | A stateful, resource-level firewall |
| Network ACL (NACL) | A stateless, subnet-level firewall |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking:
what specifically makes a subnet "public" versus "private" — is it a
setting on the subnet itself, or something else?
