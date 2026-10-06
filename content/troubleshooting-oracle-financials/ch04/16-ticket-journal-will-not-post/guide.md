# Ticket: Journal Will Not Post

**Chapter 4 · General Ledger and Subledger Tickets · Lesson 1 of 5**

## What you'll learn

- The main reasons a journal batch refuses to post
- How suspense posting changes what "unbalanced" actually blocks
- Why the fix depends entirely on which specific reason applies
- A resolution note for a disabled account blocking an entire batch

## Several different reasons, one symptom

"Won't post" is a single symptom with several unrelated possible causes. The journal (or journal batch) could be unbalanced — debits don't equal credits — which is blocked unless the ledger allows suspense posting, in which case Oracle posts the difference to a suspense account instead of rejecting it outright. The accounting period could be closed. One or more lines could reference an invalid or disabled account combination. Or the batch could still be mid-approval, sitting in a status that simply hasn't reached "ready to post" yet.

## The ticket

> **Ticket #40512 — Meridian Steel Fabricators.** GL accountant reports: "Trying to post the month-end accrual batch and it's failing. 40 journals in the batch, and I don't know which one is the problem." Severity: High (blocks month-end).

## Investigating

1. **Check the batch-level posting result**, not just "failed." Oracle's posting log identifies the specific journal and line: one journal, line 3, references account combination `01-410-7742-0000-000` — **disabled**.
2. **Confirm it's isolated to one line.** The other 39 journals in the batch post cleanly when run independently of the disabled-account journal. The batch failure was effectively one bad line blocking the whole batch's posting run.
3. **Find out why the account is disabled.** Checking the chart of accounts: account `7742` (a specific expense natural account) was disabled two weeks ago as part of an account cleanup project — the accrual was coded to a value that's no longer valid for new transactions.

## Root cause

One journal line in a 40-journal batch referenced a natural account segment value that was disabled during a recent chart-of-accounts cleanup, and that single invalid combination blocked the entire batch's posting attempt.

## Resolving it

Correct the one journal line to use the current, active account for this type of accrual (confirmed with GL, not guessed), leaving the other 39 journals untouched. Re-run posting for the full batch. This is a case where isolating "is it one line or the whole batch" (Lesson 2's method) turns a 40-journal emergency into a 1-line correction.

## Documenting it

> **Ticket #40512 — Meridian Steel Fabricators.** Month-end accrual batch (40 journals) failed to post.
> **Root cause:** One journal line referenced account combination 01-410-7742-0000-000, disabled two weeks ago during a chart-of-accounts cleanup; the invalid line blocked posting for the entire batch.
> **Fix:** Corrected the one affected line to the current active account for this accrual type; left the other 39 journals unchanged.
> **Verified:** Re-ran posting for the full batch — all 40 journals posted successfully.
> **Note:** Recommend the chart-of-accounts cleanup project circulate disabled account values to GL accountants before disabling, to catch any accruals still coded to them.

## Key terms

| Term | Meaning |
|---|---|
| Suspense posting | A ledger option that posts an unbalanced journal's difference to a suspense account instead of rejecting it |
| Disabled account | An account combination no longer valid for new transactions |
| Batch | A group of journals posted together; one invalid line can block the whole batch |

## Check yourself

Why did checking whether the other 39 journals could post independently matter so much to how fast this ticket got resolved?
