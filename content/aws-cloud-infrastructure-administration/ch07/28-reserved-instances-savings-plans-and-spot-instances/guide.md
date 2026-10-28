# Lesson 28 — Reserved Instances, Savings Plans, and Spot Instances

**Chapter 7 · AWS Cost Management · Lesson 28 of 32**

## What you'll learn

- What On-Demand pricing actually buys you, and why it's the most expensive per-hour rate
- How Reserved Instances and Savings Plans trade a commitment for a discount, and how they differ from each other
- Why Spot Instances are so cheap, and the real tradeoff — AWS can reclaim them with short notice
- A concrete example of matching each pricing model to the right kind of workload

## On-Demand: paying for zero commitment

**On-Demand** is the default EC2 pricing model used throughout this course so
far: pay by the hour (or second) for exactly what's running, with no upfront
payment and no commitment to keep it running. That flexibility is also why
it's the **most expensive per-hour rate** available — AWS prices in the fact
that you can stop paying the instant you stop needing it. On-Demand is the
right default for anything unpredictable: a workload that might not exist
next month shouldn't be paid for as if it will.

## Reserved Instances and Savings Plans: commitment for a discount

A **Reserved Instance (RI)** is a 1-year or 3-year commitment to a specific
instance family in a specific Region, in exchange for a significant discount
off the On-Demand rate — often 40-60%, more with a 3-year all-upfront
commitment. A **Savings Plan** is a newer, more flexible alternative: instead
of committing to a specific instance family, you commit to a dollar-per-hour
spend for 1 or 3 years, and the discount applies automatically to usage
across instance families, sizes, and even Regions (for a Compute Savings
Plan). Both trade flexibility for a lower rate; Savings Plans trade less
flexibility for a similar discount, which is why AWS now generally
recommends them over RIs for new commitments.

## Spot Instances: steep discounts, short notice

A **Spot Instance** runs on spare EC2 capacity AWS isn't currently using,
priced at a steep discount off On-Demand — commonly 60-90% cheaper. The
real tradeoff: AWS can **reclaim a Spot Instance with a two-minute warning**
whenever it needs that capacity back for an On-Demand or Reserved customer.
That makes Spot a poor fit for anything that can't tolerate an abrupt stop,
and an excellent fit for workloads that can — batch processing, big data
jobs, and anything else that can checkpoint progress or simply get queued
again on another instance.

## Example: matching the model to the workload

A company runs three kinds of EC2 workloads. A production database that
must never unexpectedly stop: **Reserved Instance or Savings Plan**, since
the usage is steady and predictable enough to commit to. A fleet of web
servers that autoscales up and down with unpredictable traffic: **On-Demand**
for the variable part, often layered with a Savings Plan covering the steady
baseline. A nightly batch job that reprocesses a day's data and can simply
restart if interrupted: **Spot Instances**, because the steep discount is
worth the small risk of a reclaim notice on a job that tolerates one.

## Key terms

| Term | Meaning |
|---|---|
| On-Demand | Pay-by-the-hour EC2 pricing with no commitment — the most expensive rate, the most flexible |
| Reserved Instance (RI) | A 1- or 3-year commitment to a specific instance family/Region for a significant discount |
| Savings Plan | A flexible 1- or 3-year dollar-per-hour spend commitment, discounted across instance families and sizes |
| Spot Instance | Spare EC2 capacity at a steep discount, reclaimable by AWS with a short notice period |

## Check yourself

You're ready for Chapter 8 when you can explain, without looking: why would
a batch job that can tolerate interruption be a good fit for Spot Instances,
while a production database would not?
