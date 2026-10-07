# Lock-Free Ideas Overview

Every synchronization tool so far — mutexes, condition variables, even atomics used as a retry loop — still involves some thread potentially waiting on another. **Lock-free** programming is a stricter guarantee: the system as a whole always makes forward progress, because no thread can be permanently blocked by another thread that is suspended, crashed, or simply slow. This lesson is a conceptual tour, not a deep implementation guide — lock-free data structures are notoriously hard to get exactly right, and the goal here is to recognize the ideas and know when to reach for a well-tested library instead of hand-rolling one.

## What you'll learn

- What "lock-free" actually guarantees, and how it differs from merely "uses no mutex"
- The compare-and-swap (CAS) retry loop as the core building block
- A worked sketch: a lock-free single-producer stack push
- The ABA problem and false sharing — two reasons hand-rolled lock-free code is dangerous
- Why "use a battle-tested library" is the right default answer

## What "lock-free" really means

A mutex-based design has a specific failure mode: if the thread holding the lock is suspended by the OS, or crashes while holding it, every other thread waiting for that lock is stuck too. A **lock-free** algorithm guarantees that is impossible — at every point in time, at least one thread is able to make progress, even if other threads are paused at the worst possible moment. Note this is weaker than **wait-free**, which guarantees *every* thread finishes in a bounded number of steps regardless of what others do; wait-free algorithms exist but are rarer and harder to write. Most practical "lock-free" code you'll encounter is lock-free, not wait-free.

## The core building block: compare-and-swap retry loops

You've already seen the primitive: `compare_exchange_weak` from Lesson 23. Lock-free structures are built almost entirely from loops of the shape "read the current state, compute a new state, try to CAS it in, and if someone beat you to it, start over." Here is a sketch of pushing onto a lock-free singly-linked stack:

```cpp
#include <atomic>

struct Node {
    int value;
    Node* next;
};

std::atomic<Node*> head{nullptr};

void push(int value) {
    Node* new_node = new Node{value, nullptr};
    new_node->next = head.load(std::memory_order_relaxed);
    while (!head.compare_exchange_weak(
               new_node->next, new_node,
               std::memory_order_release,
               std::memory_order_relaxed)) {
        // head changed under us — new_node->next was refreshed
        // by compare_exchange_weak itself; just retry
    }
}
```

Each failed CAS means another thread pushed or popped first; the loop simply retries with the now-current `head`. No thread ever blocks waiting for a lock — the worst case is just "try again," and the overall system still moves forward.

## Two reasons this is harder than it looks

**The ABA problem**: a thread reads a pointer `A`, gets suspended, and while it's asleep another thread pops `A`, frees it, and pushes a *new* node that happens to be allocated at the exact same address `A`. The original thread wakes up, sees the pointer is still `A`, and its CAS succeeds — even though the actual node is completely different. Fixing this typically requires tagging pointers with a version counter or using hazard pointers, both non-trivial.

**False sharing**: even without any logical race, if two atomics used by different threads happen to sit in the same CPU cache line, every write to one invalidates the other core's cached copy of the line, causing expensive cache traffic that looks like lock contention even though there's no lock. (Cache lines are covered properly in Lesson 27.)

## The practical takeaway

Lock-free code is a legitimate, sometimes necessary tool in latency-sensitive quant systems — a single-producer/single-consumer queue between a market-data thread and a strategy thread is a common, justified use. But subtle bugs in hand-rolled lock-free code are famous for passing every test and failing once a year in production, under exactly the thread interleaving you didn't think to try. The default, professional answer is: reach for a reviewed, widely-used library (such as `boost::lockfree`, or a well-vetted SPSC/MPMC queue implementation) rather than writing CAS loops from scratch, and reserve hand-rolled lock-free code for the rare case where you've measured that a mutex is genuinely the bottleneck.

## Key terms

| Term | Meaning |
|---|---|
| Lock-free | At least one thread always makes progress, even if others stall |
| Wait-free | Stronger guarantee: every thread finishes in bounded steps, regardless of others |
| CAS retry loop | "Read, compute, compare-and-swap, retry on failure" — the core lock-free pattern |
| ABA problem | A pointer appears unchanged but was freed and reallocated in between reads |
| False sharing | Unrelated atomics sharing a cache line cause contention with no logical race |

## Recap

Lock-free programming trades "a thread might block on a lock" for "a thread might have to retry a compare-and-swap," guaranteeing the system as a whole always moves forward — at the cost of subtle hazards like the ABA problem and false sharing that make hand-rolled implementations risky. For most real systems, a trusted library beats a hand-rolled CAS loop. That closes out Chapter 5 on concurrency. Next up, Chapter 6 begins with Lesson 26: Measuring Performance & Benchmarking, where you'll learn to measure before you optimize anything — concurrency or otherwise.
