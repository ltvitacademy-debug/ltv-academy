# Lesson 23 — Multi-Cloud Governance Case Study

**Chapter 5 · Multi-Cloud Governance · Lesson 23 of 25**

## What you'll learn

- A full walkthrough applying every chapter of this course — Azure and AWS both — to one realistic, fictional scenario
- How identity, storage, catalog, and compliance controls get deliberately mapped across a cloud boundary, instead of invented from scratch
- How the policy-drift risk from Lesson 21 and the cross-cloud catalog pattern from Lesson 22 show up together in one real decision
- What a genuinely coherent multi-cloud governance program looks like end to end

## The scenario (fictional, illustrative)

**Briarcliff Outdoor Gear**, a fictional mid-sized outdoor equipment retailer, runs its core business — ERP, order management, employee identity — on Azure. Two years ago, Briarcliff acquired a smaller online-only competitor whose entire clickstream and marketing analytics platform already lived in AWS: raw event data landing in S3 buckets, queried through Redshift. Nobody has migrated it, because it works, and because migrating a live analytics pipeline is expensive and risky for a dataset that isn't broken. This is a realistic composite of the "secondary cloud footprint from an acquisition" pattern named in Lesson 21 — not a real company's architecture.

The problem: Briarcliff's security team can run a clean access review on Azure in an afternoon. The AWS side is a black box to them — different console, different IAM model, no one on the security team has AWS credentials, and the only documentation is a wiki page the acquired company's engineers wrote three years ago. When a regulator asks "who can access customer browsing data, across every system," nobody can answer with confidence.

## Applying the course, chapter by chapter

**Chapter 1 (Cloud Governance Architecture):** Briarcliff's governance lead starts by mapping the shared responsibility model (Lesson 2) for both clouds side by side, and documenting it in one place instead of assuming they match. They treat Azure as the primary cloud architecture (Lesson 3) and the AWS footprint as a landing zone of its own (Lesson 4) that needs the same environment discipline — dev, staging, production — AWS-side that Azure already has.

**Chapter 2 (Identity and Access):** Rather than creating separate AWS IAM users for every Azure employee who needs analytics access, the team sets up a federation trust so Entra ID (Lesson 7) is the one source of truth for identity, and AWS IAM roles (Lesson 9) are granted through that trust instead of standalone AWS logins. Azure-side resources stay governed by Azure RBAC (Lesson 8) exactly as before. The access governance pattern (Lesson 10) — least privilege, scheduled access reviews — now applies to both clouds through the same quarterly process, because there's one identity system driving both.

**Chapter 3 (Storage and Catalogs):** The Redshift warehouse and S3 event buckets get governed with AWS-native tools — S3 bucket policies and AWS Lake Formation permissions (Lesson 15) for fine-grained table access, cataloged in the AWS Glue Data Catalog (Lesson 14) the acquired team already maintained. Rather than abandoning that and rebuilding from zero, Briarcliff registers the S3 buckets into their existing Microsoft Purview catalog using the multicloud scanning connector from Lesson 22 — so for the first time, a steward can search "customer browsing data" and see both the Azure CRM records and the AWS clickstream files in one result list.

**Chapter 4 (Security and Compliance):** The team builds one encryption standard (Lesson 16) — AES-256 at rest, everywhere — and implements it with Azure Key Vault on the Azure side and AWS KMS on the AWS side, rather than trying to force one key-management service to serve both clouds. They write the access-review and encryption requirements once as an Azure Policy initiative (Lesson 18), then translate the same requirements into an AWS Organizations service control policy (Lesson 19) for the AWS account — closing exactly the kind of policy-drift gap Lesson 21 warned about, by treating the translation as a required step of the same change, not a follow-up ticket that can slip.

**Chapter 5 (Multi-Cloud Governance):** Audit logging gets unified last: Azure Activity Log and AWS CloudTrail both feed into one central log destination, so an investigation doesn't require two separate timestamp formats and two separate query languages. The governance lead keeps a single tracking sheet mapping every Azure control to its AWS equivalent — the exact four-row table from Lesson 21's lab — and reviews it quarterly specifically to catch drift before an audit does.

## The result

Six months later, the security team can answer the regulator's question in one search: Purview's catalog shows every system touching customer browsing data, Azure and AWS both, with the steward of each one listed. The access review that used to take an afternoon on Azure and never happen on AWS now takes an afternoon total, because one identity system and one policy mapping cover both. Nothing about the underlying AWS infrastructure changed — the clickstream pipeline still runs exactly as the acquired team built it. What changed is that it's now **governed**, not just running.

## This lesson's closing point

Multi-cloud governance doesn't require migrating everything onto one provider, and it doesn't require a brand-new universal tool. It requires exactly what Chapters 1 through 4 already taught, applied twice — once per cloud — with a deliberate, actively maintained map connecting the two, so a gap on one side doesn't go unnoticed just because it's not the cloud most of the team works in every day.

## Key terms

| Term | Meaning |
|---|---|
| Secondary cloud footprint | A smaller, specific presence on a non-primary cloud, often inherited through an acquisition rather than chosen deliberately |
| Federation trust (identity) | Configuring one cloud's IAM to grant access based on another cloud's identity provider, so there's one source of truth for "who is this person" |
| Control mapping sheet | A maintained document pairing each primary-cloud governance control with its equivalent control on the secondary cloud, used to catch policy drift |

## Lab

Using the four-row table you built in Lesson 21's lab (identity, policy enforcement, catalogs, audit logs), add a fifth column: "Owner — who is responsible for keeping both sides of this row in sync." If you genuinely don't know who that would be at a real organization, write "unassigned" — that gap is itself the most common real-world cause of policy drift.

## Check yourself

Can you walk through the Briarcliff Outdoor Gear scenario from memory, chapter by chapter, and explain why the fix wasn't migrating AWS workloads onto Azure — it was building one identity system and one active control-mapping habit that covered both?
