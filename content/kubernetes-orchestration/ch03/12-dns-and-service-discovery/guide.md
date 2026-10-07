# DNS & Service Discovery

A stable virtual IP from a Service is useful, but Northbridge's engineers still shouldn't have to look up and hardcode that IP in application config. Kubernetes goes one step further: every Service automatically gets a DNS name, resolvable from any Pod in the cluster, so product-catalog can simply ask for "checkout" by name and get an address back — the same way any application looks up a hostname on the internet.

## What you'll learn

- How CoreDNS gives every Service a predictable DNS name
- The full Service DNS format, and why the short name usually works
- How Pods themselves get DNS names when they need one
- What a headless Service is and when you'd reach for one

## CoreDNS: the cluster's phone book

Kubernetes runs a cluster add-on called **CoreDNS** as a Deployment inside the `kube-system` namespace. Every Pod is configured (via its `/etc/resolv.conf`, set automatically by the kubelet) to send DNS queries to CoreDNS. CoreDNS watches the API server for Services and Endpoints and answers queries for them without any manual configuration.

## The Service DNS name

Every Service gets a fully qualified domain name of the form:

```
<service-name>.<namespace>.svc.cluster.local
```

For Northbridge's checkout Service running in the `default` namespace, that's `checkout.default.svc.cluster.local`. From a Pod in the *same* namespace, the short form `checkout` resolves correctly too, because each namespace is a DNS search domain — Kubernetes appends `.default.svc.cluster.local` automatically if `checkout` alone doesn't already look like a complete name. Calling across namespaces needs at least `checkout.default`.

```bash
# From inside any Pod in the default namespace:
curl http://checkout/            # short name — works within the same namespace
curl http://checkout.default/    # works from any namespace
curl http://checkout.default.svc.cluster.local/   # fully qualified, always works
```

This is why Northbridge's code never hardcodes IPs: it connects to `http://checkout` and lets DNS resolve to whatever the current ClusterIP is — which itself routes to whichever Pods are currently healthy.

## Pod DNS

Individual Pods can get DNS names too, usually only needed for StatefulSets where each replica's identity matters. A Pod's DNS name looks like `<pod-ip-dashes>.<service-name>.<namespace>.svc.cluster.local`, or, for a StatefulSet Pod, `<pod-name>.<service-name>.<namespace>.svc.cluster.local`.

## Headless Services

Sometimes you don't want load-balancing at all — you want DNS to return the IPs of *every individual Pod* behind the selector, so a client can choose or connect to each one directly. Setting `clusterIP: None` creates a **headless Service**:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: catalog-db
spec:
  clusterIP: None
  selector:
    app: catalog-db
  ports:
    - port: 5432
```

A query for `catalog-db.default.svc.cluster.local` now returns a DNS record per matching Pod instead of one virtual IP. This is the pattern StatefulSets use so each database replica can be addressed individually, rather than hidden behind a single load-balanced address.

## Key terms

- **CoreDNS** — the cluster add-on that answers DNS queries for Services and Pods
- **Service DNS name** — `<service>.<namespace>.svc.cluster.local`, resolvable from any Pod
- **Search domain** — namespace suffixes the kubelet configures so short names resolve
- **Headless Service** — a Service with `clusterIP: None` that returns individual Pod IPs via DNS instead of one virtual IP
