# Lesson 22 — Capstone: Deploying a Model Endpoint on Azure

**Chapter 5 · Capstone · Lesson 22 of 24**

## What you'll learn

- How to authenticate and connect to your Foundry project with the Python SDK
- The real code to create an endpoint, then a deployment, against it
- What "Succeeded" and "Healthy" mean, and where to check them
- How to confirm the deployment actually answers a request

## Two ways in, one deliverable

Lesson 7 walked the portal path: catalog card, **Use this model**, confirm the connection, deploy. That path still works here, and it's the fastest way to get a deployment up if you'd rather click through it. This lesson shows the SDK path instead, because a capstone endpoint you can also stand up from code is a stronger portfolio artifact than one you only ever clicked into existence. Either path ends at the same deliverable: a live, Healthy endpoint with a Target URI.

## Step 1: connect to your project

Install the SDK and authenticate against your Foundry project's underlying Azure Machine Learning workspace:

```python
from azure.ai.ml import MLClient
from azure.identity import InteractiveBrowserCredential

ml_client = MLClient(
    credential=InteractiveBrowserCredential(),
    subscription_id="<your-subscription-id>",
    resource_group_name="<your-resource-group>",
    workspace_name="<your-project-name>",
)
```

`InteractiveBrowserCredential` pops a sign-in window the first time you run this — that's expected. This same `MLClient` object is what every later call in this lesson goes through.

## Step 2: create the endpoint

An endpoint is the container; a deployment is what actually runs inside it. Endpoint names have to be unique per region, so a timestamp keeps this one from colliding with anything else in your subscription:

```python
import time
from azure.ai.ml.entities import ManagedOnlineEndpoint, ManagedOnlineDeployment

endpoint_name = "capstone-endpoint-" + str(int(time.time()))

endpoint = ManagedOnlineEndpoint(name=endpoint_name, auth_mode="key")
ml_client.online_endpoints.begin_create_or_update(endpoint).wait()
```

This step typically takes two to three minutes. When it finishes, you have an endpoint URL with nothing deployed behind it yet.

## Step 3: deploy the model into it

Point the deployment at a model ID from the catalog — copy this from the model card's details page, in the form `azureml://registries/azureml/models/<name>/versions/<n>`:

```python
deployment = ManagedOnlineDeployment(
    name="capstone-deploy",
    endpoint_name=endpoint_name,
    model="azureml://registries/azureml/models/Phi-4/versions/8",
    instance_type="Standard_DS3_v2",
    instance_count=1,
)
ml_client.online_deployments.begin_create_or_update(deployment).wait()

endpoint.traffic = {"capstone-deploy": 100}
ml_client.online_endpoints.begin_create_or_update(endpoint).result()
```

Routing 100% of traffic to this one deployment matters — an endpoint can host multiple deployments split by traffic percentage, but a fresh deployment gets 0% until you explicitly route to it.

## Step 4: verify it's really live

Two status fields matter here, same as the portal path in Lesson 7:

1. **Provisioning state** — should read **Succeeded**. This means the resource itself was created.
2. **Deployment state** — should read **Healthy**. This means the model is actually up and serving requests, not just provisioned.

Both show on the deployment's details page in the Foundry portal, or via `ml_client.online_endpoints.get(endpoint_name)` from the SDK.

## Step 5: send a real request

```python
response = ml_client.online_endpoints.invoke(
    endpoint_name=endpoint_name,
    deployment_name="capstone-deploy",
    request_file="./sample_score.json",
)
print(response)
```

A response back — not an error, not a timeout — is the proof this deliverable is done. Copy the endpoint's Target URI and key from the details page before you close this lesson; Lesson 23 secures them.

## Key terms

| Term | Meaning |
|---|---|
| `ManagedOnlineEndpoint` | The SDK object representing the container that can host one or more deployments |
| `ManagedOnlineDeployment` | The SDK object representing one specific model version running on specific hardware |
| Traffic split | The percentage of requests to an endpoint routed to each of its deployments |
| Provisioning state / Deployment state | Whether the resource was created / whether the model inside it is actually healthy |

## Lab

Run Steps 1 through 5 against the model and deployment option you chose in Lesson 21. Confirm Provisioning state is Succeeded, Deployment state is Healthy, and you've successfully invoked the endpoint at least once. Save the Target URI somewhere you can find it — Lesson 23 needs it.

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: what's the difference between an endpoint and a deployment, and why does a new deployment start at 0% traffic?
