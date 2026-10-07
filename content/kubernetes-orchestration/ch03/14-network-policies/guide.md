# Network Policies

By default, Kubernetes networking is wide open: any Pod can reach any other Pod in the cluster, regardless of namespace. That's fine for a demo, but Northbridge's PCI compliance scope means the payment-processing Pod should only ever be reachable from checkout — not from the marketing-analytics Pods running in the same cluster. **NetworkPolicy** resources restrict traffic at the Pod level, turning that wide-open default into something closer to a firewall.

## What you'll learn

- Why Kubernetes allows all Pod-to-Pod traffic by default, and why that matters
- How a NetworkPolicy selects Pods and restricts their allowed traffic
- The difference between `Ingress` and `Egress` policy types
- A practical default-deny-then-allow pattern

## The default: everything can reach everything

Without any NetworkPolicy objects in a namespace, every Pod can send traffic to and accept traffic from every other Pod. There's no built-in network segmentation — isolation is opt-in, not opt-out. This also means NetworkPolicy support isn't automatic: it requires a CNI plugin that implements it, such as Calico, Cilium, or Antrea. Some simpler CNI plugins ignore NetworkPolicy objects entirely and silently allow all traffic anyway.

## Default-deny, then allow specific traffic

The common pattern is to first lock a namespace down completely, then open narrow exceptions. A default-deny policy with an empty `podSelector` matches every Pod in the namespace:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: payments
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

With no `ingress` or `egress` rules listed, this blocks all inbound and outbound traffic for every Pod in the `payments` namespace. Then a second policy opens exactly the traffic Northbridge needs — checkout talking to the payment-processing Pod on its API port:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-checkout-to-payments
  namespace: payments
spec:
  podSelector:
    matchLabels:
      app: payment-processing
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: checkout
      ports:
        - protocol: TCP
          port: 8443
```

`podSelector` at the top level picks which Pods this policy applies *to* (here, `payment-processing`). The `from` block inside `ingress` picks which Pods are allowed to send traffic *in*. Both default-deny and this allow rule apply together — NetworkPolicies are additive, so a Pod's effective rules are the union of every policy that selects it.

## Ingress vs. Egress

`policyTypes: [Ingress]` governs incoming traffic to the selected Pods; `policyTypes: [Egress]` governs outgoing traffic from them. A policy can declare both. Restricting egress is how Northbridge would stop a compromised Pod from exfiltrating data outward, not just stop unwanted Pods from reaching in.

## Selecting beyond Pods

Rules aren't limited to `podSelector` — `namespaceSelector` allows traffic from an entire namespace, and `ipBlock` allows traffic from a CIDR range outside the cluster (useful for an on-prem database Northbridge hasn't migrated yet):

```yaml
      - from:
          - namespaceSelector:
              matchLabels:
                kubernetes.io/metadata.name: monitoring
```

## Key terms

- **NetworkPolicy** — a resource restricting which Pods may send/receive traffic to/from a selected set of Pods
- **podSelector** — labels choosing which Pods a policy applies to, or which Pods are allowed as a source/destination
- **policyTypes** — `Ingress`, `Egress`, or both; which traffic direction the policy governs
- **Default-deny** — an empty `podSelector` with no rules, blocking all traffic until explicitly allowed
- **CNI plugin** — the networking plugin (e.g. Calico, Cilium) that must support NetworkPolicy for it to take effect
