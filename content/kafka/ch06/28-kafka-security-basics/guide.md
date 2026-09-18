# Lesson 28 — Kafka Security Basics

**Chapter 6 · Practical Patterns · Lesson 28 of 30**

## What you'll learn

- Why authentication, encryption, and authorization are three separate
  concerns, not one setting
- How SASL/SCRAM (or mTLS) proves a client's identity to the broker
- How SSL protects data in transit, and why that's a separate setting from
  authentication
- How ACLs enforce least privilege, per topic and per principal

## Authentication + encryption, client-side

```properties
security.protocol=SASL_SSL
sasl.mechanism=SCRAM-SHA-512
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule \
  required username="orders-producer" password="${KAFKA_PASSWORD}";
ssl.truststore.location=/etc/kafka/truststore.jks
```

Every producer and consumer this course has written so far connected to a
Kafka cluster with no credentials at all — fine for learning, not fine for
anything real. `security.protocol=SASL_SSL` turns on two things at once,
deliberately kept as separate settings: `SASL_SCRAM` is the
*authentication* mechanism — the client proves it's really
`orders-producer` with a username and password (mTLS, proving identity
with a client certificate instead, is the other common choice for
service-to-service traffic). `SSL` is *encryption in transit* — every byte
between the client and broker is encrypted, independent of who's talking.
Notice `${KAFKA_PASSWORD}` isn't a literal password in the file — it's an
environment variable, the same discipline Git/GitHub/CI-CD's Lesson 23,
Environment Variables & Secrets in CI/CD, already taught for any secret a
pipeline needs.

## Authorization — least privilege, per topic

```
kafka-acls.sh --bootstrap-server broker:9092 \
  --add --allow-principal User:orders-producer \
  --operation Write --topic orders

kafka-acls.sh --bootstrap-server broker:9092 \
  --add --allow-principal User:orders-consumer \
  --operation Read --topic orders --group orders-processor
```

Authentication only answers "who is this?" — it says nothing about what
that identity is allowed to do. ACLs (Access Control Lists) are Kafka's
authorization layer, and they're granted at exactly this granularity:
`orders-producer` gets `Write` on the `orders` topic and nothing else — it
can't read from it, and it has no access to any other topic at all.
`orders-consumer` gets `Read`, scoped further to one specific consumer
group (`orders-processor`), matching Lesson 8's own model of group
membership. Two identities, two narrow grants — not one shared credential
with access to everything.

## Three basics, not a full deep-dive

This lesson is deliberately practical, not exhaustive: real production
Kafka security also covers things like audit logging, network-level
isolation, and key rotation policies that go well past what a single
lesson can cover honestly. What it does cover is the three basics that
have to be right before any of that matters: prove who's connecting
(authentication), protect what they send (encryption), and limit what
they can do once they're in (authorization).

## Key terms

| Term | Meaning |
|---|---|
| SASL/SCRAM | An authentication mechanism where a client proves its identity with a username and password |
| SSL (in transit) | Encryption of data moving between the client and the broker |
| ACL | A specific grant of one operation, on one resource, to one principal |

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: why are
authentication and authorization two separate concerns in Kafka, and what
would go wrong if a cluster only had one of them?
