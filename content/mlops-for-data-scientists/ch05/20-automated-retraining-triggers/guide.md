# Automated Retraining Triggers

Monitoring tells you the model is going stale. A retraining trigger decides what happens next, without a human having to remember. This lesson turns the alerts from lesson 19 into a small decision policy, runs it across the same eight simulated weeks, and then runs a retraining job whose result is judged fairly before anything ships. Everything is illustrative: the data is simulated, and every number came from code that was run.

## What you'll learn

- The four common triggers: schedule, performance, drift, and data volume
- How to combine them into one readable decision function with a cooldown
- How to train a candidate and compare it to the current champion on newer data
- Why an automated retrain should propose a model, not silently replace one

## Four triggers

- **Schedule.** Retrain every N days no matter what. Simple and predictable, but it wastes compute when nothing changed and reacts slowly when something did.
- **Performance.** Retrain when live AUC stays below its floor. This is the strongest signal, but it needs labels, so it lags.
- **Drift.** Retrain when inputs shift. It is early, but from lesson 18 we know input drift alone often does not hurt accuracy, so drift usually earns an investigation rather than an automatic rebuild.
- **Data volume.** Do not retrain until enough new labelled rows exist, otherwise the new model learns from noise.

## Set up

Save lesson 19's model, `make_week`, `weekly_metrics`, the `hist` table, and `RULES` (without the print lines) as `monitor_sim.py`. Then import them:

```python
import pandas as pd
from sklearn.metrics import roc_auc_score
from model_utils import build_pipeline
from monitor_sim import model, make_week, hist, RULES
```

## A decision function

The policy is a plain function, so it is easy to read, test, and change.

```python
def retrain_decision(days_since_train, labelled_rows,
                     auc_breach_weeks, drift_alarm):
    """Return (action, reasons) for one weekly check."""
    if days_since_train < 14:
        return "hold", ["cooldown: model under 14 days old"]
    reasons = []
    if auc_breach_weeks >= 2:
        reasons.append("performance: AUC below floor 2 weeks")
    if days_since_train >= 90:
        reasons.append("schedule: model older than 90 days")
    if reasons:
        if labelled_rows < 2000:
            return "wait", ["need 2000 labelled rows, have %d"
                            % labelled_rows]
        return "retrain", reasons
    if drift_alarm:
        return "investigate", ["input drift, but AUC still ok"]
    return "hold", []
```

Notice the ordering. The cooldown comes first so a fresh model is never retrained in a loop. Volume gates the expensive action. Drift alone only says "investigate".

## Run it across the eight weeks

```python
breach = (hist.auc < RULES["auc_min"]).astype(int)
streak = breach.groupby((breach == 0).cumsum()).cumsum()
for row in hist.itertuples():
    action, why = retrain_decision(
        days_since_train=7 * row.week,
        labelled_rows=1500 * row.week,
        auc_breach_weeks=int(streak[row.Index]),
        drift_alarm=row.max_psi > RULES["psi_max"])
    print(f"week {row.week}: {action:11s} {'; '.join(why)}")
print(retrain_decision(95, 9000, 0, False))
```

```
week 1: hold        cooldown: model under 14 days old
week 2: hold        
week 3: investigate input drift, but AUC still ok
week 4: investigate input drift, but AUC still ok
week 5: investigate input drift, but AUC still ok
week 6: retrain     performance: AUC below floor 2 weeks
week 7: retrain     performance: AUC below floor 2 weeks
week 8: retrain     performance: AUC below floor 2 weeks
('retrain', ['schedule: model older than 90 days'])
```

The drift in weeks 3 to 5 produces only an investigation. The trigger fires in week 6, the second week in a row below the floor. The last line shows the schedule trigger on a model that is 95 days old.

## The retraining job

Once triggered, train a candidate on the most recent labelled weeks and judge it against the current champion on data newer than either saw: a time-ordered split.

```python
def retrain_and_compare(train_weeks, eval_weeks, margin=0.03):
    tr = pd.concat([make_week(w) for w in train_weeks])
    ev = pd.concat([make_week(w) for w in eval_weeks])
    cand = build_pipeline().fit(tr.drop(columns="cancelled"),
                                tr.cancelled)
    def auc(m):
        p = m.predict_proba(ev.drop(columns="cancelled"))[:, 1]
        return roc_auc_score(ev.cancelled, p)
    champ_auc, cand_auc = auc(model), auc(cand)
    return {"champion": round(champ_auc, 3),
            "candidate": round(cand_auc, 3),
            "promote_to_staging": cand_auc >= champ_auc + margin,
            "still_below_floor": cand_auc < RULES["auc_min"]}

print(retrain_and_compare([5, 6], [7, 8]))
```

```
{'champion': 0.529, 'candidate': 0.593, 'promote_to_staging': True, 'still_below_floor': True}
```

Read this honestly. The candidate beats the champion by 0.064 AUC on newer weeks, clearing the 0.03 margin, so it goes to staging for review. But 0.593 is still under the 0.694 floor. Retraining on 3,000 recent, partly relabelled rows helped, and it did not fully repair the model, which suggests the features may no longer capture what drives cancellations. An automated pipeline should say exactly that and open a task for a human.

## Schedule it

A scheduled workflow can run the monitor and the decision each week. This is illustrative: it was checked to parse with PyYAML, but it was not run on GitHub here, so check current action versions in the docs.

```yaml
name: monitor-and-retrain
on:
  schedule:
    - cron: "0 6 * * 1"
  workflow_dispatch:
jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: python monitor.py --weekly
      - run: python retrain_if_needed.py
```

The cron line means Mondays at 06:00 UTC, and `workflow_dispatch` adds a manual run button. When PyYAML loads this file it reads the key `on` as the boolean `True`, a YAML 1.1 quirk; GitHub's own parser handles it correctly.

## Guardrails

- Log every decision and every retrain run, with the data window used.
- Retrain to a candidate, and promote only through the validation gate (lessons 16 and 17).
- Cap how often retraining can run, and alert if it keeps firing.
- Never auto-retrain on data you have not checked; bad labels teach bad models.

## Recap

- Combine schedule, performance, drift, and volume triggers in one testable function.
- Drift alone usually means investigate; sustained performance loss means retrain.
- Judge the candidate against the champion on newer data before promotion.
- Automation proposes, and gates plus people dispose.
