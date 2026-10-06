# Lesson 23 — Capstone: Containerizing & Deploying a Real AI App

**Chapter 5 · Capstone · Lesson 23 of 25**

## What you'll learn

- A real, working Dockerfile for FeedbackScope, with every line explained
- Why the model gets downloaded at build time here, and what that choice
  trades away (Lesson 8, applied for real)
- The multi-stage build that keeps the final image from carrying build
  tooling it doesn't need at runtime (Lesson 10)
- The actual build, tag, push, and deploy commands, start to finish

## FeedbackScope's Dockerfile

```dockerfile
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY app.py .
RUN python -c "from transformers import pipeline; \
  pipeline('sentiment-analysis')"
EXPOSE 8080
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
```

This is Lesson 10's multi-stage pattern for real: the `builder` stage
installs every Python package, including the compilers and build tools
`pip` sometimes needs — but only the installed packages get copied into
the final stage, not the tools used to install them. The `RUN python -c`
line is deliberate too: it downloads and caches the model weights into
the image **at build time**, so a running container never has a
first-request delay waiting on a model download — the trade-off from
Lesson 8, made concretely, in favor of a bigger image instead of a slower
cold start.

## Build, tag, and push

```
docker build -t feedbackscope:v1 .
docker tag feedbackscope:v1 123456789.dkr.ecr.us-east-1.amazonaws.com/feedbackscope:v1
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/feedbackscope:v1
```

A real version tag (`v1`), not `latest` — Lesson 16's rollback strategy
only works if there's a specific previous tag to roll back *to*. `latest`
by itself doesn't give you that.

## Deploying it

```
Runtime:        Python 3 (container image)
Container image: 123456789.dkr.ecr.us-east-1.amazonaws.com/feedbackscope:v1
Port:            8080
Health check:    GET /health -> 200 OK
```

This is Lesson 12's two-screen pattern again — point the platform at the
pushed image and the port it listens on, and add the health check
endpoint the platform will poll to decide the instance is alive. After
this deploy, FeedbackScope has a real public URL and can be called with a
POST to `/analyze`.

## What's still missing (on purpose)

This deploy is deliberately minimal: no autoscaling policy beyond the
platform's defaults, no caching, one instance. That's exactly what
Lesson 24 adds next — this lesson's job was only to get a real,
working, publicly reachable container running, which has to exist before
any scaling decision makes sense.

## Key terms

| Term | Meaning |
|---|---|
| Multi-stage build | Build tools stay in the builder stage; only installed packages reach the final image |
| Build-time model caching | Downloading model weights during the image build, not on first request |
| Version tag | A specific, stable tag (not `latest`) that rollback can target |

## Check yourself

You're ready for Lesson 24 when you can explain: why does downloading the
model weights during `docker build` instead of on first request matter
specifically for cold starts (Lesson 18)?
