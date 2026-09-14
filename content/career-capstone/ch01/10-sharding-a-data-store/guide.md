# Lesson 10 — Sharding a Data Store

**Chapter 1 · System Design for Data Engineers · Lesson 10 of 81**

## What you'll learn

- Sharding vs. partitioning — the same idea, at a different boundary
- Choosing a shard key that actually spreads load evenly
- The hot shard problem, and why it's the failure mode that matters most
- When sharding is actually needed vs. partitioning alone being enough

## The same idea, a different boundary

Lesson 9's partitioning split one table into smaller chunks *within
the same storage system* — one Delta table, many partition folders,
one query engine reading all of them. **Sharding** takes the same
splitting idea one level up: spreading data across genuinely
*separate* storage instances — separate database servers, separate
clusters — each holding only a slice of the total data.

```text
Partitioning:  FactOrders split into folders, all inside ONE
               Delta table, on ONE storage system
Sharding:      customer data split across FOUR separate database
               servers, each one only knowing its own slice
```

Lesson 4's OLTP-vs-OLAP distinction matters here: sharding is
overwhelmingly an OLTP scaling technique. A single OLTP database
server has a hard ceiling on write throughput and storage that no
amount of partitioning within it can fix — sharding is what you
reach for once one server, however well partitioned, genuinely
can't hold or serve the load anymore.

## Choosing a shard key

```text
Shard key: customer_id
  Shard 1: customer_id % 4 == 0
  Shard 2: customer_id % 4 == 1
  Shard 3: customer_id % 4 == 2
  Shard 4: customer_id % 4 == 3
```

The **shard key** decides which shard a given row lands on — every
write and most reads need to know it up front, since it's how the
system knows which server to even talk to. A good shard key spreads
both storage and traffic roughly evenly across shards; a bad one
concentrates both onto one shard while the others sit nearly idle,
which defeats the entire point of sharding in the first place.

## The hot shard problem

```text
Shard key: signup_date (bad choice)
  Every customer who signed up today writes to TODAY's shard
  Yesterday's shard, and every shard before it, sits nearly idle
```

A **hot shard** is exactly this: one shard absorbing a
disproportionate share of traffic while the rest of the cluster is
underused. It's the sharding equivalent of Lesson 9's over-
partitioning mistake, but worse — an overloaded *partition* just
means a slow query; an overloaded *shard* means that one server can
get overwhelmed while three others have spare capacity doing
nothing about it. `customer_id` (spread by a hash, not a
sequential value) usually beats something naturally clustered in
time, like a signup date or an order timestamp, for exactly this
reason.

## When you actually need sharding

```text
Partitioning alone is enough when:  one server's storage and write
                                     throughput can still handle
                                     the load, just organized better
Sharding is actually needed when:   no single server can hold the
                                     data or absorb the write volume,
                                     no matter how it's partitioned
                                     internally
```

Sharding adds real operational cost — cross-shard queries and joins
become genuinely harder, and rebalancing shards as data grows is a
nontrivial migration, not a config change. It's worth reaching for
only once Lesson 9's partitioning, inside one system, has
genuinely run out of room — treating sharding as the default
"just in case" choice adds that cost for no real benefit.

## Key terms

| Term | Meaning |
|---|---|
| Sharding | Splitting data across separate storage instances, not just folders in one system |
| Shard key | The column deciding which shard a row lands on |
| Hot shard | One shard absorbing disproportionate traffic while others sit idle |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
does a sequential shard key like `signup_date` risk creating a hot
shard, while a hashed `customer_id` usually doesn't?
