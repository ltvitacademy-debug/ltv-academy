# Lesson 7 — Compute Overview: EC2 & Lambda

**Chapter 2 · Core AWS Services Overview · Lesson 7 of 18**

## What you'll learn

- What EC2 is, and how instance families and sizes are named
- The main EC2 pricing models: On-Demand, Reserved, Spot, Savings Plans
- What Lambda is, and how "serverless" actually differs from "a server you don't manage"
- When you'd reach for EC2 versus Lambda in a data pipeline

## EC2: virtual servers, sized and billed by the hour

**EC2 (Elastic Compute Cloud)** provides virtual servers — called
**instances** — that you provision, configure, and manage much like a
physical server, except it exists on AWS's hardware and you can spin
one up or shut one down in minutes. Every instance has a **type**
that encodes its family and size, like `m5.large` or `t3.micro`:

```
m5.large
│ │  └─ size: nano, micro, small, medium, large, xlarge, 2xlarge...
│ └──── generation: 5th generation of the "m" family
└────── family: m = general purpose, c = compute-optimized,
                 r = memory-optimized, t = burstable general purpose
```

Instance families are built for different workload shapes — `c`
family for CPU-heavy work, `r` family for memory-heavy work like
in-memory caching, `t` family for workloads with bursty, not
constant, CPU needs. Pricing follows usage: **On-Demand** (pay by the
hour/second, no commitment), **Reserved Instances** or **Savings
Plans** (commit to 1 or 3 years for a significant discount), and
**Spot Instances** (bid on AWS's spare capacity for steep discounts,
with the tradeoff that AWS can reclaim the instance on short notice).

## Lambda: code that runs without a server to manage

**Lambda** is AWS's serverless compute service — you upload a
function (code in a supported language), AWS runs it in response to
an event (an S3 upload, an API call, a scheduled trigger), and you're
billed only for the actual compute time the function used, down to
the millisecond. There's no instance to provision, patch, or
leave running: AWS handles the underlying server entirely, spinning
up execution environments on demand and scaling from zero to
thousands of concurrent invocations automatically.

```
EC2:                                Lambda:
  you provision an instance           you upload a function
  it runs continuously                it runs only on trigger
  you pay while it's running,         you pay per invocation +
  whether busy or idle                 duration, nothing while idle
```

This isn't "a server AWS manages for you" — it's a fundamentally
different billing and execution model. Lambda functions also have
hard limits that shape what they're good for: a maximum execution
time per invocation (15 minutes) and a defined memory ceiling, which
is why Lambda fits short, event-driven, "glue code" tasks well
(triggering a pipeline step when a file lands in S3) and fits poorly
as a replacement for a long-running server process.

## Choosing between them for a data pipeline

In a typical data pipeline, EC2 makes sense for long-running or
steady-state compute — a server that's always on, or a workload that
needs full OS-level control. Lambda makes sense for short, event-
triggered steps — reacting to a new file landing in S3, validating a
record, kicking off the next stage of a Step Functions workflow.
Neither replaces the other; most real pipelines use both, each where
its shape fits.

## Key terms

| Term | Meaning |
|---|---|
| EC2 | AWS's virtual server (instance) service |
| Instance type | An EC2 instance's family + generation + size, e.g. `m5.large` |
| On-Demand / Reserved / Spot | EC2 pricing models trading commitment and flexibility for cost |
| Lambda | AWS's serverless compute service — event-triggered functions billed per invocation |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
would a short, event-triggered task (like reacting to a new file
landing in S3) fit Lambda better than a permanently running EC2
instance?
