# EKS With Terraform

Chapter 5 put Northbridge Retail's checkout service on AKS. This lesson gives it an AWS-native home: EKS, Amazon's managed Kubernetes service. The pattern is the same shape you already learned — a managed control plane, then a managed node group to run the actual workload — just expressed through `aws` resource types instead of `azurerm` ones.

## What you'll learn

- How `aws_eks_cluster` defines the managed Kubernetes control plane
- How `aws_eks_node_group` provisions the worker nodes that actually run pods
- Why both resources need an IAM role, following the same least-privilege pattern as Lesson 27
- How this AWS-native setup compares to the AKS cluster from Chapter 5

## The EKS cluster

`aws_eks_cluster` provisions the control plane — the managed Kubernetes API server AWS operates on Northbridge's behalf:

```hcl
resource "aws_eks_cluster" "checkout" {
  name     = "northbridge-checkout"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.29"

  vpc_config {
    subnet_ids = [
      aws_subnet.order_processing.id,
      aws_subnet.checkout_secondary.id
    ]
  }
}
```

Just like the Lambda function in Lesson 27, the cluster doesn't hold its own credentials — `role_arn` points at an IAM role the EKS service assumes. `vpc_config.subnet_ids` places the control plane's network interfaces across at least two subnets in different availability zones, which EKS requires for high availability.

## The IAM role the cluster assumes

```hcl
resource "aws_iam_role" "eks_cluster" {
  name = "northbridge-eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "eks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  role       = aws_iam_role.eks_cluster.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}
```

This is the exact same role-policy-attachment pattern from Lesson 27, just pointed at a different AWS-managed policy. The `eks.amazonaws.com` principal is what's different from the Lambda example — here it's the EKS control plane itself that assumes the role, not a function.

## The managed node group

The control plane alone runs no workloads. A node group of actual EC2 instances is what checkout's pods schedule onto:

```hcl
resource "aws_eks_node_group" "checkout" {
  cluster_name    = aws_eks_cluster.checkout.name
  node_group_name = "northbridge-checkout-nodes"
  node_role_arn   = aws_iam_role.eks_node.arn
  subnet_ids      = aws_subnet.order_processing.id[*]

  scaling_config {
    desired_size = 3
    max_size     = 6
    min_size     = 2
  }

  instance_types = ["t3.medium"]
}
```

`cluster_name` ties this node group to the cluster block above, so Terraform creates the cluster first. `scaling_config` is the AWS-native equivalent of the AKS node pool's autoscaling settings from Chapter 5: Northbridge's checkout service runs on 3 nodes normally, scaling as low as 2 and as high as 6 depending on load. `node_role_arn` is a second IAM role — node groups and the cluster control plane assume different roles with different permissions, another application of least privilege.

## How this compares to AKS

The shape is identical to what you built in Chapter 5: a managed control plane resource, a node pool or node group resource referencing it, and IAM or RBAC wiring connecting them. What changes between clouds is the resource type prefix and the exact permission model — `azurerm_kubernetes_cluster` uses an Azure service principal or managed identity, `aws_eks_cluster` uses an IAM role. Recognizing that shared pattern is what lets you move between providers quickly once you've learned it once.

## Key terms

| Term | Meaning |
|---|---|
| `aws_eks_cluster` | The managed Kubernetes control plane AWS operates on Northbridge's behalf |
| `aws_eks_node_group` | A managed group of EC2 instances that actually run Kubernetes pods |
| `vpc_config.subnet_ids` | Where the cluster's network interfaces live; EKS requires subnets across multiple availability zones |
| `scaling_config` | Desired, minimum, and maximum node counts for a node group's autoscaling |
| Node role vs. cluster role | Two separate IAM roles with separate permissions, one for the control plane and one for the worker nodes |
