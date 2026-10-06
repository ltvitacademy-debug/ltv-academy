# Lesson 33 — Fixed Assets Troubleshooting Practice

**Chapter 6 · Accounting, Reporting and Close · Lesson 33 of 33**

## What you'll learn

- How to diagnose four realistic Fixed Assets problems using tools from across this course
- How to trace a symptom back to the specific chapter/lesson concept that explains it
- A repeatable diagnostic habit: symptom, likely cause, lesson to revisit, fix
- Where to go next in the Oracle Fusion Financials Consultant path

## This course, as a diagnostic toolkit

Thirty-two lessons in, you've built a mental model of how an asset moves from a Payables invoice to a retired, reconciled line item. This closing lesson is deliberately practice-shaped: four realistic problems at **Meridian Fabrication Co.**, each solvable with a tool or concept from a specific earlier lesson. Work through each one before reading the diagnosis.

## Scenario 1 — "Depreciation didn't run for three assets"

Meridian's accountant runs Calculate Depreciation in final mode and the period won't close. The exception report (Lesson 17) shows three assets failed: one with a category that was deleted, one with a depreciation expense account that no longer exists in the chart of accounts, and one with a negative net book value from an unprocessed cost adjustment.

**Diagnosis:** this is exactly the "assets that failed to depreciate" hard stop from Lesson 17. Each failure traces to a different earlier chapter — category integrity (Chapter 2), account mapping (Chapter 2/Lesson 28), and an incomplete cost adjustment (Lesson 19). Fix the underlying data for each asset, then rerun preview before attempting final again.

## Scenario 2 — "The warehouse shelving asset looks wrong after a partial retirement"

Meridian partially retires 5 of 20 shelving units (Lesson 24), but the remaining 15 units' net book value doesn't look right afterward.

**Diagnosis:** check whether the retirement was entered by cost or by units, and confirm the proportional cost calculation matches what Lesson 24 describes ($10,000 x 5/20 = $2,500 retired, leaving $7,500 of cost and its associated accumulated depreciation on the remaining 15 units). A mismatch here is usually a data-entry error in the retirement transaction itself, not a system defect.

## Scenario 3 — "Assets and GL don't agree on accumulated depreciation"

The reserve ledger report (Lesson 30) and the GL accumulated depreciation account don't match for the current period.

**Diagnosis:** work the reconciliation checklist from Lesson 31 in order. Check timing first (Lesson 29's transfer-versus-post distinction) — is there a batch sitting unposted or untransferred? If timing doesn't explain it, check for a manual GL entry bypassing Assets, a failed Create Accounting run, or an incorrect account mapping in a category book.

## Scenario 4 — "A machine was retired by mistake"

Someone retires the wrong asset number during a mass retirement upload (Lesson 27), and it's caught the same week, before period close.

**Diagnosis:** this is a reinstatement (Lesson 25), not a new addition — the goal is restoring the original asset's identity and depreciation history, not starting a new schedule. Confirm this is still within the clean reinstatement window: before the retirement's accounting has been created and the period closed.

## A repeatable diagnostic habit

Across all four scenarios, the same pattern holds: identify the **symptom** (what's visibly wrong), form a hypothesis about the **likely cause**, trace it to the **specific lesson/concept** that explains the mechanism, and only then apply the **fix** — rather than guessing at a fix before understanding which of this course's many moving parts actually produced the symptom.

## Where this path goes next

This closes **Oracle Fusion Fixed Assets** and the Financial Operations stage's work on long-lived assets. The next course in the **Oracle Fusion Financials Consultant** path is **Oracle Fusion Expenses**, covering employee expense reports, policy enforcement, and how expense data flows into the same General Ledger you've been reconciling against throughout this course.

## Key terms

| Term | Meaning |
|---|---|
| Diagnostic habit | Symptom, likely cause, lesson/concept, fix — a repeatable troubleshooting sequence |

## Lab

Pick one of the four scenarios above and write out, in your own words, the full diagnostic sequence: symptom, likely cause, which earlier lesson explains the mechanism, and the specific fix you'd apply.

## Check yourself

Without looking back, can you match each of the four scenarios above to the single earlier lesson that best explains its root cause?
