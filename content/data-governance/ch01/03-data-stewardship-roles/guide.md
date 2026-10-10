# Lesson 3 — Data Stewardship Roles

**Chapter 1 · Governing Data · Lesson 3 of 14**

## What you'll learn

- The difference between a data owner, a business data steward, a technical/platform steward, and a data custodian
- Which of these roles typically maps to the Salesforce admin, and which doesn't
- Concrete day-to-day tasks each role owns inside a Salesforce org
- Why splitting these roles prevents the admin from becoming an unaccountable bottleneck
- How the roles hand off to each other when a data-quality problem is found

## From one owner to four working roles

Lesson 2 established that a named data owner has authority over an object's data standards. That authority doesn't get exercised directly — it flows through a small set of working roles who each do a distinct part of the job. This is the same owner/steward/custodian/governance-body split used broadly in data governance, applied here specifically to the people who actually touch a Salesforce org day to day.

## The business data steward

The **business data steward** is usually a power user or team lead inside the business function that owns the object — a sales operations lead for Opportunity data, a support operations lead for Case data. They don't write code or configure platform security. Their job is the functional, day-to-day quality work: deciding what values belong in a picklist (and requesting the admin add or retire one), reviewing duplicate-record reports flagged by Salesforce's Duplicate Rules, confirming which Lead Source values are still meaningful, and being the first point of contact when someone in the business asks "why does this field say that?" They're the closest role to the actual data, and the one most likely to notice quality problems first.

## The technical/platform steward — usually the admin

The **technical (platform) steward** is the role that implements, in Salesforce configuration, what the data owner and business steward have decided. In most orgs this is the Salesforce admin: building the Validation Rules that enforce required-field logic, configuring Matching Rules and Duplicate Rules to the business steward's definition of "duplicate," setting up Flow automation that keeps derived fields consistent, and maintaining Field Audit Trail or Field History Tracking on the fields the data owner designated as needing a change history. The admin has real technical authority over *how* something gets enforced, but — critically — not over *what* gets enforced. That decision belongs to the data owner and business steward; the admin's job is faithful implementation, not unilateral policy-setting.

## The data custodian

The **data custodian** is the infrastructure-level role, often a platform or security team rather than a single admin, responsible for the controls that sit below day-to-day configuration: Shield Platform Encryption key management, org-wide backup and recovery, data residency, and integration security for data moving in and out of Salesforce via APIs or Data Cloud. In a smaller org the custodian role might be the same person as the technical steward; in a larger one it's a separate security or infrastructure team the admin has to coordinate with.

## Why splitting the roles matters

If one person — typically the admin, because they're the only one who can touch Setup — is implicitly expected to be the data owner, business steward, technical steward, and custodian all at once, two things go wrong. First, they become a single point of failure: every data-quality decision waits on one person's availability and judgment, even decisions that are really business calls they're not positioned to make well. Second, nobody outside IT feels accountable for data quality, because the role structure never asked them to be — "the admin will fix it" becomes the default answer to every problem, which is exactly the ungoverned pattern Lesson 1 described.

## How the roles hand off

A concrete example ties the roles together: a business data steward in Sales Ops notices, while reviewing a Duplicate Rule report, that a large batch of Leads are being matched as duplicates incorrectly because a data-entry integration strips a formatting character from phone numbers before import. The steward can describe the business impact and raise it, but can't fix the Matching Rule configuration themselves — that's the technical steward's job. If fixing it properly requires a change to how the external system formats the data before it reaches the integration, that's a custodian-level, infrastructure conversation. The data owner gets looped in only if the fix requires a standards decision (e.g., should Matching Rules now also compare on email as a fallback) rather than a pure implementation fix.

## Key terms

| Term | Meaning |
|---|---|
| Business data steward | Functional role (often in the business unit) who owns day-to-day data-quality decisions and definitions |
| Technical/platform steward | Usually the Salesforce admin; implements the owner's and business steward's decisions in configuration |
| Data custodian | Infrastructure/security role responsible for encryption, backup, and platform-level data controls |
| Duplicate Rule | A Salesforce feature the technical steward configures to enforce the business steward's definition of a duplicate |
| Single point of failure | The risk created when one role (often the admin) is implicitly expected to perform all stewardship functions at once |

## Lab

Using the phone-number formatting example above, write out who (owner, business steward, technical steward, or custodian) should handle each of these three follow-up questions, and why: (1) "Should we also match Leads on email address as a fallback?" (2) "Can someone update the Matching Rule configuration to stop ignoring the stripped characters?" (3) "Should the integration vendor's contract require them to preserve phone-number formatting on import?"

## Check yourself

Can you name all four roles (owner, business steward, technical steward, custodian) and give one concrete Salesforce-specific task each one owns? Can you explain why having the Salesforce admin be the de facto owner, business steward, technical steward, and custodian all at once is a governance risk, not just an efficiency win?
