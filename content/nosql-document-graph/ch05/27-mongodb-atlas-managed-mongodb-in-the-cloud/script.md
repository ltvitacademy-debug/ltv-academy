# Script — MongoDB Atlas: Managed MongoDB in the Cloud

## Segment 1 (title)

The last four lessons walked through replica sets and sharded clusters by hand — config servers, shard replica sets, mongos. MongoDB Atlas is MongoDB's own managed cloud service, and it does that exact work for you. For most new production deployments today, it's the default choice over self-hosting.

## Segment 2 (steps: what Atlas manages)

Atlas provisions replica sets and sharded clusters across AWS, Google Cloud, or Azure — no manually starting mongod with configsvr or shardsvr flags. It handles automated point-in-time backups, patching and version upgrades with minimal downtime, and built-in monitoring and alerting on top of the same metrics mongostat exposes locally.

## Segment 3 (code: Atlas vs. self-hosting)

Self-hosting still means full control over the OS and exact mongod configuration, with cost scaling to owned hardware — some teams with strict data residency or specialized tuning needs choose that deliberately. Atlas offers a free M0 tier, dedicated tiers for production, and serverless instances that scale with usage automatically.

## Segment 4 (outro)

This closes out the MongoDB section of the course. Next up: scaling strategies and capacity planning — the decision framework for choosing vertical scaling, read replicas, or sharding.
