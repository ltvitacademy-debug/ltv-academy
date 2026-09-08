# Lesson 34 — What Is an Integration Runtime?

**Chapter 7 · Integration Runtimes · Lesson 1 of 4**

## What you'll learn

- The real bridge role an integration runtime plays
- The four capabilities an IR provides
- The three types, and what each one is actually for
- Why an IR's location can differ from your data factory's own location

## The bridge between an activity and a linked service

Recall Lesson 1: an activity defines an action, a linked service
defines a target data store or compute. An **integration runtime
(IR)** is the actual **compute infrastructure** that bridges the
two — every activity you've built across this entire course has been
running on one, whether you noticed it or not.

## Four real capabilities

| Capability | What it does |
|---|---|
| **Data Flow** | Executes mapping data flows (Chapter 5) in managed Azure compute |
| **Data movement** | Copies data across stores, public or private network |
| **Activity dispatch** | Dispatches and monitors transform activities on external compute (Databricks, HDInsight, and more) |
| **SSIS package execution** | Natively runs SSIS packages in managed Azure compute |

## Three types, three real jobs

![Diagram showing two integration runtimes: a managed-elastic Azure IR in UK South handling data movement and activity dispatching, and a managed-dedicated Azure-SSIS IR in North Europe executing SSIS packages — both serving a Data Factory whose metadata lives in East US.](/courses/data-factory/ch07/34-what-is-an-integration-runtime/ir-location.png)
*Notice the data factory's own metadata sits in East US, while its integration runtimes actually execute work in entirely different regions.*

| IR type | Job | Course lesson |
|---|---|---|
| **Azure** | Fully managed, serverless — cloud-to-cloud data movement, activity dispatch, data flows | Lesson 35 |
| **Self-hosted** | Software you install yourself — bridges to on-premises or private-network data | Lesson 36 |
| **Azure-SSIS** | A managed cluster of Azure VMs, purpose-built to run existing SSIS packages | Chapter 1's ADF-vs-SSIS comparison, revisited |

## Location: independent of your data factory

A data factory's own **metadata** — its pipelines, its trigger
history — lives in one fixed region, set when you created it back in
Lesson 4. An integration runtime's location is genuinely
**independent** of that. You can create an Azure IR in a specific
region to keep data movement inside that region for compliance
reasons, entirely separate from where the data factory's own metadata
lives.

## Determining which IR actually gets used

When more than one IR could apply to an activity, Data Factory
resolves it with a clear precedence: a **self-hosted** IR takes
priority over an Azure IR inside a managed virtual network, which
takes priority over the **global**, autoresolve Azure IR. For a Copy
activity specifically, if *either* the source or sink linked service
points to a self-hosted IR, the whole copy runs on that self-hosted
IR — there's no mixing.

## Key terms

| Term | Meaning |
|---|---|
| Integration runtime (IR) | The compute infrastructure bridging an activity and a linked service |
| Azure IR | Fully managed, serverless compute for cloud-to-cloud work |
| Self-hosted IR | Software installed on your own network, bridging to private data |
| Azure-SSIS IR | A managed VM cluster for running existing SSIS packages |

## Lab

1. Open **Manage → Integration runtimes** on any data factory you
   have, and confirm the default `AutoResolveIntegrationRuntime` is
   listed.
2. Write down, in your own words, which of the three IR types your
   Lesson 8 SQL Server connection actually depends on, and why.
3. Explain in one sentence why an IR's location can genuinely differ
   from a data factory's own region.

## Check yourself

You're ready for Lesson 35 when you can name all three integration
runtime types from memory, and explain which one every activity in
Chapters 2 and 3 has actually been running on by default.
