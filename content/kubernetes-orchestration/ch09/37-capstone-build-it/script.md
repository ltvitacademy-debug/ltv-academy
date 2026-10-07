# Script — Capstone: Build It

## Segment 1 (title)

With scope defined, this lesson is the actual build — every manifest for product-catalog and checkout, packaged as Helm charts, applied to a cluster, and verified end to end.

## Segment 2 (steps)

Start with the Deployments for both services, same basic shape, with resource requests and limits set from values.yaml. Then configuration: a ConfigMap for non-sensitive settings, and a Secret for checkout's database password specifically — created out of band with kubectl, never committed to Git. Then a Service for each, and one Ingress routing external traffic to both by path.

## Segment 3 (code)

Checkout gets a HorizontalPodAutoscaler, since it's the spiky one. scaleTargetRef points it at checkout's Deployment specifically — product-catalog doesn't need this. minReplicas, maxReplicas, and a CPU utilization target of seventy percent are enough to handle a real traffic spike without overspending at idle.

## Segment 4 (code)

helm lint and helm template first, to catch mistakes before anything's applied. Then helm install, and verify with kubectl get across Pods, Ingress, and the HPA. Then prove the operational story works too — helm upgrade to a new image tag, followed by helm rollback. If a Pod doesn't come up clean, that's lesson thirty-four's playbook: describe the Pod, then check its logs.

## Segment 5 (outro)

That's a fully running, autoscaled, rollback-capable deployment of Northbridge's app, with an Argo CD manifest and runbook alongside it. Final lesson: writing this up and presenting it like the portfolio project it actually is.
