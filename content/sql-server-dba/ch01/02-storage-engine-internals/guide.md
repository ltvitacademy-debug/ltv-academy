# Storage Engine Internals

Lesson 1 named the storage engine as one of the Database Engine's two subsystems. This
lesson goes inside it: the actual units SQL Server uses to store data on disk, how those
units get cached in memory, and the two background processes that keep memory and disk in
sync.

## What you'll learn

- Pages and extents — the physical units SQL Server stores data in
- The buffer pool and why it dominates SQL Server's memory footprint
- The checkpoint process and the lazy writer, and how they differ

## Pages and extents

Every data file in SQL Server is divided into **8 KB pages** — the fundamental unit of I/O.
SQL Server always reads and writes whole pages, never partial ones. A page holds a 96-byte
header (page number, object it belongs to, free space info) plus roughly 8,060 bytes
available for actual row data. Different page types exist for different jobs: data pages
hold table rows, index pages hold index entries, and specialized pages (GAM, SGAM, PFS,
IAM) track allocation — which pages belong to which object and which are free.

Pages are grouped into **extents** — eight contiguous pages (64 KB) at a time. SQL Server
allocates extents in two flavors:

- **Uniform extents**, where all eight pages belong to a single object. Once a table or
  index grows past a small size, SQL Server allocates uniform extents to it.
- **Mixed extents**, where the eight pages can belong to different objects. Small,
  newly-created objects start here so a tiny table doesn't waste 64 KB it doesn't need.

## The buffer pool

Reading from disk is orders of magnitude slower than reading from RAM, so SQL Server
caches data pages in memory in an area called the **buffer pool** — by far the largest
consumer of memory in a typical SQL Server instance. When a query needs a page, the storage
engine checks the buffer pool first. A **logical read** (page already cached) costs
essentially nothing; a **physical read** (page not cached, must come from disk) is the
expensive path. This is exactly why Lesson 1 tied "too little RAM" to "constant physical
disk reads" — a small buffer pool can't hold enough of the working set, so pages get
evicted and re-read from disk over and over.

Pages in the buffer pool that have been modified but not yet written back to disk are
called **dirty pages**. A page can serve reads and writes straight out of memory long
before it's persisted to the data file — which is exactly why the transaction log, not the
data file, is what guarantees durability (a later lesson covers recovery models and
logging in depth).

## Checkpoint and the lazy writer

Two background processes keep the buffer pool from growing unbounded and keep the data
files reasonably current:

- **Checkpoint** runs periodically (and on events like a clean service stop) and writes all
  current dirty pages from the buffer pool to disk. This shortens the amount of transaction
  log SQL Server would need to replay during crash recovery — checkpoint doesn't free
  buffer pool memory by itself, it just makes disk and memory consistent.
- The **lazy writer** is the process that actually manages buffer pool memory pressure. It
  periodically scans for pages that haven't been used recently, writes them to disk if
  they're dirty, and frees the memory so the buffer pool can cache other pages the workload
  actually needs right now.

Together, checkpoint keeps the data files current for recovery purposes, and the lazy
writer keeps the buffer pool populated with the pages that matter most.

## Key terms

| Term | Meaning |
|---|---|
| Page | The 8 KB fundamental unit of storage and I/O in SQL Server |
| Extent | A group of eight contiguous pages (64 KB); uniform (one object) or mixed (several objects) |
| Buffer pool | The in-memory cache of data pages; the largest memory consumer in a typical instance |
| Dirty page | A page in the buffer pool that's been modified but not yet written to disk |
| Checkpoint | Background process that writes dirty pages to disk to shorten crash recovery time |
| Lazy writer | Background process that frees buffer pool memory by evicting and flushing unused pages |

## Check yourself

A server has plenty of free RAM, yet a report query is still hitting disk heavily on every
run. What would you check first about the buffer pool to understand why?
