# Script — What Is Kafka & Why Event Streaming?

## Segment 1 (title)

Kafka isn't a message queue in the traditional sense — it's a durable, ordered log. Every event stays there for a configured retention period, readable by any number of independent consumers, as many times as needed.

## Segment 2 (code: queue vs log)

A traditional queue removes a message once it's consumed. Kafka's log keeps it — one consumer can read from the very beginning, another from wherever it left off, independently, without affecting each other.

## Segment 3 (code: why replay is the point)

That one property — starting from any point in history, not just what arrives from now on — is what makes Kappa architecture actually work in practice. Reprocessing history is replaying the same log through the same consumer logic, not standing up a separate batch job.

## Segment 4 (screenshot: what it looks like running)

A real Kafka deployment isn't an abstraction. It's a set of topics, each a named, partitioned log, visible in a real dashboard with live throughput and partition counts.

## Segment 5 (outro)

A durable log, not a disappearing queue — and replay as the default, not an afterthought. Next up: topics, partitions, and offsets — what that dashboard is actually showing.
