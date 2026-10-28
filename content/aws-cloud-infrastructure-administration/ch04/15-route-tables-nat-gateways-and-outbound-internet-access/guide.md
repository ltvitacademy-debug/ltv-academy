# Lesson 15 — Route Tables, NAT Gateways, and Outbound Internet Access

**Chapter 4 · AWS Networking: VPC · Lesson 15 of 32**

## What you'll learn

- What a route table actually contains, and how it's associated with a subnet
- Why every route table ships with one route you didn't write and can't delete
- What a NAT Gateway is, and how it gives a private subnet outbound internet access without
  making it reachable
- How to read a worked route table entry for a NAT-routed private subnet

## A route table: destination plus target, nothing more

A **route table** is a set of rules — **routes** — that decide where traffic leaving a subnet
goes next. Every route is just two fields: a **destination** CIDR block and a **target** (where
matching traffic gets sent). Every VPC gets one **main route table** automatically; any subnet
you don't explicitly associate with a different table uses the main one. For real designs, you
typically create a separate custom route table per subnet tier — one for public subnets, one
for private — and associate each subnet explicitly:

```bash
aws ec2 create-route-table --vpc-id vpc-0abc123456789def0

aws ec2 associate-route-table \
  --subnet-id subnet-0abc123456789def0 \
  --route-table-id rtb-0private12345678
```

A subnet can only be associated with one route table at a time, but the same route table can be
associated with several subnets that should all route the same way.

## The one route you didn't write

Every route table, the moment it's created, already contains a **local route** for the VPC's
own CIDR block — it's what lets every subnet in the VPC talk to every other subnet by default.
You can't edit or delete it:

```
Destination        Target
10.0.0.0/16         local
```

Everything you add after that — a route to an Internet Gateway, a NAT Gateway, a peering
connection — sits alongside this one, never replacing it.

## NAT Gateway: outbound only, by design

Lesson 14 covered subnets with no route to an Internet Gateway at all — truly private, with no
internet access in either direction. Often that's too strict: a private-subnet instance still
needs to pull OS patches or hit an external API, even though nothing on the internet should ever
be able to initiate a connection *into* it. A **NAT Gateway** solves exactly that: it lets
instances in a private subnet start outbound connections to the internet, while remaining
completely unreachable from the internet side, because a NAT Gateway never accepts
unsolicited inbound connections — only traffic that's a response to something the private
instance started.

A NAT Gateway is AWS-managed and highly available within the single AZ you place it in (for
multi-AZ resilience, you create one NAT Gateway per AZ, each in that AZ's public subnet). It
needs an Elastic IP and must live in a **public subnet** — not the private subnet it serves:

```bash
aws ec2 allocate-address --domain vpc

aws ec2 create-nat-gateway \
  --subnet-id subnet-0public123456789 \
  --allocation-id eipalloc-0abc123456789def0
```

## Worked example: the private subnet's route table

With the NAT Gateway created, the private subnet's route table gets a default route pointing at
it instead of at an Internet Gateway:

```bash
aws ec2 create-route \
  --route-table-id rtb-0private12345678 \
  --destination-cidr-block 0.0.0.0/0 \
  --nat-gateway-id nat-0abc123456789def0
```

```
Destination        Target
10.0.0.0/16         local
0.0.0.0/0           nat-0abc123456789def0
```

Compare that to the public subnet's table from Lesson 14, where `0.0.0.0/0` pointed to `igw-...`
instead. Same shape, different target — and that one target is the entire difference between a
subnet that's reachable from the internet and one that can only reach out to it.

## Key terms

| Term | Meaning |
|---|---|
| Route table | A set of destination/target rules deciding where a subnet's traffic goes |
| Local route | The automatic, undeletable route for the VPC's own CIDR, present in every route table |
| NAT Gateway | An AWS-managed gateway, placed in a public subnet, that gives private-subnet instances outbound-only internet access |
| Route table association | The link between a subnet and the one route table it uses; a table can serve multiple subnets |

## Check yourself

A private subnet's route table sends `0.0.0.0/0` to a NAT Gateway. Can an instance in that
subnet download a security patch from the internet? Can a server on the internet open a new
connection into that instance? Why the different answers?
