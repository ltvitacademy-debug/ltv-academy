# Coding & C++ Interview Preparation

Quant coding interviews test two different things depending on the role: Python/pandas fluency for research positions — the same skills behind every lesson in this capstone — and C++ fundamentals for latency-sensitive trading and infrastructure roles. This lesson covers both.

## What you'll learn

- Why some quant roles test Python and others test C++, and how to tell which you're facing
- A worked coding pattern (single-pass, O(n)) applied to a finance-flavored problem
- The C++ fundamentals that come up constantly: pointers vs. references, stack vs. heap, and RAII
- Why vectorized pandas/NumPy code — the style used throughout this capstone — matters even in a coding interview

## Python vs. C++: know which round you're in

Research-flavored roles (systematic funds, quant research desks) typically test Python, often specifically pandas and NumPy fluency, because that's the actual daily tool — exactly what built SR-5 across Lessons 1-12. Latency-sensitive roles (market making, high-frequency trading, low-latency infrastructure) test C++, because execution speed in production is the entire point of the job. Many postings test both at different stages. If the posting doesn't say, ask the recruiter directly during the screen (Lesson 17) — it's a normal, expected question, not a sign of being under-prepared.

## Worked pattern: single-pass, O(n) problems

A large share of quant coding questions reduce to "track one running value while scanning the array once," rather than requiring an exotic algorithm. Classic example — maximum profit from one buy and one sell, given a sequence of daily prices:

```python
def max_profit(prices):
    min_price = float("inf")
    best = 0
    for p in prices:
        min_price = min(min_price, p)
        best = max(best, p - min_price)
    return best

max_profit([7, 1, 5, 3, 6, 4])   # 5  (buy at 1, sell at 6)
max_profit([7, 6, 4, 3, 1])      # 0  (prices only fall, no profit possible)
```

The pattern — track the minimum seen so far, track the best result seen so far, update both in one pass — recurs across dozens of quant coding questions: running maximum, running variance, longest streak, sliding-window statistics. Recognizing "this is a running-value problem" is worth more than memorizing any single solution, because the same skeleton solves problems that look unrelated on the surface.

## C++ fundamentals that come up constantly

For latency-sensitive roles, expect direct questions on:

- **Pointers vs. references.** A pointer can be null and reassigned; a reference must bind to a valid object at creation and can't be rebound. Passing a large object by reference (`const Obj&`) avoids an expensive copy; passing by pointer additionally allows "no object" (nullptr) as a valid state.
- **Stack vs. heap.** Stack allocation is fast and automatically freed when a scope ends; heap allocation (`new`/`malloc`) persists until explicitly freed and is slower, with real cost in a hot trading-system loop.
- **RAII (Resource Acquisition Is Initialization).** Tying a resource's lifetime to an object's scope — a `std::vector` frees its memory automatically when it goes out of scope, instead of relying on a manual `free()` call that's easy to forget or get wrong on an exception path.
- **Why latency-sensitive code avoids certain patterns.** Dynamic memory allocation in a hot loop, virtual-function dispatch where it isn't needed, and exceptions used for routine control flow all add unpredictable latency — the opposite of what a market-making system needs on every tick.

## Why vectorized pandas/NumPy style still matters in an interview

Every backtest in this capstone (Lesson 10) was built on vectorized pandas operations rather than row-by-row Python loops, and that distinction is itself a common interview question: why is `df["ret"] = df["price"].pct_change()` dramatically faster than looping over rows in Python and computing each return by hand? The answer: pandas/NumPy operations drop into compiled C code under the hood and avoid the per-element overhead of the Python interpreter loop, while a native Python `for` loop pays that interpreter overhead on every single element. Being able to explain *why* vectorization is fast — not just that it is — signals the same level of understanding a C++ latency question is probing for.

## A sensible prep routine

Spend time on a focused problem set rather than an unfocused one: sliding-window and two-pointer problems, basic data structures (hash maps, stacks, heaps) applied to streaming data, and — for C++ specifically — a handful of problems that deliberately exercise memory management (implementing a simple fixed-size ring buffer, for instance) rather than only algorithmic puzzles. Time yourself; most live coding rounds run 30-45 minutes including explanation.

## Key terms

| Term | Meaning |
|---|---|
| RAII | A C++ idiom tying a resource's lifetime to an object's scope, so it's released automatically |
| Vectorization | Expressing a computation as whole-array operations (pandas/NumPy) rather than an explicit per-element loop, for speed |
| Single-pass / O(n) pattern | Solving a problem by tracking one or two running values while scanning the input exactly once |

## Recap

Quant coding interviews split along the research/Python vs. latency/C++ line — know which one you're facing, and ask if the posting doesn't say. A large share of problems reduce to a single-pass, running-value pattern like the max-profit example above. C++ rounds probe pointers vs. references, stack vs. heap, and RAII; Python rounds probe whether you understand *why* vectorized code — the same style behind every SR-5 backtest — outperforms a manual loop. Next, Lesson 20 moves to statistics and machine-learning interview questions.
