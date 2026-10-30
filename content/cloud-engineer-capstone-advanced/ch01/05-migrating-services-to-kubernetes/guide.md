# Lesson 5 — Migrating Services to Kubernetes

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 5 of 26**

## What you'll learn

- How to move `catalog-api`, `checkout-api`, and `cart-api` onto the AKS cluster using the
  parallel-path approach Lesson 2 scoped
- How to confirm a migrated service is actually healthy with `kubectl`, not just "the pods say
  Running"
- Why "it works" and "it works correctly distributed across the cluster" are two different checks
  — and which one this lesson actually performs

## The parallel-path cutover

Each of the three storefront services gets its own Service object routing to its Deployment, and
an Ingress rule that can be flipped from the old path to the new one:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: checkout-api
  namespace: storefront
spec:
  selector:
    app: checkout-api
  ports:
    - port: 80
      targetPort: 8080
```

Theo deploys all three services onto AKS, verifies each one responds correctly behind its Service,
and only then flips the Ingress weight from the old infrastructure to the new cluster — first for
`catalog-api`, the lowest-risk of the three (read-only, no payment data), then `cart-api`, then
`checkout-api` last, since it's the one every completed sale depends on.

```bash
kubectl apply -f catalog-api/
kubectl apply -f cart-api/
kubectl apply -f checkout-api/
kubectl get pods -n storefront
```

```
NAME                             READY   STATUS    RESTARTS
catalog-api-6b9d8f7c5-2k9pw      1/1     Running   0
catalog-api-6b9d8f7c5-j4m2q      1/1     Running   0
cart-api-7f8c9d6b4-x9k1z         1/1     Running   0
cart-api-7f8c9d6b4-p3m8n         1/1     Running   0
checkout-api-5d7b8c9f6-k2j9m     1/1     Running   0
checkout-api-5d7b8c9f6-m8x4p     1/1     Running   0
checkout-api-5d7b8c9f6-q7n3r     1/1     Running   0
checkout-api-5d7b8c9f6-r5t6v     1/1     Running   0
checkout-api-5d7b8c9f6-s2w9y     1/1     Running   0
checkout-api-5d7b8c9f6-t4u7w     1/1     Running   0
```

## Confirming the migration actually worked

"The pods say Running" is necessary but not sufficient. Theo runs the checks the intermediate
project's testing lesson established as the real bar: hit each service's real endpoints through
the Ingress, not just `kubectl exec` into a pod, and confirm response shapes haven't changed —
since Lesson 2 scoped this as a migration with no API contract changes allowed.

```bash
curl -s https://shop.driftwoodapparel.com/api/catalog/products/4821 | jq .
curl -s -X POST https://shop.driftwoodapparel.com/api/cart/items -d '{"sku":"4821","qty":1}'
curl -s -X POST https://shop.driftwoodapparel.com/api/checkout/session
```

Every response matches the old infrastructure's contract exactly. Theo also checks
`kubectl get pods -n storefront -o wide`, which prints each pod's node, and spot-checks that pods
landed on more than one node — confirming the Deployment isn't accidentally pinned to a single
machine.

## The check this lesson does NOT perform

Here's the honest limit of today's validation: Theo confirms pods are healthy, responding
correctly, and spread across *more than one node*. He does not specifically check which
*availability zone* each pod landed in, or whether that distribution would hold up once the HPA
scales `checkout-api` from 6 replicas to 30 under real load. At today's traffic — the normal,
pre-sale baseline — six `checkout-api` pods spread themselves across nodes that happen to cover
more than one zone, which looks like exactly the healthy, distributed picture you'd want to see.

That's a real, reasonable validation for *this* lesson's job: confirming the migration preserved
correct behavior. It's not the same validation as confirming the cluster behaves correctly under
sale-scale traffic — that's a distinct, harder question this capstone deliberately defers to
Lesson 8's load test, and ultimately to the sale itself in Lesson 9.

## Key terms

| Term | Meaning |
|---|---|
| Parallel-path cutover | Running the new infrastructure alongside the old, validating it, then shifting live traffic over incrementally rather than all at once |
| Ingress weight | The proportion of traffic an Ingress controller sends to one backend versus another, used to shift traffic gradually |
| `kubectl get pods -o wide` | Prints each pod's assigned node (not its availability zone) alongside its normal status fields |
| Contract preservation | Confirming a migrated service's external behavior (request/response shapes) is unchanged, as scoped in Lesson 2 |

## Lab

1. Write the `kubectl apply` sequence and the three `curl` checks above in your own words, and
   explain why `catalog-api` is cut over first and `checkout-api` last.
2. Run (or write out) `kubectl get pods -n storefront -o wide` and explain what the `NODE` column
   tells you — and, just as importantly, what it does *not* tell you about zone distribution.

## Check yourself

You're ready for Lesson 6 when you can explain the order services were cut over and why, what
"the pods say Running" fails to prove on its own, and why today's spot-check of node distribution
is a different, narrower claim than "this will distribute correctly once the HPA scales out under
real sale traffic."
