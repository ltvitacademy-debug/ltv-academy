# Oracle Database Architecture: Instance vs. Database

This is the single most important mental reset a SQL Server DBA needs before touching Oracle.
In SQL Server, "instance" and "database" nest cleanly — one instance hosts many databases, and
the word "instance" mostly just means "an installation of the SQL Server service." Oracle uses
both words too, but they point at two genuinely different things, and conflating them will
cause real confusion the first time something goes wrong.

## What you'll learn

- What an Oracle instance actually is — and what it is not
- What an Oracle database actually is, separate from the instance
- Why the two can exist independently, and what that implies operationally
- The multitenant (CDB/PDB) architecture that's now the default shape of an Oracle database

## The instance: memory and processes, not files

An Oracle **instance** is a set of background processes plus a block of shared memory called
the **System Global Area (SGA)**, allocated when the database is started. It exists only in RAM
and in running processes — there is no "instance file" on disk. Shut the instance down, and it's
simply gone; start it again, and a fresh instance is created. Chapter 2's next lesson covers the
specific processes and memory regions that make up an instance in detail.

The instance is the thing that does the work: it's what a client connects to, what parses and
executes SQL, what reads blocks into memory and eventually writes changes back out. But the
instance itself holds no permanent data. If you only think about "the instance," you're only
thinking about half of an Oracle deployment.

## The database: files, not processes

An Oracle **database** is the physical set of files on disk: the **datafiles** that hold actual
table and index data, the **control file(s)** that track the database's physical structure, and
the **redo log files** that record every change for crash recovery. This is data at rest — it
exists whether or not any instance is currently running against it. You could, in principle,
copy those files to another server; you can't copy "an instance" anywhere, because it isn't a
file.

This split is exactly why Oracle's clustering technology, **Real Application Clusters (RAC)**,
is possible at all: RAC lets multiple instances, running on different physical servers, mount
and open the *same single database* at the same time. That configuration only makes sense once
you accept that an instance and a database are two separate things connected by a mount, not one
combined unit — something that has no direct SQL Server parallel.

## Multitenant architecture: one instance, a container of databases

Since Oracle Database 12c, and now the default architecture Oracle steers new deployments
toward, a database is typically built as a **Container Database (CDB)**. A CDB has:

- A **root container** (`CDB$ROOT`) holding Oracle's own metadata and common users, shared
  across everything inside the CDB.
- One or more **Pluggable Databases (PDBs)** — each one looks, to an application connecting to
  it, like a normal, self-contained database with its own data, its own users, its own
  namespace — even though multiple PDBs share the same underlying instance, the same background
  processes, and the same SGA.

This adds a second, orthogonal layer to the instance/database split: one instance can mount one
CDB, and that single CDB can contain many PDBs that behave like independent databases to the
outside world. A SQL Server DBA's closest intuition is "one SQL Server instance hosting several
databases" — genuinely closer here than at the instance/database level, but still not identical,
since a PDB carries its own internal structure that a SQL Server database doesn't.

## Key terms

| Term | Meaning |
|---|---|
| Instance | Background processes + SGA memory, running in RAM; exists only while started |
| Database | The physical datafiles, control files, and redo logs on disk |
| CDB (Container Database) | A database built to hold multiple pluggable databases under one root container |
| PDB (Pluggable Database) | A self-contained-looking database that lives inside a CDB and shares its instance |
| CDB$ROOT | The root container of a CDB, holding Oracle's shared metadata |

## Check yourself

A SQL Server DBA says: "An Oracle instance is just what Oracle calls a database." Using what
you now know about RAC — multiple instances mounting one database — explain why that statement
is wrong.
