# Lesson 25 — Capacity Planning When GPUs Are Genuinely Scarce

**Chapter 7 · Scaling and Reliability for AI Infrastructure · Lesson 1 of 4**

## What you'll learn

- Why GPU capacity planning is a genuinely different problem from
  CPU capacity planning — the difference between "autoscale and pay
  more" and "the capacity you asked for simply isn't there"
- How quota limits and regional allocation actually constrain which
  GPU SKUs you can get, and why that forces planning weeks or months
  ahead instead of minutes ahead
- What reserved and pre-booked capacity (Azure On-Demand Capacity
  Reservations, AWS Capacity Blocks for ML) trade away in exchange
  for a guarantee
- How to build a fallback hierarchy so a capacity shortfall degrades
  a workload instead of failing it outright

## Why this isn't ordinary capacity planning

Earlier in this path, capacity planning for a web tier or a database
meant watching utilization trends and trusting that the next size up
would be available on demand — clouds carry enormous headroom in
general-purpose compute, so "scale out" almost always succeeds.
High-demand GPU SKUs break that assumption. A specific accelerator
family in a specific region is a physically constrained resource: the
cloud provider only has so many of that chip racked, powered, and
networked in that data center at any given time. When demand for that
SKU is high, "request more" can fail outright — not a slow scale-up,
an **allocation failure** — with no amount of money fixing it in the
next five minutes. Planning has to move from reactive to anticipatory.

## Quotas are the first wall you hit

Both Azure and AWS cap how many GPU cores or instances of a given
family your subscription or account can provision in a region by
default, independent of whether physical capacity exists at all. That
quota exists to prevent runaway spend and to let the provider manage
allocation across customers — but it means your first blocker is
often your own account's limit, not the data center's. Raising it is
a request, not a toggle:

```
# Azure: check your current GPU quota in a region
az vm list-usage --location eastus \
  --query "[?contains(name.value, 'StandardNCADSA100v4Family')]"

# AWS: check a Service Quotas request for a GPU instance type
aws service-quotas get-service-quota \
  --service-code ec2 \
  --quota-code L-417A185B   # Running On-Demand P instances
```

Submitting a quota increase request doesn't guarantee an immediate
answer, and it certainly doesn't guarantee the underlying hardware is
sitting there waiting once it's approved. Build quota requests into
your project timeline the same way you'd budget lead time for any
other long-lead procurement — well before the training run or launch
date that depends on it, not the week of.

## Reserved and pre-booked capacity

Once you know you need a GPU family at a predictable time, you can
trade flexibility for a guarantee instead of hoping the on-demand pool
has room:

- **Azure On-Demand Capacity Reservations** let you reserve specific
  VM sizes in a specific zone ahead of time; you pay for the
  reservation whether or not you're actively running on it, in
  exchange for Azure holding that capacity for you.
- **AWS Capacity Blocks for ML** reserve a cluster of GPU instances
  for a defined future time window — purpose-built for a known
  training run rather than indefinite standing capacity.
- Both are the GPU-era equivalent of what reserved instances already
  do for cost on general-purpose compute, except the primary thing
  being purchased here is *availability*, not just a price break.

Reservations make the most sense for predictable, large-scale demand
you can forecast — a quarter's training roadmap, a launch date you've
already committed to — not for every GPU need in the business.

## Forecast, request, reserve, and build a fallback

A workable capacity-planning cycle for GPU-heavy teams has four real
steps: forecast GPU-hour demand from the training and inference
roadmap further ahead than feels natural; file quota increase
requests against that forecast with real lead time; reserve capacity
for the runs that are large, time-boxed, and already committed to;
and, critically, design a **fallback hierarchy** for everything else —
a preferred SKU, a next-best SKU in the same or a different region,
and, where the workload tolerates it, a degraded CPU-only path rather
than an outright failure. That last tier is what turns "we couldn't
get the GPU we wanted" from an incident into a documented, planned-for
degradation.

## Key terms

| Term | Meaning |
|---|---|
| Allocation failure | A provisioning request that fails because the specific SKU isn't physically available in that region, independent of quota or budget |
| Quota | A per-subscription/account ceiling on how many instances of a resource family can be provisioned in a region, raised by request |
| Capacity reservation | A pre-booked guarantee of specific VM capacity (Azure Capacity Reservations, AWS Capacity Blocks for ML), paid for whether or not it's in active use |
| Fallback hierarchy | A planned sequence of next-best options (alternate SKU, alternate region, degraded mode) a workload falls back through instead of failing outright |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
can a GPU "scale-up" request fail in a way a general-purpose VM
scale-up almost never does, and what's the practical difference
between raising a quota and holding a capacity reservation?
