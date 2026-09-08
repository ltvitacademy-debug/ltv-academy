# Lesson 3 — Data Factory vs. SSIS vs. Fabric Data Factory

**Chapter 1 · Getting Started · Lesson 3 of 5**

## What you'll learn

- How SSIS, Azure Data Factory, and Fabric Data Factory relate to each other
- What Fabric Data Factory actually simplifies compared to classic ADF
- What Fabric genuinely can't do yet, as of this writing
- A practical decision guide for which one fits a given project

## Three tools, one evolving job

All three of these tools exist to move and transform data — they're
not competitors doing unrelated things, they're three generations of
the same underlying job, aimed at different eras of infrastructure:

- **SQL Server Integration Services (SSIS)** — the oldest of the
  three, a Windows-based, on-premises ETL engine tied to a SQL Server
  license. Mature, granular, and still genuinely the right call for
  organizations with deep on-premises SQL Server investments.
- **Azure Data Factory (ADF)** — a cloud **platform-as-a-service**
  (PaaS) that you configure and manage yourself in the Azure portal.
  This is the tool this course spends Chapters 1 through 8 on: stable,
  hybrid-capable, and still the right call for most existing
  production pipelines today.
- **Fabric Data Factory** — a cloud **software-as-a-service** (SaaS)
  built directly into a Microsoft Fabric workspace, alongside
  lakehouses, warehouses, and Power BI. It's the platform Microsoft is
  actively investing new development into, covered in this course's
  Chapter 9.

## What Fabric actually simplifies

Fabric Data Factory keeps roughly 90% of ADF's activities, and the
core ideas — pipelines, activities, triggers — transfer directly. But
several ADF concepts get genuinely simpler in Fabric:

| In Azure Data Factory | In Fabric Data Factory | What changed |
|---|---|---|
| Dataset + Linked Service | Connections only | No separate dataset object — data properties are defined inline, directly in the activity |
| Mapping data flow | Dataflow Gen2 | Same Spark-powered transformation idea, a simpler authoring experience |
| Integration runtime (Azure/Auto-resolve) | Handled automatically | No infrastructure to provision or manage for cloud-to-cloud movement |
| Self-hosted integration runtime | On-premises Data Gateway | Same underlying job — bridging on-premises data — different implementation |
| Publish step | Save / Run | No separate publish step; saving stores your work, running executes it immediately |
| ARM template export | Save as | Duplicating a pipeline is a single action, not an export/import round trip |

## What Fabric still can't do (as of this writing)

Before recommending Fabric over ADF for a real project, know its real
gaps today:

- **No SSIS package support.** If an organization runs SSIS packages
  through ADF's Azure-SSIS integration runtime, there's currently no
  equivalent path in Fabric.
- **Managed virtual networks and private endpoints** are still listed
  as "to be determined" in Microsoft's own comparison — not yet at
  ADF's level of maturity.

Neither gap is permanent — Microsoft has stated both are being worked
on — but "coming eventually" isn't the same as "ready for your
project today."

## A practical decision guide

| If your situation is... | Reach for... |
|---|---|
| A mature on-premises SQL Server shop already running SSIS packages | **SSIS** — migrating working packages for its own sake rarely pays off |
| An existing, stable hybrid pipeline already built in ADF | **Stay on ADF** — Microsoft has kept the ADF feature set stable rather than actively growing it, but it isn't going away |
| A brand-new, cloud-native project with no legacy SSIS dependency | **Start with Fabric Data Factory** — this is genuinely where Microsoft recommends starting today |

## Key terms

| Term | Meaning |
|---|---|
| PaaS (platform-as-a-service) | A cloud model where you configure and manage the service yourself — ADF's model |
| SaaS (software-as-a-service) | A cloud model where the platform is fully managed for you — Fabric's model |
| Dataflow Gen2 | Fabric's evolved, simplified successor to ADF's mapping data flows |
| On-premises Data Gateway | Fabric's equivalent of ADF's self-hosted integration runtime |

## Lab

1. Look at the terminology table above and pick three ADF terms you
   just learned in Lesson 1 (linked service, dataset, pipeline).
   Write down what each one is called, or replaced by, in Fabric.
2. Imagine a company that's been running Azure Data Factory in
   production for two years, with dozens of working pipelines. Write
   one sentence on why "Fabric is newer" isn't, by itself, a good
   enough reason to migrate everything right away.
3. Name one specific gap that would stop you from recommending Fabric
   Data Factory today for a company still running legacy SSIS
   packages.

## Check yourself

You're ready for Lesson 4 when you can explain, without checking back,
which of the three tools is PaaS, which is SaaS, and which one this
course actually builds most of its hands-on labs against.
