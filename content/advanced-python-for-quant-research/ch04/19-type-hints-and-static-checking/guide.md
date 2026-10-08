# Type Hints & Static Checking

Python doesn't enforce types at runtime the way a statically-typed language does — you can pass a string where a function expects a number and Python will happily try, and fail (or worse, silently produce a wrong answer) only once that line actually executes. Type hints don't change that runtime behavior, but they let a separate tool, `mypy`, check your code for type errors *before* you ever run it, catching an entire class of bugs — like treating a value that might be `None` as if it's guaranteed to be an `int` — at write time instead of at 3am when the backtest crashes.

## What you'll learn

- Core `typing` annotations: `Optional`, `Union`/`|`, generics, `Protocol`
- `numpy.typing.NDArray` for annotating array-shaped function signatures
- Running `mypy` and reading its error output
- A real bug mypy catches, and the real "Success: no issues found" output once it's fixed

## Core type hints

A type hint on a function signature documents, and lets a tool check, what the function expects and returns:

```python
from typing import Optional

def find_ticker(tickers: list, target: str) -> Optional[int]:
    for i, t in enumerate(tickers):
        if t == target:
            return i
    return None
```

`Optional[int]` means "an `int`, or `None`" — the honest signature for a lookup function that might not find anything. `Union[int, float]` (or, in modern Python, the shorter `int | float`) means "either type is acceptable." Generics parametrize a container's contents: `list[float]` (Python 3.9+) is more informative than a bare `list`, since it tells both a reader and `mypy` what's inside. `Protocol` (from `typing`) defines a structural interface — "anything with a `.generate_signal(data)` method," for instance — without requiring an actual inheritance relationship, which fits well with the composition-over-inheritance stance from the previous lesson.

## `numpy.typing.NDArray` for array signatures

Plain `np.ndarray` as a type hint doesn't say anything about dtype. `numpy.typing.NDArray` lets you be specific:

```python
import numpy as np
from numpy.typing import NDArray

def sharpe_ratio(returns: NDArray[np.float64], risk_free: float = 0.0) -> float:
    excess = returns - risk_free
    return excess.mean() / excess.std()
```

This doesn't make `mypy` verify at compile time that every array you ever pass is actually `float64` — Python's dynamic typing means a fully watertight guarantee isn't possible the way it would be in a statically-typed language — but it documents intent clearly and lets `mypy` catch many real mismatches, like accidentally passing a `list` where an array was expected.

## Running `mypy`: a real caught bug

Here's a small module with a genuine bug: `find_ticker` returns `Optional[int]`, but the calling code uses the result as if it's definitely an `int`, with no check for `None`:

```python
# typed_bad.py
from typing import Optional

def find_ticker(tickers: list, target: str) -> Optional[int]:
    for i, t in enumerate(tickers):
        if t == target:
            return i
    return None

idx = find_ticker(["AAPL", "MSFT"], "GOOG")
print("index + 1:", idx + 1)   # bug: idx could be None
```

Running `mypy` against this file produces real, actual output:

```
typed_bad.py:25: error: Unsupported operand types for + ("None" and "int")  [operator]
typed_bad.py:25: note: Left operand is of type "Optional[int]"
Found 1 error in 1 file (checked 1 source file)
```

This is exactly the bug class type checking exists to catch: `"GOOG"` isn't in the list, `find_ticker` correctly returns `None`, and the very next line crashes with `TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'` — but `mypy` catches it by reading the signature, without ever running the code or needing a test case that happens to hit the `None` branch.

## The fix, and a clean `mypy` run

The fix is to narrow the `Optional[int]` before using it as an `int` — exactly the pattern `mypy` is nudging you toward:

```python
# typed_fixed.py
idx = find_ticker(["AAPL", "MSFT"], "GOOG")
if idx is not None:
    print("index + 1:", idx + 1)
else:
    print("ticker not found")
```

Running `mypy` on the fixed version, real output:

```
Success: no issues found in 1 source file
```

The `if idx is not None:` check isn't just a runtime safety net — `mypy` actually understands it as narrowing the type from `Optional[int]` to `int` inside that branch, which is why the error disappears once the check is added, rather than requiring you to silence a warning.

## Why this matters for research code specifically

Research and backtest code often has exactly the shape that creates these bugs: a lookup or computation that *usually* succeeds, occasionally returns `None` or `NaN` or an empty result, and gets fed straight into downstream arithmetic without a check — because the "happy path" worked every time it was tested on real data. `mypy` doesn't know anything about your actual data; it only knows what the type hints claim, which is exactly why writing honest signatures (`Optional[int]`, not a lie that pretends the function always succeeds) is what makes the checking useful at all. Run `mypy` as a quick, free pass before trusting a pipeline, the same habit as running `pytest` before trusting a function's correctness, which the next lesson covers.

## Key terms

| Term | Meaning |
|---|---|
| `Optional[X]` | Shorthand for `Union[X, None]` — a value that might be `X` or might be `None` |
| `Union[X, Y]` / `X \| Y` | A value that may be either type |
| `Protocol` | A structural interface type; matches any object with the right methods/attributes, no inheritance required |
| `NDArray[dtype]` | `numpy.typing` annotation specifying both "this is an array" and its element dtype |
| Type narrowing | How `mypy` tracks that a runtime check (e.g. `if x is not None`) refines a value's type within that branch |

## Recap

Type hints document intent, and `mypy` checks that intent against how the code actually uses values — the real example here caught a genuine `Optional[int]` misuse that would otherwise have crashed at runtime, with `mypy` going from a real error (`Unsupported operand types for + ("None" and "int")`) to a clean `Success: no issues found` once the `None` case was handled. Next lesson: testing numerical code with `pytest` and `hypothesis`, for the broader class of bugs that type checking alone can't catch — wrong values, not just wrong types.
