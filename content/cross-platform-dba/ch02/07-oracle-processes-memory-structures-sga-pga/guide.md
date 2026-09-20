# Oracle Processes, Memory Structures & the SGA/PGA

The previous lesson established that an Oracle instance is background processes plus shared
memory. This lesson opens that up: which background processes, doing what, and which memory
regions, holding what. None of this maps cleanly onto SQL Server's buffer pool — Oracle's
architecture has more explicit, named moving parts, and knowing their actual jobs matters the
first time you're reading an alert log or diagnosing a stall.

## What you'll learn

- The core background processes every Oracle instance runs, and what each one actually does
- The System Global Area (SGA) and its main components
- The Program Global Area (PGA), and why it's fundamentally different from the SGA
- Why this matters the moment something in the instance misbehaves

## Core background processes

Every started Oracle instance runs a set of mandatory background processes. The ones you'll
encounter constantly:

- **PMON (Process Monitor)** — cleans up after a failed user process: releasing locks, rolling
  back incomplete transactions, freeing resources that process was holding.
- **SMON (System Monitor)** — performs instance recovery after a crash, and does ongoing
  housekeeping like coalescing free space in tablespaces.
- **DBWn (Database Writer)** — writes modified ("dirty") buffers from the buffer cache out to
  the datafiles on disk. There can be more than one (`DBW0`, `DBW1`, ...) on systems with heavy
  write load.
- **LGWR (Log Writer)** — writes entries from the redo log buffer in memory out to the online
  redo log files on disk. This is the process standing between "a transaction committed" and
  "that change is durably recorded."
- **CKPT (Checkpoint)** — signals a checkpoint, updating the control file and datafile headers
  with the current checkpoint position so instance recovery knows where to start.

## The SGA: shared memory for the whole instance

The **System Global Area (SGA)** is a block of memory allocated once when the instance starts,
shared by every server process connected to it. Its major components:

- **Database buffer cache** — caches data blocks read from datafiles, so repeated reads of the
  same data don't hit disk every time.
- **Shared pool** — caches parsed SQL statements and their execution plans (the library cache),
  plus data dictionary information the instance needs constantly.
- **Redo log buffer** — a small, fast buffer that holds redo entries in memory before LGWR
  flushes them to the online redo log files.

Everything in the SGA is shared. Any server process handling any session can read from the
buffer cache or the shared pool — that's the point of it being a *system* global area.

## The PGA: private memory per process

The **Program Global Area (PGA)** is the opposite of the SGA in one key respect: it's private,
per-process memory, not shared. Every server process handling a session gets its own PGA, used
for things like sort areas (for `ORDER BY`, `GROUP BY`, hash joins), session-specific cursor
state, and other work that has no reason to be visible to any other session.

This SGA/PGA split — one shared region, one private-per-process region — is a genuinely
different mental model from SQL Server's buffer pool, which is a single shared memory space
that also handles most of what Oracle splits out into PGA. Don't go looking in Oracle for one
memory setting that does everything SQL Server's buffer pool does; the responsibilities are
carved up differently on purpose.

## Key terms

| Term | Meaning |
|---|---|
| PMON | Background process that cleans up after failed user processes |
| SMON | Background process that performs instance recovery and space housekeeping |
| DBWn | Background process(es) that write dirty buffers to datafiles |
| LGWR | Background process that writes redo log buffer entries to disk |
| SGA | Shared memory region for the whole instance (buffer cache, shared pool, redo log buffer) |
| PGA | Private memory allocated per server process, not shared across sessions |

## Check yourself

A transaction just committed. Name the two Oracle components — one process, one memory
structure — most directly responsible for making sure that commit is durable on disk, and
explain the role each one plays.
