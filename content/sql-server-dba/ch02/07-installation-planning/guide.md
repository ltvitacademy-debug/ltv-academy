# Installation Planning

## What you'll learn

- Why installing SQL Server is a design decision, not a next-next-finish wizard
- The concrete pre-install checklist: accounts, collation, file layout, memory/MAXDOP
- Which of these decisions are cheap to change later, and which are painful to redo

## Installation is the cheapest time to get this right

Every decision in this lesson can, in theory, be changed after the fact. In practice, some are
a five-minute `sp_configure` change, and some mean rebuilding the instance or migrating every
database. Planning before setup.exe runs is what separates a smooth production rollout from a
DBA quietly fixing collation mismatches for the next two years.

## Service accounts

Decide, before install, what account runs the Database Engine service and what account runs
Agent. Best practice is a dedicated least-privilege account per service — never Local System —
so that a compromised service can't leverage broad machine privileges, and so that different
services can be audited and permissioned independently. On a domain, that's typically a
**group Managed Service Account (gMSA)**; the setup wizard needs these accounts (and their
passwords, if not gMSA) ready to enter, not decided mid-install. Lesson 13 covers this in full.

## Collation choice

Collation determines sort order, and case/accent sensitivity, for every character comparison
in every database that uses the server-level default (each database can override it, but
usually doesn't). `SQL_Latin1_General_CP1_CI_AS` is the common default for English-language
installs — case-insensitive, accent-sensitive. **This is one of the expensive-to-change
decisions**: changing an instance's collation after the fact effectively means rebuilding every
system database and often reloading user data, because collation affects how `master`, `model`,
`msdb`, and `tempdb` themselves compare data. Pick the collation to match what your
organization's other SQL Server instances already use — a mismatch between databases (or
between a database and tempdb) causes real, painful `COLLATION CONFLICT` errors on any query
that compares strings across them. Lesson 12 goes deep on this.

## File layout

Plan where data files, log files, and tempdb files will physically live *before* install, not
after. The classic guidance — data files, log files, and tempdb on separate physical disks (or
at minimum, separate storage paths) — exists because the transaction log is written
sequentially and benefits from dedicated, low-latency I/O, while data file access is far more
random. Decide the drive letters/paths for each now; moving files after go-live means planned
downtime later.

## Memory and MAXDOP planning

Two settings you should have a plan for, even though you set them post-install (Lesson 9 covers
the exact steps):

- **Max server memory** — how much RAM you'll leave for the OS and other software sharing the
  box (or Analysis Services, SSIS, other instances) versus what the Database Engine can consume.
  Left at its default (effectively unlimited), the Engine will happily take memory the OS needs.
- **Max degree of parallelism (MAXDOP)** — how many CPU cores a single query can use in a
  parallel plan. The right value depends on core count and workload (OLTP vs. reporting), which
  is why this is a "have a plan, then verify after install" item rather than something to guess
  at during setup.

## Sizing considerations

Estimate expected database growth over the first year or two, not just current size, so initial
file sizes and autogrowth aren't fighting default settings from day one. Undersized files that
autogrow constantly in small increments fragment storage and cause pauses during growth events
(Lesson 23 covers file growth strategy in depth) — planning realistic starting sizes up front
avoids that entirely.

## Key terms

| Term | Meaning |
|---|---|
| Service account | The Windows account under which a SQL Server service (Engine, Agent) runs |
| gMSA | Group Managed Service Account — a domain-managed account with automatic password rotation |
| Collation | Rules governing sort order and case/accent sensitivity for character data |
| MAXDOP | Max degree of parallelism — how many cores a single query's parallel plan can use |

## Check yourself

Of service accounts, collation, and file layout, which one is the most expensive to change
after go-live, and why does that make it the one to get right before install rather than after?
