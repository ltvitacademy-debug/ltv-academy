# Containers

Chapter 4 moves from the language itself to the standard library you'll use every single day: the Standard Template Library, or STL. Its most immediately useful piece is the set of **containers** — ready-made, well-tested data structures that replace almost every hand-rolled array, linked list, or lookup table you'd otherwise write yourself.

## What you'll learn

- Sequence containers: `std::vector`, `std::array`, `std::deque`
- Associative containers: `std::map` and `std::set` (ordered, tree-based)
- Unordered associative containers: `std::unordered_map` and `std::unordered_set` (hash-based)
- Rough complexity trade-offs that decide which container fits a given job

## Sequence containers

`std::vector<T>` is the default choice for a contiguous, resizable sequence — it's a dynamically-sized array with O(1) amortized `push_back` and O(1) random access by index.

```cpp
#include <vector>

std::vector<double> prices;
prices.push_back(101.25);
prices.push_back(102.75);
double first = prices[0];          // O(1) random access
std::size_t n = prices.size();
```

`std::array<T, N>` is a fixed-size array whose size is a compile-time constant — no heap allocation, no resizing, and the safety of knowing its bounds.

```cpp
#include <array>
std::array<double, 4> quarterReturns{0.03, -0.01, 0.05, 0.02};
```

`std::deque<T>` supports fast insertion/removal at *both* ends (`push_front` and `push_back` are both O(1)), unlike `vector`, where `push_front` is O(n).

## Associative containers: ordered, tree-based

`std::map<K, V>` stores key-value pairs sorted by key (via `operator<` by default), backed by a balanced binary tree — lookup, insert, and erase are all O(log n).

```cpp
#include <map>

std::map<std::string, double> lastPrice;
lastPrice["AAPL"] = 101.25;
lastPrice["MSFT"] = 318.10;

auto it = lastPrice.find("AAPL");
if (it != lastPrice.end()) {
    std::cout << it->first << ": " << it->second << "\n";
}
```

Iterating a `std::map` always visits keys in sorted order — a useful, deliberate property when you need, say, prices iterated symbol-alphabetically.

`std::set<K>` is the same tree structure holding only keys, no values — useful for a sorted collection of unique symbols.

## Unordered associative containers: hash-based

`std::unordered_map<K, V>` has no ordering guarantee but offers average O(1) lookup, insert, and erase via hashing — the right choice when you need fast lookups and don't care about iteration order.

```cpp
#include <unordered_map>

std::unordered_map<std::string, double> lastPrice;
lastPrice["AAPL"] = 101.25;   // average O(1), not O(log n)
```

## Choosing between them (a preview of Lesson 20)

As a rule of thumb: need index access and cache-friendly iteration → `vector`. Need sorted key order → `map`/`set`. Need the fastest possible key lookup and don't care about order → `unordered_map`/`unordered_set`. Need push/pop at both ends → `deque`. Lesson 20 builds this into a full decision framework.

## Key terms

| Term | Meaning |
|---|---|
| `std::vector<T>` | Dynamically-sized, contiguous sequence; O(1) amortized push_back, O(1) index access |
| `std::array<T, N>` | Fixed-size, stack-allocated array; N is a compile-time constant |
| `std::map<K, V>` | Sorted, tree-based key-value store; O(log n) operations |
| `std::unordered_map<K, V>` | Hash-based key-value store; average O(1) operations, no ordering |
| Amortized O(1) | Occasionally expensive (a resize), but cheap on average across many calls |

## Recap

The STL's containers cover the overwhelming majority of data-structure needs: `vector` for contiguous sequences, `map`/`set` for sorted lookups, and `unordered_map`/`unordered_set` for the fastest average-case lookups. Next up, Lesson 17: Iterators & Algorithms.
