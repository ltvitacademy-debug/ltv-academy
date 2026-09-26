# Deploying to the Cloud

You now have a model service in a container (Lesson 11) and you know whether it should run live or on a schedule (Lesson 12). Deploying to the cloud means handing that container, or that job, to a platform that keeps it running, scales it, secures it, and lets you roll out new versions safely. This lesson is a map, not a walkthrough. Cloud products and their names change often, so we describe the *routes*, cite what the official documentation says as of this writing, and leave the click-by-click steps to the current docs and to the Azure and AWS Data Science courses in this path.

## What you'll learn

- The three main routes for deploying a model, and how to choose among them
- What every platform expects from your container
- How to roll out a new model version without risking all your traffic
- A post-deploy smoke test that you can run against any URL

## Route 1: A managed ML endpoint

Machine learning platforms package deployment for you. In Azure Machine Learning, an **endpoint** is a stable URL with authentication, and it contains one or more **deployments**, the compute and code that actually run the model. Microsoft's documentation distinguishes **online endpoints**, for low-latency real-time requests, from **batch endpoints**, for long-running asynchronous jobs over large volumes of data. Its comparison table lists traffic splitting and traffic mirroring for online endpoints, and MLflow models and bring-your-own-container as supported ways to deploy.

Amazon SageMaker AI offers a similar menu. Its documentation describes **real-time** endpoints for interactive, low-latency needs, **serverless** endpoints for workloads with idle periods that can tolerate cold starts, and **asynchronous** endpoints that queue requests, with support for large payloads and long processing times. Batch scoring is covered by other SageMaker features; check the current docs for the one that fits.

This route suits teams already using the platform for training, because the model registry, endpoint, and monitoring tools are integrated.

## Route 2: A container platform

Because Lesson 11 gave you a standard container image, you can also run it on a general container service. Examples from the official documentation:

- **Azure Container Apps:** a serverless platform for containerized apps, with HTTPS ingress, autoscaling (most apps can scale to zero), and traffic splitting across revisions.
- **Amazon ECS with AWS Fargate:** runs containers without provisioning servers or clusters; you specify CPU and memory and launch the service.
- **Google Cloud Run:** deploys container images, removes idle instances by default, and expects your code to listen on a TCP port for HTTP requests.

This route gives you portability and works well for a small FastAPI service like ours, but you assemble the monitoring and model-management pieces yourself.

## Route 3: A scheduled job

If Lesson 12 pointed you to batch, you may not need an endpoint at all. Package the scoring script (the same image can hold it), run it on the platform's scheduler or a workflow tool, and write scores to a table. This is often the cheapest and lowest-maintenance option.

## What every platform expects

Regardless of route, plan for these:

- **An image in a registry.** Push the tagged image (for example `churn-service:1.0.0`) to a registry the platform can read from, and deploy that tag, never `latest`.
- **Configuration outside the image.** Secrets, database strings, and environment names come from the platform's secret store, not from files baked into the container.
- **A health endpoint.** Platforms use probes to decide when to send traffic and when to restart. Your `/health` route from Lesson 10 serves this purpose.
- **Right-sized compute and scaling limits.** Set minimum and maximum instances. Scaling to zero saves money but adds cold-start delay, since the model must load before the first request; measure it.
- **Identity, not passwords.** Give the service an identity with the least access it needs.
- **Logs and metrics.** Chapter 5 depends on them.

## Roll out safely

Never replace a working model with a new one all at once. The pattern is the same across platforms:

1. Deploy the new version **alongside** the old one.
2. Verify it with a **smoke test**.
3. Send a **small share of traffic** to it, or mirror traffic if the platform supports it, and watch errors, latency, and prediction distributions.
4. Promote it gradually, or roll back instantly by shifting traffic back.

Here is a smoke test that works against any URL. It checks the health endpoint and then confirms that a known "golden" customer still scores the expected 0.909, the answer recorded from the validated model:

```python
import json, sys, urllib.request

base = sys.argv[1]
GOLDEN = {"tenure_months": 5, "monthly_charge": 95.5,
          "contract": "month-to-month", "support_tickets": 3,
          "autopay": "no"}
EXPECTED = 0.909

def call(path, payload=None):
    data = json.dumps(payload).encode() if payload else None
    req = urllib.request.Request(base + path, data,
                                 {"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.load(r)

assert call("/health")["status"] == "ok"
out = call("/predict", GOLDEN)
assert abs(out["churn_probability"] - EXPECTED) < 0.005, out
print("smoke test passed:", out)
```

We ran it against the local server from Lesson 10:

```
smoke test passed: {'churn_probability': 0.909, 'churn_predicted': True, 'model_version': '1.0.0'}
```

Pointed at an address with no server, the script fails with a connection error instead of passing silently, which is what you want from a deployment gate. Chapter 4 will run checks like this automatically.

## Recap

Choose a managed ML endpoint, a container platform, or a scheduled job based on your team and the use case. Every route needs a registry image, external configuration, a health check, scaling limits, and logs. Roll out beside the old version, smoke-test it, shift traffic gradually, and keep rollback easy. Next, Chapter 4 shows how to automate quality with CI/CD, starting with testing ML code and data.
