# Lesson 2 — AWS Global Infrastructure: Regions & Availability Zones

**Chapter 1 · Cloud & AWS Concepts · Lesson 2 of 18**

## What you'll learn

- What a Region is, and how AWS names them
- What an Availability Zone (AZ) is, and why real workloads spread across more than one
- How Edge Locations differ from Regions and AZs
- What actually factors into choosing a Region for a workload

## Regions: where AWS physically runs

An **AWS Region** is a geographic area containing a cluster of AWS data
centers — `us-east-1` (N. Virginia), `us-west-2` (Oregon), `eu-west-1`
(Ireland), `ap-southeast-1` (Singapore), and more than 30 others
worldwide. Each Region is a fully independent, isolated deployment of
AWS: a failure or outage in one Region doesn't cascade into another,
and most resources you create (an S3 bucket, an EC2 instance) live in
exactly one Region unless you deliberately replicate them.

Choosing a Region for a workload usually comes down to three things:
latency to your users (pick the Region closest to them), data
residency or compliance requirements (some data legally has to stay
in a specific country), and service or pricing availability (not
every AWS service launches in every Region on day one, and prices
vary slightly by Region).

## Availability Zones: the isolation inside a Region

Every Region is made of multiple **Availability Zones (AZs)** —
usually three or more physically separate data centers, each with its
own power, cooling, and networking, connected to the other AZs in the
Region by low-latency private links. AZs are named after their
Region: `us-east-1a`, `us-east-1b`, `us-east-1c`.

```
us-east-1 (N. Virginia) Region
  ├─ us-east-1a   Availability Zone
  ├─ us-east-1b   Availability Zone
  ├─ us-east-1c   Availability Zone
  └─ us-east-1d   Availability Zone

Each AZ: independent power, cooling, and network —
a problem in one shouldn't take down another.
```

This is why production workloads get spread across multiple AZs, not
left in one: if `us-east-1a` has a hardware or power problem, an
application running only there goes down, while the same application
running across `1a` and `1b` keeps serving traffic from `1b`. One
subtlety worth knowing: the letter AWS shows you (`1a`, `1b`) is
randomized per AWS account to spread load evenly across the real
physical AZs — your account's `us-east-1a` isn't necessarily the same
physical building as another account's `us-east-1a`. For anything
that needs to line up across accounts, AWS also exposes a stable
**AZ ID** (like `use1-az1`).

## Edge Locations: the network's front door

Separate from Regions and AZs, AWS also operates **Edge Locations** —
smaller sites, far more numerous than Regions (in the hundreds), used
by services like CloudFront (content delivery) and Route 53 (DNS) to
cache content and respond to requests physically closer to end users.
An Edge Location isn't a small Region — it doesn't run EC2 instances
or most AWS services, it exists purely to shorten the network path
between a user and cached content or a DNS answer.

## Key terms

| Term | Meaning |
|---|---|
| Region | An independent, isolated geographic AWS deployment (e.g. `us-east-1`) |
| Availability Zone (AZ) | One of several isolated data centers inside a Region, each with independent power/cooling/network |
| Edge Location | A smaller site used by CloudFront/Route 53 to serve cached content or DNS closer to users |
| AZ ID | A stable identifier for a physical AZ that stays consistent across AWS accounts |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does AWS deploy production workloads across multiple Availability
Zones within a Region instead of just one — what specifically does
that protect against?
