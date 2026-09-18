# Script — Consumer Groups

## Segment 1 (title)

Every consumer with the same group.id is a member of the same consumer group. Kafka's real guarantee: within one group, each partition is assigned to exactly one member at a time.

## Segment 2 (code: partition assignment)

That's what turns many independent consumer processes into one logical, horizontally scaled consumer. Two consumers in the same group never both process the same partition at the same time.

## Segment 3 (code: what triggers a rebalance)

A rebalance is the group coordinator re-running that assignment — triggered by a consumer joining, one leaving or crashing, or the partition count changing. Partitions briefly stop being consumed while it happens.

## Segment 4 (code: idle consumers)

Kafka never assigns more than one consumer per partition within a group, so a partition is the smallest unit of parallelism a group can use. Extra consumers beyond the partition count just sit idle.

## Segment 5 (outro)

Parallelism in a consumer group is capped by partition count, full stop. Next up: what actually happens to a message when something fails partway through — at-most, at-least, and exactly-once delivery.
