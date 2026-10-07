# Script — Network Policies

## Segment 1 (title)

By default, Kubernetes networking is wide open — any Pod can reach any other Pod in the cluster. For Northbridge's PCI compliance scope, the payment-processing Pod needs to be reachable only from checkout. NetworkPolicy resources make that restriction possible.

## Segment 2 (steps)

With no NetworkPolicy in place, there's no network segmentation at all — isolation is opt-in, not opt-out. It also depends on the CNI plugin: Calico, Cilium, and Antrea enforce NetworkPolicy, but some simpler plugins silently ignore it and allow everything anyway.

## Segment 3 (code)

The common pattern starts with default-deny: an empty podSelector matches every Pod in the namespace, and with no rules listed, all inbound and outbound traffic is blocked for everyone in it.

## Segment 4 (code)

Then a second, narrow policy opens exactly what's needed. podSelector picks which Pods the policy applies to — payment-processing — and the from block under ingress picks which Pods are allowed in — checkout, on port 8443 only. Policies are additive, so a Pod's effective rules are the union of every policy that selects it.

## Segment 5 (outro)

The same podSelector, policyTypes, and ingress/egress structure can also allow whole namespaces or external CIDR ranges, not just individual Pods. That closes out networking — next, Chapter 4 covers configuration and storage, starting with ConfigMaps and Secrets.
