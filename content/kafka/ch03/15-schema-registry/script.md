# Script — Schema Registry

## Segment 1 (title)

Lesson 10 showed a broken Avro schema getting rejected, but that rejection has to happen somewhere, checked against something. That something is the Schema Registry — a central service storing every version of every topic's schema.

## Segment 2 (code: compatibility modes)

Backward compatible means a new schema can read old data — safe to upgrade consumers first. Forward compatible means an old schema can read new data — safe to upgrade producers first. Full compatibility means both hold at once, which is the strictest and safest setting.

## Segment 3 (steps: both sides check)

The producer checks its schema is registered and compatible before sending. The Registry validates against the topic's compatibility rule. The consumer looks up the exact schema version embedded in a message to deserialize it correctly, even an older version it hasn't seen before.

## Segment 4 (screenshot: real registry)

Here's Confluent Cloud's own Schema Registry, showing the actual tree of registered subjects and schema versions for a real cluster — exactly what was just described, not an abstraction.

## Segment 5 (outro)

Both producer and consumer check against the same source of truth, which is what actually closes the schema-drift problem from Lesson 10. Next up: Kafka Connect — moving data in and out without writing custom producer or consumer code.
