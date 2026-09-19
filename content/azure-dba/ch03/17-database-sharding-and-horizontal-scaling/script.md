# Script — Database Sharding & Horizontal Scaling

## Segment 1 (title)

Lesson 15's partitioning splits one table inside one database. Sharding is a different scale entirely -- splitting one logical dataset across multiple separate physical databases, each with its own compute and storage.

## Segment 2 (code: partitioning vs sharding, in scope)

Partitioning breaks one table into pieces inside one database. Sharding breaks one dataset into pieces that are each their own Azure SQL Database. A single "customers" query might actually mean querying ten different databases.

## Segment 3 (code: shard map manager)

Azure's Elastic Database tools include a shard map manager that tracks which sharding-key range lives on which shard, and routes each query automatically. The split-merge service physically moves ranges between shards to rebalance them.

## Segment 4 (steps: the real complexity cost)

Cross-shard queries can't be a single T-SQL statement anymore. Rebalancing is a manual operation, not an automatic setting. And referential integrity across shards becomes the application's job -- the database can't enforce a foreign key across two different databases.

## Segment 5 (outro)

Shard only when a single database's measured ceiling is the actual constraint. Next up: Azure Arc, hybrid SQL, and Azure SQL Database in Microsoft Fabric -- closing out Chapter 3.
