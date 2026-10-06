# Month-End Reporting Package

This final lesson pulls together everything from this course into the deliverable a consultant actually produces at the end of a real close: the month-end reporting package. Rather than introducing new tools, this lesson is about sequencing — which report, from which tool, in which order, and why.

## What you'll learn

- What a month-end reporting package typically contains
- A sensible build order, tying back to tools from every chapter
- Why sequencing (not just content) is the actual skill being tested here
- How this connects to the kind of close scenario you'll face in this path's capstone

## What's typically in the package

A standard month-end reporting package draws on nearly every report covered in this course:

- **Income Statement and Balance Sheet** (lesson 24) — the headline deliverables, built in Financial Reporting Studio.
- **Trial Balance** (lesson 25) — the GL-wide balance check, confirming debits equal credits before anything else is trusted.
- **AP Aging** and **AR Aging** (lessons 26–27) — the overdue-balance pictures for both sides of the business.
- **Reconciliation reports** — Payables-to-Ledger, bank statement reconciliation, and similar checks (lessons 26 and 28) confirming subledgers tie to the GL.
- Supporting detail as needed — Account Analysis (lesson 25) for anything that doesn't tie cleanly, and an Asset Register extract (lesson 28) if fixed asset activity was unusual that period.

## A sensible build order

The tools don't care what order you use them in, but a close process does. A reasonable sequence:

1. **Confirm subledgers are closed** (Payables, Receivables, Fixed Assets, Cash Management) before pulling anything — a report pulled before its source subledger closes is, by definition, incomplete.
2. **Run the Trial Balance first.** If debits don't equal credits, stop here and investigate (Account Analysis) before doing anything else — there's no point producing a polished Income Statement from numbers that don't balance.
3. **Run reconciliations** — Payables-to-Ledger, bank statement reconciliation — to confirm each subledger ties to the GL.
4. **Run AP and AR aging** for the overdue-balance picture, often as OTBI dashboards checked throughout the close and then a formal BI Publisher version for the package itself.
5. **Run the Income Statement and Balance Sheet last**, once every supporting check above is clean, so the headline statements are built on numbers that have already been verified rather than numbers that might still need correction.

## Sequencing is the actual skill

Nearly everything in this course is mechanically simple once you know it: running a seeded report, building an OTBI analysis, scheduling a BI Publisher job. What separates a competent consultant from a struggling one is usually not "do they know how to run a Trial Balance" — it's "do they know to run it *before* the Income Statement, so a problem gets caught while it's still cheap to fix, instead of after a client has already looked at a wrong number." This lesson's real content is that discipline of sequencing, applied to everything you've learned since lesson 1.

## Looking ahead

This kind of sequencing — investigate first, reconcile next, publish last — is exactly the skill tested in this path's capstone, where a CFO reports the books don't balance and the consultant has to work through AP, AR, Assets, Cash Management, Subledger Accounting, and GL to find and fix the problem before completing the close. Everything in this course was building toward being able to do that calmly and in the right order.

## Recap

A month-end reporting package sequences the Trial Balance, reconciliations, aging reports, and finally the Income Statement and Balance Sheet — confirming each layer before building on it, rather than running every report at once and hoping. This closes Oracle Financial Reporting. Next up in the Reporting & Data stage of the Oracle Fusion Financials Consultant path: **Oracle Financials Data**, where you'll go deeper into the data itself behind everything you've reported on here.
