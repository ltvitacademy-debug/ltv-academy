# Lesson 10 — AWS Pricing & Cost Management

**Chapter 2 · Core AWS Services Overview · Lesson 10 of 18**

## What you'll learn

- The pay-as-you-go model, and the dimensions AWS actually bills on
- What the AWS Free Tier does and doesn't cover
- Reserved Instances, Savings Plans, and Spot, as cost levers rather than performance choices
- The tools AWS gives you to see and control spend: Cost Explorer and Budgets

## Pay-as-you-go: billed on usage, not a seat count

AWS's core pricing model is **pay-as-you-go**: no upfront purchase,
no fixed monthly seat count — you're billed for what you actually
use, typically across three dimensions: **compute** (instance-hours,
Lambda invocations/duration), **storage** (GB stored per month, plus
request counts for services like S3), and **data transfer** (mostly
data leaving AWS to the internet — data transfer *into* AWS is
usually free). This is the flip side of elastic infrastructure: an
idle EC2 instance still costs money because it's still running, but
an S3 bucket with nothing in it costs essentially nothing.

```
Compute:        instance-hours, Lambda invocations + duration
Storage:        GB stored per month, per-request fees
Data transfer:  mostly OUT to the internet — inbound is usually free
```

## The Free Tier: real, but bounded

The **AWS Free Tier** gives new accounts a set of usage allowances at
no cost, split into three kinds: **12-months-free** (a capped amount
of usage, like 750 hours/month of a `t2.micro` or `t3.micro`
instance, free for the account's first year), **always-free** (a
smaller allowance, like 1 million Lambda requests/month, that never
expires), and short **trials** for specific services. It's genuinely
useful for learning and small experiments, but it's bounded — exceed
the allowance, or use a service the Free Tier doesn't cover, and
normal pay-as-you-go billing applies immediately, with no warning
popup stopping you.

## Reserved Instances, Savings Plans, and Spot: buying the same thing cheaper

None of these change what you're running — they change how much you
pay for it, by trading flexibility for discount:

```
On-Demand:          no commitment, highest price, full flexibility
Reserved / Savings   commit to steady usage for 1-3 years,
  Plans:              meaningful discount (up to ~70% off On-Demand)
Spot:                bid on spare capacity, steepest discount,
                      AWS can reclaim it on short notice
```

**Reserved Instances** commit to a specific instance configuration;
**Savings Plans** commit to a dollar amount of usage instead, which
is more flexible across instance types. **Spot Instances** are the
deepest discount available, appropriate for fault-tolerant or
flexible workloads (batch processing, some data pipeline jobs) that
can handle being interrupted and resumed.

## Seeing and controlling what you're spending

**Cost Explorer** visualizes historical and forecasted spend, broken
down by service, Region, or tag, so you can actually see where money
is going instead of guessing from the invoice total. **AWS Budgets**
lets you set a spending threshold and get alerted (or, with more
setup, take automated action) when actual or forecasted spend
crosses it — the practical guardrail against "I forgot to shut that
down" turning into a surprise bill.

## Key terms

| Term | Meaning |
|---|---|
| Pay-as-you-go | AWS's default pricing model: billed for actual usage, no fixed seat count |
| Free Tier | Bounded no-cost usage allowances for new/all AWS accounts |
| Reserved Instance / Savings Plan | A 1-3 year usage commitment traded for a meaningful discount |
| Spot Instance | Spare AWS capacity at steep discount, reclaimable on short notice |
| Cost Explorer | The console tool for visualizing historical and forecasted AWS spend |
| AWS Budgets | The console tool for setting spend thresholds and alerts |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking:
why does an idle EC2 instance still cost money while an empty S3
bucket essentially doesn't — what does that say about how AWS bills
compute versus storage?
