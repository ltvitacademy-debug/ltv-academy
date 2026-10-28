# Lesson 30 — Cloud Storage Types: Object, Block & File

**Chapter 7 · Cloud Networking & Storage Concepts · Lesson 30 of 32**

## What you'll learn

- The three real categories of cloud storage, and what each one is actually built for
- Why object storage works so well for unstructured data, backups, and static files
- Why block storage behaves like a hard drive attached to a single VM
- Why file storage exists for the case neither of the other two solves: a shared filesystem multiple machines can mount at once

## Object storage: flat, API-driven, built for unstructured data

**Object storage** stores data as whole objects — a file plus metadata plus a unique key — in a
flat structure with no real folder hierarchy underneath it, accessed over HTTP/API calls rather
than a traditional filesystem. **AWS S3** and **Azure Blob Storage** are the real-world examples.
You don't mount object storage like a drive; you `PUT` and `GET` objects by key.

```
PUT  https://my-bucket.s3.amazonaws.com/backups/2026-10-28.sql
GET  https://my-bucket.s3.amazonaws.com/images/logo.png
```

That model makes object storage an excellent fit for things that don't need to be edited
in-place and don't need filesystem semantics: database backups, log archives, static website
assets, and large unstructured datasets. It's also effectively infinitely scalable — you don't
provision a fixed size up front the way you do with a disk.

## Block storage: a hard drive, attached to one VM

**Block storage** presents raw, fixed-size blocks of storage that get attached to a single virtual
machine and formatted with a filesystem, exactly like plugging a physical hard drive into a
computer. **AWS EBS (Elastic Block Store)** and **Azure Managed Disks** are the real examples.
Because the VM talks to it at the block level rather than over HTTP, it offers much lower latency
than object storage — which is exactly why it's the right choice for a database's data files or an
operating system's boot volume, both of which need fast, consistent read/write access.

```
EC2 instance "web-01"
  └─ EBS volume (100 GB) attached as /dev/xvdf
     formatted ext4, mounted at /var/lib/mysql
```

The tradeoff: a block storage volume is normally attached to exactly one VM at a time (some
providers offer limited multi-attach modes, but that's the exception, not the default).

## File storage: a shared filesystem, multiple machines at once

**File storage** sits between the two — it's a real, hierarchical filesystem (folders and files,
not flat objects) accessed over a network file-sharing protocol like NFS or SMB, and the key
difference from block storage is that **multiple VMs can mount the same file share
simultaneously**. **AWS EFS (Elastic File System)** and **Azure Files** are the real examples.

```
File share "shared-app-data"
  mounted at /mnt/shared on web-01
  mounted at /mnt/shared on web-02
  mounted at /mnt/shared on web-03
  -> all three see the same files, at the same time
```

That's the case neither object nor block storage solves well: a group of application servers
(behind the load balancer from the last lesson) that all need to read and write the same shared
files, like uploaded user content, at the same time.

## Choosing between the three

| Need | Reach for |
|---|---|
| Store backups, logs, static files, accessed via API | Object storage (S3, Blob Storage) |
| A fast disk for one VM — OS boot volume, database files | Block storage (EBS, Managed Disks) |
| A shared filesystem multiple VMs mount at once | File storage (EFS, Azure Files) |

## Key terms

| Term | Meaning |
|---|---|
| Object storage | Flat, API-accessed storage for whole objects — e.g. AWS S3, Azure Blob Storage |
| Block storage | Raw storage blocks attached to one VM like a hard drive — e.g. AWS EBS, Azure Managed Disks |
| File storage | A shared, hierarchical filesystem multiple VMs can mount at once — e.g. AWS EFS, Azure Files |
| Unstructured data | Data without a fixed schema (images, logs, backups) — object storage's typical use case |

## Check yourself

A team needs three application servers to all read and write the same set of uploaded user files
at the same time. Which of the three storage types fits, and why would the other two fall short?
