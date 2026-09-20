# Partitioning in Cosmos DB: Choosing a Partition Key

Lesson 31 flagged the partition key path as the single most consequential decision made
when provisioning a container. This lesson explains why, by walking through how Cosmos DB
actually partitions data, and the real selection criteria for a good partition key — which
will feel genuinely familiar, because it's the same underlying concern as choosing a shard
key in MongoDB back in Lesson 25.

## What you'll learn

- Logical partitions versus physical partitions in Cosmos DB
- The two real properties a good partition key needs
- Why a bad partition key choice causes real, expensive problems

## Logical partitions and physical partitions

Every item (document) in a container has a partition key value, and all items sharing the
same partition key value form a **logical partition** — Cosmos DB's internal unit of data
distribution. Cosmos DB automatically maps one or more logical partitions onto **physical
partitions**, the actual underlying compute and storage units, and manages that mapping
transparently as data volume and throughput grow. A DBA never manually creates or manages
physical partitions the way a MongoDB DBA manually configures shard servers — but the
partition *key* choice still directly determines how well that automatic distribution
works.

## What makes a good partition key: cardinality

A good partition key needs **high cardinality** — a large number of distinct possible
values. A partition key like `orderStatus` (with maybe five possible values: pending,
shipped, delivered, cancelled, returned) is a poor choice, because it can only ever create
five logical partitions, capping how much the container can scale no matter how much
throughput is provisioned. A key like `customerId` or `orderId`, with potentially millions
of distinct values, allows Cosmos DB to spread data and load across many logical partitions.
This is the exact same underlying concern as MongoDB shard key cardinality from Lesson 25 —
low-cardinality keys create a hard ceiling on distribution regardless of the underlying
engine.

## What makes a good partition key: even distribution

Cardinality alone isn't sufficient — the key also needs to distribute both **storage** and
**request volume** evenly across logical partitions. A `customerId` key is a poor choice if
one customer (say, a very large enterprise account) generates a disproportionate share of
all requests: that customer's logical partition becomes a "hot partition," throttled once it
exceeds its share of the container's provisioned RU/s, even while other partitions sit
mostly idle. A well-chosen key spreads both the data volume and the actual read/write
traffic roughly evenly across all logical partitions it creates.

## The real cost of a bad choice

Because the partition key path is fixed for the life of a container (from Lesson 31),
discovering a bad choice after a container is already populated with production data is
expensive to fix — it generally requires creating a new container with a better key and
migrating all the data across, not an in-place edit. This mirrors the real cost of a bad
MongoDB shard key from Lesson 25: in both systems, the distribution decision has to be made
correctly up front, based on genuine knowledge of the application's real access pattern, not
guessed at and corrected later cheaply.

## Key terms

| Term | Meaning |
|---|---|
| Partition key | The property whose value determines which logical partition an item belongs to |
| Logical partition | The set of all items sharing one partition key value; Cosmos DB's internal distribution unit |
| Physical partition | The actual compute/storage unit Cosmos DB automatically maps logical partitions onto |
| Hot partition | A logical partition receiving disproportionate request volume, getting throttled independently of others |

## Check yourself

Why does a partition key like `orderStatus`, with only five possible values, make a poor
choice even if the container is expected to hold hundreds of millions of orders?
