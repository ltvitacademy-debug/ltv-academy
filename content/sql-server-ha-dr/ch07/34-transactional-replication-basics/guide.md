# Transactional Replication Basics

The previous lesson named transactional replication as the workhorse type. This lesson
opens it up: the three-role architecture that makes it work, and the two agents that
actually move data from publisher to subscriber. Every transactional replication
troubleshooting scenario in a later lesson traces back to one of these two agents
falling behind or failing.

## What you'll learn

- The publisher/distributor/subscriber roles and how they relate
- What the Log Reader Agent actually does
- What the Distribution Agent actually does, and why the split matters

## The three roles

- **Publisher** — the source database. It defines what's replicated through one or more
  **publications** (a publication groups one or more **articles**, where an article is
  typically a table, or a filtered/partial view of one).
  - **Distributor** — a SQL Server instance (can be the publisher itself, or a separate
  dedicated server for load isolation) that holds the **distribution database**, a
  staging area where captured changes sit until they're delivered to subscribers.
  - **Subscriber** — the destination database that receives the replicated articles.
  A publisher can have many subscribers; a subscriber can also be a distributor for a
  different topology tier in more complex setups.

## The two agents that do the actual work

- **Log Reader Agent** — runs on the distributor, connects to the publisher, and reads
  the publisher's transaction log directly, looking for committed transactions that
  touch published articles. It doesn't wait for a scheduled job in the way a backup does
  — it runs continuously, which is what makes transactional replication near-real-time.
  Qualifying transactions get copied into the distribution database as a queue of
  commands.
- **Distribution Agent** — reads that queued command stream out of the distribution
  database and applies it to each subscriber, in the same order the transactions
  originally committed on the publisher. This agent can run *at the distributor* (push
  subscriptions) or *at the subscriber* (pull subscriptions) — a topology choice that
  affects where the delivery workload runs, not what gets delivered.

## Why the log-reader/distribution split exists

Splitting change-capture from change-delivery means one slow or unreachable subscriber
doesn't block change capture on the publisher, and it means the publisher's transaction
log can still be truncated by a log backup as soon as the Log Reader Agent has consumed
those transactions — it doesn't have to wait for every subscriber to catch up. This is
also the seam where most real-world replication problems live: a distribution agent that
falls behind (or stops entirely) causes commands to pile up in the distribution database
while the log reader keeps working just fine, which is exactly the kind of partial
failure the next two lessons cover.

## Initial synchronization, briefly

Before ongoing transactional replication can begin, the publisher and subscriber need to
start from the same baseline. That baseline is delivered by a snapshot — the Snapshot
Agent generates it and the Distribution Agent applies it to the subscriber once, after
which the Log Reader/Distribution Agent pair takes over for all subsequent incremental
changes. This is the connection back to the previous lesson: snapshot replication isn't
just its own standalone type, it's also step zero for transactional replication.

## Key terms

| Term | Meaning |
|---|---|
| Publication | The definition of what's replicated from a publisher, made of one or more articles |
| Article | A published object, typically a table (or a filtered subset of one) |
| Distribution database | The staging database on the distributor holding queued replicated commands |
| Log Reader Agent | Reads the publisher's transaction log continuously for committed changes to published articles |
| Distribution Agent | Applies queued commands from the distribution database to each subscriber, in original commit order |
| Push subscription | Distribution Agent runs at the distributor |
| Pull subscription | Distribution Agent runs at the subscriber |

## Check yourself

A subscriber has been offline for several hours while the publisher kept processing
transactions normally. When the subscriber comes back online, does the Log Reader Agent
need to catch up, the Distribution Agent, or both — and why?
