# Script — Azure Kubernetes Service (AKS)

## Segment 1 (title)

Everything so far assumed Northbridge runs its own control plane — the API server, etcd, the scheduler. That's real operational work. Since catalog and checkout already run on Azure, the team instead runs AKS, Azure Kubernetes Service, where Azure operates the control plane and Northbridge manages only the node pools.

## Segment 2 (screenshot)

This is Azure's own architecture diagram for AKS. The control plane is a managed Azure resource — patched and run for free. Everything below that line, the node pools actually running Pods, stays Northbridge's responsibility: VM sizes, how many nodes, when they're upgraded.

## Segment 3 (code)

Standing one up is three commands: create a resource group, az aks create with a node count, then az aks get-credentials, which writes the connection details into your local kubeconfig. From there, kubectl get nodes behaves exactly like it would against any other cluster in this course.

## Segment 4 (steps)

A fresh cluster starts with one system node pool running core cluster components. Northbridge adds a separate user node pool for checkout and catalog's actual workload, so application Pods aren't competing with system components for the same nodes, and each pool can be sized or scaled on its own.

## Segment 5 (outro)

Since Northbridge is already on Azure, AKS means one less control plane to operate and native integration with Azure identity and networking — exactly what the next lesson covers. Up next, lesson twenty-nine: Amazon EKS, the same idea on Northbridge's secondary AWS footprint.
