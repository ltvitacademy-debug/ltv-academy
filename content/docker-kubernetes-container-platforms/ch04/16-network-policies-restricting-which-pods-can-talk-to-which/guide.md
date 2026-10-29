# Lesson 16 — Network Policies: Restricting Which Pods Can Talk to Which

**Chapter 4 · Kubernetes Networking · Lesson 4 of 4**

## What you'll learn

- Why a default Kubernetes cluster has **no pod-to-pod network
  restrictions at all**, and why that's a real security problem
- What a `NetworkPolicy` resource actually controls, and what it
  doesn't
- How to write ingress and egress rules by label selector, in real
  YAML
- Why creating a "deny all" default policy per namespace is standard
  practice, and how to carve a real exception into it

## The default: every Pod can reach every Pod

Everything in this chapter so far — Services, Ingress, DNS — assumed
network connectivity already existed between Pods. That's because, by
default, it does: a stock Kubernetes cluster applies **zero**
restrictions on which Pods can talk to which. A Pod running a
public-facing web frontend can, by default, open a connection
straight to a Pod running your payments database, your internal admin
API, or anything else in the cluster, regardless of namespace. That's
fine in a demo. It's a real liability in production — a single
compromised frontend container shouldn't have a clear network path to
everything else you run.

## What a NetworkPolicy actually does

A `NetworkPolicy` resource restricts traffic **to and from Pods that
match a label selector**, the same selector mechanism Services and
Deployments already use. It can control:

- **Ingress** — what's allowed to connect *into* the selected Pods
- **Egress** — what the selected Pods are allowed to connect *out* to

Critically, `NetworkPolicy` only works if the cluster's **CNI plugin**
(Calico, Cilium, Azure CNI with policy support, etc.) actually enforces
it — the resource itself is, once again, just a declarative rule set.
Some CNI plugins (notably the most basic kubenet-style setups) ignore
`NetworkPolicy` entirely, so the first real step in any cluster is
confirming the installed CNI supports it before relying on it for
security.

## A real ingress rule: only the frontend can reach the API

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-api
  namespace: billing
spec:
  podSelector:
    matchLabels:
      app: payments-api
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
```

Read this the way you'd read a firewall rule: `podSelector` at the top
picks the Pods this policy *applies to* — here, every Pod labeled
`app: payments-api`. `policyTypes: [Ingress]` means this policy
governs incoming traffic. The `ingress` block's `from.podSelector`
names who's allowed in — only Pods labeled `app: frontend`, and only
on TCP port 8080. Any other Pod, in any other namespace, is no longer
able to reach `payments-api` at all once this policy exists, even
though nothing about the Service or the Pods themselves changed.

## The standard pattern: deny all, then open specific holes

Because `NetworkPolicy` objects are additive within a namespace — any
policy that selects a Pod restricts it, and multiple policies combine
— the normal production pattern is to start from a namespace-wide
"deny all" and then add narrow policies like the one above for each
real, intentional path:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: billing
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

`podSelector: {}` with no `matchLabels` selects **every** Pod in the
`billing` namespace. With no `ingress` or `egress` rules listed at
all, this blocks all incoming and all outgoing traffic for every Pod
in that namespace — the safest possible starting point. From there,
`allow-frontend-to-api` (and any similar policy you add) carves out
exactly the connections the application actually needs, and nothing
else is reachable by default.

## Checking what's actually in effect

```
kubectl get networkpolicy -n billing
kubectl describe networkpolicy allow-frontend-to-api -n billing
```

`kubectl describe` is the one to reach for when traffic that should
work is being blocked — it prints the exact pod selector, the allowed
peers, and the allowed ports, which is usually enough to spot a label
mismatch between the policy and the Pods it was supposed to cover.

## Key terms

| Term | Meaning |
|---|---|
| `NetworkPolicy` | Resource restricting ingress and/or egress traffic to Pods matching a label selector |
| CNI plugin enforcement | `NetworkPolicy` rules only take effect if the installed CNI (Calico, Cilium, etc.) supports and enforces them |
| `podSelector` | Picks which Pods a policy applies to; `{}` with no `matchLabels` means every Pod in the namespace |
| Default-deny | A namespace-wide policy with no rules, blocking all traffic by default so specific allow-rules must be added deliberately |

## Check yourself

You're ready to move to Chapter 5 when you can explain, without
looking: why does a `NetworkPolicy` resource have no effect at all on
some clusters, and why is starting from a namespace-wide "deny all"
and then adding narrow allow-rules considered the safer default than
starting with no policies and trying to add restrictions later?
