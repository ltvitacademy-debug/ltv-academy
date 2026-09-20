# Database Options

Beyond files and filegroups, every database carries a set of behavioral switches you flip
with `ALTER DATABASE ... SET`. Most of these have sane defaults, but a few default settings
are actively wrong for a busy production database, and a DBA who doesn't know which ones —
and why — inherits problems that look like mysterious performance issues later.

## What you'll learn

- Two options that sound helpful but are real anti-patterns on production databases
- One option that changes how readers and writers interact
- The corruption-detection setting that should always be on

## AUTO_CLOSE and AUTO_SHRINK: sound helpful, usually aren't

`AUTO_CLOSE` shuts a database down and releases its resources when the last connection
closes, then reopens it on the next connection. On a busy server this simply doesn't matter
— there's never a moment with zero connections — but on a lightly-used database it means
every reopen pays a cold-start cost, and it fights connection pooling, which assumes a
database stays warm between requests. It defaults to `OFF` everywhere except SQL Server
Express, and a DBA should leave it off.

`AUTO_SHRINK` periodically shrinks data and log files to reclaim free space automatically.
It sounds like good hygiene; in practice it's one of the most reliably bad settings in SQL
Server. Shrinking moves pages to compact the file, which causes serious index
fragmentation, and the file often just grows right back on the next load — so you pay the
fragmentation cost repeatedly for no lasting space savings. It also defaults to `OFF`
outside Express. Size files deliberately instead of relying on this.

## READ_COMMITTED_SNAPSHOT: changes how readers and writers meet

By default, SQL Server's READ COMMITTED isolation level uses locking: a reader can block
behind a writer's locks. `READ_COMMITTED_SNAPSHOT ON` switches READ COMMITTED to use row
versioning instead — readers see a transactionally consistent snapshot from just before
their statement started, without taking locks or blocking writers. This eliminates a huge
class of reader/writer blocking, at the cost of extra work in tempdb to store the version
store. It must be set with no other active connections in the database:

```sql
ALTER DATABASE Sales
    SET READ_COMMITTED_SNAPSHOT ON
    WITH ROLLBACK IMMEDIATE;
```

## PAGE_VERIFY: leave it on CHECKSUM

`PAGE_VERIFY` controls how SQL Server detects a page that was corrupted on the way to or
from disk. `CHECKSUM` computes and stores a checksum for every page on write, and verifies
it on every read — catching torn pages and most storage-layer corruption. It's been the
default since SQL Server 2005. The legacy `TORN_PAGE_DETECTION` catches less, and `NONE`
catches nothing. There's essentially never a reason to run anything but `CHECKSUM`.

```sql
ALTER DATABASE Sales SET PAGE_VERIFY CHECKSUM;
```

## Key terms

| Term | Meaning |
|---|---|
| AUTO_CLOSE | Shuts the database down between connections; fights pooling, should stay off |
| AUTO_SHRINK | Automatically shrinks files; causes fragmentation, real anti-pattern |
| READ_COMMITTED_SNAPSHOT | Row-versioning READ COMMITTED; readers stop blocking behind writer locks |
| PAGE_VERIFY CHECKSUM | Per-page checksum written and verified on every I/O to detect corruption |

## Check yourself

A vendor's setup script leaves `AUTO_SHRINK` on for a database that grows by a few GB every
night and shrinks every weekend. What's actually happening to that database's indexes, and
what would you tell the vendor?
