# Atomics & Memory Ordering

A mutex is a hammer: it works, but it always involves a potential block and some overhead. For the simplest shared data — a counter, a flag, a single price — `std::atomic` gives you lock-free, race-free access without ever calling `.lock()`. This lesson covers `std::atomic`, the basic read-modify-write operations it supports, and the memory-ordering choices that control how much the compiler and CPU are allowed to reorder around an atomic operation.

## What you'll learn

- How `std::atomic<T>` fixes the Lesson 21 counter with no mutex at all
- `.load()`, `.store()`, and `.compare_exchange_weak()` — the core atomic operations
- The three memory orderings you'll actually use: `relaxed`, `acquire`/`release`, and `seq_cst`
- A realistic pattern: a lock-free "latest price" publisher read by many consumer threads

## Fixing the counter with std::atomic

The data race from Lesson 21 was `trade_count = trade_count + 1;` executed by two threads with no synchronization. `std::atomic<long>` makes the increment itself indivisible — no other thread can observe a half-finished update:

```cpp
#include <atomic>

std::atomic<long> trade_count{0};

void record_trades(int n) {
    for (int i = 0; i < n; ++i) {
        trade_count.fetch_add(1, std::memory_order_relaxed);
    }
}
```

`fetch_add` reads the current value, adds the argument, and writes the result back — all as one atomic step no other thread can split. No mutex, no blocking, and for this specific case (nobody needs to know *when* the update happened relative to other memory, only that the final count is right), `std::memory_order_relaxed` is sufficient and fastest.

## The core operations

Every `std::atomic<T>` supports `.load()` to read the current value and `.store()` to write a new one, both atomically. For "check and update" logic, `.compare_exchange_weak()` is the key primitive: it compares the atomic's current value against an expected value, and only if they match does it write a new value — atomically, as one step.

```cpp
std::atomic<int> best_bid{100};

bool try_update_bid(int expected, int new_bid) {
    return best_bid.compare_exchange_weak(expected, new_bid);
}
```

If another thread changed `best_bid` between your read and your attempted write, `compare_exchange_weak` fails (returns `false` and writes the *actual* current value into `expected`), and the typical pattern is to loop and retry. This "optimistic" retry loop is the building block behind most lock-free algorithms, previewed further in Lesson 25.

## Memory ordering: relaxed, acquire/release, seq_cst

An atomic operation guarantees *that* no other thread sees a torn value. Memory ordering controls something different: how operations on *other*, non-atomic memory around that atomic operation are allowed to be reordered by the compiler or CPU.

- **`memory_order_relaxed`** — only the atomicity guarantee; no ordering constraint on surrounding memory. Use it for counters and statistics where only the final value matters.
- **`memory_order_acquire` / `memory_order_release`** — a release store by one thread "publishes" every write that happened before it, and a matching acquire load by another thread is guaranteed to see all of those writes. This is the pattern for publishing a data structure to other threads.
- **`memory_order_seq_cst`** (the default when you don't specify one) — the strongest and simplest to reason about: all threads agree on one single global order of every seq_cst operation. Safest default; pay the (usually small) performance cost unless you've measured a reason not to.

```cpp
std::atomic<double> latest_price{0.0};
std::atomic<bool> price_ready{false};

// publisher thread
void publish_price(double px) {
    latest_price.store(px, std::memory_order_relaxed);
    price_ready.store(true, std::memory_order_release);   // publish
}

// consumer thread
void read_price() {
    if (price_ready.load(std::memory_order_acquire)) {    // acquire
        double px = latest_price.load(std::memory_order_relaxed);
        // guaranteed to see the price the publisher wrote
    }
}
```

The release on `price_ready` guarantees the earlier, relaxed store to `latest_price` is visible to any thread that performs the matching acquire load and sees `true`. This acquire/release pairing is the realistic middle ground between `relaxed` (too weak to safely hand off related data) and `seq_cst` (always correct, but pays for a global ordering guarantee you may not need).

## Key terms

| Term | Meaning |
|---|---|
| `std::atomic<T>` | A type whose operations are guaranteed indivisible across threads |
| `fetch_add` / `load` / `store` | Core atomic read/write/update operations |
| `compare_exchange_weak` | Atomic "if current equals expected, write new value" primitive |
| `memory_order_relaxed` | Atomicity only, no ordering guarantee on surrounding memory |
| `memory_order_acquire`/`release` | Pairs a publishing store with a consuming load to safely hand off related data |
| `memory_order_seq_cst` | Strongest, default ordering — a single global order all threads agree on |

## Recap

`std::atomic` gives you race-free access to simple shared values without a mutex, and memory ordering is the dial that controls how much reordering the compiler and CPU can do around that atomic operation — `relaxed` for independent counters, `acquire`/`release` for handing off related data, `seq_cst` as the safe default. Next up, Lesson 24: Thread Pools & Task-Based Parallelism, where you'll move from hand-managing individual threads to scheduling many small units of work.
