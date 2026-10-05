# Lesson 25 — Cloud Governance Review Checklist

**Chapter 5 · Multi-Cloud Governance · Lesson 25 of 25**

## What you'll learn

- A genuinely usable, chapter-by-chapter checklist synthesizing every lesson in this course
- How to use it as a real review tool — against your own cloud environment, a case study, or an interview question
- This course's single biggest piece of closing advice
- Where the Data Governance career path continues from here

## How to use this checklist

This isn't a summary to skim — it's meant to be a working tool. Run it against a real Azure or AWS environment you have access to, against the Briarcliff Outdoor Gear case study from Lesson 23, or against your own Lesson 24 control map. For each item, you should be able to answer with a specific tool, person, or document — not just "yes, we probably do that somewhere."

## Chapter 1 — Cloud Governance Architecture

- [ ] Can you state, in one sentence per cloud, exactly where the provider's responsibility ends and your organization's begins?
- [ ] Does every landing zone (Azure or AWS) have the same environment separation — dev, staging, production — with governance controls applied consistently across all three?
- [ ] Is there a documented governance architecture diagram, not just a mental model held by one person?
- [ ] Are governance controls applied the same way across every environment, or do non-production environments quietly get a pass?

## Chapter 2 — Identity and Access

- [ ] Is there one identity system acting as the source of truth (Entra ID, most commonly), rather than separate logins per cloud or per system?
- [ ] Is Azure RBAC assigned by role, scoped to the resource level it actually needs, not broad subscription-wide grants?
- [ ] Is AWS IAM following the same least-privilege principle, with roles instead of long-lived user access keys wherever possible?
- [ ] Is there a scheduled, recurring access review — not a one-time cleanup that never repeats?

## Chapter 3 — Storage and Catalogs

- [ ] Are Azure Data Lake Storage containers governed with ACLs that map to actual business roles, not "everyone who asked"?
- [ ] Are Amazon S3 buckets governed with bucket policies and, where fine-grained table access matters, AWS Lake Formation permissions?
- [ ] Does a data catalog (Microsoft Purview, or an equivalent) actually cover every major data source — or only the ones someone remembered to register?
- [ ] If you have both Azure and AWS sources, are they cataloged together in one searchable place, or in two separate systems nobody cross-references?

## Chapter 4 — Security and Compliance

- [ ] Is there one encryption-at-rest standard, applied consistently through Azure Key Vault and AWS KMS respectively?
- [ ] Is there a named compliance framework (SOC 2, ISO 27001, GDPR, HIPAA, or whichever applies) that your actual controls are mapped against, not just referenced in passing?
- [ ] Is Azure Policy actively enforcing guardrails, not just available but unused?
- [ ] Is AWS Organizations (with service control policies) doing the equivalent job on the AWS side?
- [ ] Are Azure Activity Log and AWS CloudTrail both feeding a retained, searchable audit trail — not just generating logs nobody reads until something goes wrong?

## Chapter 5 — Multi-Cloud Governance

- [ ] Do you have a written control map — even an informal one — pairing each primary-cloud governance control with its secondary-cloud equivalent?
- [ ] Does every row of that map have a named owner, even if that owner is honestly "unassigned" today?
- [ ] Have you identified which controls sync automatically versus which depend on someone remembering by hand — your real policy-drift risk list?
- [ ] If a regulator or auditor asked "who can access this data, across every system," could you answer in one search, or would it take two separate investigations?

## This course's single biggest piece of advice

Every chapter of this course taught real, specific tools — Entra ID, Azure Policy, AWS IAM, Lake Formation, Purview, CloudTrail. None of those tools governs anything by themselves. Governance happens when someone actually runs the review, actually keeps the control map current, and actually owns the gap when one cloud's rule falls behind the other's. The tools make good governance *possible*. A named owner and a recurring habit are what make it *real*.

## Where the path continues

This closes **Cloud Data Governance: Azure & AWS**. The Data Governance career path continues next with **AI & Machine Learning Governance** — applying everything you've learned about governing data to the harder, newer problem of governing the models trained on it: data lineage into training sets, model risk, bias auditing, and AI-specific compliance obligations that are still being written as this course is being built.

## Key terms

| Term | Meaning |
|---|---|
| Working checklist | A review tool meant to be run against a real environment with specific answers, not skimmed as a summary |
| Named owner | A specific person or role accountable for a control — the difference between a control that looks complete and one that actually gets maintained |
| Recurring habit | A scheduled, repeating review (access review, control-map check) as opposed to a one-time setup that quietly goes stale |

## Lab

Pick one real environment you have some visibility into — a job, a personal project, or the Briarcliff case study — and run every checkbox in this lesson against it honestly. Count how many you can check with a specific answer versus how many are "probably, somewhere." That gap is your actual governance backlog, and it's a more honest starting point than any theoretical framework.

## Check yourself

Congratulations — you've completed Cloud Data Governance: Azure & AWS. Before moving on, can you run this entire checklist from memory, chapter by chapter, without looking back at the lesson? If you can, you're ready for AI & Machine Learning Governance, next in the Data Governance path.
