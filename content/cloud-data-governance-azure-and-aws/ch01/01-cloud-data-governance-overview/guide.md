# Lesson 1 — Cloud Data Governance Overview

**Chapter 1 · Cloud Governance Architecture · Lesson 1 of 25**

## What you'll learn

- What "cloud data governance" means, and how it differs from governing data in an on-premises data center
- Four properties of the cloud that make governance harder — and more necessary — than it was before
- Why this course teaches Azure and AWS side by side instead of picking one
- The five-chapter roadmap this course follows

## What "cloud data governance" actually adds

Everything the Data Governance Foundations course covered — decision rights, stewardship, policy, data quality — still applies in the cloud. Nothing about moving to Azure or AWS changes *what* governance is. What changes is the terrain it has to operate on. Cloud data governance is the application of those same governance principles to data that lives in elastic, API-driven, multi-tenant infrastructure you don't own, provisioned by people across the company who may never file a ticket with IT first.

## Four things the cloud changes

1. **Anyone can provision storage.** A developer with a credit card and console access can spin up an S3 bucket or an Azure Storage account in minutes, with sensitive data in it an hour later — no procurement process, no governance review, unless policy explicitly prevents it.
2. **The shared responsibility model splits accountability.** Azure and AWS secure the physical infrastructure; you remain fully responsible for who can access your data and how it's classified, no matter which service tier you use. Lesson 2 covers this in depth.
3. **Governance has to be expressed as code or policy, not memos.** A written policy that says "encrypt all storage accounts" does nothing on its own. In the cloud, governance that isn't enforced through a policy engine (Azure Policy, AWS Config, IAM) is just a suggestion a future engineer can skip.
4. **Scale and sprawl happen faster.** A single Azure subscription or AWS account can contain thousands of resources within months. Governance that depends on someone manually reviewing each new resource falls behind almost immediately.

## Why this course covers Azure and AWS together

Most organizations today aren't single-cloud by design — they're multi-cloud by accumulation: an acquisition brought AWS accounts, a partnership required an Azure tenant, a team picked whichever cloud they were comfortable with. A data governance professional who only knows one cloud's console is only half-useful at most real employers. More importantly, the underlying governance *concepts* — identity-based access control, resource hierarchies, policy enforcement, encryption key management, audit logging — are the same ideas with different names and different consoles. Learning both at once, concept by concept, is faster than learning one cloud deeply and then relearning everything under new names later.

## Where this course goes from here

- **Chapter 1 (this chapter)** stays architectural: the shared responsibility model, how governance layers onto cloud account/subscription structure, landing zones, and keeping governance consistent across dev/test/prod.
- **Chapter 2** goes hands-on with identity: Microsoft Entra ID, Azure RBAC, AWS IAM, and the access-governance patterns built on top of them.
- **Chapter 3** covers where governed data actually lives: Azure Data Lake Storage, Amazon S3, and the catalogs (Purview, AWS Glue, AWS Lake Formation) that make it discoverable.
- **Chapter 4** covers encryption, compliance frameworks, and the policy engines (Azure Policy, AWS Organizations/SCPs) that enforce governance automatically.
- **Chapter 5** closes with the hardest problem — governing data that spans both clouds at once.

## Key terms

| Term | Meaning |
|---|---|
| Cloud data governance | Applying governance principles (decision rights, stewardship, policy) to data on elastic, API-driven cloud infrastructure |
| Shared responsibility model | The split between what the cloud provider secures and what the customer remains responsible for |
| Multi-cloud | Using more than one cloud provider, whether by deliberate strategy or organizational accumulation |
| Policy-as-code | Expressing governance rules as enforceable, machine-readable policy rather than written procedure alone |

## Lab

List every cloud account or subscription you know of at your own organization (or a past employer) — Azure, AWS, or otherwise. For each one, write one sentence on who you believe is actually accountable for what data governance happens inside it. If you genuinely don't know, write "unclear" — that answer is itself a governance finding.

## Check yourself

Can you name, without looking back, the four properties of cloud infrastructure that make governance harder than it was on-premises, and explain in one sentence why this course teaches Azure and AWS together rather than separately?
