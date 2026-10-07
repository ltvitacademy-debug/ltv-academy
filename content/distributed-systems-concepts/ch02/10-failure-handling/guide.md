# Failure Handling

Lesson 6 established that you can never fully distinguish a slow node from a dead one — you can only infer failure, never confirm it. This lesson covers the practical mechanisms systems use to make that inference, contain the damage when it's wrong, and in the most important case, actually replace a failed node through majority consensus.

## What you'll learn

- How failure detection actually works: heartbeats and timeouts
- Partial failure and cascading failure, and why one slow service can take down others
- Circuit breakers, and the retry/timeout patterns that back them
- How a cluster elects a new leader after a failure, using Raft-style consensus

## Detecting failure: heartbeats and timeouts

A **heartbeat** is a small, regular "I'm still here" message a node sends to the rest of the cluster. If other nodes stop receiving heartbeats from a node within some **timeout** window, they treat it as failed. This is a judgment call, not a certainty: set the timeout too short, and a merely slow (but alive) node gets wrongly declared dead; set it too long, and a genuinely dead node stays "alive" in the cluster's eyes for longer than it should. Every real system tunes this trade-off deliberately.

## Partial failure and cascading failure

A **partial failure** affects only some nodes or some requests, not the whole system — which sounds easier than a total outage, but is often harder to handle, because the rest of the system has to keep working around a hole. Left unmanaged, a partial failure can turn into a **cascading failure**: one slow or failed service causes callers to pile up waiting on it, which exhausts their own resources (threads, connections, memory), which makes *them* slow or unresponsive to *their* callers, and the failure spreads outward — often taking down services that had nothing wrong with them originally.

## Circuit breakers, timeouts, and retries

A **timeout** caps how long a caller will wait for a response before giving up — the first defense against a single slow dependency holding resources forever. A **circuit breaker** goes further: after enough recent failures or timeouts calling a dependency, it "opens" and stops sending requests to that dependency at all for a cooldown period, failing fast instead of piling up waiting calls — which is exactly what prevents the cascading failure pattern above. After the cooldown, it allows a trial request through to see if the dependency has recovered before fully "closing" again.

## Recovering from failure: leader election by consensus

Many distributed systems designate one node as the **leader**, responsible for coordinating writes, while the rest are **followers**. When the leader fails, the cluster needs to agree on a new one — and it needs to do that correctly even though, as Lesson 6 established, no node can be *certain* the old leader is actually dead rather than just slow. **Raft** (and the earlier, harder-to-explain **Paxos**) solve this with majority consensus:

1. Followers expect regular heartbeats from the leader. If a follower's election timer expires with no heartbeat, it suspects the leader has failed.
2. That follower becomes a **candidate**, increments a term number, and requests votes from the other nodes.
3. Each node votes for at most one candidate per term, generally the first one to ask (with some additional safety rules about who's allowed to win).
4. A candidate that receives votes from a **majority** of the cluster becomes the new leader for that term and resumes coordinating writes.

The majority requirement is the key safety property: it guarantees at most one leader can be elected per term, because two different candidates can't both win a majority of the same fixed set of voters. This is also what makes consensus protocols tolerate a minority of nodes failing without ever producing two leaders at once — a scenario called "split brain," which majority voting makes mathematically impossible as long as more than half the cluster is reachable.

## Key terms

- **Heartbeat** — a periodic "I'm alive" signal between nodes
- **Partial failure** — a failure affecting only some of a system, not all of it
- **Cascading failure** — a failure that spreads outward as resources pile up waiting on a struggling dependency
- **Circuit breaker** — a mechanism that stops calling a failing dependency for a cooldown period instead of piling up waiting requests
- **Leader election** — the process of choosing a new coordinating node after a failure, typically requiring a majority vote (Raft, Paxos)

## Recap

Failure in a distributed system is detected by inference (heartbeats and timeouts), contained by patterns like circuit breakers before it cascades, and in leader-based systems, recovered from through majority-vote consensus protocols like Raft. Next, in Lesson 11, you'll see idempotency and retries — what makes it safe to actually act on the uncertainty this lesson describes.
