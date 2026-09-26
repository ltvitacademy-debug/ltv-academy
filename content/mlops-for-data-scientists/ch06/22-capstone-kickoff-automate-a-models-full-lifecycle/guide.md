# Capstone Kickoff: Automate a Model's Full Lifecycle

Five chapters gave you the parts: project structure, Git, versioning, tracking, serving, tests, gates, monitoring and retraining triggers. The capstone connects them into one automated lifecycle for a single model, and you run every stage yourself. The model is the churn-style cancellation model from the earlier lessons, the data is the same illustrative, seeded dataset (`make_cancel_data`), and the project is the `churn-project` layout from lesson 3.

The capstone has three lessons. Today you plan the lifecycle, write the rules down before writing pipeline code, and set up the project and baseline. Lesson 23 builds the six stages. Lesson 24 runs the whole lifecycle, breaks it on purpose, and turns it into a portfolio piece.

## What you'll learn

- The six lifecycle stages and which chapter each one comes from
- What is run for real in this capstone and what is only illustrative
- How to write the pass/fail rules first, as configuration
- How to set up the project and confirm the baseline

## Local versus illustrative CI

Be clear about this from the start. **Everything below runs on your own computer**: training, the validation gate, the MLflow registry (a local folder store, no server), a local prediction API tested over HTTP, the drift check and the retrain decision. We ran all of it with Python 3.9, scikit-learn 1.1.2, pandas 1.4.3 and MLflow 2.14.3, and the numbers in these lessons are what we actually saw. The **GitHub Actions workflow** in lesson 24 is illustrative: we checked that it parses as valid YAML, but it was not run on GitHub here, and action versions change, so check the current docs.

## Six stages

1. **Train and track.** Fit the pipeline and log parameters, metrics and the model to MLflow (chapters 1 and 2).
2. **Validation gate.** Compare the candidate with fixed floors and with the current champion (chapter 4).
3. **Register.** Create a new model version and point a `champion` alias at it only after every check passes (chapter 2).
4. **Serve and contract-test.** Load the registered model behind an API and test its contract (chapter 3).
5. **Drift check.** Compare live inputs with the training data using PSI and KS (chapter 5).
6. **Retrain trigger.** Decide whether to hold, investigate or retrain (chapter 5).

Stages 1 to 4 run as one function each time a candidate model appears. Stages 5 and 6 run every week on production data.

## Write the rules first

Decide what "good enough to ship" means before the pipeline exists, and store it in `params.yaml` so code and reviewers read the same numbers:

```yaml
data:
  n: 6000
  seed: 2026
  test_size: 0.2
  split_seed: 42
model:
  C: 1.0
gate:
  min_auc: 0.70
  min_ap: 0.25
  max_drop: 0.01
drift:
  psi_max: 0.25
retrain:
  min_age_days: 14
  min_rows: 2000
  breach_weeks: 2
```

The gate floors are set relative to the baseline you are about to measure: ROC AUC at least 0.70, average precision at least 0.25 (the cancel rate is 0.111, so that is over twice the no-skill level), and no more than 0.01 AUC worse than the current champion. The drift and retrain values come straight from lessons 18 to 20. Changing a threshold later is a reviewed edit to one file, not a hunt through code.

## The project

This is the complete project at the end of the capstone. Today we create `params.yaml`, `requirements.txt` and the first three modules.

```
churn-project/
|-- churn/
|   |-- data.py      model.py     train.py
|   |-- gate.py      registry.py  serve.py
|   |-- contract.py  drift.py     retrain.py
|   |-- simulate.py  pipeline.py
|-- tests/           test_gate.py test_contract.py
|-- .github/workflows/lifecycle.yml
|-- params.yaml      requirements.txt
`-- run_lifecycle.py
```

The `requirements.txt` pins the versions we ran: numpy 1.23.1, pandas 1.4.3, scipy 1.9.0, scikit-learn 1.1.2, `mlflow-skinny` 2.14.3 and pyyaml 6.0.3 (lesson 5's habit). Note that we call `OneHotEncoder(sparse=False)`, which matches scikit-learn 1.1; in scikit-learn 1.2 and later the argument is named `sparse_output`.

## Data and model code

`churn/data.py` keeps `make_cancel_data` exactly as in Applied Machine Learning and adds one function that reads the settings and makes the same stratified split every time:

```python
def load_split(p):
    df = make_cancel_data(n=p["n"], seed=p["seed"])
    X, y = df.drop(columns="cancelled"), df.cancelled
    return train_test_split(X, y, test_size=p["test_size"],
                            stratify=y, random_state=p["split_seed"])
```

`churn/model.py` holds `build_pipeline(C)`, the imputer, scaler, one-hot encoder and logistic regression pipeline you have used since lesson 18, plus one function used everywhere in the capstone:

```python
def evaluate(model, X, y):
    p = model.predict_proba(X)[:, 1]
    return {"roc_auc": round(float(roc_auc_score(y, p)), 3),
            "avg_precision": round(float(
                average_precision_score(y, p)), 3)}
```

One shared `evaluate` means training, the gate and the monitor can never disagree about how a metric is computed.

## The baseline run

Now the first run, from the project root:

```python
params = yaml.safe_load(open("params.yaml"))
X_tr, X_te, y_tr, y_te = load_split(params["data"])
model = build_pipeline(C=params["model"]["C"]).fit(X_tr, y_tr)
print(evaluate(model, X_te, y_te))
```

```
(4800, 8) (1200, 8) 0.111 0.111
trained on 4800 rows; {'roc_auc': 0.744, 'avg_precision': 0.333}
```

The split has 4,800 training and 1,200 test rows with the same 0.111 cancel rate in both. A no-skill `DummyClassifier` scores ROC AUC 0.5 and average precision 0.111 on the same test set. The model clears the floors we wrote (0.70 and 0.25) with room to spare, and these are the numbers lesson 21's model card recorded. The baseline is what the pipeline must protect.

## Recap

The capstone automates six stages: train and track, gate, register, serve and contract-test, drift check, retrain trigger. Everything runs locally except the GitHub Actions workflow, which is illustrative. Write the pass/fail rules into `params.yaml` first, keep one shared `evaluate`, and measure the baseline: ROC AUC 0.744 and average precision 0.333. Next, lesson 23 builds the stages.
