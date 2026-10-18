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

## Free-tier reality check

EKS is less forgiving than AKS on cost, so plan the lab deliberately:

- **The control plane is never free.** Unlike AKS's Free tier, EKS bills its control plane at a flat hourly rate (around $0.10/hour per cluster at the time of writing — check AWS's current EKS pricing page, since this isn't guaranteed to stay the same) from the moment the cluster exists until you delete it, regardless of whether any Pods are running.
- **You can't "stop" an EKS cluster the way you can stop an AKS cluster.** Scaling a managed node group to zero nodes (`eksctl scale nodegroup --nodes 0 ...`) stops the EC2 charges, but the control-plane hourly fee keeps running as long as the cluster exists. The only way to actually stop paying is to delete the cluster.
- **Minimize node cost for the lab itself.** Use the smallest burstable instance type you can (`t3.small` or `t3.micro` instead of `t3.medium`) and `--nodes 1` instead of 3 — or skip managed nodes entirely and run the lab's Pods on a Fargate profile, so you're not paying for idle EC2 capacity between commands.
- **Tear the cluster down the moment you're done with it:**

  ```bash
  eksctl delete cluster --name northbridge-eks --region us-east-1
  ```

  This removes the control plane, the node group, and the VPC/networking `eksctl` created for it — don't leave it running overnight or between study sessions.
- **Reach for EKS only when you specifically need it.** Anything that doesn't require testing against a real AWS load balancer or IAM integration — the `kubectl` mechanics covered in Chapters 1–6 — works identically, for free, on the `kind` cluster from Chapter 1. Treat the real EKS cluster as something you spin up for this lesson's specific exercises and delete right after, not something to leave running for the rest of the course.

## Key terms

- **EKS (Amazon Elastic Kubernetes Service)** — AWS's managed Kubernetes offering; AWS runs the (billed) control plane, the customer runs node groups or Fargate
- **eksctl** — the AWS-maintained CLI for creating and managing EKS clusters in one command
- **Managed node group** — EC2 instances AWS provisions and can patch, running Pods for an EKS cluster
- **Fargate profile** — a serverless option that runs matching Pods without any EC2 instances to manage
