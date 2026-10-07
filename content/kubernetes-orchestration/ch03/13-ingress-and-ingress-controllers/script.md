# Script — Ingress & Ingress Controllers

## Segment 1 (title)

Northbridge now has several public-facing services needing their own path from the internet. A separate cloud load balancer per service works, but it's expensive and sprawling. Ingress routes many hostnames and paths through one shared entry point instead.

## Segment 2 (steps)

An Ingress resource declares rules — this hostname goes to catalog, this path goes to checkout — all behind one shared external IP. But the Ingress object itself does nothing on its own; it's just a rulebook. An Ingress Controller, like ingress-nginx, is the Pod that actually watches those rules and configures a real proxy to match.

## Segment 3 (code)

Each rule's backend points at an existing Service, which still uses its own selector to find the right Pods. pathType Prefix matches anything starting with that path; Exact requires a precise match. ingressClassName ties the Ingress to a specific controller when more than one is installed.

## Segment 4 (code)

Ingress is also the usual place HTTPS gets terminated. The controller decrypts traffic at the edge using a certificate pulled from a Secret, then forwards plain HTTP internally — so individual backend services never need their own TLS setup.

## Segment 5 (outro)

One Ingress Controller, fronted by a single LoadBalancer Service, can now route unlimited hostnames and paths to the right backend. Next lesson: once traffic is inside the cluster, Network Policies control which Pods are even allowed to talk to each other.
