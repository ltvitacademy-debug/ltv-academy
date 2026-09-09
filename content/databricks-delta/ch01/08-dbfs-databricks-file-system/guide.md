# Lesson 8 — DBFS — Databricks File System

**Chapter 1 · Databricks Fundamentals · Lesson 8 of 57**

## What you'll learn

- DBFS: a filesystem abstraction layered over real cloud storage
- The `%fs` magic command and `dbutils.fs`
- `dbfs:/FileStore/` vs. a mounted ADLS Gen2 path
- Why Databricks now steers new work away from DBFS root, toward Unity Catalog volumes

## DBFS: a filesystem view over cloud storage

**DBFS** (Databricks File System) is a filesystem abstraction that
lets you address cloud storage — including Foundations' ADLS Gen2 —
using ordinary-looking paths like `/mnt/data/file.csv`, instead of
each cloud provider's own storage API. It's a convenience layer, not
a separate physical disk: the actual bytes still live in whatever
cloud storage account is backing it.

## Browsing and moving files

```
%fs ls /FileStore/

%fs cp /FileStore/sample.csv /tmp/sample.csv
```

```python
dbutils.fs.ls("/FileStore/")
dbutils.fs.cp("/FileStore/sample.csv", "/tmp/sample.csv")
```

`%fs` is the magic-command shortcut (Lesson 6); `dbutils.fs` is the
same functionality called directly from Python, useful anywhere a
magic command wouldn't fit — inside a function, for example.

## DBFS root vs. a mounted path

`dbfs:/FileStore/` (and the rest of "DBFS root") is storage
Databricks manages for you, workspace-local and easy to reach for
quick uploads and testing. A **mount** — `/mnt/nyc-taxi/` , say — is
a DBFS path pointing at a real, separate ADLS Gen2 container
(exactly the kind Foundations' Chapter 1 built), the same data
potentially shared with other tools outside Databricks entirely.

## Why the guidance has shifted

Databricks now recommends against relying on DBFS root for anything
beyond quick, disposable testing — it has no Unity Catalog
governance (Chapter 4) attached to it at all. For real production
data, a **Unity Catalog volume** (Lesson 45) is the current
recommended path: same idea of addressable file storage, but with
real access control governing who can read or write it. This
lesson's DBFS is still worth knowing — it's the historical default,
still used constantly for scratch work — but Chapter 4 covers the
path real production pipelines should now take.

## Key terms

| Term | Meaning |
|---|---|
| DBFS | A filesystem abstraction over real cloud storage, addressed with ordinary-looking paths |
| DBFS root | Workspace-local storage with no Unity Catalog governance |
| Mount | A DBFS path pointing at a real, separate cloud storage container |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why
does Databricks now steer production data away from DBFS root, and
toward Unity Catalog volumes instead?
