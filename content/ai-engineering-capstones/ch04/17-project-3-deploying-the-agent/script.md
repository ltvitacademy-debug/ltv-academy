# Script — Deploying the Agent

## Segment 1 (title)

Everything built in the last three lessons works as a local script. Deployment exposes assumptions a local run hides. A script holding pending approvals in a Python dict loses every one of them on restart -- and a real deployment restarts, redeploys, and often runs more than one instance. None of that logic changes; where its state lives does.

## Segment 2 (code: a real Dockerfile)

This applies the Docker & Deployment for AI Applications course directly. A minimal Dockerfile installs dependencies and runs the service -- and notice what's not in it: no API key, no database password. Secrets get passed at run time as environment variables, read by the app at startup, never baked into the image.

## Segment 3 (steps: state has to survive a restart)

Pending approvals belong in a real database table, not an in-memory dict -- if the container restarts between a tool call and a reviewer's decision, an in-memory store loses the request entirely. Audit log entries belong in durable storage, not just stdout, which gets rotated or lost on redeploy. An audit trail that can disappear isn't really an audit trail.

## Segment 4 (code: the deployment checklist)

Before calling this deployed: containerized with no secrets baked in, real environment-variable secrets at runtime, pending approvals in a real database table, audit logs in durable storage, and a reachable way for a reviewer to actually see and act on a pending request.

## Segment 5 (outro)

With the agent actually running as a deployed service, Lesson 18 wraps up Project 3 and the whole capstone sequence -- packaging everything you've built for your portfolio.
