# Blue-Green Deployment for Models

Canary deployments shift traffic gradually, a few percent at a time, and tolerate the new and old models running side by side for a while. Blue-green deployment takes the opposite approach: build the entire new environment in full, validate it completely while it's receiving zero real traffic, and then cut over all at once. It trades gradual exposure for a single, fast, fully reversible switch.

## What you'll learn

- How blue-green deployment differs from canary, and when that tradeoff is worth it
- How to implement the cutover with a Kubernetes Service selector swap
- How to implement the same pattern with an Istio `VirtualService` weight flip
- Why keeping the old environment ("blue") running after cutover is the whole point
- The main cost of blue-green that canary avoids

## The core idea

Two complete, independent environments exist at once:

- **Blue** — the current production environment, actively serving all live traffic
- **Green** — a full copy of the serving infrastructure running the new model version, fully deployed and ready, but receiving no real user traffic yet

Green gets tested against synthetic traffic, smoke tests, or even a shadow-mirrored copy of real traffic (Lesson 23) while it's live but idle. Once it's verified, the cutover happens by changing where traffic is routed — not by changing what's deployed.

## Cutover with a Kubernetes Service selector

If blue and green are two separate Deployments behind a single Service, the cutover is a one-line change to which Deployment the Service's selector points at:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: fraud-detector
spec:
  selector:
    app: fraud-detector
    version: green   # was: blue
  ports:
    - port: 8080
```

```bash
kubectl patch service fraud-detector \
  -p '{"spec":{"selector":{"version":"green"}}}'
```

The instant this patch applies, every new connection routes to green; blue keeps running, untouched, receiving nothing.

## Cutover with Istio traffic weight

The same idea works through an Istio `VirtualService`, by flipping the weight from 100/0 to 0/100 in one update instead of ramping gradually like a canary:

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: fraud-detector
spec:
  http:
    - route:
        - destination:
            host: fraud-detector-blue
          weight: 0
        - destination:
            host: fraud-detector-green
          weight: 100
```

This is the same resource type used for canary traffic splits in Lesson 23 — the difference is entirely in how it's used: canary ramps a weight slowly across many updates, blue-green flips it once.

## Why blue stays running after cutover

The entire value of blue-green is that rollback is as fast as cutover: if green shows a problem five minutes after going live, the fix is reverting the Service selector or the traffic weight back to blue — which is still fully deployed, warm, and ready, not something that has to be rebuilt from an old artifact. Tearing blue down immediately after cutover throws away that safety net for no real benefit; keep it running for a defined soak period (commonly hours, sometimes a full day) before decommissioning it.

## The cost blue-green avoids and the one it doesn't

Blue-green avoids the slow, multi-step ramp-up a canary requires, and it avoids ever running the old and new model for the *same* request — there's no ambiguity about which version served which user. What it doesn't avoid is cost: two full production-capacity environments have to run simultaneously during the overlap window, which is the real tradeoff against canary's gradual, resource-light traffic shift.

## Key terms

| Term | Meaning |
|---|---|
| Blue environment | The current, live production environment serving all traffic |
| Green environment | A fully deployed copy running the new version, idle until cutover |
| Cutover | The single traffic-routing change that moves all traffic from blue to green |
| Service selector | The Kubernetes field that determines which Pods a Service routes to |
| Soak period | The time blue is kept running after cutover, in case a fast rollback is needed |

## Recap

Blue-green deployment builds a complete, idle copy of production, validates it fully, and cuts over all at once — via a Kubernetes Service selector or an Istio traffic weight flip — trading canary's gradual exposure for a single reversible switch, at the cost of running two full environments at once. That closes out Chapter 5's deployment strategies. Next, Chapter 6 turns to data and model versioning — starting in Lesson 27 with the tools that make a dataset itself trackable the way Git tracks code.
