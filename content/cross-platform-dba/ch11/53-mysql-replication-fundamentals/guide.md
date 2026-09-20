# MySQL Replication Fundamentals

Every SQL Server DBA on this path already understands replication as a concept — a source
of truth streams changes to one or more copies, and those copies lag by some amount of time.
MySQL replication is built on the same core idea, but the mechanism underneath it, and even
the vocabulary MySQL uses to describe it, is genuinely its own. This lesson covers how MySQL
replication actually works before the next lesson configures it.

## What you'll learn

- How binary log (binlog) based replication actually moves changes from one server to another
- The three threads involved in traditional MySQL replication and what each one does
- Why MySQL retired "master/slave" terminology in favor of "source/replica"

## The binary log is the foundation of everything

Every form of MySQL replication — traditional asynchronous replication, semisynchronous
replication, and even Group Replication — is built on top of the same underlying mechanism:
the **binary log**, or binlog. The binlog is a set of files that a MySQL server writes to
whenever binary logging is enabled, recording every change that modifies data: inserts,
updates, deletes, and schema changes. It exists independently of replication — a standalone
server with binary logging enabled writes a binlog purely for point-in-time recovery, the
same role covered in the backup chapters. Replication is what happens when a second server
reads that binlog and replays it.

This matters because it reframes what replication actually is in MySQL: it isn't a separate
subsystem bolted onto the server, it's a second consumer of a log the server was already
producing. A DBA who understands the binlog's role in recovery already understands most of
what replication is built on.

Binlog events can be recorded in one of three formats, controlled by `binlog_format`:
**STATEMENT** (the SQL statement itself is logged, which is compact but can behave
differently on the replica for non-deterministic statements), **ROW** (the actual row
changes are logged, which is larger but reproduces the exact result every time), and
**MIXED** (MySQL chooses per-statement). ROW is the default and recommended format in modern
MySQL because it sidesteps the correctness edge cases STATEMENT format can introduce.

## The replication threads: how the copy actually happens

Traditional MySQL replication moves data through three threads spread across two servers:

On the source, a **binlog dump thread** runs for each connected replica. When a replica
connects, this thread reads binlog events from where that replica last left off and streams
them over the network connection. The source doesn't push blindly to a list of replicas — each
replica pulls, and the source serves whichever replica asks.

On the replica, an **I/O thread** connects to the source, requests the binlog dump thread's
stream, and writes what it receives into a local file called the **relay log** — essentially
a temporary holding copy of the source's binlog events. Immediately after that, a separate
**SQL thread** (or, since MySQL 5.6, potentially multiple parallel worker threads) reads the
relay log and applies those events to the replica's own data.

Splitting this into two threads on the replica side is deliberate: the I/O thread can keep
pulling from the source even if applying events is temporarily slower, so the relay log
absorbs the difference. When people talk about "replication lag," they usually mean the gap
between when the I/O thread received an event and when the SQL thread finished applying it.

## Source and replica: MySQL's current terminology

For most of MySQL's history, this relationship was described with the terms "master" and
"slave" — in the configuration syntax, the status commands, and the documentation. MySQL 8.0
completed a terminology change begun in earlier point releases: the server that originates
changes is now consistently called the **source**, and a server that replicates from it is
called a **replica**. `SHOW MASTER STATUS` became `SHOW BINARY LOG STATUS`, `SHOW SLAVE
STATUS` became `SHOW REPLICA STATUS`, and — covered in the next lesson — the configuration
command `CHANGE MASTER TO` became `CHANGE REPLICATION SOURCE TO`.

This isn't cosmetic for a working DBA. Current MySQL documentation, current MySQL 8.0.23+
behavior, and any MySQL instance a DBA touches in a modern environment use source/replica
terminology. Older tutorials, older MySQL 5.7 environments, and plenty of existing scripts
still use master/slave — a cross-platform DBA needs to recognize both, use the current terms
in new work, and know that the underlying mechanism (binlog dump thread, I/O thread, SQL
thread) hasn't changed, only its name.

## Key terms

| Term | Meaning |
|---|---|
| Binary log (binlog) | The log of data-modifying events a MySQL server writes; the basis of both point-in-time recovery and replication |
| Source | MySQL's current term for the server that originates changes (formerly "master") |
| Replica | MySQL's current term for a server that replicates from a source (formerly "slave") |
| Binlog dump thread | Thread on the source that streams binlog events to a connected replica |
| I/O thread | Thread on the replica that pulls binlog events from the source into the relay log |
| SQL thread | Thread on the replica that applies relay log events to the replica's data |
| Relay log | The replica's local, temporary copy of binlog events pulled from the source |
| `binlog_format` | Server variable controlling whether binlog events are STATEMENT, ROW, or MIXED |

## Check yourself

A replica's `SHOW REPLICA STATUS` shows `Seconds_Behind_Source` climbing steadily. Which of
the two replica-side threads is most likely falling behind, and which log file would you
check to see how large the backlog has grown?
