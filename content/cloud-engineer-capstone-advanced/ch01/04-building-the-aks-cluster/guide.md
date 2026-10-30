# Lesson 4 — Building the AKS Cluster

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 4 of 26**

## What you'll learn

- How to provision a real, production-sized AKS cluster spread across multiple availability zones
- How to size a node pool and configure the cluster autoscaler for a workload that needs to
  scale out fast during a traffic spike
- How to write a Deployment with real resource requests/limits and a HorizontalPodAutoscaler —
  the parts of "production-ready" that are easy to remember
- Why this lesson's cluster build, done carefully and under real deadline pressure, still leaves
  one gap that won't surface until Lesson 10 — and why that's worth sitting with, not skipping past

## Provisioning the cluster

Theo provisions the primary AKS cluster in `East US 2`, a region with three availability zones,
resource group `rg-driftwood-prod`:

```bash
az aks create \
  --resource-group rg-driftwood-prod \
  --name driftwood-prod-aks \
  --location eastus2 \
  --zones 1 2 3 \
  --node-count 3 \
  --node-vm-size Standard_D4s_v5 \
  --enable-cluster-autoscaler \
  --min-count 3 \
  --max-count 15 \
  --network-plugin azure \
  --generate-ssh-keys
```

The `--zones 1 2 3` flag is what actually matters here: it tells AKS to spread the node pool's VMs
across all three availability zones in the region, so losing one zone's power or network doesn't
take down the whole cluster. The cluster autoscaler range (3 to 15 nodes) gives the platform room
to grow automatically as pods are scheduled during the sale, without Theo manually resizing
anything.

## Sizing the application node pool

The default node pool above is really for system workloads. Theo adds a second, dedicated pool for
the storefront services:

```bash
az aks nodepool add \
  --resource-group rg-driftwood-prod \
  --cluster-name driftwood-prod-aks \
  --name apppool \
  --zones 1 2 3 \
  --node-vm-size Standard_D4s_v5 \
  --enable-cluster-autoscaler \
  --min-count 3 \
  --max-count 15 \
  --mode User
```

Separating a `User` mode pool from the `System` pool is a real best practice — it keeps
Kubernetes's own control-plane-adjacent workloads from competing for capacity with
`catalog-api`, `checkout-api`, and `cart-api` when traffic spikes.

## The Deployment, with real resource limits

Here's `checkout-api`'s Deployment — the service under the most pressure during the sale,
since every completed purchase goes through it:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout-api
  namespace: storefront
spec:
  replicas: 6
  selector:
    matchLabels:
      app: checkout-api
  template:
    metadata:
      labels:
        app: checkout-api
    spec:
      containers:
        - name: checkout-api
          image: driftwoodacr.azurecr.io/checkout-api:2.3.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: "500m"
              memory: "512Mi"
            limits:
              cpu: "1"
              memory: "1Gi"
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 5
```

And the HorizontalPodAutoscaler that lets it scale out automatically under load:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: checkout-api-hpa
  namespace: storefront
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: checkout-api
  minReplicas: 6
  maxReplicas: 30
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 65
```

Resource requests and limits, a readiness probe, and an HPA tuned to scale from 6 to 30 replicas
on CPU — on paper, and against most checklists, this is a solid, production-shaped Deployment.

## What this Deployment doesn't say

Read the manifest again, specifically the `spec.template.spec` block: there's nothing in it that
tells the Kubernetes scheduler *where*, relative to other `checkout-api` pods, each new pod should
land. No `topologySpreadConstraints`, no `podAntiAffinity`. That's not a typo — the manifest above
is a faithful, honest representation of what ships in this lesson. Without one of those fields, the
scheduler is free to place pods anywhere the node pool has room, including concentrating several
of them onto nodes in the same availability zone if that's simply where capacity happens to be
when the HPA scales out.

At the replica counts and traffic Theo's validating against today — a handful of pods, spread
across a freshly built, evenly empty node pool — this doesn't show up as a problem at all, because
pod placement tends to look even when nodes start out identically empty. The gap is real, but it's
quiet. It takes a very specific kind of event — a fast scale-out under genuinely uneven real
traffic, which Lesson 8's test and Lesson 9's sale look at from two different angles — for the gap
to actually matter. Under the deadline this platform review is running on, with a working,
autoscaling, resource-limited Deployment already checked off the list, it's an easy thing to leave
for "a later hardening pass" rather than catch here. This capstone comes back to exactly what that
gap costs, starting in Lesson 10.

## Key terms

| Term | Meaning |
|---|---|
| Availability zone (AZ) | A physically separate datacenter facility within a region, with independent power and networking from other AZs in the same region |
| Cluster autoscaler | The AKS feature that adds or removes nodes automatically based on pending pod demand |
| HorizontalPodAutoscaler (HPA) | A Kubernetes object that changes a Deployment's replica count automatically based on a metric like CPU utilization |
| `topologySpreadConstraints` / `podAntiAffinity` | Deployment fields that tell the scheduler to spread or separate pods across zones or nodes — both absent from this lesson's manifest |

## Lab

1. Provision (or write out, if you don't have a live Azure subscription) the `az aks create` and
   `az aks nodepool add` commands above, confirming the `--zones 1 2 3` flag on both.
2. Write the `checkout-api` Deployment and HPA YAML yourself, then read back through
   `spec.template.spec` specifically looking for any pod-placement field. Write one sentence on
   what's missing and what you'd expect to happen to pod placement without it.

## Check yourself

You're ready for Lesson 5 when you can explain why `--zones 1 2 3` matters, what the HPA does, and
— specifically — what field is absent from the Deployment that would otherwise tell the scheduler
how to spread `checkout-api`'s pods across availability zones.
