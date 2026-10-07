# Script — DNS & Service Discovery

## Segment 1 (title)

A stable virtual IP is great, but Northbridge's engineers still shouldn't have to look that IP up by hand. Every Service in Kubernetes automatically gets a DNS name, so product-catalog can just ask for "checkout" and get an address back.

## Segment 2 (steps)

CoreDNS runs as a Deployment in the kube-system namespace, and every Pod is automatically configured to query it. CoreDNS watches the API server for Services and Endpoints and answers DNS lookups for them — nothing needs to be configured by hand.

## Segment 3 (code)

Every Service gets the fully qualified name service-dot-namespace-dot-svc-dot-cluster-local. From a Pod in the same namespace, the short name alone resolves, because Kubernetes appends the namespace suffix automatically — calling across namespaces just needs the namespace added in.

## Segment 4 (code)

Sometimes you don't want load-balancing at all — you want the IP of every individual Pod behind a selector. Setting clusterIP to None creates a headless Service, and a DNS lookup then returns one record per matching Pod instead of a single virtual IP — exactly what StatefulSets use to address each replica directly.

## Segment 5 (outro)

Because of DNS, nothing in Northbridge's code ever hardcodes an IP address — it just calls a name and lets Kubernetes resolve it. Next lesson: getting external traffic into the cluster in the first place, with Ingress.
