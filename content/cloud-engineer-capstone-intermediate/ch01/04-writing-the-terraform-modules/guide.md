# Lesson 4 — Writing the Terraform Modules

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 4 of 16**

## What you'll learn

- The real Azure resources this Terraform configuration provisions: resource group, VNet/subnet,
  Azure Container Registry, and an AKS cluster
- How the storefront app's Helm release — including its autoscaling settings — gets provisioned
  by the same Terraform run
- A deadline-pressured decision that looks completely reasonable today

## The infrastructure, in Terraform

With the Spring launch roughly ten weeks out and a long list of infrastructure to stand up before
then, Theo writes one Terraform configuration covering networking, the registry, and the cluster:

```hcl
resource "azurerm_resource_group" "driftwood" {
  name     = "rg-driftwood-prod"
  location = "eastus"
}

resource "azurerm_virtual_network" "driftwood" {
  name                = "vnet-driftwood-prod"
  address_space       = ["10.20.0.0/16"]
  location            = azurerm_resource_group.driftwood.location
  resource_group_name = azurerm_resource_group.driftwood.name
}

resource "azurerm_subnet" "aks" {
  name                 = "snet-aks"
  resource_group_name  = azurerm_resource_group.driftwood.name
  virtual_network_name = azurerm_virtual_network.driftwood.name
  address_prefixes     = ["10.20.1.0/24"]
}

resource "azurerm_container_registry" "driftwood" {
  name                = "acrdriftwoodprod"
  resource_group_name = azurerm_resource_group.driftwood.name
  location            = azurerm_resource_group.driftwood.location
  sku                 = "Standard"
}

resource "azurerm_kubernetes_cluster" "driftwood" {
  name                = "aks-driftwood-prod"
  location            = azurerm_resource_group.driftwood.location
  resource_group_name = azurerm_resource_group.driftwood.name
  dns_prefix          = "driftwood-prod"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D2s_v5"
    vnet_subnet_id = azurerm_subnet.aks.id
  }

  identity {
    type = "SystemAssigned"
  }
}
```

Four resources, implicit dependencies throughout — the subnet references the VNet's name, the
cluster's node pool references the subnet's ID — so Terraform works out the create order on its
own, exactly the pattern from the Terraform fundamentals course.

## Deploying the app with the same `terraform apply`

Rather than hand the cluster off and run Helm separately, Theo adds a `helm_release` resource so
`terraform apply` provisions the cluster *and* installs the storefront app's chart onto it in one
pass — fully consistent with Casey's "everything in code" ask:

```hcl
resource "helm_release" "storefront" {
  name       = "storefront"
  chart      = "./charts/storefront"
  namespace  = "driftwood-prod"
  create_namespace = true

  values = [
    file("${path.module}/values-prod.yaml")
  ]

  set {
    name  = "image.repository"
    value = "${azurerm_container_registry.driftwood.login_server}/storefront"
  }
}
```

## The decision made under deadline pressure

`values-prod.yaml` needs an autoscaling block — a floor and ceiling for how many pods the
storefront app runs, and the CPU threshold that triggers scaling between them. Sizing that from
scratch means guessing at traffic Driftwood hasn't seen yet, with ten weeks on the clock and a
cluster, a registry, a pipeline, and an AWS bucket still ahead of him.

A former colleague had shared a `values-prod.yaml` template from a previous engagement — a much
higher-traffic retail client that needed to stay up through flash sales. It's a known-good,
battle-tested starting point, and reusing it is the kind of decision that looks responsible, not
careless:

```yaml
# values-prod.yaml
replicaCount: 10
image:
  repository: acrdriftwoodprod.azurecr.io/storefront
  tag: ""
autoscaling:
  enabled: true
  minReplicas: 10
  maxReplicas: 20
  targetCPUUtilizationPercentage: 65
```

Theo adapts the template directly, with a mental note to right-size `minReplicas` and
`maxReplicas` once there's a few weeks of Driftwood's own traffic data to look at — a step that
doesn't make it onto any ticket, and competes with everything else still ahead of launch.

## `terraform plan` before anything is real

```
Terraform will perform the following actions:

  # azurerm_resource_group.driftwood will be created
  # azurerm_virtual_network.driftwood will be created
  # azurerm_subnet.aks will be created
  # azurerm_container_registry.driftwood will be created
  # azurerm_kubernetes_cluster.driftwood will be created
  # helm_release.storefront will be created

Plan: 6 to add, 0 to change, 0 to destroy.
```

Nothing in this plan output calls out `minReplicas: 10` as unusual — it's a valid, well-formed
value that simply guarantees ten pods run around the clock, no matter how little traffic the app
actually sees.

## Key terms

| Term | Meaning |
|---|---|
| `azurerm_kubernetes_cluster` | The Terraform resource that provisions an AKS cluster and its default node pool |
| `helm_release` (Terraform) | A Terraform resource that installs/manages a Helm chart as part of the same apply |
| `minReplicas` / `maxReplicas` | The floor and ceiling pod count an autoscaler will keep a Deployment between |
| `targetCPUUtilizationPercentage` | The CPU threshold that triggers scaling between `minReplicas` and `maxReplicas` |

## Lab

Write your own `azurerm_kubernetes_cluster` block for a cluster named `aks-lab-dev` with a
2-node default pool, then add a `helm_release` resource that installs a chart from
`./charts/sample` into a `lab-dev` namespace.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what does `minReplicas: 10`
actually guarantee is running on this cluster at all times, independent of real traffic — and why
did reusing another project's `values-prod.yaml` look like the responsible choice here?
