# Script — Asynchronous Systems

## Segment 1 (title)

Chapter one covered what makes distributed systems hard: availability, scale, reliability, latency. This chapter goes a layer deeper and asks how the pieces of a distributed system actually talk to each other — starting with the most basic fact of all: there's no shared clock, and no message is guaranteed to arrive.

## Segment 2 (steps)

On one machine, there's one clock and one order of events. Across a network, that breaks down. Every node's clock drifts at a different rate, network delay is unpredictable, and messages can even arrive out of the order they were sent. A distributed system has no meaningful way to ask what time it is "right now, everywhere."

## Segment 3 (steps)

Synchronous communication means the caller blocks and waits for a response — simple to reason about, but it ties your fate to whoever you're calling. Asynchronous communication means the caller sends a message and moves on, with the response arriving later if at all. Most real distributed systems default to asynchronous, because it's the only way to tolerate a node that's slow or unreachable.

## Segment 4 (steps)

Here's the fact that shapes everything else in this chapter: if you send a message and get no response, you cannot tell whether the other node is overloaded, the message got dropped, the response is stuck in transit, or the node actually crashed. All four look like silence. Every timeout and heartbeat you'll see later is really just a policy for guessing when silence means "probably dead."

## Segment 5 (code)

So how do you order events without a shared clock? Leslie Lamport's answer is happens-before: event A happens-before event B if A could have caused B, like sending a message before it's received. If there's no such link, the events are concurrent, and no order between them means anything. That idea is the foundation for how the next lesson handles conflicting writes.

## Segment 6 (outro)

No shared clock, mostly asynchronous communication, and failure you can only infer, never confirm. Next, lesson seven: eventual consistency, and how systems live with exactly this uncertainty.
