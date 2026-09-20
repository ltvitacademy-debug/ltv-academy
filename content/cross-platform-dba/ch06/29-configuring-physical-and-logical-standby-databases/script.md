# Script — Configuring Physical & Logical Standby Databases

## Segment 1 (title)

Oracle Data Guard Fundamentals treated standby database as one concept, but it's actually two, kept in sync by genuinely different mechanisms.

## Segment 2 (code: physical standby)

A physical standby is a block-for-block identical copy of the primary, kept current through Redo Apply, which is really just continuous media recovery. It's the simplest, safest default, and with Active Data Guard licensed it can even serve read-only queries while apply keeps running in the background.

## Segment 3 (code: logical standby)

A logical standby starts as a physical standby, then gets converted. From there it's kept current by SQL Apply — redo gets mined by LogMiner and replayed as the actual SQL statements that produced it. The result is logically identical data, but not physically identical, and it stays open read-write for its own extra objects.

## Segment 4 (steps: choosing between them)

Physical is the default — simpler, with no data-type or DDL limitations. Logical is the specialized tool: extra objects, continuously open read-write, but SQL Apply doesn't support every data type or every DDL operation, so it isn't a guaranteed drop-in replacement.

## Segment 5 (outro)

Both standby types still assume one primary instance running the show. Next up: Oracle RAC, where multiple instances share a single database at the same time.
