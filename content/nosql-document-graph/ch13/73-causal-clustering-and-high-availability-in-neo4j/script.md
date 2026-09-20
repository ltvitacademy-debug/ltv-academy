# Script — Causal Clustering & High Availability in Neo4j

## Segment 1 (title)

SQL Server DBAs already know this shape from Always On Availability Groups: one instance handling writes, others holding synchronized copies. Neo4j solves the same problem with causal clustering, an Enterprise Edition feature built around Raft consensus.

## Segment 2 (steps: core servers vs. read replicas)

Core servers hold the full graph and participate in Raft consensus to elect a leader — the same failover instinct as an Always On Availability Group promoting a secondary to primary. Read replicas hold an async copy and serve reads, but can never become the leader.

## Segment 3 (code: server role config)

Each server's role is set in neo4j.conf as CORE or READ_REPLICA. Production deployments run an odd number of core servers — three or five — because Raft needs a majority to agree before a write or leader election is valid.

## Segment 4 (code: causal consistency via bookmarks)

Causal consistency is the specific guarantee this gives you: a client that writes and then reads is guaranteed to see its own write, even if the read hits a different server. Neo4j drivers enforce this with bookmarks, requiring the server has caught up before running the query.

## Segment 5 (outro)

Causal clustering, like fine-grained RBAC and online backup, is an Enterprise Edition feature — Community runs as a single standalone instance with no built-in clustering. Next up: performance tuning in Neo4j.
