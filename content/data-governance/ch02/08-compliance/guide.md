# Lesson 8 — Compliance

**Chapter 2 · Policies and Compliance · Lesson 8 of 14**

## What you'll learn

- How "compliance" differs from "governance" even though they overlap heavily
- The data-subject rights that regulations like GDPR and CCPA actually grant, translated to Salesforce terms
- How Salesforce supports the right-to-erasure/deletion requirement, and its real limits (backups, integrations)
- Why industry-specific regulations (HIPAA, SOX) layer additional, sometimes conflicting, requirements on top of general privacy law
- Why "we're compliant" is a point-in-time claim, not a permanent state

## Compliance is governance's legal floor, not its ceiling

**Compliance** means meeting the specific, external, legally mandated requirements that apply to an organization's data. **Governance**, from Lesson 1, is the broader internal discipline of deciding how data should be handled at all, which includes but goes well beyond legal minimums. An org can be fully compliant with every applicable law and still have messy, ungoverned data in areas the law doesn't touch (internal reporting accuracy, for instance). Conversely, a strong governance program makes compliance far easier to achieve and prove, because the roles, policies, and audit trails it requires (data owners, retention policies, Field Audit Trail) are largely the same infrastructure a compliance audit will ask to see.

## Data-subject rights, translated to Salesforce terms

Major privacy regulations grant individuals a consistent core set of rights, which have to be actionable against real Salesforce data, not just acknowledged in a privacy policy document:

- **Right of access** — a person can ask what data an organization holds about them. In Salesforce terms, this means being able to query every object where that person appears (Contact, Lead, Case, Individual, custom objects) and produce a usable export.
- **Right to rectification** — correcting inaccurate data, which is really just a normal data-quality (Chapter 1) workflow applied to a specific, named individual's records under a deadline.
- **Right to erasure ("right to be forgotten")** — deleting a person's data, discussed below.
- **Right to restrict processing** — covered in Lesson 7.
- **Right to data portability** — providing a person's data in a usable, transferable format, which again requires knowing every object where their data lives.

## Erasure in practice — and its real limits

Salesforce supports deleting personal data at both an individual-record level and, if needed, more broadly — but a governance program has to be honest that "delete the Contact record" is rarely the whole job. Related records (Cases, Opportunities, Activities, custom-object children) may reference the same person and need to be identified and handled too, not just the primary Contact. Deleted records pass through the Recycle Bin's short recovery window (Lesson 6) before permanent removal, and legal retention obligations may require anonymizing rather than fully deleting certain records (also Lesson 6). And critically: deletion inside Salesforce doesn't automatically propagate to every downstream system a record was ever synced to — a marketing platform, a data warehouse, or a backup snapshot taken before the deletion. A real erasure process has to account for where else that person's data traveled, which is exactly why Lesson 2's data-ownership work (knowing who's accountable for an object, and by extension what integrations touch it) and Lesson 10's audit work matter here.

## Industry-specific layers on top

General privacy law (GDPR, CCPA) isn't the only compliance layer a Salesforce org might face. Industry-specific regulations add their own requirements on top, and they don't always point the same direction: a healthcare organization subject to HIPAA has specific recordkeeping and access-control obligations around health data living in Salesforce records, and a public company subject to SOX has retention and change-control requirements around financial data and the systems that touch it. These regimes often require retention periods measured in years — directly in tension with an individual's erasure request, which is exactly the conflict Lesson 6 described and which has to be resolved by policy, not improvised case by case.

## Compliant today doesn't mean compliant forever

The last trap is treating "compliance" as a box checked once. Regulations change, an org adds new objects and integrations that weren't in scope when the last review happened, and a Data Cloud rollout or a new AI feature can introduce new personal-data processing nobody formally assessed. A governance program treats compliance the same way it treats classification (covered next lesson) and data quality: as something reviewed on a recurring cadence, with a named owner for keeping the assessment current, not a one-time certificate.

## Key terms

| Term | Meaning |
|---|---|
| Compliance | Meeting specific, externally mandated legal requirements for data handling |
| Right of access | A data-subject right to learn and receive what personal data an organization holds about them |
| Right to erasure | A data-subject right to have their personal data deleted, subject to legal retention exceptions |
| Right to data portability | A data-subject right to receive their data in a usable, transferable format |
| HIPAA / SOX | Examples of industry-specific regulations layering additional, sometimes longer, retention and control requirements on top of general privacy law |

## Lab

A company receives a GDPR erasure request for a customer who appears as a Contact, has three related Cases, and whose data was synced eight months ago to an external email marketing platform via an integration no one currently maintains. Write a short remediation plan: what has to happen inside Salesforce, what has to happen outside Salesforce, and which earlier lesson's governance work (ownership, retention, or audit) would have made this request faster and safer to execute if it had been in place beforehand.

## Check yourself

Can you explain why an organization can be legally compliant and still have a weak data-governance program? Can you name at least three places outside the primary Contact record that an erasure request might still need to reach, per this lesson?
