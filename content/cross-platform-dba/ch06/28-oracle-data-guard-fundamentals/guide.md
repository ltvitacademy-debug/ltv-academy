# Oracle Data Guard Fundamentals

Everything through Chapter Five assumed a single Oracle instance. This chapter is about
keeping the database alive when that one instance, or the server under it, fails — Oracle's
answer to the problem SQL Server Availability Groups solve. The purpose is genuinely the
same: protect against data loss and minimize downtime. The architecture underneath it is
not the same, and treating **Data Guard** as "Oracle's AG with different menu names" will
get you into trouble fast.

## What you'll learn

- What Data Guard actually is: primary and standby databases, not a cluster
- Redo transport and redo apply — how a standby stays current
- The three protection modes and the tradeoff each one makes
- Switchover vs. failover, and why that distinction matters operationally
- Where Data Guard is genuinely like an Availability Group, and where it isn't

## Primary and standby: not a Windows failover cluster

**Data Guard** maintains one or more **standby databases** as synchronized copies of a
single **primary database**. That's the whole model — there's no shared quorum, no cluster
service, no Windows Server Failover Clustering underneath it the way a SQL Server FCI or
classic AG relies on Windows clustering. A standby is a complete, separate Oracle database,
typically on its own server, kept in sync by continuously receiving and applying the
primary's redo. Data Guard can maintain a standby in the same data center or thousands of
miles away, and a single primary can have multiple standbys simultaneously — a local one for
fast failover and a remote one for regional disaster recovery, for instance.

## Redo transport and redo apply

Redo generated on the primary is shipped to each standby (**redo transport**), then applied
there (**redo apply**) to keep it current — conceptually similar to how SQL Server AGs ship
and redo transaction log records, but with Oracle's own mechanics and terminology. Transport
can be synchronous (`SYNC` — the primary waits for the standby to confirm receipt before
committing, zero data loss, adds latency) or asynchronous (`ASYNC` — the primary doesn't
wait, minimal performance impact, a small window of potential data loss on failure). This
sync/async choice is the direct analog of an AG's synchronous-commit vs. asynchronous-commit
replica, and it's the same fundamental tradeoff every replication technology in this course
has to make.

## Protection modes: naming the tradeoff explicitly

Data Guard names the transport tradeoff as an explicit, configurable database property:

- **Maximum Protection** — synchronous transport to at least one standby, zero data loss;
  if no standby can confirm, the primary actually shuts down rather than risk unprotected
  data loss. The strictest mode, rarely chosen without a very good reason.
- **Maximum Availability** — synchronous transport, but the primary keeps running even if
  it temporarily can't reach a synchronized standby (it doesn't shut down). The common
  choice when zero data loss matters but total unavailability of the primary is worse.
- **Maximum Performance** — asynchronous transport, the default mode, minimal impact on
  primary throughput, a small potential data-loss window if the primary fails before
  shipping the latest redo.

## Switchover vs. failover

A **switchover** is a planned, no-data-loss role swap between primary and standby — used
for maintenance, testing a standby, or deliberately relocating the primary role — and both
databases end the operation healthy, just with roles reversed. A **failover** is what
happens when the primary is actually gone: a standby is transitioned to primary because
there's no choice, and depending on protection mode and how current the standby was, some
redo may not have made it across. Data Guard also supports **Fast-Start Failover**, where an
**Observer** process monitors the primary and standby and can trigger an automatic failover
without a DBA in the loop — the closest analog to an AG's automatic failover, but it's an
opt-in feature layered on top of Data Guard, not the default behavior.

## Where the AG comparison holds, and where it breaks

The purpose lines up closely: protect against data loss, provide a failover target, reduce
downtime. What doesn't line up: Data Guard has no underlying Windows/Pacemaker cluster
resource manager, no shared virtual network name that just moves, and — as later lessons
cover — a **physical standby** and a **logical standby** are structurally different in a
way that has no single AG equivalent. Getting comfortable with "primary/standby plus redo
transport" as its own model, rather than mentally substituting AG vocabulary, is the goal of
this lesson.

## Key terms

| Term | Meaning |
|---|---|
| Data Guard | Oracle's primary HA/DR technology, maintaining synchronized standby databases |
| Redo transport | Shipping redo from the primary to a standby (SYNC or ASYNC) |
| Redo apply | Applying shipped redo on the standby to keep it current |
| Protection mode | Maximum Protection, Maximum Availability, or Maximum Performance — the transport/durability tradeoff |
| Switchover | A planned, no-data-loss role swap between primary and standby |
| Failover | An unplanned promotion of a standby to primary after the primary is lost |
| Fast-Start Failover | Opt-in automatic failover managed by an Observer process |

## Check yourself

A company wants zero data loss but can't tolerate the primary shutting itself down if a
standby becomes unreachable. Which protection mode fits, and what does it actually
guarantee versus what Maximum Protection guarantees?
