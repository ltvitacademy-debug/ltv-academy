# Exposing Numerical Code to NumPy

A single `double` argument crosses the Python/C++ boundary for free, but quant code rarely works one number at a time — it works on arrays of prices, returns, and strikes. This lesson covers how pybind11 accepts and returns NumPy arrays directly, without copying data unnecessarily, using `py::array_t` and the buffer protocol.

## What you'll learn

- Why `std::vector` conversion isn't the right tool for large or performance-sensitive array arguments
- `py::array_t<double>` and the buffer protocol: `.request()`, `.ptr`, `.shape`, `.mutable_data()`
- Writing a vectorized C++ function that processes a whole NumPy array in one call
- Returning a newly allocated NumPy array from C++ without a Python-side copy

## Why not just convert to std::vector?

pybind11 can convert a NumPy array to a `std::vector<double>` automatically via its STL support header, but that conversion **copies** every element into a new `std::vector`, and copies the result back on return. For a 10-element array that's irrelevant; for a 10-million-row Monte Carlo path matrix, that's two full copies of data you already had in memory. The buffer protocol lets C++ read and write NumPy's underlying memory directly — zero copies.

## py::array_t and the buffer protocol

`py::array_t<double>` is pybind11's typed view over a NumPy array. `#include <pybind11/numpy.h>` brings it in. Calling `.request()` on it returns a `py::buffer_info` describing the array's raw pointer, shape, and strides:

```cpp
#include <pybind11/pybind11.h>
#include <pybind11/numpy.h>

namespace py = pybind11;

py::array_t<double> vectorizedPayoff(py::array_t<double> spots, double strike) {
    py::buffer_info buf = spots.request();
    if (buf.ndim != 1)
        throw std::runtime_error("expected a 1-D array");

    auto result = py::array_t<double>(buf.shape);
    py::buffer_info resBuf = result.request();

    const double* in  = static_cast<const double*>(buf.ptr);
    double*       out = static_cast<double*>(resBuf.ptr);

    for (ssize_t i = 0; i < buf.shape[0]; ++i) {
        double payoff = in[i] - strike;
        out[i] = payoff > 0.0 ? payoff : 0.0;
    }
    return result;
}

PYBIND11_MODULE(quantlib_cpp, m) {
    m.def("vectorized_payoff", &vectorizedPayoff,
          py::arg("spots"), py::arg("strike"));
}
```

`buf.ptr` is a `void*` to NumPy's existing data — this function never copies the input. It allocates one new output array of the same shape and writes directly into its buffer via `mutable_data()` or, as above, the raw pointer from `.request()`.

## Reading from the existing buffer without copying

For read-only access, `.data()` (the const-correct accessor on `py::array_t`) avoids any ambiguity about ownership:

```cpp
double meanOf(py::array_t<double> values) {
    py::buffer_info buf = values.request();
    const double* data = static_cast<const double*>(buf.ptr);
    double sum = 0.0;
    for (ssize_t i = 0; i < buf.shape[0]; ++i) sum += data[i];
    return sum / static_cast<double>(buf.shape[0]);
}
```

## Calling it from Python

From the caller's side, nothing looks unusual — it's still just NumPy:

```python
import numpy as np
import quantlib_cpp as qc

spots = np.array([95.0, 100.0, 105.0, 110.0])
payoffs = qc.vectorized_payoff(spots, strike=100.0)
print(payoffs)        # array([ 0.,  0.,  5., 10.])
print(qc.mean_of(spots))
```

This is the pattern behind every performance-motivated C++ extension in a Python quant codebase: NumPy owns and allocates the array, pybind11 hands C++ a view into that exact memory, and C++ does the number-crunching at native speed with zero marshaling overhead.

## Key terms

| Term | Meaning |
|---|---|
| Buffer protocol | A CPython mechanism exposing an object's raw memory, shape, and strides without copying |
| `py::array_t<T>` | pybind11's typed wrapper over a NumPy array, built on the buffer protocol |
| `.request()` | Returns a `py::buffer_info` with `.ptr`, `.shape`, `.ndim`, `.strides` |
| `.mutable_data()` | Typed, writable pointer into an array's buffer |

## Recap

`py::array_t` plus the buffer protocol lets C++ read and write NumPy's own memory directly, which is what makes a compiled extension worth writing in the first place — no copy in, no copy out, just raw pointers and a tight loop. Next up, Lesson 33: Building & Distributing Extensions.
