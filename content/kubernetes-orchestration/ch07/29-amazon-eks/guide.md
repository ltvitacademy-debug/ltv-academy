# Amazon EKS

Northbridge's primary footprint is Azure, but a secondary deployment — a regional fulfillment integration — runs on AWS. Rather than run two completely different operational models, the team uses **EKS, Amazon Elastic Kubernetes Service**: the same managed-control-plane idea as AKS, Amazon's implementation of it.

## What you'll learn

- What EKS manages versus what Northbridge still manages, and how that compares to AKS
- Two ways to create a cluster: `eksctl` versus the raw `aws eks` CLI
- Managed node groups versus Fargate profiles as ways to run Pods
- Connecting `kubectl` to an EKS cluster

## The same split, AWS's implementation

![EKS architecture diagram: a managed Kubernetes control plane running across AWS availability zones, with worker nodes or Fargate running the actual Pods](/courses/kubernetes-orchestration/ch07/29-amazon-eks/eks-architecture.png)
*AWS's own architecture diagram: a managed, multi-AZ control plane, with workloads running on worker nodes or Fargate.*

Like AKS, EKS's control plane — API server, etcd, scheduler — is run and patched by AWS, replicated across multiple Availability Zones for resilience. Unlike AKS, EKS's control plane isn't free; it's billed hourly. Northbridge still owns everything that runs the actual Pods — either EC2-based worker nodes or AWS Fargate, a serverless option that removes node management entirely.

## Creating a cluster with eksctl

`eksctl` is the AWS-maintained CLI purpose-built for EKS — it wraps what would otherwise be a long sequence of raw AWS CLI and CloudFormation calls:

```bash
eksctl create cluster \
  --name northbridge-eks \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 3
```

That single command provisions the VPC, the control plane, a managed node group, and writes the connection details into `kubeconfig` automatically — the equivalent of several `az aks` calls chained together.

## Managed node groups vs. Fargate profiles

A **managed node group** is EKS's equivalent of an AKS node pool: a set of EC2 instances AWS provisions and can patch, with Northbridge choosing instance type and count. A **Fargate profile** is different — there are no EC2 instances to manage at all; AWS runs each matching Pod on its own right-sized, serverless compute. Northbridge's fulfillment Pods, which run only a few times a day, fit Fargate well; a steady-traffic service is usually cheaper on a managed node group.

```bash
eksctl create nodegroup \
  --cluster northbridge-eks \
  --name standard-workers \
  --node-type t3.medium \
  --nodes 3
```

## Connecting kubectl manually

If a cluster was created outside `eksctl` — through the console, say — `kubectl` is connected the same way AKS does it, just with the AWS CLI:

```bash
aws eks update-kubeconfig \
  --name northbridge-eks \
  --region us-east-1
```

From there, every `kubectl` command from earlier in this course works exactly the same against EKS as it does against AKS or a self-managed cluster.

## Key terms

- **EKS (Amazon Elastic Kubernetes Service)** — AWS's managed Kubernetes offering; AWS runs the (billed) control plane, the customer runs node groups or Fargate
- **eksctl** — the AWS-maintained CLI for creating and managing EKS clusters in one command
- **Managed node group** — EC2 instances AWS provisions and can patch, running Pods for an EKS cluster
- **Fargate profile** — a serverless option that runs matching Pods without any EC2 instances to manage
