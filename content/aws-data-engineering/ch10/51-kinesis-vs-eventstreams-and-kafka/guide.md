# Kinesis vs. Fabric Eventstreams & Kafka

Kinesis isn't the only way to stream data, and it isn't automatically the right choice just
because you're already on AWS. Two other options come up constantly in real job postings and
real architecture decisions: Apache Kafka (often run as Amazon MSK) and Microsoft Fabric
Eventstreams. This lesson is a fair comparison, not an argument for any one of them.

## What you'll learn

- Kinesis: what you get for staying fully AWS-native and managed
- Kafka and Amazon MSK: the open-source, portable standard
- Fabric Eventstreams: Microsoft's managed equivalent inside Fabric
- How to actually choose, based on what the rest of your stack looks like

## Kinesis: AWS-native and managed, full stop

Kinesis is built and operated entirely by AWS, with shard-based scaling and native, low-
friction integration into Lambda, Firehose, S3, and Kinesis Data Analytics. There's very
little operational overhead — no cluster to patch, no brokers to size. The tradeoff is that
Kinesis is AWS-only: it isn't something you can lift and run on another cloud or on-premises,
and its ecosystem of connectors is smaller than Kafka's.

## Kafka and Amazon MSK: portable, and the industry standard

Apache Kafka is open-source and runs anywhere — on-premises, any cloud, or as a managed
service. On AWS, that managed option is **Amazon MSK (Managed Streaming for Kafka)**, which
handles broker provisioning and patching while leaving you the actual Kafka model: topics and
partitions (conceptually similar to Kinesis's streams and shards). Kafka's advantage is its
enormous ecosystem — Kafka Connect for integrations, ksqlDB for stream processing, and the
fact that many companies already run it elsewhere, so a Kafka skill set transfers between
employers in a way an AWS-specific one doesn't. The cost is more operational complexity,
even with MSK handling the infrastructure layer.

## Fabric Eventstreams: the same idea, inside Microsoft's ecosystem

Microsoft Fabric — covered in this catalog's Fabric course — has its own managed real-time
ingestion capability called **Eventstreams**. Like Kinesis, it's a no-code-to-set-up, fully
managed streaming service, but it lives inside the Fabric/Azure ecosystem and routes data
natively into OneLake, KQL databases, and Power BI. If an organization is already
standardized on Fabric for its data platform, Eventstreams is the path of least resistance
for the same reason Kinesis is the path of least resistance on AWS.

## Choosing between them

There's no universally "best" option — the honest answer is that the choice usually follows
the platform decision that's already been made. Already committed to AWS end to end? Kinesis
removes the most operational burden. Need portability across clouds, or does the
organization already run Kafka somewhere? MSK (or self-managed Kafka) protects that
investment. Standardized on Microsoft Fabric? Eventstreams is the native fit. The mistake to
avoid is picking a streaming service in isolation from the rest of the data platform it has
to plug into.

## Key terms

| Term | Meaning |
|---|---|
| Kinesis | AWS-native, fully managed streaming with shard-based scaling |
| Amazon MSK | AWS's managed service for running Apache Kafka |
| Kafka topic / partition | Kafka's equivalent of a Kinesis stream / shard |
| Fabric Eventstreams | Microsoft Fabric's managed real-time ingestion service |
| Portability | The ability to run the same streaming technology across clouds or on-prem |

## Check yourself

A company runs workloads across AWS and on-premises data centers, and already has Kafka
expertise on the team. Would Kinesis or Kafka/MSK be the more defensible choice here, and
why does "what does the rest of the stack look like" matter more than "which service is
technically best"?
