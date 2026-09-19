# Lesson 9 — DTU vs. vCore & Choosing the Right Database Configuration

**Chapter 2 · Deploying Azure SQL · Lesson 9 of 95**

## What you'll learn

- What a DTU actually bundles together, and why that simplicity has a cost
- What the vCore model separates out, and why that separation is what Azure Hybrid Benefit needs
- The real Microsoft diagram comparing the two models side by side
- How to actually decide between them for a given workload

## DTU: one number, three things bundled

A **Database Transaction Unit (DTU)** is a blended measure of
compute, memory, and I/O, all rolled into a single number. Pick a
service tier (Basic, Standard, Premium — Lesson 8) and a DTU count
within it, and you're done sizing the database. The appeal is real:
one number to reason about, one number to alert on, one number to
raise when performance complains. The cost is equally real — you
can't independently scale storage without scaling compute, and you
can't bring an existing SQL Server license to reduce the price,
because DTU pricing doesn't separate compute cost from the bundle in
the first place.

## vCore: compute and storage, priced apart

The **vCore model** breaks that bundle apart. You choose a number of
virtual cores and a generation (the `--family Gen5` flag from
Lesson 7's CLI example), and storage is priced and sized
independently of that compute choice. This is exactly why vCore is
the model **Azure Hybrid Benefit** requires: Hybrid Benefit reduces
your **compute** cost by applying a SQL Server license you already
own, and that only makes sense as a line item once compute has its
own price to discount in the first place.

![Azure SQL Database's two purchasing models compared: DTU (bundled compute, memory, and I/O) versus vCore (compute and storage priced independently).](/courses/azure-dba/ch02/09-dtu-vs-vcore/pricing-model.png)

This is Microsoft's own comparison diagram — the same visual most of
the official documentation uses to introduce this decision, because
it's genuinely the clearest way to see the bundling difference at a
glance rather than reading it as two separate paragraphs.

## Making the actual decision

```
Simple workload, don't own a SQL Server license, want the
simplest possible sizing story?
  -> DTU model (Basic/Standard/Premium)

Own an existing SQL Server license (Software Assurance)?
  -> vCore model, apply Azure Hybrid Benefit — real cost savings

Need to scale storage independently of compute, or need
Business Critical / Hyperscale specifically?
  -> vCore model — those tiers don't exist under DTU
```

Business Critical and Hyperscale (Lesson 8) exist *only* under the
vCore model — there's no DTU equivalent — so any workload that needs
either of those tiers has already made the DTU-vs-vCore decision
without needing to weigh anything else. For everything else, license
ownership and the need for independent storage scaling are the two
real deciding questions.

## Key terms

| Term | Meaning |
|---|---|
| DTU | Database Transaction Unit — bundled compute + memory + I/O, one number |
| vCore | Virtual core — compute priced and sized independently of storage |
| Azure Hybrid Benefit | Discounts vCore compute cost using an existing SQL Server license; vCore-only |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking:
why can't a DBA apply Azure Hybrid Benefit to a DTU-based database,
even if their organization already owns SQL Server licenses?
