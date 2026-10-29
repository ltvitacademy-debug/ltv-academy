# Lesson 30 — Lab: A Portable Workload Deployed Identically to Two Clouds

**Chapter 8 · Capstone: Designing a Hybrid/Multi-Cloud Architecture · Lesson 30 of 32**

## What you'll learn

- How to take the Kubernetes portability boundary from Lesson 9 and the multi-cloud Terraform
  modules from Lesson 11 and actually run the same workload on AKS and EKS at once
- Why "the same module" has to mean the same `module` block called twice with different provider
  inputs, not two hand-maintained copies of similar-looking Terraform
- Where the per-cloud seams really are in practice — StorageClass names and ingress annotations —
  and how a small values file handles them without touching the portable core
- How to verify, concretely, that both deployments are actually behaving identically rather than
  just assuming it because the YAML is the same

## The workload

Alderney Health Systems' burst-compute job from Lesson 29 is packaged as a containerized
Kubernetes workload — a Deployment and a Service, built the same portable way Lesson 9 described.
Alderney's leadership has one more requirement for this capstone: the same workload has to be
provable on both Azure and AWS, so that if an ExpressRoute-only Azure burst path ever becomes
unavailable, the workload can fail over to an AWS-hosted cluster without a rewrite. That's not a
hypothetical exercise — it's exactly the kind of workload portability this course has been
building toward since Chapter 3.

## Step 1: reuse the multi-cloud module from Chapter 3, don't rewrite it

Lesson 11 built a Terraform module structure that takes the same input variables and provisions
either an AKS cluster or an EKS cluster, depending on which provider block calls it. This lab calls
that exact module twice:

```hcl
module "cluster_azure" {
  source          = "../../modules/k8s-cluster/azure"
  cluster_name    = "alderney-burst-aks"
  node_count      = 3
  kubernetes_version = "1.29"
}

module "cluster_aws" {
  source          = "../../modules/k8s-cluster/aws"
  cluster_name    = "alderney-burst-eks"
  node_count      = 3
  kubernetes_version = "1.29"
}
```

Both calls pass identical `node_count` and `kubernetes_version` values — the only differences
between dev's AKS cluster and prod's EKS cluster are the ones each cloud's provider genuinely
requires, not ones invented out of habit. Two clusters, one shared module source, exactly the
pattern Lesson 11 established.

## Step 2: deploy the portable core unchanged, to both clusters

The Deployment and Service manifest doesn't change at all between the two clusters, because
nothing in it is cloud-specific:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: claims-burst-worker
spec:
  replicas: 3
  selector:
    matchLabels: { app: claims-burst-worker }
  template:
    metadata:
      labels: { app: claims-burst-worker }
    spec:
      containers:
        - name: claims-burst-worker
          image: registry.alderney.example/claims-burst-worker:2.3.0
          readinessProbe:
            httpGet: { path: /healthz, port: 8080 }
```

```
kubectl --context aks-alderney apply -f claims-burst-worker.yaml
kubectl --context eks-alderney apply -f claims-burst-worker.yaml
```

Same file, same `kubectl apply`, two different clusters. That's the actual proof of portability —
not a claim on a slide, but one manifest applied unmodified against two conformant clusters and
producing the same running Deployment on both.

## Step 3: isolate the seams Lesson 9 already warned about

The workload needs a PersistentVolumeClaim for scratch storage during each batch run, and Lesson 9
was explicit that StorageClass names are never standardized across clouds. Rather than hard-coding
one name into the manifest, a small per-cloud values file supplies it:

```yaml
# values-aks.yaml
storageClassName: managed-csi

# values-eks.yaml
storageClassName: gp3
```

A templating pass (Helm or Kustomize) injects the right value for whichever cluster is being
deployed to. The portable Deployment/Service core stays in one file, untouched; only the
genuinely cloud-specific value lives in two small files that are expected to differ.

## Step 4: verify both deployments actually behave the same

Running the same two checks against both clusters is what turns "should be identical" into
"verified identical":

```
kubectl --context aks-alderney get deployment claims-burst-worker -o wide
kubectl --context eks-alderney get deployment claims-burst-worker -o wide

kubectl --context aks-alderney exec deploy/claims-burst-worker -- curl -s localhost:8080/healthz
kubectl --context eks-alderney exec deploy/claims-burst-worker -- curl -s localhost:8080/healthz
```

Both commands should return the same replica count, the same ready status, and the same healthz
response. If they don't, the gap is almost always in one of the seams Lesson 9 named — a
StorageClass that failed to bind, an ingress annotation silently ignored by the other cloud's
controller — not in the Deployment/Service core itself.

## Key terms

| Term | Meaning |
|---|---|
| Module reuse across providers | Calling the same Terraform module source twice, once per cloud, with the inputs that genuinely differ supplied as variables |
| Portable core | The Deployment/Service/ConfigMap layer that behaves identically on any conformant Kubernetes cluster |
| Values file | A small, per-cloud file isolating the few settings — StorageClass name, ingress annotations — that are never standardized across clouds |
| Verification by comparison | Running the same read-only commands against both clusters and comparing output, instead of assuming identical YAML means identical behavior |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: what specifically stayed
identical between the AKS and EKS deployments in this lab, what was deliberately allowed to
differ, and why keeping those two things in separate files is what makes the module reusable at
all.
