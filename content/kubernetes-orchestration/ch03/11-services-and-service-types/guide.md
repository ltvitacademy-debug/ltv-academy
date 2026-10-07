# Services & Service Types

Pods come and go. When Kubernetes reschedules a crashed checkout Pod, it gets a brand-new IP address — the old one is gone for good. Northbridge's product-catalog service can't hardcode an IP to reach checkout; it would break the first time checkout rolled out a new version. A **Service** solves this by giving a stable address that stays the same no matter how many times the Pods behind it change.

## What you'll learn

- Why Pod IPs are unreliable and what a Service does about it
- How a Service finds the right Pods using label selectors
- The three main Service types — ClusterIP, NodePort, and LoadBalancer — and when to use each
- How Services and Endpoints stay in sync as Pods come and go

## The problem a Service solves

Every Pod gets its own IP address, but that address is temporary. If a checkout Pod crashes and Kubernetes starts a replacement, the replacement gets a different IP. With three replicas of checkout constantly being replaced during rollouts and failures, nothing else in the cluster can reliably track "where checkout currently is" by IP alone.

A **Service** is a stable, cluster-internal frontend for a group of Pods. It gets one virtual IP and one DNS name that never changes, and it continuously tracks which Pods are currently healthy and matching behind it.

## Selecting Pods with labels

A Service doesn't point at specific Pods by name — it uses a **label selector** to match any Pod carrying the right labels, at any moment:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: checkout
spec:
  selector:
    app: checkout
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP
```

Any Pod labeled `app: checkout` is automatically included, whether it has existed since cluster creation or was started thirty seconds ago. Kubernetes maintains an **Endpoints** object (or `EndpointSlice`) behind the scenes listing the current IPs of matching, ready Pods — that list updates automatically as Pods are created, deleted, or fail readiness checks.

`port` is what callers use to reach the Service; `targetPort` is the port the container actually listens on — they don't have to match.

## Service types

**ClusterIP** (the default) gives the Service a virtual IP reachable only from inside the cluster. This is the right choice for internal traffic — product-catalog calling checkout never needs to leave the cluster network.

**NodePort** opens the same Service on a fixed port (30000–32767) on *every* node's IP, so traffic can reach it from outside the cluster by hitting any node directly:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: checkout-nodeport
spec:
  selector:
    app: checkout
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080
  type: NodePort
```

NodePort is mostly a building block — rarely the final answer for production traffic, since callers need to know actual node IPs.

**LoadBalancer** asks the cloud provider to provision an external load balancer that forwards to the Service. This is what Northbridge would use to expose checkout to the public internet on a cloud-managed Kubernetes cluster — the cloud assigns a real external IP automatically.

## How traffic actually gets there

Every node runs **kube-proxy** (or an equivalent like a service mesh's data plane), which watches Services and Endpoints and programs rules — traditionally `iptables`, often `IPVS` on larger clusters — so that traffic sent to a Service's virtual IP gets transparently load-balanced across the current, healthy backing Pods. None of this requires the caller to know which Pods exist; it only needs to know the Service's stable address.

## Key terms

- **Service** — a stable virtual IP and DNS name in front of a changing set of Pods
- **Selector** — labels a Service uses to decide which Pods belong behind it
- **Endpoints / EndpointSlice** — the live list of ready Pod IPs backing a Service
- **ClusterIP** — internal-only Service type, the default
- **NodePort** — exposes a Service on a fixed port on every node's IP
- **LoadBalancer** — provisions a cloud load balancer in front of a Service
- **kube-proxy** — the per-node component that routes Service traffic to backing Pods
