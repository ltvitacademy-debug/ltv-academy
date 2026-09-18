# Lesson 22 — Azure Event Hubs' Kafka Compatibility

**Chapter 5 · Kafka in the Cloud · Lesson 22 of 30**

## What you'll learn

- What Event Hubs' Kafka-compatible protocol endpoint actually is
- Why existing Kafka producer/consumer code can often point at Event Hubs with just a connection-string change
- Where that compatibility has real limits — this isn't a full Kafka reimplementation
- How this connects to actually provisioning an Event Hub (Terraform & Bicep Lesson 10)

## A protocol endpoint, not a Kafka rewrite

Azure Event Hubs is Microsoft's own event-ingestion service — and
separately from its native AMQP-based API, it exposes a
**Kafka-compatible protocol endpoint**. That means an Event Hubs
namespace can speak the same wire protocol a real Kafka broker
speaks, well enough that an existing Kafka client library — the same
producer and consumer code from Lessons 6–7 — can often connect to
it with nothing more than a connection-string and port change.

```
Kafka client, pointed at a real broker:
  bootstrap.servers = my-kafka-cluster:9092

Same Kafka client, pointed at Event Hubs instead:
  bootstrap.servers = my-namespace.servicebus.windows.net:9093
  security.protocol = SASL_SSL
  sasl.mechanism    = PLAIN
  sasl.jaas.config   = ...connection-string-based credential...
```

No rewrite of the application's producer or consumer logic — the
same `KafkaProducer`/`KafkaConsumer` classes, the same `send()` and
`poll()` calls. What changes is configuration: the broker address and
the authentication mechanism, because Event Hubs authenticates with
Azure connection strings/SAS tokens rather than Kafka's usual SASL/
mTLS setups against a self-hosted cluster.

## Why this matters practically

This is a real, practical bridge for a specific situation: a team
that already has Kafka-based producer or consumer applications (on
another cloud, on-prem, or built against open-source Kafka) that
wants to land those events in Azure — inside a Fabric Eventstream, an
Azure service, or anywhere else in the Azure ecosystem — without
rewriting the client-side code. Terraform & Bicep's Lesson 10 covered
actually **provisioning** an Event Hub with infrastructure as code;
this lesson is about what you can point at that provisioned resource
once it exists.

## Where the compatibility has real limits

Be honest about the boundary — "Kafka-compatible" is not "a complete
reimplementation of Kafka":

- **Producer/consumer APIs**: broadly supported — this is the part
  that works well and is the main reason teams reach for it.
- **Kafka Admin API**: only partially supported. Not every
  administrative operation a real Kafka Admin client can perform
  against a self-hosted broker or Confluent Cloud (Lesson 21) has an
  Event Hubs equivalent — some topic/partition management is instead
  expected to happen through the Azure control plane (Portal, CLI, or
  the Terraform/Bicep path) rather than through Kafka's own Admin API
  calls.
- **Kafka Connect and Kafka Streams**: not something Event Hubs runs
  for you the way Confluent Cloud or a self-hosted cluster can.
  Connect/Streams/ksqlDB (Lessons 16–19) are Kafka ecosystem tools
  that expect a real Kafka-protocol-speaking cluster underneath — some
  connectors work against Event Hubs' endpoint, but it's not a
  guarantee across the whole Connect ecosystem the way it is against
  real Kafka or Confluent Cloud.
- **Partition and retention behavior**: Event Hubs has its own
  underlying model (Event Hubs "partitions" and retention windows)
  that the Kafka-compatible layer maps onto — the mapping is close
  but not a byte-for-byte identical implementation of Kafka's own
  log semantics from Lesson 2 and Lesson 13.

## The practical takeaway

Reach for Event Hubs' Kafka endpoint when the goal is "get existing
Kafka client code talking to Azure quickly," not when the goal is "run
the full Kafka ecosystem, including Connect and Streams, unmodified."
Lesson 23 puts this choice — and Confluent Cloud, and self-hosting —
into one direct decision framework.

## Key terms

| Term | Meaning |
|---|---|
| Kafka-compatible endpoint | Event Hubs' protocol-level bridge letting real Kafka clients connect with a config change |
| SASL_SSL / connection string | Event Hubs' authentication mechanism, replacing Kafka's usual SASL/mTLS setup |
| Admin API (partial) | The part of Kafka compatibility that has real, documented limits, unlike the producer/consumer path |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking:
what actually has to change in an existing Kafka client application
to point it at Event Hubs instead of a real broker, and name one
Kafka ecosystem piece that isn't fully guaranteed to work the same
way against it.
