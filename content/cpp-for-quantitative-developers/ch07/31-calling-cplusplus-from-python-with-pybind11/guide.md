# Calling C++ From Python With pybind11

Every optimization technique in the last chapter exists for one reason: somewhere, a hot loop is too slow in Python and needs to run in C++. This lesson closes that loop. You'll take a C++ function and class, compile them into a Python-importable module with **pybind11**, and call them from ordinary Python code as if they'd been written there. This is the bridge the rest of the chapter — and the capstone — is built on.

## What you'll learn

- Why pybind11 is the standard way to expose C++ to Python, instead of the raw C API or `ctypes`
- The `PYBIND11_MODULE` macro and how a compiled module becomes an `import`-able Python package
- Binding free functions with `m.def(...)`, including named arguments via `py::arg`
- Binding a C++ class with `py::class_`, including its constructor and methods

## Why pybind11 instead of the C API or ctypes

Python's C API lets you write an extension module directly, but every function means hand-written reference counting, manual type conversion, and a lot of boilerplate for a single call. `ctypes` avoids compiling anything, but it only understands C-compatible flat functions — no classes, no overloads, no automatic type conversion for `std::string` or `std::vector`. **pybind11** is a header-only library that reads your C++ declarations and generates the CPython glue for you, so binding a function or a class takes a few lines instead of a few hundred.

## A minimal module

A pybind11 module is an ordinary `.cpp` file. The `PYBIND11_MODULE` macro defines the entry point the Python interpreter loads when you `import` the compiled `.pyd`/`.so` file:

```cpp
// pricer_module.cpp
#include <pybind11/pybind11.h>
#include <cmath>

namespace py = pybind11;

double blackScholesCall(double spot, double strike, double rate,
                         double vol, double timeToExpiry) {
    double d1 = (std::log(spot / strike) +
                 (rate + 0.5 * vol * vol) * timeToExpiry) /
                (vol * std::sqrt(timeToExpiry));
    double d2 = d1 - vol * std::sqrt(timeToExpiry);
    auto N = [](double x) { return 0.5 * std::erfc(-x / std::sqrt(2.0)); };
    return spot * N(d1) - strike * std::exp(-rate * timeToExpiry) * N(d2);
}

PYBIND11_MODULE(quantlib_cpp, m) {
    m.doc() = "Quant pricing primitives implemented in C++";

    m.def("black_scholes_call", &blackScholesCall,
          "Price a European call option under Black-Scholes",
          py::arg("spot"), py::arg("strike"), py::arg("rate"),
          py::arg("vol"), py::arg("time_to_expiry"));
}
```

`namespace py = pybind11;` is the near-universal convention. The module's first argument to `PYBIND11_MODULE` (`quantlib_cpp`) is the name Python will `import`; the second (`m`) is a `py::module_` object you attach functions and classes to. `py::arg(...)` names each parameter so Python callers can use keyword arguments, exactly like a native Python function.

## Binding a class with py::class_

Free functions aren't enough for most quant code — you want objects with state. `py::class_<T>` binds a C++ class, `.def(py::init<...>())` binds a constructor, and `.def(...)` binds each method:

```cpp
class Bond {
public:
    Bond(double faceValue, double couponRate, int years)
        : faceValue_(faceValue), couponRate_(couponRate), years_(years) {}

    double price(double yield) const {
        double pv = 0.0;
        double coupon = faceValue_ * couponRate_;
        for (int t = 1; t <= years_; ++t)
            pv += coupon / std::pow(1.0 + yield, t);
        pv += faceValue_ / std::pow(1.0 + yield, years_);
        return pv;
    }

private:
    double faceValue_, couponRate_;
    int years_;
};

PYBIND11_MODULE(quantlib_cpp, m) {
    // ... black_scholes_call binding from above ...

    py::class_<Bond>(m, "Bond")
        .def(py::init<double, double, int>(),
             py::arg("face_value"), py::arg("coupon_rate"), py::arg("years"))
        .def("price", &Bond::price, py::arg("yield"));
}
```

## Calling it from Python

Once compiled (the full build process is next lesson), the module imports and behaves like any other Python object:

```python
import quantlib_cpp as qc

price = qc.black_scholes_call(spot=100.0, strike=105.0, rate=0.03,
                               vol=0.20, time_to_expiry=1.0)
print(f"call price: {price:.4f}")

bond = qc.Bond(face_value=1000.0, coupon_rate=0.05, years=10)
print(bond.price(yield=0.04))
```

Note the C++ `double`, `int`, and class instance all convert automatically — no manual marshaling. That automatic conversion is exactly what breaks down once you want to pass a NumPy array instead of a single `double`, which is the subject of the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| pybind11 | Header-only C++ library that generates CPython bindings from ordinary C++ declarations |
| `PYBIND11_MODULE(name, m)` | Macro that defines the module entry point Python's `import` loads |
| `m.def(...)` | Binds a free function; `py::arg(...)` gives it named/keyword arguments |
| `py::class_<T>` | Binds a C++ class, its constructor (`py::init<...>()`), and its methods |

## Recap

pybind11 turns a C++ function or class into an ordinary-looking Python import with a handful of declarative lines — `PYBIND11_MODULE`, `m.def`, and `py::class_` cover the large majority of real bindings you'll write. The automatic conversion that makes `double` and `int` painless stops being automatic once arrays enter the picture. Next up, Lesson 32: Exposing Numerical Code to NumPy.
