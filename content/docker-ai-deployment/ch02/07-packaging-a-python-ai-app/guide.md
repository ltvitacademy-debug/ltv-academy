# Lesson 7 — Packaging a Python AI App

**Chapter 2 · Containerizing AI Applications · Lesson 7 of 25**

## What you'll learn

- How Chapter 1's instructions combine into one real Dockerfile for a
  Python inference service
- Why an AI app's dependency list looks different from a typical web
  app's, and what that means for build time
- What belongs in a `.dockerignore` file, and why skipping it quietly
  bloats every build
- The shape of a minimal FastAPI inference service, containerized end to
  end

## The same seven instructions, now for real

Lesson 3 introduced `FROM`, `WORKDIR`, `COPY`, `RUN`, `ENV`, `EXPOSE`, and
`CMD` with a generic example. Here's that exact pattern applied to a small
FastAPI service that loads a model and serves predictions:

```
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app/
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Nothing new structurally — but `requirements.txt` for an AI app typically
pulls in `torch`, `transformers`, or `scikit-learn`, each one much larger
than a typical web framework. That's why the dependency layer from Lesson
3's cache-ordering lesson matters even more here: a `pip install` that
takes ten seconds for a Flask app can take several minutes for a PyTorch
stack, and you do not want that re-running on every code change.

## Keeping the build context small

Everything in your project directory gets sent to Docker as the build
context (Lesson 4), whether or not your Dockerfile uses it. For an AI
project, that silently includes virtual environments, downloaded
checkpoints, notebook checkpoints, and `__pycache__` — unless a
`.dockerignore` file excludes them:

```
.venv/
__pycache__/
*.pyc
.git/
notebooks/
*.ipynb_checkpoints/
.pytest_cache/
```

Skip this file and a multi-gigabyte local virtual environment or a stray
downloaded checkpoint gets uploaded to the Docker daemon on *every single
build* — slow, and a real risk of accidentally baking something
unintended into an image layer.

## A minimal inference service

```python
# app/main.py
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load("app/model.pkl")

@app.post("/predict")
def predict(features: list[float]):
    return {"prediction": model.predict([features])[0]}
```

Three things make this containerizable the way Chapter 1 described: a
pinned `requirements.txt` (`fastapi`, `uvicorn`, `joblib`, `scikit-learn`),
a model file loaded once at startup rather than per request, and a server
that binds to `0.0.0.0` — not `127.0.0.1`, which would refuse connections
from outside the container entirely.

## Build and run it

```
docker build -t ai-inference:1.0 .
docker run -d -p 8000:8000 --name ai-inference ai-inference:1.0
curl -X POST localhost:8000/predict -d '[1.2, 3.4, 5.6]'
```

Exactly the Lesson 4 loop — nothing about an AI app changes `docker build`
or `docker run` themselves. What changes is everything *inside* the
image: larger dependencies, a model file, and (Lesson 8) decisions about
where that model file actually lives.

## Key terms

| Term | Meaning |
|---|---|
| `.dockerignore` | Excludes files from the build context — critical once checkpoints/venvs are nearby |
| Build context bloat | Large, unneeded local files silently slowing or polluting every build |
| `0.0.0.0` vs. `127.0.0.1` | A server bound to localhost-only refuses connections from outside its own container |
| Load-once model | Loading a model file at startup, not per request — the same pattern regardless of framework |

## Check yourself

You're ready for Lesson 8 when you can explain: if `app/main.py` binds
the server to `127.0.0.1` instead of `0.0.0.0`, the container builds and
starts successfully, but `curl localhost:8000/predict` from your host
fails. Why — and which single line would you change to fix it?
