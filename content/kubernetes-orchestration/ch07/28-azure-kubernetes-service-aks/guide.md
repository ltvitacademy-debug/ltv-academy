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

## Free-tier reality check

The commands above create real, billed Azure infrastructure — be deliberate about it before you run them on your own account:

- **The control plane itself can be free, but check which tier you're on.** Azure splits AKS into a **Free tier** (no SLA, no control-plane charge — exactly what "a managed, free control plane" above assumes) and a paid **Standard tier** (financially backed uptime SLA, billed hourly per cluster). Pass `--tier free` explicitly on `az aks create` for a lab cluster, and confirm it with `az aks show --resource-group northbridge-rg --name northbridge-aks --query sku`, rather than trusting whatever your subscription defaults to.
- **The real cost is the node pool, not the control plane.** Three nodes at a general-purpose VM size add up fast. For a lab, drop to `--node-count 1` and the smallest burstable size you can get (e.g. `Standard_B2s`) with `--node-vm-size`, instead of the three-node example above.
- **Pause the cluster between study sessions instead of leaving it running.** `az aks stop --resource-group northbridge-rg --name northbridge-aks` deallocates the nodes (and stops node compute billing) while keeping the cluster's configuration intact; `az aks start` brings it back when you're ready to continue. It's not free to leave stopped forever — attached disks, public IPs, and a Standard-tier charge (if you're on it) keep billing — so when you're done with the lab for good, delete it: `az aks delete --resource-group northbridge-rg --name northbridge-aks`.
- **Don't default to AKS for everything in this lesson.** Anything that doesn't specifically require a real Azure load balancer or Azure AD/Entra integration — practicing node pool commands, trying out manifests, anything covered in Chapters 1–6 — works identically on the `kind` cluster from Chapter 1, at zero cost. Save the real AKS cluster for the parts that actually need Azure underneath it.

## Key terms

- **AKS (Azure Kubernetes Service)** — Azure's managed Kubernetes offering; Azure runs the control plane, the customer runs the node pools
- **Control plane** — the API server, etcd, and scheduler; managed and patched by Azure in AKS
- **Node pool** — a group of nodes in an AKS cluster sharing the same VM size and configuration
- **kubeconfig** — the local file holding cluster connection details, populated by `az aks get-credentials`
