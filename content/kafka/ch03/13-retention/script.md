# Script — Retention

## Segment 1 (title)

Lesson 1 mentioned Kafka retains events for a configured retention period. This lesson is that configuration — by default, two independent limits, time and size, and whichever one is hit first triggers deletion.

## Segment 2 (code: time and size limits)

log.retention.hours deletes data older than a set number of hours. log.retention.bytes deletes the oldest data once a partition exceeds a size limit. Set both, and a sudden volume burst can trigger size-based deletion well before the time limit is ever reached.

## Segment 3 (code: compacted topics)

Compacted topics are a genuinely different model. Instead of eventually deleting everything, they keep the latest value for every key forever, and only clean up the older, superseded values for keys that have since been overwritten.

## Segment 4 (steps: choosing between the three)

Time-based retention answers how much history to keep. Size-based sets a hard ceiling on disk usage. Compaction answers a different question entirely — what does the current state look like right now, per key.

## Segment 5 (outro)

Three genuinely different retention models, not three versions of the same idea — pick based on the question you're actually answering. Next up: ZooKeeper vs. KRaft — what actually holds a Kafka cluster's metadata together.
