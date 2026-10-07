# Avoiding Allocation & Copies

Two of the most common, most fixable sources of slowness in C++ are heap allocation and unnecessary copying. Both are easy to introduce without noticing — a `std::vector` that grows one element at a time, a function parameter taken by value instead of by reference, a return statement that could have moved instead of copied. This lesson covers reserving capacity up front, passing by `const&`, and letting move semantics do its job.

## What you'll learn

- Why heap allocation is expensive, and how `std::vector::reserve()` avoids repeated reallocation
- Pass-by-`const&` vs. pass-by-value, and when each is actually correct
- How move semantics avoids a copy when a value is about to be discarded anyway
- A combined example: building a vector of orders without needless allocation or copying

## Why allocation is expensive, and reserve() as the fix

Every call to `new` (or an allocating container operation) may ask the operating system for memory, which is far slower than using memory you already have. `std::vector` grows automatically as you push elements, but by default it grows by reallocating to a bigger buffer and copying every existing element into it — repeatedly, as the vector keeps growing past its current capacity.

```cpp
#include <vector>

// Without reserve: vector reallocates (and copies all existing
// elements) each time it outgrows its current capacity.
std::vector<double> prices;
for (int i = 0; i < 100000; ++i) {
    prices.push_back(static_cast<double>(i) * 0.01);
}

// With reserve: one allocation up front, zero reallocations during the loop.
std::vector<double> prices_fast;
prices_fast.reserve(100000);
for (int i = 0; i < 100000; ++i) {
    prices_fast.push_back(static_cast<double>(i) * 0.01);
}
```

If you know (or can reasonably estimate) how many elements you'll end up with, call `.reserve(n)` first. It costs one allocation instead of the handful of reallocate-and-copy cycles `push_back` would otherwise trigger as the vector doubles its capacity repeatedly.

## Pass by const& to avoid copying large objects

Passing a large object (a `std::vector`, a `std::string`, a custom struct with several fields) by value makes a full copy of it just to call the function. Passing by `const&` (const reference) gives the function read-only access to the original, with no copy at all:

```cpp
// Copies the whole vector just to read it — wasteful for large inputs.
double sum_by_value(std::vector<double> prices) {
    double total = 0.0;
    for (double p : prices) total += p;
    return total;
}

// No copy — the function reads the caller's vector directly.
double sum_by_const_ref(const std::vector<double>& prices) {
    double total = 0.0;
    for (double p : prices) total += p;
    return total;
}
```

The rule of thumb: pass small, cheap-to-copy types (`int`, `double`, a small struct of a few fields) by value, and pass anything larger or container-like by `const&` unless the function genuinely needs its own independent copy to modify.

## Move semantics: skip the copy when the source is about to be discarded

Sometimes a function does need ownership of a new object — but if the caller's object was about to be discarded anyway (a temporary, or an explicit `std::move`), there's no need to copy its contents; the data can simply be transferred. `std::move` casts its argument to an rvalue reference, signaling "you may take this object's internals; I won't use it again in its old form":

```cpp
#include <vector>
#include <utility>

std::vector<double> build_prices();   // returns by value — a move, not a copy

void use_prices() {
    std::vector<double> local = build_prices();   // moved into local, no copy

    std::vector<double> other;
    other = std::move(local);   // transfers local's buffer into other
    // local is now left in a valid but unspecified (likely empty) state
}
```

Returning a local `std::vector` by value from a function is already a move (or elided entirely) under modern C++ — the compiler does not copy it. Reach for `std::move` explicitly when you are handing off ownership of an object you won't use again, such as moving a freshly built order into a queue instead of copying it in.

## Putting it together

```cpp
struct Order { double price; int quantity; };

std::vector<Order> build_orders(int n) {
    std::vector<Order> orders;
    orders.reserve(n);                       // one allocation
    for (int i = 0; i < n; ++i) {
        orders.push_back(Order{100.0 + i, 10});  // constructed in place, no extra copy
    }
    return orders;                           // moved out, not copied
}

double total_notional(const std::vector<Order>& orders) {   // no copy on entry
    double total = 0.0;
    for (const auto& o : orders) total += o.price * o.quantity;
    return total;
}
```

## Key terms

| Term | Meaning |
|---|---|
| `reserve(n)` | Pre-allocates capacity for `n` elements, avoiding repeated reallocation |
| Pass by `const&` | Gives a function read-only access to the caller's object with no copy |
| `std::move` | Casts to an rvalue reference, signaling the source may be transferred, not copied |
| Move semantics | Transferring an object's internal resources instead of duplicating them |

## Recap

`reserve()` turns repeated reallocate-and-copy growth into one allocation, passing by `const&` avoids copying arguments the function only needs to read, and move semantics avoids copying an object that's about to be discarded anyway. Next up, Lesson 29: Compiler Optimization & Inlining, where the compiler itself starts doing some of this work for you — if you give it the chance.
