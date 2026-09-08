# Lesson 42 — Fabric Data Factory Overview

**Chapter 9 · Fabric Data Factory · Lesson 1 of 6**

## What you'll learn

- What Data Factory in Microsoft Fabric actually is
- How it relates to the Azure Data Factory you've used all course
- The role OneLake plays underneath everything
- ETL vs. ELT, and why Fabric genuinely supports both

## The next generation, not a rebrand

Everything in Chapters 1 through 8 has been classic **Azure Data
Factory** — a standalone Azure resource you provision, with its own
Studio, its own integration runtimes, its own billing. **Data Factory
in Microsoft Fabric** is Microsoft's own description of itself as
"the next generation of Azure Data Factory" — not a rename, a
genuinely different architecture built inside Fabric, Microsoft's
unified SaaS analytics platform.

## The stack, in one diagram

![Diagram of the Data Factory in Microsoft Fabric stack: 170+ connectors feeding Data Movement, Orchestration, and Transformation, all sitting on top of OneLake, woven through with AI-powered intelligence.](/courses/data-factory/ch09/42-fabric-data-factory-overview/data-integration-stack.png)
*Connectivity, movement, orchestration, and transformation all sit on one shared foundation: OneLake.*

That bottom layer is the real architectural shift. In classic ADF,
data moves *between* stores you configure separately. In Fabric,
**OneLake is the unified storage layer everything sits on** — Lesson
45 covers this in depth, but the short version: pipelines, dataflows,
Lakehouses, and Warehouses in the same workspace can all reference the
same physical data without you copying it between them.

## ETL, ELT, or both

You've built strictly ETL pipelines all course — transform the data,
*then* load it. Fabric Data Factory explicitly supports both:

| Approach | What happens | Best fit |
|---|---|---|
| ETL | Transform before loading | Data needs cleaning/standardizing in transit |
| ELT | Load raw data first, transform where it lives | Large datasets, using OneLake's own compute engines (Spark, T-SQL) to transform in place |

Because Fabric's compute and storage are already unified in OneLake,
ELT is genuinely more natural there than it ever was in classic ADF —
you're not shipping data to a separate compute resource to transform
it; the compute can run right where the data already sits.

## What actually carries over from everything you've learned

The genuinely good news: your mental model doesn't reset here.

- **Pipelines still exist**, with activities, parameters, and control
  flow — the same orchestration model, "re-imagined for Fabric UX."
- **The expression language is nearly identical** — `@activity()`,
  `@pipeline()`, and everything else from Lesson 22 transfers
  directly.
- **Connectors number 170+**, spanning the same on-premises, cloud,
  and multicloud sources.

What changes is mostly *how much infrastructure you have to manage
yourself* — Lesson 47 covers the real differences in depth once
you've seen Fabric's actual building blocks in Lessons 43-46.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Fabric | Microsoft's unified SaaS analytics platform, hosting Data Factory alongside Power BI, Data Engineering, and more |
| OneLake | Fabric's single, unified storage layer underneath every workload |
| ELT | Extract, Load, Transform — load raw data first, transform where it's stored |

## Lab

1. If you have access to a Fabric tenant, open the Fabric workspace
   switcher and note which experiences (Data Factory, Data
   Engineering, Power BI) share the same workspace.
2. Compare the stack diagram in this lesson against what you know of
   classic ADF's architecture from Chapter 1.
3. Write one sentence explaining why ELT is more natural in Fabric
   than it was in classic ADF.

## Check yourself

You're ready for Lesson 43 when you can explain, in one sentence,
what OneLake's role is in the Fabric Data Factory stack.
