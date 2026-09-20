# Cosmos DB Well-Architected Practices

Microsoft's **Azure Well-Architected Framework** organizes cloud design guidance around
five pillars: reliability, security, cost optimization, operational excellence, and
performance efficiency. It's generic across all of Azure, but Cosmos DB has its own
well-architected guidance that applies those pillars to the decisions that actually matter
for this service. This lesson pulls together the three decisions that show up in that
guidance again and again — partition key design, RU/s sizing, and consistency level choice
— as a single closing checklist for everything this chapter and the two before it covered.

## What you'll learn

- Why partition key design is treated as the single highest-leverage decision in Cosmos DB's Well-Architected guidance
- The difference between right-sizing RU/s and simply over-provisioning it
- How to choose a consistency level deliberately instead of defaulting to the strongest one

## Partition key: the decision you can't easily undo

Of every decision covered in this course, the partition key is the one the Well-Architected
guidance treats as most consequential, because it's **effectively immutable** — changing a
container's partition key later means creating a new container and migrating all the data.
The well-architected checklist for a partition key:

- **High cardinality** — many distinct values, so RU/s and storage can actually spread
  across many physical partitions
- **Even access distribution** — no single value (or small cluster of values) receives a
  disproportionate share of reads or writes, which is what causes the hot-partition
  throttling from the previous lesson
- **Matches the dominant query pattern** — most real-world reads should be able to include
  the partition key in the filter, since a query without it is a cross-partition **fan-out**
  query that's more expensive and slower

A key like `orderId` scores well on cardinality and distribution but poorly on query
pattern if most reads are "get all orders for this customer." A key like `customerId` is
usually the better real-world tradeoff for that access pattern, even though a single very
large customer becomes a modeling edge case to watch.

## Right-sizing RU/s, not over-provisioning it

The reflexive fix for throttling is to raise provisioned RU/s until the 429s stop. That
works, but the Well-Architected cost pillar treats it as a last resort, not a first move,
because RU/s is billed whether or not it's used. The right-sizing sequence:

1. Confirm the RU/s ceiling is actually the constraint (via the diagnostics from the
   previous lesson), not an inefficient query or a hot partition that more RU/s won't fix
2. For workloads with genuine peaks and quiet periods, use **autoscale throughput** instead
   of a flat manual value, so RU/s scales between a floor and a ceiling automatically rather
   than being provisioned for peak around the clock
3. Set alerts on Normalized RU Consumption in both directions — near 100% signals
   under-provisioning, sustained very-low percentages signal money being spent on idle
   capacity

## Choosing consistency deliberately

Cosmos DB offers five consistency levels — **Strong, Bounded Staleness, Session,
Consistent Prefix, and Eventual** — and the well-architected guidance is explicit that the
default, **Session consistency**, is the right choice for most applications, not a
compromise to move past. Session consistency guarantees a single client always reads its
own writes, which covers the overwhelming majority of real application needs, at
meaningfully lower latency and RU cost than Strong consistency.

The guidance is to justify moving *away* from Session in either direction:

- Move toward **Strong** only when a specific operation genuinely cannot tolerate any
  staleness (e.g., a financial balance check), accepting the added latency and RU cost, and
  ideally scoping it to that one operation rather than the whole account
- Move toward **Eventual** only for read-heavy, latency-sensitive scenarios (e.g., a
  product catalog or a leaderboard) where brief staleness is genuinely acceptable, in
  exchange for the lowest possible read latency and RU cost

## Key terms

| Term | Meaning |
|---|---|
| Well-Architected Framework | Microsoft's five-pillar guidance (reliability, security, cost, operations, performance) applied here specifically to Cosmos DB |
| Fan-out query | A query that can't be routed to a single partition because it doesn't filter on the partition key, so it's sent to every physical partition |
| Autoscale throughput | RU/s that scales automatically between a floor and ceiling based on actual usage, instead of a fixed manual value |
| Session consistency | Cosmos DB's default consistency level; guarantees a client reads its own writes, at lower cost than Strong |

## Check yourself

A team defaults every new Cosmos DB container to Strong consistency "to be safe," without
reviewing whether any specific workload actually requires it. What does the well-architected
guidance in this lesson say about that decision, and what should they check instead?
