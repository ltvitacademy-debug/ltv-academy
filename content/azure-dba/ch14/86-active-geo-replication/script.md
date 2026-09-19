# Script — Active Geo-Replication

## Segment 1 (title)

Active geo-replication is Azure SQL Database's built-in disaster recovery feature — a continuously-updated, readable secondary database in a different Azure region. Where the earlier service tiers solve HA within a region, this is the mechanism that gets you out of the region entirely.

## Segment 2 (code: always asynchronous)

Geo-replication is always asynchronous — there's no synchronous option across regions, since waiting for cross-region confirmation on every write would be impractical. That means a realistic RPO of seconds to low minutes, not zero. A true zero-data-loss cross-region requirement can't be met by geo-replication alone.

## Segment 3 (steps: what secondaries are actually useful for)

A database can have up to four geo-replicated secondaries, each fully readable at all times. That's useful for disaster recovery, for offloading reporting workloads off the primary, and for giving users in another geography a low-latency read copy.

## Segment 4 (screenshot: geo-replication relationship)

This is what it actually looks like once configured — the Azure Portal showing the primary database, its secondary in a different region, and the replication link between them. One primary, one or more independently readable secondaries.

## Segment 5 (outro)

Promoting a secondary today is a manual, explicit failover. Next up: Azure SQL Failover Groups — the layer above geo-replication that also manages the connection endpoint, so the application never needs to know which region is primary.
