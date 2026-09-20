# Replication Monitoring

Replication runs continuously and unattended, which means the first sign of trouble is
often silence — no error, just a subscriber quietly falling further behind. This lesson
covers the real tools for catching that before a stakeholder notices stale reports:
Replication Monitor, tracer tokens, and the agent job history that backs both of them.

## What you'll learn

- What Replication Monitor actually shows and how to read it
- How tracer tokens measure real end-to-end latency
- Why agent job history is often the fastest first check

## Replication Monitor

Replication Monitor is the built-in SSMS tool (right-click a publication → **Launch
Replication Monitor**) for watching a topology's health. It lists each publication and
its subscriptions, shows the current status of the Log Reader and Distribution Agents
(running, idle, or failed), reports the number of pending commands sitting in the
distribution database for each subscription, and shows recent history for each agent —
including the actual error message when an agent has failed, which is usually the
fastest path to a root cause. It's the first place to look when something feels off,
before diving into individual agent job logs.

## Tracer tokens: measuring real latency

A tracer token is a small, harmless marker transaction inserted at the publisher
specifically to measure how long it actually takes to travel the full path: from the
publisher's log, through the Log Reader Agent, into the distribution database, through
the Distribution Agent, and finally committed at each subscriber. Replication Monitor
records the timestamp at each hop, which breaks the total latency into two numbers that
matter separately: publisher-to-distributor time (Log Reader Agent's job) and
distributor-to-subscriber time (Distribution Agent's job). That split is what tells you
*which* agent is actually the bottleneck rather than just "replication feels slow."

## Agent job history — the fastest first check

Every replication agent (Log Reader, Distribution, Snapshot, and others) runs as a SQL
Server Agent job under the hood. Checking that job's history in SQL Server Agent — same
place you'd check any other Agent job — often surfaces a failure or a long-running
execution faster than opening Replication Monitor, especially when you already suspect
which agent is involved. In practice, experienced DBAs check both: Agent job history for
a quick "did something fail and why," and Replication Monitor for the fuller picture of
pending command counts and cross-subscriber comparison.

## Putting it together

A healthy transactional replication topology has near-zero pending commands most of the
time, tracer tokens completing in a small, consistent window, and clean agent job
history with no repeated failures. Monitoring isn't a one-time setup step — it's an
ongoing practice, because the failure modes covered in the next lesson (a stalled
distribution agent, identity range exhaustion, a breaking schema change) all show up
first as a change in one of these three signals.

## Key terms

| Term | Meaning |
|---|---|
| Replication Monitor | SSMS tool showing publication/subscription status, agent state, and pending command counts |
| Tracer token | A marker transaction used to measure real end-to-end replication latency, hop by hop |
| Pending commands | Commands captured but not yet delivered to a given subscriber |
| Agent job | The underlying SQL Server Agent job each replication agent (Log Reader, Distribution, Snapshot) runs as |

## Check yourself

A tracer token shows fast publisher-to-distributor time but slow distributor-to-subscriber
time. Which agent is the likely bottleneck, and where would you check next to confirm it?
