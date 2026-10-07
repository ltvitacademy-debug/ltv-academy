# Script — Setting Up a Local Cluster

## Segment 1 (title)

Northbridge Retail's platform team isn't letting every engineer experiment against the production checkout cluster. This lesson gets a real Kubernetes cluster running on your own machine, so the rest of this course has somewhere safe to land.

## Segment 2 (steps)

Two tools dominate local Kubernetes. kind runs each cluster node as a Docker container — fast to start, easy to throw away and recreate, which is why this course uses it. minikube runs a cluster inside a single VM instead, with a built-in dashboard and addons. Both give you a fully conformant cluster; anything you run against either works identically against a cloud cluster later.

## Segment 3 (code)

One command creates a cluster: kind create cluster. That starts a node, and writes connection details into your local kubeconfig file, which is how kubectl finds the cluster without you typing an IP address anywhere. Three commands confirm it's healthy: cluster-info, get nodes, and get pods across all namespaces. If a node shows Ready, the control plane, the kubelet, and the network between them are all working.

## Segment 4 (steps)

A kubeconfig file can actually hold several clusters at once, each one called a context, and kubectl always talks to whichever context is current. get-contexts lists them, current-context shows which one's active, and use-context switches. That matters a lot later in this course — once Northbridge has a local cluster, an AKS cluster, and an EKS cluster all in the same kubeconfig, contexts are exactly how you avoid running a command against the wrong one.

## Segment 5 (outro)

With a healthy cluster running, you're ready for the commands you'll use against it constantly. Next up, lesson four: kubectl essentials.
