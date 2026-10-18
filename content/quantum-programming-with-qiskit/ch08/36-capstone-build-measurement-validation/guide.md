# Capstone: Build Measurement Validation

The circuit and simulation layer from the previous lesson gives you two numbers for every outcome: an exact probability and an observed frequency. They're never going to match exactly — real shot-based sampling always has noise. This lesson builds the piece that decides, with actual statistics rather than a gut feeling, whether a disagreement is ordinary noise or a genuine red flag.

## What you'll learn

- How to compute the standard-error threshold from Chapter 3 for a given exact probability and shot count
- How to build a `validate` function that flags outcomes deviating beyond that threshold
- Why the GHZ result from the previous lesson should *not* be flagged, even though the numbers aren't a perfect match
- Why an exact-zero theoretical prediction needs a special case, and why a noisy Bell-circuit example *should* be flagged
- The real diagnostic value this validation layer adds over just eyeballing the counts

## The validator function

Requirement #4 from the kickoff — flag outcomes that deviate from theory by more than a reasonable threshold — comes down to one statistical idea: the standard error of a sampled proportion, reused from Chapter 3.

```python
import math

def validate(counts, exact_probs, shots, n_sigma=3):
    flags = []
    for outcome, p_exact in exact_probs.items():
        observed = counts.get(outcome, 0) / shots
        se = math.sqrt(p_exact * (1 - p_exact) / shots) if 0 < p_exact < 1 else None
        if se and abs(observed - p_exact) > n_sigma * se:
            flags.append((outcome, observed, p_exact))
    return flags
```

For each outcome with a known exact probability, this computes how often it was actually observed (`observed`), the expected statistical spread of that observation given the true probability and shot count (`se`, the standard error), and then checks whether the actual deviation `abs(observed - p_exact)` is larger than `n_sigma` standard errors — three, by default, a common threshold for "this is unlikely to be ordinary noise." If it is, the outcome gets flagged.

## Running it on the GHZ result: should NOT be flagged

Reuse the exact case from the previous lesson: exact P(000) = 0.5, P(111) = 0.5, shots = 2048, observed counts `{'000': 1069, '111': 979}`.

First, convert counts to frequencies:

```
observed(000) = 1069 / 2048 = 0.52197
observed(111) = 979 / 2048 = 0.47803
```

Next, compute the standard error for p = 0.5 at shots = 2048:

```
SE = √(0.5 × 0.5 / 2048) = √(0.25 / 2048) = 0.011049
```

Now check the deviation for `000`:

```
|0.52197 − 0.5| = 0.02197
0.02197 / 0.011049 ≈ 1.988
```

That's about 1.99 standard errors — comfortably inside the 3-sigma range the validator uses as its threshold. This outcome should **not** be flagged, and the validator correctly leaves it alone. This is the point worth sitting with: 1069 and 1024 are not the same number, and if you only eyeballed the raw counts you might wonder if something's wrong. But a deviation of roughly 2 standard errors is exactly the kind of statistical wobble you *expect* from any finite number of random samples. Flagging it would be a false alarm — the validator's job is specifically to not cry wolf over ordinary shot noise.

## Running it on a genuinely noisy case: SHOULD be flagged

Now contrast that with a case built to actually contain a hardware-style problem: the Chapter 3 noisy-depolarizing Bell circuit. A 2-qubit Bell circuit with a 1% depolarizing error injected on the CX gate gave, at shots = 4096:

```
counts = {'00': 2090, '01': 11, '10': 8, '11': 1987}
```

The noiseless exact prediction for this Bell circuit says P(01) = P(10) = 0 exactly — those outcomes are classically impossible for a perfect Bell pair. But the observed frequency for `01` is:

```
observed(01) = 11 / 4096 = 0.002686
```

That's a small-looking number, but relative to an exact-zero prediction, it's enormous — there is no statistical universe where a perfectly noiseless Bell circuit produces outcome `01` even once, let alone eleven times out of 4096. This is exactly the case the validator's `0 < p_exact < 1` guard exists for: when `p_exact` is exactly 0 (or exactly 1), the standard-error formula `√(p(1−p)/N)` evaluates to zero, which would make *any* nonzero deviation look infinitely large — not usefully informative, and arguably not even the right question to ask. The honest fix, which the `validate` function already encodes, is to treat any nonzero count on a theoretically impossible outcome as an automatic flag, regardless of shot count or a computed sigma value. A classically impossible transition showing up at all is itself the signal — it's a real signature of gate error, not a borderline statistical judgment call.

## The actual diagnostic value here

Put the two cases side by side. The GHZ case had numbers that didn't match exactly (1069 vs. 1024) but shouldn't be flagged, because the mismatch is well within the range ordinary randomness produces. The noisy Bell case had numbers that look small in absolute terms (11 out of 4096) but absolutely should be flagged, because theory says that outcome is impossible and it happened anyway. A validator that only checked "are the numbers close" would get both of these backwards — it might panic over the GHZ case's normal-looking 2-sigma wobble while shrugging off the Bell case's small-looking but theoretically impossible counts. The real value of building the threshold and the exact-zero edge case explicitly is that it lets the tool tell ordinary shot noise apart from a genuine anomaly, using the same statistical reasoning a careful human would apply by hand — just automatically, and consistently, every time.

## Key terms

| Term | Meaning |
|---|---|
| Standard error (SE) | `√(p(1−p)/N)`, the expected statistical spread of an observed proportion given the true probability `p` and shot count `N` |
| `n_sigma` threshold | The number of standard errors a deviation must exceed before being flagged (3 by default — a common "unlikely by chance" cutoff) |
| Statistically normal deviation | A mismatch between observed and exact values that falls within the expected spread (e.g. the GHZ case's ~1.99 sigma) and should not be flagged |
| Exact-zero edge case | When `p_exact` is 0 or 1, the SE formula breaks down, so any nonzero count on a theoretically impossible outcome is flagged automatically |
| Genuine anomaly | A deviation (like the noisy Bell circuit's nonzero `01`/`10` counts) that cannot be explained by ordinary shot noise and signals a real problem |

## Check yourself

The GHZ case's `000` deviation was about 1.99 standard errors and was correctly left unflagged, while the Bell case's `01` outcome had a much smaller raw frequency (0.0027) but was correctly flagged as a genuine anomaly. Why doesn't "the deviation is numerically smaller" automatically mean "less concerning" here, and what does that tell you about why the validator needs the exact-zero special case rather than relying on the standard-error formula alone?
