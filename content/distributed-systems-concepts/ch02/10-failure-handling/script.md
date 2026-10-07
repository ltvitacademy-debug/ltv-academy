# Script — Failure Handling

## Segment 1 (title)

Lesson six established that you can never fully tell a slow node from a dead one — you can only infer failure, never confirm it. This lesson covers how systems actually make that inference, contain the damage when the guess is wrong, and in the most important case, replace a failed node through majority consensus.

## Segment 2 (steps)

A heartbeat is a small, regular "I'm still here" message. If the rest of the cluster stops hearing them within some timeout window, that node is treated as failed. It's a judgment call, not a certainty — too short a timeout wrongly kills a node that's merely slow, too long leaves a genuinely dead node looking alive for too long.

## Segment 3 (steps)

A partial failure hits only some of the system, not all of it — which sounds easier than a total outage, but often isn't, because everything else has to keep working around the hole. Left alone, it can cascade: callers pile up waiting on a slow dependency, that ties up their own threads and connections, which makes them slow too, and the failure spreads outward to services that were never actually broken.

## Segment 4 (steps)

A timeout caps how long a caller waits before giving up — the first defense. A circuit breaker goes further: after enough recent failures, it opens and stops sending requests to that dependency at all, failing fast instead of piling up waiting calls. That's exactly what stops the cascade. After a cooldown, it lets one trial request through to see if the dependency recovered.

## Segment 5 (steps)

So how does a cluster replace a failed leader? If a follower's election timer expires with no heartbeat, it becomes a candidate, increments a term number, and requests votes. Each node votes for one candidate per term, and whoever gets votes from a majority becomes the new leader. That majority requirement is the safety net — two candidates can't both win a majority of the same voters, so split-brain, two leaders at once, becomes mathematically impossible.

## Segment 6 (outro)

Failure gets detected by inference, contained before it cascades, and in leader-based systems, recovered from through majority-vote consensus. Next, lesson eleven: idempotency and retries, what makes it safe to actually act on this uncertainty.
