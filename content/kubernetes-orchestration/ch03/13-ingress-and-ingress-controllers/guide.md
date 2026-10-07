# Ingress & Ingress Controllers

Northbridge now runs several public-facing services — product-catalog, checkout, and an account-management UI — each needing its own path for customers to reach from the internet. A separate cloud LoadBalancer Service per app would work, but it means a separate, billed load balancer for every single service. **Ingress** solves this by routing many hostnames and paths through one shared entry point, based on L7 (HTTP) rules.

## What you'll learn

- Why a LoadBalancer Service per app doesn't scale well
- What an Ingress resource is, versus what an Ingress Controller does
- How host-based and path-based routing rules work
- Where TLS termination fits into an Ingress

## One load balancer, many services

An Ingress resource declares routing rules — "requests to `catalog.northbridge.example` go to the catalog Service; requests to `/checkout` go to the checkout Service" — all pointed at one shared external IP, instead of a LoadBalancer per app:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: northbridge-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: catalog.northbridge.example
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: product-catalog
                port:
                  number: 80
    - host: shop.northbridge.example
      http:
        paths:
          - path: /checkout
            pathType: Prefix
            backend:
              service:
                name: checkout
                port:
                  number: 80
```

`pathType: Prefix` matches any URL beginning with the given path; `Exact` requires a precise match. Each rule's `backend` points at an existing Service (and that Service's own selector still handles finding the right Pods behind it).

## The Ingress resource is just a rulebook

An important distinction: the Ingress object by itself does nothing. It's a declaration of *intent* — the rules Northbridge wants enforced. Something still has to read those rules and actually route traffic. That's the job of the **Ingress Controller**.

## Ingress Controllers do the work

An Ingress Controller — commonly **ingress-nginx**, though Traefik, HAProxy, and cloud-managed controllers (like AWS Load Balancer Controller) are common alternatives — is a Pod (or set of Pods) that watches Ingress resources across the cluster and configures a real proxy to match. It's usually fronted by exactly one LoadBalancer Service, so Northbridge pays for one external IP no matter how many Ingress resources and hostnames it adds behind it.

`ingressClassName` ties an Ingress resource to a specific controller when more than one is installed in a cluster — without it, it's ambiguous which controller should act on the rules.

## TLS termination

Ingress is also the usual place HTTPS certificates get applied, so individual backend Services don't each need their own TLS setup:

```yaml
spec:
  tls:
    - hosts:
        - catalog.northbridge.example
      secretName: catalog-tls-cert
```

The Ingress Controller terminates TLS at the edge using the certificate stored in that Secret, then forwards plain HTTP internally to the backend Service.

## Key terms

- **Ingress** — a resource declaring HTTP routing rules by host/path to backend Services
- **Ingress Controller** — the component (e.g. ingress-nginx) that reads Ingress rules and actually proxies traffic
- **IngressClass** — ties an Ingress resource to a specific controller
- **pathType** — `Prefix` or `Exact`, controlling how a rule's path matches a URL
- **TLS termination** — decrypting HTTPS at the Ingress edge using a certificate stored in a Secret
