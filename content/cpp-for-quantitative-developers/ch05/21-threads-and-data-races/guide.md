# Threads & Data Races

Quant systems spend most of their lives waiting — on market data, on network sockets, on disk — and modern CPUs give you many cores to fill that waiting time with useful work. `std::thread`, part of the C++11 standard library, is the primitive that lets a C++ program run more than one stream of execution at once. This lesson introduces how to start and join threads, and more importantly, how threads can silently corrupt your data if you're not careful — the data race.

## What you'll learn

- How to launch work on a separate thread with `std::thread` and wait for it with `.join()`
- What a data race actually is, and why it is undefined behavior in C++, not just "a bug"
- A concrete example: two threads corrupting a shared price counter
- Why "it worked when I tested it" means nothing for racy code

## Starting a thread

`std::thread` takes a callable — a function, lambda, or function object — and starts it running concurrently with the thread that created it. The constructor returns immediately; it does not wait for the new thread to finish.

```cpp
#include <thread>
#include <iostream>

void print_tick(int id) {
    std::cout << "worker " << id << " ticked\n";
}

int main() {
    std::thread t1(print_tick, 1);
    std::thread t2(print_tick, 2);

    t1.join();   // block until t1 finishes
    t2.join();   // block until t2 finishes
}
```

Every `std::thread` that represents a running thread of execution must eventually be joined (waited for) or detached, or its destructor will call `std::terminate` and crash the program. `.join()` blocks the calling thread until the target thread completes; `.detach()` lets it run independently, which you should avoid unless you have a specific reason — a detached thread touching data that goes out of scope is a classic source of crashes.

## The data race

A **data race** happens when two or more threads access the same memory location at the same time, at least one of those accesses is a write, and there is no synchronization establishing an order between them. The C++ standard is blunt about the consequence: a program containing a data race has **undefined behavior**. Not "probably wrong" — undefined. The compiler is allowed to assume data races don't happen, and optimizes accordingly.

Here is a minimal, realistic-looking example: two threads incrementing a shared trade counter without any coordination.

```cpp
#include <thread>
#include <iostream>

long trade_count = 0;   // shared, unprotected

void record_trades(int n) {
    for (int i = 0; i < n; ++i) {
        trade_count = trade_count + 1;   // read, then write — not atomic
    }
}

int main() {
    std::thread a(record_trades, 100000);
    std::thread b(record_trades, 100000);
    a.join();
    b.join();

    std::cout << trade_count << '\n';   // almost never prints 200000
}
```

`trade_count = trade_count + 1` is really three steps: read the current value, add one, write the result back. If thread A reads, then thread B reads the same stale value before A writes back, both threads compute the same "next" value and one increment is lost. Run this enough times and you will see different, wrong totals on different runs — the hallmark of a race.

## Why "it passed my test" is not proof

Data races are schedule-dependent. The operating system's thread scheduler decides, largely unpredictably, exactly when each thread gets CPU time, so a race might lose zero increments on one run and thousands on another — or none at all on a quiet machine, then fail only under load in production. Testing cannot prove the absence of a data race; only reasoning about shared state (or a tool like ThreadSanitizer, covered later in this course) can give you real confidence.

The fix for the counter above is to synchronize the increments — either with a mutex (next lesson) or an atomic type (Lesson 23). The rule to internalize now: **any memory that more than one thread can touch, where at least one touch is a write, needs a plan.**

## Key terms

| Term | Meaning |
|---|---|
| `std::thread` | Standard C++ type representing one thread of execution |
| `.join()` | Blocks the calling thread until the target thread finishes |
| `.detach()` | Lets a thread run independently of the `std::thread` object |
| Data race | Unsynchronized concurrent access to memory with at least one write; undefined behavior |

## Recap

`std::thread` lets you run work concurrently, but concurrency without synchronization is dangerous: unsynchronized access to shared, mutable memory is a data race, and C++ treats that as undefined behavior rather than a mere logic bug. Next up, Lesson 22: Mutexes, Locks & Condition Variables, where you'll learn the primitives that make the counter example above actually safe.
