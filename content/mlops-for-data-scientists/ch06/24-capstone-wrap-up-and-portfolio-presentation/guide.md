# Capstone: Wrap-Up & Portfolio Presentation

You have six stages that work one by one. Now run them as a single lifecycle, break the pipeline on purpose to prove the safety checks bite, write the automation that would run it on GitHub, and turn the whole thing into something you can present. Everything here ran locally on the `churn-project`, except the workflow file, which is illustrative and was not run on GitHub.

## What you'll learn

- How to run one command that exercises every stage
- How to read a lifecycle log, including a candidate that was correctly refused
- How to test the pipeline itself by injecting failures
- What the GitHub Actions workflow would look like, and what we did and did not verify
- How to present the project honestly in a portfolio

## Run the whole lifecycle

`run_lifecycle.py` calls `run_cycle` for the first model, then loops over eight simulated production weeks (the same drifting weeks from lesson 19), feeding each to the drift check and the retrain decision. When the decision says `retrain`, it trains on recent weeks, and finally it runs a scheduled refresh on fresh, healthy data. Starting from an empty registry, `python run_lifecycle.py` printed this, taking about half a minute on our machine:

```
cycle 1 (initial model)          -> promoted

week   auc  max_psi  action
   1 0.761    0.011  hold
   2 0.765    0.009  hold
   3 0.700    0.905  investigate
   4 0.737    0.867  investigate
   5 0.688    0.867  investigate
   6 0.651    0.889  retrain

cycle 2 (retrain after trigger) -> blocked at gate
    reason: AUC 0.593 below floor 0.70
    reason: AP 0.103 below floor 0.25
cycle 3 (scheduled refresh)      -> promoted
    champion on the same data:  {'roc_auc': 0.789, 'avg_precision': 0.376}
    candidate on the same data: {'roc_auc': 0.78, 'avg_precision': 0.365}

champion is now version 2
```

Read it like a story. Input drift appears in week 3, but the pipeline only says `investigate` while AUC holds up. The AUC falls below the 0.694 floor in weeks 5 and 6, and the second consecutive breach triggers `retrain`. Cycle 2 trains a candidate on weeks 5 and 6 and judges it on weeks 7 and 8. It beats the old champion there (AUC 0.593 against 0.529, average precision 0.103 against 0.087), but it is still far below the floors, so the gate **refuses to ship it**. That is the pipeline working: it found that retraining alone did not fix the problem, and a person now has to look at the features. Lesson 20 reached the same conclusion for the same weeks.

Cycle 3 is a scheduled refresh on 9,000 fresh customers. The candidate scored 0.780 against the champion's 0.789 on the same held-out rows. Since 0.780 is within the 0.01 tolerance, the gate promoted it. Whether a slightly lower score on a bigger training set is acceptable is a policy call, not a fact. If your team wants "never worse", set `max_drop` to 0 in `params.yaml`. Version 1 stays in the registry, so rolling back is one alias change.

The chart is drawn from the weekly log the script saved:

```python
log = json.load(open("weekly.json"))
weeks = [w["week"] for w in log["weeks"]]
fig, (a, b) = plt.subplots(1, 2, figsize=(9, 3.6))
a.plot(weeks, [w["auc"] for w in log["weeks"]],
       marker="o", color="#8E1C1C")
a.axhline(log["floor"], ls="--", color="#6B6259")
b.bar(weeks, [w["max_psi"] for w in log["weeks"]],
      color="#2F6B8A")
b.axhline(0.25, ls="--", color="#6B6259")
plt.savefig("lifecycle-monitor.png", dpi=130)
```

(The full script also adds titles and labels each bar with its action.)

## Break it on purpose

A safety check you have never seen fail is a guess. `drills.py` injects two faults into the running system:

```python
# Drill 1: a label bug. The training labels get shuffled.
shuffled = y_tr.sample(frac=1, random_state=0).set_axis(y_tr.index)
r = run_cycle(params, (X_tr, X_te, shuffled, y_te))

# Drill 2: a serving bug. Probabilities come back as percentages.
class PercentModel:
    def __init__(self, inner):
        self.inner = inner
    def predict_proba(self, X):
        return self.inner.predict_proba(X) * 100
```

The results:

```
drill 1: blocked at gate ['AUC 0.456 below floor 0.70', 'AP 0.098 below floor 0.25', 'AUC 0.456 is worse than champion 0.738']
drill 2: ['probability outside [0, 1]']
champion is still version 2
```

The shuffled-label model had an AUC of 0.456, which is coin-flip territory, and the gate listed all three reasons. The percentage bug was caught by the contract check, which flagged a probability outside [0, 1]. In both cases the champion never moved. The four unit tests (three for the gate, one contract test against the live champion) also passed.

## The automation: illustrative CI

This workflow would run the same commands on GitHub. **We checked that it parses as valid YAML with PyYAML. We did not run it on GitHub.**

```yaml
name: model-lifecycle

on:
  pull_request:
  schedule:
    - cron: "0 6 * * 1"
  workflow_dispatch:

env:
  MLFLOW_TRACKING_URI: ${{ secrets.MLFLOW_TRACKING_URI }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-python@v7
        with:
          python-version: "3.9"
          cache: pip
      - run: pip install -r requirements.txt
      - name: Unit tests for the gate
        run: python -m unittest tests.test_gate -v
      - name: Train, gate, register, contract test
        run: python -m churn.pipeline
      - name: API contract test on the champion
        run: python -m unittest tests.test_contract -v

  monitor:
    if: github.event_name != 'pull_request'
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-python@v7
        with:
          python-version: "3.9"
          cache: pip
      - run: pip install -r requirements.txt
      - name: Drift check and retrain trigger
        run: python run_lifecycle.py
```

This is the whole file. The `build` job tests every pull request. `python -m churn.pipeline` exits with a non-zero code unless the candidate is promoted, which is what turns a blocked gate into a red build. The `monitor` job runs weekly. Points to check before using anything like it: action version numbers change (the latest releases of `checkout` and `setup-python` were v7 when we looked, as of this writing), the runner must offer the Python version you ask for, the tracking URI should point at a shared MLflow server or each runner starts with an empty registry, and the `monitor` job calls our simulation, where a real project would read last week's production data. Also, when PyYAML loads the file it turns the key `on` into the boolean `True`, a YAML 1.1 quirk that GitHub's parser handles correctly.

## What this capstone does not prove

Be your own reviewer. The data is synthetic. A local folder is not a team registry. The standard-library server has no authentication, no concurrency tuning and no latency testing. The gate tolerance is a judgment. One model and one metric is a small slice of a real system. Saying so up front makes the rest of your work more credible.

## Present it

Pack the project like a colleague will read it in five minutes:

- **README first:** the problem, a diagram of the six stages, how to run it (`pip install -r requirements.txt`, then `python run_lifecycle.py`), and the results.
- **Show the failures.** The blocked retrain and the two drills prove the gates work; a pipeline that only ever succeeds proves little.
- **Attach the model card** from lesson 21, including the data fingerprint and limitations.
- **Mark what is illustrative:** simulated data, unrun CI.
- **Rehearse three answers:** why these thresholds, what happens when the gate blocks, and how you would move it to a team setting.

## Recap

You automated a model's lifecycle: train and track, gate, register, contract-test, drift-check and decide on retraining, ran it end to end, refused bad candidates, and wrote the automation and the honest caveats. That completes MLOps for Data Scientists, and with it the technical core of the Data Scientist path. One course remains: the Data Science Capstone, where you take a messy business dataset from the business problem through SQL, Python, EDA, modeling, evaluation, deployment and presentation, and finish with resume, portfolio and interview preparation. Bring this pipeline with you.
