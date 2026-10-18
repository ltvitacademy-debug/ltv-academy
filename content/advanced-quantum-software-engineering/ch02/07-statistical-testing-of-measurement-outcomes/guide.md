# Statistical Testing of Measurement Outcomes

This is the lesson Lesson 5 set up: how do you actually write a test that checks "is this measurement result consistent with the expected distribution," with a calculated, justified pass/fail threshold instead of a guess?

## What you'll learn

- How to compute a z-score for a single-qubit (binary) measurement result and interpret it against a chosen confidence level
- A worked, verified example: is 480/1024 "0" outcomes consistent with an expected 50/50 split?
- How to extend this to a chi-square test for multi-outcome distributions (e.g. a Bell state's four possible outcomes)
- How shot count changes the tolerance, and how to choose a shot count for a given confidence requirement
- A reusable `assert_measurement_matches_distribution()` helper pattern

## The z-test for a binary outcome

For a circuit expected to produce outcome "0" with probability `p0` (e.g. `p0 = 0.5` for a fair Hadamard), the standard error of the sample proportion after `n` shots is:

SE = sqrt(p0 × (1 - p0) / n)

and the z-score for an observed count `k` (so observed proportion `phat = k/n`) is:

z = (phat - p0) / SE

A two-sided z-score with `|z| < 1.96` corresponds to roughly a 95% confidence interval; `|z| < 2.58` corresponds to roughly 99%.

## Worked example 1: a result that should fail

Suppose a Hadamard-gate circuit run for 1024 shots returns 480 counts of "0" (so 544 of "1"). Is this consistent with `p0 = 0.5`?

```
phat = 480 / 1024 = 0.46875
SE   = sqrt(0.5 * 0.5 / 1024) = 0.015625
z    = (0.46875 - 0.5) / 0.015625 = -2.0
```

These exact numbers were computed and verified with `node -e` arithmetic, not estimated. At the 95% confidence level (`|z| < 1.96`), `|z| = 2.0` **fails** — this result would be flagged as inconsistent with a fair coin. But at the 99% confidence level (`|z| < 2.58`), the same `|z| = 2.0` **passes**. This is exactly why the chosen confidence level has to be stated explicitly in the test, as Lesson 5 argued — the identical data gives a different verdict depending on which threshold you commit to in advance.

## Worked example 2: a result that should pass

Now suppose the same circuit returns 540 counts of "0" out of 1024 shots:

```
phat = 540 / 1024 = 0.52734375
SE   = 0.015625  (same n, same p0)
z    = (0.52734375 - 0.5) / 0.015625 = 1.75
```

At 95% confidence (`|z| < 1.96`), `|z| = 1.75` **passes** — this spread is well within normal sampling variance for a fair coin at this shot count.

## Implementing it as a reusable test helper

```python
import math

def z_score_for_binary_outcome(observed_count: int, n_shots: int, expected_p: float) -> float:
    phat = observed_count / n_shots
    se = math.sqrt(expected_p * (1 - expected_p) / n_shots)
    return (phat - expected_p) / se

def assert_consistent_with_expected_p(observed_count, n_shots, expected_p, confidence_z=1.96):
    z = z_score_for_binary_outcome(observed_count, n_shots, expected_p)
    assert abs(z) < confidence_z, (
        f"z={z:.3f} exceeds threshold {confidence_z} "
        f"(observed {observed_count}/{n_shots}, expected p={expected_p})"
    )

def test_hadamard_produces_fair_outcomes():
    counts = run_circuit(build_hadamard_circuit(), shots=1024, seed=7)
    assert_consistent_with_expected_p(counts.get('0', 0), 1024, expected_p=0.5, confidence_z=2.58)
```

Using `confidence_z=2.58` (99%) here deliberately, rather than the tighter 95%, is a documented choice — Lesson 5 and Lesson 4 (documentation) both argue that this choice needs to be explicit and justified next to the test, not left as an unstated default.

## Extending to multiple outcomes: chi-square

A Bell state has two expected outcomes (`00`, `11`) rather than one binary split, which calls for a chi-square test comparing observed counts to expected counts across all categories: `chi2 = sum((observed_i - expected_i)^2 / expected_i)`. For a Bell state run 2000 shots with `counts = {'00': 1013, '11': 987, '01': 0, '10': 0}` against expected `{'00': 1000, '11': 1000}`:

```
chi2 = (1013-1000)^2/1000 + (987-1000)^2/1000 = 0.169 + 0.169 = 0.338
```

(Verified by direct computation.) With 1 degree of freedom, a chi-square critical value of 6.63 corresponds to 99% confidence — `0.338` is far below that, so this result passes comfortably.

## Choosing a shot count

Standard error shrinks as `1/sqrt(n)`, so quadrupling shots roughly halves your tolerance window. If a test needs to reliably catch a circuit that's biased by 5 percentage points, more shots make that detectable; if you only have a budget for 100 shots, don't expect to reliably distinguish a 2-percentage-point bias from noise — that's a resource-estimation question Chapter 5 returns to.

## Key terms

| Term | Meaning |
|---|---|
| Z-score (for a proportion) | `(phat - p0) / SE`, measuring how many standard errors an observed proportion is from the expected value |
| Standard error (SE) | `sqrt(p0(1-p0)/n)` for a binary proportion; shrinks as shot count `n` increases |
| Chi-square test | A statistical test comparing observed vs. expected counts across multiple categories, used for outcomes with more than two possibilities |
| Confidence level | The pre-chosen threshold (e.g. 95%, 99%) a z-score or chi-square statistic is compared against to decide pass/fail |

## Check yourself

A circuit run for 1024 shots returns 512/512 exactly — a perfect split. Compute the z-score (you can do this by hand: phat=0.5 exactly equals p0=0.5) and explain why this "perfect" result passing trivially is not, by itself, stronger evidence of correctness than the 540/1024 result passing in Worked Example 2.
