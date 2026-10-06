# Lesson 7 — Deployment & Wrap-Up

**Chapter 2 · Project 1 — Production RAG Knowledge Assistant · Lesson 7 of 23**

## What you'll learn

- How to wrap your `answer_question` function in a minimal FastAPI
  service
- A real Dockerfile for containerizing that service, and how to handle
  the API key safely
- How this deployment maps onto this path's Docker & AI Deployment
  course, instead of re-teaching it from scratch
- What a finished, interview-ready README for this project needs to
  say

## From function to service

Lessons 4-6 gave you a working pipeline: ingest, chunk, embed, store,
retrieve, generate, evaluate. None of that is callable by anyone else
yet — it's still just functions in your own scripts. This lesson closes
that gap: wrapping the pipeline in a minimal API, then a container, so
the assistant is something a reviewer (or a teammate) can actually run
and hit, not just read.

## A minimal API

A single endpoint is enough here — this project isn't about building a
full API surface, it's about proving the pipeline runs as a real
service:

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Question(BaseModel):
    question: str

@app.post("/ask")
def ask(q: Question):
    return answer_question(q.question)
```

`answer_question` is the function you built in Lesson 5, returning the
answer plus its citations — the API layer doesn't change what the
pipeline does, it just makes it reachable over HTTP.

## Containerizing it

This is exactly the territory this path's **Docker & AI Deployment**
course covers in depth — "Packaging a Python AI App" and "Environment
Variables & Secrets in Containers," specifically. Apply it here instead
of re-deriving it:

```
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV ANTHROPIC_API_KEY=""
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

That `ENV ANTHROPIC_API_KEY=""` line exists only to **document** that
the container expects this variable — it does not bake a real key into
the image. Pass the actual value at run time (`docker run -e
ANTHROPIC_API_KEY=... ...`) or through your platform's secret manager,
the same env-vars-and-secrets pattern covered in that course. A key
committed into a Dockerfile or an image layer is a key that's
effectively public the moment that image is pushed anywhere.

## What deployment considerations still apply here

You don't need to rebuild autoscaling or a load balancer for this
project — that was explicitly out of scope back in Lesson 3. What does
matter, even at this small scale: the container starts cleanly from a
fresh `docker build`, the API key is never hardcoded, and the service
survives a restart without losing its Qdrant collection (point your
container at the same Qdrant instance or a persistent volume, not a
throwaway in-memory one).

## Finishing the README

A reviewer reading your README should be able to answer, without
running anything: what this assistant does, how it's built, how well
it performs, and what you'd do differently with more time. Pull
together:

- **Architecture** — a short description of the ingest → chunk → embed
  → retrieve → generate chain, matching Lesson 3's repo layout.
- **Evaluation numbers** — your Lesson 6 recall@k and judge-score
  baseline, plus the number after your tuning change.
- **Tradeoffs and out-of-scope items** — the list from Lesson 3,
  stated plainly.
- **How to run it** — the `docker build` / `docker run` commands and
  an example `curl` call against `/ask`.

## Portfolio wrap-up

This closes Project 1. If your target role (from Lesson 2) points here,
this is the project to keep polishing: a sharper README, a larger eval
set, maybe a short recorded walkthrough. Either way, this project's
patterns — an eval set, measuring instead of guessing, a containerized
API with secrets handled correctly — carry forward directly into
Project 2.

## Key terms

| Term | Meaning |
|---|---|
| Service | A pipeline wrapped in an API so it can be called over HTTP, not just run as a script |
| Secret | A credential like an API key, passed to a container at run time, never baked into the image |
| Portfolio wrap-up | The README and artifacts that let a reviewer evaluate a project without running it themselves |

## Lab

Wrap your `answer_question` function in the FastAPI app above, build
the Docker image, and run it locally with your API key passed as an
environment variable. Hit `/ask` with a real question via `curl` and
confirm the response includes citations. Then update your README with
the architecture summary, your Lesson 6 eval numbers, and your
tradeoffs list.

## Check yourself

- Why does the Dockerfile's `ENV ANTHROPIC_API_KEY=""` line not count
  as "setting" the key?
- Which two lessons of the Docker & AI Deployment course does this
  lesson point to directly, and why those two?
- Name the four things a reviewer should be able to learn from this
  project's README without running any code.
