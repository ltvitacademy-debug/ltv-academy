# Why C++ in Finance

Welcome to C++ for Quantitative Developers. Every other language you may have used for trading or research — Python, R, even Java — eventually hits a wall where "fast enough" is no longer fast enough: pricing a book of options in microseconds, matching orders at the speed of the exchange's wire protocol, or running a Monte Carlo simulation millions of times per second. This lesson explains why C++ is still the language banks, hedge funds, and exchanges reach for when latency and control matter, and what you'll build toward over the rest of this course.

## What you'll learn

- Where C++ actually sits in a quant/trading stack, and why it hasn't been replaced
- The core trade-off C++ makes: manual control over memory and execution in exchange for raw speed
- A first look at how C++ differs from a garbage-collected language like Python or Java
- What "zero-overhead abstraction" means, and why it matters for pricing and execution code

## Where C++ fits in a quant stack

Most quant shops are polyglot. Researchers prototype a strategy in Python because it's fast to write and has a huge numerical ecosystem (NumPy, pandas, scikit-learn). But when that strategy needs to run live — reacting to market data in microseconds, or pricing thousands of instruments every time the book updates — it gets rewritten, or partially rewritten, in C++. The pattern repeats across the industry:

- **Exchange matching engines and market-data feeds** — written in C++ (or occasionally C) because every microsecond of latency is a competitive disadvantage.
- **Pricing and risk libraries** — C++ at the core, often wrapped with Python bindings so researchers can call fast C++ pricers from a notebook.
- **Execution and order-management systems** — C++ where the system must react to a venue in real time, with predictable, low worst-case latency.

C++ isn't chosen because it's fashionable. It's chosen because it gives you direct control over memory layout, avoids forcing a garbage collector into your hot path, and compiles straight down to machine code with no interpreter or virtual machine in between.

## The core trade-off: control for speed

```cpp
#include <vector>
#include <iostream>

struct Trade {
    int instrument_id;
    double price;
    long quantity;
};

int main() {
    std::vector<Trade> trades;
    trades.reserve(1'000'000);          // pre-allocate; no reallocation surprises

    trades.push_back({101, 182.35, 500});
    trades.push_back({102, 97.10, -250});

    double notional = 0.0;
    for (const Trade& t : trades) {
        notional += t.price * static_cast<double>(t.quantity);
    }

    std::cout << "Net notional: " << notional << "\n";
    return 0;
}
```

Notice what's happening: `trades.reserve(1'000'000)` asks for a block of memory up front, so adding trades one at a time doesn't trigger unpredictable reallocations later — exactly the kind of worst-case latency spike a trading system can't tolerate. The loop iterates by `const Trade&`, a reference, so no `Trade` is copied just to read it. Every one of these decisions is something Python or Java either hides from you or doesn't let you control at all. In C++, you decide.

## Garbage-collected languages vs. manual control

In Python or Java, objects live on a managed heap and a garbage collector periodically walks memory to reclaim what's no longer reachable. That's convenient, but the collector can pause your program at a moment it chooses, not you — unacceptable when a strategy must react to a price tick in a few hundred nanoseconds. C++ has no garbage collector. Every object's lifetime is determined by the code you write: a local variable is destroyed when it goes out of scope, and a heap allocation is freed exactly when you say so (ideally, as you'll see in Chapter 2, through RAII and smart pointers rather than by hand). This is more responsibility, but it's also what makes worst-case latency predictable.

## Zero-overhead abstraction

C++'s guiding design philosophy, going back to Bjarne Stroustrup's original goals for the language, is **zero-overhead abstraction**: you should be able to write high-level, expressive code — classes, templates, the STL — without paying a runtime performance penalty versus writing the equivalent by hand in a lower-level style. A `std::vector<double>` of a million prices is, under the hood, a contiguous block of memory with a few management fields — no hidden per-element bookkeeping. This is the property that lets quant developers write readable, maintainable code and still hit microsecond-level targets. The rest of this course is really a tour of how to use that abstraction power without accidentally giving the overhead back.

## Key terms

| Term | Meaning |
|---|---|
| Latency | The time between an event (e.g. a market data tick) and a system's reaction to it |
| Garbage collection | Automatic reclaiming of unreachable memory, performed on a schedule the program doesn't control |
| RAII | Resource Acquisition Is Initialization — tying resource lifetime to object lifetime (Chapter 2) |
| Zero-overhead abstraction | High-level C++ code that compiles down to the same performance as hand-written low-level code |

## Recap

C++ earns its place in quant and trading systems by trading manual control over memory and execution for predictable, extreme speed — no garbage collector, no interpreter, and abstractions designed to cost nothing at runtime. Next up, Lesson 2: Toolchains, Compilers & Build Systems, where you'll set up the tools that turn this source code into a running program.
