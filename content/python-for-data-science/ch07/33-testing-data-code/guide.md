# Testing Data Code

Every data scientist has shipped a number that turned out to be wrong. Usually it wasn't a dramatic crash. A join quietly duplicated rows, a filter dropped the wrong category, or a "small tweak" to a cleaning function changed a total nobody re-checked. Tests are how you catch those mistakes before your stakeholders do.

The good news: you don't need a heavy framework or a software-engineering degree. A test is just a small function that checks one behavior and fails loudly when it's wrong.

## What you'll learn

- What a test is and what makes a good one for data code
- How to write tests with plain `assert` statements
- How to compare whole DataFrames with `pandas.testing`
- The difference between testing your code and checking your data
- Which cases are worth testing first

## Anatomy of a test

A test has three parts: **arrange** some small input, **act** by calling your function, and **assert** the result is what you expect. Here are tests for the functions we built in the last lesson. The input is a few hand-made rows so you can verify the expected answer in your head.

```python
import pandas as pd
from orders_pipeline.cleaning import add_revenue, standardize_region


def test_add_revenue_multiplies_quantity_and_price():
    df = pd.DataFrame({"quantity": [2, 3], "unit_price": [5.0, 4.0]})
    result = add_revenue(df)
    assert result["revenue"].tolist() == [10.0, 12.0]


def test_add_revenue_does_not_change_input():
    df = pd.DataFrame({"quantity": [2], "unit_price": [5.0]})
    add_revenue(df)
    assert "revenue" not in df.columns


def test_standardize_region_trims_and_title_cases():
    df = pd.DataFrame({"region": [" north", "SOUTH "]})
    result = standardize_region(df)
    assert result["region"].tolist() == ["North", "South"]
```

Notice the names: each says what behavior is expected. When a test fails, the name should tell you what broke. Save these in `tests/test_cleaning.py` and a test runner such as **pytest** will discover every function whose name starts with `test_` and report which passed and failed. Install it with `pip install pytest` and run `pytest` from the project folder. We ran these five tests against the module from the last lesson, and all passed.

## How a test catches a real bug

Suppose someone "refactors" `add_revenue` and accidentally types `+` instead of `*`:

```python
out["revenue"] = out["quantity"] + out["unit_price"]
```

On our sample rows this produces `[7.0, 7.0]` instead of `[10.0, 12.0]`, so the assertion fails immediately. Without the test, the wrong revenue would flow silently into every chart downstream.

## Comparing whole DataFrames

When the result is a table, `pandas.testing.assert_frame_equal` compares columns, order, values, and dtypes, and raises an error describing the difference if they don't match:

```python
from pandas.testing import assert_frame_equal
from orders_pipeline.cleaning import clean_orders


def test_clean_orders_full_output():
    raw = pd.DataFrame({
        "order_id": [1], "region": [" east"],
        "quantity": [2], "unit_price": [5.0],
    })
    expected = pd.DataFrame({
        "order_id": [1], "region": ["East"],
        "quantity": [2], "unit_price": [5.0],
        "revenue": [10.0],
    })
    assert_frame_equal(clean_orders(raw), expected)
```

## Testing code versus checking data

Tests check **your code** using small, made-up inputs you control. **Data checks** examine the **real data** each time it arrives. Both matter, and they use similar tools. After cleaning the real file, you might assert:

```python
clean = clean_orders(pd.read_csv("data/orders_raw.csv"))
assert clean["order_id"].is_unique
assert (clean["revenue"] >= 0).all()
```

Both passed on our sample. In production, a failing data check stops the pipeline before bad numbers spread.

## What to test first

You can't test everything, so prioritize:

- **Business rules:** revenue, discounts, status logic. Wrong numbers here cost the most.
- **Edge cases:** empty input, missing values, duplicates. For example, our `standardize_region` leaves a missing region missing rather than crashing (we checked: `[" north", None]` becomes `['North', None]`).
- **Bugs you've already fixed.** Add a test so they never return.

## Recap

- A test arranges input, acts, and asserts, with a name that states the expected behavior.
- Plain `assert` plus `pandas.testing.assert_frame_equal` covers most data-code tests.
- Tests protect your functions; data checks protect against bad incoming data.
- Start with business rules, edge cases, and past bugs.

Next up: reproducibility, making sure your results come out the same every time.
