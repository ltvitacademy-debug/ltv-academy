# Lesson 32 — Fixed Assets Period Close

**Chapter 6 · Accounting, Reporting and Close · Lesson 32 of 33**

## What you'll learn

- The full sequence of steps that make up a Fixed Assets period close
- Why the order of these steps isn't arbitrary
- What has to be true before a period is allowed to close
- Why close is the point every earlier chapter's discipline gets tested at once

## Close is the sequence, not a single button

Every chapter in this course has been building toward this moment. **Period close** in Fixed Assets isn't one action — it's a sequence of steps, each depending on the one before it, that together move a book from "transactions still being processed" to "this period is final."

## The sequence, step by step

1. **Finish transaction entry.** Every addition (Chapter 3), adjustment, transfer, and retirement (Chapters 4–5) that belongs in this period needs to be entered and, for mass additions, posted — Lesson 15's posting boundary applies directly here.
2. **Run depreciation in preview mode.** (Lesson 17) Review the exception report for assets that failed to depreciate, and fix any underlying data problems — a missing account, an invalid category — before moving on.
3. **Run depreciation in final mode.** Once preview looks clean, final mode commits the period's depreciation and is the step that actually closes the current period in the depreciation calendar.
4. **Run Create Accounting in final mode.** (Lesson 28) This generates the journal entries representing every transaction and depreciation amount from this period.
5. **Transfer to the General Ledger.** (Lesson 29) Move those journal entries into GL as a journal batch, ready to post.
6. **Reconcile.** (Lesson 31) Confirm Assets' balances agree with GL's posted balances for every fixed-asset account before calling the period truly done.

## Why the order isn't arbitrary

Each step depends on the one before it being correct. Running final depreciation before transaction entry is complete means missing transactions never get depreciated for the period at all. Running Create Accounting before confirming depreciation ran cleanly means generating journal entries for a calculation that might still have exceptions. Transferring to GL before Create Accounting even runs isn't possible — there's nothing to transfer yet. The sequence exists because getting it out of order produces real, hard-to-unwind problems, not just inefficiency.

## What has to be true before a period can actually close

Tying directly back to Lesson 17 and Lesson 8: a period generally **cannot close** while any assets have failed to depreciate, and once closed, the depreciation calendar's one-way rule means there's generally no going back. This is why the preview step in the sequence above isn't optional busywork — it's the last real opportunity to catch a problem before the close becomes permanent.

## Why close tests everything that came before it

A clean, uneventful close is the best evidence that every earlier chapter's setup and discipline actually worked: categories configured correctly (Chapter 2), additions reviewed properly (Chapter 3), adjustments and transfers entered promptly (Chapters 4–5), and accounts mapped correctly (Chapter 6). A messy close — exceptions everywhere, reconciliation not tying out — is usually a symptom of something that went wrong much earlier in the chain, surfacing all at once at the one moment it can no longer be ignored.

## Key terms

| Term | Meaning |
|---|---|
| Period close | The sequence of steps moving a book's current period from open to final |
| Close sequence | The specific order — transaction entry, preview depreciation, final depreciation, Create Accounting, GL transfer, reconciliation — that period close follows |

## Lab

Meridian is two days from its monthly close deadline. Walk through the six-step sequence above in order, and identify the one step where, if skipped, a problem would only be discovered after the period has already closed and can no longer be fixed cleanly.

## Check yourself

Without looking back, can you list the six steps of Fixed Assets period close in order, and explain why running steps out of order causes real problems rather than just inefficiency?
