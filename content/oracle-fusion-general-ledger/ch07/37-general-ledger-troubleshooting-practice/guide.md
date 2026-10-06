# General Ledger Troubleshooting Practice

**Chapter 7 · Period Close · Lesson 37 of 37 (Course Finale)**

## What you'll learn

- How to triage a General Ledger problem using only the tools this course covered
- Three realistic troubleshooting scenarios, worked end to end
- Which lesson's concept resolves each scenario, so you know where to go deeper
- What's next after General Ledger in the Oracle Fusion Financials Consultant path

## This lesson is a practice run, not new material

Every concept used here was covered somewhere in this course. The goal is to practice reaching for the right tool quickly when a real discrepancy shows up — which is, in practice, most of what a General Ledger consultant actually does day to day.

## Scenario 1: "The trial balance doesn't match what Sales expected"

**LTV Manufacturing Corporation**'s Sales division controller says March's Travel & Entertainment expense "looks way too high." Walk the triage:

1. Start with **Inquire on Detail Balances** (lesson 22) to confirm the actual PTD figure and rule out a PTD/YTD misread.
2. If it's genuinely high, open **Account Inspector** (lesson 24) and pivot by cost center — this is the exact scenario from that lesson, and it isolates whether the overage is company-wide or concentrated in one department.
3. Once isolated, pull the **Account Analysis Report** (lesson 26) for that cost center to see every journal line and judge which ones are legitimate.
4. If a line traces to a subledger (an expense report import, for instance), **drill to subledger detail** (lesson 27) to see the originating transaction.

## Scenario 2: "March won't close — something's stuck"

The close checklist (lesson 33) flags that March isn't ready. Triage:

1. Check **Manage Journals** (lesson 34) filtered to March, by status — look for Unposted and Error journals across every source (manual, imported, recurring).
2. For an Error journal, diagnose the specific validation failure (invalid account, closed period reference) and correct it.
3. For an Unposted-but-valid journal, check whether it's stuck in approval and chase the approver.
4. Only once every journal is cleared does step 7 of the checklist — changing the period status in **Manage Accounting Period** (lesson 35) — actually represent a true close.

## Scenario 3: "The US and UK intercompany balances don't net to zero"

Closing a period with cross-entity activity (Chapter 6):

1. Run the **Intercompany Reconciliation Report** (lesson 31) to quantify the mismatch between the US receivable and UK payable.
2. Check whether the mismatch is a **timing difference** (one side posted, the other hasn't yet) or an **FX difference** (the transaction converted using different rates on each side).
3. Confirm **revaluation** (lesson 29) ran before checking final balances, since an un-revalued foreign-currency intercompany balance will look mismatched even when it isn't actually a problem.
4. If the US entity's ledger feeds a **consolidation** (lesson 32), confirm this intercompany pair is flagged for elimination so it doesn't survive into the group's consolidated numbers.

## The pattern underneath all three

Every scenario follows the same shape: start from what looks wrong (a balance, a blocked close, a mismatch), use the least invasive tool first (an inquiry, a report, a reconciliation report), and only drill deeper once the inquiry narrows down *where* the problem actually lives. That discipline — triage before you dig — is what separates a consultant who finds the real cause quickly from one who re-checks everything from scratch every time.

## What's next

This completes **General Ledger**, the second course in the Financials Configuration stage of the Oracle Fusion Financials Consultant path. Everything in this course has been about recording, monitoring, and closing the books GL already has. The next course, **Accounts Payable**, picks up the thread from lesson 27's drill path and goes the other direction: starting from a supplier invoice and following it forward — validation, holds, approvals, matching, and payment — all the way to the GL journal this course taught you to read.

## Recap

Troubleshooting in General Ledger is triage, not memorization: start with the least invasive balance or report tool, narrow down where the real problem lives, and only then drill into journal lines or subledger detail. That closes General Ledger. Up next: Accounts Payable.
