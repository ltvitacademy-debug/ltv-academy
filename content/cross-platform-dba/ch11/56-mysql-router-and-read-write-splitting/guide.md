# MySQL Router & Read/Write Splitting

An InnoDB Cluster automatically re-elects a new primary when the old one fails — but an
application that has an open connection or a hardcoded hostname pointed at the old primary
doesn't automatically know that happened. **MySQL Router** is the piece that closes that
gap: it sits between applications and the cluster, always knows the current topology, and
routes connections accordingly, so the application never has to.

## What you'll learn

- What MySQL Router actually does, and why it's a required third piece of InnoDB Cluster
- How Router's default read-write and read-only ports work
- What read/write splitting means, and how Router can provide it

## What MySQL Router actually is

MySQL Router is a lightweight, stateless middleware process. It doesn't store data and it
doesn't participate in Group Replication's consensus — it sits in front of the cluster,
maintains a connection to the cluster's metadata (which member is currently the read-write
primary, which members are read-only, which are unavailable), and proxies client connections
to the correct backend member based on that metadata. Applications connect to Router the same
way they'd connect to a single MySQL server; Router decides where the connection actually
goes.

Router is provisioned with `mysqlrouter --bootstrap`, pointed at any member of the cluster.
Bootstrapping reads the cluster's metadata and writes a Router configuration file with the
connection details it needs — it doesn't require the DBA to hand-configure which member is
currently primary, because that can change at any time.

This is the piece that makes automatic failover actually transparent to applications. When
Group Replication elects a new primary after a failure, Router picks that up from the cluster
metadata and starts directing write traffic to the new primary — the application's connection
string never has to change, and in most cases it doesn't even need to reconnect for very long
before Router has adjusted.

## Default ports: read-write and read-only

Out of the box, a bootstrapped Router exposes separate ports for separate traffic:

- **6446** — the classic MySQL protocol read-write port. Every connection here is routed to
  whichever member is currently the cluster's primary.
- **6447** — the classic MySQL protocol read-only port. Connections here are load-balanced
  (round-robin, by default) across the cluster's available read-only members.
- **6448 / 6449** — the equivalent ports for the X Protocol (MySQL's document-store and
  async-client protocol), read-write and read-only respectively.

This is the traditional shape of "read/write splitting" with MySQL Router: it's connection-
level, not statement-level. The application decides, at the point it opens a connection,
whether that connection is going to do writes or only reads, and connects to the matching
port. A reporting service that only ever issues `SELECT`s connects to 6447 and gets
distributed across every available replica; the application's write path connects to 6446 and
always lands on the current primary, wherever that currently is.

## Statement-aware splitting within a single connection

Connection-level splitting works well when an application cleanly separates its read-only
workloads from its read-write workloads into different connection pools — but plenty of real
applications mix reads and writes on the same connection, inside the same transaction. To
address that, more recent MySQL Router releases added a genuine **read/write splitting**
routing mode that inspects individual statements on a single connection and can direct reads
to a replica and writes to the primary automatically, rather than requiring the application to
open two separate pools and choose between them itself. This is meaningfully more capable than
the older two-port model, but it also has to be more careful: splitting reads onto a replica
mid-transaction has to respect transaction and consistency semantics, so Router only splits
traffic it can determine is safe to split.

For a cross-platform DBA, the takeaway that matters most is the goal, not the exact routing
mechanics: reads scale out across replicas, writes always land on the one current primary, and
the application is insulated from tracking cluster membership itself. That's the same scaling
motivation behind read-only routing in Availability Groups — reached here through Router
sitting in front of an InnoDB Cluster rather than a listener and read-only routing lists.

## Key terms

| Term | Meaning |
|---|---|
| MySQL Router | Lightweight, stateless middleware that routes client connections to the correct InnoDB Cluster member |
| `mysqlrouter --bootstrap` | Command that provisions Router by reading a cluster's metadata |
| Read-write port (6446) | Default classic-protocol port always routed to the current primary |
| Read-only port (6447) | Default classic-protocol port load-balanced across read-only members |
| X Protocol | MySQL's document-store/async client protocol, with its own Router ports (6448/6449) |
| Read/write splitting | Routing reads to replicas and writes to the primary, whether by separate ports or within a single connection |

## Check yourself

An application opens one connection to MySQL Router's port 6447 and issues only `SELECT`
statements on it. If the cluster has two available read-only replicas, what determines which
one actually serves that query, and does that choice ever involve the current primary?
