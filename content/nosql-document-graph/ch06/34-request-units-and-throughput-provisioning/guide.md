# Request Units & Throughput Provisioning

The last three lessons kept referencing Request Units without fully defining them. This
lesson closes Chapter 6 by making RUs concrete: what they actually measure, how they turn
into a real cost you provision and pay for, and the two real modes — provisioned throughput
versus serverless — for paying for that capacity. This is arguably the single most
distinctive concept in Cosmos DB, with no direct equivalent anywhere else in this course.

## What you'll learn

- What a Request Unit actually normalizes and measures
- How different operations cost different numbers of RUs
- Provisioned throughput mode versus serverless mode, and when each fits

## What a Request Unit actually is

A Request Unit (RU) is Cosmos DB's normalized measure of the compute, memory, and I/O cost
of a database operation. Rather than billing or throttling based on raw CPU or IOPS the way
infrastructure-level metrics might, every single operation against Cosmos DB — a point read,
a write, a query, even a stored procedure execution — is assigned a specific RU cost, and
that cost is deducted from the RU/s (Request Units per second) available to the container (or
database, if throughput is shared) at that moment. A simple point read of a 1KB document by
its ID and partition key costs roughly 1 RU. The exact cost of any operation is genuinely
knowable in advance — Cosmos DB returns the RU charge for every request in the response
headers, so cost isn't a mystery to be estimated after the fact.

## What drives RU cost

RU cost scales with real, identifiable factors: document size (larger documents cost more to
read and write), the number of properties being indexed (more indexed properties means more
index entries to maintain on writes), query complexity (a query with `ORDER BY` or
aggregation costs more than a simple filtered point read), and whether a query is confined to
a single partition or must fan out across several (Lesson 32 and 33's cross-partition query
concern, made concrete here in actual RU numbers). This is precisely why the data modeling
choices in Lesson 33 have a real, measurable dollar consequence, not just a theoretical one.

## Provisioned throughput mode

In provisioned throughput mode, a fixed number of RU/s is reserved for a container (or
shared across a database) — from Lesson 31's `--throughput 400` example — and that capacity
is guaranteed and billed for, whether fully used or not. Requests that would exceed the
provisioned RU/s in a given second are throttled (returning a rate-limited response the SDK
retries with backoff), not simply queued indefinitely. Provisioned throughput fits workloads
with predictable, relatively steady traffic, where guaranteed capacity and predictable
billing matter more than paying only for exact usage. Autoscale, a variant of provisioned
throughput, automatically adjusts RU/s within a configured range based on actual usage —
covered fully in Chapter 8.

## Serverless mode

Serverless mode removes upfront RU/s provisioning entirely: there's no reserved capacity to
size, and billing is based purely on the RUs actually consumed by requests as they happen,
similar in spirit to consumption-based cloud billing elsewhere in Azure. This fits workloads
with unpredictable, spiky, or low-overall traffic, where paying for idle reserved capacity
would be real waste. The tradeoff is that serverless containers have lower maximum throughput
ceilings and storage limits than provisioned containers, and lack some multi-region and
autoscale capabilities — a genuine constraint, not a strictly-better free option.

## Key terms

| Term | Meaning |
|---|---|
| Request Unit (RU) | Cosmos DB's normalized cost measure for the compute/memory/I/O of one operation |
| RU/s | Request Units per second — the throughput rate provisioned or consumed |
| Provisioned throughput | A fixed, guaranteed, billed RU/s capacity reserved ahead of usage |
| Serverless mode | No reserved RU/s; billing based purely on RUs actually consumed |

## Check yourself

Why does a query with an `ORDER BY` clause or a cross-partition fan-out cost more RUs than a
simple point read by ID and partition key, and what does that mean for how a DBA should
think about query design?
