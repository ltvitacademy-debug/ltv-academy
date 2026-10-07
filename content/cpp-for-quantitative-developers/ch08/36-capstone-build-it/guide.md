# Capstone: Build It

With scope, architecture, and requirements settled, this lesson is where QuantPricer actually gets written: the pricing core, a multithreaded Monte Carlo engine built on the task-based parallelism from Chapter 5, and the pybind11 bindings layer that exposes it all to Python as vectorized NumPy-friendly functions.

## What you'll learn

- Implementing `blackScholesCall` and a `Bond` class in a pybind11-free pricing core header
- Building `MonteCarloEngine`, a multithreaded pricer using `std::async` task-based parallelism
- Writing the vectorized pybind11 bindings that tie the whole core to NumPy
- Assembling the final `CMakeLists.txt` that builds the complete extension

## The pricing core: no Python anywhere

`pricing_core.hpp` holds the closed-form option pricer and the bond pricer — plain C++, usable with or without Python:

```cpp
// pricing_core.hpp
#pragma once
#include <cmath>

namespace quantpricer {

struct BlackScholesInputs {
    double spot, strike, rate, vol, timeToExpiry;
};

inline double normCdf(double x) {
    return 0.5 * std::erfc(-x / std::sqrt(2.0));
}

inline double blackScholesCall(const BlackScholesInputs& in) {
    double sqrtT = std::sqrt(in.timeToExpiry);
    double d1 = (std::log(in.spot / in.strike) +
                 (in.rate + 0.5 * in.vol * in.vol) * in.timeToExpiry) /
                (in.vol * sqrtT);
    double d2 = d1 - in.vol * sqrtT;
    return in.spot * normCdf(d1) -
           in.strike * std::exp(-in.rate * in.timeToExpiry) * normCdf(d2);
}

class Bond {
public:
    Bond(double faceValue, double couponRate, int years)
        : faceValue_(faceValue), couponRate_(couponRate), years_(years) {}

    double price(double yield) const {
        double pv = 0.0;
        double coupon = faceValue_ * couponRate_;
        for (int t = 1; t <= years_; ++t)
            pv += coupon / std::pow(1.0 + yield, t);
        return pv + faceValue_ / std::pow(1.0 + yield, years_);
    }

private:
    double faceValue_, couponRate_;
    int years_;
};

} // namespace quantpricer
```

## MonteCarloEngine: task-based parallelism from Chapter 5

The Monte Carlo pricer splits the path count across threads using `std::async` — the same task-based pattern from Lesson 24 — each thread simulating an independent chunk with its own seeded random engine:

```cpp
// monte_carlo_engine.hpp
#pragma once
#include <algorithm>
#include <future>
#include <random>
#include <vector>
#include "pricing_core.hpp"

namespace quantpricer {

class MonteCarloEngine {
public:
    explicit MonteCarloEngine(unsigned numThreads) : numThreads_(numThreads) {}

    double priceCall(const BlackScholesInputs& in, long numPaths) const {
        std::vector<std::future<double>> futures;
        long pathsPerThread = numPaths / numThreads_;

        for (unsigned t = 0; t < numThreads_; ++t) {
            futures.push_back(std::async(std::launch::async,
                [this, in, pathsPerThread, t] {
                    return simulateChunk(in, pathsPerThread, t);
                }));
        }

        double total = 0.0;
        for (auto& f : futures) total += f.get();
        return (total / numThreads_) * std::exp(-in.rate * in.timeToExpiry);
    }

private:
    double simulateChunk(const BlackScholesInputs& in, long paths, unsigned seed) const {
        std::mt19937_64 rng(42u + seed);
        std::normal_distribution<double> normal(0.0, 1.0);
        double drift = (in.rate - 0.5 * in.vol * in.vol) * in.timeToExpiry;
        double diffusion = in.vol * std::sqrt(in.timeToExpiry);

        double sumPayoff = 0.0;
        for (long i = 0; i < paths; ++i) {
            double terminal = in.spot * std::exp(drift + diffusion * normal(rng));
            sumPayoff += std::max(terminal - in.strike, 0.0);
        }
        return sumPayoff / static_cast<double>(paths);
    }

    unsigned numThreads_;
};

} // namespace quantpricer
```

Each future owns a private `std::mt19937_64` seeded from its thread index, so no mutex is needed anywhere — the chunks never share mutable state, which is the cleanest kind of concurrency from Chapter 5.

## The bindings layer: NumPy in, NumPy out

`bindings.cpp` is the only file that includes pybind11. It vectorizes `blackScholesCall` over whole arrays and exposes `Bond` and `MonteCarloEngine` as Python classes:

```cpp
// bindings.cpp
#include <pybind11/pybind11.h>
#include <pybind11/numpy.h>
#include "pricing_core.hpp"
#include "monte_carlo_engine.hpp"

namespace py = pybind11;
using namespace quantpricer;

py::array_t<double> priceEuropeanVectorized(
        py::array_t<double> spots, py::array_t<double> strikes,
        py::array_t<double> rates, py::array_t<double> vols,
        py::array_t<double> expiries) {
    auto sb = spots.request();
    ssize_t n = sb.shape[0];
    auto result = py::array_t<double>(n);

    const double* s = static_cast<const double*>(sb.ptr);
    const double* k = static_cast<const double*>(strikes.request().ptr);
    const double* r = static_cast<const double*>(rates.request().ptr);
    const double* v = static_cast<const double*>(vols.request().ptr);
    const double* t = static_cast<const double*>(expiries.request().ptr);
    double* out = static_cast<double*>(result.request().ptr);

    for (ssize_t i = 0; i < n; ++i)
        out[i] = blackScholesCall({s[i], k[i], r[i], v[i], t[i]});
    return result;
}

PYBIND11_MODULE(quantpricer_cpp, m) {
    m.doc() = "QuantPricer: C++ pricing core exposed to Python";

    m.def("price_european", &priceEuropeanVectorized,
          py::arg("spots"), py::arg("strikes"), py::arg("rates"),
          py::arg("vols"), py::arg("expiries"));

    py::class_<Bond>(m, "Bond")
        .def(py::init<double, double, int>(),
             py::arg("face_value"), py::arg("coupon_rate"), py::arg("years"))
        .def("price", &Bond::price, py::arg("yield"));

    py::class_<MonteCarloEngine>(m, "MonteCarloEngine")
        .def(py::init<unsigned>(), py::arg("num_threads"))
        .def("price_call", [](const MonteCarloEngine& eng, double spot,
                               double strike, double rate, double vol,
                               double expiry, long numPaths) {
            return eng.priceCall({spot, strike, rate, vol, expiry}, numPaths);
        }, py::arg("spot"), py::arg("strike"), py::arg("rate"),
           py::arg("vol"), py::arg("expiry"), py::arg("num_paths"));
}
```

## Build file

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.15)
project(quantpricer_cpp LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Threads REQUIRED)
add_subdirectory(extern/pybind11)
pybind11_add_module(quantpricer_cpp src/bindings.cpp)
target_link_libraries(quantpricer_cpp PRIVATE Threads::Threads)
target_compile_options(quantpricer_cpp PRIVATE -O3)
```

And from Python, both pricers now share one import:

```python
import numpy as np
import quantpricer_cpp as qp

prices = qp.price_european(
    spots=np.array([100.0, 105.0]), strikes=np.array([100.0, 100.0]),
    rates=np.array([0.03, 0.03]), vols=np.array([0.2, 0.2]),
    expiries=np.array([1.0, 1.0]))

engine = qp.MonteCarloEngine(num_threads=8)
mc_price = engine.price_call(spot=100.0, strike=100.0, rate=0.03,
                              vol=0.2, expiry=1.0, num_paths=1_000_000)
```

## Key terms

| Term | Meaning |
|---|---|
| `std::async` task | A unit of work launched to run independently, joined later via `.get()` |
| Seeded-per-chunk RNG | Each thread's own random engine, avoiding any shared mutable state |
| Vectorized binding | A pybind11 function operating on whole `py::array_t` arrays, not scalars |
| `find_package(Threads REQUIRED)` | CMake's standard way to link the platform threading library |

## Recap

QuantPricer now exists as real, compiling code: a pybind11-free pricing core, a multithreaded Monte Carlo engine built on `std::async`, and a bindings layer that vectorizes everything over NumPy arrays. What's left is proving it actually meets the requirements from the kickoff lesson. Up next, Lesson 37: Capstone — Wrap-Up & Portfolio Presentation.
