# Real-Time Endpoints

A registered model does nothing until something can call it. The most common way to make that happen is a **real-time (online) endpoint**: a web service where an application sends one request and gets one prediction back in milliseconds. A support screen asking "how likely is this customer to churn?" and a checkout page scoring a payment are both real-time jobs. In this lesson you take the registered `churn-model` from last lesson and put it behind an endpoint, first testing the scoring code locally, then reading the illustrative Azure ML deployment code.

> No Azure account is available in this course, so the cloud calls below are illustrative and were not run against a workspace. They follow the current Microsoft Learn articles on online endpoints and safe rollout as of this writing; names change, so check the docs. What did run: the scoring script, executed by the real Azure ML inference HTTP server package on my laptop, and the SDK entity constructors (`azure-ai-ml` 1.35.0), which I built locally without a cloud call. Data is synthetic and illustrative.

## What you'll learn

- The difference between an endpoint and a deployment, and why the split exists
- What a scoring script must do, and how to test it locally with the inference server
- The shape of the SDK code that creates and invokes an endpoint
- How blue/green rollout, traffic mirroring and cleanup work

## Endpoint versus deployment

Per Microsoft Learn, online endpoints deploy models to a web server that returns predictions over HTTP, best when you need low latency, your model answers quickly, the input fits in the request, and you need to scale requests. An **endpoint** has a name (unique in the Azure region) and an authentication mode: key, Azure ML token (`aml_token`) or Microsoft Entra token (`aad_token`). Behind the endpoint sit one or more **deployments**. A deployment is the set of resources that hosts the model: the model (a registered name and version), a scoring script, an environment (Docker image plus conda dependencies), and an instance type and count. Keeping the stable interface (endpoint) separate from the implementation (deployment) is what lets you swap models without breaking callers.

Managed online endpoints are the recommended type: Azure provisions the compute, patches the host, and integrates with Azure Monitor. You pay for the compute and networking; the docs state there is no added surcharge. Kubernetes online endpoints exist for teams that want to run their own cluster.

## The scoring script

The script needs two functions. `init()` runs once when the container starts, after the deployment is created or updated; load the model here. `run(raw_data)` runs on every request and receives the request body as a string. During deployment, the environment variable `AZUREML_MODEL_DIR` points at the model folder. My version:

```python
import os, json, logging, joblib
import pandas as pd

COLUMNS = ["tenure_months", "monthly_spend",
           "support_tickets", "contract"]

def init():
    global model
    model_path = os.path.join(
        os.getenv("AZUREML_MODEL_DIR"), "churn.joblib")
    model = joblib.load(model_path)
    logging.info("Init complete")

def run(raw_data):
    payload = json.loads(raw_data)
    df = pd.DataFrame(payload["data"], columns=COLUMNS)
    risk = model.predict_proba(df)[:, 1].round(3)
    return {"churn_risk": risk.tolist()}
```

## Test locally before you deploy

The docs strongly recommend testing before deploying, and describe the **Azure ML inference HTTP server** package, which wraps your script in a small web server so you can debug it without Docker. I installed `azureml-inference-server-http` (version 1.5.1), pointed `AZUREML_MODEL_DIR` at a folder holding the saved model, and started it with `--entry_script src/score.py`. The server logged that it found the script, ran `init` successfully, and listed a liveness route (`GET /`) and a scoring route (`POST /score`). Then I sent requests:

```
GET  /       -> 200 Healthy
POST /score  {"data": [[3, 95.0, 4, "month-to-month"],
                       [48, 55.0, 0, "two-year"]]}
             -> 200 {"churn_risk": [0.917, 0.037]}
POST /score  {"rows": []}
             -> 500 {"message": "An unexpected error occurred in
                     scoring script. Check the logs for more info."}
```

The churner-looking customer (three months, four tickets, month-to-month) scores 0.917 and the loyal two-year customer 0.037. The bad request shows something important: the client sees only a generic 500 message. The real cause, `KeyError: 'data'`, appeared only in the server log. In the cloud too, you debug from the logs (`ml_client.online_deployments.get_logs(...)` in the SDK, or the studio's Logs tab). If you want friendlier client errors, catch problems in `run()` and raise a clear message.

## Create and invoke the endpoint (illustrative)

Adapted from the Learn how-to article; the objects below I constructed locally, but creating them needs a workspace:

```python
endpoint = ManagedOnlineEndpoint(
    name="churn-endpoint", auth_mode="key")
ml_client.online_endpoints.begin_create_or_update(
    endpoint).result()

blue = ManagedOnlineDeployment(
    name="blue", endpoint_name="churn-endpoint",
    model="azureml:churn-model:1",
    environment=env,
    code_configuration=CodeConfiguration(
        code="src", scoring_script="score.py"),
    instance_type="Standard_DS3_v2", instance_count=1)
ml_client.online_deployments.begin_create_or_update(
    blue).result()

endpoint.traffic = {"blue": 100}
ml_client.online_endpoints.begin_create_or_update(
    endpoint).result()

ml_client.online_endpoints.invoke(
    endpoint_name="churn-endpoint",
    deployment_name="blue",
    request_file="request.json")
```

The `env` is an `Environment` with a conda file and a base image. Deployment can take a while (the docs say up to 15 minutes when an image is built for the first time). Outside the SDK, callers use the endpoint's scoring URI and, with key authentication, send the key in an `Authorization: Bearer` header. For production the docs recommend at least three instances for availability, and note Azure reserves extra quota during upgrades on some VM sizes.

## Roll out a new model safely

Say version 2 of the model is ready. Do not edit `blue`. Add a second deployment, `green`, with zero traffic; you can still test it directly by naming it in `invoke`. Then, per the safe-rollout article: mirror a percentage of live traffic to green (`endpoint.mirror_traffic = {"green": 10}`), where clients still get blue's answers while you compare metrics and logs; then shift live traffic gradually (`endpoint.traffic = {"blue": 90, "green": 10}`), and finally send all traffic to green and delete blue. Mirroring can go to only one deployment and up to 50 percent of traffic, per the docs.

## Clean up

A managed endpoint keeps compute allocated while it exists, so it costs money even when idle. When you finish practicing, delete it: `ml_client.online_endpoints.begin_delete(name="churn-endpoint")` removes the endpoint and all its deployments.

## Recap

- An endpoint is the stable name and authentication; deployments hold the model, script, environment and compute.
- Scoring scripts load in `init()` and score in `run()`; test them locally with the inference server first.
- Blue/green rollout with traffic percentages and mirroring lets you change models without downtime.
- Delete endpoints when you finish. Next: batch endpoints, for when nobody is waiting on a single answer.
