# Lesson 3 — Containers and Directories

**Chapter 1 · Azure Data Lake & Storage · Lesson 3 of 62**

## What you'll learn

- What a **container** is, and why every blob lives inside exactly one
- What a **directory** adds on top of that, once hierarchical namespace
  (Lesson 2) is turned on
- How the two levels nest together in a real path
- The real Azure Portal blade where containers get created and managed

## Containers: the top level

A **container** is the top-level organizational unit inside a storage
account — every single blob you ever store belongs to exactly one
container, and a container's name must be unique within its storage
account. Containers are also the boundary for a few important settings:
access level (public vs. private) and, later in this course, some
permission scopes.

![The Containers blade of an Azure storage account in the Azure Portal, showing a list of existing containers and the New container panel open on the right with a Name field and Anonymous access level dropdown.](/courses/de-foundations/ch01/03-containers-and-directories/create-container-sml.png)
*Every container in a storage account is managed from exactly this blade — a flat list, one level, right under the account itself.*

## Directories: the level underneath, once hierarchical namespace is on

With ADLS Gen2's hierarchical namespace enabled (Lesson 2), **inside** a
container you get real **directories** — nested exactly like a normal
file system, as many levels deep as you want:

```text
container: taxi-data
└── raw/
    └── yellow/
        └── 2024/
            └── 01/
                └── trip-data.csv
```

`raw/yellow/2024/01/` is a real, distinct object in ADLS Gen2 — not a
naming convention. You can list just that directory's contents, rename
it, or delete it as one atomic operation, exactly like Lesson 2 covered.

## How the two levels nest

Every path in this course follows the same shape:
`container / directory / directory / ... / file`. The **container** is
always the first segment and is fixed at creation time; everything after
it is the directory structure you design yourself, and — unlike the
container level — you can restructure it freely, since it's just
directory objects inside one container, not separate top-level resources.

```text
taxi-data/raw/yellow/2024/01/trip-data.csv
└───┬───┘└──────────┬──────────┘└────┬────┘
 container        directories        file
```

## Why this distinction matters going forward

Lesson 10 (Designing a Data Lake) and Lesson 11 (Raw, Cleansed, and
Curated Zones) both build directly on this: most real data lakes use a
**small number of containers** (sometimes just one) and do almost all of
their real organizational work with **directories** underneath — because
directories are free to create, rename, and restructure, while containers
are a heavier, more fixed unit of organization.

## Key terms

| Term | Meaning |
|---|---|
| Container | The top-level unit inside a storage account; every blob belongs to exactly one |
| Directory | A real nested folder object inside a container, available once hierarchical namespace is on |
| Path | container / directory path / file — the full address of any object |

## Lab

In the Azure Portal:

1. Open a storage account → **Containers** (left navigation, under
   **Data storage**).
2. Click **+ Container**, and note the two settings on the **New
   container** panel: **Name** and **Anonymous access level**.
3. If you have an ADLS Gen2-enabled account, open a container and use
   **+ Add Directory** (or **New Folder**, depending on portal version)
   to create a nested path like `raw/yellow/2024/01`.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: what's
fixed about a container that isn't fixed about a directory, and why does
that make directories the better place to do most of your organizational
work?
