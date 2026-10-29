# Lesson 9 — Kubernetes as the Real Portability Layer

**Chapter 3 · Workload Portability Across Clouds · Lesson 1 of 4**

## What you'll learn

- Why a Kubernetes workload is the closest thing to genuinely portable
  infrastructure that exists across AKS, EKS, and on-prem clusters
- What "the same API surface" actually means, concretely, in terms of
  the YAML you write and the `kubectl` commands you run
- Which parts of a real cluster are **not** part of that portable
  surface — storage classes, ingress controllers, load balancer
  provisioning, and node identity — and why those are where the real
  work lives
- How to read a Deployment/Service manifest and tell, line by line,
  which parts travel unchanged between clouds and which parts don't

## The Kubernetes API is the portability boundary

In course 9 you built real workloads against the Kubernetes API —
Deployments, Services, ConfigMaps, Secrets, PersistentVolumeClaims.
That API is a formal, versioned contract (`apps/v1`, `v1`, and so on)
that every conformant Kubernetes distribution implements identically.
AKS, EKS, GKE, a bare-metal `kubeadm` cluster, and OpenShift all pass
the CNCF conformance test suite, which means the exact same
`Deployment` manifest produces the exact same behavior — the same
rolling-update semantics, the same readiness/liveness probe handling,
the same label-selector matching — regardless of which cloud (or no
cloud) is running the control plane underneath it.

That's the real portability story: it isn't that "Kubernetes runs
everywhere" in some vague marketing sense, it's that **the API object
you declare is the unit of portability**, not the cluster, not the
nodes, and not the cloud account it happens to run in.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 3
  selector:
    matchLabels: { app: order-service }
  template:
    metadata:
      labels: { app: order-service }
    spec:
      containers:
        - name: order-service
          image: registry.example.com/order-service:1.4.2
          ports: [{ containerPort: 8080 }]
          readinessProbe:
            httpGet: { path: /healthz, port: 8080 }
---
apiVersion: v1
kind: Service
metadata:
  name: order-service
spec:
  selector: { app: order-service }
  ports: [{ port: 80, targetPort: 8080 }]
  type: ClusterIP
```

`kubectl apply -f order-service.yaml` against this manifest behaves
identically whether that cluster is an AKS node pool in East US, an
EKS node group in us-east-1, or a Rancher-managed cluster on
company-owned hardware. Nothing in it names a cloud.

## Where the portability actually ends

That honesty matters, because the moment you need the cluster to talk
to the outside world or to durable storage, you cross out of the
conformant API surface and into provider-specific implementation
details hiding behind generic-looking object kinds:

- **`type: LoadBalancer`** on a Service is a real Kubernetes API field,
  but what it *does* is call out to a cloud controller manager — Azure
  provisions an Azure Load Balancer, AWS provisions a Classic or
  Network Load Balancer, and on-prem it typically does nothing at all
  unless MetalLB or a similar add-on is installed. Same YAML, three
  different outcomes.
- **`StorageClass`** names are not standardized — `managed-csi` on AKS,
  `gp3` or `ebs-sc` on EKS, whatever your on-prem CSI driver registers.
  A PersistentVolumeClaim that references a StorageClass by name will
  fail to bind on a cluster where that name doesn't exist.
- **Ingress controllers** vary in which annotations they honor — an
  `nginx.ingress.kubernetes.io/...` annotation does nothing on a
  cluster running the AWS Load Balancer Controller instead, even
  though both implement the same `Ingress` kind.
- **Node identity and IAM binding** — how a pod gets cloud credentials
  (Azure Workload Identity vs. IAM Roles for Service Accounts on EKS)
  is entirely provider-specific and sits outside the Kubernetes API
  itself.

## The practical takeaway

Treat the Deployment/Service/ConfigMap/Secret layer as your genuinely
portable core, and treat StorageClass names, Ingress annotations, and
LoadBalancer behavior as an environment-specific overlay you manage
deliberately — often with a small set of per-cloud values files or
Kustomize overlays — rather than something you can paper over and
forget about. The next lesson builds on exactly this seam: abstracting
the cloud-specific *services* a workload depends on, the same way this
lesson abstracted the workload's own runtime.

## Key terms

| Term | Meaning |
|---|---|
| Kubernetes API conformance | A CNCF test suite that guarantees a given object kind (Deployment, Service, etc.) behaves identically across distributions |
| Cloud controller manager | The provider-specific component that implements `LoadBalancer` Services and other cloud-integration behavior behind a generic API |
| StorageClass | A cluster-specific name mapping a PersistentVolumeClaim request to a real storage backend; names are not standardized across clouds |
| CSI / CNI driver | Pluggable interfaces for storage and networking that let the same API kind bind to very different underlying implementations |

## Check yourself

You're ready for Lesson 10 when you can explain why `kubectl apply`
against the same Deployment manifest is genuinely portable, but a
`type: LoadBalancer` Service in that same manifest is not — and name
two other object fields that carry the same hidden, cloud-specific
behavior.
