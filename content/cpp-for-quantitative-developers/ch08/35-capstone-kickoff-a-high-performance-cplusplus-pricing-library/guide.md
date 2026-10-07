# Capstone Kickoff: A High-Performance C++ Pricing Library

This is it — the project that pulls together everything from modern C++ syntax through memory management, OOP and templates, the STL, concurrency, performance tuning, and the pybind11 bridge you just finished. Over the next two lessons you'll design and build **QuantPricer**: a small, real, high-performance C++ pricing library exposed to Python, benchmarked against a pure-Python baseline, and packaged well enough to put on a resume. This lesson is the kickoff — scope, architecture, and requirements, before a single pricing formula gets written.

## What you'll learn

- The scope of QuantPricer: what it prices, and deliberately, what it does not
- A layered architecture that separates the C++ pricing core from the Python-facing bindings
- Concrete, testable requirements: correctness, performance, and usability targets
- Why writing requirements down before coding prevents capstone scope creep

## What QuantPricer does

Keep the scope tight enough to actually finish. QuantPricer prices two instrument types:

1. **European options** — closed-form Black-Scholes pricing, plus a Monte Carlo pricer as a cross-check and a stand-in for path-dependent payoffs
2. **Fixed-rate bonds** — discounted cash flow pricing given a flat yield

Both are exposed to Python as vectorized functions that accept whole NumPy arrays of inputs (e.g., many strikes at once), not just single scalars — because a single-call-per-option API would defeat the entire performance argument for writing this in C++ in the first place.

**Explicitly out of scope** for this capstone: American-style early exercise, a full yield curve / term structure, and a GUI. A capstone that tries to do everything ships nothing; a capstone that does two things correctly, fast, and well-tested is a stronger portfolio piece than a half-finished ambitious one.

## Layered architecture

```
Python callers (notebooks, a backtest script)
        │
        ▼
quantpricer (Python package)        <- thin Python-side convenience layer
        │
        ▼
quantpricer_cpp (pybind11 extension) <- PYBIND11_MODULE, py::array_t bindings
        │
        ▼
C++ pricing core (pure C++, no Python headers anywhere in here)
  - EuropeanOption, Bond          (Chapter 3: classes, encapsulation)
  - MonteCarloEngine               (Chapter 5: thread pool, concurrency)
  - pricing_math.hpp               (Chapter 6: cache-friendly, allocation-free)
```

The critical design decision: the **C++ pricing core never includes a pybind11 header**. It's a plain C++ library that happens to also be usable from the command line or a C++ test harness. The pybind11 module is a thin translation layer on top — `py::array_t` in, raw `double*` out, calling straight into the core. This separation is what makes the core independently unit-testable (Lesson 37) without a Python interpreter anywhere in the test run.

## Requirements, written down before any code

```text
QUANTPRICER — CAPSTONE REQUIREMENTS

Correctness
  - European call/put prices match published Black-Scholes reference values
    to within 1e-6 absolute error for at least 5 textbook test cases.
  - Monte Carlo price converges to the closed-form price within 0.1%
    as path count increases to 1,000,000.

Performance
  - Pricing 100,000 options via the vectorized C++ path must be at least
    20x faster than an equivalent pure-Python loop, measured with timeit.

Usability
  - `pip install .` produces a working package.
  - Public Python API: `price_european(spots, strikes, rates, vols, expiries)`
    and `price_bond(face_value, coupon_rate, years, yield)`.
```

Notice every requirement is checkable with a number, not a feeling — "fast" became "20x faster, measured with timeit." That's what makes Lesson 37's testing and benchmarking lesson possible to actually grade against.

## Key terms

| Term | Meaning |
|---|---|
| Pricing core | The pure C++ library with no knowledge of Python or pybind11 |
| Bindings layer | The thin pybind11 translation layer between NumPy and the pricing core |
| Scope boundary | An explicit list of what the capstone will *not* attempt, to protect what it will |
| Measurable requirement | A requirement stated as a number or pass/fail check, not an adjective |

## Recap

QuantPricer's scope is two instruments — European options and fixed-rate bonds — built as a pure C++ core underneath a thin pybind11 bindings layer, against requirements stated as numbers you can actually check. With the architecture decided, the next lesson is where the real work happens. Up next, Lesson 36: Capstone — Build It.
