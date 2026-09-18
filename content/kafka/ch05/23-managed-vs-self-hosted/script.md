# Script — Managed vs. Self-Hosted Kafka

## Segment 1 (title)

Confluent Cloud and Event Hubs are two managed paths. Self-hosting means running the brokers and ZooKeeper or KRaft yourself. Neither is simply better — they trade different costs for different control.

## Segment 2 (steps: what ops burden concretely means)

Ops burden is concrete: capacity planning, patching every broker, actually handling a broker failure at 3 a.m., running the cluster metadata layer, and building the monitoring that catches problems early.

## Segment 3 (code: the managed value proposition)

A managed service takes all of that off the team's plate — that's the entire value proposition. You pay for throughput and storage instead of an engineer's time doing that list.

## Segment 4 (code: where self-hosting wins)

The trade-off flips at very large, sustained scale. A team with in-house Kafka expertise can end up paying less in raw infrastructure than a managed service's throughput-based pricing, since they already staff that expertise anyway.

## Segment 5 (outro)

Managed for speed and no ops burden, self-hosted for control and scale economics — many real teams use both. Next up: what actually matters to monitor once Kafka is running, managed or not.
