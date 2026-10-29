# Lesson 13 — Services: ClusterIP, NodePort, and LoadBalancer Explained

**Chapter 4 · Kubernetes Networking · Lesson 1 of 4**

## What you'll learn

- Why Pod IPs are too unstable to depend on directly, and what a
  **Service** actually is underneath the YAML
- How a Service finds its Pods through a **label selector**, not
  through any naming convention
- The real difference between `ClusterIP`, `NodePort`, and
  `LoadBalancer` — and why each one is a strict superset of the one
  before it
- When to actually reach for each type in a real cluster

## Why Pods alone aren't enough

You already know from Chapter 3 that a Deployment manages a
ReplicaSet, which manages Pods, and that a rolling update replaces
Pods rather than mutating them in place. Every one of those
replacement Pods gets a **new IP address** — Pod IPs are assigned from
the cluster's Pod network when a Pod starts, and that IP is gone the
moment the Pod is deleted. If another Pod (or a human) tried to talk
directly to `10.244.1.7`, that address might point at a completely
different, unrelated Pod five minutes later.

A **Service** solves this by giving a stable, cluster-internal virtual
IP and DNS name to a *set* of Pods, and continuously updating which
real Pod IPs sit behind that stable address as Pods come and go. The
Service itself never changes; only the list of healthy Pod endpoints
behind it does.

## Selecting Pods by label, not by name

A Service never references Pods by name. It uses a `selector` that
matches Pod **labels** — the same labels a Deployment stamps onto the
Pods it creates:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: payments-api
spec:
  selector:
    app: payments-api
  ports:
    - port: 80
      targetPort: 8080
```

Kubernetes constantly watches for Pods whose labels match
`app: payments-api`, and keeps an `Endpoints` (or `EndpointSlice`)
object up to date with their current IPs. `port: 80` is what clients
send traffic to on the Service's own virtual IP; `targetPort: 8080`
is the actual port the container is listening on inside the Pod. This
is also why a Service survives a rolling update untouched — the new
Pods carry the same `app: payments-api` label as the old ones, so the
selector keeps matching without any change to the Service object
itself.

## ClusterIP: the default, internal-only type

If you don't set `type` at all, you get `ClusterIP`. The Service gets
a virtual IP that's only routable **from inside the cluster** — other
Pods can reach it, but nothing outside the cluster's Pod network can.
This is the right default for the overwhelming majority of Services
in a real system: an internal API, a cache, a database — anything that
only other workloads in the same cluster need to talk to.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: payments-api
spec:
  type: ClusterIP   # the default — can be omitted
  selector:
    app: payments-api
  ports:
    - port: 80
      targetPort: 8080
```

Under the hood, `kube-proxy` on every node programs rules (via
iptables or IPVS, depending on the cluster's configuration) that
intercept traffic sent to that virtual IP and load-balance it across
the current set of healthy Pod endpoints. No proxy process sits in the
data path per request — it's rewritten at the packet level, which is
why Services add essentially no latency of their own.

## NodePort: opening a port on every node

`NodePort` does everything `ClusterIP` does, plus one more thing: it
opens the **same port** on every node in the cluster, in the range
30000–32767 by default, and forwards traffic that arrives there to the
Service.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: payments-api
spec:
  type: NodePort
  selector:
    app: payments-api
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080
```

Now `<any-node-IP>:30080` reaches `payments-api`, regardless of which
node actually has a matching Pod running on it — kube-proxy on that
node forwards the request to wherever the Pod really is. NodePort is
mostly a building block rather than a destination in its own right: it
is useful for quick testing against a real cluster, for on-prem setups
without a cloud load balancer, and it's exactly what `LoadBalancer`
builds on top of.

## LoadBalancer: letting the cloud provision the front door

`LoadBalancer` does everything `NodePort` does, plus one more thing:
it asks the cloud provider's controller to provision a real, external
load balancer (an Azure Load Balancer, an AWS NLB/ELB, a GCP load
balancer) that targets the NodePort on every node.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: payments-api
spec:
  type: LoadBalancer
  selector:
    app: payments-api
  ports:
    - port: 80
      targetPort: 8080
```

Run `kubectl get svc payments-api` after creating this, and
`EXTERNAL-IP` will show `<pending>` for a short while and then
populate with a real public IP once the cloud controller finishes
provisioning. That external IP is now internet-reachable (unless
you've restricted it), making `LoadBalancer` the type you reach for
when a single Service genuinely needs its own dedicated public
entry point — a cluster running only one externally facing app, or a
protocol Ingress doesn't handle well, like raw TCP. Each
`LoadBalancer` Service typically provisions its *own* cloud load
balancer, which is also exactly why the next lesson's Ingress exists:
to put many HTTP(S) routes behind one shared load balancer instead of
paying for one per Service.

## Choosing the right type

| Type | Reachable from | Typical use |
|---|---|---|
| `ClusterIP` | Inside the cluster only | Internal APIs, caches, databases — most Services |
| `NodePort` | Any node's IP, on a fixed high port | Testing, on-prem without a cloud LB, or as Ingress's/LoadBalancer's foundation |
| `LoadBalancer` | The public internet, via a provisioned LB | A Service that needs its own dedicated external entry point |

## Key terms

| Term | Meaning |
|---|---|
| Service | A stable virtual IP and DNS name in front of a changing set of Pods |
| Selector | Label query a Service uses to decide which Pods are its current endpoints |
| `ClusterIP` | Default Service type; virtual IP reachable only inside the cluster |
| `NodePort` | Opens the same fixed port (30000-32767 by default) on every node, forwarding to the Service |
| `LoadBalancer` | Provisions a real cloud load balancer in front of a `NodePort` |
| `kube-proxy` | Per-node component that programs iptables/IPVS rules to route Service traffic to Pod endpoints |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
is `NodePort` described as a superset of `ClusterIP`, and `LoadBalancer`
as a superset of `NodePort` — and what specific problem does
provisioning one cloud load balancer per `LoadBalancer` Service create
that the next lesson's Ingress is designed to solve?
