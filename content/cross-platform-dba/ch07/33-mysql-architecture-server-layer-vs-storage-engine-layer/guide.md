# MySQL Architecture: Server Layer vs. Storage Engine Layer

SQL Server, Oracle, and PostgreSQL each have one storage engine — the way they write rows to
disk, lock them, and index them is baked into the product. MySQL doesn't work that way. MySQL
splits into two layers, and the bottom layer is genuinely swappable per table. That's not a
minor implementation detail — it changes how you think about every MySQL table you touch.

## What you'll learn

- The two-layer split: server layer on top, storage engine layer underneath
- What each layer is actually responsible for
- Why "pluggable storage engines" is a real architectural difference, not marketing language
- How a single MySQL database can mix storage engines table by table

## The server layer: everything before storage

The server layer is the part of MySQL that has nothing to do with how bytes land on disk. When
a client connects, the connection layer authenticates it and hands it a thread. The parser takes
the SQL text and turns it into a parse tree. The optimizer decides how to execute the query —
join order, index choice, access path. None of this layer knows or cares whether the underlying
table is InnoDB, MyISAM, or something else. It produces a plan expressed in terms of a generic
storage engine API: "fetch the next row," "seek by this key," "insert this row." Prior to MySQL
8.0 there was also a query cache living in this layer, caching full result sets by exact SQL
text; it was removed in 8.0 because it scaled badly on write-heavy workloads.

## The storage engine layer: pluggable by design

Below the server layer sits the storage engine layer, and this is where MySQL genuinely departs
from SQL Server, Oracle, and PostgreSQL. Each storage engine is a separate implementation of the
same engine API — it decides how rows are physically stored, whether locking happens at the row
or table level, whether transactions and foreign keys exist at all, and how indexes are built.
InnoDB is the modern default: row-level locking, full ACID transactions, foreign keys, crash
recovery via its own redo log. MyISAM is the older engine: table-level locking, no transactions,
no foreign keys, but historically fast for read-heavy, write-light workloads. Other engines exist
for narrower purposes — Memory (HEAP) keeps tables entirely in RAM for temp-table-style speed,
Archive is a compact, insert-only engine for logging data, and CSV stores rows as literal
comma-separated files. SQL Server's storage engine, Oracle's, and PostgreSQL's are not swappable
this way — there is exactly one way each of those engines stores a row, full stop.

## Why this matters: engine choice is a per-table decision

Because the storage engine is pluggable, it's chosen with `CREATE TABLE ... ENGINE = InnoDB` (or
changed later with `ALTER TABLE ... ENGINE = InnoDB`), and different tables in the same database
can use different engines. A production schema might have InnoDB for every transactional table
and an Archive table for an old audit log nobody queries anymore but nobody wants to delete
either. `SHOW ENGINES;` lists every engine compiled into the running server and shows which one
is the default. As a SQL Server or Oracle DBA, the instinct to ask "how does this engine handle
locking, and does it support transactions" has to become a per-table question in MySQL, not a
per-server question.

## Key terms

| Term | Meaning |
|---|---|
| Server layer | Connection handling, SQL parsing, and the optimizer — storage-engine-agnostic |
| Storage engine layer | The pluggable component that decides how rows are physically stored, locked, and indexed |
| Storage engine API | The generic interface (fetch, seek, insert, etc.) the server layer uses to talk to any engine |
| `ENGINE = ...` | The `CREATE TABLE`/`ALTER TABLE` clause that selects a table's storage engine |
| `SHOW ENGINES;` | Lists every storage engine available on the running server and the default |

## Check yourself

Why can two tables in the same MySQL database legitimately use two different storage engines,
and why would that statement not make sense if you said it about two tables in the same SQL
Server database?
