# Mutexes, Locks & Condition Variables

Lesson 21 ended with a broken counter: two threads, one shared variable, no coordination, lost updates. This lesson gives you the standard tools to fix that — `std::mutex` to protect shared state, RAII lock wrappers so you never forget to release it, and `std::condition_variable` to let one thread efficiently wait for another to signal that something changed.

## What you'll learn

- How `std::mutex` turns a block of code into a critical section only one thread can enter at a time
- Why `std::lock_guard` and `std::unique_lock` exist instead of calling `.lock()` / `.unlock()` by hand
- How `std::condition_variable` lets a consumer thread sleep until a producer thread has work ready
- A worked example: a single-producer/single-consumer order queue

## The mutex: one thread at a time

A `std::mutex` (mutual exclusion) is a lock. Only one thread can hold it at a time; any other thread calling `.lock()` blocks until the holder calls `.unlock()`. Wrapping every access to `trade_count` in a mutex fixes the race from Lesson 21:

```cpp
#include <mutex>

std::mutex m;
long trade_count = 0;

void record_trades(int n) {
    for (int i = 0; i < n; ++i) {
        std::lock_guard<std::mutex> lk(m);
        trade_count = trade_count + 1;
    }
}
```

`std::lock_guard<std::mutex>` is an RAII wrapper: its constructor calls `m.lock()`, and its destructor calls `m.unlock()` automatically when `lk` goes out of scope — including if an exception is thrown. Calling `.lock()` and `.unlock()` manually is almost always a mistake, because any early return or exception between them leaves the mutex locked forever, deadlocking every other thread that wants it.

## unique_lock, for when lock_guard isn't flexible enough

`std::unique_lock<std::mutex>` is a heavier-weight sibling of `lock_guard`: it can be unlocked and re-locked within its own scope, moved, and — critically — it's the lock type `std::condition_variable::wait` requires, because the condition variable needs to unlock the mutex while it waits and re-lock it before returning.

```cpp
std::mutex m;
std::unique_lock<std::unique_lock> lk(m);   // (illustration only — see below for a real wait)
```

In practice, prefer `lock_guard` for simple "lock for this scope" cases, and reach for `unique_lock` only when you need that extra flexibility — most commonly, alongside a condition variable.

## Waiting for a signal: condition_variable

A mutex alone can't tell a thread "wake up, there's work now." For that, pair a mutex with a `std::condition_variable`. A classic pattern is a producer thread pushing orders onto a queue and a consumer thread waiting until there's at least one order to process — a tiny, single-producer/single-consumer order pipeline.

```cpp
#include <mutex>
#include <condition_variable>
#include <queue>

std::mutex m;
std::condition_variable cv;
std::queue<int> order_queue;   // order IDs, for example

void producer() {
    for (int id = 1; id <= 5; ++id) {
        {
            std::lock_guard<std::mutex> lk(m);
            order_queue.push(id);
        }
        cv.notify_one();   // wake the consumer
    }
}

void consumer() {
    for (int i = 0; i < 5; ++i) {
        std::unique_lock<std::mutex> lk(m);
        cv.wait(lk, [] { return !order_queue.empty(); });
        int id = order_queue.front();
        order_queue.pop();
        lk.unlock();
        // process order `id` outside the lock
    }
}
```

`cv.wait(lk, predicate)` is shorthand for "unlock `lk`, sleep until notified, re-lock `lk`, and check `predicate`; if it's still false, go back to sleep." The predicate guards against two classic hazards: **spurious wakeups** (the OS is allowed to wake a waiting thread without any notify happening) and **missed notifications** (a `notify_one()` that arrives before the consumer starts waiting). Always pass the predicate overload of `wait` rather than the bare version — checking a condition in a loop is what makes this pattern correct.

## Key terms

| Term | Meaning |
|---|---|
| `std::mutex` | A lock allowing only one thread into a critical section at a time |
| `std::lock_guard` | RAII wrapper that locks on construction, unlocks on destruction |
| `std::unique_lock` | Flexible RAII lock that can be unlocked/relocked; required by `condition_variable` |
| `std::condition_variable` | Lets a thread sleep until notified that a condition may now be true |
| Spurious wakeup | A waiting thread waking without an explicit `notify_*` call |

## Recap

Mutexes turn a race into a safely serialized critical section, RAII lock types guarantee that section is always released, and condition variables let a waiting thread sleep efficiently instead of spinning until there's real work to do. Next up, Lesson 23: Atomics & Memory Ordering, where you'll see a lighter-weight alternative to locking for simple shared values like counters and flags.
