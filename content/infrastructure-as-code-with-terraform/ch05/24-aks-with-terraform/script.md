## Segment 1 (title)

Northbridge's checkout service is containerized, and containers need an orchestrator. Rather than running VMs and installing Kubernetes by hand, Northbridge runs AKS -- a managed control plane with a node pool Terraform defines declaratively, the same way as every other resource in this chapter.

## Segment 2 (code: the cluster and its default node pool)

azurerm_kubernetes_cluster requires a default_node_pool, defining the worker nodes every pod actually schedules onto, and an identity block -- both non-negotiable, Terraform refuses to plan without them. Three nodes on a Standard_D4s_v5 size gives checkout enough capacity to tolerate one node failing without an outage, and the control plane itself is managed and billed by Azure, completely separate from the node VMs you're paying for and sizing here.

## Segment 3 (steps: three settings that matter here)

node_count sets how many worker nodes exist, and vm_size sets how powerful each one is -- both can scale independently of the control plane. SystemAssigned identity gives the cluster its own Azure AD identity, so it can manage load balancers and managed disks on your behalf with no stored credential anywhere in the configuration. And network_plugin azure gives pods real addresses from the VNet you built back in Lesson 22, instead of a separate overlay network that other Azure resources couldn't reach directly.

## Segment 4 (code: from apply to kubectl)

Once terraform apply finishes, az aks get-credentials pulls the cluster's kubeconfig, and kubectl get nodes confirms all three are ready. Terraform's job was getting the cluster itself to exist; deploying the checkout service's containers onto it is kubectl's job, and a different tool's responsibility from here.

## Segment 5 (outro)

Order processing on VMs, the storefront on App Service, checkout on AKS -- three compute models, one Terraform workflow, all for Northbridge's Azure footprint. Northbridge also runs workloads on AWS, and Chapter 6 picks up there, starting with the AWS provider.
