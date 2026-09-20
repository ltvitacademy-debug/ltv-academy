# Replica Sets: Architecture & Failover

A SQL Server DBA already knows why replication exists: one copy of your data is a single
point of failure, and a transaction log is what lets a secondary catch up and stay current.
MongoDB's answer to the same problem is the **replica set** — a group of `mongod` instances
that hold the same data, elect one of themselves as primary, and use their own internal
transaction log, the **oplog**, to keep secondaries in sync. The concepts map closely to
what you already know; the mechanism and vocabulary are MongoDB's own.

## What you'll learn

- The roles inside a MongoDB replica set: primary, secondaries, and arbiter
- The oplog, and why it's a genuine (not superficial) analog to a transaction log
- How automatic failover actually works via election

## Primary, secondaries, and arbiter

A replica set is a set of `mongod` processes maintaining the same data set. At any moment,
exactly one member is the **primary** — it's the only member that accepts writes. The rest
are **secondaries**, which replicate the primary's operations and can serve reads (if the
application opts into that with a read preference). An optional **arbiter** holds no data
at all; it exists purely to vote in elections, useful for keeping the total member count odd
without paying for a full extra data-bearing node. A production replica set is typically
three data-bearing members — enough to survive one node loss while still holding a majority.

## The oplog: MongoDB's transaction log

Every write on the primary is recorded as an idempotent entry in the **oplog** (`oplog.rs`),
a special capped collection in the `local` database. Secondaries continuously tail the
primary's oplog and apply each entry to their own copy of the data — this is what
replication actually *is* in MongoDB, not a periodic snapshot copy. This is a genuine
parallel to a SQL Server transaction log shipping to a secondary, not just a
naming coincidence: both are an ordered, replayable record of every change, and both
secondaries fall behind (replication lag) if they can't keep applying entries fast enough.
The oplog is capped in size, so a secondary that's offline too long can fall outside the
oplog window and require a full resync.

## Automatic failover via election

If the primary becomes unreachable — a crash, a network partition, a planned maintenance
step-down — the remaining voting members hold an **election** to pick a new primary. Each
data-bearing member's replication state (how caught-up it is) and configured priority feed
into the vote; a member needs a majority of the replica set's votes to become primary. This
is the real headline feature relative to old-school SQL Server standalone instances: failover
is automatic, typically completing within seconds, with no DBA paged at 2 a.m. to manually
promote a secondary. The tradeoff is a real one worth naming honestly: during the election
window the replica set has no primary and briefly can't accept writes, and any writes that
hadn't yet replicated to the newly elected primary can be rolled back.

## Key terms

| Term | Meaning |
|---|---|
| Replica set | A group of `mongod` instances holding the same data, with one primary and one or more secondaries |
| Oplog | Capped collection recording every write on the primary, in order, for secondaries to replay — MongoDB's transaction log |
| Election | The automatic voting process a replica set runs to choose a new primary when the current one is unreachable |
| Arbiter | A voting-only replica set member that holds no data, used to break ties without adding a data node |

## Check yourself

Why is the oplog described as a genuine analog to a SQL Server transaction log, rather than
just a superficial naming similarity — and what happens to a secondary that falls behind the
oplog's capped window?
