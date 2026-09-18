# Lesson 8 — Consumer Groups

**Chapter 2 · Producing & Consuming · Lesson 8 of 30**

## What you'll learn

- What a consumer group actually is, and what `group.id` really controls
- How a topic's partitions get divided among a group's members
- What a rebalance is, and what actually triggers one
- Why more consumers than partitions leaves some of them permanently idle

## A consumer group is a shared `group.id`

Every consumer that sets the same `group.id` is a member of the same
**consumer group**. Kafka's real guarantee: within one group, each
partition is assigned to exactly one member at a time. That's what
turns "many independent consumer processes" into "one logical,
horizontally scaled consumer" — the group as a whole processes the
whole topic, split across however many members are currently in it.

```
Topic "orders" — 6 partitions
Consumer group "order-processors" — 3 members

Consumer A: partitions 0, 1
Consumer B: partitions 2, 3
Consumer C: partitions 4, 5
```

Two consumers in the **same** group never both process the same
partition at the same time. Two consumers in **different** groups
reading the same topic are entirely independent of each other — each
group tracks its own committed offsets, separately (Lesson 7).

## How the assignment actually happens

When a group's members join, Kafka's group coordinator divides the
topic's partitions among them as evenly as it can. The exact
algorithm has changed across Kafka versions (range, round-robin,
sticky, cooperative-sticky), but the outcome is the same idea: spread
the partitions across the members so no partition is unassigned and
no member sits with a wildly unfair share.

## Rebalancing: what actually triggers it

A **rebalance** is the group coordinator re-running that assignment
— and it happens more often than "a consumer crashed":

- A new consumer joins the group (scaling up)
- An existing consumer leaves cleanly (scaling down) or crashes
  (detected via a missed heartbeat)
- The topic's partition count changes

During a rebalance, the affected partitions briefly stop being
consumed while reassignment happens — which is why frequent,
unnecessary rebalances (e.g., a consumer that keeps flapping in and
out) are a real operational problem, not just a theoretical one.

## Why extra consumers just sit idle

Kafka never assigns more than one consumer to a partition at the
same time within a group — so a partition is the smallest unit of
parallelism a group can actually use:

```
Topic "orders" — 3 partitions
Consumer group with 5 members

Consumer A: partition 0
Consumer B: partition 1
Consumer C: partition 2
Consumer D: (idle — no partition left to assign)
Consumer E: (idle — no partition left to assign)
```

Adding a 4th or 5th consumer here does nothing for throughput; it
just sits idle, ready to take over instantly if another member fails.
The only way to actually use more consumers is to increase the
topic's partition count (Lesson 12 covers partitioning strategy in
depth) — parallelism in a consumer group is capped by partition
count, full stop.

## Key terms

| Term | Meaning |
|---|---|
| Consumer group | All consumers sharing one `group.id`; together they process a topic once, as one logical consumer |
| Group coordinator | The broker-side component that assigns partitions to a group's members |
| Rebalance | Re-running partition assignment when membership or partition count changes |
| Idle consumer | A group member with no partition assigned because there aren't enough partitions to go around |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: if a
topic has 3 partitions and a consumer group has 5 members, why do 2
of them sit permanently idle, and what's the only way to actually put
them to work?
