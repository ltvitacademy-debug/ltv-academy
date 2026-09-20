# Script — Replication Monitoring

## Segment 1 (title)

Replication runs continuously and unattended, so the first sign of trouble is often just silence — a subscriber quietly falling behind. This lesson covers the real tools for catching that early: Replication Monitor, tracer tokens, and agent job history.

## Segment 2 (steps: the real tools)

Replication Monitor is the SSMS tool showing each publication's agent status, pending command counts, and error history — the first place to look when something feels off. Tracer tokens measure real end-to-end latency. Agent job history is often the fastest first check, since every replication agent runs as a regular SQL Server Agent job.

## Segment 3 (code: tracer token hop by hop)

A tracer token is a marker transaction that travels the full path from publisher log through the Log Reader Agent, into the distribution database, through the Distribution Agent, to the subscriber. Replication Monitor times each hop separately, so you know whether the Log Reader Agent or the Distribution Agent is the actual bottleneck.

## Segment 4 (outro)

A healthy topology has near-zero pending commands and consistent tracer token times. Next up: what it actually looks like when this breaks — stalled agents, identity range exhaustion, and schema changes that aren't replication-aware.
