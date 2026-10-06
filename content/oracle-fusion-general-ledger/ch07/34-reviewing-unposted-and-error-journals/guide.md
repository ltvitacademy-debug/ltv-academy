# Reviewing Unposted and Error Journals

**Chapter 7 · Period Close · Lesson 34 of 37**

## What you'll learn

- Why unposted journals are the single most common close blocker
- How to find every unposted journal for a period before close
- Common reasons a journal fails validation, revisited in the context of close
- Why closing a period doesn't delete or fix pending journals — it just leaves them behind

## The checklist step this lesson expands on

Lesson 33's close checklist included "post all pending journals" as step 5 — stated simply, but it's where real close delays happen. A journal sitting unposted doesn't just fail to contribute its numbers to the trial balance; it sits there, invisible to anyone who isn't specifically looking, until someone checks.

## Finding every unposted journal

Before closing, a controller navigates to **General Accounting > Journals > Manage Journals** and filters specifically for the period being closed, looking at journal **status**: journals can be Unposted, Posted, or in an **Error** state (failed validation, covered back in Chapter 2). The review has to cover every source — manual journals, imported journals from Chapter 3's FBDI process, and recurring or allocation journals from Chapter 4 — because a journal from any of those sources can be sitting unposted for the same underlying reasons.

## Why a journal is still unposted at close time

Revisiting Chapter 2 and 3's causes in the specific context of close:

- **Never submitted for posting** — someone created a manual journal and simply never finished the step
- **Awaiting approval** — stuck in the approval workflow from Chapter 3, waiting on an approver who hasn't acted
- **Failed validation** — an invalid account combination, a journal that doesn't balance (rare, since Oracle blocks this at entry, but possible on import), or a closed period reference
- **Import errors** — an FBDI batch that partially failed, leaving some journals successfully imported and others rejected

## A worked example at LTV Manufacturing Corporation

Closing March 2026, the controller filters Manage Journals for period Mar-2026 and finds:

```
JE-10402   Manual     Unposted   Awaiting approval (submitted 3 days ago)
JE-10415   Spreadsheet Error     Invalid account: 01-999-0000-000-000
JE-10428   Recurring  Unposted   Never submitted after generation
```

Each needs a different fix: JE-10402 needs someone to chase the approver; JE-10415 needs the account combination corrected and resubmitted; JE-10428 simply needs to be submitted for posting, since generating a recurring journal (Chapter 4) doesn't post it automatically.

## Closing a period doesn't resolve this for you

This is the critical point: Oracle Fusion lets a period be closed with unposted journals still sitting in it, depending on configuration, but doing so means that journal's activity is simply **not** in the period's final numbers — it will either need to post to a different period (if still open) or require the period to be reopened later, which is itself disruptive (covered in lesson 35). Clearing every unposted and error journal *before* close is far cheaper than discovering a missing journal after the fact.

## Key terms

| Term | Meaning |
|---|---|
| Unposted journal | A journal that exists but has not yet updated the ledger's balances |
| Error journal | A journal that failed validation and cannot post until corrected |
| Manage Journals | The page used to find and act on journals by status, source, and period |

## Recap

Reviewing unposted and error journals means actively hunting down every journal — manual, imported, recurring — still sitting unposted for a period, diagnosing why, and fixing it before close, because closing a period does not make a pending journal's numbers appear in the final balances. Next up, lesson 35: Opening and Closing Periods, the mechanics of the period-status change itself.
