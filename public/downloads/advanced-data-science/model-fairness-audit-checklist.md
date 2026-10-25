# Model Fairness Audit Checklist

A reusable procedure and code template built from Lesson 26 (Fairness & Bias in Models), for
auditing any classifier that decides something about people before it ships.

## Step 1 — Ask the framing questions first

- What decision does this model feed? (approve/deny, flag/don't flag, prioritize/deprioritize)
- Who is affected, and which groups do we have a duty (legal, ethical, or both) to check?
- What does a wrong answer cost each group? Is a false positive worse than a false negative here,
  or the reverse?

## Step 2 — Compute group metrics, never just an overall score

```python
import pandas as pd

def group_report(d, group_col, label_col, pred_col):
    rows = {}
    for g, s in d.groupby(group_col):
        y, p = s[label_col], s[pred_col]
        rows[g] = {
            "n": len(s),
            "selection": p.mean(),                 # share flagged/approved
            "TPR": p[y == 1].mean(),                # share of true positives correctly flagged
            "FPR": p[y == 0].mean(),                # share of true negatives incorrectly flagged
            "precision": y[p == 1].mean(),          # among flagged, share that were true positives
        }
    return pd.DataFrame(rows).T

r = group_report(test_df, group_col="group", label_col="actual", pred_col="predicted")
print(r.round(3))
```

- **Selection rate**: the share of each group that gets approved/flagged.
- **TPR (true positive rate)**: of the people who should be flagged, what share actually were.
- **FPR (false positive rate)**: of the people who should NOT be flagged, what share were anyway.
- **Precision**: among those flagged, what share were correctly flagged.

Always report `n` alongside these — a small group produces noisy rates that can look like a large
gap by chance alone.

## Step 3 — Check for a selection-rate gap (and know its limits)

```python
impact_ratio = r["selection"].min() / r["selection"].max()
print("impact ratio:", round(impact_ratio, 3))
```

A commonly cited rule of thumb (the "four-fifths rule") flags an impact ratio below 0.8 for closer
scrutiny. Treat it strictly as a screening heuristic, not a legal determination — confirm the
actual standard that applies with compliance or legal counsel before acting on it.

## Step 4 — Remember that dropping the sensitive column does not remove the problem

Training without a protected attribute as a feature ("fairness through unawareness") does not
prevent a selection-rate gap from appearing. Other features — income, postal code, years of
history, anything correlated with the protected attribute — can act as proxies and reproduce the
same gap. The only way to know is to measure outcomes by group directly, as in Step 2, using a
group label held *outside* the model's own feature set purely for auditing purposes.

## Step 5 — Expect fairness definitions to conflict with each other

Equalizing one metric across groups (say, selection rate) will generally un-equalize another (TPR,
FPR, or precision) whenever the groups have different underlying base rates. There is no setting
that satisfies every fairness definition at once except in special cases. This means the choice of
which metric to equalize — or whether to equalize any of them versus leaving the model as-is — is
a judgment call, not a default to accept or a bug to silently patch.

## Step 6 — Document the decision

For every audited model, write down:

- Which group(s) were checked, and the group metrics table (Step 2).
- Which fairness definition(s), if any, were prioritized, and why.
- What proxies were identified and how they were handled.
- Who signed off on the trade-off, and the date.
- What will trigger a re-audit (a model retrain, a new feature, a new population, a fixed review
  interval).

## A practical checklist to run before every launch

1. Ask what decision the model feeds, who is affected, and what a wrong answer costs each group.
2. Report selection rate, TPR, FPR, and precision by group, with sample sizes.
3. Look for proxies and for labels that measure the wrong thing (a label like "was arrested"
   standing in for "committed a crime" is a measurement problem, not just a modeling one).
4. Pick fairness criteria with legal, domain, and affected-community input, and document the
   trade-off chosen.
5. Monitor after launch, and provide a way for an affected person to appeal a decision.

Fairness libraries such as `fairlearn` package many of these metrics and mitigation techniques —
worth exploring on a real project, but check current documentation before relying on any specific
API, since this checklist's code intentionally uses only pandas so it runs anywhere.
