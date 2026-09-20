# Script — Scaling Strategies & Capacity Planning in MongoDB

## Segment 1 (title)

This lesson closes out the MongoDB section by tying together everything from replica sets and sharding into one decision framework. When a deployment is running out of headroom, what actually fixes it depends entirely on what kind of pressure the system is under.

## Segment 2 (steps: three real levers)

Vertical scaling gives the existing node more CPU, RAM, or faster disk — simplest, but with a real ceiling. Adding replica secondaries genuinely scales read capacity, but does nothing for write throughput, since every write still goes to the primary. Sharding is the only lever that scales writes and total data volume, but it's also the most operationally complex.

## Segment 3 (code: capacity planning framework)

Diagnose whether the pressure is on reads, writes, or storage using mongostat, mongotop, or Atlas metrics. Try vertical scaling first for a single CPU or RAM-bound node. Add replicas when read query volume specifically is the bottleneck. Reach for sharding only once write throughput or data volume has genuinely outgrown a single primary — reaching for it first is a common, costly mistake.

## Segment 4 (outro)

That completes the MongoDB section of this course. Next up: Azure Cosmos DB — Microsoft's globally-distributed, multi-model database engine, and where this course heads next.
