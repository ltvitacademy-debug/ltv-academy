# Calling Q# From Python

Qiskit never needed an "interop lesson" because Qiskit IS Python — there's no boundary to cross. Q# is a separate compiled language, which means calling it from Python is a real, deliberate integration step, not an implicit given. This lesson is that step.

## What you'll learn

- Why mixing Q# and Python is a genuinely different problem than anything Qiskit-only work requires
- How to define Q# operations and call them directly from a Python/Jupyter session via the `qsharp` package
- How results come back as native Python objects, not opaque Q# values
- A verified example: running many shots from Python and checking the result against the expected distribution

## Why this boundary exists at all

In Qiskit, building a circuit, running it, and plotting a histogram are all just Python function calls in the same process, using the same objects. In Q#, your quantum logic is written in a separate, statically-typed, compiled language with its own type system (recall Chapter 2's operations-vs-functions distinction, which has no equivalent boundary in Python). The benefit of that separation is real — compiler-checked correctness properties on your quantum code — but it means that if you want to drive experiments, sweep parameters, or plot results using Python's data/ML ecosystem (`numpy`, `pandas`, `matplotlib`), you need an explicit bridge between the two languages. That bridge is the `qsharp` Python package.

## Defining and calling an operation from Python

In a Jupyter notebook, the `%%qsharp` cell magic lets you write and compile Q# source directly, then call it from an ordinary Python cell right after:

```python
import qsharp
```

```qsharp
%%qsharp
operation PrepareAndMeasure() : Result {
    use q = Qubit();
    H(q);
    return M(q);
}
```

```python
result = qsharp.eval("PrepareAndMeasure()")
print(result)        # e.g. "Zero" or "One" -- a native Python-visible value
print(type(result))
```

The Q# operation compiles the moment the `%%qsharp` cell runs, and `qsharp.eval(...)` calls it and hands the return value back into Python. There's no manual serialization step on your part — the `qsharp` package handles converting a Q# `Result` into something Python code can immediately branch on, print, or store.

## Running many shots and checking the distribution

A single call only gives you one measurement. To actually see the distribution, call it repeatedly from a Python loop and tally the outcomes — exactly the kind of orchestration Python is good at and Q# intentionally isn't trying to replace:

```python
from collections import Counter

outcomes = Counter(qsharp.eval("PrepareAndMeasure()") for _ in range(1000))
print(outcomes)   # e.g. Counter({'Zero': 501, 'One': 499})
```

Since `PrepareAndMeasure` applies `H` to `|0⟩` before measuring, the theoretically expected distribution is exactly 50/50: `H|0⟩ = (|0⟩+|1⟩)/√2`, so each outcome has probability exactly `0.5` — verified directly by computing `|1/√2|² = 0.5` for both amplitudes, not assumed. A real run over 1000 shots will show counts near, but not exactly, 500/500 (sampling variation around the true 0.5/0.5 split) — which is itself a useful thing to see happen in Python's `Counter` output rather than only reasoned about abstractly.

## Key terms

| Term | Meaning |
|---|---|
| `qsharp` package | The Python package providing the bridge between compiled Q# code and a Python/Jupyter session |
| `%%qsharp` cell magic | Jupyter notebook syntax for writing and compiling Q# source directly inside a notebook cell |
| `qsharp.eval(...)` | Calls a compiled Q# operation by name/expression and returns its result as a Python object |
| Sampling variation | The expected run-to-run fluctuation around a theoretical probability when only finitely many shots are run |

## Check yourself

Why does Qiskit not need an equivalent of `qsharp.eval(...)` or `%%qsharp`, and what does that tell you about the actual cost (not just the benefit) of Q#'s decision to be a separate, statically-typed language rather than a Python library?
