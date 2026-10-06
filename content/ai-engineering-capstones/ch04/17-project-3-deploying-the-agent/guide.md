# Lesson 17 — Deploying the Agent

**Chapter 4 · Project 3 — Tool-Using Agent With Human Approval · Lesson 17 of 23**

## What you'll learn

- Why "it works when I run it locally" isn't the same bar as "it works
  deployed" for this specific project
- A real, minimal Dockerfile for packaging the agent, applying the
  Docker & Deployment for AI Applications course directly
- Why pending approvals and audit logs can't live in memory once the
  agent is a deployed service
- A short deployment checklist that closes the gaps a local script gets
  away with

## What changes when this moves off your laptop

Everything built in Lessons 14–16 works as a local script. Deployment
exposes assumptions a local run hides. A script that holds pending
approvals in a Python dict loses every one of them on restart — and a
real deployment restarts, redeploys, and often runs more than one
instance. An agent that print()s its audit log loses that record the
moment the process stops. None of Lessons 14–16's logic changes; where
its *state* lives does.

## Package it with a real Dockerfile

This applies the Docker & Deployment for AI Applications course's
fundamentals directly — writing a Dockerfile, managing dependencies, and
handling secrets through environment variables, not anything new:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PYTHONUNBUFFERED=1
CMD ["python", "agent_service.py"]
```

Notice what's *not* in this file: no API key, no database password.
Secrets are passed at `docker run` time (or by your platform's secrets
manager) as environment variables — `ANTHROPIC_API_KEY`,
`DATABASE_URL` — read by the app at startup, never baked into the image
where anyone with the image could read them back out.

## State has to survive a restart

Lesson 15's pending-approval record and Lesson 16's audit log both have
to be durable once this is a real service:

- **Pending approvals** belong in a real database table (even a simple
  one), not an in-memory dict. If the container restarts between a tool
  call and a reviewer's decision, an in-memory store loses the pending
  request entirely — the reviewer's eventual "approve" click would have
  nothing to act on.
- **Audit log entries** belong in durable storage — a database table or
  a log pipeline that ships off the container — not just `stdout`.
  Container logs are often rotated or lost on redeploy; an audit trail
  that can disappear isn't really an audit trail.

## A short deployment checklist

- [ ] Containerized with a Dockerfile that installs dependencies and
  runs the service — no secrets baked in
- [ ] `ANTHROPIC_API_KEY`, database credentials, and any other secrets
  passed as environment variables at runtime
- [ ] Pending approvals stored in a real database table, not in-process
  memory
- [ ] Audit log entries written to durable storage, not just stdout
- [ ] A reachable way for a reviewer to see and act on pending requests
  (even a simple authenticated endpoint is enough for a portfolio
  project)

## Key terms

| Term | Meaning |
|---|---|
| Durable state | Data that survives a process restart — a database row, not an in-memory variable |
| Environment variable secrets | Credentials passed to a running container at runtime, never written into the image itself |
| Container restart | A normal, expected event in deployment that any state the agent depends on must survive |

## Lab

Write a Dockerfile for your own Project 3 agent following the pattern
above. Move its pending-approval store and audit log from memory/stdout
into a real database table (or confirm they already are, if you built
Lessons 15–16 against a real database from the start). Run the
container locally with secrets passed as environment variables and
confirm a restart doesn't lose a pending approval.

## Check yourself

- Why does an in-memory dict for pending approvals work in a local
  script but break in a deployed service?
- Where do `ANTHROPIC_API_KEY` and database credentials belong in the
  Dockerfile above, and where do they actually get supplied?
- What specifically breaks if audit log entries only go to `stdout`?
