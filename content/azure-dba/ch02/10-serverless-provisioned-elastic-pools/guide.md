# Lesson 10 — Serverless, Provisioned Compute & Elastic Pools

**Chapter 2 · Deploying Azure SQL · Lesson 10 of 95**

## What you'll learn

- Provisioned compute: fixed capacity, billed whether busy or idle
- Serverless compute: auto-pause, auto-scale, billed per second of actual use
- Elastic pools: sharing compute across many databases with unpredictable usage
- Which of the three actually fits a given workload shape, and why

## Provisioned: fixed, predictable, always-on

**Provisioned compute** is what Lesson 7's CLI example created —
a fixed number of vCores (or a fixed DTU count) that's yours all
the time, billed whether the database is busy or completely idle.
It's the right default for any workload with steady, predictable
usage, because "predictable" is exactly what fixed capacity is
good at pricing correctly. It's the wrong choice for a database
that sits idle most of the day and spikes occasionally — that shape
is what serverless exists for.

## Serverless: auto-pause, auto-scale, pay per second

**Serverless compute** (vCore model, General Purpose tier only in
most regions — Lesson 8) automatically scales vCores up and down
within a configured min/max range based on load, and can fully
**auto-pause** the database after a configurable period of
inactivity — during which you pay only for storage, not compute at
all. The tradeoff is a cold-start delay when a paused database
receives its first connection again, typically a handful of seconds.
For dev/test databases, low-traffic internal tools, or genuinely
spiky workloads, that delay is a reasonable price for not paying for
idle compute 24/7.

## Elastic pools: sharing compute across many databases

**Elastic pools** solve a different problem entirely: not one
database's usage pattern, but *many* databases that each spike at
different, unpredictable times. Instead of provisioning peak
capacity for every database individually — expensive, since most of
that capacity sits unused most of the time — an elastic pool gives a
shared compute/storage budget (measured in eDTUs or pool vCores)
that all member databases draw from as needed.

![Creating an Azure SQL elastic pool in the Azure Portal, showing the pool's configuration options.](/courses/azure-dba/ch02/10-serverless-provisioned-elastic-pools/show-options-create-sql-elastic-pool.png)

This is a real Azure Portal screenshot of the elastic pool creation
flow — the same "configure pool size, then add databases to it"
pattern you'd click through yourself. A SaaS vendor running one
database per customer tenant is the textbook elastic pool use case:
a handful of tenants spike during their business hours while most
sit quiet, and the pool absorbs that variance instead of every
tenant's database being sized for its own worst case.

## Choosing between the three

```
Steady, predictable load on one database?
  -> Provisioned compute

Spiky or intermittent load on one database, dev/test,
willing to accept a cold-start delay?
  -> Serverless compute (General Purpose only, most regions)

Many databases, each with unpredictable individual spikes,
that rarely all spike at once?
  -> Elastic pool
```

## Key terms

| Term | Meaning |
|---|---|
| Provisioned compute | Fixed vCores/DTUs, billed whether busy or idle |
| Serverless compute | Auto-scales and auto-pauses; billed per second of actual use |
| Elastic pool | Shared compute/storage budget across many databases with uncorrelated spikes |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking:
why would a SaaS vendor with 200 tenant databases prefer one elastic
pool over 200 individually provisioned databases sized for their
own peak usage?
