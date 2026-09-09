# Lesson 2 — Blob Storage vs. ADLS Gen2

**Chapter 1 · Azure Data Lake & Storage · Lesson 2 of 62**

## What you'll learn

- What plain **Blob storage** actually is, underneath everything
- The one setting that turns it into **ADLS Gen2**
- Why that one setting matters enough to build an entire chapter around
- What you'd lose by skipping it

## Blob storage: a flat namespace of keys

Plain Azure Blob storage stores every object as a **key** inside a
**container** — technically, it's a flat namespace. A blob named
`sales/2024/01/orders.csv` *looks* like it lives in nested folders, but
under the hood, `sales/2024/01/orders.csv` is just one long string key.
There's no real folder `sales`, no real subfolder `2024/01` — just a blob
whose name happens to contain slashes.

## ADLS Gen2: the same storage, with real folders

**Azure Data Lake Storage Gen2** isn't a separate product — it's Blob
storage with one feature switched on: the **hierarchical namespace**.
That single setting is the entire difference:

![The Advanced tab of the Create a storage account wizard in the Azure Portal, showing the Hierarchical Namespace section with an \"Enable hierarchical namespace\" checkbox highlighted, and descriptive text about file/directory semantics and ACLs.](/courses/de-foundations/ch01/02-blob-vs-adls-gen2/hierarchical-namespace-feature.png)
*One checkbox. Leave it unchecked and you have plain Blob storage; check it, and the exact same account becomes ADLS Gen2.*

With hierarchical namespace **on**, `sales/2024/01/` becomes a real
directory object — not a naming convention, an actual entry in the
storage account's own index. That unlocks:

- **True file and directory semantics** — renaming a directory renames
  everything under it in one atomic operation, instead of the storage
  service having to rewrite every individual blob whose name started
  with that prefix
- **ACLs** (Lesson 5) — permissions can be set on directories, not just
  simulated with naming conventions
- **Faster big-data operations** — analytics engines like Spark
  (Chapters 3–4) can list, move, and delete directories far more
  efficiently against a real hierarchy than against millions of
  independently-named flat blobs

## Why this is worth an entire chapter

Every remaining lesson in this chapter — Containers and Directories,
Hierarchical Namespace itself, RBAC vs. ACLs, Zones, Bronze/Silver/Gold —
assumes hierarchical namespace is turned **on**. A data lake, in the
sense this whole course means it, *is* an ADLS Gen2 account: Blob storage
with that one checkbox checked, holding folders of raw files that Chapters
2–4's Python and Spark code will read, transform, and rewrite.

## What you'd lose by skipping it

You could technically build a "data lake" on plain Blob storage — many
early Hadoop-era systems did exactly that, faking folders with blob-name
prefixes. But every directory-level operation (rename, move, list) would
require the storage service to iterate every matching blob individually,
instead of updating one directory entry — a real performance and
correctness cost at the scale this course's NYC Taxi data reaches.

## Key terms

| Term | Meaning |
|---|---|
| Blob storage | Flat key-value object storage — "folders" are just naming conventions |
| Hierarchical namespace | The feature that gives a storage account real directory objects |
| ADLS Gen2 | Blob storage with hierarchical namespace enabled — not a separate product |

## Lab

In the Azure Portal, walk through creating a storage account (without
finishing — no need to actually create one for this lab):

1. Open **Create a storage account** → the **Advanced** tab.
2. Find the **Hierarchical Namespace** section and read Microsoft's own
   description of what checking it enables.
3. Note: this checkbox is by far the easiest way to get ADLS Gen2 — set
   it once, at creation time, and never think about it again. Lesson 4
   covers the harder path: Microsoft does offer an official *upgrade*
   for an existing Blob-only account, but it's one-way, requires
   disabling several features first, and isn't guaranteed to pass
   validation.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: what
single setting turns Blob storage into ADLS Gen2, and why can't `sales/
2024/01/` be renamed atomically without it?
