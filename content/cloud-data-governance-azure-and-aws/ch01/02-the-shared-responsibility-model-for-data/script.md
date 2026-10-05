# Lesson 2 — The Shared Responsibility Model for Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Both Azure and AWS publish a shared responsibility model. This lesson applies it specifically to data.

## S2 · STEPS — Security of vs. in the cloud

AWS calls it security of the cloud versus security in the cloud. Microsoft draws the same line. The provider secures physical data centers, host hardware, networking, and virtualization. You're responsible for everything on top — your data, your identities, your access configuration. This is a hard boundary: a publicly exposed storage bucket is always the customer's failure, never the provider's.

## S3 · STEPS — IaaS to PaaS to SaaS

The provider's share grows as you move up the stack. On a VM or EC2 instance, you patch the OS and manage every access path yourself. On a managed database like Azure SQL or RDS, the provider patches the OS, but you still decide who connects and what's encrypted. Even on a fully managed SaaS app, you still own your tenant's access policy and which of your data lives inside it.

## S4 · STEPS — The line that never moves

Notice what doesn't change: you never stop owning classification and access decisions. The provider can give you encryption by default and strong IAM tools, but it can't decide what's sensitive or who should see it. That stays with you at every tier — and it's why almost every cloud data breach traces back to a customer-side misconfiguration, not a provider failure.

## S5 · OUTRO

Next lesson: how governance actually maps onto Azure's and AWS's account and subscription hierarchies.
