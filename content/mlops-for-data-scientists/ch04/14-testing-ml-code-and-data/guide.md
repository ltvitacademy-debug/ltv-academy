# Testing ML Code & Data

Chapter 3 ended with a smoke test that you run by hand after a deployment. Chapter 4 is about automating checks like that, so they run on every change without anyone remembering to do it. We start with the tests themselves. Software tests ask "does this code do what I intended?" Machine learning adds two more questions: "is this data what I expected?" and "does this model behave sensibly?" A model can run without a single error and still be wrong, so the point of ML testing is to turn silent failures into loud ones. You will not re-learn Git or Python from scratch; we apply `pytest` to the churn project from earlier lessons (`churn-service/`, with `train.py`, `churn.csv`, and `models/churn_model.joblib`).

## What you'll learn

- The three layers of ML testing: data, code, and model behavior
- How to write fast pytest tests for each layer, with real results
- How a broken data export shows up as failing tests
- What tests can and cannot promise

## Set up pytest once

Install it with `pip install pytest` (we used pytest 8.4). Two small files keep the suite tidy. A `conftest.py` holds **fixtures**, reusable setup that pytest hands to any test that names it. A `pytest.ini` tells pytest where the tests live:

```
# pytest.ini
[pytest]
testpaths = tests
pythonpath = .
```

```python
# conftest.py
import pytest, pandas as pd, joblib

@pytest.fixture(scope="session")
def data():
    return pd.read_csv("churn.csv")

@pytest.fixture(scope="session")
def model():
    return joblib.load("models/churn_model.joblib")
```

Without `testpaths`, pytest also collected a stray `smoke_test.py` script in the project root and crashed; configuring the path avoids that.

## Layer 1: Data tests

Data breaks far more often than code. A column is renamed upstream, a currency changes units, a new category appears. Data tests write your assumptions down. These read the illustrative 4,000-row churn dataset:

```python
EXPECTED_COLUMNS = ["tenure_months", "monthly_charge", "contract",
                    "support_tickets", "autopay", "churned"]

def test_schema(data):
    assert list(data.columns) == EXPECTED_COLUMNS

def test_no_missing_values(data):
    assert data.isna().sum().sum() == 0

def test_charges_positive(data):
    assert (data["monthly_charge"] > 0).all()

def test_categories_are_known(data):
    assert set(data["contract"]) <= {"month-to-month", "one-year",
                                     "two-year"}
```

The full file also checks tenure range, non-negative tickets, and a plausible churn rate (between 15% and 45%). Keep one assertion idea per test: separate tests report every failure at once instead of hiding the second problem behind the first. Libraries such as Great Expectations and pandera offer richer data validation; check their current documentation if plain asserts stop being enough.

## Layer 2: Code tests

Feature functions, cleaning steps, and training scripts are ordinary code and deserve ordinary unit tests. For a pipeline, the most valuable one is often a **training smoke test**: train on a small sample and confirm the whole path runs and beats chance.

```python
from train import make_data

def test_training_runs_on_a_small_sample():
    df = make_data(n=600, seed=1)
    X, y = df.drop(columns="churned"), df["churned"]
    pipe.fit(X, y)   # the same pipeline as training
    assert roc_auc_score(y, pipe.predict_proba(X)[:, 1]) > 0.6
```

It is deliberately weak: the threshold only proves the code is not broken, and the tiny sample keeps it under a second. A fixed seed keeps it from being flaky. (In the project file, `pipe` is built from the same `ColumnTransformer` and `LogisticRegression` as `train.py`.)

## Layer 3: Model behavior tests

You cannot assert an exact prediction for every input, but you can assert **properties** that any sensible churn model must satisfy:

```python
def score(model, **changes):
    row = pd.DataFrame([{**CUSTOMER, **changes}])
    return float(model.predict_proba(row)[0, 1])

def test_more_tickets_never_lowers_risk(model):
    assert score(model, support_tickets=5) > \
           score(model, support_tickets=0)

def test_unseen_category_does_not_crash(model):
    assert 0 <= score(model, contract="weekly") <= 1

def test_golden_customer(model):
    assert abs(score(model, **GOLDEN) - 0.909) < 0.005
```

These are *directional*, *robustness*, and *golden* tests. The golden test repeats the smoke test from Lesson 13, with a tolerance rather than exact float equality.

## Run them

`python -m pytest -q` ran all 13 tests in about a second:

```
.............                                                            [100%]
13 passed in 1.17s
```

Then we simulated a bad upstream export by editing three cells: a charge of -5, a contract labelled "annual", and a missing tenure. Five tests failed and eight passed:

```
FAILED tests/test_data.py::test_no_missing_values - assert 1 == 0
FAILED tests/test_data.py::test_tenure_in_range - assert False
FAILED tests/test_data.py::test_charges_positive - assert False
FAILED tests/test_data.py::test_categories_are_known - AssertionError
FAILED tests/test_model.py::test_probabilities_are_valid - ValueError: Input ...
5 failed, 8 passed in 1.76s
```

Each problem got its own named failure, and the missing tenure even broke a model test, because the pipeline cannot score a NaN. Without these tests, the first sign might have been a wrong number in a customer's inbox. Everything here ran locally; nothing was run in a hosted CI system.

## What tests cannot do

Passing tests do **not** prove the model is good. They prove it is intact, sane, and consistent. Whether a *new* model is better than the current one is a different question, covered in Lesson 16. Keep the suite fast (seconds, not minutes) so people run it, and keep expensive tests, such as full retraining, in a separate, less frequent run.

## Recap

Test the data (schema, ranges, categories), the code (a small training smoke test), and the model (directional, robustness, golden). One assertion idea per test, fixed seeds, tolerances for floats, fast runs. Next, we wire these tests into GitHub Actions so they run on every push.
