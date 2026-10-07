# Script — Atomics & Memory Ordering

## Segment 1 (title)

A mutex always works, but it always involves potential blocking. For the simplest shared data — a counter, a flag, a single price — std::atomic gives you race-free access without ever locking anything. This lesson covers the core atomic operations and the memory-ordering choices underneath them.

## Segment 2 (code)

Remember the broken counter from a couple lessons back? std::atomic fixes it directly: wrap the long in std::atomic, and call fetch_add instead of a plain increment. Fetch_add reads the value, adds one, and writes the result back as a single step no other thread can observe half-finished. No mutex, no blocking — and because nobody cares exactly when each increment lands relative to anything else, the weakest, fastest ordering is enough here.

## Segment 3 (code)

For check-and-update logic, the key tool is compare_exchange_weak. It compares the atomic's current value against what you expected, and only writes the new value if they still match — atomically. If some other thread beat you to it, the call fails and tells you the real current value, so the normal pattern is to loop and try again. That retry loop is the building block behind most lock-free algorithms.

## Segment 4 (steps)

Atomicity guarantees no thread ever sees a torn value. Memory ordering is a separate question: how much can the compiler and CPU reorder everything else around that atomic operation. Relaxed gives you only the atomicity guarantee — fine when only the final number matters. Acquire and release pair a publishing store with a consuming load so that related writes become visible together. And sequentially consistent, the default, gives every thread one single agreed-on global order — the safest choice when you haven't measured a reason to loosen it.

## Segment 5 (steps)

Here's acquire/release doing real work: a publisher thread stores a new price with a relaxed write, then stores true into a separate "ready" flag using release. A consumer thread acquire-loads that flag, and if it sees true, it's guaranteed to see the price write that happened before the release — not just eventually, but by the time it reads true at all. That's a cheaper, still-correct alternative to making every operation sequentially consistent.

## Segment 6 (outro)

Relaxed for independent counters, acquire and release for handing off related data safely, sequentially consistent as your safe default. Up next, lesson twenty-four: thread pools and task-based parallelism, where we stop hand-managing individual threads and start scheduling work instead.
