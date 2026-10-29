# Lesson 22 — Reserved Instances, Savings Plans, and Spot: The Real Tradeoffs

**Chapter 6 · Optimizing Cloud Spend Without Breaking Reliability · Lesson 2 of 4**

## What you'll learn

- What you're actually buying with a Reserved Instance / Azure
  Reservation versus a Savings Plan versus Spot capacity
- Why commitment discounts only pay off once you've right-sized first
  (Lesson 21), not before
- Which workloads belong on each pricing model, and which workloads
  belong on none of them
- Why Spot capacity's discount comes with a real interruption risk,
  and what "fault-tolerant" has to mean in practice before you use it

## Three different things you're buying, not three discount tiers

It's tempting to think of Reserved Instances, Savings Plans, and Spot
as "small discount, medium discount, big discount" on a single
sliding scale. They're not. Each one trades a different kind of
flexibility for a different kind of discount, and picking the wrong
one for a workload doesn't just leave savings on the table — it can
leave you paying for capacity you can't use, or running a workload
somewhere it can be shut down without warning.

### Reserved Instances / Azure Reservations — commitment, no interruption risk

A Reserved Instance (AWS) or an Azure Reservation is a commitment to
pay for a specific instance type (or instance family, with
convertible/flexible reservations) in a specific region for a 1-year
or 3-year term, in exchange for a meaningfully lower effective hourly
rate than on-demand. The capacity itself behaves exactly like on-demand
once it's running — there's no interruption risk, no eviction notice,
nothing operationally different about the VM itself. What you're
buying is a discount in exchange for certainty about what you'll run
and for how long.

This makes Reserved Instances / Reservations the right fit for the
**steady-state baseline** of your footprint: the VMs and instance types
that are running today, were running a year ago, and have no planned
retirement date. It's the wrong fit for anything you expect to resize,
replatform, or decommission inside the commitment term — a 3-year
reservation on a VM size you right-sized away from in month four is a
sunk cost, not a saving.

### Savings Plans — flexible compute commitment

A Savings Plan (AWS Compute Savings Plans, or the Azure equivalent
compute-commitment model) is also a 1- or 3-year commitment, but the
commitment is to a **dollar-per-hour spend on compute**, not to a
specific instance type or family. That dollar amount gets applied
automatically to whatever eligible compute you're running — a
different instance family, a different size, even a container or
serverless compute option in some cases — at a discount close to what
a matching Reserved Instance would get you.

The tradeoff: you give up a little bit of discount depth compared to
locking in the exact instance type, in exchange for not having to
predict exactly what you'll be running in year two of a three-year
term. For any organization still actively right-sizing, replatforming,
or migrating between instance families — which, if Lesson 21 did its
job, is most organizations most of the time — a Savings Plan is
usually the safer commitment than a narrow Reserved Instance, because
the discount survives the resize.

### Spot / Azure Spot VMs — deep discount, real interruption risk

Spot capacity (AWS Spot Instances, Azure Spot VMs) sells unused data
center capacity at a steep discount relative to on-demand — often the
deepest discount of the three models. The catch is real and
operationally significant: the cloud provider can reclaim that
capacity with very short notice (commonly on the order of two minutes)
whenever it's needed for on-demand or reserved customers. There is no
commitment on your side, but there's also no guarantee the instance
keeps running.

This makes Spot a fit only for workloads that are **genuinely
fault-tolerant** — not "probably fine," but architected so that losing
an individual instance mid-task is a normal, handled event rather than
an incident:

- Stateless batch processing where a job can checkpoint and resume, or
  simply restart, on a different instance
- Horizontally scaled worker pools behind a queue, where losing one
  worker just means the queue drains slightly slower
- CI/CD build agents, rendering farms, and other workloads where the
  unit of work is short and idempotent
- **Not** a fit: a stateful database primary, a single-instance
  application with no redundancy, anything where an abrupt two-minute
  eviction notice would mean a customer-facing outage

## Combining the three — and the order that actually works

In practice, a mature cost strategy blends all three, applied to
different slices of the same footprint:

1. **Right-size first** (Lesson 21). Buying a commitment discount on an
   oversized instance locks in the waste for the length of the term.
2. **Reserved Instances / Reservations** on the stable, long-lived
   baseline that isn't going to change shape.
3. **Savings Plans** on the compute that's real and steady in aggregate
   but shifts in shape — different instance types, autoscaled fleets,
   mixed workloads.
4. **Spot** on the portion of the fleet that's explicitly built to
   tolerate interruption, layered on top as additional capacity rather
   than as the only capacity for anything that must stay up.

Getting this order backwards — committing before right-sizing, or
putting a stateful, single-instance service on Spot because the
discount looked good — is how a cost optimization effort turns into a
reliability incident.

## Key terms

| Term | Meaning |
|---|---|
| Reserved Instance / Azure Reservation | A 1- or 3-year commitment to a specific instance type/family and region for a lower rate; zero interruption risk, zero flexibility if your usage shape changes |
| Savings Plan | A 1- or 3-year commitment to a dollar-per-hour compute spend, applied automatically across eligible instance types; trades a little discount depth for flexibility |
| Spot Instance / Azure Spot VM | Unused capacity sold at a deep discount with no uptime guarantee; the provider can reclaim it on short notice |
| Fault-tolerant workload | A workload designed so that losing an individual instance is a normal, handled event — the prerequisite for safely using Spot capacity |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
would locking in a 3-year Reserved Instance before right-sizing a
workload likely cost more than doing nothing at all, and what kind of
workload should never be the sole capacity behind a customer-facing
service on Spot?
