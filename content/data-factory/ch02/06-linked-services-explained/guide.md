# Lesson 6 — Linked Services Explained

**Chapter 2 · Connecting to Data · Lesson 1 of 5**

## What you'll learn

- Where linked services fit among pipelines, activities, and datasets
- How to actually create one in Data Factory Studio
- The four parts of a linked service's JSON definition
- Why a linked service and a dataset are two separate things

## One connection, reused everywhere

Recall from Lesson 1: a **linked service** is a connection definition
— like a connection string — telling Data Factory how to reach a
specific data store or compute resource. It's the foundation
everything else in this chapter builds on:

![Diagram showing the relationships among pipeline, activity, dataset, and linked service — a pipeline contains activities, activities use datasets, and datasets reference linked services.](/courses/data-factory/ch02/06-linked-services-explained/entity-relationship.png)
*A pipeline groups activities. Activities read and write datasets. Datasets point into linked services. Everything traces back to a connection.*

You create a linked service **once** per data store, and reuse it
across as many datasets and pipelines as you need — you don't
recreate the connection every time you want to touch that same
storage account or database again.

## Creating one in Data Factory Studio

Open the **Manage** hub (the briefcase icon), select **Linked
services**, and select **+ New**:

![Screenshot of Data Factory Studio's Manage hub, showing the Linked services page with a New button highlighted.](/courses/data-factory/ch02/06-linked-services-explained/create-linked-service.png)
*Every linked service you've created lives on this one page — a name and a type, at a glance.*

Selecting **+ New** opens a gallery of every supported connector —
search or browse to find the one you need, then configure its
specific connection details:

![Screenshot of the New linked service window in Data Factory Studio, showing a searchable gallery of connector tiles including Azure Blob Storage, Azure SQL Database, Amazon S3, and more.](/courses/data-factory/ch02/06-linked-services-explained/new-linked-service-window.png)
*Hundreds of connectors, one search box. Lessons 7 and 8 walk through two of the most common: Blob Storage and SQL.*

## What a linked service actually contains

Underneath the UI, every linked service is stored as JSON with four
real parts:

| Property | Meaning | Required |
|---|---|---|
| `name` | The linked service's name, referenced by datasets and activities | Yes |
| `type` | Which connector it is — `AzureBlobStorage`, `AzureSqlDatabase`, and so on | Yes |
| `typeProperties` | The connection details specific to that type — a connection string, a server name, credentials | Yes |
| `connectVia` | Which integration runtime actually executes the connection | No — defaults to Azure Integration Runtime |

You'll rarely hand-write this JSON — the UI form generates it for you
— but recognizing these four parts matters the moment you need to
troubleshoot one, or read a linked service someone else built.

## Linked service vs. dataset — the distinction that matters

This is worth repeating from Lesson 1, because it's the single most
common point of early confusion: the **linked service** defines *how
to connect*. The **dataset** — Lesson 9's topic — defines *which
specific data*, inside that connection, you actually mean. One Azure
Blob Storage linked service can back dozens of different datasets,
each pointing at a different container, folder, or file.

## Key terms

| Term | Meaning |
|---|---|
| Linked service | A reusable connection definition to a data store or compute resource |
| Connector | The specific type of system a linked service knows how to connect to |
| `typeProperties` | The connector-specific connection details inside a linked service's JSON |
| `connectVia` | The integration runtime a linked service uses to actually execute its connection |

## Lab

1. If you have a data factory from Lesson 4, open **Manage → Linked
   services** and select **+ New**. Browse (don't create yet) the
   connector gallery and note three connectors you recognize from
   other tools you've used.
2. Write down, in your own words, the difference between what a
   linked service defines and what a dataset defines — Lesson 9 will
   check this answer.
3. Name one real advantage of creating a single reusable linked
   service instead of a new one for every dataset that needs the same
   connection.

## Check yourself

You're ready for Lesson 7 when you can name all four parts of a
linked service's JSON definition, and explain in one sentence why
`connectVia` is optional but `type` isn't.
