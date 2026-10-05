# Lesson 2 — The Shared Responsibility Model for Data

**Chapter 1 · Cloud Governance Architecture · Lesson 2 of 25**

## What you'll learn

- The general shared responsibility model both Azure and AWS publish, in plain terms
- How responsibility shifts as you move from IaaS to PaaS to SaaS
- The one governance responsibility that never transfers to the provider, no matter the service model
- Why "the cloud provider handles security" is a dangerous half-truth

## "Security of the cloud" vs. "security in the cloud"

Both Microsoft and AWS publish a version of the same model, and both use almost identical language for it. AWS calls it security **of** the cloud versus security **in** the cloud. Microsoft's version draws the same line: the cloud provider secures the physical data centers, host hardware, networking infrastructure, and the virtualization layer. The customer is responsible for everything they put on top of it — their data, their identities, their access configuration, and (depending on the service model) their operating system and applications.

This is not a vague split. It is a hard boundary with real consequences: a misconfigured S3 bucket permission or an Azure Storage account left open to the internet is **always** the customer's failure, never the provider's, even though the storage service itself runs on infrastructure the provider built and secured.

## How the line moves with the service model

The provider's share of responsibility grows as you move up the stack — but your data-governance responsibilities barely shrink at all:

- **IaaS (e.g., an Azure VM or an EC2 instance running SQL Server)** — you patch the OS, configure the database, manage encryption keys, and control every access path yourself. The provider secures the physical host and hypervisor only.
- **PaaS (e.g., Azure SQL Database or Amazon RDS)** — the provider now patches the OS and manages the database engine. You still decide who can connect, what's encrypted, what's logged, and what data is sensitive.
- **SaaS (e.g., Microsoft 365 or a vendor analytics platform built on AWS)** — the provider runs almost the entire stack. You still own your tenant's access policy, your users' credentials, and which of your data lives inside it.

Notice what doesn't change across all three rows: **you never stop owning data classification and access control decisions.** The provider can give you encryption at rest by default, strong IAM primitives, and audit logging — but it cannot decide for you which data is sensitive, who should be allowed to see it, or how long it should be retained. Those are governance decisions, and they stay with the customer at every service tier.

## Why this matters for a governance program

The shared responsibility model is the reason "we moved to the cloud, so it's secure now" is a dangerous sentence. Every major cloud data breach traced back to a misconfiguration — not a provider failure — happened inside the customer's half of this line: an overly permissive IAM policy, a public storage bucket, an unencrypted database left open by default settings nobody reviewed. A governance program's job in the cloud is to make sure the customer's side of this boundary is actually being managed, not assumed away because "the cloud" is handling it.

## Key terms

| Term | Meaning |
|---|---|
| Shared responsibility model | The documented split between what the cloud provider secures and what the customer remains responsible for |
| Security of the cloud | The provider's responsibility: physical infrastructure, host hardware, networking, virtualization |
| Security in the cloud | The customer's responsibility: data, identities, access configuration, and (depending on tier) OS/app security |
| IaaS / PaaS / SaaS | Infrastructure/Platform/Software as a Service — service models where the provider's share of the stack grows, but data governance decisions stay with the customer |

## Lab

Pick one real or hypothetical cloud resource — a VM-hosted database, a managed PaaS database, and a SaaS application. For each, write one line naming exactly what you'd be responsible for governing (access, classification, encryption choices) versus what the provider handles. Notice how little the "your responsibility" column shrinks even as the service model gets more managed.

## Check yourself

Can you explain, without looking back, why a publicly exposed storage bucket is always the customer's failure under the shared responsibility model — even though the storage service itself runs on infrastructure the cloud provider built?
