# Lesson 21 — Confluent Cloud

**Chapter 5 · Kafka in the Cloud · Lesson 21 of 30**

## What you'll learn

- What Confluent Cloud actually is: fully managed Kafka-as-a-service, from the company founded by Kafka's original creators
- What creating a cluster looks like, with no broker to provision yourself
- What creating a topic inside that cluster looks like — the exact same concept from Lesson 2, now provisioned differently
- Why "managed" changes what you configure, not what Kafka fundamentally is

## The same Kafka, provisioned differently

Everything in Chapters 1–4 — topics, partitions, offsets, consumer
groups, Connect, Streams, ksqlDB — is real Kafka, the open-source
project. **Confluent Cloud** is a fully managed service, run by
Confluent (the company founded by Kafka's original creators at
LinkedIn), that gives you that same real Kafka without you standing
up or operating a single broker. This chapter is about that
managed layer specifically — Lesson 22 covers Azure's own take
(Event Hubs), Lesson 23 weighs managed against self-hosted directly,
and this lesson starts with what "managed" actually looks like,
screen by screen.

## Creating a cluster

The first real decision in Confluent Cloud is creating a **cluster**
— the managed equivalent of standing up a set of brokers yourself
(Lesson 4). Instead of provisioning VMs and installing Kafka, you
pick a cluster type and a cloud region from a console:

![Confluent Cloud's cluster-creation screen, showing the cluster type selection step (Basic, Standard, Enterprise, Dedicated) with their throughput and feature tradeoffs listed side by side.](/courses/kafka/ch05/21-confluent-cloud/create-cluster-select-type.png)

That single screen replaces everything Lesson 4 covered about
choosing broker count and replication factor by hand — Confluent
picks the underlying infrastructure for you based on the tier and
region you select. You're still making a real capacity decision; you're
just making it in terms of throughput and cost tier instead of broker
count.

## Creating a topic inside it

Once a cluster exists, the next step is exactly the concept from
Lesson 2: creating a **topic**. Confluent Cloud's console makes this
a form, not a CLI command:

![Confluent Cloud's topic-creation screen, showing a topic being created (named "users") with a partition count field and other topic-level settings.](/courses/kafka/ch05/21-confluent-cloud/create-topic-users.png)

Look closely at that screen: it's still asking for a **partition
count**, the exact same knob from Lesson 2 and Lesson 12's
partitioning strategy discussion. Managed doesn't mean the concept
disappears — it means the broker infrastructure underneath it is no
longer your problem. You still decide how many partitions the
`users` topic gets; you just never provision a machine to hold them.

## What's genuinely different, and what isn't

- **Different:** no broker VMs, no ZooKeeper/KRaft (Lesson 14) cluster
  to run yourself, no patching, no capacity planning at the hardware
  level, billing based on throughput and storage instead of server
  count.
- **Not different:** topics, partitions, offsets, consumer groups,
  producers, and consumers work exactly as Chapters 1–3 described.
  A client application connecting to Confluent Cloud uses the same
  Kafka producer/consumer APIs as a client connecting to a
  self-hosted cluster — the wire protocol doesn't change.

## Key terms

| Term | Meaning |
|---|---|
| Confluent Cloud | Confluent's fully managed Kafka-as-a-service, run in a chosen cloud region without self-hosted brokers |
| Cluster (managed) | The billing/capacity unit you create in Confluent Cloud, replacing manual broker provisioning |
| Wire protocol | The Kafka client protocol, unchanged whether talking to a self-hosted cluster or Confluent Cloud |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking:
what specifically disappears when you move from self-hosted Kafka to
Confluent Cloud, and what specifically stays exactly the same?
