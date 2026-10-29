# Lesson 9 — The Control Plane and Worker Nodes: What Actually Runs Where

**Chapter 3 · Kubernetes Architecture & Core Objects · Lesson 1 of 4**

## What you'll learn

- What a Kubernetes **cluster** actually is: a set of machines split into
  a control plane and one or more worker nodes
- The four components that make up the control plane — `kube-apiserver`,
  `etcd`, `kube-scheduler`, and `kube-controller-manager` — and what each
  one is actually responsible for
- The three components that run on every worker node — `kubelet`,
  `kube-proxy`, and a container runtime — and how they turn a scheduling
  decision into a running container
- How to use `kubectl get nodes` and `kubectl get pods -A -o wide` to see
  this split for yourself on a real cluster

## A cluster is two kinds of machine

Everything in this course up to now has run on a single Docker host. Kubernetes
is what you reach for when one host isn't enough — when you need multiple
machines to look and behave like one system. A Kubernetes **cluster** is
exactly that: a set of machines, called **nodes**, split into two roles.

**Control plane nodes** make decisions. They don't run your application
containers (on a properly configured cluster); they watch the cluster's
state, decide what *should* be running where, and record that decision.
**Worker nodes** do the work. They run the containers your applications
actually need, and they report back on what's running and whether it's
healthy.

Run this against any real cluster and the split is visible immediately:

```
kubectl get nodes -o wide
```

```
NAME             STATUS   ROLES           AGE   VERSION   INTERNAL-IP
aks-nodepool-1   Ready    <none>          41d   v1.29.4   10.224.0.4
aks-nodepool-2   Ready    <none>          41d   v1.29.4   10.224.0.5
aks-nodepool-3   Ready    <none>          41d   v1.29.4   10.224.0.6
```

On a managed cluster like AKS or EKS, the control plane is hidden from
you entirely — the cloud provider runs it, patches it, and bills you for it
separately, and `kubectl get nodes` only ever shows worker nodes. On a
self-managed cluster (kubeadm, k3s, a local kind cluster) you'll see
control-plane nodes listed too, usually with a `control-plane` role label.

## The control plane: four components, one job each

The control plane's job is "figure out what should be true, and remember
it." Four components split that job:

**`kube-apiserver`** is the front door to everything. Every single
interaction with the cluster — `kubectl` commands, the scheduler watching
for unscheduled pods, the kubelet on every node reporting status — goes
through the API server as a REST call. Nothing talks to `etcd` directly
except the API server. If the API server is down, you can't change
anything about the cluster, even though already-running pods keep running.

**`etcd`** is the cluster's database — a distributed, consistent key-value
store that holds the entire desired and observed state of the cluster:
every Deployment, every Service, every Secret, every node's last known
status. etcd is the single source of truth. Lose etcd without a backup and
you've lost the cluster's entire configuration, even if every container is
still running on the workers.

**`kube-scheduler`** watches the API server for Pods that exist but have no
node assigned yet (`nodeName` is empty), and decides which worker node each
one should run on. It scores every node against the pod's CPU/memory
requests, node affinity rules, taints and tolerations, and picks a winner.
The scheduler only *decides* — it writes the chosen node's name back to the
Pod object via the API server. It never actually starts a container.

**`kube-controller-manager`** runs the reconciliation loops that make
Kubernetes self-healing. A ReplicaSet controller notices "this ReplicaSet
wants 3 pods, only 2 exist" and creates one more. A Node controller notices
a node has stopped reporting and marks it unhealthy. Each controller
watches the API server, compares desired state to observed state, and
takes action to close the gap — continuously, forever.

```
kubectl -n kube-system get pods -o wide
```

```
NAME                                     READY   STATUS    NODE
etcd-controlplane                        1/1     Running   controlplane
kube-apiserver-controlplane               1/1    Running   controlplane
kube-controller-manager-controlplane      1/1    Running   controlplane
kube-scheduler-controlplane                1/1    Running   controlplane
```

On a self-managed cluster, you can see all four control-plane components
as ordinary (if special) static pods in the `kube-system` namespace, which
is a useful reminder that even the control plane is, under the hood, just
containers being supervised by a kubelet.

## The worker node: three components, one container runtime

Every worker node runs three things:

**`kubelet`** is the agent that makes a worker node a worker node. It
watches the API server for Pods assigned to *its* node, and makes sure the
containers described in each Pod spec are actually running, by talking to
the container runtime. It also reports the node's health and resource
usage back to the API server continuously — that's how the control plane
knows a node is still alive.

**Container runtime** is the software that actually pulls images and runs
containers — `containerd` on virtually every modern cluster (Docker Engine
itself was removed as a supported runtime in Kubernetes 1.24; `containerd`
is the piece of Docker that actually ran containers all along). The kubelet
talks to it through the **Container Runtime Interface (CRI)**, a standard
API that lets Kubernetes stay runtime-agnostic.

**`kube-proxy`** handles the networking rules that let a Kubernetes
Service route traffic to the right Pods, by maintaining `iptables` (or
`IPVS`) rules on every node. You won't interact with it directly often, but
every Service you create in a later lesson works because `kube-proxy` is
quietly keeping every node's network rules in sync with the cluster's
Service and Endpoint objects.

## Watching the pieces work together

```
kubectl get pods -A -o wide --sort-by=.spec.nodeName
```

Scanning that output, you'll see your own application pods scheduled
across different `NODE` values — that's `kube-scheduler`'s decision,
executed by the `kubelet` on each named node, with the container actually
started by that node's container runtime. Describing any pod shows the
same chain:

```
kubectl describe pod my-app-7d9f8c6b5d-x2k9p
```

Near the bottom of that output, the `Events` section narrates exactly this
sequence in order: `Scheduled` (the scheduler's decision), then
`Pulling`/`Pulled` (the container runtime fetching the image), then
`Created` and `Started` (the kubelet starting the container). Every pod
you ever run has gone through exactly this control-plane-decides,
worker-node-executes pipeline.

## Key terms

| Term | Meaning |
|---|---|
| Control plane | The cluster's decision-making components: API server, etcd, scheduler, controller manager |
| `kube-apiserver` | The REST front door; every read and write to cluster state goes through it |
| `etcd` | The distributed key-value store holding all cluster state — the single source of truth |
| `kube-scheduler` | Assigns unscheduled Pods to a worker node based on resource requests and constraints |
| `kube-controller-manager` | Runs the reconciliation loops that keep observed state matching desired state |
| `kubelet` | The per-node agent that starts/stops containers per its node's assigned Pods and reports node health |
| `kube-proxy` | Maintains per-node network rules so Services can route to the right Pods |
| Container runtime | The software (`containerd`) that actually pulls images and runs containers, via the CRI |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: which
specific component decides *which node* a Pod runs on, which component
actually *starts* the container once that decision is made, and why losing
`etcd` is worse than losing any single worker node.
