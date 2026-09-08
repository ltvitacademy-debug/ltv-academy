# Lesson 2 — ETL vs. ELT

**Chapter 1 · Getting Started · Lesson 2 of 5**

## What you'll learn

- What each letter in ETL and ELT actually stands for
- Why swapping the order of transform and load changes where the work happens
- Which pattern Azure Data Factory leans toward today, and why
- How mapping data flows fit into that pattern

## Same three steps, different order

Both acronyms describe the same three jobs — getting data out of a
source, changing its shape, and putting it somewhere useful — just in
a different sequence:

- **ETL — Extract, Transform, Load.** Data is pulled from the source,
  transformed in a separate processing engine, and *then* loaded into
  the destination already in its final, clean shape.
- **ELT — Extract, Load, Transform.** Data is pulled from the source
  and loaded into the destination essentially as-is, and the
  transformation happens *after*, inside the destination system
  itself.

## Why the order actually matters

The difference isn't just academic — it changes where the heavy
lifting happens, and what tools you need to do it.

**ETL** needs a separate transformation engine sitting between the
source and destination, and every downstream consumer only ever sees
already-cleaned data. That gives you tighter control and lets you keep
raw data away from a destination system entirely — useful when the
destination is expensive or has stricter access rules than the raw
source.

**ELT** pushes raw data into the destination first, then transforms it
using the destination's own compute power — a cloud data warehouse
like Azure Synapse Analytics, for example. This takes advantage of
warehouses that are genuinely good at large-scale transformation
themselves, and it keeps a copy of the truly raw data around in case
you need to reprocess it differently later.

## Where Azure Data Factory fits

Data Factory was built to support **both** patterns — the platform
itself doesn't force one or the other. But in modern cloud
architecture, Data Factory pipelines lean **ELT-first** in practice: a
Copy activity moves raw data into a centralized data lake or
warehouse, and the actual transformation happens afterward, either
with Data Factory's own **mapping data flows** (Chapter 5) or by
calling out to a dedicated compute engine like Azure Synapse Analytics
or Azure Databricks.

Mapping data flows themselves are a good example of this pattern in
practice: they work by staging data flowing through them and applying
Spark-powered transformations on that staged data, which is
fundamentally an ELT-style approach even inside one single Data
Factory activity.

## Why ELT has become the default

Two things changed in cloud data engineering that pushed ELT ahead of
classic ETL as the default assumption:

1. **Storage got cheap.** Keeping a full copy of raw, untransformed
   data around is no longer a meaningful cost concern the way it once
   was.
2. **Cloud warehouses got powerful.** A modern warehouse like Synapse
   Analytics can transform enormous datasets faster than a dedicated
   ETL engine sitting in front of it ever could.

Neither pattern is "wrong" — this course teaches tools that support
both, and part of your job as a data engineer is recognizing which one
a given project actually calls for.

## Key terms

| Term | Meaning |
|---|---|
| ETL | Extract, Transform, Load — transformation happens before loading |
| ELT | Extract, Load, Transform — transformation happens after loading, inside the destination |
| Mapping data flow | Data Factory's visual, Spark-powered transformation tool, ELT-style by design |

## Lab

1. Pick a real dataset you're familiar with (even something like a
   personal budget spreadsheet) and describe, in one sentence each,
   how you'd move and clean it the ETL way versus the ELT way.
2. Name one real advantage ELT has that ETL doesn't, and one real
   advantage ETL has that ELT doesn't — in your own words, not copied
   from this guide.
3. Explain why keeping a copy of untransformed, raw data around
   (something ELT naturally does) can be valuable even after you've
   already produced a clean, transformed version of it.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking back
at this page, which of the two patterns Azure Data Factory leans
toward by default, and why storage and compute costs are the real
reason that's true today.
