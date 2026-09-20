# HA Technology Comparison

Four technologies keep coming up in this course: Availability Groups, Failover Cluster Instances,
log shipping, and replication. Each one gets sold, in vendor slide decks, as "the" HA answer. None
of them is. Each protects against a specific set of failures and leaves specific gaps, and an
honest comparison means naming both sides for each one — not just the marketing side.

## What you'll learn

- What each of the four technologies actually protects against
- What each one does *not* protect against
- Why "which one is best" is the wrong question to ask first

## Availability Groups (AGs)

**Protects against:** node failure, instance failure, and (with an async remote replica) site
failure — all with one technology. Failover can be automatic (synchronous mode) in seconds.
Readable secondaries can also offload reporting workload.

**Doesn't protect against:** a shared dependency across replicas that isn't actually shared
storage-based — since AGs use independent storage per replica, this is actually a strength over
FCI, not a gap. The real gaps are: it requires Windows Server Failover Clustering (WSFC) as a
dependency (or a cluster-less config on Linux, which trades some automatic-failover guarantees),
and databases must be in FULL recovery model with the same collation and, generally, comparable
edition/features across replicas.

## Failover Cluster Instances (FCI)

**Protects against:** the SQL Server instance or the node it's running on failing — the instance
itself moves to a surviving node in seconds, with a single shared name/IP.

**Doesn't protect against:** loss of the shared storage itself (the SAN, the cluster shared
volume) — since every node reads and writes the same disks, a storage failure or site loss takes
the whole cluster down at once. FCI is not a data-redundancy technology; it's an *instance*
redundancy technology.

## Log shipping

**Protects against:** loss of the primary server, with a secondary kept current by restoring log
backups on a schedule (often every few minutes to a few hours). Works well across real distance
because it tolerates latency.

**Doesn't protect against:** an automatic, fast failover — log shipping failover is a manual,
scripted process, and there's a real data-loss window equal to however much log hasn't been
shipped and restored yet. It also has no automatic redirection: applications must be repointed
manually or via a script.

## Replication

**Protects against:** almost nothing, in a failover sense. Transactional and other forms of
replication exist to *distribute* data — to reporting servers, to other applications, across
sites for read scaling — not to provide a clean failover target. A subscriber's schema and data
can drift from the publisher's in ways that make it an imperfect failover copy without careful
planning.

**Doesn't protect against:** primary failure, in the way the other three do. It's the odd one out
in this comparison precisely because failover was never its design goal.

## The comparison, side by side

| Technology | Protects against | Real gap |
|---|---|---|
| Availability Groups | Node, instance, and (with remote replica) site failure | Requires WSFC (or cluster-less tradeoffs); needs FULL recovery |
| FCI | Instance/node failure | Shared storage is a single point of failure |
| Log shipping | Primary server loss, over real distance | Manual failover; data-loss window between log restores |
| Replication | Nothing, by failover design | Not a failover technology at all — it's a distribution technology |

## Key terms

| Term | Meaning |
|---|---|
| WSFC | Windows Server Failover Clustering — the underlying cluster service AGs and FCI both depend on |
| Shared storage | Disk storage accessible to every FCI node — the technology's single point of failure |
| Data-loss window | The amount of committed data that could be lost on failover, driven by replication/shipping frequency and mode |

## Check yourself

A team wants one technology that protects a single SQL Server instance from a node crashing
tonight, without needing a second copy of the data on separate storage. Which of the four
technologies fits that specific requirement, and why do the other three either overshoot or
undershoot it?
