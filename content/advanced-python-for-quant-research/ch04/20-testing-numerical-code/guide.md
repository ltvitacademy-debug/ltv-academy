# Testing Numerical Code

Testing numerical code has one wrinkle that testing, say, a string-processing function doesn't: the "correct" answer is almost never an exact value you can compare with `==`, because — as Lesson 7 covered — floating-point arithmetic doesn't produce bit-exact results across different (but mathematically equivalent) computation paths. This lesson covers `pytest` basics, the tolerance-based assertions numerical tests actually need, property-based testing with `hypothesis` for catching cases you didn't think to write by hand, and the specific edge cases (empty arrays, NaNs, overflow) that numerical functions tend to mishandle.

## What you'll learn

- `pytest` basics: test discovery, assertions, running a test file
- Why `==` is usually the wrong assertion for floats, and what to use instead
- `pytest.approx` and `np.testing.assert_allclose`
- Property-based testing with `hypothesis`: testing a rule across many generated inputs
- Edge cases numerical code needs explicit tests for: empty arrays, NaNs, overflow

## `pytest` basics

`pytest` discovers any function named `test_*` in a file named `test_*.py`, runs it, and reports pass/fail based on whether any `assert` statement inside it fails. No boilerplate test-class or decorator is required for a simple case:

```python
# returns_lib.py
import numpy as np

def pct_returns(prices: np.ndarray) -> np.ndarray:
    prices = np.asarray(prices, dtype=float)
    if prices.size < 2:
        return np.array([])
    return prices[1:] / prices[:-1] - 1.0
```

```python
# test_returns.py
import numpy as np
from returns_lib import pct_returns

def test_pct_returns_basic():
    prices = np.array([100.0, 110.0, 99.0])
    result = pct_returns(prices)
    assert result[0] == 0.1    # looks reasonable -- but watch what happens
```

## Why `==` fails, and what real output from that failure looks like

Running the test above with `pytest test_returns.py -v` produces a real failure:

```
test_returns.py::test_pct_returns_basic FAILED

================================== FAILURES ===================================
___________________________ test_pct_returns_basic ____________________________

    def test_pct_returns_basic():
        prices = np.array([100.0, 110.0, 99.0])
        result = pct_returns(prices)
>       assert result[0] == 0.1
E       assert 0.10000000000000009 == 0.1

test_returns.py:10: AssertionError
================================= 1 failed, 5 passed in 1.34s =================
```

The computation is correct — `110.0 / 100.0 - 1.0` really does produce `0.10000000000000009`, not exactly `0.1`, for the same IEEE-754 reasons Lesson 7 covered. The test was wrong, not the code. This is the single most common mistake in testing numerical Python: comparing floats with `==` and treating the resulting failure as a bug in the code under test, when it's a bug in the test's assertion.

## `pytest.approx` and `np.testing.assert_allclose`

The fix is a tolerance-based comparison. `pytest.approx` works for scalars, right inside a plain `assert`:

```python
def test_pct_returns_basic():
    prices = np.array([100.0, 110.0, 99.0])
    result = pct_returns(prices)
    assert result[0] == pytest.approx(0.1)
```

`np.testing.assert_allclose` is the array equivalent, comparing every element within tolerance and raising a descriptive error (not just `True`/`False`) on mismatch:

```python
def test_pct_returns_tolerance():
    prices = np.array([100.0, 110.0, 99.0])
    result = pct_returns(prices)
    np.testing.assert_allclose(result, [0.10, -0.10], rtol=1e-10)
```

Re-running the full suite after this fix, real output:

```
test_returns.py::test_pct_returns_basic PASSED
test_returns.py::test_pct_returns_tolerance PASSED
test_returns.py::test_pct_returns_empty_array PASSED
test_returns.py::test_pct_returns_with_nan_propagates PASSED
test_returns.py::test_annualized_vol_known_value PASSED
test_returns.py::test_annualized_vol_empty_is_nan PASSED

============================== 6 passed in 1.15s ==============================
```

## Edge cases numerical code needs tested explicitly

The other four tests in that passing run are each targeting a specific edge case that numerical functions commonly mishandle:

```python
def test_pct_returns_empty_array():
    assert pct_returns(np.array([100.0])).size == 0   # one price -> no returns
    assert pct_returns(np.array([])).size == 0          # no prices -> no returns

def test_pct_returns_with_nan_propagates():
    result = pct_returns(np.array([100.0, np.nan, 110.0]))
    assert np.isnan(result[0]) and np.isnan(result[1])   # NaN should propagate, not silently vanish

def test_annualized_vol_empty_is_nan():
    assert np.isnan(annualized_vol(np.array([]))) # explicit: empty input is undefined, not zero
```

Empty inputs, `NaN` propagation, and (for anything involving large magnitudes or repeated multiplication) overflow are the recurring sources of silent numerical bugs — code that works perfectly on the "normal" case in front of you during development but does something wrong, or crashes confusingly, the first time a real dataset has a gap, a missing price, or an unusually large value. Writing one test per edge case, rather than assuming the normal-case tests cover them, is what actually catches these before they reach production.

## Property-based testing with `hypothesis`

Hand-written test cases only cover the specific inputs you thought of. `hypothesis` generates many random inputs matching a specification and checks that a *property* — a rule that should hold for every valid input, not just the ones you picked — is never violated:

```python
import numpy as np
from hypothesis import given, strategies as st
from returns_lib import pct_returns

positive_prices = st.lists(
    st.floats(min_value=0.01, max_value=1_000_000, allow_nan=False, allow_infinity=False),
    min_size=1, max_size=200,
)

@given(positive_prices)
def test_pct_returns_length_property(prices):
    result = pct_returns(np.array(prices))
    assert len(result) == max(len(prices) - 1, 0)
```

Real output from running this, alongside a second property test checking that each return correctly reconstructs the price ratio it came from:

```
test_returns_property.py::test_pct_returns_length_property PASSED
test_returns_property.py::test_pct_returns_reconstructs_price_ratio PASSED

============================== 2 passed in 1.70s ==============================
```

Under the hood, `hypothesis` generated many different price lists — different lengths, different magnitudes — and checked the length-matching property held for every single one, not just a hand-picked example. This is especially valuable for numerical code, where the bug that hand-written tests miss is often a specific combination of input size and magnitude nobody thought to type out by hand.

## Key terms

| Term | Meaning |
|---|---|
| `pytest` | Test framework that discovers `test_*` functions and reports pass/fail from plain `assert` statements |
| `pytest.approx` | Tolerance-based scalar comparison, usable directly inside an `assert` |
| `np.testing.assert_allclose` | Tolerance-based array comparison with a descriptive failure message |
| Property-based testing | Checking a general rule holds across many generated inputs, via `hypothesis`, instead of fixed hand-picked cases |
| Edge case | An input (empty array, NaN, overflow-prone magnitude) that commonly breaks numerical code silently |

## Recap

Numerical tests need tolerance-based assertions (`pytest.approx`, `np.testing.assert_allclose`) instead of `==`, as the real `0.10000000000000009 == 0.1` failure in this lesson demonstrated directly; explicit tests for empty arrays, NaN propagation, and similar edge cases catch what normal-case tests miss, and `hypothesis` property tests check a rule across many generated inputs rather than a few hand-picked ones. Next lesson: packaging and project structure, for organizing all of this — library code, tests, and research scripts — into a layout that scales past a single file.
