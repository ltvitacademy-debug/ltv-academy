# Synchronous vs. Asynchronous Replicas

Lesson 18's `CREATE AVAILABILITY GROUP` statement set `AVAILABILITY_MODE = SYNCHRONOUS_COMMIT`
on both replicas without explaining what that commit behavior actually means. This lesson makes
that explicit, because the choice between synchronous and asynchronous commit is the single
biggest factor in what an AG actually promises about data loss versus performance.

## What you'll learn

- Exactly what "commit" means in each availability mode, step by step
- The real latency and data-loss tradeoff between the two
- Why synchronous commit is required for automatic failover, and why that has a cost

## Synchronous commit, step by step

1. A transaction commits on the primary.
2. The primary sends the log record to the secondary.
3. The secondary writes (**hardens**) that log record to its own local transaction log.
4. The secondary confirms hardening back to the primary.
5. Only *after* that confirmation does the primary report the commit as successful back to the
   client application.

This means the primary waits on the secondary before telling the client "done." The result:
**zero data loss** on failover, because by definition nothing is considered committed until the
secondary already has it durably logged too. The cost is added latency on every write — how much
depends on network round-trip time between the replicas, which is why synchronous replicas are
almost always kept close together (same datacenter or nearby, low-latency network).

## Asynchronous commit, step by step

1. A transaction commits on the primary.
2. The primary reports the commit as successful back to the client **immediately** — it does not
   wait for the secondary at all.
3. The log record is sent to the secondary and hardened there, but on the secondary's own
   schedule, independent of when the primary already told the client "done."

This means writes are fast — the secondary's distance and network latency don't slow down the
primary's response time. The cost: if the primary fails before the secondary has hardened the
most recent log records, those transactions are **lost** on failover to that secondary. This is
the correct tradeoff for replicas placed at real distance (a DR site in another city), where
forcing synchronous commit would make every write wait on cross-country network latency.

## Why this connects directly to failover mode

**Automatic failover requires synchronous commit.** SQL Server only allows automatic failover
mode to be configured on a replica that is also in synchronous commit mode — this isn't a policy
choice, it's enforced, because automatically promoting an asynchronous secondary could silently
lose data with no human in the loop to confirm that's acceptable. Asynchronous replicas can only
ever be failed over to manually (forced, with explicit acknowledgment of potential data loss).
Lesson 21 covers this failover-mode relationship in full.

## Choosing between them in practice

A common real-world topology uses **both** in one AG: a synchronous secondary nearby for
automatic HA failover with zero data loss, and an asynchronous secondary at a remote DR site,
accepting some potential data loss in exchange for surviving a site-wide disaster. This is exactly
the "one technology, two jobs" pattern described in Lesson 13.

## Key terms

| Term | Meaning |
|---|---|
| Hardening | Writing a log record durably to a replica's own local transaction log |
| Synchronous commit | Primary waits for secondary's hardening confirmation before reporting commit success — zero data loss, added latency |
| Asynchronous commit | Primary reports commit success immediately, without waiting for the secondary — lower latency, possible data loss on failover |

## Check yourself

A secondary replica sits in a datacenter 2,000 miles away from the primary. A DBA configures it
for synchronous commit anyway, hoping for zero data loss. What real-world problem does this
introduce, and what would the honest alternative configuration be?
