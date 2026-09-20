# Script — Replication Troubleshooting

## Segment 1 (title)

Monitoring tells you that something's wrong. This lesson covers the three failure modes behind most real transactional replication incidents, and one gotcha experienced DBAs usually learn the hard way exactly once.

## Segment 2 (steps: three real failure modes)

A stalled Distribution Agent shows pending commands climbing for one subscriber while the Log Reader Agent keeps working fine. Identity range exhaustion happens when a server's assigned identity range runs out. And plain DDL on a published table, without going through a replication-aware path, can silently desync the publisher and subscriber schema.

## Segment 3 (code: the classic gotcha)

When an identity column is replicated, SQL Server can assign separate, non-overlapping ranges to the publisher and each subscriber so inserts never collide. It's easy to forget those ranges exist at all until one runs out, often on the subscriber side, months into an otherwise healthy setup.

## Segment 4 (outro)

All three failure modes trace back to the same idea: publisher and subscriber are loosely coupled, and nothing keeps them in sync automatically. Next up: this course shifts to disaster recovery planning, starting with what a real DR plan document actually contains.
