# Script — Group Replication & MySQL InnoDB Cluster

## Segment 1 (title)

Source-replica replication doesn't decide what happens when the source fails. MySQL's answer is Group Replication, and the packaged product built on top of it, InnoDB Cluster — MySQL's own native high-availability architecture.

## Segment 2 (steps: how group replication differs)

Group Replication works differently from one-way streaming. When a transaction is ready to commit, it's broadcast to the whole group and certified — a distributed agreement protocol called XCom, built on Paxos, confirms it doesn't conflict with anything else. It only counts as committed once a majority of the group durably has it.

## Segment 3 (steps: single-primary vs multi-primary)

Group Replication runs in single-primary mode, the default, with one read-write member and automatic primary election if it fails — no external failover tool needed. Multi-primary mode lets every member accept writes, but pushes conflict handling onto the application when certification aborts a transaction.

## Segment 4 (code: InnoDB Cluster's AdminAPI)

InnoDB Cluster is explicitly three components: Group Replication itself, MySQL Shell's AdminAPI for provisioning and managing the group with functions like createCluster and addInstance, and MySQL Router for connection routing.

## Segment 5 (outro)

Group Replication and InnoDB Cluster are genuinely MySQL's own design, distinct from Availability Groups or Data Guard underneath. Next up: MySQL Router, and how it actually routes application connections and splits reads from writes.
