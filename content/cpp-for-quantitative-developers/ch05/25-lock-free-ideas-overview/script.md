# Script — Lock-Free Ideas Overview

## Segment 1 (title)

Every tool we've covered so far in this chapter still involves one thread potentially waiting on another. Lock-free programming is a stricter promise: the system as a whole always keeps moving, no matter which thread gets suspended at the worst possible moment. This lesson is a conceptual tour, not a build-it-yourself guide.

## Segment 2 (steps)

Here's the precise distinction. With a mutex, if the thread holding the lock gets suspended or crashes mid-critical-section, every other thread waiting on that lock is stuck too. Lock-free guarantees that can't happen — at any moment, at least one thread is able to make progress. That's weaker than wait-free, which guarantees every single thread finishes in a bounded number of steps regardless of what the others do. Wait-free exists, but it's rare; most real lock-free code settles for the weaker, still valuable guarantee.

## Segment 3 (code)

The building block underneath almost all of it is the compare-and-swap retry loop you already met with compare_exchange_weak. Pushing onto a lock-free stack looks like this: read the current head, build your new node pointing at it, and try to swap it in. If another thread changed head first, the swap fails, your new node's next pointer gets refreshed automatically, and you just try again. No thread ever blocks on a lock — worst case, it retries.

## Segment 4 (steps)

Two things make this genuinely hard in practice. The ABA problem: a thread reads a pointer, gets suspended, another thread frees that exact node and allocates a new one at the same address, and the original thread wakes up seeing what looks like an unchanged pointer — but it isn't the same node at all. And false sharing: two unrelated atomics that happen to land on the same CPU cache line create expensive cache traffic between cores that looks exactly like lock contention, even though there's no lock and no logical race.

## Segment 5 (steps)

So here's the professional default. Lock-free code is genuinely justified for things like a single-producer, single-consumer queue between a market-data thread and a strategy thread. But hand-rolled lock-free bugs are infamous for passing every test you throw at them and then failing once a year in production, under an interleaving nobody thought to test. Reach for a reviewed, widely used library first, and only hand-roll your own once you've actually measured a mutex as the bottleneck.

## Segment 6 (outro)

Lock-free trades "might block on a lock" for "might retry a compare-and-swap," and that's valuable — but the ABA problem and false sharing are exactly why most teams buy, not build. That wraps up concurrency. Up next, chapter six begins with lesson twenty-six: measuring performance and benchmarking — because every optimization chapter from here starts with measuring, not guessing.
