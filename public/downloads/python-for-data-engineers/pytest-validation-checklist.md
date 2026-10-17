# pytest Checklist for Data Validation Functions

From Lesson 40.

## What to test for every validation function

- [ ] **The good case** — valid input returns the expected
      "accept" result.
- [ ] **Every real rejection case**, not just one — a function
      checking multiple conditions (e.g. `order_id` present AND
      `amount` positive) needs a separate test per condition it can
      fail on.
- [ ] **Missing/malformed input, not just "wrong" input** — a key
      that's entirely absent from a dict behaves differently than a
      key present with a bad value (`KeyError`/`TypeError` vs. a
      clean rejection). Test both.
- [ ] **`pytest.raises()`** for any function that's supposed to raise
      an exception on bad input, not return a value.

## Why the rejection cases matter more than they look

A validation function tested only on good input can hide a bug in
exactly the path a real pipeline depends on to catch bad data. If
`validate_row()` crashes instead of returning `False` on a malformed
row, and nothing tests that path, the bug stays invisible until it
crashes a real pipeline run — and if that run's error handling is
also weak (see the Error Handling & Retry Reference), the crash may
not even surface clearly then either.

## Naming and structure

```python
# validators.py
def validate_row(row: dict) -> bool:
    ...

# test_validators.py
from validators import validate_row

def test_validate_row_accepts_a_good_row():
    assert validate_row({"order_id": 101, "amount": 42.50}) is True

def test_validate_row_rejects_missing_order_id():
    assert validate_row({"order_id": None, "amount": 42.50}) is False

def test_validate_row_rejects_zero_amount():
    assert validate_row({"order_id": 101, "amount": 0}) is False

def test_validate_row_rejects_missing_amount_key():
    assert validate_row({"order_id": 101}) is False
```

pytest discovers tests by filename (`test_*.py`) and function name
(`test_*`) automatically.

## Running

```bash
pytest test_validators.py -v
```

## Before calling a validation function "tested"

Ask: if someone changed this function tomorrow and accidentally broke
the rejection logic, would any test actually fail? If not, the
rejection path needs a test, not just the happy path.
