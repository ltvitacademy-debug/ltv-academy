# Script — Provisioning the Kubernetes Cluster

## Segment 1 (title)

With networking, remote state, and the database in place, this lesson adds what everything else in the course actually deploys onto: the AKS clusters themselves. Northbridge defines two, as Terraform resources right alongside last lesson's VNets and Postgres server.

## Segment 2 (steps)

Northbridge runs northbridge-aks-dev, which hosts both the dev and staging namespaces to save on node costs, and a separate, isolated northbridge-aks-prod that hosts only the prod namespace. Production never shares a cluster with anything else, so a misbehaving dev workload can never starve prod of capacity.

## Segment 3 (code)

The azurerm_kubernetes_cluster resource takes a system node pool running Standard D4s v5 nodes, autoscaling between two and five. The same module, parameterized by environment, produces both the dev and prod clusters — the identical pattern from the networking module in the last lesson.

## Segment 4 (steps)

That system pool runs cluster infrastructure like CoreDNS and the ingress controller and should stay mostly undisturbed. Northbridge adds a second user node pool, same VM size, same autoscaling range, dedicated to product-catalog and checkout — so a flash-sale spike in checkout traffic scales the user pool without ever touching the nodes the cluster itself depends on. That pool's mode is set to User specifically, marking it safe for the scheduler to evict and rebalance workloads on, which the default system pool is not.

## Segment 5 (code)

Every deployment pulls images from northbridgeacr.azurecr.io. Instead of generating a registry credential and storing it as a Kubernetes secret, Northbridge grants the cluster's kubelet identity the built-in AcrPull role directly on the registry. Any pod referencing that registry pulls successfully with zero imagePullSecrets anywhere in a chart or manifest.

## Segment 6 (outro)

The clusters can now host workloads and pull images. Next up: ingress, workload identity, Key Vault, and the GitHub Actions OIDC setup that lets CI deploy into them.
