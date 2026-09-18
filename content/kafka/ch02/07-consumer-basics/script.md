# Script — Consumer Basics

## Segment 1 (title)

Poll returns a batch of whatever's available, and the loop processes that whole batch before asking again. The timeout is how long to wait if nothing's available yet — not a processing time limit.

## Segment 2 (code: auto.offset.reset)

The first time a consumer group starts, or its committed offset has aged out, Kafka needs to know where to start. Earliest reads the full retained history; latest skips straight to what's written from now on.

## Segment 3 (code: auto-commit's real gap)

Auto-commit is convenient, but if the consumer crashes after committing but before finishing that batch's work, the batch is lost — the committed offset says processed even though it wasn't.

## Segment 4 (code: manual commit closes the gap)

Committing manually, only after handle() actually succeeds, closes that gap — at the cost of writing the commit call yourself. This is exactly what at-least-once delivery looks like in practice.

## Segment 5 (outro)

Every one of these settings only matters at the moment something goes wrong. Next up: how a consumer group actually divides a topic's partitions among its members.
