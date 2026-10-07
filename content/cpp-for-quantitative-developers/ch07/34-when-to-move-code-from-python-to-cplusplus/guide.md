# When to Move Code From Python to C++

Everything in this chapter has given you the mechanics of crossing the Python/C++ boundary. This lesson is about judgment: when is writing and maintaining a compiled extension actually worth it, versus when does it just add complexity for no real speedup? Getting this wrong in either direction — rewriting too early, or never rewriting at all — is a real cost in a quant codebase.

## What you'll learn

- Why "Python is slow" is the wrong framing, and what actually makes a function worth porting
- Profiling before porting: confirming the hot path with real numbers, not intuition
- The boundary-crossing cost that can make a port *slower* if done carelessly
- A practical decision checklist for "leave it in Python" vs. "port it to C++"

## "Python is slow" is the wrong question

Python itself is slow at tight numeric loops, but most "slow" Python code isn't actually running Python bytecode in a loop — it's calling into NumPy, pandas, or another C-backed library that's already fast. Porting code that's already dominated by a vectorized NumPy call to C++ buys you little, because the bottleneck was never Python's interpreter loop. The right question is narrower: *is this specific function spending real wall-clock time in genuinely Python-interpreted, element-by-element work?*

## Profile first, always

Chapter 6 covered profiling C++; the same discipline applies before you ever decide to leave Python. Use `cProfile` or `line_profiler` to find where time actually goes:

```python
import cProfile

cProfile.run("run_monte_carlo_simulation(n_paths=500_000)")
# ...
#    500000    8.214    0.000    8.214    0.000 pricer.py:41(simulate_path)
```

If `simulate_path` — a pure-Python, per-path loop — is where 90% of wall-clock time goes, that's a legitimate porting candidate. If the profile instead shows time dominated by `numpy.random.normal` or `pandas.DataFrame.groupby`, those are already C-backed; porting your Python wrapper around them won't help.

## The cost of crossing the boundary

Calling into a pybind11 extension isn't free — every call has function-call overhead, and every argument may involve a type check or conversion. For a function called once with a large array, that overhead is negligible next to the work inside. For a function called millions of times with a handful of scalars each time, the call overhead itself can start to matter:

```cpp
// Called 10 million times with scalars: overhead-bound
double tinyFunction(double x) { return x * 2.0; }

// Called once with a 10-million-element array: compute-bound, worth it
py::array_t<double> bigVectorizedFunction(py::array_t<double> xs);
```

The lesson: port the *loop*, not the *inner step*. Moving `simulate_path` (the whole per-path computation) into C++ and vectorizing the call over all paths at once amortizes the boundary-crossing cost across the entire workload, instead of paying it millions of times for one multiplication each.

## A practical decision checklist

Port to C++ when:
- Profiling shows real wall-clock time spent in a pure-Python, element-by-element loop
- The function is called with large batches (vectorize the C++ side, don't cross the boundary per-element)
- The logic is stable enough to be worth the extra build/maintenance overhead of a compiled extension

Leave it in Python when:
- The bottleneck is already inside NumPy/pandas/SciPy — those are C/Fortran under the hood
- The function runs rarely or on small inputs where microseconds don't matter
- The logic changes frequently — a compiled extension's edit/rebuild/reinstall cycle slows iteration

## Key terms

| Term | Meaning |
|---|---|
| Hot path | The specific code actually consuming most of a program's measured runtime |
| Boundary-crossing overhead | The per-call cost of invoking a compiled extension from Python |
| C-backed library | A Python library (NumPy, pandas) whose core loops already run in compiled C/Fortran |
| Vectorized port | Porting an entire loop to C++ and calling it once per batch, not once per element |

## Recap

"Python is slow" is rarely the real diagnosis — profile first, and only port the specific loop that's genuinely interpreter-bound and called at scale, vectorizing the C++ side so the boundary is crossed once per batch instead of once per element. That judgment is exactly what you'll apply in the capstone, where you'll design, build, and present a real C++ pricing library exposed to Python. Next up, Lesson 35: Capstone Kickoff — A High-Performance C++ Pricing Library.
