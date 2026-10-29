# Lesson 13 — Availability Zones, Regions, and the Failure Domains Between Them

**Chapter 4 · Resilience and Disaster Recovery · Lesson 13 of 32**

## What you'll learn

- The real physical hierarchy behind "the cloud": datacenter → Availability
  Zone → Region, and why each boundary exists
- What each level of redundancy actually protects you against — and,
  just as important, what it does **not**
- Why "we're deployed across three Availability Zones" is a true and
  valuable statement that still has nothing to do with disaster recovery
- How to read a deployment diagram and immediately know which failure
  domains it does and doesn't cover

## The failure domain hierarchy

Every major cloud — Azure, AWS, Google Cloud — is built on the same
physical shape, even though the marketing names differ slightly. At the
bottom is a **datacenter**: one physical building, with its own power
feed, its own cooling plant, and its own network uplinks. A datacenter
is a single failure domain for all of those things. If the power feed
trips, the cooling plant fails, or a fiber cut severs its network
uplink, everything in that building can go down together, no matter how
much redundant hardware is racked inside it.

An **Availability Zone (AZ)** is one or more datacenters, physically
separate from the datacenters backing any other AZ in the same region,
each with its own independent power, cooling, and network path, but
connected to the other AZs by high-bandwidth, low-latency private
links. That's the entire point of an AZ boundary: it's drawn specifically
so that a power or cooling failure in one AZ's datacenters has no
physical way to reach another AZ's datacenters. Azure and AWS both
publish this guarantee explicitly — it's not just "probably far enough
apart," it's an architectural promise.

A **Region** is a geographically distinct collection of Availability
Zones — usually three or more — separated from other regions by real
distance: hundreds of miles, sometimes an entire continent. Regions
exist as a failure domain boundary for things that can take out an
entire metro area at once: a regional power grid failure, a natural
disaster, a widespread fiber backbone outage, or a regulatory
requirement that data stay inside a specific country or jurisdiction.

## What each level actually protects against

This is the part that gets glossed over, and it's the one that matters
for this chapter. Each boundary protects against a different scale of
failure, and moving up a level doesn't automatically cover the levels
below it the way people assume:

- **Redundant hardware inside one datacenter** (multiple racks, multiple
  power supplies, multiple top-of-rack switches) protects against a
  single server, disk, or rack failing. It does nothing if the building
  itself loses power.
- **Deploying across multiple Availability Zones** protects against
  losing an entire datacenter — a cooling failure, a local power outage,
  a fire. It does nothing if the event is large enough to affect the
  whole region at once, because every AZ in a region can still share
  exposure to a true region-wide event.
- **Deploying across multiple Regions** protects against a region-wide
  event, and is the only architecture on this list that does.

A workload spread across three Availability Zones is **highly
available**. That is a real, meaningful, hard-won property, and it is
also not the same thing as **disaster recovery**. Multi-AZ assumes the
region itself stays up. The rest of this chapter — RTO and RPO, and the
active-active/active-passive patterns that implement them — only
becomes necessary once you're designing for the case where the region
doesn't stay up.

## Seeing the boundary in actual infrastructure

A Terraform configuration makes the AZ boundary concrete. Spreading an
Auto Scaling Group's instances across three subnets, each in a different
Availability Zone, is exactly how multi-AZ HA gets implemented:

```hcl
resource "aws_autoscaling_group" "app" {
  vpc_zone_identifier = [
    aws_subnet.az1.id,
    aws_subnet.az2.id,
    aws_subnet.az3.id,
  ]
  min_size         = 3
  desired_capacity = 3
  max_size         = 6
}
```

Notice what this configuration cannot do: every one of those subnets,
and every AZ they live in, is still inside a single region. If that
region has a region-wide failure, this Auto Scaling Group has no
capacity anywhere else to fail over to. That gap — and how you decide
whether it's worth closing — is exactly what Lessons 14 and 15 build on.

## Key terms

| Term | Meaning |
|---|---|
| Datacenter | One physical building with its own power, cooling, and network uplinks — the smallest failure domain |
| Availability Zone (AZ) | One or more physically separate datacenters within a region, each with independent power/cooling/network, linked to other AZs by low-latency connections |
| Region | A geographically distinct set of Availability Zones, separated from other regions by real distance |
| High availability (HA) | Resilience to datacenter-level failure, typically via multi-AZ deployment — assumes the region itself stays up |
| Disaster recovery (DR) | Resilience to region-level failure, which requires a second region, not just a second AZ |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
does deploying across three Availability Zones make a workload highly
available but say nothing about its disaster recovery posture, and
what specific scale of failure would it take to defeat a multi-AZ
design that a multi-region design would survive?
