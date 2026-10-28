# Lesson 11 — Managed Disks and VM Storage Options

**Chapter 3 · Azure Compute: Virtual Machines · Lesson 11 of 32**

## What you'll learn

- What a **Managed Disk** is, and why it replaced the older unmanaged-disk model
- The difference between a VM's **OS disk** and its **data disks**
- The four real performance tiers — **Standard HDD, Standard SSD, Premium SSD, and Ultra Disk** —
  and the IOPS/latency tradeoffs behind each
- How to create and attach a disk to a VM with the Azure CLI

## Managed Disks: Microsoft handles the storage account

Every Azure VM's storage — its OS disk and any data disks — is backed by a **Managed Disk**. The
"managed" part matters: Microsoft handles the underlying storage account for you entirely. You
specify a size and a performance tier, and Azure takes care of placement, scaling, and the
storage-account limits that used to be the administrator's problem under the old unmanaged-disk
model (where too many disks crammed into one storage account could hit a shared IOPS ceiling).
With Managed Disks, each disk is its own manageable resource with its own independent
performance — no storage-account math required.

Every VM gets exactly one **OS disk** (holding the operating system) and can have zero or more
**data disks** attached for application data, databases, or logs. Keeping application data on a
separate data disk, rather than the OS disk, is standard practice — it lets you resize, snapshot,
or move that data independently of the OS.

## The four performance tiers

Managed Disks come in four tiers, each a real tradeoff between cost, IOPS, and latency:

- **Standard HDD** (`Standard_LRS`) — spinning-disk-backed, the cheapest tier, with higher and
  less consistent latency. Fits infrequent access: backups, archival data, or dev/test VMs that
  don't need fast storage.
- **Standard SSD** (`StandardSSD_LRS`) — SSD-backed with more consistent latency than HDD, still
  budget-friendly. A good fit for web servers and light production workloads that don't need
  top-tier performance.
- **Premium SSD** (`Premium_LRS`) — SSD-backed with high IOPS and low, consistent latency.
  Requires a VM size that supports Premium storage (sizes with an `s` in the name, like
  `Standard_D2s_v5`). This is the standard choice for production databases and other I/O-intensive
  workloads.
- **Ultra Disk** (`UltraSSD_LRS`) — the top tier. Lets you adjust IOPS and throughput independently
  and on the fly, without detaching the disk, for the most demanding workloads: large transactional
  databases, SAP-class systems, anything where you need to dial performance up or down without
  downtime.

```
az disk create \
  --resource-group rg-data \
  --name disk-sql-data01 \
  --size-gb 512 \
  --sku Premium_LRS

az vm disk attach \
  --resource-group rg-data \
  --vm-name vm-sql01 \
  --name disk-sql-data01
```

## Picking a tier by need, not by default

The decision comes down to how much the workload actually depends on disk speed. If latency
spikes would cause real problems — a transactional database under load — Premium SSD or Ultra
Disk is worth the cost. If the data is rarely touched — backups, logs you might never read again —
Standard HDD is the economical choice. Standard SSD is the reasonable middle ground for most
general-purpose application storage that isn't performance-critical.

## Key terms

| Term | Meaning |
|---|---|
| Managed Disk | A VM disk where Microsoft handles the underlying storage account; you choose only size and tier |
| OS disk | The one disk every VM has, holding the operating system |
| Data disk | An additional disk attached to a VM for application data, kept separate from the OS disk |
| Standard HDD / SSD, Premium SSD, Ultra Disk | The four performance tiers, in increasing order of IOPS, consistency, and cost |

## Check yourself

A production SQL database VM is experiencing slow query performance under heavy load, and its
data disk is currently a Standard HDD. What tier should it move to, and why would that actually
help?
