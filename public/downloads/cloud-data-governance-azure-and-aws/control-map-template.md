# Multi-Cloud Governance Control Map — Template

Use this template for Lesson 24's practice lab, or as a living document at a real job. It
pairs each primary-cloud governance control this course taught with its secondary-cloud
equivalent, names the mechanism that connects the two, and — the column most real control
maps skip — names an **owner**. An honestly "Unassigned" owner is more useful than a map
that looks complete but isn't backed by anyone's actual job description.

## 1. Set the scenario (one sentence)

- **Primary cloud:** _______________________
- **Secondary cloud:** _______________________
- **Why the secondary footprint exists** (acquisition / specific service / legacy system not yet migrated): _______________________

## 2. The control map

| # | Governance area | Primary-cloud control | Secondary-cloud control | Translation mechanism | Owner |
|---|---|---|---|---|---|
| 1 | Identity | | | | |
| 2 | Storage governance | | | | |
| 3 | Cataloging | | | | |
| 4 | Policy enforcement | | | | |
| 5 | Audit logging | | | | |

### Worked reference row (Azure-primary / AWS-secondary, from this course's Briarcliff Outdoor Gear case study — Lesson 23)

| # | Governance area | Primary-cloud control | Secondary-cloud control | Translation mechanism | Owner |
|---|---|---|---|---|---|
| 1 | Identity | Microsoft Entra ID (directory of record) | AWS IAM roles, assumed via federation | Federated IAM role trust: Entra ID is the identity provider; AWS IAM roles trust it instead of standalone AWS logins | Identity & Access team |
| 2 | Storage governance | ADLS Gen2 container RBAC + POSIX ACLs | S3 bucket policies + AWS Lake Formation table/column permissions | One encryption-at-rest and least-privilege standard, implemented natively on each side | Data Platform team |
| 3 | Cataloging | Microsoft Purview (native Azure sources) | AWS S3 / Glue Data Catalog, registered into Purview via the multicloud scanning connector | Federated IAM role trust + External ID (no stored AWS keys) | Data Governance team |
| 4 | Policy enforcement | Azure Policy initiative (encryption, tagging, network rules) | AWS Organizations service control policy enforcing the equivalent rule | Manual translation step, required as part of the same change ticket — not a follow-up | Cloud Security team |
| 5 | Audit logging | Azure Activity Log / Monitor | AWS CloudTrail / CloudWatch | Both exported to one central log destination | Security Operations |

## 3. Self-check (Lesson 24, Step 5)

For each row above, ask: **if the primary-cloud control changed tomorrow, would the
secondary-cloud control change automatically, or would someone have to remember to update
it by hand?** Every "by hand" answer is a policy-drift risk (Lesson 21) — write it down as
a specific follow-up, not a vague worry:

| Row # | Syncs automatically? | If not, what would close the gap? |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

## Notes

- This map does not give you cross-cloud **lineage** for free, even once both sides are
  cataloged together (Lesson 22). Lineage across a cloud boundary only exists if the tool
  moving data between the clouds (e.g., a pipeline) itself reports that hop to the catalog.
- Review this document on a fixed cadence (quarterly is a reasonable default) rather than
  only when an audit forces the question.
