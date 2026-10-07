# Setting Up a Local Cluster

Everything in this course needs somewhere to run, and Northbridge Retail's platform team isn't about to let every engineer experiment against the production checkout cluster. This lesson gets a real Kubernetes cluster running on your own machine, so every `kubectl` command and YAML manifest for the rest of the course has somewhere safe to land.

## What you'll learn

- The two most common tools for running Kubernetes locally, and when to reach for each
- How to install and start a local cluster with kind
- How `kubectl` finds out which cluster it's talking to
- How to confirm your cluster is actually healthy before moving on

## Two common options: kind and minikube

| Tool | How it works | Good for |
|---|---|---|
| **kind** ("Kubernetes IN Docker") | Runs each cluster node as a Docker container | Fast, disposable clusters; CI pipelines; this course |
| **minikube** | Runs a cluster inside a single VM (or container) | A more VM-like local experience, built-in dashboard and addons |

Both give you a fully conformant Kubernetes cluster. This course uses kind for its examples because it starts in seconds and is easy to tear down and recreate, but everything you run against it works identically against minikube, a cloud cluster, or AKS/EKS later in this course.

## Creating a cluster with kind

With Docker and kind installed, creating a cluster is one command:

```bash
kind create cluster --name northbridge-dev
```

This downloads a node image, starts it as a Docker container acting as both control plane and worker, and — critically — writes connection details into your local `kubeconfig` file (`~/.kube/config` by default). That's how `kubectl` finds the cluster without you passing an IP address anywhere.

## How kubectl finds the right cluster: contexts

A `kubeconfig` file can hold connection details for several clusters at once, each one called a **context**. `kubectl` always talks to whichever context is current.

```bash
kubectl config get-contexts        # list every cluster kubectl knows about
kubectl config current-context     # which one is active right now
kubectl config use-context kind-northbridge-dev   # switch clusters
```

This matters beyond local development: later in this course, once Northbridge has an AKS cluster and an EKS cluster alongside this local one, contexts are exactly how you avoid accidentally running a command against the wrong cluster.

## Confirming the cluster is healthy

Three commands are enough to sanity-check any new cluster, local or otherwise:

```bash
kubectl cluster-info          # shows the control plane and DNS endpoints
kubectl get nodes             # should list at least one node in Ready status
kubectl get pods -A           # -A = all namespaces; shows system Pods (CoreDNS, etc.)
```

If `kubectl get nodes` shows `Ready`, the control plane, the node's kubelet, and the network between them are all working — you have a real, working cluster.

## Key terms

- **kind** — a tool that runs Kubernetes cluster nodes as Docker containers, popular for local development and CI
- **minikube** — a tool that runs a local Kubernetes cluster inside a VM or container, with built-in dashboard/addons
- **kubeconfig** — the file (`~/.kube/config` by default) holding connection details for one or more clusters
- **Context** — one named cluster-plus-credentials entry inside a kubeconfig file; `kubectl` always acts against the current context
