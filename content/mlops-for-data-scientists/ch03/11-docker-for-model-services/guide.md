# Docker for Model Services

The churn API from Lesson 10 works on the machine where you built it. That is exactly the problem. A saved model is sensitive to the versions of Python, scikit-learn, NumPy, and pandas it was trained with, and the server that will run it is not your laptop. Docker solves this by packaging the service, its libraries, and even the model file into one image that runs the same way anywhere. This lesson does not re-teach Docker itself (see Docker & Deployment for AI Applications); it shows what changes when the thing inside the container is a trained model.

> **Honest note:** Docker was not installed in the environment used to write this lesson, so the Dockerfile below was **not built or run here**. Its structure follows Docker's and FastAPI's official guidance, and the dependency pins were checked with `pip download` against Python 3.10 Linux wheels. Always build and test it yourself before relying on it.

## What you'll learn

- Why model services depend on an exact software environment
- How to write a Dockerfile for the churn API, layer by layer
- The build and run commands, and how to test the container
- Practices specific to ML images: pinning, non-root users, and where the model file lives

## Start from pinned requirements

The container's Python libraries must match training. From the training environment we record exact versions:

```
fastapi==0.128.8
uvicorn==0.39.0
pydantic==2.13.5
scikit-learn==1.1.2
joblib==1.1.0
numpy==1.23.1
pandas==1.4.3
```

Here is a real example of why this matters. We asked pip for `scikit-learn==1.1.2` on Python 3.11 (Linux) and it refused: the available versions started at 1.1.3. On Python 3.10 it found a matching wheel. So the Docker base image must be `python:3.10-slim`, not whatever is newest. A model trained on one stack often cannot even be installed on another. (Also note that these are only top-level pins: pip still chose the transitive dependencies, such as SciPy, on its own. A lock file from a tool like pip-tools or uv pins the whole tree; check current docs for your tool.)

## The Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /srv

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN useradd --create-home appuser
COPY app.py .
COPY models/ models/
USER appuser

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

Every line earns its place:

- **Slim base image, version pinned.** Smaller images download faster and expose less. The Docker Hub page for the official Python image notes that slim variants lack build tools, so packages without prebuilt wheels can fail to install. Check that your tag is still supported.
- **Requirements copied before code.** Docker caches each layer. Installing libraries is slow and rarely changes; your code changes constantly. Copying `requirements.txt` first means edits to `app.py` rebuild in seconds instead of reinstalling scikit-learn.
- **Non-root user.** Docker's best-practice guide recommends `USER` when a service does not need privileges. Serving predictions does not.
- **Exec-form `CMD`.** FastAPI's documentation says to use the JSON-array form so the server shuts down gracefully and lifespan events run.
- **`--host 0.0.0.0`.** Uvicorn listens on 127.0.0.1 by default, which is unreachable from outside the container.
- **`EXPOSE` is documentation only.** Ports are actually published at run time with `-p`.

Add a `.dockerignore` listing `.git`, `__pycache__/`, `*.csv`, and virtual environments so training data never leaks into the build context or the image.

## Build, run, test

```
docker build -t churn-service:1.0.0 .
docker run -p 8000:8000 churn-service:1.0.0
curl localhost:8000/health
```

The health check should return `{"status":"ok"}`, as the local uvicorn run did in Lesson 10. Then send the same `/predict` request from Lesson 10 and confirm the container returns the same probability the local server did (0.909 for our month-to-month customer). Comparing the container's answers with a known-good local answer is the simplest test that the image matches training. Tag images with the model version so a running container can always be traced to a model.

## ML-specific decisions

- **Baked-in versus fetched models.** Copying the model file into the image ties one model version to one image tag, which is simple and traceable. Alternatively the container can download a registered model at startup, so you can update the model without rebuilding; that needs credentials and startup-time handling. Start with baked-in.
- **Keep training out of the serving image.** Serving needs a few libraries; training tools, notebooks, and data do not belong there.
- **Health checks.** Docker's `HEALTHCHECK` instruction is used by Docker itself; Kubernetes does not use it directly and has its own liveness and readiness probes, which can point at `/health`.
- **One process per container.** FastAPI's docs recommend a single Uvicorn process per container when a cluster handles replication.

## Recap

A container freezes the environment your model was trained in. Pin versions, order the Dockerfile for caching, run as non-root, and bind to 0.0.0.0. Next we ask a different question: does every prediction really need a live API, or would a nightly batch job serve better?
