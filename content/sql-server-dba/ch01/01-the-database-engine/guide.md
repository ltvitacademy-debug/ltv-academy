# The Database Engine

This course assumes T-SQL Development and T-SQL for Database Administrators — you can
already write T-SQL and use it to diagnose problems. This course is different again: it's
general, on-prem-flavored SQL Server administration — installation, configuration,
architecture, security, maintenance, Agent, and production support — before Azure enters
the picture at all. The Azure Database Administrator course, later in this path, builds on
top of everything here.

## What you'll learn

- What "the Database Engine" actually refers to inside SQL Server
- The major components that make it up
- Why a DBA needs an architectural mental model, not just query syntax

## SQL Server isn't one program

"SQL Server" is really a family of cooperating services, and the **Database Engine**
(`sqlservr.exe`) is the core one — the process that actually stores data, executes T-SQL,
and manages transactions. Alongside it, a typical installation also runs SQL Server Agent
(job scheduling), SQL Server Browser (instance name resolution for named instances), and
optionally Analysis Services, Integration Services, and Reporting Services as entirely
separate services. This course focuses on the Database Engine and Agent — the two every
DBA touches daily.

## Inside the Database Engine

The Database Engine itself breaks into two major subsystems:

1. **The relational engine** (also called the query processor) — parses T-SQL, builds and
   optimizes execution plans, and executes them. This is where the query optimizer lives.
2. **The storage engine** — manages how data physically sits on disk and in memory: pages,
   extents, the buffer pool, the transaction log, and lock management. Lesson 2 goes deep
   on this.

A single T-SQL statement passes through both: the relational engine decides *how* to
retrieve the data, and the storage engine actually reads or writes the pages.

## Why the architecture matters to a DBA

A developer can often get by treating SQL Server as a black box: send a query, get rows
back. A DBA can't. Understanding that the buffer pool caches data pages in memory explains
why a server with too little RAM causes constant physical disk reads. Understanding that
the transaction log is written sequentially, ahead of the data file, explains why a slow
disk under the log file tanks write performance even when the data file is on fast
storage. Every diagnostic instinct this course builds — where to look when something's
slow, what to check when something won't start — traces back to this architecture.

## Key terms

| Term | Meaning |
|---|---|
| Database Engine | The core SQL Server process (`sqlservr.exe`) that stores data and executes T-SQL |
| Relational engine | The subsystem that parses, optimizes, and executes T-SQL (the query optimizer lives here) |
| Storage engine | The subsystem managing physical data storage: pages, buffer pool, transaction log |
| Instance | One installed, running copy of the Database Engine, hosting one or more databases |

## Check yourself

A query is running slowly. Is that more likely a relational-engine problem or a
storage-engine problem — and how would you start telling the difference?
