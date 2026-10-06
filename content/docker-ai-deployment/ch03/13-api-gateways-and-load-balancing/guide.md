# Lesson 13 — API Gateways & Load Balancing

**Chapter 3 · Deployment Patterns · Lesson 13 of 25**

## What you'll learn

- Why a single deployed service (Lesson 12) still isn't what sits in front
  of real users
- What an API gateway actually does, versus what a load balancer does —
  they're not the same job
- How a real API gateway console flow (create a resource, deploy a stage,
  get an invoke URL) maps onto those jobs
- Why an AI app in particular leans on the gateway for things a plain web
  app often skips: request size limits and per-key rate limiting

## Two different jobs, often confused

Lesson 12 ended with a single service and a default domain. Two more
pieces usually sit in front of that before real traffic reaches it:

```
Load balancer: spreads traffic across MULTIPLE running instances
  of the SAME service, so no one instance gets overwhelmed and a
  crashed instance doesn't take the whole app down.

API gateway: sits in front of one or more services and handles
  cross-cutting concerns — routing by path, auth, rate limiting,
  request/response transformation — BEFORE a request ever reaches
  your application code.
```

A load balancer answers "which healthy instance should handle this
request?" An API gateway answers "should this request even be allowed to
reach an instance, and in what shape?" Many managed platforms (Lesson 12's
App Runner, Cloud Run, Container Apps) bundle basic load balancing in
automatically; the gateway is usually a separate, deliberate layer you add.

## A real gateway console flow

Amazon API Gateway's console walkthrough shows the actual shape of the
job. First, you create a **resource** — a path your API will respond to:

The proxy resource pattern (`/{proxy+}`) is common for AI apps: instead of
defining every endpoint by hand, one resource forwards everything under a
path to your backend, which does its own internal routing.

Once a resource has methods wired to a backend, you **deploy it to a
stage** (`Prod`, `Dev`) and get a real **invoke URL** — the actual public
address clients call, distinct from your backend service's own address.
That same stage screen is also where rate limiting lives: a **rate** and
**burst** limit, in requests per second, enforced at the gateway, before a
request ever reaches your AI service.

Finally, you can **test a method** directly in the console — send a real
request through the gateway's routing and see the response, without
needing a separate HTTP client yet.

## Why this matters more for an AI app

A plain CRUD API's requests are small and roughly uniform. An AI app's
requests aren't: a prompt payload can be large, a single inference call
can be slow and expensive compared to a database read, and a careless
client (or a bug) can hammer an expensive model endpoint in a tight loop.
That's exactly what gateway-level rate limiting and request size limits
exist to catch — before it becomes an autoscaling bill (Chapter 4) or an
outage.

## Key terms

| Term | Meaning |
|---|---|
| Load balancer | Spreads traffic across multiple instances of the same service |
| API gateway | Routes, authenticates, and rate-limits requests before they reach your app |
| Stage | A named deployment of an API (Prod, Dev) with its own invoke URL and limits |
| Rate / burst limit | Requests-per-second caps enforced at the gateway, not your app code |

## Check yourself

You're ready for Lesson 14 when you can explain: if a load balancer
already spreads traffic across instances, what job is left for the API
gateway to do?
