# Lesson 7 — Case Study: Higher Education Advising

**Chapter 1 · Technical Architect Case Studies · Lesson 7 of 21**

## What you'll learn

- How an education-specific data model (built on EDA, Education Data Architecture) organizes students, courses, and advising relationships
- Why FERPA-driven sharing requirements default to *less* access than a typical employee org, not more
- How to split system-of-record and system-of-engagement responsibilities between a Student Information System and Salesforce
- How a student-facing portal's access differs from a guardian's, and why that distinction has to be explicit, not assumed

## The scenario

Fenwick State University wants to give academic advisors a modern caseload view: each advisor manages a set of assigned students, tracks advising notes and meeting history, and receives early-alert flags when a faculty member flags a student as at-risk. Advisors must only see their own assigned students — not the whole student body. Parents and guardians get no access to a student's record by default; a student has to explicitly consent and name specific people before any guardian access is granted, and that consent can be revoked. The university's Student Information System (SIS) remains the authoritative source for enrollment, grades, and official academic record; Salesforce exists to support the advising relationship, not duplicate the SIS. Students should be able to see their own advising holds and book meetings through a self-service portal.

## The data model: built on EDA, not invented from scratch

Salesforce's Education Data Architecture (recently rebranded under the Agentforce Education umbrella) provides a pre-built foundation for exactly this kind of relationship modeling: standard Account/Contact objects extended with purpose-built objects for affiliations (how a person relates to the institution — student, faculty, staff), relationships (how people relate to each other — advisor to advisee, guardian to student), courses, and terms. Building a parallel custom object model for "which advisor is assigned to which student" when EDA's affiliation and relationship objects already model exactly that relationship is wasted effort and loses whatever tooling and reporting already understands the standard shape. The advising case study sits on top of EDA, adding advising-specific objects (advising notes, early-alert records) that reference the existing student and advisor records rather than reinventing who a student or advisor is.

## FERPA defaults to less access, not more

The instinct in many enterprise CRM designs is to grant broad internal visibility by default and restrict only where a specific reason exists. FERPA (the U.S. federal law governing student education-record privacy) pushes the opposite default here: an advisor should see only their own assigned students, full stop, and nobody outside a legitimate educational interest sees a student's advising record at all unless a specific relationship — the assignment itself — establishes that interest. This means the sharing model starts from private organization-wide defaults on the student and advising-note objects, with visibility granted narrowly through the advisor-assignment relationship, rather than starting broad and trying to lock down exceptions after the fact. Early-alert flags raised by faculty route specifically to the assigned advisor, not to a general pool every faculty member or staff member can browse.

## Guardian access is opt-in, named, and revocable

The guardian-access requirement is a textbook case of consent-driven sharing rather than a role-based default: a guardian gets access only after the student explicitly names them and grants consent, that consent is itself a record (so it can be audited and later revoked), and revoking it has to actually remove access, not just mark a flag the system never checks again. This mirrors the consent-record pattern used in the healthcare case study earlier in this chapter — a specific person's access is conditional on an explicit, checkable, revocable grant, not an assumption that family members get visibility by default the way they might in a typical consumer-facing system.

## SIS as system of record, Salesforce as system of engagement

The SIS holding enrollment, grades, and the official academic record, while Salesforce handles the advising relationship, repeats a pattern this chapter has now seen twice: a specialized system of record stays authoritative for its domain, and Salesforce receives what it needs — enrollment status, course load, maybe GPA — through an integration, without trying to become a second academic record that could drift out of sync with the real one. The self-service student portal reads from both: advising holds and meeting scheduling live natively in Salesforce, while anything about official enrollment status displayed to the student is sourced from the SIS integration, not re-entered or duplicated in Salesforce.

## Key terms

| Term | Meaning |
|---|---|
| EDA (Education Data Architecture) | Salesforce's pre-built data model for education institutions, extending standard objects with affiliations, relationships, courses, and terms |
| FERPA | U.S. federal law restricting access to student education records to those with a legitimate educational interest |
| Legitimate educational interest | The specific relationship (such as an advising assignment) that justifies a staff member seeing a student's record |
| Consent-driven sharing | Access granted only after an explicit, auditable, revocable grant by the data subject, rather than a role-based default |
| System of record vs. system of engagement | The SIS stays authoritative for official academic data; Salesforce supports the advising relationship without duplicating that authority |

## Lab

A student grants their parent consent to see advising notes, then revokes that consent two months later after a disagreement. Design the mechanism that ensures the parent's Experience Cloud access is actually removed the moment consent is revoked, not just flagged as revoked in a field nobody re-checks. Name the specific sharing mechanism involved.

## Check yourself

Can you explain why FERPA pushes this design toward a default of less access rather than more? Can you state, in one sentence, why building a parallel custom object for advisor-student assignment would be the wrong move given EDA already exists?
