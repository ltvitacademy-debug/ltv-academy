# Script — Transactional Replication Basics

## Segment 1 (title)

The previous lesson named transactional replication as the workhorse type. This lesson opens up the three-role architecture and the two agents that actually move data from publisher to subscriber — every troubleshooting scenario ahead traces back to one of these two agents.

## Segment 2 (steps: three roles)

The publisher is the source database, defining publications made of articles. The distributor holds the distribution database, a staging area for captured changes. The subscriber is the destination — one publisher can have many subscribers.

## Segment 3 (code: two agents)

The Log Reader Agent runs continuously on the distributor, reading the publisher's transaction log for committed changes and queuing them in the distribution database. The Distribution Agent reads that queue and applies it to each subscriber in original commit order — it can run at the distributor for push subscriptions, or at the subscriber for pull.

## Segment 4 (outro)

Splitting capture from delivery means a slow subscriber doesn't block the publisher's log truncation — but it's also where most real-world replication problems live. Next up: monitoring latency and agent health before that becomes a real problem.
