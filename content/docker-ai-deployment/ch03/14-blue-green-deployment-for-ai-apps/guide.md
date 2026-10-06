# Lesson 14 — Blue-Green Deployment for AI Apps

**Chapter 3 · Deployment Patterns · Lesson 14 of 25**

## What you'll learn

- What "blue-green" actually means as a deployment pattern
- Why it trades extra cost for near-zero-downtime releases
- The one extra wrinkle an AI app adds that a stateless web app doesn't have
- How the switch itself happens at the router/gateway layer from Lesson 13

## The core idea

Blue-green deployment keeps two complete, independent environments running
at once — only one of them is live at any moment:

```
BLUE  (currently live)   <- 100% of traffic
GREEN (new version)      <- 0% of traffic, fully deployed, warmed up

Switch happens at the gateway/load balancer (Lesson 13):
  BLUE  <- 0% of traffic
  GREEN <- 100% of traffic      (instant cutover)
```

The new version (green) is deployed fully and verified — health checks
passing, smoke tests run — entirely before it receives a single real
user's request. The cutover itself is just a routing change at the load
balancer or gateway, not a redeploy, so it's effectively instant. If
something's wrong, you flip traffic straight back to blue (Lesson 16
covers this as a rollback strategy in its own right).

## What it costs, what it buys

```
Cost:    you run BOTH environments fully, at full capacity,
         for the duration of the switch (double the compute)

Buys:    the switch itself causes zero downtime, and a bad
         release is undone by a routing change, not a redeploy
```

That doubled cost is temporary — blue is torn down once green is confirmed
healthy — but during the overlap you're paying for two full environments.
For a small, cheap service that's a rounding error. For an AI app running
GPU-backed inference containers, running two full copies even briefly is a
real, visible cost — one more reason Chapter 4's cost-aware scaling
decisions matter here too.

## The wrinkle specific to AI apps

A stateless web app's blue and green environments are identical in every
way that matters to a request. An AI app's two environments can genuinely
behave differently even when the *code* is unchanged:

```
Same application code, different behavior:
  - model weights pinned to a different version/checkpoint
  - a different base image with a different inference library version
  - a different GPU driver / CUDA version on the new instance type
```

That means blue-green for an AI app needs a verification step a plain web
app's smoke test doesn't: confirming green's model actually produces
equivalent outputs on a known set of test prompts, not just that it
returns HTTP 200. A green environment that's "up" but silently serving a
different model checkpoint is a worse failure than an outage, because
nothing alerts on it by itself.

## Key terms

| Term | Meaning |
|---|---|
| Blue environment | The currently-live version, serving 100% of traffic |
| Green environment | The new version, fully deployed and verified before any traffic hits it |
| Cutover | The routing switch at the gateway/load balancer — not a redeploy |
| Model equivalence check | AI-specific verification that green's model outputs match blue's on known prompts |

## Check yourself

You're ready for Lesson 15 when you can explain: why is confirming green
returns HTTP 200 not enough for an AI app's blue-green switch, when it
would be enough for a typical stateless web app?
