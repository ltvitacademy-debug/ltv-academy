# Script — Capstone: A Real-Time Event Pipeline on Kafka

## Segment 1 (title)

This capstone isn't new material — it's proof that everything from Chapters 1 through 6 actually composes into one real, working event pipeline: a producer, a sized topic, a consumer group, and error handling that keeps the pipeline moving.

## Segment 2 (steps: the whole chapter, built together)

One pipeline, one throughline: a producer sending real click events with acks=all and idempotence, a topic sized deliberately for both its consumer group and its replay window, and a consumer group with a dead-letter path for whatever it can't process.

## Segment 3 (code: the topics)

clickstream gets 8 partitions, sized for its real expected throughput, and 3 days of retention. Its dead-letter topic gets just 1 partition — failures there should be rare, and ordering among them doesn't matter.

## Segment 4 (code: the producer)

The producer makes the same choice as Lesson 25's pipeline — acks=all plus idempotence — because a capstone project should reuse a course's own proven decisions, not invent new ones for no reason.

## Segment 5 (code: the consumer, with a dead-letter path)

The consumer tries to process each event and, on failure, routes it to clickstream-dlq instead of retrying forever — Lesson 27's dead-letter pattern, applied to this pipeline's own topic.

## Segment 6 (steps: what this pipeline is actually for)

This exact shape — producer, sized topic, consumer group, dead-letter topic — is what Career & Capstone's Project 3, the streaming fraud detector in Lessons 75 through 78, is actually built on, scoring transactions instead of storing clicks. Lesson 21's case study covers that same kind of system in more depth.

## Segment 7 (outro)

A real pipeline, built end to end, in a shape that generalizes to real production systems. Next up: the last lesson in this course.
