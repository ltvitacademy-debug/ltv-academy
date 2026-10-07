# CPU Caches & Data Layout

A modern CPU core can execute an instruction in roughly a nanosecond, but fetching data from main memory (RAM) can take 100 nanoseconds or more — two orders of magnitude slower. CPU caches exist to hide that gap, and how you lay out your data in memory determines whether the cache actually helps you or not. This lesson covers the cache hierarchy, why array-of-structs vs. struct-of-arrays matters, and `std::vector` as your default, cache-friendly container.

## What you'll learn

- The L1/L2/L3/RAM hierarchy and the orders-of-magnitude latency gap between them
- Cache lines, and why sequential access is dramatically faster than scattered access
- Array-of-structs vs. struct-of-arrays, and when each one wins
- Why `std::vector` beats `std::list` for most quant workloads, even when "insert in the middle" sounds like a list's job

## The cache hierarchy

Every modern CPU core has several layers of cache between it and main memory, each bigger but slower than the last:

- **L1 cache** — smallest (tens of KB), fastest (roughly 1 ns), private to one core.
- **L2 cache** — bigger (hundreds of KB to a few MB), slower (roughly 3-10 ns), usually private to one core.
- **L3 cache** — largest on-chip cache (several to tens of MB), slower still (roughly 10-20 ns), typically shared across all cores.
- **Main memory (RAM)** — gigabytes, but roughly 100 ns or more to access — 100x slower than L1.

When your code reads memory not currently in any cache (a **cache miss**), the CPU stalls waiting on RAM. Code whose memory access pattern keeps hitting L1/L2 runs dramatically faster than functionally identical code whose access pattern constantly misses out to RAM — often 10-50x faster for memory-bound workloads, with no change to the actual algorithm.

## Cache lines and sequential access

Memory isn't fetched one byte at a time — it's fetched in fixed-size chunks called **cache lines**, typically 64 bytes on modern x86/ARM CPUs. If you read one `double` (8 bytes) from an array, the other 7 doubles in that same 64-byte line come along for free, already in cache. This is why iterating an array sequentially is fast: each cache-line fetch pays for the next several elements too. Jumping around memory unpredictably (following pointers scattered across the heap, say) gets none of that benefit — every access risks being a fresh cache miss.

```cpp
#include <vector>

// Sequential access: cache-friendly.
// Each cache-line fetch serves several consecutive elements.
double sum_sequential(const std::vector<double>& prices) {
    double total = 0.0;
    for (double p : prices) total += p;
    return total;
}
```

## Array-of-structs vs. struct-of-arrays

Suppose you have a million orders, each with a price, a quantity, and a symbol ID, and you need to sum just the prices. Two ways to lay that out:

```cpp
// Array-of-structs (AoS): intuitive, but wasteful for this access pattern
struct Order { double price; int quantity; int symbol_id; };
std::vector<Order> orders_aos;

// Struct-of-arrays (SoA): each field lives in its own contiguous array
struct Orders {
    std::vector<double> price;
    std::vector<int> quantity;
    std::vector<int> symbol_id;
};
Orders orders_soa;
```

Summing `orders_aos[i].price` across a million orders pulls in `quantity` and `symbol_id` for every element too — bytes fetched into cache that you never use, wasting a large fraction of your cache-line bandwidth. Summing `orders_soa.price` touches *only* prices: every byte fetched is a price you actually need. SoA wins decisively whenever you process one field across many elements at a time, which is extremely common in pricing and risk code. AoS still wins when you consistently access *all* fields of one record together (e.g. "look up order 442 and print everything about it").

## std::vector as your default container

`std::vector` stores its elements contiguously, which is exactly what the cache rewards. `std::list` (a doubly-linked list) stores each element in its own separately allocated node, scattered across the heap — every `++it` is a likely cache miss, even though inserting into the middle of a list is "O(1)" by the usual algorithmic argument. In practice, for most quant workloads, `std::vector` (even with occasional `O(n)` insertions) beats `std::list` because the constant-factor cache cost of list traversal dwarfs the asymptotic advantage. Reach for `std::vector` by default, and only consider a node-based container once you've measured a real reason to.

## Key terms

| Term | Meaning |
|---|---|
| Cache line | The fixed-size chunk (typically 64 bytes) memory is fetched in |
| Cache miss | A memory access not found in any cache level, forcing a slow RAM fetch |
| Array-of-structs (AoS) | One array of full records; good when accessing all fields of one record together |
| Struct-of-arrays (SoA) | One array per field; good when processing one field across many records |
| `std::vector` | Contiguous, cache-friendly container; the default choice for most sequences |

## Recap

The gap between CPU speed and RAM speed is why caches exist, and your data layout decides whether the cache hides that gap or not — sequential, contiguous access (as `std::vector` gives you) wins far more often than it looks like it should, and struct-of-arrays beats array-of-structs whenever you scan one field at a time. Next up, Lesson 28: Avoiding Allocation & Copies, where you'll see how heap allocation itself becomes the next bottleneck once data layout is under control.
