# Cython Basics

Cython takes a different route to compiled speed than Numba. Instead of compiling an ordinary Python function at runtime, Cython is a separate language — a superset of Python — that you compile ahead of time into a C extension module, using explicit type declarations to tell the compiler exactly what each variable is. It's more manual than Numba and requires a real build step, but it gives you finer control, works with arbitrary Python/C interaction that Numba can't touch, and has no first-call compilation tax at runtime because the compilation already happened before the code ever ran.

A note before starting: **the examples in this lesson are illustrative Cython source code, not code that was compiled or benchmarked in this environment.** This machine has no C/C++ compiler installed (no `cl.exe`, no `gcc`), so `.pyx` files can't actually be built here. The code below is syntactically correct, realistic Cython — but you compile and benchmark it yourself, on a machine with a C toolchain installed (MSVC on Windows via Visual Studio Build Tools, `gcc`/`clang` on Linux/Mac), the same way you'd use any Cython code in a real project.

## What you'll learn

- `.pyx` files and how Cython differs from plain Python
- `cdef` and `cpdef`: static typing for C-level speed
- The build step: `cythonize`, `setup.py build_ext`, and `pyximport` for quick iteration
- When Cython is worth the extra complexity compared to Numba
- Why this lesson doesn't claim a specific Cython speedup number

## `.pyx` files: Python with optional C types

A `.pyx` file is Cython source — Python syntax, extended with the ability to declare C-level types. Plain Python code is usually valid Cython as-is (which is why Cython can also be used to simply compile unmodified Python for a modest speedup), but the real performance comes from adding type declarations so the compiler can generate tight C code instead of generic, dynamically-typed Python object operations:

```cython
# pairwise.pyx  (illustrative -- not compiled in this environment)
import numpy as np
cimport numpy as cnp

def pairwise_dist_cython(cnp.ndarray[cnp.float64_t, ndim=1] x):
    cdef int n = x.shape[0]
    cdef int i, j
    cdef double diff
    cdef cnp.ndarray[cnp.float64_t, ndim=2] out = np.empty((n, n), dtype=np.float64)

    for i in range(n):
        for j in range(n):
            diff = x[i] - x[j]
            out[i, j] = diff if diff >= 0 else -diff
    return out
```

Every `cdef`-declared variable here (`n`, `i`, `j`, `diff`) becomes a genuine C `int` or `double` at compile time, not a Python object — that's what removes the per-element Python overhead a pure-Python loop would pay on every single operation.

## `cdef` vs. `cpdef`

`cdef` declares a C-level variable or function. A `cdef`-declared *function* compiles to a pure C function, callable efficiently from other Cython code, but not visible to plain Python code calling the module. `cpdef` is the middle ground: it generates both a fast C-level entry point for other Cython code and a Python-callable wrapper, at a small overhead cost for the wrapper:

```cython
# illustrative -- not compiled in this environment
cdef double _variance(double[:] chunk, int window):
    cdef double total = 0.0
    cdef int k
    for k in range(window):
        total += chunk[k]
    cdef double mean = total / window
    cdef double sq_total = 0.0
    for k in range(window):
        sq_total += (chunk[k] - mean) ** 2
    return sq_total / window

cpdef rolling_vol_cython(double[:] returns, int window):
    cdef int n = returns.shape[0]
    cdef int i
    out = []
    for i in range(window, n):
        out.append(_variance(returns[i - window:i], window) ** 0.5)
    return out
```

`double[:]` here is a **typed memoryview** — a way to declare "a C-level view onto a buffer of doubles," which is how Cython gets fast, direct access to a NumPy array's underlying memory without going through Python-level indexing on every access.

## The build step

Unlike Numba, Cython code needs to be compiled into a real C extension module before you can import it — there's no first-call JIT step at runtime. The two common ways to do this:

**`setup.py` + `cythonize`**, for a module you ship as part of a package:

```python
# setup.py  (illustrative)
from setuptools import setup
from Cython.Build import cythonize

setup(ext_modules=cythonize("pairwise.pyx"))
```

Then, from the command line, with a C compiler installed:

```
python setup.py build_ext --inplace
```

This produces a compiled `.pyd` (Windows) or `.so` (Linux/Mac) file next to the source, importable from Python exactly like any other module: `from pairwise import pairwise_dist_cython`.

**`pyximport`**, for quick local iteration without writing a `setup.py`:

```python
# at the top of a script, before importing the .pyx module
import pyximport
pyximport.install()
import pairwise   # compiles pairwise.pyx on the fly, then imports it
```

`pyximport` is convenient for development but `setup.py build_ext` (or the modern `pyproject.toml`-based build, covered in Lesson 21) is the right approach for anything you distribute, since it compiles once at build/install time rather than on every fresh environment.

## When Cython is worth it vs. Numba

Numba is usually the better first choice for numeric, array-and-loop-shaped code: no separate build step, no new syntax to learn, and (as the real measurements in the previous lesson showed) genuinely fast once compiled. Reach for Cython instead when you need things Numba's nopython mode can't do — wrapping an existing C/C++ library, fine-grained control over Python/C object interaction, working with arbitrary Python objects inside the hot loop rather than just NumPy arrays and numeric scalars, or shipping a compiled extension as part of a distributable package where you don't want to depend on Numba's JIT machinery being available at runtime. The decision is roughly: start with vectorization, reach for Numba if a loop genuinely needs compiling, and reach for Cython specifically when Numba's restrictions (not just its speed) are the blocker.

## Why no specific Cython speedup number here

The well-known qualitative pattern is that static typing removes per-element Python overhead, so a properly `cdef`-typed Cython loop's performance approaches that of equivalent hand-written C — which is the same general order of magnitude of compiled-code speedup the previous lesson *actually measured* for Numba (tens of times faster than a pure Python loop, and competitive with or faster than NumPy vectorization). That Numba number is a real, measured number for Numba specifically; it is cited here only as a sense of the order of magnitude "compiled numeric Python" can reach, not as a claimed number for Cython, which this environment cannot compile or benchmark. When you compile the examples above on your own machine, time them the same way Lesson 12 and 14 did — `timeit` or a manual `time.perf_counter()` comparison against the pure-Python and Numba versions — rather than trusting any number quoted secondhand.

## Key terms

| Term | Meaning |
|---|---|
| `.pyx` file | Cython source file; Python syntax extended with optional C-level type declarations |
| `cdef` | Declares a C-level variable, or a function callable only from other Cython code |
| `cpdef` | Declares a function with both a fast C entry point and a Python-callable wrapper |
| Typed memoryview (`double[:]`) | A C-level view onto a buffer (e.g. a NumPy array) for fast direct access |
| `cythonize` / `build_ext` | The ahead-of-time build step that compiles `.pyx` source into an importable extension module |

## Recap

Cython trades Numba's zero-setup JIT convenience for a real ahead-of-time build step and finer-grained control, using `cdef`/`cpdef` type declarations to remove Python-level overhead and approach C performance — worth it specifically when you need capabilities nopython mode doesn't have, not as a default first choice. Next lesson: multiprocessing and parallelism, for when the bottleneck isn't a single hot loop but needs to be spread across multiple CPU cores.
