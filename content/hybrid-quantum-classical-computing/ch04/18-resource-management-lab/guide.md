# Resource-Management Lab

This lab puts a real monthly budget through the full set of cost levers from this chapter — device choice, program-set batching, and shot-budget sizing — and checks whether a proposed workload actually fits inside it.

## What you'll learn

- How to allocate a monthly quantum compute budget across environments (dev/staging/prod)
- How to compute how many development tasks a given budget allows, with real pricing
- How to decide whether a proposed production workload fits a remaining budget, and what to cut if it doesn't
- How to apply program-set batching and shot-budget sizing together to fit a workload into a tighter budget
- How to write a budget justification a non-technical stakeholder can actually evaluate

## Allocating a $5,000 monthly budget

A reasonable split, weighting production work heaviest since it's the revenue/value-generating usage, with staging second (integration testing against real hardware before prod) and dev smallest (most dev work runs on free simulators per Lesson 1-2's development-against-simulators principle):

```
Total monthly budget:           $5,000.00
Dev (15%):                         $750.00
Staging (25%):                   $1,250.00
Prod (60%):                      $3,000.00
```

## How many dev tasks does $750 actually buy?

Assume dev work occasionally needs real-hardware confirmation runs on IonQ Aria ($0.30/task + $0.03/shot) at 1,000 shots/task:

```
cost per task = $0.30 + 1,000 x $0.03 = $30.30
dev tasks affordable = floor($750.00 / $30.30) = 24 tasks
```

24 real-hardware confirmation tasks per month for development is a concrete, defensible number you can hand to a team lead — "we budget roughly 1 confirmation run per working day" is a much more useful statement than "we have $750 for dev."

## Does a proposed production workload fit the $3,000 prod budget?

Suppose the production workload is a daily VQE re-calibration job: 150 iterations, 8 parameters, 17 evaluations/iteration (Lesson 2), batched into one program-set submission per iteration (Lesson 11), at 2,000 shots/evaluation on Rigetti Ankaa-3 ($0.30/task + $0.0009/shot), run once per day, 22 business days/month:

```
Per-iteration cost (batched, 1 task, 17x2,000=34,000 shots):
  = $0.30 + 34,000 x $0.0009 = $0.30 + $30.60 = $30.90

Per-day cost (150 iterations): 150 x $30.90 = $4,635.00
Per-month cost (22 days):      22 x $4,635.00 = $101,970.00
```

**This workload does not fit a $3,000/month prod budget — it exceeds it by roughly 34x.** This is exactly the kind of mismatch the resource-management discipline in this chapter exists to catch *before* a production rollout, not after the first invoice.

## Fitting the workload to the budget: what actually has to change

Given the 34x overshoot, the levers available (and their individual effects, computed the same way as the rest of this chapter): reducing shots from 2,000 to 500 per evaluation cuts the per-shot cost component by 4x (since cost scales linearly with shots, not with the square-root precision relationship from Lesson 17 — the cost reduction is proportional, the precision loss is not); reducing run frequency from daily to weekly cuts the monthly total by roughly 22/4.4 ≈ 5x; and reducing the iteration count via a tighter convergence tolerance (Lesson 2) might realistically cut iterations from 150 to 60 (as in Lesson 2's convergence example), a 2.5x reduction. Combining shots-reduction (4x) and weekly-instead-of-daily (5x) alone already brings the estimate down by 20x — close to, but probably still short of, fitting the original $3,000 target, meaning the realistic next step is re-scoping the re-calibration frequency or precision requirement with the actual stakeholder, backed by this arithmetic, rather than silently overspending or silently degrading quality to force a fit.

## Writing a budget justification a stakeholder can evaluate

A good budget justification states the workload's shape (iterations, shots, frequency), the backend and its pricing, the resulting cost with the arithmetic shown, and — if over budget — the specific tradeoff options available with their respective cost impacts, exactly as worked out above. A stakeholder without quantum expertise can still evaluate "should we run this weekly instead of daily, saving 5x, or accept lower precision, saving 4x" — they cannot evaluate an unexplained number like "$101,970/month, trust me."

## Key terms

| Term | Meaning |
|---|---|
| Budget allocation | Splitting a total compute budget across dev/staging/prod based on each environment's actual usage pattern |
| Budget overshoot | The amount (often expressed as a multiple) by which a proposed workload's real cost exceeds its allocated budget |
| Cost lever | A specific, quantifiable adjustment (shots, frequency, iteration count) available to bring a workload's cost in line with budget |
| Proportional vs. square-root cost effect | Shot-count reduction cuts cost proportionally but precision only by the square root, an asymmetry worth exploiting under budget pressure |
| Stakeholder-evaluable justification | A budget write-up that shows the arithmetic and named tradeoffs, so a non-specialist can judge the options themselves |

## Check yourself

Using the production workload above (150 iterations, 17 evals/iteration, originally 2,000 shots/eval, daily, 22 days/month), recompute the monthly cost if shots are reduced to 500/eval AND the job runs weekly (4.4 times/month) instead of daily. Does this combination fit the $3,000/month prod budget? Show your arithmetic.
