# Lesson 24 — The Shared Responsibility Model

**Chapter 6 · Cloud Computing Fundamentals · Lesson 24 of 32**

## What you'll learn

- The real AWS/Azure framework for cloud security: "security OF the cloud" versus "security IN the cloud"
- What's always the provider's job — physical datacenters, host infrastructure, and the hypervisor
- What's always your job — your data, identity and access management, and the network controls you configure
- How the responsibility line moves as you go from IaaS toward PaaS and SaaS

## Security OF the cloud vs. security IN the cloud

AWS and Azure both describe cloud security with the same split, even if the exact wording
differs slightly between them. The provider is responsible for **security OF the cloud**: the
physical security of its datacenters, the host hardware, the network backbone, and the hypervisor
that keeps every customer's workloads isolated from each other. You are responsible for
**security IN the cloud**: what you put into it and how you configure it — your data, who can
access it, and, on any model where you manage an OS, keeping that OS patched.

## What the provider always owns

No matter which service model you're using, you never personally guard a datacenter, bolt down a
server rack, or patch a hypervisor. That's always on the provider:

- Physical security of the datacenter — badges, cameras, guards, restricted access
- The physical servers and host hardware the hypervisor runs on
- The hypervisor itself, which isolates one customer's virtual machines from another's
- The physical network backbone connecting their datacenters and regions

## What you always own

Regardless of model, a few things are never the provider's job:

- **Your data** — its classification, encryption, and backups
- **Identity and access management** — who can sign in and what they're allowed to do, whether that's AWS IAM users and roles or Azure AD / Entra ID accounts
- **The network controls you're given** — configuring security groups or network security groups correctly
- **OS patching**, specifically when you're running IaaS and the OS is yours to manage

## Responsibility shifts as you move up the stack

The line between "provider" and "you" isn't fixed — it slides as you move from IaaS toward SaaS,
exactly along the layers from the previous lesson.

On an **EC2 instance (IaaS)**, you patch the guest OS, configure its security group, and manage
your data — AWS only secures the physical layer and the hypervisor underneath it. On a managed
database like **RDS**, AWS patches the OS and the database engine itself, while you still manage
the schema, the data, and who has access to it. On **Microsoft 365 (SaaS)**, Microsoft manages the
entire application and its underlying OS — but you still manage user identities, sharing
settings, and the sensitivity of the data your organization puts into it.

## Why this matters in practice

A misconfigured S3 bucket that exposes customer data publicly is not an AWS failure — access
control on your own data is squarely security IN the cloud, your responsibility. A flaw that let
one customer's virtual machine read another customer's memory through the hypervisor would be
AWS's responsibility — security OF the cloud. In the real world, the overwhelming majority of
cloud security incidents trace back to the customer side: a leaked access key, an overly
permissive IAM policy, or a storage bucket left open — not a failure of the provider's physical or
hypervisor-level security.

## Key terms

| Term | Meaning |
|---|---|
| Shared Responsibility Model | The framework dividing security duties between cloud provider and customer |
| Security OF the cloud | The provider's job: physical, host, hypervisor, and network infrastructure security |
| Security IN the cloud | The customer's job: data, identity/access, and the configuration they control |
| IAM | Identity and Access Management — controlling who and what can access cloud resources |

## Check yourself

A set of AWS access keys gets leaked and an attacker uses them to read data from an S3 bucket.
Under the shared responsibility model, why is that the customer's responsibility and not AWS's?
