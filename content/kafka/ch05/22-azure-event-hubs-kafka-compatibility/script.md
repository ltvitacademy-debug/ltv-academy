# Script — Azure Event Hubs' Kafka Compatibility

## Segment 1 (title)

Azure Event Hubs exposes a Kafka-compatible protocol endpoint alongside its native API — real Kafka client code can often connect to it with just a connection-string and port change, no rewrite.

## Segment 2 (code: what actually changes)

Same KafkaProducer, same KafkaConsumer, same send and poll calls. What changes is configuration: the broker address, and authentication, since Event Hubs uses Azure connection strings instead of Kafka's usual SASL or mTLS setup.

## Segment 3 (code: why this matters practically)

This is a real bridge for teams with existing Kafka applications that want events landing in Azure without rewriting client code — building on the Event Hub that Terraform and Bicep Lesson 10 provisions.

## Segment 4 (steps: the real limits)

Be honest about the limits: producer and consumer APIs work well, but the Admin API is only partially supported, and Kafka Connect, Streams, and ksqlDB aren't guaranteed to run against it the way they do on real Kafka.

## Segment 5 (outro)

A protocol bridge for existing client code, not a full Kafka reimplementation. Next up: weighing managed services like this against self-hosted Kafka directly.
