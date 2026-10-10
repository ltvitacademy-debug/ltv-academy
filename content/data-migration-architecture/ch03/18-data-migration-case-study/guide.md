# Lesson 18 — Data Migration Case Study

**Chapter 3 · Proving and Cutting Over · Lesson 18 of 18**

## What you'll learn

- How all three chapters of this course play out together on one realistic project
- What a real complication looks like when it surfaces, and at which phase
- How the specific tools and documents from earlier lessons actually get used in sequence
- How to evaluate whether a migration project followed this course's practices, end to end

## Meridian Supply Co.: consolidating two legacy CRMs

Meridian Supply Co., a mid-sized industrial distributor, acquired a smaller regional competitor and needs to consolidate both companies' customer, contact, and order data into a single Salesforce org within six months. Meridian's own data lives in an aging on-premise CRM; the acquired company's data lives in a different cloud CRM. Call the acquired company's CRM "Source B." This case study walks through how Meridian's architect applied this course's three chapters, including one real complication that showed up along the way.

## Planning (Chapter 1)

**Source analysis** turned up an immediate complication: both CRMs track "Account Status" but with different value sets, and neither company had updated the field consistently in the last year — exactly the kind of quirk Lesson 2 says belongs in the documented analysis, not discovered later. The architect also determined the system of record for Source B's data, since its reps had kept it current while Meridian's own on-premise CRM had been neglected after the acquisition was announced. **Data profiling** on a sample of both sources found Meridian's Account data was 92% unique but Source B's was only 78% unique — a real, measured number, not a guess, produced by running a Matching Rule and Duplicate Rule set to Report against sample extracts in a sandbox. **Scope and strategy**: leadership signed off on a phased migration — Meridian's own data first (lower risk, already in Salesforce-adjacent shape), Source B's data second, once de-duplication logic for Source B specifically was designed and tested. **Tooling**: Data Loader with Bulk API enabled for the bulk of structured objects, given the volume (around 180,000 combined Account/Contact/Opportunity records) comfortably exceeded the Data Import Wizard's practical range.

## Designing the Migration (Chapter 2)

The **mapping document** resolved the Account Status type mismatch directly: a picklist value translation table mapping both CRMs' status values onto one new, agreed four-value picklist. **Transformation** handled Source B's "Contact Name" field, which (unlike Meridian's own already-split First/Last Name fields) was a single free-text field needing the splitting-rule treatment from Lesson 7. **Sequencing**: Account before Contact before Opportunity, in both migration phases, with a dependency graph confirming no custom objects introduced an unexpected cross-dependency. **External IDs**: every source record got a Legacy_Record_Id__c External ID field, marked Unique, specifically so both phases could be safely re-run during rehearsal without creating duplicates — which turned out to matter a great deal, as the next section shows.

## Proving and Cutting Over (Chapter 3) — and the complication

During the Full-sandbox dress rehearsal for Source B's phase, **validation** turned up something the earlier profiling number had only hinted at: nearly 3,000 Source B Contacts matched existing Meridian Contacts closely enough (same email domain, very similar names) to very likely represent the same real people — duplicates across the two companies' data, not just within either one individually, which the original per-source profiling in Chapter 1 hadn't been designed to catch. Because the team had used upsert against a real External ID from the very first rehearsal attempt, re-running the corrected load after building a cross-source de-duplication pass (merging Source B records into their likely Meridian matches rather than loading them as new Contacts) was safe and fast — exactly the idempotent-load benefit Lesson 9 describes. **Reconciliation** confirmed the corrected counts closed cleanly: extracted, loaded, excluded-by-merge, and zero unresolved failures. The team then ran one additional rehearsal specifically to re-time the corrected load, since the de-duplication step added real processing time the original rehearsal hadn't accounted for. **Cutover** for Source B used a freeze window sized to that re-measured duration, with a defined delta-record handling rule (any order placed in Source B during the freeze got manually re-entered post-go-live, since volume was low enough to make that practical). **Rollback** trigger was pre-agreed at "more than 2% of migrated Opportunities in an unresolved failure state after reconciliation" — never triggered, but ready. **Post-migration support** ran a two-week hypercare window, during which the single most common ticket was, predictably, a sales rep looking for a Contact that had been merged rather than lost — resolved quickly because the merge was fully documented.

## Key terms

| Term | Meaning |
|---|---|
| Cross-source duplicate | A duplicate that only becomes visible once two different source systems' data is compared together, not within either source alone |
| Case study | A worked, realistic scenario used to show how a course's individual concepts interact on one real project |

## Lab

Using Meridian's case study above as the base scenario, write a one-page-equivalent (6-10 sentences) retrospective memo as the project's architect, addressed to leadership after go-live. Cover: one thing the Chapter 1 profiling process should have caught but didn't (and why), one specific decision from Chapter 2 that paid off during the Chapter 3 complication, and one recommendation you'd make for the next acquisition-driven migration this company runs.

## Check yourself

Can you trace, in your own words, how a decision made in Chapter 1 (profiling) directly shaped a problem discovered in Chapter 3 (validation) in this case study? Can you explain specifically why having used External IDs and upsert from the first rehearsal attempt mattered once the cross-source duplicate problem was discovered?
