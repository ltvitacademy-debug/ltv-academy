# Writing Basic Unit Tests

**Chapter 7 · Testing & Code Quality · Lesson 31 of 37**

A unit test is a small, automated check that a single piece of code does what you expect — run in seconds, repeatable forever, and the thing that lets you change code later without wondering what you just broke. This lesson covers `pytest`, the standard tool for writing them in Python.

## What you'll learn

- Why manual testing ("run it and look") doesn't scale past a handful of functions
- Writing and running your first test with `pytest`
- `assert` statements — the core of every test
- Testing that an error is correctly raised, not just that a value is correct

## Why automated tests

Manually running your script and reading the output works for one function. It stops working once you have dozens of functions and need to know, after every change, that none of the other ones silently broke. A test suite answers that in seconds instead of an afternoon of manual re-checking.

## Your first test

```python
# calculator.py
def add(a, b):
    return a + b
```

```python
# test_calculator.py
from calculator import add

def test_add_two_positive_numbers():
    assert add(2, 3) == 5

def test_add_negative_numbers():
    assert add(-1, -1) == -2
```

```
pytest test_calculator.py
# 2 passed in 0.01s
```

`pytest` finds any file named `test_*.py`, runs every function named `test_*` inside it, and reports which passed or failed. No test-runner boilerplate, no classes required — a plain function with an `assert` is a complete test.

## assert is the whole mechanism

```python
assert add(2, 3) == 5
```

`assert` checks that a condition is `True`. If it isn't, Python raises an `AssertionError` and `pytest` reports that test as failed, showing you both sides of the comparison so you can see exactly what was expected versus what you got.

## Testing that errors happen correctly

```python
import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("cannot divide by zero")
    return a / b

def test_divide_by_zero_raises():
    with pytest.raises(ValueError):
        divide(10, 0)
```

Some of the most important tests aren't about the happy path — they confirm your code fails the *right* way. `pytest.raises()` passes only if the code inside the `with` block actually raises the given exception type; if it doesn't raise anything, the test itself fails.

## Recap

- Automated tests replace manually re-checking your code by hand after every change.
- `pytest` auto-discovers `test_*.py` files and `test_*` functions — no boilerplate required.
- A test is a function containing one or more `assert` statements; a failing assert fails the test.
- `pytest.raises(ExceptionType)` verifies that code correctly raises an error, not just that it returns the right value.
- Next lesson: type hints, which catch a whole category of bugs before you even run a test.
