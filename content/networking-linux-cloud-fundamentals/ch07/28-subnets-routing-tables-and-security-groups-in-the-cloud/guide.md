# Lesson 28 — Subnets, Routing Tables & Security Groups in the Cloud

**Chapter 7 · Cloud Networking & Storage Concepts · Lesson 28 of 32**

## What you'll learn

- How a VPC or VNet gets carved into smaller subnets, and why public and private subnets exist
- What a route table actually controls, and why a route to an internet gateway is what makes a subnet "public"
- The difference between a security group (stateful, attached to a resource) and a network ACL (stateless, attached to a subnet)
- What Azure calls its own version of a security group

## Carving the VPC/VNet into subnets

A VPC or VNet on its own is just one big address range. In practice you break it into smaller
**subnets** — the same subnetting math from Chapter 1, just applied inside the cloud instead of
on physical hardware. A common pattern splits a `10.0.0.0/16` VPC into a handful of smaller
blocks:

```
10.0.1.0/24  -> public subnet   (load balancer, bastion host)
10.0.2.0/24  -> private subnet  (application servers)
10.0.3.0/24  -> private subnet  (database layer)
```

"Public" and "private" here aren't a built-in label the cloud provider enforces — they're a
description of what the subnet's route table actually allows, which is the next piece.

## Route tables: where traffic actually goes

A **route table** is a set of rules that decides where traffic leaving a subnet gets sent next.
Every subnet is associated with a route table, and the rule that matters most is whether that
table has a route pointing to an **internet gateway** — the component that lets traffic reach the
public internet at all.

```
Public subnet's route table:
  10.0.0.0/16  -> local                (stay inside the VPC)
  0.0.0.0/0    -> internet gateway     (everything else goes to the internet)

Private subnet's route table:
  10.0.0.0/16  -> local                (stay inside the VPC)
  (no route to an internet gateway — nothing leaves directly)
```

That's the actual definition of a "public" subnet: its route table sends unmatched traffic
(`0.0.0.0/0`) to an internet gateway. A private subnet simply has no such route, so nothing inside
it can reach the internet directly — which is exactly where you'd put a database that should never
be exposed.

## Security groups: stateful, attached to the resource

A **security group** is a firewall attached directly to a resource, like an EC2 instance — not to
the subnet it sits in. It's **stateful**, meaning if you allow inbound traffic on a connection,
the matching outbound reply is automatically allowed back out without needing a separate rule.

```
Security group "web-servers":
  Inbound:  allow TCP 443 from 0.0.0.0/0   (HTTPS, from anywhere)
  Inbound:  allow TCP 22  from 10.0.0.0/16 (SSH, only from inside the VPC)
  Outbound: allow all                      (replies to allowed inbound traffic flow automatically)
```

## Network ACLs: stateless, attached to the subnet

A **network ACL** (NACL) is AWS's other layer of filtering — attached to the subnet itself rather
than to an individual resource, and **stateless**: inbound and outbound rules are evaluated
completely independently, so allowing inbound traffic does not automatically allow the matching
outbound reply. You have to write both directions explicitly. NACLs also evaluate rules in numbered
order and can explicitly deny traffic, which security groups can't do (a security group can only
allow — anything not explicitly allowed is simply dropped).

Azure's equivalent of a security group is the **Network Security Group (NSG)** — same stateful,
attached-to-the-resource-or-subnet model, just under a different name and with slightly different
default rules.

## Key terms

| Term | Meaning |
|---|---|
| Subnet | A smaller address range carved out of a VPC/VNet's overall CIDR block |
| Route table | Rules that decide where traffic leaving a subnet is sent next |
| Security group | A stateful firewall attached to a resource — allow rules only, matching replies flow automatically |
| Network ACL (NACL) | A stateless firewall attached to a subnet — rules apply to inbound and outbound separately, can explicitly deny |

## Check yourself

A subnet's route table has no route to an internet gateway. What does that make the subnet, and
what kind of resource would you typically place inside it?
