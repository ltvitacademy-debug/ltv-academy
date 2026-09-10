# Lesson 48 — Testing Data Pipelines

**Chapter 3 · Production Data Engineering · Lesson 48 of 70**

## What you'll learn

- What "test" actually means in the CI/CD Test stage from Lesson 45
- Four distinct kinds of test, and what each one actually catches
- Why a data pipeline's tests differ from typical application tests
- What this lesson previews for Lesson 49's PySpark-specific deep dive

## Filling in Lesson 45's Test stage

Lesson 45's example pipeline had a `Test` stage running
`pytest tests/`, without saying what those tests actually check.
This lesson fills that in. A data pipeline has four genuinely
different kinds of test worth writing, each catching a different
category of mistake.

## Four kinds of test

```
1. Unit tests         -- does one transformation function do what it claims?
2. Schema tests        -- does the output have the expected columns and types?
3. Row-count/volume    -- did this run produce a plausible number of rows?
4. Regression tests    -- does a KQL query still return the same shape it did before?
```

**Unit tests** (previewed here, covered fully in Lesson 49) check a
single transformation in isolation — a function that computes
`FareAmount` from raw fields, tested with known inputs and expected
outputs. **Schema tests** check that a table's columns and types
match what downstream consumers expect, catching Lesson 39's schema
drift before it reaches production. **Row-count tests** catch a
run that silently processed zero rows, or ten times too many.
**Regression tests** catch a KQL query change that accidentally
altered its output shape — exactly the kind of change Lesson 46
made reviewable as a diff.

## Why data pipeline tests differ from typical application tests

A typical application test checks "does this function return the
right value for this input?" A data pipeline test has to additionally
ask "is this input even representative of what production actually
looks like?" — testing against a handful of hand-picked rows can
pass while completely missing a data quality problem that only shows
up at real scale or with real messiness. This is why Lesson 44's
production-shaped test data matters here specifically: the tests
themselves are only as good as the data they run against.

## A concrete example

```python
def test_fare_amount_never_negative(sample_trip_events):
    result = compute_fare_amount(sample_trip_events)
    assert (result["FareAmount"] >= 0).all()

def test_output_row_count_within_expected_range(pipeline_output):
    assert 1000 <= len(pipeline_output) <= 50000
```

Neither test is complicated. Both catch a real, specific class of
mistake — and both run automatically, every time, as part of
Lesson 45's Test stage, rather than depending on someone remembering
to check by hand.

## Key terms

| Term | Meaning |
|---|---|
| Unit test | Verifies one transformation function in isolation |
| Schema test | Verifies output columns/types match what's expected |
| Row-count / regression test | Catch silent volume problems or an accidentally changed output shape |

## Check yourself

You're ready for Lesson 49 when you can explain, without looking: why
can a data pipeline test pass against hand-picked sample rows while
still missing a real production data quality problem?
