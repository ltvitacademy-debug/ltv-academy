# Provisioning the Kubernetes Cluster

With networking, remote state, and the database in place, this lesson adds the thing everything else in this course deploys onto: the AKS clusters themselves. Northbridge runs two, defined as Terraform resources right alongside the VNets and Postgres server from Lesson 7, and wires up the one piece every cluster needs on day one — the ability to pull images from the shared container registry.

## What you'll learn

- The `azurerm_kubernetes_cluster` resource for `northbridge-aks-dev` and `northbridge-aks-prod`
- Why dev and staging share one cluster while prod gets its own
- System vs. user node pools, and why both use autoscaling `Standard_D4s_v5` nodes
- Attaching ACR (`northbridgeacr`) to AKS so pulls don't need stored registry credentials

## One cluster for dev and staging, a separate one for prod

Northbridge runs two AKS clusters, both in `eastus`:

- **`northbridge-aks-dev`** hosts both the `northbridge-dev` and `northbridge-staging` namespaces. Running dev and staging on one cluster saves on node costs during a capstone-scoped build — staging doesn't need its own control plane and node pools when traffic there is just pre-production validation.
- **`northbridge-aks-prod`** is isolated and hosts only the `northbridge-prod` namespace. Production never shares a cluster with anything else — a noisy or misbehaving dev workload can't starve prod of node capacity or trip a prod node's resource limits, and a prod outage investigation never has to rule out "was this actually a dev pod" as a variable.

## The `azurerm_kubernetes_cluster` resource

```hcl
# modules/aks/main.tf
resource "azurerm_kubernetes_cluster" "this" {
  name                = "northbridge-aks-${var.environment}"
  location            = "eastus"
  resource_group_name = var.resource_group_name
  dns_prefix          = "northbridge-${var.environment}"

  default_node_pool {
    name                = "system"
    vm_size             = "Standard_D4s_v5"
    auto_scaling_enabled = true
    min_count           = 2
    max_count           = 5
    vnet_subnet_id      = var.aks_subnet_id
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin = "azure"
    network_policy = "azure"
  }
}
```

`var.environment` is `"dev"` or `"prod"`, giving `northbridge-aks-dev` and `northbridge-aks-prod` from the same module — the identical pattern Lesson 7 used for networking.

## System pool vs. user pool

The `default_node_pool` block above is the **system node pool** — it runs Kubernetes system components (CoreDNS, metrics-server, the ingress controller's own control-plane pods) and should be left mostly undisturbed by application workloads. Northbridge adds a second, **user node pool** for `product-catalog` and `checkout` themselves:

```hcl
resource "azurerm_kubernetes_cluster_node_pool" "user" {
  name                  = "user"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.this.id
  vm_size               = "Standard_D4s_v5"
  auto_scaling_enabled  = true
  min_count             = 2
  max_count             = 5
  vnet_subnet_id        = var.aks_subnet_id
  mode                  = "User"
}
```

Both pools use `Standard_D4s_v5` (4 vCPU, 16 GiB) with autoscaling between 2 and 5 nodes. Separating system and user pools means a spike in `checkout` traffic during a flash sale scales the user pool without ever touching — or risking — the nodes CoreDNS and the ingress controller depend on.

## Attaching ACR so pulls don't need credentials

Every deployment in this course pulls images from `northbridgeacr.azurecr.io`. Rather than generate a registry pull secret and store it as a Kubernetes `Secret` (one more credential to rotate and leak), Northbridge attaches the ACR to each AKS cluster directly:

```hcl
resource "azurerm_role_assignment" "aks_acr_pull" {
  scope                = var.acr_id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.this.kubelet_identity[0].object_id
}
```

This grants the cluster's **kubelet identity** — the managed identity each node uses to pull images — the built-in `AcrPull` role scoped to the `northbridgeacr` registry. From that point on, any pod spec referencing `northbridgeacr.azurecr.io/checkout:<sha>` pulls successfully with zero `imagePullSecrets` anywhere in a Helm chart or manifest. The same `terraform apply` that creates `northbridge-aks-dev` wires up this role assignment, so a freshly provisioned cluster can pull images on its very first deploy.

Verifying the attach once the cluster is up:

```
$ az aks show -n northbridge-aks-dev -g rg-northbridge-dev --query "identityProfile"
$ az role assignment list --scope $(az acr show -n northbridgeacr --query id -o tsv)
```

## Key terms

- **Node pool** — a group of VMs of the same size/config backing a cluster; system pools run cluster infrastructure, user pools run application workloads
- **Autoscaling** — Kubernetes/AKS adding or removing nodes in a pool based on pending pod demand, bounded by `min_count`/`max_count`
- **Kubelet identity** — the managed identity an AKS node uses for operations like pulling container images
- **`AcrPull`** — the built-in Azure role granting read access to pull images from a container registry
