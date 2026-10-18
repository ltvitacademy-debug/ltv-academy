# Capstone: Building and Benchmarking a Market-Data Processor

This closing lesson for the chapter combines everything just covered — UDP receive (Lesson 40), a pool allocator for incoming tick objects (Lesson 41), and percentile-latency measurement (Lesson 42) — into one realistic piece of infrastructure: a market-data processor that receives quote updates, decodes them into objects with zero wasteful heap churn, and reports exactly how fast it's actually running, tail included.

## What you'll learn

- How to structure a UDP receive loop around a fixed binary wire format
- Using a pool allocator so decoding each tick allocates nothing from the general-purpose heap
- Measuring per-tick decode latency and reporting it with percentiles, not just a mean
- How this single file demonstrates the chapter's actual thesis: networking, memory, and measurement are one connected discipline in a real low-latency system

## The wire format: a fixed binary layout

Real market-data feeds use a compact, fixed-size binary format — no text parsing, no delimiters to search for, just a struct read directly off the wire:

```cpp
#include <cstdint>

#pragma pack(push, 1)   // no compiler-inserted padding between fields
struct TickWire {
    uint64_t symbol_id;     // numeric symbol identifier, not a string
    uint32_t bid_price_x100; // price * 100, as an integer (avoids float wire format issues)
    uint32_t ask_price_x100;
    uint32_t bid_size;
    uint32_t ask_size;
    uint64_t exchange_timestamp_ns;
};
#pragma pack(pop)

static_assert(sizeof(TickWire) == 28, "wire format must stay a fixed, known size");
```

`#pragma pack(push, 1)` disables the compiler's usual struct padding, so `sizeof(TickWire)` is exactly the sum of its fields — essential for a wire format, since both sender and receiver must agree on the exact byte layout.

## Decoding into pool-allocated objects

Each incoming datagram decodes into an application-level `Tick` object — but instead of `new Tick(...)` on every single message (Lesson 41's exact problem), decoding draws from a pre-sized pool:

```cpp
#include <chrono>
#include <vector>
#include <algorithm>
#include <cstring>
#include <sys/socket.h>

struct Tick {
    uint64_t symbol_id;
    double bid_price, ask_price;
    uint32_t bid_size, ask_size;
    uint64_t exchange_timestamp_ns;
};

// PoolAllocator<Tick> from Lesson 41
PoolAllocator<Tick> tick_pool(100000);   // sized for the busiest expected burst

Tick* decode_tick(const TickWire& wire) {
    void* raw = tick_pool.allocate();            // pointer bump from the free list -- no heap call
    Tick* tick = new (raw) Tick{                  // placement new: construct in place
        wire.symbol_id,
        wire.bid_price_x100 / 100.0,
        wire.ask_price_x100 / 100.0,
        wire.bid_size,
        wire.ask_size,
        wire.exchange_timestamp_ns,
    };
    return tick;
}

void release_tick(Tick* tick) {
    tick->~Tick();               // explicit destructor call -- placement new's matching
                                  // cleanup is never automatic
    tick_pool.deallocate(tick);  // slot returned to the free list for the next tick
}
```

## The receive loop, instrumented end to end

```cpp
std::vector<double> decode_latencies_us;
decode_latencies_us.reserve(1'000'000);   // Lesson 28's reserve(), avoiding growth churn here too

void run_processor(int sock_fd) {
    char buffer[sizeof(TickWire)];

    while (true) {
        ssize_t n = recvfrom(sock_fd, buffer, sizeof(buffer), 0, nullptr, nullptr);
        if (n != sizeof(TickWire)) continue;   // malformed or partial datagram -- drop it

        TickWire wire;
        std::memcpy(&wire, buffer, sizeof(wire));

        auto start = std::chrono::high_resolution_clock::now();

        Tick* tick = decode_tick(wire);
        // ... hand `tick` to the strategy/risk engine here ...
        release_tick(tick);

        auto end = std::chrono::high_resolution_clock::now();
        double us = std::chrono::duration<double, std::micro>(end - start).count();
        decode_latencies_us.push_back(us);
    }
}

void report_once_done() {
    std::sort(decode_latencies_us.begin(), decode_latencies_us.end());
    report_latency_stats(decode_latencies_us);   // from Lesson 42
}
```

## Why this file is the chapter's actual thesis, not just an exercise

Notice what's absent from the hot path (the `while` loop body): no `new`/`delete` on the Tick object (the pool handles that — Lesson 41), no Nagle's-algorithm-induced delay to worry about (UDP has no such mechanism to begin with — Lesson 40), and no blind trust that the system is fast (every single decode is timed, and reported with percentiles that would expose a tail problem a mean would hide — Lesson 42). None of these three disciplines alone makes this processor fast; a pool allocator with no latency measurement would be fast and *unverified*, and latency measurement with no pool allocator would faithfully report how slow `new`/`delete` churn actually is. The combination is what makes this a realistic piece of production-shaped low-latency infrastructure rather than three separate exercises bolted together.

## Key terms

| Term | Meaning |
|---|---|
| Wire format | The exact fixed binary byte layout both sender and receiver agree on |
| `#pragma pack` | Disables compiler-inserted struct padding, so size matches the sum of fields exactly |
| Hot path | The performance-critical code executed on every single message |

## Check yourself

Why would a version of this processor using plain `new Tick(...)` instead of the pool allocator still "work" in a quick functional test, but become a real problem specifically visible in the p99.9 latency statistic once run under sustained load?
