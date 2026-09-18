# Script — ZooKeeper vs. KRaft

## Segment 1 (title)

Lesson 11 talked about a controller tracking broker liveness and driving leader election. For most of Kafka's history, ZooKeeper is what made that possible — a separate coordination system Kafka leaned on, not part of Kafka itself.

## Segment 2 (steps: ZooKeeper's job)

ZooKeeper stored cluster metadata, elected the controller broker, and detected failures through session timeouts. That worked, but it meant every Kafka cluster was really two systems to run and operate — the brokers, and a separate ZooKeeper ensemble underneath them.

## Segment 3 (steps: KRaft's job)

KRaft replaces ZooKeeper with consensus built directly into Kafka. A small set of brokers take on a controller role and use the Raft algorithm to agree on metadata among themselves — the same job, with no external system.

## Segment 4 (code: config)

In KRaft mode, brokers declare process.roles as broker and controller, and a quorum of voters replaces the ZooKeeper ensemble entirely. As of Kafka 4.0, ZooKeeper support was removed — KRaft isn't just recommended, it's the only supported mode now.

## Segment 5 (outro)

One less external system between you and a working cluster — that's the entire point of KRaft. Next up: Schema Registry, closing out this chapter.
