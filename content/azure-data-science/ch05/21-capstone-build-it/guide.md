# Capstone: Build It

Time to build. The plan from the kickoff has five moves: track several training runs, pick the winner, register it, wrap it in a scoring script, and check for drift. Everything below that runs on a laptop was actually run, and the output shown is what I saw. Steps that need an Azure workspace are labeled illustrative and adapted from Microsoft Learn.

## What you'll learn

- How to compare candidate models with MLflow tracking and pick a winner by metric
- What an MLflow model folder contains, and what happens when you register it
- Why a no-code MLflow deployment returns labels, and when a custom scoring script is worth it
- How to run a first drift check on a simulated production week

## 1. Train and track

I used MLflow's local file store (`mlflow.set_tracking_uri("file:./mlruns")`), the same API you used against the workspace in the MLflow lesson. Three candidates, each logged with its parameters, metrics and the full pipeline as an MLflow model with a signature and input example:

```python
for name, params, clf in candidates:
    with mlflow.start_run(run_name=name):
        pipe = Pipeline([("prep", pre), ("clf", clf)]).fit(Xtr, ytr)
        p = pipe.predict_proba(Xte)[:, 1]
        mlflow.log_params(params)
        mlflow.log_metric("auc", roc_auc_score(yte, p))
        mlflow.log_metric("recall_at_0.5", recall_score(yte, p > 0.5))
        mlflow.sklearn.log_model(pipe, "model",
            signature=infer_signature(Xte, p),
            input_example=Xte.head(2))
```

Results:

```
logreg-C0.1  auc=0.7935
logreg-C1.0  auc=0.7934
gbm          auc=0.7870
```

The regularization strength barely matters here, and gradient boosting does not beat the simple model on this data. That is a useful finding: the simplest model that clears the bar is easier to explain, cheaper to serve and easier to monitor. I sorted runs with `mlflow.search_runs(..., order_by=["metrics.auc DESC"])` and took the top one.

## 2. Register

`mlflow.register_model(f"runs:/{best.run_id}/model", "churn-model")` printed `registered churn-model version 1` in my local registry. The saved model folder contained `MLmodel`, `conda.yaml`, `input_example.json`, `model.pkl`, `python_env.yaml` and `requirements.txt`. In Azure ML you register the same folder as an MLflow model asset. Illustrative, adapted from the docs:

```python
ml_client.models.create_or_update(
    Model(
        path=f"azureml://jobs/{RUN_ID}/outputs/artifacts/model",
        name="churn-model",
        type=AssetTypes.MLFLOW_MODEL))
```

## 3. Score it

For MLflow models, Azure ML offers no-code deployment: it generates the scoring script and environment. But look at what the default returns. Loading the folder with `mlflow.pyfunc.load_model` and predicting on two customers gave:

```
pyfunc predict -> [1, 0]
```

Class labels, not risk scores. The retention team wants probabilities, so I wrote a custom scoring script. It follows the online endpoint contract from the docs: `init()` reads `AZUREML_MODEL_DIR`, `run(raw_data)` receives a JSON string with a top-level `input_data` key.

```python
def init():
    global model
    model_dir = os.path.join(os.getenv("AZUREML_MODEL_DIR"), "model")
    model = mlflow.sklearn.load_model(model_dir)

def run(raw_data):
    payload = json.loads(raw_data)
    if "input_data" not in payload:
        raise ValueError("Request needs a top-level 'input_data' key")
    df = pd.DataFrame(**payload["input_data"])
    risk = model.predict_proba(df)[:, 1].round(3)
    return json.dumps({"churn_risk": risk.tolist()})
```

I tested it locally by setting `AZUREML_MODEL_DIR` and calling `init()` then `run()` with a request in the documented shape (columns plus data rows). The output:

```
{"churn_risk": [0.911, 0.042]}
error: Request needs a top-level 'input_data' key
```

The month-to-month customer with four tickets scores 0.911; the two-year customer with none scores 0.042. The Learn article's own custom script uses MLflow's scoring-server helpers, which need Flask, so I wrote this simpler equivalent that does not.

## 4. Deploy (illustrative, not run here)

Custom scripts need an environment that includes `azureml-inference-server-http`, per the docs. Adapted from the MLflow online deployment article; check the current version before use:

```python
endpoint = ManagedOnlineEndpoint(name=endpoint_name,
                                 auth_mode="key")
ml_client.begin_create_or_update(endpoint).result()

blue = ManagedOnlineDeployment(
    name="blue", endpoint_name=endpoint_name,
    model=model, environment=environment,
    code_configuration=CodeConfiguration(
        code="src", scoring_script="score.py"),
    instance_type="Standard_F4s_v2", instance_count=1)
ml_client.online_deployments.begin_create_or_update(blue)

endpoint.traffic = {"blue": 100}
ml_client.begin_create_or_update(endpoint).result()
```

The docs use key authentication for simplicity and note that Microsoft recommends Microsoft Entra token authentication (`aad_token`) for production. Test with `ml_client.online_endpoints.invoke(endpoint_name=..., request_file="request.json")`, and when you finish, `ml_client.online_endpoints.begin_delete(endpoint_name)` so compute stops billing.

## 5. First drift check

I reused the PSI function from the monitoring lesson and compared two synthetic production weeks with the training data, scoring both with the registered model:

```
week 1 (normal)  PSI spend=0.006 tickets=0.010 | mean risk=0.351 | AUC=0.762
week 2 (drifted) PSI spend=0.829 tickets=0.299 | mean risk=0.444 | AUC=0.780
```

Week 2's inputs shifted sharply and the average predicted risk jumped from 0.351 to 0.444, but AUC did not fall. That is a genuine lesson: drift is a prompt to investigate, not proof the model is broken. Here the relationship between features and churn stayed intact in my simulation; in real life you must confirm with labels once they arrive. Also, AUC on a 1,000-row week (0.762) differs from the held-out figure (0.793), which is most likely sampling noise on a small sample; I did not test that further.

## Recap

- Track every candidate, pick by metric, and prefer the simplest model that clears the bar.
- Register the MLflow model folder; it is the artifact that moves to the cloud.
- No-code MLflow deployment returns `predict()` output (labels here); use a custom script when you need probabilities.
- Test scoring scripts locally with a request in the endpoint's format before deploying.
- Drift metrics tell you to look; labels tell you whether performance actually changed.
