# Lesson 15 — DNS and Service Discovery Inside a Cluster

**Chapter 4 · Kubernetes Networking · Lesson 3 of 4**

## What you'll learn

- What **CoreDNS** is, and why nearly every Kubernetes cluster runs
  it as a cluster add-on
- The full `service.namespace.svc.cluster.local` naming scheme, and
  what each segment actually means
- Why a Pod can reach `payments-api` with no namespace at all when
  it's calling from the same namespace, but needs the full name from
  a different one
- How to debug DNS resolution from inside a running Pod with real
  commands

## Why Services need names, not just stable IPs

Lesson 13 established that a Service gives a changing set of Pods one
stable virtual IP. That solves the "the IP keeps changing" problem,
but on its own it doesn't solve a second problem: something still has
to tell every other Pod in the cluster what that virtual IP actually
is. Hard-coding IPs into application config defeats the entire point
of a Service being a stable abstraction. The real answer is DNS:
every Service also gets a predictable **name**, and any Pod in the
cluster can resolve that name to the Service's virtual IP the same
way your laptop resolves `google.com`.

## CoreDNS: the cluster's internal DNS server

**CoreDNS** is the DNS server almost every modern cluster runs
in-cluster, as a Deployment in the `kube-system` namespace, fronted by
its own Service (conventionally named `kube-dns` for historical
reasons even though the component is CoreDNS). Every Pod's container
runtime configures `/etc/resolv.conf` to point at that CoreDNS
Service's `ClusterIP`, so any DNS lookup a Pod makes — for another
Service, or for an external domain like `api.stripe.com` — gets sent
to CoreDNS first.

```
kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl get svc -n kube-system kube-dns
```

CoreDNS watches the Kubernetes API for Services and Endpoints, the
same way kube-proxy does, and keeps its own DNS records in sync
automatically. You never hand-edit a zone file; create a Service, and
CoreDNS already knows how to answer for it.

## The full name: `service.namespace.svc.cluster.local`

Every Service gets a fully qualified name built from four pieces:

```
payments-api.billing.svc.cluster.local
```

- `payments-api` — the Service's `metadata.name`
- `billing` — the **namespace** the Service lives in
- `svc` — a fixed segment meaning "this is a Service record"
- `cluster.local` — the cluster's DNS domain (configurable, but
  `cluster.local` is the near-universal default)

Resolving that name returns the Service's `ClusterIP` — the same
stable virtual IP from Lesson 13 — which kube-proxy then routes to a
real, current Pod endpoint exactly as before. DNS and Services are two
different layers solving two different problems: DNS gets you from a
name to an IP; the Service and kube-proxy get you from that IP to a
live Pod.

## Why the short name works — and when it doesn't

Kubernetes configures each Pod's DNS search path to include its own
namespace, which is why a Pod in the `billing` namespace can reach
`payments-api` with no suffix at all, or `payments-api.billing` and
still get the right answer — the resolver tries each entry in the
search path in order. The moment you're calling **across**
namespaces, that shortcut disappears. A Pod in the `checkout`
namespace calling into `billing` has to use at least
`payments-api.billing`, because `payments-api` alone would try to
resolve inside `checkout` first and most likely fail — or worse,
accidentally match a different Service of the same name sitting in
`checkout` itself. Writing the fully qualified
`payments-api.billing.svc.cluster.local` in cross-namespace config is
the safest habit, precisely because it can't be misread as something
in the caller's own namespace.

## Debugging DNS from inside a Pod

When a Service name won't resolve, get a shell or a throwaway debug
Pod and test it directly rather than guessing:

```
kubectl run dnsutils --image=registry.k8s.io/e2e-test-images/jessie-dnsutils:1.3 \
  --restart=Never -- sleep 3600

kubectl exec -it dnsutils -- nslookup payments-api.billing.svc.cluster.local
kubectl exec -it dnsutils -- cat /etc/resolv.conf
```

`nslookup` confirms whether CoreDNS can resolve the name at all and
what IP comes back — compare that against `kubectl get svc
payments-api -n billing` to make sure it matches the real `ClusterIP`.
`cat /etc/resolv.conf` shows the search path Kubernetes configured for
that Pod, which is exactly what explains why a short name resolves
from one namespace and not another.

## Key terms

| Term | Meaning |
|---|---|
| CoreDNS | The DNS server run in-cluster (usually in `kube-system`) that answers name lookups for Services |
| FQDN | `service.namespace.svc.cluster.local` — the fully qualified name every Service gets |
| Search path | The list of DNS suffixes (starting with the Pod's own namespace) Kubernetes tries automatically, letting short names work same-namespace |
| `cluster.local` | The cluster's internal DNS domain, appended to every Service's FQDN |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: what
are the four segments of `payments-api.billing.svc.cluster.local` and
what does each one mean, and why should a Pod calling into a
different namespace always use at least the `service.namespace` form
instead of the bare Service name?
