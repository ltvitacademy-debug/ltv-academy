# Script — Database Options

## Segment 1 (title)

Every database carries behavioral switches you flip with ALTER DATABASE SET. Most default settings are fine — a few are actively wrong for production, and not knowing which is which causes mystery performance issues later.

## Segment 2 (code: READ_COMMITTED_SNAPSHOT and PAGE_VERIFY)

READ_COMMITTED_SNAPSHOT ON switches READ COMMITTED to row versioning, so readers stop blocking behind writer locks — it must be set with no other active connections. PAGE_VERIFY CHECKSUM writes and verifies a per-page checksum on every I/O to catch corruption, and has been the default since SQL Server 2005.

## Segment 3 (steps: the anti-patterns)

Two settings sound helpful but usually aren't. AUTO_CLOSE shuts the database down between connections and fights connection pooling. AUTO_SHRINK automatically shrinks files, which causes serious index fragmentation for space savings that often just grow right back.

## Segment 4 (outro)

Know which defaults to trust and which to override deliberately. Next up: recovery models — SIMPLE, FULL, and BULK_LOGGED, and the real tradeoffs between them.
