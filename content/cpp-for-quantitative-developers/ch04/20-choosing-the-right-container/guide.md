# Choosing the Right Container

This lesson doesn't introduce new syntax — it answers the question every previous lesson in this chapter has been building toward: given a real piece of quant code, which container do you actually reach for? Picking the wrong one is one of the most common, and most consequential, performance mistakes in C++.

## What you'll learn

- A decision framework based on three questions: access pattern, ordering needs, and mutation pattern
- Why `std::vector` is the right *default* even when you think you need something else
- Concrete quant-flavored scenarios mapped to the correct container
- The real cost of guessing wrong: cache locality and complexity class mismatches

## Three questions to ask

1. **How do you need to access elements?** By index (`vector`, `array`, `deque`) or by key (`map`, `unordered_map`)?
2. **Do you need sorted order?** Yes → `map`/`set`. No, and lookup speed matters most → `unordered_map`/`unordered_set`.
3. **Where do insertions/removals happen?** Only at the back → `vector`. At both ends → `deque`. In the middle, frequently → reconsider whether a `vector` with occasional re-sort is still faster in practice (it usually is, due to cache locality — see below).

## `std::vector` is the default, not the fallback

Even when a linked list or `std::deque` seems like the "textbook correct" answer for frequent insertions, `std::vector`'s contiguous memory layout is so much faster to iterate (due to CPU cache locality) that it frequently wins in practice unless insertions are genuinely in the middle, at high frequency, and the container is large.

```cpp
// Mental default for "I need a sequence of things": std::vector<T>
std::vector<Order> openOrders;
openOrders.push_back(newOrder);
```

## Worked scenarios

**An order book's price levels, needing fast lookup by price and no particular iteration order:**

```cpp
std::unordered_map<double, std::vector<Order>> priceLevel;
```

**A time series of daily closing prices, always read in date order, appended at the end:**

```cpp
std::vector<std::pair<std::string, double>> closes;   // date, close
```

**A set of currently-held instrument symbols, needing a fast "do we hold this?" check with no order requirement:**

```cpp
std::unordered_set<std::string> heldSymbols;
if (heldSymbols.count("AAPL")) { /* ... */ }
```

**A leaderboard of positions that must always be iterated best-performer-first:**

```cpp
std::map<double, std::string, std::greater<double>> byPnLDescending;
```

Here, `std::greater<double>` as the third template argument flips `std::map`'s default ascending order to descending — demonstrating that `map`'s ordering is itself configurable via a comparator.

## The real cost of guessing wrong

A `std::list` chosen for "frequent insertion" when the actual workload is 95% iteration pays for that choice on every single pass — each node is a separate heap allocation, scattered in memory, with none of `vector`'s cache-friendly sequential access. Measure before assuming; `vector`'s raw iteration speed beats the theoretically "better" complexity class of other containers more often than intuition suggests.

## Key terms

| Term | Meaning |
|---|---|
| Access pattern | By index vs. by key — the first question in choosing a container |
| Cache locality | How close together in memory elements sit; contiguous containers (`vector`) win here |
| `std::greater<T>` | A comparator that can be passed to `map`/`set` to reverse the default ordering |
| Complexity class | Big-O behavior (O(1), O(log n), O(n)) — necessary but not sufficient for choosing a container |

## Recap

Choosing a container comes down to three questions — access pattern, ordering need, and where mutation happens — and `std::vector` should be your default answer until a specific requirement rules it out. That closes Chapter 4. Next up, Chapter 5, Lesson 21: Threads & Data Races.
