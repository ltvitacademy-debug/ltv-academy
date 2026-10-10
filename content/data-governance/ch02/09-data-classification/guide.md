# Lesson 9 — Data Classification

**Chapter 2 · Policies and Compliance · Lesson 9 of 14**

## What you'll learn

- How classification differs from the field-level security that already exists in a Salesforce org
- Salesforce's native field-level classification metadata (Data Sensitivity Level, Compliance Categorization, Data Owner, Field Usage) and what each one actually does
- Why these fields are metadata tags, not scanning or enforcement tools, and why that matters
- How Shield's Data Detect capability complements field-tagging by finding sensitive data at scale
- How a classification label is supposed to drive downstream decisions, rather than sitting unused

## Classification is a label, not a lock

Earlier lessons covered controls that actively do something: a Validation Rule blocks a save, Platform Encryption scrambles data at rest. **Data classification** is different — it's the labeling step that happens *before* those decisions, identifying how sensitive a given piece of data is so the right controls can be deliberately chosen for it. A field without a classification label isn't automatically unprotected, but it also means nobody has made an explicit, documented decision about how protected it should be — which is exactly the gap classification exists to close.

## Four native metadata fields, four different jobs

Salesforce provides native, field-level classification metadata directly in Object Manager, exposed as attributes you can set on any custom (and some standard) field: **Data Sensitivity Level**, **Compliance Categorization**, **Data Owner**, and **Field Usage**. Each answers a different question about the field:

- **Data Sensitivity Level** records how sensitive the field's content is, using a picklist an org can customize — commonly seeded with values like Public, Internal, Confidential, Restricted, and Mission Critical, mirroring the tiered schemes used broadly in data governance (and in this catalog's data-security-privacy-and-classification course).
- **Compliance Categorization** records *which regulation* makes this field relevant — out of the box this typically includes options like PII, GDPR, HIPAA, CCPA, and PCI, letting an org later query "show me every field tagged as relevant to GDPR" across the whole schema.
- **Data Owner** records who's accountable for that specific field's data — the field-level equivalent of the object-level data ownership concept from Lesson 2.
- **Field Usage** gives a free-text description of what the field is actually used for, which matters more than it sounds like it should: a field named `Notes__c` is meaningless to a reviewer without a usage description, even once it's tagged Confidential.

These values can be set per field through Object Manager, and an org can customize the picklist options themselves (adding, renaming, or reordering sensitivity levels and compliance categories) through Data Classification Settings in Setup, rather than being stuck with the defaults.

## Metadata, not a scanner — and not automatic enforcement

The single most important thing to understand about these four fields is that they're **manually-applied metadata tags**, not an automated content scan. Setting a field's Data Sensitivity Level to Restricted records *that a human decided* this field is Restricted — it doesn't inspect the actual data inside the field to verify that's true, and critically, **classifying a field this way doesn't by itself change any Salesforce behavior**. A Restricted-tagged field isn't automatically encrypted, automatically hidden from certain profiles, or automatically audited more closely — classification only has value once something downstream (a Platform Encryption rollout, an access-review process, an audit scope) actually reads the labels and acts on them. This is the same "label without enforcement does nothing" principle covered for classification governance generally; Salesforce's version of it is simply that the tagging and the enforcement are two entirely separate configuration steps.

## Finding sensitive data at scale: Data Detect

Manually tagging every field one at a time doesn't scale to a large, mature org with thousands of fields across many objects — which is where **Data Detect**, a Shield capability, comes in. Rather than relying on someone to remember to classify each field as it's created, Data Detect scans an org's data for patterns that look like sensitive information (credit card numbers, Social Security numbers, email addresses) using platform-native pattern matching, without copying data outside Salesforce or relying on a third-party service. It's a discovery tool, not a decision-maker: it surfaces candidate fields for a human (the data owner, informed by a steward) to review and formally classify, rather than auto-classifying anything itself.

## Classification only earns its keep when something uses it

Tagging every field and stopping there is a wasted exercise. The payoff comes from the next step: once fields are tagged Restricted or Confidential, those tags should drive which fields go into the next Platform Encryption rollout, which fields get special scrutiny in an access review, and which fields are included when answering a regulator's or auditor's question about where a particular category of data lives. A classification program with no downstream consumer of its labels is busywork; one wired into real decisions is the foundation the rest of this chapter's compliance work depends on.

## Key terms

| Term | Meaning |
|---|---|
| Data Sensitivity Level | Native field-level metadata recording how sensitive a field's content is (e.g., Public through Mission Critical) |
| Compliance Categorization | Native field-level metadata recording which regulation(s) make a field relevant (e.g., PII, GDPR, HIPAA, CCPA, PCI) |
| Field Usage | A free-text metadata description of what a field is actually used for |
| Data Classification Settings | The Setup area where an org customizes its own classification picklist values |
| Data Detect | A Shield capability that scans for sensitive-data patterns at scale to surface candidate fields for human classification |

## Lab

Your org has a custom field `Notes__c` on the Contact object that, in practice, several reps have been using to jot down health-related details about customers without anyone deciding that was appropriate. Using the four native classification metadata fields, propose a Data Sensitivity Level, a Compliance Categorization, a Data Owner, and a Field Usage description for this field — and then name one concrete downstream action (from the "only earns its keep" section) that should happen as a direct result of applying that classification, not just the labeling itself.

## Check yourself

Can you name all four native Salesforce field-classification metadata attributes and what each one records? Can you explain why tagging a field as Restricted doesn't, by itself, make Salesforce treat that field any differently?
