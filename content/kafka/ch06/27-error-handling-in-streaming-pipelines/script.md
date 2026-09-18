# Script — Error Handling in Streaming Pipelines

## Segment 1 (title)

A streaming pipeline runs forever, so a bad event eventually shows up. This lesson covers what happens when it does: dead-letter topics, retries, and why idempotent processing matters more here than almost anywhere else.

## Segment 2 (code: the dead-letter topic)

A poison-pill message is one that fails processing no matter how many times it's retried. Sending it to a separate orders-dlq topic instead of retrying forever keeps it from blocking every event behind it on that partition.

## Segment 3 (code: retry before giving up)

Not every failure is a poison pill. A transient failure — a downstream service timing out for a second — deserves a bounded retry with backoff, and only goes to the dead-letter topic if it still fails after those attempts.

## Segment 4 (steps: three failure modes, three answers)

Three failure modes, three different answers: a transient failure gets retried, a poison pill gets moved aside, and idempotent processing — Career & Capstone Lesson 11 — makes both safe even when a retry reprocesses an event.

## Segment 5 (outro)

None of this stops the pipeline from moving. Next up: who's even allowed to produce or consume any of this in the first place.
