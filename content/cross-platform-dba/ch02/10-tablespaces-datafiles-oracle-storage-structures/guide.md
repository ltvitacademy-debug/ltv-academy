# Tablespaces, Datafiles & Oracle Storage Structures

Lesson 6 established that "the database" means physical files on disk. This lesson goes one
layer deeper into how Oracle organizes those files — the logical/physical storage hierarchy
every piece of data in an Oracle database lives inside, and the handful of tablespaces every
database needs just to function.

## What you'll learn

- The storage hierarchy: tablespace, datafile, extent, block
- The mandatory tablespaces every Oracle database has, and what each one is for
- An honest comparison to SQL Server's filegroups — where it holds, and where it doesn't

## The storage hierarchy

Oracle organizes storage in four layers, from logical down to physical:

- **Tablespace** — a logical storage unit. Every table, index, and other segment is assigned to
  a tablespace; this is the layer a DBA and a developer mostly think in terms of.
- **Datafile** — the physical file(s) on disk that back a tablespace. A tablespace can span one
  or more datafiles, and a datafile belongs to exactly one tablespace.
- **Extent** — a contiguous group of data blocks, allocated to a segment (like a table or index)
  as it grows. Oracle grows storage extent by extent, not block by block.
- **Block** — the smallest unit of I/O Oracle reads or writes, sized when the tablespace (or
  database) is created, commonly 8KB by default.

So a row you insert lives in a block, inside an extent, inside a datafile, inside a tablespace —
four layers, each with a distinct job.

## The tablespaces every database needs

A fresh Oracle database is never just "your data." It comes with mandatory tablespaces that
exist before you create anything of your own:

- **SYSTEM** — holds the core data dictionary: the metadata describing every object in the
  database. Oracle itself depends on this being healthy.
- **SYSAUX** — an auxiliary tablespace, split off from SYSTEM specifically to reduce contention
  on it; holds data for tools like the Automatic Workload Repository (AWR) and other Oracle
  components.
- **UNDO** — holds undo data: the "before" version of rows being changed, used for read
  consistency (so a long-running query sees a consistent snapshot) and for rolling back
  uncommitted transactions.
- **TEMP** — a temporary tablespace used for sorts, hash joins, and other operations that spill
  to disk when they don't fit in memory. TEMP is backed by *tempfiles*, a distinct file type
  from regular datafiles.

Beyond these, a DBA creates additional, ordinary tablespaces to hold actual application data —
separating, for example, a `USERS` tablespace for application tables from an `INDEXES`
tablespace for their indexes, though this is a design choice, not a requirement.

## An honest comparison to SQL Server filegroups

It's tempting to say "a tablespace is just a filegroup." That's close enough to be a useful
starting intuition — both are a logical grouping of one or more physical files that objects get
assigned to — but treat it as a starting point, not an equivalence:

- SQL Server doesn't have a direct parallel to Oracle's UNDO tablespace; SQL Server handles row
  versioning and rollback through the transaction log and, for read consistency, the `tempdb`
  version store — a different mechanism entirely, not a relabeled UNDO tablespace.
- Every Oracle database is built around mandatory SYSTEM/SYSAUX tablespaces in a way that isn't
  optional the way a SQL Server DBA choosing to use multiple filegroups is optional.

Use the filegroup analogy to get oriented quickly. Don't use it to predict Oracle's behavior in
detail — that's exactly the kind of relabeling this course keeps warning against.

## Key terms

| Term | Meaning |
|---|---|
| Tablespace | Logical storage unit that tables, indexes, and other segments are assigned to |
| Datafile | Physical file on disk backing a tablespace |
| Extent | Contiguous group of blocks allocated to a segment as it grows |
| Block | Smallest unit of I/O Oracle reads/writes, typically 8KB by default |
| SYSTEM tablespace | Holds the core data dictionary |
| UNDO tablespace | Holds undo data for read consistency and rollback |

## Check yourself

Name the four layers of Oracle's storage hierarchy in order from most logical to most physical,
and explain one way the UNDO tablespace shows that "tablespace = filegroup" isn't a perfectly
safe equivalence.
