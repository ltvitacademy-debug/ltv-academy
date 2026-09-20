# Group Replication & MySQL InnoDB Cluster

Source-replica replication solves availability by giving a single writable server one or
more readable copies — but it doesn't automatically decide what happens when the source
fails, and it doesn't guarantee every replica has every committed transaction. MySQL's
answer to both problems is **Group Replication**, and the packaged product built on top of
it, **InnoDB Cluster**. This is MySQL's own native high-availability architecture, and it
works nothing like SQL Server Availability Groups or Oracle Data Guard underneath, even
though the goal — a self-healing group of database copies — is familiar.

## What you'll learn

- How Group Replication uses distributed consensus instead of a single log stream
- The difference between single-primary and multi-primary Group Replication modes
- What InnoDB Cluster actually is, and why it's three components, not one

## Group Replication: consensus instead of one-way streaming

Traditional replication is one-directional: the source produces a binlog stream, and each
replica pulls from it independently, with no communication between replicas and no agreement
protocol. **Group Replication** works differently. A set of MySQL servers forms a **group**,
and every member communicates with every other member. When a transaction is ready to
commit, it's broadcast to the group and **certified** — the group runs a distributed
agreement protocol (built on a Paxos-derived implementation called XCom) to confirm the
transaction doesn't conflict with anything else being committed concurrently, and that a
majority of the group has durably received it, before any member considers it committed.

This is what makes Group Replication meaningfully different from asynchronous or even
semisynchronous source-replica replication: it isn't "commit locally, then try to tell
everyone else." It's "get group agreement first." The practical effect is closer to
virtually synchronous replication — data loss on failover is far less likely, because a
transaction only counts as committed once a majority of the group has it. The tradeoff is
the same one every consensus-based system has: committing requires round trips to other
members, and if too many members are unreachable, the group loses the ability to safely
commit anything at all, rather than silently diverging.

Group Replication also handles failure detection and group membership itself. If a member
becomes unreachable, the rest of the group detects it, reconfigures itself to exclude it,
and keeps operating — no external monitoring process is required to notice a failure and
trigger a response, because the group protocol already knows who's alive.

## Single-primary vs. multi-primary mode

Group Replication runs in one of two modes.

**Single-primary mode** (the default and the far more common choice) designates exactly one
member of the group as the read-write primary at any time; every other member is read-only.
If the primary fails, the group's consensus protocol automatically elects a new primary from
the remaining members — no external failover tool decides this, the group decides it. This
mode looks the most familiar to a SQL Server DBA: one writable copy, automatic failover, and
a topology that avoids the hard conflict-resolution problems of accepting writes in more than
one place.

**Multi-primary mode** allows every member of the group to accept writes simultaneously.
This sounds attractive, but it pushes real complexity onto the application: two members can
receive conflicting writes to the same row at nearly the same time, and Group Replication's
certification process will abort one of those transactions to preserve consistency — meaning
the application has to be written to detect and retry certification failures. Multi-primary
mode is a genuine capability, not a marketing checkbox, but it's chosen deliberately for
specific write-scaling needs, not used as the default.

## InnoDB Cluster: the packaged solution

Group Replication is a server-level plugin — powerful, but on its own it doesn't include
connection routing or a convenient way to provision and manage the group. **InnoDB Cluster**
is MySQL's official answer to that gap, and it's explicitly three components working
together, not a single product:

- **Group Replication** — the replication and consensus engine described above.
- **MySQL Shell** — provides the **AdminAPI**, a set of JavaScript/Python functions
  (`dba.createCluster()`, `dba.configureInstance()`, `cluster.addInstance()`,
  `cluster.status()`) that provision and manage the group without hand-writing raw Group
  Replication configuration.
- **MySQL Router** — a lightweight routing layer, covered in the next lesson, that sits
  between applications and the cluster and directs connections to the current primary (and
  optionally to replicas for read traffic) without the application needing to track cluster
  membership itself.

Given that combination, a working mental model for a SQL-Server-background DBA is: Group
Replication plays a role similar in spirit to what Always On Availability Groups' underlying
replication does, MySQL Shell's AdminAPI plays a role similar in spirit to a cluster
management layer, and MySQL Router plays a role similar in spirit to a listener — but the
consensus mechanism underneath, and the fact these are three separately named, separately
versioned components rather than one integrated feature, is genuinely MySQL's own design.

## Key terms

| Term | Meaning |
|---|---|
| Group Replication | MySQL plugin providing consensus-based replication among a group of servers |
| Certification | The group agreement process a transaction goes through before being considered committed |
| XCom | The Paxos-derived group communication protocol Group Replication is built on |
| Single-primary mode | Group Replication mode with one read-write primary and automatic primary election on failure |
| Multi-primary mode | Group Replication mode where every member accepts writes, requiring conflict handling |
| InnoDB Cluster | MySQL's packaged HA solution combining Group Replication, MySQL Shell's AdminAPI, and MySQL Router |
| AdminAPI | MySQL Shell's set of functions for provisioning and managing an InnoDB Cluster |

## Check yourself

A three-member Group Replication cluster in single-primary mode loses its current primary.
What decides which of the remaining two members becomes the new primary, and does the DBA
need to run a manual failover command for it to happen?
