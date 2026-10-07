# Canary & Shadow Deployments

A model that passed every offline validation check can still behave badly the moment it meets real, live traffic — distributions shift, edge cases nobody tested show up, latency changes under real load. Canary and shadow deployments are the two main ways to find that out before it affects every user, rather than after.

## What you'll learn

- The difference between a shadow deployment and a canary deployment
- How to mirror live traffic to a shadow model without it ever affecting a real response
- How to implement a traffic-split canary with an Istio `VirtualService`
- What metrics actually decide whether a canary gets promoted or killed
- Why shadow and canary are often used together, not as alternatives

## Shadow deployments: zero user impact

In a shadow deployment, the new model receives a copy of every live request, runs inference, and logs its prediction — but its output is never returned to the user. The production model's response is the only one that reaches the client. Shadowing answers "what would this model have said?" with zero risk, because nothing it does can change what any real user sees.

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: fraud-detector
spec:
  hosts:
    - fraud-detector.ml-serving.svc.cluster.local
  http:
    - route:
        - destination:
            host: fraud-detector-v3
            port:
              number: 8080
          weight: 100
      mirror:
        host: fraud-detector-v4-shadow
        port:
          number: 8080
      mirrorPercentage:
        value: 100.0
```

The `mirror` field is the key: Istio duplicates the request to `fraud-detector-v4-shadow` and discards its response, while the real response always comes from the `weight: 100` route. Shadow mode is how you validate latency and prediction behavior on real production traffic with literally no user-facing risk — the cost is that you have to run the shadow model's full infrastructure just to throw its answers away.

## Canary deployments: small, real, reversible exposure

A canary deployment sends a small percentage of real traffic to the new model and lets its predictions actually reach those users, while a metrics-based gate decides whether to grow that percentage or kill it.

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: fraud-detector
spec:
  hosts:
    - fraud-detector.ml-serving.svc.cluster.local
  http:
    - route:
        - destination:
            host: fraud-detector-v3
            port:
              number: 8080
          weight: 95
        - destination:
            host: fraud-detector-v4
            port:
              number: 8080
          weight: 5
```

Here, 5% of requests are actually served by `v4` and its predictions are the ones real users act on. If metrics stay healthy, a platform team (or an automated progressive-delivery controller) ratchets the weight up: 5 → 25 → 50 → 100. If metrics regress, the weight drops back to zero — covered in full in Lesson 24.

## What a canary actually gets evaluated on

Picking the wrong signal makes a canary meaningless. A useful canary gate watches:

- **Prediction-level metrics**, not just infrastructure health — latency and error rate matter, but so does the distribution of the model's own output scores compared to the incumbent's
- **Business outcome proxies** where available — approval rate, fraud catch rate, click-through — not just "the service returned 200"
- **Segment-level breakdowns**, the same way a validation gate does — a canary that looks fine in aggregate can be quietly worse for one customer segment

## Shadow first, then canary — not either/or

The two techniques answer different questions and are commonly chained: shadow a new model against 100% of traffic for a period to catch latency and gross prediction issues with zero risk, and only once that looks clean, promote it to a small real canary to validate against actual business outcomes that a shadow model's discarded predictions can't measure (you can't know if a discarded "approve this loan" prediction would have been a good business decision).

## Key terms

| Term | Meaning |
|---|---|
| Shadow deployment | A model receives mirrored live traffic and its output is logged, never returned to the user |
| Canary deployment | A small, real percentage of traffic is actually served by the new model |
| Traffic split | The weighted routing rule (e.g. 95/5) that determines which model serves a given request |
| Mirror (Istio) | The field that duplicates a request to a second destination without affecting the primary response |
| Progressive delivery | Gradually increasing a canary's traffic share based on live metrics |

## Recap

Shadow deployments let a new model see real traffic with zero risk by discarding its output; canary deployments send a small, real slice of traffic to the new model and watch prediction-level and business-outcome metrics before growing its share. The two are usually chained, shadow first, canary second. Next, in Lesson 24, you'll see exactly how a canary (or any deployment) gets rolled back when those metrics go wrong.
