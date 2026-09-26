# Testing ML Code & Data

Chapter 3 ended with a smoke test you run by hand after a deployment. Chapter 4 is about automating that kind of check so it happens on every change. We start with the tests themselves. Software tests ask "does this code do what I intended?" Machine learning adds two more questions: "is this data what I expected?" and "does this model behave sensibly?" A model can run without a single error and still be wrong, so the point of ML testing is to turn silent failures into loud ones. You will not re-learn Git or Python testing from scratch; we apply `pytest` to the churn project.

## What you'll learn

- The three layers of ML testing: data, code, and model behavior
- How to write fast pytest tests for each layer, with real results
- How a broken data export shows up as failing tests
- What tests can and cannot promise

## Layer 1: Data tests

Data breaks far more often than code. A column is renamed upstream, a currency changes units, a new category appears. Data tests encode your assumptions about the table. These tests read the illustrative 4,000-row churn dataset through a pytest **fixture** (a reusable setup function in `conftest.py`):

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

def test_churn_rate_is_plausible(data):
    assert 0.15 < data["churned"].mean() < 0.45
```

Keep one assertion idea per test. In our first draft, a single range test checked tenure and charges together; when tenure failed, the charge check never ran, hiding a second problem. Separate tests report every failure at once. Dedicated libraries such as Great Expectations and pandera exist for richer data validation; check their current documentation if your project outgrows plain asserts.

## Layer 2: Code tests

Feature functions, cleaning steps, and training scripts are ordinary code and deserve ordinary unit tests. For a pipeline made of scikit-learn parts, the most valuable code test is often a **training smoke test**: train on a small sample and confirm the whole path runs and beats chance.

```python
from train import make_data

def test_training_runs_on_a_small_sample():
    df = make_data(n=600, seed=1)
    X, y = df.drop(columns="churned"), df["churned"]
    pipe.fit(X, y)          # pipe: the same pipeline as training
    assert roc_auc_score(y, pipe.predict_proba(X)[:, 1]) > 0.6
```

It is deliberately weak: the threshold only proves the code is not broken, and the tiny sample keeps it under a second. Fix random seeds so the test is not flaky.

## Layer 3: Model behavior tests

You cannot assert an exact prediction for every input, but you can assert **properties** that any sensible churn model must satisfy:

```python
def score(model, **changes):
    row = pd.DataFrame([{**CUSTOMER, **changes}])
    return float(model.predict_proba(row)[0, 1])

def test_more_support_tickets_never_lowers_risk(model):
    assert score(model, support_tickets=5) > score(model, support_tickets=0)

def test_longer_contract_lowers_risk(model):
    assert score(model, contract="two-year") < score(model)

def test_unseen_category_does_not_crash(model):
    assert 0 <= score(model, contract="weekly") <= 1
```

These are *directional* and *robustness* tests. Add a **golden test**, the same idea as the smoke test in Lesson 13: a fixed customer must still score 0.909 within a tolerance of 0.005. Use a tolerance, never exact float equality.

## Run them

`python -m pytest tests -q` ran 13 tests in about a second:

```
.............                                                            [100%]
13 passed in 1.01s
```

Then we simulated a bad upstream export: one negative charge, one new contract label ("annual"), and one missing tenure. The result:

```
FAILED tests/test_data.py::test_no_missing_values - assert 1 == 0
FAILED tests/test_data.py::test_tenure_in_range - assert False
FAILED tests/test_data.py::test_charges_positive - assert False
FAILED tests/test_data.py::test_categories_are_known - AssertionError
FAILED tests/test_model.py::test_probabilities_are_valid - ValueError: Input ...
5 failed, 7 passed in 1.01s
```

Each problem got its own named failure, and the missing value even broke a model test, because the pipeline cannot score a NaN tenure. Without these tests, the first sign might have been a wrong number in a customer's inbox. (We named the folder `tests` and ran it explicitly; a stray script called `smoke_test.py` in the project root was otherwise collected by pytest, which is why real projects configure their test paths.)

## What tests cannot do

Passing tests do **not** prove the model is good. They prove it is intact, sane, and consistent. Whether a *new* model is better than the current one is a different check, covered in Lesson 16. Keep the suite fast (seconds, not minutes) so people actually run it, and keep any expensive tests, such as full retraining, separate so they run less often.

## Recap

Test the data (schema, ranges, categories), the code (a small training smoke test), and the model (directional, robustness, and golden checks). One assertion idea per test, fixed seeds, tolerances for floats, and fast runs. Next, we wire these tests into GitHub Actions so they run on every push.
