# Script — Kafka Security Basics

## Segment 1 (title)

Everything this course has built so far assumed an open cluster. This lesson covers the three real basics that stop being optional the moment Kafka handles anything that actually matters: authentication, encryption, and authorization.

## Segment 2 (code: authentication + encryption, client-side)

SASL_SSL with SCRAM-SHA-512 proves who a client is before it can produce or consume anything at all, and SSL encrypts every byte on the wire between the client and the broker. The password itself comes from an environment variable, never hardcoded in the config file.

## Segment 3 (code: authorization — least privilege, per topic)

Authentication only proves who someone is — ACLs decide what they're allowed to do. orders-producer gets write access to one topic; orders-consumer gets read access to that same topic, but only as one specific consumer group.

## Segment 4 (steps: three basics, not a full deep-dive)

Three basics, not a full security deep-dive: authentication proves identity, encryption protects the wire, and authorization decides exactly what each identity can do, topic by topic.

## Segment 5 (outro)

None of this changes what the pipeline does — it changes who's allowed to touch it. Next up: the capstone, putting this whole chapter together.
