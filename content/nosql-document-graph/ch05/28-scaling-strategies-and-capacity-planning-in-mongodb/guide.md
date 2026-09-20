# Scaling Strategies & Capacity Planning in MongoDB

This lesson closes out the MongoDB section of the course by tying together everything from
Chapters 2 through 5 into a single decision framework: when a MongoDB deployment is running
out of headroom, what actually fixes it? The honest answer depends entirely on what kind of
pressure the system is under — and picking the wrong lever wastes real money and engineering
time without solving the real bottleneck.

## What you'll learn

- Vertical scaling: what it fixes, and its hard ceiling
- Adding replicas for read scaling, and its real limits
- Sharding for write scaling, and when it's genuinely necessary
- A decision framework for choosing between them

## Vertical scaling: the first, simplest lever

Vertical scaling means giving the existing `mongod` instance more CPU, RAM, or faster disk
(NVMe over spinning disk, for instance). It's the simplest option because it requires no
architectural change — no new replica set members, no shard key decision. It genuinely
solves problems caused by insufficient working-set memory (the portion of data and indexes
MongoDB needs cached in RAM for good performance) or CPU-bound query load on a single node.
Its ceiling is real, though: there's a maximum instance size available from any cloud
provider, and it does nothing at all for write throughput once a single node's disk I/O is
saturated — more RAM doesn't help if the disk itself can't keep up with write volume.

## Adding replicas: scaling reads, not writes

Replica sets, from Lesson 23, exist primarily for availability — but secondary members can
also serve read traffic when the driver is configured with an appropriate read preference
(`secondaryPreferred`, for example). Adding more secondaries genuinely scales *read*
capacity, because each additional secondary is another node that can serve read queries.
It does nothing for write throughput, though: every write still goes to the single primary,
regardless of how many secondaries exist. Reads from secondaries can also return slightly
stale data under replication lag — a real consistency tradeoff, not a free win. This is the
right lever specifically when the bottleneck is read query volume, not write volume or total
data size.

## Sharding: scaling writes and total data volume

Sharding, from Lessons 25 and 26, is the lever for when write throughput or total dataset
size exceeds what any single primary and its disk can handle, no matter how large that one
node gets. Distributing data (and the writes that create it) across multiple shards is the
only strategy here that scales writes horizontally. It's also the most operationally complex
option — a bad shard key choice, as Lesson 25 covered, can create hot shards that don't
actually solve the problem, and rebalancing/resharding an already-large collection is
expensive. Sharding is genuinely necessary when the data or write load has outgrown what
vertical scaling and replicas can address — it isn't the default first move.

## A capacity planning framework

The practical order most real deployments follow: diagnose whether the pressure is on reads,
writes, or storage using the monitoring tools from Lesson 22 (`mongostat`, `mongotop`, Atlas
metrics); try vertical scaling first for CPU/RAM-bound single-node pressure; add replicas
when read query volume is the specific bottleneck; and reach for sharding only when write
throughput or data volume has genuinely outgrown a single primary. Reaching for sharding
first, before confirming the other two options are actually exhausted, is a common and
costly mistake — it adds real operational complexity that a replica set or a bigger instance
might have avoided entirely.

## Key terms

| Term | Meaning |
|---|---|
| Vertical scaling | Increasing CPU, RAM, or disk speed on an existing node, with no architectural change |
| Working set | The portion of data and indexes MongoDB needs cached in RAM for good performance |
| Read preference | Driver setting controlling whether reads go to the primary, secondaries, or a mix |
| Horizontal scaling | Adding more nodes (replicas for reads, shards for writes) rather than growing one node |

## Check yourself

A MongoDB deployment is experiencing write throughput bottlenecks specifically — writes are
slow, but read query performance is fine. Which scaling strategy actually addresses this, and
why won't adding more replica set secondaries help?
