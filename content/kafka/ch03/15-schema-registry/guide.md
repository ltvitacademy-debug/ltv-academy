# Lesson 15 — Schema Registry

**Chapter 3 · Kafka Architecture Deep Dive · Lesson 15 of 30**

## What you'll learn

- What a Schema Registry actually stores and who talks to it
- The three compatibility modes: backward, forward, and full
- Why both producer and consumer check against it, not just one side
- What a real Schema Registry deployment looks like, holding real schemas

## The missing piece from Lesson 10

Lesson 10 showed Avro's schema-first approach and Confluent Cloud
rejecting a broken schema — but that rejection has to happen
*somewhere*, checked against *something*. That something is the
**Schema Registry**: a central service that stores every version of
every topic's schema and enforces compatibility rules before a new
version is accepted.

```
Schema Registry stores:
  Topic "orders-value", version 1: {user_id, amount, currency}
  Topic "orders-value", version 2: {user_id, amount, currency, tax}
  Topic "orders-value", version 3: {user_id, amount, currency, tax, discount}
```

Every schema gets a version number, and every new version proposed
has to pass a compatibility check against the ones before it —
that's the actual mechanism behind the warning banner from Lesson
10.

## Three ways to define "compatible"

Not every schema change is equally safe, and the registry lets you
choose how strict to be:

```
BACKWARD:  a new schema can read data written with the OLD schema.
           (Safe to upgrade consumers first, then producers.)

FORWARD:   an OLD schema can read data written with the NEW schema.
           (Safe to upgrade producers first, then consumers.)

FULL:      both directions hold at once.
           (Safest, most restrictive — the default recommendation.)
```

Adding a new *optional* field with a default value is typically
backward-compatible: old consumers just ignore the new field.
Renaming or removing a required field almost never is — that's
exactly the kind of change the Registry is there to catch before it
ships, rather than after a consumer crashes in production.

## Both sides check, not just one

The Registry isn't a one-way gate the producer alone deals with —
both ends of the pipe verify against it:

1. **Producer** serializes a message and checks the schema it's
   using is registered and compatible before sending.
2. **Registry** validates the schema against the topic's
   compatibility rule (backward/forward/full) and either accepts or
   rejects it.
3. **Consumer** reads a message, looks up the schema ID embedded in
   it, and fetches that exact schema version from the Registry to
   deserialize correctly — even if it's an older version than the
   consumer has seen before.

That's the same JSON drift problem from Lesson 10, closed on both
ends: a producer can't silently write an incompatible shape, and a
consumer never has to guess which version of a schema a given
message was written with.

## What a real Schema Registry looks like

This isn't an abstraction sitting only in documentation — here's
Confluent Cloud's own Schema Registry, showing the actual tree of
registered subjects and schema versions for a real cluster:

![Confluent Cloud's Schema Registry, showing a tree view of registered schema subjects and their versions.](/courses/kafka/ch03/15-schema-registry/cloud-sr-schema-tree-view.png)

Every subject in that tree is exactly what the diagram above
described: a topic's schema history, versioned, with compatibility
enforced on every new entry.

## Key terms

| Term | Meaning |
|---|---|
| Schema Registry | A central service storing every version of every topic's schema and enforcing compatibility |
| Backward compatibility | A new schema can read data written with the old schema |
| Forward compatibility | An old schema can read data written with the new schema |
| Full compatibility | Both backward and forward hold at once — the strictest, safest setting |

## Check yourself

You're ready for Lesson 16 when you can explain: why does a
consumer need to fetch a specific schema *version* from the Registry
rather than just assuming the latest one — what real-world situation
does that protect against?
