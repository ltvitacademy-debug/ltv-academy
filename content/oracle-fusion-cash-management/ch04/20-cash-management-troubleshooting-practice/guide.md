# Cash Management Troubleshooting Practice

This final lesson doesn't introduce new concepts — it puts everything from Chapters 1 through 4 to work on a pair of realistic, fictional troubleshooting scenarios, the way a consultant actually encounters this material: as a problem to diagnose, not a list to recite.

## What you'll learn

- How to work through a reconciliation problem systematically, using the full course
- How to work through a cash position problem systematically
- A recap of the whole course's chapter structure
- What comes next in the Oracle Fusion Financials Consultant path

## Scenario 1: "Reconciliation won't clear"

Harborview Metals Inc.'s Cash Manager reports that First Continental Bank's statement for the operating account loaded fine, but almost nothing reconciled automatically overnight — normally 95%+ matches, and this morning it's under 10%.

**Diagnosis walk-through:**
1. Check Import first (Lesson 6) — did the statement actually import cleanly, with no errors? Confirmed clean.
2. Check for a transaction code mapping gap (Lesson 7) — did First Continental Bank change how it codes a common transaction type? This turns out to be exactly it: the bank switched its ACH credit code from `475` to a new code, `478`, after a system upgrade on their end, and Harborview's mapping table only recognized `475`.
3. Fix the root cause (Lesson 8) — add the mapping for code `478` to the existing configuration, rather than manually reconciling each affected line.
4. Re-run automatic reconciliation (Lesson 10) — once the mapping is fixed, the backlog of ACH credit lines reconciles automatically on the next run, without needing to touch each one.

## Scenario 2: "The cash position doesn't look right"

Treasury flags that Monday's cash position for the concentration account shows a projected balance $28,000 lower than expected.

**Diagnosis walk-through:**
1. Check what's feeding the position (Lesson 17) — it's built from the bank's reported balance, reconciled transactions, and known imminent activity.
2. Check reconciliation status (Chapter 3) — is there a backlog of unreconciled items distorting the picture? A review turns up a $28,000 wire transfer (part of an intercompany transfer from Lesson 16) that reconciled on the From account's statement but was never created as the matching inflow external transaction on the To account — a setup/process miss, not a bank error.
3. Fix it (Lesson 15) — create the missing inflow external transaction on the To account, reconcile it against its own statement line.
4. Confirm with the Cash to GL Reconciliation report (Lesson 14/19) — once Create Accounting runs for the newly created transaction, the position and the GL should agree again.

## Course recap

- **Chapter 1** built the foundation: banks, branches, accounts, uses, security, and the setup reconciliation depends on.
- **Chapter 2** got the bank's own data into Oracle: statement formats, loading/importing, transaction codes, and common errors.
- **Chapter 3** matched that data against the system: rule sets, matching rules, automatic and manual reconciliation, AP/AR specifics, unreconciled items, and reporting.
- **Chapter 4** covered the transactions and views built on top of reconciled data: external transactions, bank transfers, cash positioning, cash forecasting, and the accounting that finally closes the loop.

## What's next

This course completes the first course of the Financial Operations stage in the Oracle Fusion Financials Consultant path. Next up is **Oracle Fusion Fixed Assets** — asset books, categories, additions, capitalization, depreciation, transfers, and retirements — followed by Oracle Fusion Expenses to complete this stage before you move on to the end-to-end business process courses.

## Recap

Troubleshooting Cash Management means tracing a symptom back through the course's layers — statement loading, code mapping, reconciliation rules, transaction creation, and accounting — rather than guessing. That's the skill this whole course was building toward. Next up: Oracle Fusion Fixed Assets.
