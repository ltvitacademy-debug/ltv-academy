# Ingress & Ingress Controllers

Northbridge now runs several public-facing services — product-catalog, checkout, and an account-management UI — each needing its own path for customers to reach from the internet. A separate cloud LoadBalancer Service per app would work, but it means a separate, billed load balancer for every single service. **Ingress** solves this by routing many hostnames and paths through one shared entry point, based on L7 (HTTP) rules.

## What you'll learn

- Why a LoadBalancer Service per app doesn't scale well
- What an Ingress resource is, versus what an Ingress Controller does
- How host-based and path-based routing rules work
- Where TLS termination fits into an Ingress
- A full worked scenario: a new route returning 404 even though the backend Service works fine

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

## Troubleshooting scenario: a new route returns 404

**Problem description.** Northbridge adds an `account-management` UI and a new Ingress rule for
`accounts.northbridge.example`. The `account-management` Service and its Pods are confirmed
healthy (`kubectl get endpoints account-management` shows real IPs) — but every request to the
new hostname returns a 404 from the Ingress Controller itself, not from the application.

**Available evidence.**

```bash
$ kubectl get ingress -n northbridge-retail
NAME                   CLASS   HOSTS                            ADDRESS        PORTS
northbridge-ingress    nginx   catalog.northbridge.example +1   20.1.2.3       80, 443
accounts-ingress       <none>  accounts.northbridge.example     20.1.2.3       80

$ curl -v http://accounts.northbridge.example/
< HTTP/1.1 404 Not Found
< server: nginx
```

The `CLASS` column for the new `accounts-ingress` is empty, where the working one shows `nginx`.

**Diagnostic questions.**

- Is the 404 coming from the application, or from the Ingress Controller before it ever reaches
  the application? The response header is the first clue.
- Does the new Ingress resource actually name which controller should handle it, the same way
  the working one does?
- If more than one Ingress Controller (or none properly configured as default) exists in this
  cluster, what happens to an Ingress resource that doesn't specify one?

**Expected investigation sequence.**

```bash
# Step 1 -- confirm the 404 is from the Ingress Controller (nginx),
# not the application -- the response headers already hinted at this
$ kubectl logs -n ingress-nginx deploy/ingress-nginx-controller --tail 20
# no log line even mentions accounts.northbridge.example -- the
# controller never saw this request as belonging to any rule it owns

# Step 2 -- compare the new Ingress's spec against the working one
$ kubectl get ingress accounts-ingress -n northbridge-retail -o yaml | grep -A2 "^spec:"
spec:
  rules:
    - host: accounts.northbridge.example
# no ingressClassName field at all

$ kubectl get ingress northbridge-ingress -n northbridge-retail -o yaml | grep ingressClassName
  ingressClassName: nginx

# Step 3 -- confirm there's no cluster-wide default IngressClass that
# would otherwise cover the gap
$ kubectl get ingressclass
NAME    CONTROLLER             DEFAULT
nginx   k8s.io/ingress-nginx   false
```

**Correct resolution.** `accounts-ingress` is missing `ingressClassName: nginx` entirely, and
this cluster's `nginx` IngressClass isn't marked as the default (`DEFAULT` column is `false`), so
nothing picks the new Ingress resource up. Adding `ingressClassName: nginx` to the new resource's
spec, matching the working one, resolves it — the 404 clears immediately because the controller
now actually watches this Ingress object and programs a route for it.

**Why this failure happens, and why the 404 is misleading.** A 404 from an Ingress Controller
usually reads as "the application doesn't have this route," which sends people straight to the
backend Service and Pods — exactly where this scenario's evidence already shows nothing is
wrong. The actual failure is one layer up: the Ingress *resource* was never claimed by any
controller in the first place, so none of its routing rules were ever programmed anywhere. This
is precisely the distinction the lesson draws between "Ingress is a rulebook" and "the controller
is what enforces it" — an orphaned rulebook enforces nothing, and the resulting 404 looks
identical to a genuinely missing backend route unless you check which component actually
generated it.

**Prevention.** Set a cluster default IngressClass (`kubectl annotate ingressclass nginx
ingressclass.kubernetes.io/is-default-class=true`) so a new Ingress resource without an explicit
`ingressClassName` still gets picked up rather than silently ignored — and treat a 404 with no
corresponding controller log entry as a signal to check the Ingress resource's own
`ingressClassName` before investigating the backend at all.

## Key terms

- **Ingress** — a resource declaring HTTP routing rules by host/path to backend Services
- **Ingress Controller** — the component (e.g. ingress-nginx) that reads Ingress rules and actually proxies traffic
- **IngressClass** — ties an Ingress resource to a specific controller
- **pathType** — `Prefix` or `Exact`, controlling how a rule's path matches a URL
- **TLS termination** — decrypting HTTPS at the Ingress edge using a certificate stored in a Secret
- **Orphaned Ingress** — an Ingress resource with no `ingressClassName` and no cluster default, so no controller ever claims or enforces its rules
