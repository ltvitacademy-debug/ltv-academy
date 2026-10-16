# Lesson 40 — Writing Unit Tests With pytest

**Chapter 7 · Logging, Testing, Error Handling and Automation · Lesson 40 of 48**

## What you'll learn

- Why a data-validation function needs its own tests, separate from running the pipeline
- `pytest` — naming convention, `assert`, and running the suite
- Testing both the "good" case and the "bad" case for the same function
- `pytest.raises()` — asserting that a function fails the way it should

## Why test a validation function on its own

Chapter 6's transformation logic includes functions like
`validate_row()` that decide whether a record is clean enough to
load. Running the whole pipeline to check if that one function still
works is slow and indirect — a unit test calls the function directly,
with known input, and checks the exact output, in a fraction of a
second.

## pytest naming convention and a first test

```python
# file: validators.py
def validate_row(row: dict) -> bool:
    if row.get("order_id") is None:
        return False
    if row.get("amount", 0) <= 0:
        return False
    return True
```

```python
# file: test_validators.py
from validators import validate_row

def test_validate_row_accepts_a_good_row():
    row = {"order_id": 101, "amount": 42.50}
    assert validate_row(row) is True
```

`pytest` discovers tests by filename (`test_*.py`) and function name
(`test_*`) automatically — no registration step. `assert` is the
whole mechanism: if the expression is `True`, the test passes; if
not, pytest reports exactly which assertion failed and why.

## Testing the bad case too

```python
def test_validate_row_rejects_missing_order_id():
    row = {"order_id": None, "amount": 42.50}
    assert validate_row(row) is False

def test_validate_row_rejects_zero_amount():
    row = {"order_id": 101, "amount": 0}
    assert validate_row(row) is False
```

A function that's only ever tested with good input can hide a bug in
its failure path — the exact path a real pipeline leans on to catch
bad data. Testing both sides is what actually proves the function
works, not just that it doesn't crash on the easy case.

## pytest.raises() for functions that should error

```python
def parse_amount(raw: str) -> float:
    if raw is None:
        raise ValueError("amount cannot be None")
    return float(raw)
```

```python
import pytest
from validators import parse_amount

def test_parse_amount_raises_on_none():
    with pytest.raises(ValueError):
        parse_amount(None)

def test_parse_amount_converts_a_string():
    assert parse_amount("19.99") == 19.99
```

When a function is *supposed* to raise an exception on bad input,
`pytest.raises()` is how you assert that — the test fails if the
`ValueError` doesn't happen, confirming the guard clause actually
works instead of just assuming it does.

## Running the suite

```bash
pytest test_validators.py -v
```

```
test_validators.py::test_validate_row_accepts_a_good_row PASSED
test_validators.py::test_validate_row_rejects_missing_order_id PASSED
test_validators.py::test_validate_row_rejects_zero_amount PASSED
test_validators.py::test_parse_amount_raises_on_none PASSED
test_validators.py::test_parse_amount_converts_a_string PASSED
```

`-v` prints one line per test instead of just a dot — useful while
you're actively writing tests, so you can see exactly which one just
ran.

## Key terms

| Term | Meaning |
|---|---|
| `test_*.py` / `test_*` | pytest's naming convention for auto-discovering tests |
| `assert` | The core check — the test passes if the expression is `True` |
| `pytest.raises()` | Asserts that a block of code raises a specific exception |
| Unit test | Tests one function in isolation, with known input and expected output |

## Lab

Write tests for this validation function:

```python
def validate_email(email: str) -> bool:
    if email is None or "@" not in email:
        return False
    return True
```

```python
from validators import validate_email

def test_validate_email_accepts_valid_address():
    assert validate_email("alex@example.com") is True

def test_validate_email_rejects_none():
    assert validate_email(None) is False

def test_validate_email_rejects_missing_at_sign():
    assert validate_email("alexexample.com") is False
```

Run `pytest -v` and confirm all three pass.

## Check yourself

You're ready for Lesson 41 when you can explain, without looking: why
is it important to test a validation function's *rejection* cases, not
just the input you expect it to accept?
