# Variance & Standard Deviation in Measurement

Lesson 31 covered expectation value — the average outcome of a quantum measurement. This lesson covers the natural follow-up question: how *spread out* are the actual outcomes around that average? Variance and standard deviation quantify that spread, and they're what tell you how many shots you actually need to trust an expectation-value estimate.

## What you'll learn

- The definition of variance for a probability distribution
- Standard deviation as the "typical distance from the mean"
- Computing variance for a real qubit-measurement example
- Why variance determines how many shots you need to estimate an expectation value reliably

## Variance: how far outcomes spread from the mean

**Variance** measures the average squared distance between a random variable's outcomes and its expectation value: `Var[X] = Σ (x - E[X])² · P(x)`. Squaring matters here — it makes every deviation positive (so distances in opposite directions don't cancel out) and penalizes large deviations more heavily than small ones.

Using lesson 31's example — a qubit with `P(0) = 0.64`, `P(1) = 0.36`, outcomes `+1`/`-1`, and `E[Z] = 0.28`:

```python
p0, p1 = 0.64, 0.36
mean_z = 0.28

var_z = p0 * (1 - mean_z)**2 + p1 * (-1 - mean_z)**2
print(f"Var[Z] = {var_z}")

std_z = var_z ** 0.5
print(f"StdDev[Z] = {std_z}")
```

```
Var[Z] = 0.9216
StdDev[Z] = 0.96
```

## Standard deviation: back to the original units

**Standard deviation** is simply the square root of variance — it undoes variance's squaring step, converting the number back into the same units as the original outcomes, which makes it directly interpretable as "typical distance from the mean." A standard deviation of `0.96`, for a variable whose values are `+1` and `-1`, is telling you honestly: the two possible outcomes are nearly as far from the mean as they could possibly be — which makes sense, since `P(0)=0.64` and `P(1)=0.36` aren't that far from a 50/50 split, so individual measurements genuinely swing between both outcomes a lot, even though the average leans toward `+1`.

## Why variance determines how many shots you need

If you're estimating an expectation value by averaging many repeated measurements, the uncertainty in your *estimate* (not a single measurement) shrinks as you take more shots — specifically, the standard deviation of your averaged estimate scales as `σ / √N`, where `σ` is the single-measurement standard deviation and `N` is the number of shots. This means a measurement with a higher variance (more spread-out, less certain individual outcomes) genuinely requires more shots to pin down its expectation value to the same precision as a lower-variance measurement. This is a real, practical planning number when running quantum algorithms: knowing the expected variance tells you roughly how many shots to budget for a target precision, not just "run it a few times and hope."

## Key terms

| Term | Meaning |
|---|---|
| Variance | The average squared distance between a random variable's outcomes and its expectation value |
| Standard deviation | The square root of variance, expressed in the same units as the original outcomes |
| Standard error of the mean | How the uncertainty in an *averaged* estimate shrinks as σ/√N with more shots N |

## Check yourself

A qubit has P(0) = 0.5 and P(1) = 0.5 (maximal uncertainty). Compute E[Z] and Var[Z] for this case, and explain why the variance here should be the maximum possible value for any single-qubit Z measurement.
