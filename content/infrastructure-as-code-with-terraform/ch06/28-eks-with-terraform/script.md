# Script — EKS With Terraform

## Segment 1 (title)

Chapter 5 put Northbridge's checkout service on AKS. This lesson gives it an AWS-native home: EKS, Amazon's managed Kubernetes service. The pattern is the same shape you already learned — a managed control plane, then a managed node group to run the actual workload — just expressed through aws resource types instead of azurerm ones.

## Segment 2 (code)

aws_eks_cluster provisions the control plane, the managed Kubernetes API server AWS operates on Northbridge's behalf. Just like the Lambda function from the last lesson, the cluster doesn't hold its own credentials — role_arn points at an IAM role the EKS service assumes instead. The vpc config places the control plane's network interfaces across subnets in at least two availability zones, which EKS requires for high availability.

## Segment 3 (code)

The control plane alone runs no workloads. A node group of actual EC2 instances is what checkout's pods actually schedule onto. Cluster name ties this node group to the cluster block, so Terraform creates the cluster first. Scaling config is the AWS-native equivalent of the AKS node pool settings from Chapter 5 — Northbridge's checkout service runs on three nodes normally, scaling as low as two and as high as six depending on load.

## Segment 4 (steps)

Step back and the shape is identical to what you built for AKS: a managed control plane resource, a node group referencing it, and an IAM role or service principal wiring permissions together. What changes between clouds is the resource type prefix and the exact permission model. Recognize that shared pattern once, and moving between cloud providers gets much faster.

## Segment 5 (outro)

That closes out Northbridge's AWS buildout — provider, networking, compute, storage, access control, serverless, and now Kubernetes. Up next, Chapter 7: Terraform in Teams, starting with Lesson 29, workspaces and environments.
