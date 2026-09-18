# Script — Confluent Cloud

## Segment 1 (title)

Confluent Cloud is fully managed Kafka-as-a-service, run by the company founded by Kafka's original creators. It's real Kafka — you just never stand up or operate a broker yourself.

## Segment 2 (screenshot: creating a cluster)

The first real decision is creating a cluster — the managed equivalent of standing up brokers by hand. You pick a cluster type and region from a console instead of provisioning VMs and installing Kafka.

## Segment 3 (screenshot: creating a topic)

Once a cluster exists, creating a topic is the exact same concept from Lesson 2, now a form instead of a CLI command — and it still asks for a partition count, the same knob you've always configured.

## Segment 4 (steps: what's different, what isn't)

What's different: no broker VMs, no cluster coordination layer to run, billing by throughput instead of server count. What's not different: topics, partitions, consumer groups, and the wire protocol itself.

## Segment 5 (outro)

The same real Kafka, provisioned without a broker. Next up: Azure Event Hubs' own Kafka-compatible endpoint, and where that compatibility actually holds up.
