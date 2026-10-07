# Architecture: Control Plane & Nodes

The last lesson described Kubernetes as a continuous reconciliation loop: desired state in, actions out, forever. This lesson opens the box and names the actual pieces of software that make that loop run, across every cluster — including the one Northbridge Retail's platform team is about to build for its checkout and product-catalog services. Every Kubernetes cluster, no matter how it's hosted, splits into two kinds of machines: the control plane and the worker nodes.

## What you'll learn

- The four control-plane components and what each one is actually responsible for
- The three components that run on every worker node
- Why etcd is the one component you genuinely cannot lose
- How a `kubectl apply` travels through this architecture end to end

## The control plane: the cluster's brain

The control plane makes the cluster's decisions. It doesn't run your containers — it decides where they go and keeps checking that reality matches intent.

| Component | Job |
|---|---|
| **kube-apiserver** | The front door. Every `kubectl` command, every internal component, talks to the cluster only through the API server's REST API. Nothing touches etcd directly except the API server. |
| **etcd** | A distributed key-value store holding the entire cluster's state — every object, every desired spec. If etcd is lost without a backup, the cluster's state is lost with it. |
| **kube-scheduler** | Watches for newly created Pods with no node assigned, and picks the best node for each one based on resource requests, constraints, and policies. |
| **kube-controller-manager** | Runs the actual reconciliation loops — the Node controller, ReplicaSet controller, and others — each one watching the API server and taking action to close the gap between desired and actual state. |

## The worker nodes: where containers actually run

Every node (a VM or physical machine) that runs your containers has three things installed:

| Component | Job |
|---|---|
| **kubelet** | The agent on every node. Talks to the API server, receives Pod specs assigned to its node, and makes sure the described containers are actually running. |
| **container runtime** | The software that actually pulls images and runs containers (containerd is the common default today). kubelet talks to it through the Container Runtime Interface (CRI). |
| **kube-proxy** | Maintains the network rules on each node that let traffic reach the right Pods — the piece behind Kubernetes Services, covered in Chapter 3. |

## Tracing one `kubectl apply`

Say someone on Northbridge's platform team runs `kubectl apply -f checkout-deployment.yaml`. Here's what actually happens:

```
kubectl apply -f checkout-deployment.yaml
        │
        ▼
kube-apiserver   validates the YAML, writes the desired state to etcd
        │
        ▼
kube-controller-manager   notices a Deployment wants 3 Pods that don't exist yet, creates Pod objects
        │
        ▼
kube-scheduler   sees unscheduled Pods, assigns each one to a node
        │
        ▼
kubelet (on that node)   sees a Pod assigned to it, tells the container runtime to pull the image and start the container
```

No component skips a step, and no component talks directly to a layer it isn't supposed to — that's what keeps the system predictable even as clusters grow to hundreds of nodes.

## Key terms

- **Control plane** — the set of components (API server, etcd, scheduler, controller manager) that make cluster-wide decisions
- **kube-apiserver** — the single entry point for all cluster communication; the only component that talks to etcd
- **etcd** — the distributed key-value store holding all cluster state
- **kube-scheduler** — assigns unscheduled Pods to nodes
- **kube-controller-manager** — runs the reconciliation loops that keep actual state matching desired state
- **kubelet** — the per-node agent that runs the Pods assigned to its node
- **kube-proxy** — maintains per-node network rules that route traffic to Pods
