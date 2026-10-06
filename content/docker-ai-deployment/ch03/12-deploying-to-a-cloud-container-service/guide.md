# Lesson 12 — Deploying to a Cloud Container Service

**Chapter 3 · Deployment Patterns · Lesson 12 of 25**

## What you'll learn

- What a managed cloud container service actually adds on top of the image
  you built in Chapters 1-2
- The two things every one of these services asks you to configure: how to
  **build** your app, and how to **run** it
- How to read a real deploy from "pending" to a live, public URL
- That AWS App Runner, Amazon ECS on Fargate, Google Cloud Run, and Azure
  Container Apps are different products solving the same problem the same
  way

## From a tagged image to a running service

Chapter 2 ended with an image sitting in a registry (Lesson 6) — built,
tagged, pushed, and going nowhere on its own. A cloud container service is
the thing that actually runs it: it pulls your image, starts a container
from it, gives that container a public URL, and keeps it running if it
crashes. You stop managing a server and start managing a service
definition.

Every mainstream option does this the same way: AWS App Runner, Amazon ECS
on Fargate, Google Cloud Run, and Azure Container Apps. This lesson walks
AWS App Runner's console because it's the most compact version of the
flow — but the two screens below exist, with different names, in all four.

## Screen one: configure the build

```
Runtime:         Python 3
Build command:   pip install -r requirements.txt
Start command:   python server.py
Port:            8080
```

This is the same information as your Dockerfile's `RUN` and `CMD`
instructions (Lesson 3) — restated as form fields instead of file lines,
because App Runner can build directly from a source repo instead of
requiring a pre-built image. If you're deploying an image you already
built and pushed yourself, this screen is skipped — the port is still
asked for, because the platform needs to know which port your container
listens on to route traffic to it.

## Screen two: configure the service

```
Service name:        python-test
Virtual CPU & memory: 1 vCPU, 2 GB
Environment variables: (Lesson 9's secrets go here, never baked into the image)
Auto scaling:         how many container instances, and when to add more
Health check:         the URL the platform pings to decide "is this instance alive?"
```

This is the resource envelope: how much CPU/memory each container instance
gets, what environment variables it starts with, and — the two settings
that matter most once real traffic shows up — the autoscaling policy
(Chapter 4) and the health check endpoint the platform uses to decide
whether to route traffic to an instance or restart it.

## What a live deploy looks like

Once you hit deploy, the console shows the service moving through states —
"Operation in progress" to "Running" — and once it's live you get a
**default domain**: a real, public HTTPS URL, plus the service's ARN and
the source it was built from. That's the deliverable: an AI app that was
a Dockerfile on your laptop an hour ago is now a public endpoint someone
else can call.

## Key terms

| Term | Meaning |
|---|---|
| Managed container service | Pulls your image, runs it, gives it a URL, restarts it on failure — AWS App Runner / ECS Fargate, GCP Cloud Run, Azure Container Apps |
| Build configuration | Runtime, build command, start command, port — what to run |
| Service configuration | CPU/memory, env vars, autoscaling, health check — how to run it |
| Default domain | The public HTTPS URL the platform assigns your running service |

## Check yourself

You're ready for Lesson 13 when you can explain: why does the port number
matter to the platform even when you're deploying an image you already
built, rather than letting App Runner build from source?
