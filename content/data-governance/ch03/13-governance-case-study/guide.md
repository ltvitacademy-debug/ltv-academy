# Lesson 13 — Governance Case Study

**Chapter 3 · Building Governance · Lesson 13 of 14**

## What you'll learn

- How to trace a single realistic incident through every governance role and mechanism covered in this course
- How a gap in one lesson's topic area (ownership, classification, retention, audit) compounds into gaps in the others
- How to identify, from a messy real-world situation, which fix belongs to which role or committee
- Why fixing the immediate incident and fixing the governance gap that allowed it are two different, both-necessary steps

## The scenario

Meridian Health Partners runs a single Salesforce org shared by Sales, Support, and a Patient Services team. Three years ago, a well-meaning Support rep added a custom field, `Treatment_Notes__c`, to the Contact object so Patient Services could log care-coordination details. No one classified the field (Lesson 9), no data owner was formally assigned to Contact as a whole (Lesson 2), and no retention policy was ever written for it (Lesson 6). Over three years, the field filled with detailed health information for thousands of patients, synced nightly to a third-party appointment-reminder tool via an integration nobody currently maintains.

This month, two things happen in the same week: a former patient submits a GDPR-style erasure request, and an internal audit flags that `Treatment_Notes__c` has no Data Sensitivity Level or Compliance Categorization set, despite clearly containing health data.

## Tracing the gap backward

Walking this backward through the course's lessons shows exactly how one missing step compounds: because no one was named the Contact object's data owner (Lesson 2), there was no one with the standing to say "a new field holding health data needs review before it ships." Because there was no governance checkpoint in the change process that created the field (Lesson 11's release-strategy gap, enforced by the committee from Lesson 12), the field went live without anyone asking the classification question in the first place. Because it was never classified (Lesson 9), it never got routed into the org's Platform Encryption rollout or flagged for special access review. And because no retention policy named this field specifically (Lesson 6), nobody has a documented answer for how long this data should have been kept, or in what form, independent of the current erasure request.

## Handling what's in front of you now

The erasure request and the audit finding need two different kinds of response, happening in parallel, not one blocking the other:

- **The erasure request** (Lesson 7, Lesson 8) requires finding every place this specific patient's data lives — the Contact record itself, `Treatment_Notes__c`, any related Cases, and critically, the third-party reminder tool it's been syncing to nightly. The unmaintained integration is exactly the kind of downstream-propagation gap Lesson 8 warned about: erasure inside Salesforce doesn't erase anywhere else data was sent.
- **The audit finding** (Lesson 9, Lesson 10) requires classifying the field now — Data Sensitivity Level likely Restricted, Compliance Categorization likely HIPAA and PII, a Data Owner named for it specifically — and then using that new classification to drive the actual next steps: does it need Shield Platform Encryption, does it need Field Audit Trail's extended retention for traceability, does it need to be in scope for the next access review.

## Fixing the incident vs. fixing the gap

Resolving this specific patient's request and getting this specific field classified handles the immediate problem — but it doesn't prevent `Field_47__c` from becoming next year's identical incident on a different object. The governance-level fix is structural: Contact needs a named data owner now, the integration needs a named technical steward (or custodian) accountable for knowing what data it moves and keeping that current, and most importantly, the release process needs the data-governance checkpoint from Lesson 11 — a simple question ("does this new field need classification review before it ships?") asked at the point a field like `Treatment_Notes__c` is created, not three years and one audit finding later.

## What this case study is really testing

The skill this lesson is checking for isn't memorizing any single fact — it's the ability to look at a messy, multi-lesson real situation and correctly assign each piece of the fix to the right role, the right mechanism, and the right timeframe (immediate vs. structural), which is exactly the judgment a Salesforce Technical Architect is expected to bring to a client's ungoverned org.

## Key terms

| Term | Meaning |
|---|---|
| Compounding gap | How a single missing governance step (e.g., no data owner) allows subsequent gaps (no classification, no retention policy) to go unnoticed for years |
| Downstream propagation | Data that has moved beyond Salesforce (via integration) and isn't touched when the source record is erased or reclassified |
| Structural fix | A change to roles or process that prevents an incident's root cause from recurring, distinct from resolving the specific incident in front of you |

## Lab

Write a one-page remediation memo for Meridian Health Partners covering both tracks from this lesson: (1) the immediate response to the erasure request and the audit finding, with a specific owner named for each action item, and (2) the structural fix, naming which role (data owner, technical steward, custodian, or committee) is accountable for each of the three structural gaps identified (no Contact data owner, no release-process classification checkpoint, no accountable owner for the reminder-tool integration).

## Check yourself

Can you trace, in your own words, how the absence of a named Contact data owner three years ago contributed to this month's audit finding? Can you explain why resolving the erasure request this week doesn't, by itself, fix the governance gap that allowed the problem to develop in the first place?
