# RPO/RTO in a Real DR Plan

The previous lesson listed RPO and RTO as one of five components in a DR plan document.
This lesson goes deeper on those two numbers specifically, because they're the ones that
actually drive technology decisions — get them wrong, or leave them vague, and every
technology choice built on top of them is arguably wrong too.

## What you'll learn

- Precise definitions of RPO and RTO, and how they differ
- How a tight RPO forces a specific class of technology
- How a tight RTO forces a specific class of technology

## RPO: how much data loss is acceptable

**Recovery Point Objective** answers: if disaster strikes right now, how much recent
data are we willing to lose? An RPO of 15 minutes means recovery must be possible to a
point no more than 15 minutes before the failure. RPO is fundamentally about the *gap
between* protection points — how far apart backups or replication events are allowed to
be.

- A loose RPO (hours) can be met with periodic log backups on a FULL-recovery database,
  or even nightly full backups on a less-critical SIMPLE-recovery database.
- A tight RPO (seconds, or zero) requires something that captures every committed
  transaction continuously and gets it somewhere safe immediately — synchronous
  replication in an Availability Group, or synchronous database mirroring, where the
  transaction isn't considered committed until it's hardened at the secondary too.

## RTO: how much downtime is acceptable

**Recovery Time Objective** answers: once disaster strikes, how long can the system
actually be down before it's back and usable? RTO is about the *speed of the recovery
process itself* — how long restoring, failing over, or rebuilding takes.

- A loose RTO (many hours) can tolerate a manual restore process: someone gets paged,
  locates the right backups, runs the restore sequence, verifies the application, and
  brings it back — all fine if the business can absorb that much downtime.
- A tight RTO (minutes, or automatic) requires a technology that fails over on its own
  or with minimal manual intervention — an Availability Group configured for automatic
  failover with a listener, or a failover cluster instance, where the application
  reconnects to the same endpoint with little to no manual restore work involved.

## Why the two numbers point to different technology decisions

RPO and RTO are independent — a system can have a tight RPO and a loose RTO, or the
reverse, and the right technology choice follows from *which* number is actually tight
for that specific system:

| Requirement | What it forces |
|---|---|
| Tight RPO only | Synchronous replication or frequent log backups — data loss minimized, but recovery can still be a slower, manual process |
| Tight RTO only | Automatic or fast failover — but if it's asynchronous, some recent data can still be lost |
| Both tight | Synchronous AG (or FCI for instance-level) — automatic failover with no data loss, at the cost of the synchronous performance overhead covered in Chapter 4 |
| Both loose | Backups alone (with FULL or even SIMPLE recovery) may be entirely sufficient — no HA technology required |

## Getting this wrong

The realistic failure isn't the business rejecting a proposed RPO/RTO — it's the
business never being asked, so IT guesses (usually optimistically) or defaults to
whatever technology happens to already be in place. A DBA's job in this component of
the plan is translating a real business conversation about acceptable loss and downtime
into the specific technology from this course that actually delivers it — not the other
way around.

## Key terms

| Term | Meaning |
|---|---|
| RPO (Recovery Point Objective) | Maximum acceptable data loss, measured as a time gap between protection points |
| RTO (Recovery Time Objective) | Maximum acceptable downtime, measured as time to restore service |
| Synchronous replication | Transaction isn't committed until hardened at the secondary — supports a near-zero RPO |
| Automatic failover | Failover with minimal manual steps — supports a tight RTO |

## Check yourself

A business says a database can lose up to 4 hours of data but must be back online within
5 minutes of a failure. What does that combination of RPO and RTO actually require,
and what would be an inadequate solution that only addresses one of the two numbers?
