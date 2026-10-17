# VPC & Subnet Planning Worksheet

A fill-in-the-blanks worksheet for planning a VPC before you touch the
console, built around this course's own Lesson 9 example. Answering
every row here first turns "click through the VPC wizard and hope" into
a deliberate design you can explain afterward.

## 1. The VPC itself

| Question | Your answer |
|---|---|
| CIDR block (e.g. `10.0.0.0/16`) | |
| Region | |
| How many Availability Zones will you spread across? (2 minimum for anything meant to stay up) | |

## 2. Subnet plan — fill one row per subnet

| Subnet name | CIDR (slice of the VPC range) | AZ | Public or private? | What lives here |
|---|---|---|---|---|
| example: `public-1a` | `10.0.1.0/24` | `us-east-1a` | Public | NAT gateway, bastion |
| example: `private-1a` | `10.0.2.0/24` | `us-east-1a` | Private | Glue job ENIs, RDS |
| example: `private-1b` | `10.0.3.0/24` | `us-east-1b` | Private | second-AZ redundancy |
| | | | | |
| | | | | |

**Rule of thumb from Lesson 9:** most of what a data pipeline actually
runs — a database, an internal processing job — belongs in a **private**
subnet, reachable only from inside the VPC. Reserve public subnets for
things that genuinely need a direct route to the internet.

## 3. What makes a subnet "public" — the actual check

A subnet is public only because of its **route table**, not a label.
Confirm this explicitly instead of assuming it:

```
[ ] Public subnet's route table sends 0.0.0.0/0 -> Internet Gateway
[ ] Private subnet's route table has NO route to 0.0.0.0/0
[ ] An Internet Gateway is attached to the VPC itself
```

## 4. Security layers — fill in what each one is actually for

| Layer | Stateful or stateless? | Attached to | What you're using it for here |
|---|---|---|---|
| Security group | Stateful | One resource (e.g. one EC2 instance) | |
| Network ACL | Stateless | One subnet | |

## 5. Before you build it — sanity checks

```
[ ] Does every private subnet have redundancy across at least 2 AZs?
[ ] Does anything in a public subnet actually need to be there, or
    could it move to private behind a NAT gateway instead?
[ ] Have you written down the CIDR ranges somewhere other than your
    memory, so a second subnet added later doesn't overlap?
```
