# LTV Customer Management System — Acceptance Rubric

> This is the scored, checkable version of Lesson 1's "Definition of Done" checklist and
> Lesson 18's handoff document. Those two artifacts tell you what done looks like; this rubric
> breaks it into specific, verifiable criteria worth real points, so you (or a reviewer) can
> score your finished Cascade Foodservice Equipment Co. org honestly instead of eyeballing it.
>
> **Total: 100 points. 90 points (90%) required to pass.** Every category lists required
> criteria (must be present to pass that category at all) and optional enhancements. Verification
> steps tell you exactly how to check each item inside your own org — click through and confirm,
> don't just assume your build did what you intended.

## 1. Business Requirements and Solution Design — 10 points

*Does the build actually trace back to a real, documented business need?*

| Criterion | Points | Verification |
|---|---:|---|
| Lesson 1's 10-row Definition of Done checklist exists as a real document, with every row marked built and naming the lesson it was built in | 3 | Open the document — every "Built in Lesson ___" cell is filled in, none blank |
| The Lesson 2 company scenario (Cascade Foodservice Equipment Co., its people, its actual sales/service process) is the one consistent scenario used from Lesson 2 through Lesson 20 — no switched examples mid-build | 3 | Spot-check 3 unrelated lessons (e.g. Lesson 6, Lesson 12, Lesson 17) — all reference the same company and the same named people |
| The data model (Lesson 3) and security model (Lesson 4) were designed on paper *before* any Setup configuration began | 2 | A dated design artifact (diagram, table) predates the first object/field created in the org |
| You can state, in one sentence per decision, *why* a specific field, sharing rule, or Flow exists — not just that it exists | 2 | Pick any 3 build decisions at random and explain each one's business reason without looking anything up |

**Required to pass this category:** the Definition of Done checklist must be fully completed, not partially — an org with 7 of 10 requirements checked off is a 70%-complete build, not a design problem, and belongs in the categories below as missing points, not here.

## 2. Data Modeling and Configuration — 15 points

*Does the object model actually support Cascade's lead-to-cash process correctly?*

| Criterion | Points | Verification |
|---|---:|---|
| Leads convert cleanly into Accounts, Contacts, and Opportunities with correct field mapping | 4 | Convert a test Lead; confirm no data is lost or mismapped in the resulting records |
| At least 2 custom objects exist, modeling something standard objects genuinely don't cover (Installation Project, Service Contract, or equivalent) | 4 | Object Manager shows both custom objects with real fields, not placeholder stubs |
| Relationships (Lookup vs. Master-Detail) are the correct type for each — sharing/cascade-delete behavior matches what the business actually needs | 3 | For each custom object relationship, state out loud what happens on delete and confirm it's the intended behavior, not an accident of whichever type was easiest to pick |
| At least one Lightning App Page is built for how Cascade's own users actually work, not a generic default layout | 2 | The page groups components around one real user's actual workflow (e.g. the Service profile's installation view) |
| Record Types or page layouts are used where sales, service, and customer success actually need different views of the same object | 2 | Compare what a Sales Rep sees on an Opportunity versus what Marcus Webb sees on the related Installation Project |

**Required to pass this category:** Lead conversion must work correctly with zero data loss — this is the single most-used real workflow in the entire build, and a broken conversion undermines everything downstream of it.

## 3. Security and Access Controls — 15 points

*Does the security model enforce least-privilege access the way it was designed to on paper?*

| Criterion | Points | Verification |
|---|---:|---|
| The role hierarchy matches Lesson 4's design exactly (Monica Reyes at the top; Priya Nair reporting directly to Monica, not through Derek Oyelaran) | 3 | Setup → Roles — the tree structure matches the Lesson 4 diagram, including the deliberate Key Accounts branch separation |
| All 5 profiles exist with the correct object/field permissions (System Administrator, Sales Rep, Sales Manager, Service Profile, Customer Success Profile) | 4 | For each non-admin profile, confirm it can do exactly what Lesson 4's table says and nothing more — test with "Login As" or an equivalent permission check |
| OWD is set to Private on every object the design calls for (Account, Contact, Opportunity, Lead, Installation Project, Service Contract) | 2 | Setup → Sharing Settings shows Private across all 6, not a looser default left over from org creation |
| All 3 sharing rules exist and close exactly the gap each was designed for (Service & Installation → Opportunity; Customer Success → Opportunity; Key Accounts → Installation Project) | 4 | For each rule, log in as (or test as) the intended recipient and confirm they can see records they couldn't see from role hierarchy alone |
| No profile or sharing rule grants access broader than Lesson 4's design calls for | 2 | Review each profile's object permissions for anything not explicitly justified in the design — an unexplained "Modify All" or "View All" fails this check |

**Required to pass this category:** every one of the 3 sharing rules must be verified working, not just created — a sharing rule that exists in Setup but was never tested against the actual user it's meant to help is an unverified assumption, not a working control.

## 4. Flow Automation and Business Logic — 15 points

*Does the automation actually do what it's documented to do, safely, including when it fails?*

| Criterion | Points | Verification |
|---|---:|---|
| At least one record-triggered Flow automates a real Cascade business process correctly | 4 | Trigger the Flow's real-world condition and confirm the documented outcome happens |
| Validation rules enforce data quality on at least 2 objects, each tested with both a passing and a failing case | 4 | For each rule, attempt a save that should be blocked and confirm it is, then a save that should succeed and confirm it isn't blocked |
| The approval process matches a real Cascade approval scenario, with the correct approver | 3 | Submit a test record for approval; confirm it routes to the correct named approver and the approved/rejected outcomes both work |
| Every Flow has a fault path that does something reasonable on failure, not a silent dead end | 2 | Deliberately force a failure condition (e.g. a required related record missing) and confirm the fault path's behavior, not just that it exists in the builder |
| Automation is documented in Lesson 18's four-line format (name, type/trigger, what it does, why) for every Flow, validation rule, and the approval process | 2 | The automation inventory section accounts for 100% of what's actually built, with no undocumented automation discovered during review |

**Required to pass this category:** every fault path must be actually tested by forcing a failure, not just visually confirmed to exist in the Flow builder — an untested fault path is exactly as unverified as the untested sharing rules in Category 3.

## 5. Data Management and Reporting — 15 points

*Is the sample data realistic and safely loaded, and do the reports/dashboard actually answer real business questions?*

| Criterion | Points | Verification |
|---|---:|---|
| Sample data is realistic — named people, plausible company names and deal values — not placeholder junk like "Test Account 1" | 3 | Spot-check 10 random records across 3 objects; none should read as obviously fake filler |
| Data was loaded using the correct tool and load order (parents before children, Upsert/External ID where appropriate) | 3 | The documented load order in Lesson 18's Sample Data section matches what was actually run, and no orphaned child records exist |
| Reports are organized into folders with access scoped intentionally, not dumped into one shared folder | 3 | Folder structure and sharing settings match a real intended audience per folder (e.g. Sales Manager folder isn't visible to Service) |
| The executive dashboard actually answers a real question Monica Reyes (or an equivalent stakeholder) would ask, not just "here are some charts" | 3 | Can you state, in one sentence per component, what business question each dashboard component answers? |
| At least one report or dashboard component was built to surface a real risk in the data (e.g. stale pipeline, overdue installs), not just a status summary | 3 | The component's filter/grouping logic specifically targets something actionable, not just a raw count |

## 6. Troubleshooting and Testing — 15 points

*Is there real, specific evidence of testing and diagnosing problems — not just building something that happened to work the first time?*

| Criterion | Points | Verification |
|---|---:|---|
| Lesson 17's test plan was actually executed, with a real pass/fail recorded for every row, not left blank or assumed | 5 | Every row in the test plan document has a dated result, not a checkbox left empty |
| At least one real failure was found and fixed during testing, with what broke and how it was fixed written down | 4 | A specific, named defect (not hypothetical) appears in the testing record, with its resolution |
| A security-access defect was deliberately introduced and diagnosed (e.g. an OWD accidentally left Public, a sharing rule criteria typo) using the layered checklist from the Security & Access Fundamentals course (object permissions → FLS → OWD → role hierarchy → sharing rules) | 3 | Walk through the diagnosis from symptom to root cause, naming which layer was actually responsible and how you confirmed it, not guessed |
| Bulk-safety was tested — at least one automation was verified not to break when multiple records are processed at once | 3 | Load or update 20+ records that trigger the same Flow/validation rule simultaneously; confirm no governor-limit or unexpected-behavior failure |

**Required to pass this category:** the test plan must show real executed results, and at least one genuine defect-found-and-fixed must be documented — a test plan with 100% pass on the first attempt and nothing ever found is far more likely evidence of untested assumptions than of a flawless build.

## 7. Deployment Readiness — 5 points

*Could this build move from a practice org to a real production org safely?*

| Criterion | Points | Verification |
|---|---:|---|
| A written change-management plan exists describing how this build would move from a sandbox/Developer Edition org to production (what order, via change set or equivalent, what gets validated first) | 2 | The plan names a specific sequence and specific validation step, not just "deploy everything" |
| A rollback plan exists for at least the highest-risk component (the security model or an automation that writes data) | 2 | The plan states, specifically, what would be reverted and how if that component caused a problem in production |
| The plan acknowledges what this capstone's own build deliberately didn't practice (e.g. it was built in a single org, never actually moved between environments) | 1 | The documentation is honest about this gap, per Lesson 18's "Known Limitations" standard, rather than implying deployment was tested when it wasn't |

**Note:** this category is scored lowest (5 points) deliberately — the capstone itself is built in a single org and never practices a real deployment, so full credit here is about demonstrating you understand what *would* need to happen, not about having actually done it. A thoughtful, honest plan earns full credit; a vague "just deploy it" does not.

## 8. Documentation and Technical Communication — 10 points

*Could someone who's never seen this org pick it up and understand it from what you wrote?*

| Criterion | Points | Verification |
|---|---:|---|
| All 8 sections of Lesson 18's handoff document exist and are complete (Overview, Data Model, Security Model, Automation Inventory, Reports & Dashboards, Sample Data, Test Results, Known Limitations & Next Steps) | 4 | Every section has real content specific to this build, not a copied template with blanks |
| The Automation Inventory documents every Flow, validation rule, and the approval process in the required four-line format (name, type/trigger, what it does, why) | 2 | Count matches — every piece of automation actually built appears in the inventory, nothing missing |
| Section 8 (Known Limitations) is honest and specific, not a vague disclaimer | 2 | Names real, specific scope boundaries (no LWC, no ERP integration, no Apex) rather than generic hedging |
| The Lesson 19 presentation structure (problem → design → decisions → result → scale considerations) can be delivered from memory, referencing the documentation as support, not reading it verbatim | 2 | Practice the 5-part structure out loud; each part should reference a specific decision from the build, not restate generic Salesforce concepts |

---

## Scoring summary

| Category | Points |
|---|---:|
| Business requirements and solution design | 10 |
| Data modeling and configuration | 15 |
| Security and access controls | 15 |
| Flow automation and business logic | 15 |
| Data management and reporting | 15 |
| Troubleshooting and testing | 15 |
| Deployment readiness | 5 |
| Documentation and technical communication | 10 |
| **Total** | **100** |

**90 points minimum to pass.** Every category also names what's *required* to pass that category specifically — hitting 90 overall while completely missing a required item (an untested sharing rule, an untested fault path, a test plan with nothing ever found) means the build isn't actually verified, even if the arithmetic clears the bar.

## How to use this rubric

1. Score yourself first, honestly, category by category, with real verification inside your own org — click through and confirm, don't assume your build did what you intended.
2. For anything scored below the maximum, write one sentence: what's missing, and what you'd do about it. That sentence is the actual deliverable for a self-review — the number alone isn't.
3. If you have a study partner, trade capstones and score each other's independently before comparing notes — disagreements are usually the most useful part of a review.
