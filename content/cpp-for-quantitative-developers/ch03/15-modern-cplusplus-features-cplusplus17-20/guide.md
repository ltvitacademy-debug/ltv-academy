# Modern C++ Features (C++17/20)

Earlier courses on this platform may have taught C++98-style patterns: raw `new`/`delete`, manual copy constructors, out-parameters instead of multiple return values. Production quant code today looks different. This lesson closes out the chapter with the handful of C++17/20 features that define how modern C++ is actually written: smart pointers, move semantics, `auto`, and structured bindings.

## What you'll learn

- `std::unique_ptr` and `std::shared_ptr` — and why raw `new`/`delete` should rarely appear in your code anymore
- Move semantics: `std::move`, move constructors, and why they matter for performance
- `auto` for type deduction, and structured bindings for unpacking pairs/tuples
- `std::optional` for a value that might legitimately not exist

## Smart pointers: ownership that cleans up after itself

`std::unique_ptr<T>` owns a heap object exclusively and deletes it automatically when the pointer goes out of scope — no manual `delete`, no leak on an early return or exception.

```cpp
#include <memory>

std::unique_ptr<Order> makeOrder(std::string symbol, int qty) {
    return std::make_unique<Order>(std::move(symbol), qty);
}

auto order = makeOrder("AAPL", 100);
// order automatically destroyed when it goes out of scope
```

Use `std::shared_ptr<T>` only when an object genuinely needs multiple owners (reference-counted, destroyed when the last owner releases it); default to `unique_ptr` otherwise, since it has zero overhead compared to a raw pointer.

## Move semantics: transferring ownership, not copying

Copying a `std::vector<double>` with a million prices is expensive; **moving** it just transfers internal pointers, leaving the source empty. `std::move` casts an object to an rvalue reference, signaling "I'm done with this — you can take its guts."

```cpp
std::vector<double> loadPrices();  // returns a large vector

std::vector<double> prices = loadPrices();      // move, not copy (RVO/move)
std::vector<double> backup = std::move(prices); // explicit move: prices is now empty
```

A move constructor (`Type(Type&& other)`) implements this for your own classes — it steals `other`'s internal pointers instead of deep-copying them, then leaves `other` in a valid-but-empty state.

## `auto` and structured bindings

`auto` deduces a variable's type from its initializer, reducing noise without sacrificing static typing — the type is still fixed at compile time, just not spelled out.

```cpp
auto price = 101.25;              // double
auto book = std::map<std::string, double>{};
```

Structured bindings (C++17) unpack a `pair`, `tuple`, or aggregate into named variables in one line:

```cpp
std::map<std::string, double> prices{{"AAPL", 101.25}, {"MSFT", 318.10}};
for (const auto& [symbol, price] : prices) {
    std::cout << symbol << ": " << price << "\n";
}
```

## `std::optional` for "maybe no value"

Before `std::optional`, "no price available" was often signaled with a sentinel like `-1.0` or a separate `bool` out-parameter — both error-prone. `std::optional<T>` makes "might not have a value" part of the type itself.

```cpp
#include <optional>

std::optional<double> lookupPrice(const std::string& symbol) {
    if (symbol == "AAPL") return 101.25;
    return std::nullopt;   // explicitly: no value
}

if (auto px = lookupPrice("TSLA")) {
    std::cout << "Price: " << *px << "\n";
} else {
    std::cout << "No price available\n";
}
```

## Key terms

| Term | Meaning |
|---|---|
| `std::unique_ptr<T>` | Exclusive-ownership smart pointer; deletes automatically, zero overhead |
| `std::shared_ptr<T>` | Reference-counted smart pointer for genuine shared ownership |
| `std::move` | Casts to an rvalue reference, enabling a cheap transfer instead of a deep copy |
| Structured bindings | `auto [a, b] = pair;` — unpacking a pair/tuple/aggregate in one statement |
| `std::optional<T>` | A value that may or may not be present, checked explicitly rather than via a sentinel |

## Recap

Modern C++ replaces manual memory management with smart pointers, expensive copies with move semantics, and ad hoc sentinels with `std::optional` — all while `auto` and structured bindings cut boilerplate without losing static typing. Chapter 3 is complete. Next up, Chapter 4, Lesson 16: Containers.
