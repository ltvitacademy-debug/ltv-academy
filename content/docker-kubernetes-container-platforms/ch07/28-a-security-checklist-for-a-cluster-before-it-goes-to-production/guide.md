# Lesson 28 — A Security Checklist for a Cluster Before It Goes to Production

**Chapter 7 · Kubernetes Security & RBAC · Lesson 4 of 4**

## What you'll learn

- How to pull RBAC, Pod Security Standards, and control-plane hardening
  from this chapter into one concrete pre-production checklist
- Specific `kubectl` commands to verify each checklist item yourself,
  rather than taking a config file's word for it
- Where image and supply-chain hardening from earlier chapters fits into
  this same checklist
- What `kube-bench` is and how it fits into verifying control-plane
  hardening against a published benchmark

## Why a checklist, not just "do the lessons"

Each lesson in this chapter covered one layer in isolation — identity,
workload policy, control plane. A real pre-production review has to
check all of them together, because a gap in any one layer undermines
the others: airtight RBAC doesn't help if a Pod can still run as root and
escalate from inside the cluster, and a hardened API server doesn't help
if `cluster-admin` is bound to a ServiceAccount nobody remembers creating.
Work through this list namespace by namespace, not just once at the
cluster level.

## 1. RBAC is least-privilege, not convenience-privilege

```
kubectl get clusterrolebindings -o json | \
  jq -r '.items[] | select(.roleRef.name=="cluster-admin") | .subjects[]?.name'
```

Run this before go-live. Every name it returns should be a human admin
account you can justify by name — not a ServiceAccount, not `default`,
not something left over from a demo. Then spot-check a handful of
workload ServiceAccounts with `kubectl auth can-i --list
--as=system:serviceaccount:<ns>:<name>` and confirm each one only has
what its workload actually needs.

## 2. Pod Security Standards are enforced, not just labeled

```
kubectl get ns -o json | \
  jq -r '.items[] | "\(.metadata.name): \(.metadata.labels["pod-security.kubernetes.io/enforce"])"'
```

Every workload namespace should show `restricted` (or `baseline` with a
documented reason for anything less). A namespace with no label at all is
running on the cluster's default — confirm what that default actually is
before assuming it's safe.

## 3. Network policies default-deny by default

Kubernetes allows all Pod-to-Pod traffic unless a `NetworkPolicy` says
otherwise (Chapter 4). Before production, every workload namespace should
have a baseline deny-all ingress policy, with explicit allows layered on
top for what actually needs to talk to what:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: payments
spec:
  podSelector: {}
  policyTypes: ["Ingress"]
```

## 4. Secrets are encrypted at rest, and etcd is locked down

Confirm `EncryptionConfiguration` is wired in (Lesson 27) and that
existing Secrets were actually re-written through it, not just new ones
going forward:

```
kubectl get secrets --all-namespaces -o json | kubectl replace -f -
```

Confirm etcd's client port `2379` and peer port `2380` are unreachable
from outside the control plane network, and that a recent, encrypted
`etcdctl snapshot save` backup exists and has been test-restored at least
once.

## 5. Audit logging is on, and someone actually looks at it

Confirm `--audit-policy-file` and `--audit-log-path` are set on every
API server instance, that log rotation (`--audit-log-maxage`,
`--audit-log-maxbackup`) won't silently fill a disk, and that the logs
ship somewhere a human or alerting pipeline actually reads them — a log
file nobody reads doesn't help during an incident.

## 6. Images are scanned, non-root, and pinned

Carried over from Chapter 2: every image in the cluster should come from
a scan gate in CI (Lesson 6), run as a non-root user (Lesson 7), and be
referenced by digest or an immutable tag rather than a mutable tag like
`latest` that can point to a different image tomorrow than it does today.

## 7. Resource requests and limits are set everywhere

A Pod with no CPU/memory requests or limits can starve its neighbors, or
get evicted unpredictably under pressure. `ResourceQuota` and
`LimitRanger` (Lesson 27) catch the namespaces that don't set them —
run `kubectl get limitrange,resourcequota --all-namespaces` and treat an
empty result on a workload namespace as a gap, not a pass.

## 8. Ingress terminates TLS, not plaintext

Every externally reachable `Ingress` should terminate TLS with a
certificate from a real issuer (cert-manager with Let's Encrypt, or an
internal CA) — `kubectl get ingress --all-namespaces -o json | jq
'.items[] | select(.spec.tls == null) | .metadata.name'` should return
nothing for anything meant to be public.

## 9. Run kube-bench against the CIS Benchmark

**kube-bench**, an open-source tool from Aqua Security, checks a
cluster's control-plane and node configuration against the CIS
Kubernetes Benchmark — file permissions on kubeconfig and PKI material,
`kube-apiserver` flag settings, kubelet configuration, and more:

```
kubectl run kube-bench --rm -it --restart=Never \
  --image=aquasec/kube-bench:latest -- run --targets master,node,etcd
```

Treat it as a second opinion, not a replacement for the checks above —
it catches configuration drift the earlier items might not, and gives
you a reproducible pass/fail record to keep for the next review.

## 10. Someone has actually tried `kubectl auth can-i` as the attacker

Before go-live, pick the least-trusted identity in the cluster — a
CI ServiceAccount, a third-party controller's ServiceAccount — and
actually run `kubectl auth can-i --list --as=<that identity>` against it.
If the answer surprises you, fix the binding before production does the
test for you.

## Key terms

| Term | Meaning |
|---|---|
| Pre-production review | A check across RBAC, Pod Security, network policy, and control-plane hardening together, not any one in isolation |
| Default-deny NetworkPolicy | A baseline policy blocking all ingress until explicitly allowed |
| kube-bench | Open-source CIS Kubernetes Benchmark checker from Aqua Security |
| CIS Kubernetes Benchmark | The published hardening standard kube-bench checks a cluster against |

## Check yourself

You've finished Chapter 7 when you can run every `kubectl` command in
this checklist against a real cluster, explain what a "pass" on each one
actually means, and say — specifically, not in general terms — what you'd
fix first if item 1 turned up a ServiceAccount bound to `cluster-admin`.
