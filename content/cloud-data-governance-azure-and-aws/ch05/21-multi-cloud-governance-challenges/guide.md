# Lesson 21 — Multi-Cloud Governance Challenges

**Chapter 5 · Multi-Cloud Governance · Lesson 21 of 25**

## What you'll learn

- Why governing data across Azure and AWS together is harder than governing either cloud alone
- The four places multi-cloud governance typically breaks down: identity, policy, catalogs, and audit logs
- What "policy drift" means and why it's the central risk of running two clouds under one governance program
- A practical default for most real organizations: one primary cloud's controls as the model, deliberately mapped onto the other cloud's native equivalents

## Why two clouds are harder than one

Everything in Chapters 1 through 4 of this course — the shared responsibility model, identity and access, storage and catalog governance, encryption and compliance controls — was taught one cloud at a time. That's not an oversight. Each cloud's governance tooling is genuinely self-contained: Azure Policy only sees Azure resources, AWS Organizations only sees AWS accounts, and neither one knows the other exists. A real organization using both clouds doesn't get a combined governance surface for free — it gets two separate, fully capable governance systems that happen to describe the same company.

The work of multi-cloud governance is **deliberately connecting those two systems** so that a data steward, an auditor, or a security lead can answer one question — "who can touch this data, and is it controlled the way policy requires?" — without learning two unrelated toolsets and manually reconciling the answers.

## The shared responsibility model, twice

Lesson 2 covered the shared responsibility model: the cloud provider secures the infrastructure, the customer secures what they put on it. In a multi-cloud estate, that boundary exists **twice**, drawn in two different places. Azure's division of duties between Microsoft and the customer isn't identical to AWS's division of duties between Amazon and the customer — the exact line of what the provider manages automatically versus what a customer must configure shifts slightly between the two. A governance program that assumes "shared responsibility" means the same checklist on both clouds will quietly miss items that one provider handles differently than the other.

## Four places multi-cloud governance breaks

1. **Identity** — Microsoft Entra ID (Lesson 7) and Azure RBAC (Lesson 8) govern Azure. AWS IAM (Lesson 9) governs AWS. Unless someone deliberately federates the two — so an AWS IAM role trusts Entra ID as an identity provider, for example — they are two completely separate identity planes. A person who loses Azure access on their last day can still hold a valid AWS IAM user until someone remembers to revoke that, too.
2. **Policy enforcement** — Azure Policy (Lesson 18) and AWS Organizations service control policies (Lesson 19) both exist to enforce guardrails automatically, but they're written in different languages, scoped differently, and evaluated by completely different engines. A rule like "no public storage buckets" has to be written and maintained twice, in two syntaxes, by two different teams who may not talk to each other.
3. **Catalogs** — Azure Data Lake Storage and Amazon S3 are each governed natively (Chapter 3), but by default they're cataloged separately — one inventory for Azure, one for AWS, with no shared search. The next lesson covers the realistic fix for this.
4. **Audit logs** — Azure Activity Log and Microsoft Purview's audit capabilities (Lesson 20) use one log format and retention model; AWS CloudTrail and CloudWatch use another. There's no single pane of glass by default — someone has to build one, or accept that an investigation means checking two separate systems with two separate timestamp formats.

## Policy drift: the central risk

**Policy drift** is what happens when the same governance rule is enforced with different strictness — or not enforced at all — on one cloud versus the other, simply because maintaining two parallel rule sets is more work than maintaining one, and the second one falls behind. A classic example: a company tightens its Azure Policy initiative to require encryption-at-rest on every new storage account after a security review, remembers to update Azure, and forgets that the equivalent AWS Organizations SCP for S3 buckets was never written in the first place. Nothing alerts anyone — the AWS side simply stays one rule behind indefinitely, until an audit or an incident reveals the gap. Policy drift isn't usually the result of a decision; it's the result of two independent backlogs that nobody is explicitly comparing.

## A practical default: most organizations aren't 50/50

In practice, very few companies run a true 50/50 split between Azure and AWS. Far more common is one primary cloud — chosen for the company's core applications, identity system, and existing staff skill set — with a secondary footprint on the other cloud for a specific reason: an acquisition that came with its own AWS account, a service that's genuinely better on one provider, or a legacy system nobody has migrated yet. Given that pattern, the realistic governance strategy isn't to invent a brand-new, cloud-neutral abstraction layer that tries to average Azure and AWS into one made-up system. It's to treat the primary cloud's governance rules as the source of truth, and deliberately translate each rule into the secondary cloud's native controls — Azure Policy's encryption requirement becomes an equivalent AWS SCP, an Entra ID access-review cadence becomes an equivalent AWS IAM Access Analyzer review — so the two clouds enforce the same intent through their own native mechanisms, rather than trying to govern both through a single tool that understands neither one well.

## Key terms

| Term | Meaning |
|---|---|
| Multi-cloud governance | Deliberately connecting two (or more) clouds' independent governance systems so data can be governed consistently across both |
| Policy drift | When the same governance rule is enforced with different strictness on one cloud than another, because the two rule sets aren't being actively compared |
| Control plane fragmentation | The underlying cause of most multi-cloud governance gaps: identity, policy, catalog, and logging tools that don't share data across providers by default |
| Primary / secondary cloud | The common real-world pattern where one cloud hosts the bulk of an organization's workloads and the other holds a smaller, specific footprint |

## Lab

List the four governance areas from this lesson — identity, policy enforcement, catalogs, audit logs. For each one, write one sentence naming the Azure-native tool and the AWS-native tool covered earlier in this course (for example: "Policy enforcement — Azure Policy vs. AWS Organizations SCPs"). This four-row table is the skeleton you'll fill in with real controls in Lesson 24's practice lab.

## Check yourself

Can you explain, in your own words, why "policy drift" happens even at organizations that genuinely care about consistent governance — and why the fix isn't a single universal tool, but a deliberate habit of translating one cloud's rules into the other's native controls?
