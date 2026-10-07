# AKS With Terraform

Northbridge Retail's checkout service is containerized, and containers need an orchestrator. Rather than running VMs and managing Kubernetes installation by hand, Northbridge runs Azure Kubernetes Service (AKS) — a managed control plane with a node pool Terraform can define declaratively, the same way you've defined every other resource in this chapter.

## What you'll learn

- `azurerm_kubernetes_cluster` and its required `default_node_pool` block
- Choosing a node VM size and node count for a real workload
- `identity` blocks and why AKS needs one to manage other Azure resources on your behalf
- How the output of this resource feeds `kubectl` and, eventually, CI/CD

## Provisioning the cluster

A minimal but production-shaped AKS cluster needs a default node pool and an identity:

```hcl
resource "azurerm_kubernetes_cluster" "checkout" {
  name                = "aks-northbridge-checkout"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  dns_prefix          = "northbridge-checkout"
  kubernetes_version  = "1.29"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D4s_v5"
    vnet_subnet_id = azurerm_subnet.checkout.id
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin = "azure"
  }
}
```

`default_node_pool` is required by the resource and defines the worker nodes every pod schedules onto — `node_count = 3` gives Northbridge's checkout service enough capacity to tolerate one node failing without an outage. `vm_size` picks the node's compute profile, independent of the AKS control plane itself, which Azure manages and never bills by the VM.

## Why AKS needs an identity

`identity { type = "SystemAssigned" }` gives the cluster its own managed identity in Azure Active Directory. AKS uses this identity on your behalf to create and manage supporting resources — load balancers, managed disks for persistent volumes, and the node pool's underlying VM scale set — without you granting it a long-lived credential anywhere in the configuration.

## Networking and what comes next

`network_profile { network_plugin = "azure" }` gives pods real IP addresses from the VNet's address space (the same VNet concepts from Lesson 22), rather than an overlay network — this matters for Northbridge because other Azure resources, like the Key Vault from Lesson 23, can then reach pods directly by IP when needed. Once `terraform apply` finishes, the cluster's kubeconfig can be retrieved with `az aks get-credentials`, and `kubectl` takes over from there — Terraform's job was getting the cluster to exist, not managing what runs inside it.

```bash
az aks get-credentials --resource-group rg-northbridge-prod --name aks-northbridge-checkout
kubectl get nodes
```

```text
NAME                                STATUS   ROLES   AGE   VERSION
aks-default-12345678-vmss000000     Ready    <none>  2m    v1.29.4
aks-default-12345678-vmss000001     Ready    <none>  2m    v1.29.4
aks-default-12345678-vmss000002     Ready    <none>  2m    v1.29.4
```

Northbridge now runs order processing on VMs, the storefront on App Service, and checkout on AKS — three different compute models, all defined in the same Terraform workflow. Northbridge also runs workloads on AWS, and the next chapter picks up there, starting with the AWS provider.

## Key terms

| Term | Meaning |
|---|---|
| `azurerm_kubernetes_cluster` | The AKS resource type; manages the control plane and default node pool |
| `default_node_pool` | Required block defining the worker nodes pods schedule onto |
| Managed identity | An Azure AD identity AKS uses to manage supporting resources without a stored credential |
| `network_plugin = "azure"` | Gives pods real VNet IP addresses instead of an overlay network |
