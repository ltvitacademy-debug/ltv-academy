# Lesson 8 — Azure Networking Basics: VNets

**Chapter 2 · Core Azure Services · Lesson 8 of 18**

## What you'll learn

- What a **Virtual Network (VNet)** actually is
- **Subnets** — dividing a VNet into smaller segments
- Why resources inside the same VNet can talk to each other privately
- Why isolation, not just connectivity, is the point of a VNet

## Your own private network inside Azure

A **Virtual Network (VNet)** is your own private, isolated network
inside Azure — the cloud equivalent of the network you'd build inside
an office, except Microsoft provides the underlying physical
infrastructure and you define the logical network on top of it. When
you create resources like VMs inside a VNet, they get private IP
addresses within that network, and by default nothing outside the
VNet can reach them directly.

## Subnets — dividing a VNet into segments

A VNet is usually divided into **subnets** — smaller segments within
it, each with its own range of IP addresses. A common pattern is
separating resources by role: a subnet for web servers, a subnet for
a database tier, a subnet for anything that shouldn't be reachable
from the public internet at all. Subnets let you apply different
network rules to different parts of your infrastructure, instead of
treating the entire VNet as one flat, undifferentiated space.

```
Virtual Network (VNet): 10.0.0.0/16
┌───────────────────────────────────────────┐
│  Subnet: web        Subnet: app     Subnet: data │
│  10.0.1.0/24         10.0.2.0/24     10.0.3.0/24  │
│  (public-facing)     (internal)      (no internet) │
└───────────────────────────────────────────┘
   Resources in the same VNet can talk to each other privately.
```

## Why same-VNet resources talk to each other privately

Resources inside the same VNet (or connected VNets) can communicate
with each other using their private IP addresses, without that
traffic ever going out over the public internet. This matters for two
real reasons: it's faster (no round trip out and back through public
infrastructure), and it's more secure (traffic between, say, a web
server and its database never has to be exposed to the internet at
all just so the two can talk to each other).

## Isolation is the actual point

The most important thing a VNet gives you isn't connectivity — it's
**isolation**. By default, a VNet is its own private space; nothing
gets in from outside unless you explicitly allow it (through rules
covered in more depth in a networking-focused course later in this
catalog, if you continue). That default-closed posture is what makes
a VNet meaningfully different from just "some VMs on the internet" —
it's a boundary you control, not an accident of however Azure happened
to assign IP addresses.

## Key terms

| Term | Meaning |
|---|---|
| Virtual Network (VNet) | Your own private, isolated network inside Azure |
| Subnet | A smaller IP address range within a VNet, often used to separate resources by role |
| Private IP address | An address reachable only within the VNet, not from the public internet |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why
is a database server placed in its own subnet inside a VNet more
secure than one directly reachable from the public internet, even
before any specific firewall rule is configured?
