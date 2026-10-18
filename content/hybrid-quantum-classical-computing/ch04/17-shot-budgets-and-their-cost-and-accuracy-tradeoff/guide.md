# Shot Budgets & Their Cost-vs-Accuracy Tradeoff

Shot count is the one knob in a hybrid workflow that directly trades real money for statistical precision, on a well-defined mathematical curve. This lesson works that curve out in actual numbers so "how many shots should I use?" stops being a guess.

## What you'll learn

- The precise mathematical relationship between shot count and measurement precision
- Why doubling precision costs far more than doubling shots
- How to compute the cost of a given precision target on real provider pricing
- How to set a shot budget based on what precision your use case actually needs
- Why running more shots than your use case needs is pure wasted spend, not "extra safety"

## The shot-count-to-precision relationship

A measured expectation value's standard error scales as `1/sqrt(shots)` — precision improves with the square root of shot count, not linearly:

```
shots    relative standard error
  500               0.0447
1,000               0.0316
2,000               0.0224
4,000               0.0158
8,000               0.0112
```

Going from 1,000 to 4,000 shots (4x the shots) cuts standard error from 0.0316 to 0.0158 — exactly half. **To halve your measurement error, you need 4x the shots. To get a 10x improvement in precision, you need 100x the shots.** This square-root relationship is the single most important number in this lesson, because it means precision gets expensive fast, and that cost is entirely avoidable if your use case doesn't actually need that much precision.

## Pricing out a precision target

Using Rigetti Ankaa-3 pricing ($0.30/task + $0.0009/shot) across 200 tasks:

```
At 1,000 shots/task: 200 x $0.30 + 200,000 x $0.0009 = $60 + $180 = $240.00
At 4,000 shots/task: 200 x $0.30 + 800,000 x $0.0009 = $60 + $720 = $780.00

Cost increase: 3.25x, for exactly 2x the precision (half the standard error)
```

Notice the cost increase (3.25x) isn't exactly 4x, because the flat per-task fee doesn't scale with shots — but the dominant per-shot cost does scale 4x, which is why the increase is close to, but not exactly, proportional to the shot multiplier. For a job dominated by per-shot cost (as most real jobs are, since the per-task fee is small relative to shot cost at any reasonable shot count), the practical rule of thumb holds: **roughly 4x the cost for roughly 2x the precision.**

## Setting a shot budget from your actual precision requirement, not a round number

"We'll use 10,000 shots because that sounds thorough" is not a shot-budget decision — it's a guess with no connection to what the application actually needs. A real shot-budget decision starts from the use case: if a downstream decision only changes when an expectation value crosses a threshold by more than, say, 0.05, there's no reason to pay for a standard error of 0.01 (which would need roughly `(0.0316/0.01)^2 x 1,000 ≈ 10,000` shots) when a standard error of 0.02 (needing only about `(0.0316/0.02)^2 x 1,000 ≈ 2,500` shots) is already well within the precision the decision requires, at a quarter of the shot cost.

## Why "extra shots for safety" is a cost decision in disguise

It's tempting to pad a shot count "just to be safe," but given the pricing above, that instinct has a direct, computable dollar cost — padding from 2,500 to 10,000 shots across a 200-task job on Ankaa-3 costs an extra `(10,000-2,500) x 200 x $0.0009 = $1,350` for precision the use case's own threshold doesn't require. The right question isn't "is more precision better" (it always is, in isolation) — it's "does the next increment of precision change any decision this result feeds into," which is a question about the application, not about statistics.

## Key terms

| Term | Meaning |
|---|---|
| Standard error | The statistical uncertainty of a measured expectation value, scaling as 1/sqrt(shots) |
| Square-root precision scaling | The relationship meaning 4x the shots are needed to halve standard error, 100x to reduce it 10-fold |
| Precision target | The specific standard error needed for a use case's downstream decision, used to size a shot budget correctly |
| Shot padding | Adding shots beyond what a use case's precision requirement calls for, with a direct, computable cost |
| Decision-relevant precision | The level of measurement precision actually required to distinguish outcomes that matter for a downstream decision |

## Check yourself

A use case needs a standard error of 0.015 or better. Using the 1/sqrt(shots) relationship and the fact that 1,000 shots gives a standard error of 0.0316, compute the minimum number of shots needed to meet this target, then compute the total cost for a 100-task job at that shot count on IonQ Harmony ($0.30/task + $0.01/shot).
