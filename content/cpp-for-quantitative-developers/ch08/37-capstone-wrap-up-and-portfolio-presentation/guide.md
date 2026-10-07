# Capstone: Wrap-Up & Portfolio Presentation

QuantPricer compiles and runs — but "it runs" isn't the same as "it meets the requirements you wrote in the kickoff lesson." This final lesson closes the loop: testing the pricing core and the bindings, benchmarking the vectorized C++ path against pure Python, and packaging the result into something you can actually show in a portfolio or an interview.

## What you'll learn

- Unit testing the pybind11-free pricing core with `doctest`, with no Python involved
- Testing the Python-facing API with `pytest`, including a correctness check against known values
- Benchmarking the vectorized C++ path against a pure-Python loop with `timeit`
- What to say about this project in a portfolio or a technical interview

## Testing the core in pure C++

Because `pricing_core.hpp` never included pybind11, it can be tested with an ordinary C++ test framework — no Python interpreter required. `doctest` is a lightweight, header-only choice:

```cpp
// test_pricing_core.cpp
#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN
#include "doctest.h"
#include "pricing_core.hpp"

using namespace quantpricer;

TEST_CASE("Black-Scholes call matches a known reference value") {
    BlackScholesInputs in{100.0, 100.0, 0.05, 0.2, 1.0};
    double price = blackScholesCall(in);
    CHECK(price == doctest::Approx(10.4506).epsilon(0.001));
}

TEST_CASE("Bond priced at par when yield equals coupon rate") {
    Bond bond(1000.0, 0.05, 10);
    CHECK(bond.price(0.05) == doctest::Approx(1000.0).epsilon(0.01));
}
```

The second test checks a known identity: a bond's price equals its face value whenever the discount yield equals its coupon rate — a quick sanity check that doesn't depend on any external reference table.

## Testing the Python-facing API with pytest

Once the extension is built, `pytest` verifies the bindings themselves — argument handling, shapes, and the vectorized path:

```python
# test_quantpricer.py
import numpy as np
import pytest
import quantpricer_cpp as qp

def test_price_european_matches_reference():
    prices = qp.price_european(
        spots=np.array([100.0]), strikes=np.array([100.0]),
        rates=np.array([0.05]), vols=np.array([0.2]),
        expiries=np.array([1.0]))
    assert prices[0] == pytest.approx(10.4506, rel=1e-3)

def test_monte_carlo_converges_to_closed_form():
    closed_form = qp.price_european(
        spots=np.array([100.0]), strikes=np.array([100.0]),
        rates=np.array([0.05]), vols=np.array([0.2]),
        expiries=np.array([1.0]))[0]
    engine = qp.MonteCarloEngine(num_threads=4)
    mc_price = engine.price_call(spot=100.0, strike=100.0, rate=0.05,
                                  vol=0.2, expiry=1.0, num_paths=500_000)
    assert abs(mc_price - closed_form) / closed_form < 0.01
```

## Benchmarking against pure Python

The kickoff lesson's performance requirement — at least 20x faster than pure Python — needs a fair pure-Python baseline to compare against:

```python
import timeit
import numpy as np
import quantpricer_cpp as qp

def black_scholes_python(spot, strike, rate, vol, t):
    from math import log, sqrt, exp, erfc
    d1 = (log(spot/strike) + (rate + 0.5*vol*vol)*t) / (vol*sqrt(t))
    d2 = d1 - vol*sqrt(t)
    N = lambda x: 0.5*erfc(-x/sqrt(2))
    return spot*N(d1) - strike*exp(-rate*t)*N(d2)

n = 100_000
spots = np.random.uniform(80, 120, n)

py_time = timeit.timeit(
    lambda: [black_scholes_python(s, 100.0, 0.05, 0.2, 1.0) for s in spots],
    number=3)
cpp_time = timeit.timeit(
    lambda: qp.price_european(spots, np.full(n, 100.0), np.full(n, 0.05),
                               np.full(n, 0.2), np.full(n, 1.0)),
    number=3)

print(f"speedup: {py_time / cpp_time:.1f}x")
```

Report the actual number this produces on your machine — a real, reproducible benchmark is worth far more in a portfolio than a claimed speedup with no script behind it.

## Presenting it in a portfolio or interview

What makes this project worth talking about isn't "I used C++ and Python" — it's the specific decisions behind it:

- **The architecture**: a pybind11-free core, independently tested, with a thin bindings layer — explain *why* that separation matters
- **The concurrency design**: task-based parallelism with per-chunk seeding, and why that avoided needing a mutex
- **The measured result**: an actual speedup number from your own benchmark script, not a guess
- **The judgment call**: why European options and bonds were in scope, and American exercise and a yield curve deliberately weren't

A reviewer who asks "walk me through a project" is really asking whether you can explain trade-offs, not just list technologies. QuantPricer gives you a real, complete story to tell.

## Key terms

| Term | Meaning |
|---|---|
| `doctest` | A lightweight, header-only C++ testing framework, usable with no Python involved |
| `pytest.approx` | pytest's tolerance-aware equality check, for comparing floating-point results |
| Fair baseline | A pure-Python implementation of the same algorithm, used for an honest speedup comparison |
| Reproducible benchmark | A runnable script producing the performance number you report, not an estimate |

## Recap

This course started with the question of why C++ still matters in finance, and ends with a working answer: a real pricing library, tested at both the C++ and Python layers, benchmarked against a fair pure-Python baseline, and built from a deliberate, explainable set of trade-offs. Along the way you went from C++ foundations and manual memory management, through object-oriented and generic programming, the STL, multithreading, and performance engineering, to bridging all of it back into Python with pybind11 — and now you've used every one of those pieces together on QuantPricer. That's the whole arc of this course, and it's a complete, honest project to bring into your next interview. Congratulations on finishing C++ for Quantitative Developers.
