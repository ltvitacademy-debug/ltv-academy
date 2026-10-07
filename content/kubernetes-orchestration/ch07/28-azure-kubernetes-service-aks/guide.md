# Azure Kubernetes Service (AKS)

Everything so far has assumed Northbridge runs and maintains its own control plane — the API server, etcd, the scheduler. That's real operational work: patching it, backing it up, keeping it available. Northbridge's product-catalog and checkout services run on Azure, so instead of self-managing that control plane, the team runs it on **AKS — Azure Kubernetes Service**, where Azure operates the control plane and Northbridge manages only the worker nodes and what runs on them.

## What you'll learn

- What AKS actually manages versus what Northbridge still manages
- How to create an AKS cluster and connect `kubectl` to it
- What a node pool is and why Northbridge might use more than one
- Where AKS fits for a team already committed to Azure

## What Azure manages, what Northbridge manages

![AKS architecture: a managed Kubernetes control plane in Azure, with customer-managed node pools running the actual workload Pods](/courses/kubernetes-orchestration/ch07/28-azure-kubernetes-service-aks/aks-architecture.png)
*Azure's own architecture diagram: the control plane is a managed Azure resource; node pools are Northbridge's VMs running the actual Pods.*

Azure runs and patches the API server, etcd, and scheduler as a managed, free control plane. Northbridge still owns the **node pools** — the VM Scale Sets that run the actual Pods — including choosing VM sizes, how many nodes, and when they're upgraded. That's the same split every managed Kubernetes offering makes: the part everyone's control plane looks the same gets centralized, the part that's genuinely application-specific stays with the team running the workload.

## Creating a cluster and connecting to it

```bash
az group create --name northbridge-rg --location eastus

az aks create \
  --resource-group northbridge-rg \
  --name northbridge-aks \
  --node-count 3 \
  --generate-ssh-keys

az aks get-credentials \
  --resource-group northbridge-rg \
  --name northbridge-aks
```

That last command writes AKS's connection details into your local `kubeconfig`, so from here `kubectl get nodes` behaves exactly like it would against any other cluster — everything from Chapters 1 through 6 of this course applies unchanged.

## Node pools: more than one shape of worker

A fresh cluster has one **system node pool** (running core cluster components). Northbridge adds a separate **user node pool** for checkout and catalog's actual workload, so system components aren't competing with application Pods for the same nodes — and can size or scale each pool independently:

```bash
az aks nodepool add \
  --resource-group northbridge-rg \
  --cluster-name northbridge-aks \
  --name userpool \
  --node-count 3 \
  --mode User
```

## Where AKS fits

Northbridge already runs other services on Azure, so AKS means one less control plane to operate, billing on the same invoice, and native integration with Azure identity and networking — the next lesson covers exactly that integration. The trade-off is less control over control-plane internals, which is rarely something a team wants to manage by hand anyway.

## Key terms

- **AKS (Azure Kubernetes Service)** — Azure's managed Kubernetes offering; Azure runs the control plane, the customer runs the node pools
- **Control plane** — the API server, etcd, and scheduler; managed and patched by Azure in AKS
- **Node pool** — a group of nodes in an AKS cluster sharing the same VM size and configuration
- **kubeconfig** — the local file holding cluster connection details, populated by `az aks get-credentials`
