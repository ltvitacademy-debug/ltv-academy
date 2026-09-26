# Capstone: Build It

Time to build the six stages. Each one is a small, testable function in the `churn-project` package, and each result below is output we actually saw when we ran it. Everything runs locally: the MLflow tracking and registry use a plain `mlruns` folder (no server), and the API runs on your own machine. We used Python 3.9, scikit-learn 1.1.2, pandas 1.4.3 and `mlflow-skinny` 2.14.3, so check the current docs if your versions differ.

## What you'll learn

- How to log a training run and its model to MLflow from one function
- How to write a validation gate as a pure, testable function
- How to register a version first and promote it only after it passes
- How to contract-test a prediction API over real HTTP
- How to wire drift checks and a retrain decision to the same settings file

## Stage 1: train and track

`churn/train.py` trains one candidate and logs it. It takes the data as an argument so the same function can later train on newer data.

```python
def train(params, data=None, uri=URI):
    mlflow.set_tracking_uri(uri)
    mlflow.set_experiment("cancel-risk")
    X_tr, X_te, y_tr, y_te = data or load_split(params["data"])
    with mlflow.start_run() as run:
        model = build_pipeline(C=params["model"]["C"]).fit(X_tr, y_tr)
        metrics = evaluate(model, X_te, y_te)
        mlflow.log_params({"C": params["model"]["C"],
                           "train_rows": len(X_tr)})
        mlflow.log_metrics(metrics)
        mlflow.sklearn.log_model(model, "model")
    return run.info.run_id, metrics
```

Running `python -m churn.train` printed `run 7a3108a5 {'roc_auc': 0.744, 'avg_precision': 0.333}` (your run id will differ). Reading the run back with `MlflowClient` showed the experiment `cancel-risk`, parameters `{'C': '1.0', 'train_rows': '4800'}` and metrics `{'avg_precision': 0.333, 'roc_auc': 0.744}`. The model itself was saved under the run as a folder containing `MLmodel`, `model.pkl` and environment files. `URI` defaults to `file:./mlruns` and can be overridden with the `MLFLOW_TRACKING_URI` environment variable, which is how CI would point at a shared server.

## Stage 2: the validation gate

The gate is a pure function: metrics in, verdict out. That makes it trivial to test without training anything.

```python
def validation_gate(cand, champ, rules):
    reasons = []
    if cand["roc_auc"] < rules["min_auc"]:
        reasons.append("AUC %.3f below floor %.2f"
                       % (cand["roc_auc"], rules["min_auc"]))
    # ... same check for average precision ...
    if champ and cand["roc_auc"] < champ["roc_auc"] - rules["max_drop"]:
        reasons.append("AUC %.3f is worse than champion %.3f"
                       % (cand["roc_auc"], champ["roc_auc"]))
    return len(reasons) == 0, reasons
```

Three calls with the rules from `params.yaml` returned `(True, [])` for the baseline, `(False, ['AUC 0.620 below floor 0.70'])` for a weak candidate, and `(False, ['AUC 0.720 is worse than champion 0.744'])` for a candidate that clears the floor but regresses. Those three cases are the unit tests in `tests/test_gate.py`, and `python -m unittest tests.test_gate` ran 3 tests, OK. Note the important rule: candidate and champion metrics must be measured on the *same* data.

## Stage 3: register, then promote

Registering creates a version. Promoting moves the `champion` alias. Keeping them separate lets us test a version before anyone can serve it.

```python
def register(run_id, metrics, uri=URI):
    mv = mlflow.register_model("runs:/%s/model" % run_id, NAME)
    client.set_model_version_tag(NAME, mv.version, "roc_auc",
                                 str(metrics["roc_auc"]))
    return mv.version

def promote(version, uri=URI):
    client.set_registered_model_alias(NAME, "champion", version)
```

On a fresh registry we saw: champion before is `None`; after `register` the version is 1 but the champion is still `None`; after `promote(1)` the champion is version 1 with the tag `roc_auc: 0.744`. MLflow's older "stages" (Staging, Production) have been deprecated in favor of aliases in recent releases, so we use an alias; check current docs. Aliases also give you rollback: point `champion` back at the previous version.

## Stage 4: serve and contract-test

Lesson 10 built the API with FastAPI. To keep this capstone dependency-free we use Python's standard library `http.server`; the contract idea is identical. `validate` checks types, ranges and allowed values (two features may be null because the pipeline imputes them), and returns a list of errors. The handler returns 422 with those errors, or the prediction with the model version.

The contract test starts the server on a free port and sends real requests. The exchanges we saw:

```
GET  /health                       -> 200 {'status': 'ok'}
POST /predict (valid customer)     -> 200 {'churn_probability': 0.737,
                                    'churn_predicted': True,
                                    'model_version': '1'}
POST /predict (plan="platinum")    -> 422 plan must be one of [...]
POST /predict (channel missing)    -> 422 missing field: channel
```

`check_contract(base, version)` bundles these checks (plus response keys, a probability inside [0, 1], the right model version, null handling, negative tenure) and returned `[]`, meaning no violations. `tests/test_contract.py` wraps it in a `unittest` test that loads the champion, serves it, and asserts the list is empty.

## Stage 5: drift check

`drift_report` in `churn/drift.py` computes PSI and the KS statistic for every feature (PSI per category for `plan` and `channel`) and raises an alarm when the worst PSI exceeds `psi_max` from `params.yaml`. The functions are the same PSI and KS from lesson 18. Comparing training data with simulated week 2 gave no alarm (worst PSI 0.009). Week 4 gave an alarm: `days_idle` had PSI 0.867 and KS 0.186 while the other seven features stayed at 0.013 or lower.

## Stage 6: the retrain decision

`retrain_decision` is lesson 20's function, now reading its thresholds from `params.yaml`. Four sample calls returned `hold` (a 7-day-old model, cooldown), `investigate` (drift but AUC fine), `wait` (needs 2,000 labelled rows, have 1,500) and `retrain` (two weeks below the AUC floor with 9,000 rows).

## Wire stages 1 to 4 together

`churn/pipeline.py` runs the per-candidate stages in a deliberate order: train, gate, register, contract-test the registered version, and only then promote.

```python
def run_cycle(params, data=None):
    X_tr, X_te, y_tr, y_te = data or load_split(params["data"])
    run_id, cand = train(params, (X_tr, X_te, y_tr, y_te))
    champ_model, _ = load_champion()
    champ = evaluate(champ_model, X_te, y_te) if champ_model else None
    ok, why = validation_gate(cand, champ, params["gate"])
    if not ok:
        return {"status": "blocked at gate", "reasons": why}
    version = register(run_id, cand)
    bad = contract_test(load_version(version), version)
    if bad:
        return {"status": "blocked at contract test", "reasons": bad}
    promote(version)
    return {"status": "promoted", "version": version}
```

(The real function also returns the metrics; this is shortened.) Running it on our registry, which already held version 1, returned `promoted` with version 2. The candidate and champion both scored ROC AUC 0.744, so it passed, and version 1 stayed in the registry for rollback.

## Recap

Six small functions, one settings file. Train and log, gate with a pure function, register before promoting, contract-test over real HTTP, check drift, decide on retraining. Because each stage returns data instead of printing or exiting, you can call them from tests, from `run_cycle`, or from CI. Next, lesson 24 runs the entire lifecycle, breaks it on purpose, and packages the project for your portfolio.
