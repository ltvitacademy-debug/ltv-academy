# Manual & Automatic Failover

Lesson 19 established that automatic failover requires synchronous commit. This lesson covers
failover itself in full: the three failover modes, what actually triggers an automatic failover,
and how a manual (planned or forced) failover differs from both.

## What you'll learn

- The three failover types: automatic, manual (planned), and forced manual
- What specifically triggers an automatic failover under the hood
- Why a forced failover is a deliberate, acknowledged-risk operation, not a routine one

## Automatic failover

Requires **synchronous commit mode** and **automatic failover mode**, both configured on the same
secondary replica. When the primary becomes unavailable, the WSFC's health detection (via the
resource DLL SQL Server registers with the cluster) determines the primary has failed — based on
missed health-check pings within a configurable threshold — and, so long as the cluster still has
quorum, the cluster automatically promotes a synchronous secondary with automatic failover mode
to primary. This is the failover mode that actually achieves seconds-level RTO, and it happens
with no human involved.

## Manual (planned) failover

A planned failover is initiated deliberately, typically for maintenance (patching the current
primary, for example) or a controlled test. Run against a **synchronous** secondary:

```sql
ALTER AVAILABILITY GROUP [AG_Sales] FAILOVER;
```

Executed on the target secondary, this promotes it to primary with **no data loss**, because
synchronous commit already guarantees the secondary is caught up. This is the safe, routine way to
move the primary role around without an actual outage forcing the issue.

## Forced manual failover

If the primary is down and the only available secondary is **asynchronous**, a normal failover
isn't possible without accepting that some data might not have been replicated yet. A forced
failover:

```sql
ALTER AVAILABILITY GROUP [AG_Sales] FORCE_FAILOVER_ALLOW_DATA_LOSS;
```

This is a deliberate, explicit acknowledgment that data since the last hardened log record on that
secondary may be lost — it should be a last-resort, disaster-recovery-scenario operation
(exactly the scenario Lesson 13 described: promoting a remote DR replica after a declared
disaster), never a routine action.

## Why quorum matters even for automatic failover

Automatic failover only happens if the WSFC still has **quorum** — enough surviving cluster votes
to make a decision safely. If a network partition or enough node losses cause the cluster to lose
quorum, automatic failover does **not** happen, even if a perfectly healthy synchronous secondary
is sitting right there — the cluster deliberately refuses to act without quorum to avoid a
split-brain scenario where two nodes both believe they're primary. This is covered further in
Chapter 5's discussion of cluster quorum, but it's worth flagging here: a synchronous, automatic
failover-mode replica is still not a guarantee of automatic failover if quorum is lost at the same
time.

## The three modes, side by side

| Mode | Requires | Data loss | Trigger |
|---|---|---|---|
| Automatic | Sync commit + automatic failover mode + quorum | None | WSFC health detection |
| Manual (planned) | Sync commit | None | DBA-initiated `FAILOVER` |
| Forced manual | Any (usually async) | Possible | DBA-initiated `FORCE_FAILOVER_ALLOW_DATA_LOSS` |

## Key terms

| Term | Meaning |
|---|---|
| Automatic failover mode | AG setting, paired with synchronous commit, that allows the WSFC to promote a secondary without human action |
| Quorum | Enough surviving cluster votes for the WSFC to safely make a failover decision |
| Forced failover | Manual failover to an asynchronous (or otherwise not-caught-up) secondary, explicitly accepting possible data loss |

## Check yourself

A primary replica goes down. The only surviving secondary is configured for asynchronous commit
mode. Can this AG fail over automatically — and if a DBA needs to bring the AG back online anyway,
what command do they run, and what are they explicitly accepting by running it?
