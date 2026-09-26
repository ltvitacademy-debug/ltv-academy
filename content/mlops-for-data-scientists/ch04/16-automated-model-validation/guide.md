# Automated Model Validation

Lesson 14's tests ask whether the model is intact, and Lesson 15 runs them on every pull request. Neither asks the question a retrained model really raises: **is this candidate good enough to replace the one in production?** A model can pass every unit test and still be worse than what customers are using today. This lesson turns that judgment into a **validation gate**: a script that scores a candidate against production on a fixed holdout, applies written-down rules, and exits with a failure code when the candidate does not qualify. Everything here is plain Python, run locally on the churn project.

## What you'll learn

- Why a validation gate needs more than one rule
- How to compare a candidate to the production model on the same holdout
- How to make the script an automatic pass/fail check
- How noisy a small holdout is, and why thresholds are a policy choice

## The rules, written as constants

Before any code, decide the rules and record them where reviewers can see them:

```python
MIN_AUC = 0.75          # absolute floor on the holdout
MAX_DROP = 0.01         # most AUC we tolerate losing vs production
MIN_SLICE_AUC = 0.70    # floor for every contract type
MAX_CALIB_GAP = 0.03    # mean predicted risk vs actual churn rate
```

Each rule guards a different failure. The floor stops a broken model. The production comparison stops a model that is acceptable in isolation but worse than the one it replaces. The slice check stops a model that is fine on average but weak for one customer group. The calibration check stops scores that rank well but sit systematically too high or too low, which breaks any business rule built on the probability itself.

## The gate

The holdout is `test.csv`, 800 customers that neither model trained on. Keep it fixed: the two models must be judged on identical rows.

```python
def validate(candidate, production, holdout):
    y = holdout["churned"].to_numpy()
    p_new = scores(candidate, holdout)
    p_old = scores(production, holdout)
    auc_new, auc_old = roc_auc_score(y, p_new), roc_auc_score(y, p_old)

    checks = {
        "min_auc": (auc_new >= MIN_AUC, f"{auc_new:.3f} >= {MIN_AUC}"),
        "vs_production": (auc_new >= auc_old - MAX_DROP,
                          f"{auc_new:.3f} vs {auc_old:.3f}"),
        "calibration": (abs(p_new.mean() - y.mean()) <= MAX_CALIB_GAP,
                        f"mean score {p_new.mean():.3f}, "
                        f"actual rate {y.mean():.3f}"),
    }
    for name, part in holdout.groupby("contract"):
        s = roc_auc_score(part["churned"], scores(candidate, part))
        checks[f"slice:{name}"] = (s >= MIN_SLICE_AUC, f"{s:.3f}")
    return {"passed": all(ok for ok, _ in checks.values()),
            "checks": checks}
```

The command-line wrapper prints every check, writes `validation_report.json`, and finishes with `sys.exit(0 if passed else 1)`. A non-zero exit code is what makes a CI step fail, so in a workflow the gate is one more step:

```yaml
- name: Validate candidate against production
  run: python validate.py candidate.joblib production.joblib test.csv
```

Where `production.joblib` comes from (a model registry, a storage bucket) is the subject of Lesson 17. This YAML was not run on GitHub.

## Three candidates, run for real

The production model scores AUC 0.802 on the holdout. We built candidates by retraining on a fresh 4,000-row synthetic batch.

**Candidate A** used the same recipe:

```
PASS  min_auc               0.801 >= 0.75
PASS  vs_production         0.801 vs 0.802
PASS  calibration           mean score 0.265, actual rate 0.271
PASS  slice:month-to-month  0.774
PASS  slice:one-year        0.761
PASS  slice:two-year        0.803
RESULT: candidate approved          (exit code 0)
```

**Candidate B** was a simulated "cleanup" that dropped the contract column:

```
PASS  min_auc               0.752 >= 0.75
FAIL  vs_production         0.752 vs 0.802
...
RESULT: candidate rejected          (exit code 1)
```

Notice B scraped past the absolute floor, by 0.002. Only the comparison with production caught it. That is why a gate uses several rules.

**Candidate C** used the stronger regularization from Lesson 15 (`C=0.01`), scoring 0.798. The gate **approved** it, because a 0.004 drop is inside the 0.01 tolerance. Whether that is acceptable is a business decision, not a statistical fact. One more detail: Lesson 14's golden-customer test pins one specific model. The golden customer scores 0.909 under production, 0.899 under A, and 0.808 under C, so even the approved retrain would trip that test. When you deliberately approve a new model, updating the recorded golden value is part of the same reviewed change.

## How noisy is 800 rows?

Resampling the holdout 1,000 times (a bootstrap) gives the production model's AUC a 95% interval of about 0.767 to 0.834. A difference of 0.004 is far smaller than that noise. Two practical lessons: use a larger holdout when you can, and treat tolerances such as `MAX_DROP` as a policy you choose and document, not a precise measurement.

## Recap

A validation gate compares a candidate to production on the same fixed holdout, with several rules: a floor, no regression beyond a tolerance, slice checks, and calibration. It reports every check, saves a report, and signals pass or fail with its exit code. Passing means "not worse by our rules", not "certainly better". Next, we look at how an approved model moves from staging to production.
