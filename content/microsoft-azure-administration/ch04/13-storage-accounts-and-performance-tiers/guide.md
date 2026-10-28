# Lesson 13 — Storage Accounts and Performance Tiers

**Chapter 4 · Azure Storage · Lesson 13 of 32**

## What you'll learn

- What an Azure **storage account** actually is: the single namespace that holds blob, file, queue, and table storage underneath it
- The difference between the **Standard** and **Premium** performance tiers, and when each one is the right call
- The account **kinds** you'll actually choose between in practice, and why `StorageV2` covers nearly every scenario
- How to create a storage account and read its settings back with the Azure CLI

## One account, four services underneath it

In the prior course you learned object, block, and file storage as vendor-neutral concepts. In
Azure, all three live inside one management and billing boundary: the **storage account**. A
single storage account can hold blob containers (object storage), file shares (file storage), plus
queues and tables for messaging and NoSQL key-value data. You don't create "a blob service" on its
own — you create a storage account, and then you create blob containers, file shares, queues, or
tables inside it. The account name itself has to be **globally unique across all of Azure** — 3 to
24 characters, lowercase letters and numbers only, because it becomes part of the public endpoint
URL (`https://<accountname>.blob.core.windows.net`).

## Standard vs. Premium: HDD economics vs. SSD latency

Every storage account is created on one of two **performance tiers**:

- **Standard** — backed by magnetic/HDD-class infrastructure under the hood. Lower cost per GB,
  and the right default for the bulk of unstructured data: backups, logs, archives, general blob
  and file storage where you don't need sub-millisecond latency.
- **Premium** — backed by SSDs. Higher cost, but low and consistent latency and much higher IOPS.
  You reach for Premium when latency actually matters: Premium file shares for latency-sensitive
  workloads like SAP or databases mounted over SMB, Premium block blob storage for high-transaction
  workloads, and Premium SSD-backed Managed Disks for VM operating system and data disks (Managed
  Disks get their own direct comparison in Lesson 15).

## Account kind: StorageV2 is almost always the answer

The performance tier is paired with an **account kind**. `StorageV2` (general-purpose v2) is the
modern default and supports blob, file, queue, and table storage together on either Standard or
Premium — it's what you'll pick in almost every real deployment. A few specialized kinds exist for
Premium-only scenarios (`BlockBlobStorage`, `FileStorage`), but you won't reach for those until a
workload specifically demands them.

```bash
az storage account create \
  --name ltvstorage01 \
  --resource-group rg-storage-lab \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2
```

## Key terms

| Term | Meaning |
|---|---|
| Storage account | The top-level namespace/billing boundary holding blob, file, queue, and table storage |
| Standard tier | HDD-class storage, lower cost, the default for most unstructured data |
| Premium tier | SSD-class storage, low/consistent latency, used for VM disks and latency-sensitive workloads |
| Account kind (StorageV2) | The general-purpose v2 account kind supporting all four services on either tier |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why would you pick a Premium
storage account for a SQL Server data disk, but Standard for a folder of nightly database backup
files?
