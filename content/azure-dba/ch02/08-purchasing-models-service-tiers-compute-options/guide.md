# Lesson 8 — Azure SQL Purchasing Models, Service Tiers & Compute Options

**Chapter 2 · Deploying Azure SQL · Lesson 8 of 95**

## What you'll learn

- The two purchasing models Azure SQL Database offers, at the overview level
- The service tiers available under each model, and what they're named
- Why "purchasing model" and "service tier" are two different decisions, not one
- The vocabulary Lesson 9 needs to go deep on DTU vs. vCore specifically

## Two purchasing models, one decision underneath both

Lesson 7's `az sql db create` example used `--edition GeneralPurpose
--family Gen5 --capacity 2` — vCore-model flags. That's one of two
purchasing models Azure SQL Database offers; the other is DTU-based.
Both models exist to answer the same underlying question — how much
compute, memory, and I/O does this database get — they just answer
it with different units and different levels of control. Lesson 9
is entirely about that comparison; this lesson is the map of what
exists under each model first.

## DTU model: three service tiers

| Service tier | What it's for |
|---|---|
| Basic | Small workloads, light usage, dev/test |
| Standard | Most general-purpose production workloads |
| Premium | High-performance, latency-sensitive workloads |

Each DTU tier bundles compute, memory, and I/O into a single number
— a Database Transaction Unit — and you pick a tier and a DTU count
within it. It's the simpler of the two models to reason about, at
the cost of less individual control over compute vs. storage.

## vCore model: three service tiers

| Service tier | What it's for |
|---|---|
| General Purpose | Most production workloads; balanced compute/storage/price |
| Business Critical | Highest resilience and lowest latency; local SSD, built-in read replica |
| Hyperscale | Very large databases (multi-TB+) needing fast scaling and backups |

The vCore model prices compute and storage separately, which is
exactly why it's also the model required for Azure Hybrid Benefit
(bringing an existing SQL Server license to reduce the compute
cost) — a licensing detail Lesson 9 covers alongside the pricing
mechanics.

## Compute options sit inside each vCore tier

Within the vCore model specifically, you also choose a compute
option — this lesson names them; Lesson 10 covers what each one
actually means for how you're billed and how availability behaves:

```
Provisioned compute   -- fixed vCores, billed whether busy or idle
Serverless compute    -- auto-scales, auto-pauses, billed per second
```

Serverless is only available on General Purpose in most regions;
Business Critical and Hyperscale are provisioned-only as of this
course's writing. That constraint alone rules out some combinations
before you even get to a real sizing decision.

## Two decisions, not one

The mistake this lesson is setting up you to avoid: "which tier do I
pick" is not a single question. It's at minimum two — DTU or vCore
(the purchasing model), and then which service tier within that
model — and for vCore, a third: which compute option. Lesson 9 takes
the first decision all the way; Lesson 10 takes the third.

## Key terms

| Term | Meaning |
|---|---|
| Purchasing model | DTU or vCore — the unit system a database's compute/storage is priced and sized in |
| Service tier | Basic/Standard/Premium (DTU) or General Purpose/Business Critical/Hyperscale (vCore) |
| Compute option | Provisioned or serverless — a vCore-model-only choice, covered in Lesson 10 |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking:
name the three service tiers under each purchasing model, and which
purchasing model you'd need if you wanted to apply an existing SQL
Server license via Azure Hybrid Benefit.
