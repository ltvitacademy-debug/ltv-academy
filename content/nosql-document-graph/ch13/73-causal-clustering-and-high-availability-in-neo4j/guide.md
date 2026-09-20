# Causal Clustering & High Availability in Neo4j

SQL Server DBAs already know the shape of this problem from Always On Availability Groups:
one instance handling writes, other instances holding synchronized copies for failover and
read offloading, and a consensus mechanism deciding who's actually in charge. Neo4j solves
the same problem with **causal clustering**, an Enterprise Edition feature built around Raft
consensus. The vocabulary is different — core servers instead of AG replicas, read replicas
instead of readable secondaries — but the underlying reasoning about availability, write
consistency, and read scaling will feel familiar.

## What you'll learn

- The two server roles in a causal cluster: core servers and read replicas
- How Raft consensus decides which core server accepts writes
- What "causal consistency" actually guarantees for a client
- Why causal clustering is an Enterprise Edition feature, not a Community one

## Core servers: the write-capable, consensus-participating tier

A causal cluster's **core servers** hold the full graph and participate in the **Raft
consensus protocol** to agree on the order of writes and to elect a leader. At any moment,
one core server is the leader for a given database and accepts writes; the others are
followers that replicate the leader's transaction log. If the leader fails, the remaining
core servers hold a new leader election automatically — the same failover instinct as an
Always On Availability Group promoting a secondary replica to primary, just driven by Raft
rather than the Windows Server Failover Cluster.

Typical production deployments run an odd number of core servers (three or five) because
Raft, like most quorum-based consensus protocols, needs a majority to agree before a write or
a leader election is considered valid — the same reason you'd never want an even-numbered
quorum in a cluster you actually rely on for automatic failover.

## Read replicas: horizontal read scaling, not failover targets

**Read replicas** hold a full copy of the graph and serve read traffic, but they don't
participate in Raft consensus and can't become the leader. They pull committed transactions
from the core servers and apply them asynchronously. This is the direct equivalent of a SQL
Server Always On readable secondary used for reporting or read-offloading — you add read
replicas to scale out read throughput, not to add write availability. A cluster can have many
read replicas relative to a small, fixed set of core servers, because read replicas are cheap
to add and don't affect the write-consensus math.

```
-- dbms.mode in neo4j.conf on each server:
-- CORE           -> a core server (participates in Raft)
-- READ_REPLICA   -> a read replica (read-only, async copy)

dbms.mode=CORE
dbms.cluster.discovery.endpoints=core1:5000,core2:5000,core3:5000
```

## Causal consistency: what a client is actually guaranteed

The name "causal clustering" comes from the specific consistency guarantee it provides:
**causal consistency**. If a client writes data and then immediately reads, it's guaranteed
to see its own write — even if that read is routed to a different server than the write was.
Neo4j drivers accomplish this with **bookmarks**: after a write, the driver captures a
bookmark representing "how far the transaction log has progressed," and a subsequent read
session can pass that bookmark to require the server it talks to has caught up to at least
that point before running the query.

This matters because without it, a read replica that's a few milliseconds behind the leader
could serve a client a read that doesn't reflect the write that same client just made — a
subtle, confusing bug class relational DBAs know well from any async-replication read-replica
setup, including SQL Server Always On readable secondaries under asynchronous commit mode.

## Enterprise Edition, same as the rest of this chapter

Causal clustering, like fine-grained RBAC and online backup, is an **Enterprise Edition
feature**. Neo4j Community Edition runs as a single standalone instance with no built-in
clustering or automatic failover. If a client needs high availability and horizontal read
scaling from self-hosted Neo4j, Enterprise licensing (or Aura, covered two lessons from now)
is the real requirement — worth flagging early in a project rather than discovering it after
a Community deployment is already in production.

## Key terms

| Term | Meaning |
|---|---|
| Core server | A cluster member holding the full graph and participating in Raft consensus; can become leader |
| Read replica | A cluster member holding an async copy of the graph for read scaling; cannot become leader |
| Raft consensus | The protocol core servers use to elect a leader and agree on write order |
| Causal consistency | The guarantee that a client's read reflects its own prior write, enforced via bookmarks |

## Check yourself

A client wants to add ten read replicas to their three-core-server Neo4j cluster purely to
handle more write throughput. What's wrong with that plan, and what would actually solve their
problem?
