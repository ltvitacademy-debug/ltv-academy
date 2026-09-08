# Lesson 1 — What Is Azure Data Factory?

**Chapter 1 · Getting Started · Lesson 1 of 5**

## What you'll learn

- What problem Azure Data Factory actually solves
- The five components every pipeline is built from
- The four-stage workflow — connect, transform, publish, monitor
- Where this course is headed over the next 57 lessons

## The problem: raw data has no story on its own

Every real organization has data scattered across dozens of places —
a SQL Server database, a folder of CSV files, a SaaS application's
API, a partner's FTP server. On its own, none of that raw data has
the context to answer a real business question. Someone has to move
it, clean it, and land it somewhere a report or a data scientist can
actually use it.

**Azure Data Factory (ADF)** is Microsoft's managed cloud service for
exactly that job: a cloud-based **data integration** service that
orchestrates and automates moving and transforming data at scale,
without you having to build and babysit the servers that do it.

![A visual guide to Azure Data Factory's architecture: Data Integration, Activities, Pipelines, Datasets, Linked Services, and Integration Runtime, laid out as a hand-drawn infographic.](/courses/data-factory/ch01/01-what-is-azure-data-factory/architecture-guide.png)
*The whole platform in one diagram — pipelines, activities, datasets, linked services, data flows, and the integration runtime that connects them all.*

## Five components, one platform

Everything in Data Factory is built from five core pieces, and this
entire course is really just these five ideas, explored in depth one
chapter at a time:

| Component | What it is |
|---|---|
| **Linked service** | A connection definition — like a connection string — telling Data Factory how to reach a specific data store or compute resource |
| **Dataset** | A pointer to the actual structure of data you want to use — a specific table, file, or folder |
| **Activity** | A single processing step, like copying data or running a query |
| **Pipeline** | A logical grouping of activities that together perform one unit of work |
| **Integration runtime** | The compute environment that actually executes an activity or that a linked service connects through |

Notice the build order there is bottom-up: you define a **linked
service** to reach a data store, a **dataset** to describe the data
inside it, an **activity** to do something with that dataset, and a
**pipeline** to group activities together into one manageable unit.

## A real pipeline, in Data Factory Studio

Here's what building one of these actually looks like once you're in
the tool — a pipeline canvas with a Copy activity moving data from one
dataset to another:

![Screenshot of Azure Data Factory Studio showing the Factory Resources pane on the left, an Activities pane, and a pipeline canvas with a Copy data activity and its Source settings open below.](/courses/data-factory/ch01/01-what-is-azure-data-factory/view-pipeline.png)
*Factory Resources on the left lists every pipeline, dataset, and data flow you've built. The canvas in the middle is where you wire activities together.*

## The four-stage workflow

Microsoft's own framing of "how Data Factory works" breaks into four
stages, and nearly everything a data engineer does with this tool fits
into one of them:

1. **Connect & collect** — reach into on-premises and cloud sources
   alike, and move raw data into one centralized store.
2. **Transform & enrich** — process the collected data, either
   visually with mapping data flows or by calling out to compute
   services like Databricks.
3. **CI/CD & publish** — develop and test pipelines like real code,
   then load the finished, business-ready data into a destination
   analytics tools can consume.
4. **Monitor** — track every pipeline run's success and failure, with
   built-in support for alerts and logging.

## Why this isn't just "another ETL tool"

Data Factory is built for **hybrid** scenarios specifically — data
that lives partly on-premises and partly in the cloud, at a scale
where hand-rolled scripts and scheduled tasks stop being reliable.
It provides broad connectivity to different data sources out of the
box, integrated security through Microsoft Entra ID and role-based
access control, and full CI/CD support through Azure DevOps and
GitHub — the kind of enterprise-grade plumbing that's expensive to
build yourself.

## Where this course is headed

| Chapters | What they cover |
|---|---|
| 2 | Connecting to data — linked services and datasets in depth |
| 3-4 | Pipelines, activities, and the control-flow logic that orchestrates them |
| 5 | Mapping data flows — visual, Spark-powered transformation |
| 6-8 | Triggers, integration runtimes, and monitoring in production |
| 9 | Fabric Data Factory — the next generation of this same platform |
| 10 | Security, DevOps, and CI/CD |
| 11 | A full capstone pipeline, start to finish |

## Key terms

| Term | Meaning |
|---|---|
| Data integration | Combining data from different sources into a unified, usable form |
| ETL / ELT | Extract-Transform-Load / Extract-Load-Transform — the two orders data movement and transformation can happen in |
| Linked service | A connection definition for a data store or compute resource |
| Pipeline | A logical grouping of activities performing one unit of work |

## Lab

1. Sketch, on paper or in a text file, the five Data Factory
   components in their natural build order: linked service → dataset
   → activity → pipeline → (integration runtime, running underneath
   all of it).
2. For a scenario you're familiar with — even something outside IT,
   like moving files from a phone to a laptop — name what would play
   the role of each of the four workflow stages: connect & collect,
   transform & enrich, publish, monitor.
3. Write one sentence explaining why a company with only cloud data
   and no on-premises systems might still choose Data Factory over
   writing custom scripts.

## Check yourself

You're ready for Lesson 2 when you can name all five Data Factory
components from memory, in their natural build order, and explain in
one sentence what problem Data Factory solves that hand-written
scripts don't.
