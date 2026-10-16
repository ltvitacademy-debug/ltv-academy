# Cloud Data Governance Review Checklist — Working Copy

Based on Lesson 25's closing checklist. This version is meant to be filled in against a
real Azure or AWS environment, the Briarcliff Outdoor Gear case study (Lesson 23), or your
own Lesson 24 control map — not skimmed. For every item, write a specific tool, person, or
document in the **Evidence / Owner** column. "Probably, somewhere" is not a passing answer;
it's the honest start of your governance backlog (Lesson 25's closing point).

## Chapter 1 — Cloud Governance Architecture

| # | Item | Status (Yes / No / Partial) | Evidence / Owner |
|---|---|---|---|
| 1.1 | Shared responsibility boundary documented, one sentence per cloud | | |
| 1.2 | Every landing zone has consistent dev/staging/production separation | | |
| 1.3 | A written governance architecture diagram exists (not just one person's mental model) | | |
| 1.4 | Governance controls apply the same way in non-production as in production | | |

## Chapter 2 — Identity and Access

| # | Item | Status | Evidence / Owner |
|---|---|---|---|
| 2.1 | One identity system (e.g., Entra ID) is the source of truth, not separate per-cloud logins | | |
| 2.2 | Azure RBAC is assigned by role at the scope actually needed, not broad subscription-wide grants | | |
| 2.3 | AWS IAM uses least privilege, with roles instead of long-lived user access keys wherever possible | | |
| 2.4 | A scheduled, recurring access review exists — not a one-time cleanup | | |
| 2.5 | Break-glass accounts exist, are stored offline/vaulted, and trigger an alert on every use | | |

## Chapter 3 — Storage and Catalogs

| # | Item | Status | Evidence / Owner |
|---|---|---|---|
| 3.1 | ADLS containers are governed with ACLs mapped to real business roles, not "everyone who asked" | | |
| 3.2 | S3 buckets use bucket policies (and Lake Formation for fine-grained table/column access) rather than legacy ACLs | | |
| 3.3 | A data catalog covers every major data source, not only the ones someone remembered to register | | |
| 3.4 | Azure and AWS sources are cataloged together in one searchable place, not two disconnected systems | | |

## Chapter 4 — Security and Compliance

| # | Item | Status | Evidence / Owner |
|---|---|---|---|
| 4.1 | One encryption-at-rest standard is enforced via Azure Key Vault and AWS KMS respectively | | |
| 4.2 | A named compliance framework exists, with real controls mapped against it (not just referenced in passing) | | |
| 4.3 | Azure Policy is actively enforcing guardrails, not just available but unused | | |
| 4.4 | AWS Organizations SCPs do the equivalent enforcement job on the AWS side | | |
| 4.5 | Azure Activity Log and AWS CloudTrail both feed a retained, searchable audit trail | | |

## Chapter 5 — Multi-Cloud Governance

| # | Item | Status | Evidence / Owner |
|---|---|---|---|
| 5.1 | A written control map exists, pairing each primary-cloud control with its secondary-cloud equivalent | | |
| 5.2 | Every row of that map has a named owner (even if honestly "Unassigned" today) | | |
| 5.3 | You know which controls sync automatically versus which depend on someone remembering by hand | | |
| 5.4 | "Who can access this data, across every system" can be answered in one search, not two investigations | | |

## Scoring

Count your **Yes** answers out of 22. This is not a pass/fail test — it's a backlog. Every
**No** or **Partial** is a specific, nameable next action, not a vague risk.

- **Yes:** ______ / 22
- **Top 3 gaps to close next:**
  1. _______________________
  2. _______________________
  3. _______________________
