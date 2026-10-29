# Lesson 14 — Ingress and Routing External Traffic into the Cluster

**Chapter 4 · Kubernetes Networking · Lesson 2 of 4**

## What you'll learn

- Why one `LoadBalancer` Service per app doesn't scale, and what
  problem **Ingress** actually solves
- Why an `Ingress` resource by itself does **nothing** — and what an
  **Ingress controller** has to be running for it to matter
- How to write host-based and path-based routing rules in real YAML
- How TLS termination fits into an Ingress resource

## The problem: one load balancer per Service gets expensive

Last lesson ended with a real limitation: give a Service
`type: LoadBalancer` and your cloud provider provisions a dedicated
external load balancer for it — billed and managed on its own. That's
fine for one Service. It's not fine for a cluster running ten
HTTP APIs that all need external access; now you're paying for and
managing ten separate cloud load balancers just to route plain HTTP
traffic, something a single reverse proxy could do instead.

## Ingress: one entry point, many routing rules

An `Ingress` resource describes HTTP and HTTPS routing rules — "if the
request's host is `api.example.com` and the path starts with
`/payments`, send it to the `payments-api` Service" — without asking
for a new load balancer per rule. A single Ingress resource (or a
small number of them) can front dozens of backend Services through
one shared entry point.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: shop-routes
spec:
  ingressClassName: nginx
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /payments
            pathType: Prefix
            backend:
              service:
                name: payments-api
                port:
                  number: 80
          - path: /orders
            pathType: Prefix
            backend:
              service:
                name: orders-api
                port:
                  number: 80
```

Both `/payments` and `/orders` on `api.example.com` now route to two
different internal `ClusterIP` Services, through the same shared
front door. Notice each `backend.service` still points at an ordinary
Service — Ingress sits in front of Services, it doesn't replace them.

## Ingress resources don't do anything on their own

This is the single most important thing to understand about Ingress,
and the part that trips people up the first time: creating an
`Ingress` object has **no effect at all** unless an **Ingress
controller** is also running in the cluster. The `Ingress` resource is
just a declarative description of routing rules — a config, not a
process. Something has to actually watch for `Ingress` objects and
turn those rules into real routing: that's the controller's job.

Common Ingress controllers include `ingress-nginx` (the most widely
deployed, built on NGINX), Traefik, and cloud-managed controllers like
AKS's Application Gateway Ingress Controller or AWS's Load Balancer
Controller. Most of these controllers run as Pods inside the cluster,
fronted by exactly one `LoadBalancer` Service — which is the
resolution to last lesson's problem: instead of one cloud load
balancer per app, you provision **one** for the Ingress controller,
and every `Ingress` resource rides behind that single external IP.

`ingressClassName: nginx` in the YAML above is how you tell
Kubernetes which installed controller should pick up this particular
`Ingress` object, in clusters running more than one.

## Checking what's actually deployed

```
kubectl get ingress shop-routes
kubectl describe ingress shop-routes
```

`kubectl get ingress` shows the hosts, an `ADDRESS` column (the
controller's external IP, once assigned), and the ports in use.
`kubectl describe ingress` is the more useful command day to day — it
prints every rule alongside the backend Service and port it resolves
to, which is exactly what you want when a route isn't reaching the
Service you expected.

## TLS termination at the Ingress

Ingress is also the usual place to terminate HTTPS, so individual
Services don't each need their own certificate handling:

```yaml
spec:
  tls:
    - hosts:
        - api.example.com
      secretName: api-example-com-tls
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: payments-api
                port:
                  number: 80
```

`secretName` points at a `kubernetes.io/tls` Secret holding the
certificate and private key for that host. The Ingress controller
terminates TLS at that shared entry point and forwards plain HTTP to
the backend Service — the same pattern a reverse proxy uses outside
Kubernetes, just expressed as a Kubernetes resource instead of a
config file on a box.

## Key terms

| Term | Meaning |
|---|---|
| Ingress | A resource describing HTTP(S) host/path routing rules in front of one or more Services |
| Ingress controller | The running component (e.g. ingress-nginx, Traefik) that actually implements an Ingress resource's rules — Ingress does nothing without one |
| `ingressClassName` | Tells Kubernetes which installed controller should handle a given Ingress object |
| `pathType` | How a path is matched: `Prefix`, `Exact`, or `ImplementationSpecific` |
| TLS termination | Decrypting HTTPS at the Ingress controller, using a `kubernetes.io/tls` Secret, before forwarding plain HTTP to the backend |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
does creating an `Ingress` resource with no controller installed
change nothing about how traffic actually flows, and how does routing
ten HTTP APIs through one Ingress controller change your cloud load
balancer bill compared with giving each one its own `LoadBalancer`
Service?
