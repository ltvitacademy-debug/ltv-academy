# Lesson 7 — EC2 Instance Types and Choosing the Right Family

**Chapter 2 · AWS Compute: EC2 · Lesson 7 of 32**

## What you'll learn

- How to read an EC2 instance type name like `t3.micro` or `m5.large` — what
  each part actually tells you
- What the four most common family letters (`t`, `m`, `c`, `r`) mean in
  real hardware terms
- How to pick a family based on the workload, not out of habit
- How to check what's actually available with `describe-instance-types`

## Reading an instance type name

An EC2 instance type name like `m5.large` or `c6g.xlarge` isn't arbitrary —
it's structured:

- **Family letter** (`m`, `c`, `t`, `r`, …) — what the hardware is optimized
  for
- **Generation number** (`5`, `6`, …) — which generation of AWS hardware;
  higher is newer and usually better price-performance
- **Optional capability letter** (`g` for AWS Graviton/ARM processors,
  `a` for AMD processors, `n` for enhanced networking) — present when the
  instance uses something other than the standard Intel chip
- **Size** (`micro`, `small`, `medium`, `large`, `xlarge`, `2xlarge`, …) —
  how much of that family's hardware profile you get; doubling the size
  roughly doubles vCPU and memory

`c6g.xlarge`, read in order: compute-optimized, 6th generation, Graviton
(ARM) processor, xlarge size.

## The four families to know first

- **T-series — burstable, general purpose.** `t3.micro`, `t3.small`.
  Baseline CPU performance with **CPU credits** that accumulate while idle
  and get spent to burst above baseline for short periods. The cheapest way
  to run something with low, spiky load. Fits dev/test boxes, small
  internal tools, and low-traffic web servers — but a T-series instance
  running sustained high CPU will exhaust its credit balance and get
  throttled back to baseline.
- **M-series — general purpose, balanced.** `m5.large`, `m6i.xlarge`. A
  steady, balanced ratio of vCPU to memory with no bursting behavior —
  consistent performance all the time. The default choice for most
  production application servers and small-to-medium databases when you
  don't have a reason to pick something more specialized.
- **C-series — compute-optimized.** `c5.xlarge`, `c6g.2xlarge`. A high
  vCPU-to-memory ratio: more raw processing power per GB of RAM than
  M-series. Fits CPU-bound workloads — batch processing, video encoding,
  high-traffic web servers, scientific modeling — where memory isn't the
  bottleneck.
- **R-series — memory-optimized.** `r5.xlarge`, `r6g.2xlarge`. A high
  memory-to-vCPU ratio. Fits in-memory caches, large relational databases,
  and real-time big-data analytics, where the working set needs to fit in
  RAM.

## Choosing by workload, not by habit

The pattern to internalize: unpredictable, low, spiky load → **T-series**.
Steady production workload with no special hardware pressure → **M-series**.
CPU-hungry workload → **C-series**. Memory-hungry workload → **R-series**.
It's tempting to default to whatever size you used last time, but the family
letter is a hardware promise — picking the wrong one means either paying for
headroom you'll never use, or getting throttled on a workload that needed
sustained CPU all along.

```
aws ec2 describe-instance-types \
  --filters "Name=instance-type,Values=m5.*" \
  --query "InstanceTypes[].{Type:InstanceType,vCPU:VCpuInfo.DefaultVCpus,MemMiB:MemoryInfo.SizeInMiB}" \
  --output table
```

`describe-instance-types` is how you confirm the real vCPU and memory specs
for any type before you commit to it — faster and more current than
memorizing numbers.

## Key terms

| Term | Meaning |
|---|---|
| T-series | Burstable general-purpose family; baseline CPU plus accumulated credits for short bursts |
| M-series | Balanced general-purpose family; steady CPU-to-memory ratio, no bursting |
| C-series | Compute-optimized family; high vCPU-to-memory ratio for CPU-bound workloads |
| R-series | Memory-optimized family; high memory-to-vCPU ratio for large in-memory workloads |

## Check yourself

A small internal tool sits idle almost all day and only sees traffic a few
times a day. A production application server needs steady, predictable CPU
around the clock. A nightly batch job does heavy video transcoding. Which
family fits each, and why?
