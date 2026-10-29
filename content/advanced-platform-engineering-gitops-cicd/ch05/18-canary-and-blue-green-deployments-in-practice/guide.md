# Lesson 18 — Canary and Blue-Green Deployments in Practice

**Chapter 5 · Advanced CI/CD Pipeline Design · Lesson 18 of 4**

## What you'll learn

- How a canary deployment shifts a small percentage of real traffic to
  a new version, then gradually increases it
- How a blue-green deployment runs two full environments and switches
  traffic instantly, instead of gradually
- The real tradeoffs — blast radius, infrastructure cost, and rollback
  speed — that decide which pattern fits a given service
- How to read a real Argo Rollouts canary step definition

## Canary: a small, growing slice of real traffic

A canary deployment doesn't replace the old version all at once. It
starts by routing a small percentage of live traffic — commonly 10%
— to the new version, while the other 90% keeps hitting the version
that's already proven stable. If the new version looks healthy, the
percentage increases in steps: 10% → 25% → 50% → 100%, with a pause
at each step to watch how it behaves. The name comes from the old
mining practice of sending a canary ahead into a coal mine — if
something's wrong, you find out from the canary, at a small cost,
before everyone is exposed to it.

The mechanism that makes this possible is traffic splitting, usually
done at the ingress or service-mesh layer rather than inside the
application. Argo Rollouts, Flagger, and Istio-based ingress
controllers are the common tools for this — they let you say "send
this percentage of requests to pods running image tag X" without the
application itself knowing anything changed.

## Blue-green: two full environments, one instant switch

Blue-green works differently. Instead of gradually shifting
percentages, you run two complete, independent environments — call
them "blue" (the current live version) and "green" (the new version).
You deploy the new version fully into green while blue keeps serving
100% of traffic, untouched. Once green has been tested and verified,
you switch all traffic to it in one move — typically by repointing a
load balancer or swapping a Kubernetes Service's selector to green's
pods. Blue stays running, idle, as an instant rollback target: if
something's wrong, you flip the switch back.

## The real tradeoff

Canary's advantage is blast radius: if the new version has a bug, it
only ever affects a small percentage of users before the pipeline
(or a human) catches it and halts the rollout. Its cost is that it
needs real traffic-splitting infrastructure, and a bug that only
shows up under certain traffic patterns might not surface until the
percentage climbs.

Blue-green's advantage is rollback speed and environment parity —
because green is a complete, independently-tested environment, there's
no ambiguity about whether it's "ready," and rolling back is a single
switch, not a gradual walk-back. Its cost is that a cutover is
all-or-nothing: the moment you switch, 100% of traffic hits the new
version immediately, so any bug that didn't surface in testing now
affects every user at once. It also usually means paying for two full
environments' worth of infrastructure, at least during the overlap.

Most teams don't pick one pattern platform-wide — a low-traffic
internal service with a fast rollback path might use blue-green for
simplicity, while a customer-facing checkout flow is exactly the kind
of service where canary's small blast radius is worth the added
traffic-splitting complexity.

## A real Argo Rollouts canary step

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: checkout-service
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 10
        - pause: { duration: 5m }
        - setWeight: 25
        - pause: { duration: 5m }
        - setWeight: 50
        - pause: { duration: 10m }
        - setWeight: 100
```

`setWeight: 10` sends 10% of traffic to the new ReplicaSet; `pause`
holds that weight for the given duration before the Rollout controller
advances to the next step. Nothing here mentions how the rollout
decides whether it's safe to advance automatically on its own —
that's the subject of the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| Canary deployment | Gradually shifting an increasing percentage of real traffic from the old version to the new one |
| Blue-green deployment | Running two full environments and switching all traffic instantly from one to the other |
| Blast radius | How much of your traffic/users is affected if the new version has a problem |
| Traffic splitting | Routing a defined percentage of requests to a specific version, usually at the ingress or service-mesh layer |

## Check yourself

You're ready for Lesson 19 when you can explain why a canary's "small
blast radius" advantage depends entirely on someone — or something —
actually watching the metrics during each pause, and what happens if
nobody is.
