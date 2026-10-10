# Lesson 12 — Security Case Study

**Chapter 2 · Applying Security Architecture · Lesson 12 of 15**

## What you'll learn

- How to read a realistic, messy scenario and map every piece of it onto the vocabulary built across Lessons 1–11
- Why real security problems rarely announce themselves as "this is a least-privilege problem" or "this is a monitoring problem" — the architect has to diagnose that
- A full worked example, end to end, showing how boundaries, least privilege, defense in depth, encryption, and review process interact in one org
- A second scenario for you to diagnose yourself, as the Lab

## The scenario: a mid-size healthcare benefits administrator

A healthcare benefits administration company runs its claims-processing operations on Salesforce. Their org has:

- A `Member__c` object holding policyholder PII, including a `Diagnosis_Codes__c` long text field and an `SSN__c` field.
- A Connected App for a third-party pharmacy-benefits partner, scoped to `full` access, authenticating as an integration user with the standard "System Administrator" profile — set up two years ago by a consultant who "just needed it to work" under a deadline.
- A custom Apex class, `MemberLookupService`, marked `without sharing`, originally built for a nightly eligibility-sync batch job. Six months ago, a Lightning Web Component on the member-facing self-service portal started calling one of its methods directly, to let members look up their own claim status faster.
- Field-Level Security on `SSN__c` set to visible for the "Claims Processor" profile (about 40 users) — nobody has reviewed this since it was set up at go-live three years ago.
- No Transaction Security Policies configured. Setup Audit Trail is on (it's a standard feature), but nobody actively reviews it.
- A Health Check score of 68% ("Poor"), driven mainly by weak password policy settings that have never been revisited.

## Diagnosing it, lesson by lesson

**Boundaries (Lesson 1) and least privilege (Lesson 2):** The pharmacy integration's "System Administrator" profile is a severe least-privilege violation at the authorization boundary — an integration that should need access to a narrow slice of Member data instead has full administrative capability, including the ability to modify any configuration in the org, not just read benefits data.

**Defense in depth (Lesson 3):** This org has almost no independent layers. The integration's single point of control is its Connected App scope and profile — both wide open. If that credential leaks, there's no second layer (narrow permission set, field-level restriction, monitoring) to contain the damage.

**Threat modeling (Lesson 5):** Running STRIDE against the pharmacy integration specifically would have surfaced the elevation-of-privilege risk (a leaked credential grants admin-level access, not just benefits-data access) well before go-live — this is exactly the kind of finding a review board (Lesson 11) should have caught, and didn't, because no review process existed at the time.

**Encryption (Lesson 7):** `SSN__c` isn't encrypted at all, and FLS has made it visible to 40 users without review for three years — a textbook example of Lesson 6's point that visibility (FLS) and confidentiality protection (encryption) are two separate, both-necessary controls, and here, neither is being actively maintained.

**Secure development (Lesson 9):** The `MemberLookupService` reuse is the exact failure pattern that lesson warned about: a `without sharing` class built for one legitimate internal purpose, later called from a completely different, member-facing context, without anyone re-examining whether that still made sense. A member using the self-service portal may now be able to look up data belonging to *other* members, because the class ignores sharing rules regardless of who's calling it.

**Monitoring (Lessons 4, 8):** Setup Audit Trail exists but isn't reviewed — a layer that technically exists but provides zero actual protection because nothing reads it. No Transaction Security Policies means no automated response capability at all.

**Governance (Lesson 11):** The 68% Health Check score is a visible, measurable symptom, but it's also incomplete — it wouldn't have caught the integration scoping problem or the `MemberLookupService` reuse, both of which required the fuller checklist, not just the Health Check number.

## What this case study is meant to show

No single failure here is exotic or requires inventing a new concept — every one of them is a direct, specific instance of something from Lessons 1–11. That's deliberate: real security incidents are almost always combinations of ordinary, individually-explainable gaps (an over-scoped integration, a reused sharing bypass, an unreviewed field) rather than one dramatic, novel attack. An architect's actual job is pattern-matching a messy real org against exactly this vocabulary, which is the skill this lesson is asking you to practice.

## Key terms

| Term | Meaning |
|---|---|
| Case study diagnosis | Mapping a realistic scenario's specific details onto the course's named concepts, rather than treating it as a novel, unclassifiable problem |
| Compounding gaps | Multiple ordinary, individually small security gaps that combine into a serious overall exposure |

## Lab

A separate scenario: a retail company's Salesforce org gives every Marketing user a permission set granting "Modify All Data" because a marketing automation tool once needed broad access and nobody scoped it down afterward. The company's `Customer_Loyalty_Tier__c` field (not sensitive) and `Customer_Payment_Method_Last4__c` field (sensitive) have identical Field-Level Security settings — visible to every profile. There is no Field Audit Trail or Field History Tracking on either field, and no Transaction Security Policies exist. Diagnose this scenario the way the worked example above did: name each specific gap, and map each one to the specific lesson and concept it violates.

## Check yourself

Without rereading the case study, can you name at least four distinct security gaps in the pharmacy-benefits scenario and the specific lesson concept each one violates? Can you explain why real incidents tend to be combinations of ordinary gaps rather than one exotic failure?
