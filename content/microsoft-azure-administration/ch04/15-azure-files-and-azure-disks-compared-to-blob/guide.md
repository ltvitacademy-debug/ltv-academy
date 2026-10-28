# Lesson 15 — Azure Files and Azure Disks Compared to Blob

**Chapter 4 · Azure Storage · Lesson 15 of 32**

## What you'll learn

- How **Azure Files** maps onto the file-storage concept you already learned: an SMB (and NFS)
  mountable share that multiple machines can connect to at once
- How a **Managed Disk** maps onto block storage: raw, fixed-size storage attached to exactly one VM
- How to place Blob, Azure Files, and Managed Disks side by side against the object/block/file
  framework from the prior course, with Azure's real product names attached
- How to create a file share and a managed disk with the Azure CLI

## Azure Files: the file-storage slot, filled

You already learned file storage as a shared, hierarchical filesystem that multiple machines mount
at once over a network protocol — Azure's real product for that is **Azure Files**. An Azure file
share is an actual SMB (and, for Linux, NFS) share hosted inside a storage account, and — just like
the vendor-neutral version — several VMs can mount the **same share** at the same time and see each
other's files immediately. That's the use case Blob storage was never built for: a group of
application servers that all need to read and write one shared set of files.

```bash
az storage share create \
  --account-name ltvstorage01 \
  --name shared-app-data \
  --quota 100
```

## Managed Disks: the block-storage slot, filled

A **Managed Disk** is Azure's block storage product — raw, fixed-size storage attached to exactly
one virtual machine and formatted with a filesystem, exactly like a physical hard drive plugged
into one computer. You met Managed Disks briefly back in Chapter 3 as a VM's OS and data disks;
here's the direct comparison that matters: a Managed Disk behaves at the block level (fast, low
latency, one VM at a time), while Blob storage behaves at the object level (HTTP/API access, no
mount, effectively unlimited scale, many consumers at once).

```bash
az disk create \
  --resource-group rg-storage-lab \
  --name vm01-datadisk \
  --size-gb 128 \
  --sku Premium_LRS
```

## All three, side by side

| Need | Azure product | Storage type |
|---|---|---|
| Backups, logs, static files, accessed via API | Blob storage | Object storage |
| A fast disk for one VM — OS boot volume, database files | Managed Disks | Block storage |
| A shared filesystem multiple VMs mount at once over SMB/NFS | Azure Files | File storage |

The underlying concepts don't change from course to course — only the product name and the exact
mechanics do. Blob is Azure's object storage. Managed Disks are Azure's block storage. Azure Files
is Azure's file storage.

## Key terms

| Term | Meaning |
|---|---|
| Azure Files | Azure's file-storage product — an SMB/NFS share multiple VMs can mount simultaneously |
| Managed Disk | Azure's block-storage product — raw storage attached to exactly one VM |
| Mount | Attaching a file share or disk so a VM's operating system can read/write it as a filesystem |
| Quota (file share) | The maximum size, in GiB, provisioned for an Azure file share |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: a three-server web farm all needs
to write to the same uploaded-images folder at once — why would Azure Files fit that job better than
either Blob storage or a Managed Disk?
