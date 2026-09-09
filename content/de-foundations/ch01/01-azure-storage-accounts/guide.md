# Lesson 1 — Azure Storage Accounts

**Chapter 1 · Azure Data Lake & Storage · Lesson 1 of 62**

## What you'll learn

- What an Azure **storage account** actually is, and why it's the
  top-level resource for everything in this chapter
- The five storage services one account can hold
- The key decisions you make when creating one: performance tier,
  redundancy, and account kind
- The dataset this entire course works with: real NYC Taxi trip data

## What is a storage account?

An Azure **storage account** is the top-level container that gives you a
unique namespace for your data in Azure, and is the single billing and
management boundary for everything stored under it. One storage account
can hold **five different storage services**:

| Service | What it's for |
|---|---|
| **Blob storage** | Unstructured object storage — files, images, and (with Lesson 2's hierarchical namespace) the data lake this whole chapter builds toward |
| **Azure Files** | Fully managed file shares, mountable like a network drive |
| **Queues** | Simple message queuing between application components |
| **Tables** | A NoSQL key-value store |
| **Azure Data Lake Storage Gen2** | Blob storage with a hierarchical namespace enabled — Lesson 2 covers exactly what that means |

## Creating one in the Azure Portal

Every storage account starts from the **Storage accounts** page in the
Azure Portal, with a single **+ Create** button:

![The Azure Portal's Storage accounts list view, with the plus Create button highlighted in the toolbar above a table of existing storage accounts.](/courses/de-foundations/ch01/01-azure-storage-accounts/create-button-sml.png)
*Every storage account you'll ever create in this course starts here.*

That opens the **Create a storage account** wizard — a set of tabs
walking through every setting a storage account needs:

![The Create a storage account wizard in the Azure Portal, showing tabs for Basics, Advanced, Networking, Data protection, Security, Encryption, Tags, and Review plus create, with descriptive text about Azure Blobs, Data Lake Storage Gen2, Files, Queues, and Tables.](/courses/de-foundations/ch01/01-azure-storage-accounts/create-account-tabs.png)
*The wizard's own description confirms it: one account, five services underneath.*

## The three decisions that matter most on the Basics tab

- **Performance tier** — `Standard` (magnetic/SSD-backed, cheaper) vs.
  `Premium` (SSD-backed throughout, faster and pricier). Almost every lab
  in this course uses Standard.
- **Redundancy** — how many copies of your data Azure keeps, and where:
  `LRS` (three copies, one datacenter), `ZRS` (spread across
  availability zones), `GRS`/`GZRS` (also replicated to a second,
  distant region). More redundancy costs more.
- **Account kind** — `StorageV2` (general purpose v2, what you'll use
  for every lab in this course) supports all five services above,
  including the hierarchical namespace that turns Blob storage into
  ADLS Gen2 in Lesson 2.

## The dataset for this entire course: NYC Taxi trip data

Every hands-on lab in this 62-lesson course — Python, pandas, Spark,
PySpark — works with the same real, public dataset: the **NYC Taxi &
Limousine Commission (TLC) Trip Record Data**, published by New York
City's government at
[nyc.gov/site/tlc/about/tlc-trip-record-data.page](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page).
It's genuinely used across the data engineering industry for exactly this
kind of teaching — real dates and times, pickup/dropoff locations, fares,
and passenger counts, at a scale large enough to make partitioning and
performance lessons later in this course actually meaningful.

## Key terms

| Term | Meaning |
|---|---|
| Storage account | The top-level container and billing boundary for Azure storage services |
| Blob storage | Unstructured object storage — the foundation for a data lake |
| StorageV2 | The general-purpose v2 account kind used throughout this course |
| Redundancy (LRS/ZRS/GRS/GZRS) | How many copies of your data Azure keeps, and where |

## Lab

1. In the [Azure Portal](https://portal.azure.com), search for **Storage
   accounts** and open that page.
2. Click **+ Create**.
3. On the **Basics** tab, note the three decisions above — Performance,
   Redundancy, and (further down) the account kind — without creating
   anything yet. Lesson 2 covers the one additional setting
   (hierarchical namespace) that turns this into a data lake.
4. Download a single month of the real NYC Taxi trip data from
   [the TLC's public site](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page)
   — you'll use it starting in Chapter 2.

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what
five services can live under one storage account, and which account kind
supports all of them?
